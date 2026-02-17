// ==UserScript==
// @name         Salesforced Enhanced (VCL + Auto-collapse + Linkify)
// @match        https://*.lightning.force.com/lightning/r/Case/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // ==================== VCL SYNTAX HIGHLIGHTING ====================
    
    function highlightVCL(code) {
        let highlighted = code
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        
        const protectedSections = [];
        let sectionIndex = 0;
        
        highlighted = highlighted.replace(/"(?:[^"\\]|\\.)*"/g, (match) => {
            const placeholder = `__STRING_${sectionIndex}__`;
            protectedSections[sectionIndex] = `<span class="vcl-string">${match}</span>`;
            sectionIndex++;
            return placeholder;
        });
        
        highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/|\/\/.*$|#[^\n]*)/gm, (match) => {
            const placeholder = `__COMMENT_${sectionIndex}__`;
            protectedSections[sectionIndex] = `<span class="vcl-comment">${match}</span>`;
            sectionIndex++;
            return placeholder;
        });
        
        const keywords = /\b(sub|if|else|elsif|return|set|unset|call|include|backend|probe|acl|synthetic|restart|error|deliver|fetch|pass|pipe|purge|recv|synth|new|import|director|ban|hash_data|esi)\b/g;
        const builtins = /\b(req|bereq|resp|beresp|obj|client|server|now|storage)\.(method|url|proto|backend|ttl|grace|status|response|healthy|http\.[A-Za-z-]+|[a-z_]+)\b/g;
        const stdFuncs = /\b(std\.(log|syslog|collect|toupper|tolower|duration|integer|healthy)|regsub|regsuball|ban|ban_url|purge|true|false)\b/g;
        const numbers = /\b\d+(?:\.\d+)?(?:[smhdwy]|ms)?\b/g;
        
        highlighted = highlighted
            .replace(keywords, '<span class="vcl-keyword">$&</span>')
            .replace(builtins, '<span class="vcl-builtin">$&</span>')
            .replace(stdFuncs, '<span class="vcl-function">$&</span>')
            .replace(numbers, '<span class="vcl-number">$&</span>');
        
        for (let i = 0; i < protectedSections.length; i++) {
            highlighted = highlighted.replace(`__STRING_${i}__`, protectedSections[i] || '');
            highlighted = highlighted.replace(`__COMMENT_${i}__`, protectedSections[i] || '');
        }
        
        return highlighted;
    }
    
    function highlightPreBlocks(container) {
        const preBlocks = container.querySelectorAll('pre.ckeditor_codeblock, pre[style*="background"]');
        
        preBlocks.forEach((pre) => {
            if (pre.hasAttribute('data-vcl-highlighted')) return;
            
            const code = pre.textContent || pre.innerText;
            const highlighted = highlightVCL(code);
            pre.innerHTML = `<code class="language-vcl">${highlighted}</code>`;
            pre.classList.add('language-vcl');
            pre.setAttribute('data-vcl-highlighted', 'true');
            pre.removeAttribute('style');
        });
    }
    
    function getTextWithLineBreaks(element) {
        let text = '';
        
        function traverse(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                text += node.textContent;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (['P', 'DIV', 'BR'].includes(node.tagName)) {
                    if (text && !text.endsWith('\n')) {
                        text += '\n';
                    }
                }
                
                for (let child of node.childNodes) {
                    traverse(child);
                }
                
                if (['P', 'DIV'].includes(node.tagName)) {
                    if (!text.endsWith('\n')) {
                        text += '\n';
                    }
                }
            }
        }
        
        traverse(element);
        return text.replace(/\n{3,}/g, '\n\n');
    }
    
    function formatCodeBlocks(element) {
        const messages = element.querySelectorAll('.cuf-body, [class*="emailBody"], .feeditemtext, .slds-rich-text-editor__output');
        
        messages.forEach((msg) => {
            if (msg.hasAttribute('data-code-formatted')) return;
            
            highlightPreBlocks(msg);
            
            const textContent = getTextWithLineBreaks(msg);
            
            if (textContent.includes('```')) {
                let processedHTML = '';
                let lastIndex = 0;
                const codeBlockRegex = /```(\w+)?\s*\n([\s\S]*?)```/g;
                let match;
                let foundBlocks = 0;
                
                while ((match = codeBlockRegex.exec(textContent)) !== null) {
                    foundBlocks++;
                    const language = match[1] ? match[1].toLowerCase() : 'vcl';
                    const code = match[2].trim();
                    
                    const beforeText = textContent.substring(lastIndex, match.index);
                    processedHTML += beforeText.replace(/`([^`\n]+?)`/g, '<code>$1</code>').replace(/\n/g, '<br>');
                    
                    const highlighted = language === 'vcl' ? highlightVCL(code) : code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    processedHTML += `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`;
                    
                    lastIndex = match.index + match[0].length;
                }
                
                if (foundBlocks > 0) {
                    const afterText = textContent.substring(lastIndex);
                    processedHTML += afterText.replace(/`([^`\n]+?)`/g, '<code>$1</code>').replace(/\n/g, '<br>');
                    
                    msg.innerHTML = processedHTML;
                    msg.setAttribute('data-code-formatted', 'true');
                }
            }
        });
    }
    
    // ==================== AUTO-COLLAPSE SYSTEM UPDATES ====================
    
    function collapseSystemUpdates(container) {
        const systemUpdates = container.querySelectorAll(
            '[data-type="ChangeStatusPost"], [data-type="CreateRecordEvent"], [data-type="TrackedChange"], [data-type="CaseCreation"], article.cuf-clumpItem'
        );
        
        console.log(`🔽 Collapsing ${systemUpdates.length} system updates`);
        
        systemUpdates.forEach((update) => {
            if (update.hasAttribute('data-auto-collapsed')) return;
            
            // Find the expand/collapse button
            const expandButton = update.querySelector('.cuf-feedItemHeader a[role="button"][aria-controls][aria-expanded]');
            
            if (expandButton) {
                const isExpanded = expandButton.getAttribute('aria-expanded') === 'true';
                
                if (isExpanded) {
                    // Click the button to collapse it
                    console.log('  🔽 Clicking to collapse');
                    expandButton.click();
                }
                
                update.setAttribute('data-auto-collapsed', 'true');
            }
        });
    }
    
    // ==================== LINKIFY URLs ====================
    
    function linkifyURLs(container) {
        const messages = container.querySelectorAll('.cuf-body, [class*="emailBody"], .feeditemtext, .slds-rich-text-editor__output');
        
        messages.forEach((msg) => {
            if (msg.hasAttribute('data-linkified')) return;
            
            // Skip if it contains code blocks (already processed)
            if (msg.querySelector('pre.language-vcl, pre.language-')) return;
            
            // URL regex that doesn't match inside HTML tags
            const urlRegex = /(?<!["'>])(https?:\/\/[^\s<>"']+)/gi;
            
            function processTextNodes(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent;
                    if (urlRegex.test(text)) {
                        const span = document.createElement('span');
                        span.innerHTML = text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #1976D2 !important; text-decoration: underline !important;">$1</a>');
                        node.replaceWith(span);
                    }
                } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'A' && node.tagName !== 'PRE' && node.tagName !== 'CODE') {
                    Array.from(node.childNodes).forEach(processTextNodes);
                }
            }
            
            processTextNodes(msg);
            msg.setAttribute('data-linkified', 'true');
        });
    }
    
    // ==================== MAIN EXECUTION ====================
    
    console.log('🔄 Starting initial processing...');
    
    setTimeout(() => {
    
        highlightPreBlocks(document.body);
        formatCodeBlocks(document.body);
        linkifyURLs(document.body);
        
        // Collapse after a brief delay to let Salesforce finish rendering
        setTimeout(() => {
            collapseSystemUpdates(document.body);
      
        }, 500);
    }, 2000);
    
    // Watch for new content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    formatCodeBlocks(node);
                    highlightPreBlocks(node);
                    linkifyURLs(node);
                    
                    // Small delay before collapsing new items
                    setTimeout(() => collapseSystemUpdates(node), 100);
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
  
})();
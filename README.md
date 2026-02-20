# SalesFORCED Enhanced

A enhancement suite for Salesforce Lightning

[![Install directly with Stylus](https://img.shields.io/badge/Install%20directly%20with-Stylus-00adad.svg)](https://raw.githubusercontent.com/hitek/salesforced-enhanced/main/salesforced_enhanced.css)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## About

**SalesFORCED Enhanced** is a subtle enhancement suite for Salesforce Lightning that combines a theme update with productivity features. It includes both a Stylus CSS theme and a Tampermonkey/Greasemonkey userscript for advanced functionality.

This project enhances the Salesforce Lightning interface with:
- 📧 Visual email differentiation (Customer/Support/Internal)
- 💻 VCL syntax highlighting for code blocks (work in progress)
- 🔗 Automatic URL linkification (work in progress)
- 📝 Markdown code block support (```vcl syntax)
- 🎯 Auto-collapse system updates for cleaner feeds
- ✨ Smooth animations and transitions
- 📐 Optimized case view layout

---

## Features

### CSS Enhancements (Stylus)

#### **Enhanced Theme**
- Professional dark color scheme optimized for long work sessions
- Smooth transitions and modern UI elements
- Enhanced typography for better readability

#### **Email Differentiation Badges**
- **Customer emails**: Green border with "CUSTOMER" badge
- **Support replies**: Blue border with "SUPPORT" badge  
- **Internal emails**: Deep blue gradient with "INTERNAL" badge
- Makes it easy to distinguish email types at a glance

#### **Optimized Layout**
- Improved case view with better column proportions (18/64/18%)
- Larger email composer (505px height)
- Better spacing and padding throughout

#### **Configurable Options**
- Email differentiation badges (toggle on/off)
- Hide system update bodies
- Compact mode for system updates
- Enhanced typography
- Animation effects

#### **System Updates Styling**
- Compact, non-intrusive system update cards
- Optional hiding of system update bodies
- Clean, modern appearance

### JavaScript Enhancements (Userscript)

#### **VCL Syntax Highlighting**
- Full syntax highlighting for Varnish Configuration Language
- Highlights keywords, builtins, functions, strings, comments
- Automatically detects `<pre>` blocks with VCL code
- Supports both plain VCL blocks and markdown code fences

#### **Markdown Code Block Support**
- Recognizes triple-backtick code blocks (\`\`\`vcl)
- Supports multiple language hints
- Inline code support with single backticks
- Automatically formats code in email bodies and feed items

#### **URL Linkification**
- Automatically converts http/https URLs to clickable links
- Opens in new tab with security attributes
- Smart detection that avoids breaking existing HTML
- Styled links with proper hover states

#### **Auto-collapse System Updates**
- Automatically collapses system status changes  
- Collapses record creation events and tracked changes
- Keeps your feed clean and focused on important content
- Works on page load and dynamically with new content

#### **Real-time Processing**
- Uses MutationObserver for instant processing of new content
- Handles dynamic Salesforce Lightning updates
- Non-blocking performance optimizations

---

## Installation

### Prerequisites

1. **For CSS (Required)**: Install [Stylus](https://add0n.com/stylus.html) extension
   - [Chrome/Edge](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne)
   - [Firefox](https://addons.mozilla.org/firefox/addon/styl-us/)

2. **For JavaScript (Optional but Recommended)**: Install a userscript manager
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Edge, Safari, Opera)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge, Opera)

### Installing the CSS Theme

#### Method 1: Direct Install (Recommended)
Click the badge below to install directly:

[![Install directly with Stylus](https://img.shields.io/badge/Install%20directly%20with-Stylus-00adad.svg)](https://raw.githubusercontent.com/hitek/salesforced-enhanced/main/salesforced_enhanced.css)

#### Method 2: Manual Install
1. Click on the Stylus icon in your browser
2. Click "Write new style"
3. Copy the contents of [`salesforced_enhanced.css`](salesforced_enhanced.css)
4. Paste into the Stylus editor
5. Give it a name and save

### Installing the JavaScript Enhancements

1. Make sure you have custom JS plugin installed
2. Click on the extension icon
3. Select "Create a new script"
4. Copy the contents of [`salesforced_enhanced.js`](salesforced_enhanced.js)
5. Paste into the editor and save


---

## Configuration

### CSS Options

The Stylus theme includes several configurable options. To access them:

1. Click the Stylus icon
2. Find "SalesFORCED Enhanced" in your installed styles
3. Click the gear icon (⚙️) to configure

**Available options:**

| Option | Default | Description |
|--------|---------|-------------|
| Email differentiation badges | ✅ On | Show CUSTOMER/SUPPORT/INTERNAL badges on emails |
| Hide system update bodies | ❌ Off | Completely hide the body content of system updates |
| Compact system updates | ✅ On | Make system updates more compact and less intrusive |
| Enhanced typography | ✅ On | Use improved fonts and text styling |
| Enable animations | ✅ On | Enable smooth transitions and animations |

### JavaScript Options

The userscript works out of the box with no configuration needed. However, you can edit the script to customize:

- Delay timings (initial load: 2000ms, collapse delay: 500ms)
- VCL syntax highlighting colors (search for `.vcl-` class definitions in your CSS)
- Which system update types to auto-collapse

---

## Features Showcase

### Email Differentiation
The theme visually distinguishes between three types of emails:
- **Customer** emails have a green left border and badge
- **Support** replies have a blue left border and badge  
- **Internal** communications have a deep blue gradient with badge

### VCL Syntax Highlighting
Code blocks are automatically highlighted with proper syntax coloring for:
- Keywords (sub, if, else, return, set, etc.)
- Built-in objects (req, bereq, resp, beresp, obj, client, server)
- Standard library functions (std.log, regsub, etc.)
- Strings, comments, and numbers

Example:
```vcl
sub vcl_recv {
  if (req.url ~ "^/api") {
    set req.backend_hint = api_backend;
  }
  return (pass);
}
```

### Auto-collapse System Updates
System status changes, record creation events, and tracked changes are automatically collapsed, keeping your feed focused on customer communications and important updates.

---

## Browser Compatibility

- ✅ Chrome/Chromium (tested)
- ✅ Firefox (tested)
- ✅ Edge (should work)
- ✅ Opera (should work)
- ⚠️ Safari (requires additional setup for userscripts)

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development

The project structure is simple:
```
salesforced-enchanced/
├── salesforced_enhanced.css    # Stylus CSS theme
├── salesforced_enhanced.js     # Tampermonkey/Greasemonkey userscript
└── README.md                    # This file
```

#### CSS Development
- Uses Stylus preprocessor syntax
- Follows UserStyle metadata format
- Targets Salesforce Lightning with `@-moz-document` rules

#### JavaScript Development  
- Vanilla JavaScript (no dependencies)
- Uses MutationObserver for dynamic content
- Follows UserScript metadata format

### Testing
Test your changes on:
- Various case pages (`/lightning/r/Case/`)
- Email composer views
- Feed with different message types
- System updates and status changes

---

## Troubleshooting

### CSS not applying
- Make sure Stylus is enabled for the Salesforce domain
- Check that the style is enabled in Stylus settings
- Try refreshing the page with Ctrl+F5 (hard refresh)

### JavaScript features not working
- Verify Tampermonkey/Greasemonkey is enabled
- Check the browser console for any error messages
- Make sure the script matches `*.lightning.force.com/lightning/r/Case/*`

### VCL highlighting not showing colors
- The JavaScript adds the structure for highlighting
- The CSS needs to define the `.vcl-*` color classes
- Make sure both CSS and JS are installed

### Performance issues
- Disable animations in Stylus configuration
- Increase delay timings in the userscript (lines with `setTimeout`)

---

## Credits

**Author**: Eden Melgar

**Inspired by**: Various Salesforce UI modifications and syntax highlighting libraries

---

## License

[MIT License](LICENSE)

Copyright (c) 2024 Eden Melgar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Changelog

### Version 0.1.0 (Initial Release)
- ✨ Initial dark theme for Salesforce Lightning
- 📧 Email differentiation with visual badges
- 💻 VCL syntax highlighting
- 📝 Markdown code block support
- 🔗 Automatic URL linkification  
- 🔽 Auto-collapse system updates
- ⚙️ Configurable options via Stylus
- 🎨 Modern UI with smooth animations

- ### Version 0.1.1
- Added a sticky sidebar

- - ### Version 0.1.2
- Changed the ticket updates background to a less vibrant blue
- Removed background color gradients

- ### Version 0.1.3
- Added new response badges to indicate EXTERNAL when the response is not from internal support or a customer.

- ### Version 0.1.4
- Fixed up image and text overflow issues. Fixed images and text to not go over the size of the main message area.

---

<div align="center">

**[⬆ back to top](#salesforced-enhanced)**

Made with ❤️

</div>

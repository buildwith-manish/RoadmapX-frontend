// ═══════════════════════════════════════════════════════════════
// PART 6 OF 6 — ASSEMBLY & INIT
// This is the COMPLETE <script> block for div#tab-fe.
// Replace the placeholder <script> from Part 1 with this entire file.
//
// Assembly order inside the IIFE:
//   1. FE_RM_NODES  (Parts 2 + 3 merged)
//   2. Progress state + save helper
//   3. Expand state
//   4. Rendering engine (Part 4)
//   5. Bottom sheet logic (Part 5)
//   6. feRmInit() + DOMContentLoaded guard
// ═══════════════════════════════════════════════════════════════

(function () {
'use strict';

// ─────────────────────────────────────────────────────────────
// § 1 — NODE DATA  (Parts 2 + 3 merged into one array)
// ─────────────────────────────────────────────────────────────
const FE_RM_NODES = [

  // ─────────────────────────────────────────────
  // SECTION 1 — INTERNET BASICS
  // ─────────────────────────────────────────────
  {
    id: 'internet',
    label: 'Internet',
    section: 1,
    sectionTitle: 'Internet Basics',
    isMain: true,
    parent: null,
    border: 'orange',
    difficulty: 'BEGINNER',
    time: '3–4 days',
    whyMatters: 'Every web application you build runs on top of the internet infrastructure. Without understanding how data travels from a server to a browser, you cannot debug network issues, optimize load times, or reason about security. Employers expect frontend developers to explain what happens when you type a URL and hit Enter. This foundational knowledge separates juniors who only copy-paste from engineers who truly understand their craft.',
    learn: [
      'How packets travel through routers and ISPs using TCP/IP',
      'The difference between IPv4 and IPv6 addressing',
      'How HTTP/HTTPS sits on top of TCP as an application-layer protocol',
      'What latency, bandwidth, and throughput mean in real apps',
      'The request–response cycle from browser to server and back',
      'What a CDN is and why it dramatically improves load times',
      'The role of DNS in translating domain names to IP addresses'
    ],
    prerequisites: 'None — this is the very first stop',
    task: 'Open Chrome DevTools → Network tab, load any website, and trace a single HTML request: find its IP, status code, response headers, and time-to-first-byte. Write a one-paragraph explanation of what happened.',
    youtubeQuery: 'how the internet works for developers explained',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work'
  },
  {
    id: 'how-internet-works',
    label: 'How Internet Works',
    section: 1,
    sectionTitle: 'Internet Basics',
    isMain: false,
    parent: 'internet',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 day',
    whyMatters: 'Understanding TCP/IP, packets, and routing lets you reason about why network requests fail, why some APIs are slow, and how data integrity is guaranteed across unreliable networks. Every time you use fetch() you are relying on this machinery. Knowing it makes you a far more effective debugger.',
    learn: [
      'TCP vs UDP — when reliability matters vs when speed matters',
      'How packets are broken up, routed independently, and reassembled',
      'IP addressing: public vs private, subnets, NAT',
      'The role of ISPs and the backbone infrastructure',
      'What happens at each hop between client and server',
      'Packet loss, retransmission, and how TCP handles it'
    ],
    prerequisites: 'None',
    task: 'Use the `traceroute` (macOS/Linux) or `tracert` (Windows) command to trace the route from your computer to google.com. Count the hops and identify which ones add the most latency.',
    youtubeQuery: 'TCP IP packets routing explained visually',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work'
  },
  {
    id: 'http-https',
    label: 'HTTP & HTTPS',
    section: 1,
    sectionTitle: 'Internet Basics',
    isMain: false,
    parent: 'internet',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2 days',
    whyMatters: 'HTTP is the language of the web. Every API call you write uses it. Understanding methods, headers, and status codes is non-negotiable for debugging failed requests, designing REST APIs, and knowing why CORS errors happen. HTTPS and TLS are required for any production site — browsers actively block mixed content and show scary warnings without it.',
    learn: [
      'HTTP methods: GET, POST, PUT, PATCH, DELETE and when to use each',
      'Status codes: 2xx success, 3xx redirects, 4xx client errors, 5xx server errors',
      'Request and response headers: Content-Type, Authorization, Cache-Control, CORS headers',
      'How TLS/SSL handshake works and why HTTPS is mandatory',
      'HTTP/1.1 vs HTTP/2 vs HTTP/3 — multiplexing and performance gains',
      'Cookies, Set-Cookie, SameSite, Secure, HttpOnly flags',
      'How browser caching works with ETag, Last-Modified, Cache-Control: max-age'
    ],
    prerequisites: 'How Internet Works',
    task: 'Using fetch() in the browser console, make a GET request to https://jsonplaceholder.typicode.com/posts/1 and log the status code, one request header, and one response header. Then make a POST request with a JSON body.',
    youtubeQuery: 'HTTP methods status codes headers explained for developers',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview'
  },
  {
    id: 'dns-domains',
    label: 'DNS & Domains',
    section: 1,
    sectionTitle: 'Internet Basics',
    isMain: false,
    parent: 'internet',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 day',
    whyMatters: 'When you deploy a site or configure a custom domain, you must understand DNS records. Misconfigured DNS is one of the most common causes of deployment failures. Knowing how A records, CNAMEs, and TTLs work lets you confidently point domains to Vercel, Netlify, or a custom server without hours of confusion.',
    learn: [
      'The DNS resolution chain: browser cache → OS → resolver → root → TLD → authoritative',
      'A record, AAAA record, CNAME, MX, TXT record types and their uses',
      'TTL (Time To Live) and why propagation takes time',
      'How HTTPS certificates (Let\'s Encrypt, ACME protocol) relate to domains',
      'Subdomains: www vs root domain, wildcard certs',
      'Using nslookup and dig CLI tools to debug DNS'
    ],
    prerequisites: 'How Internet Works',
    task: 'Register a free subdomain on a service like Freenom or use a domain you own. Point it to a GitHub Pages site using a CNAME record. Verify the DNS has propagated using https://dnschecker.org.',
    youtubeQuery: 'DNS explained how domain name resolution works',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name'
  },
  {
    id: 'how-browsers-work',
    label: 'How Browsers Work',
    section: 1,
    sectionTitle: 'Internet Basics',
    isMain: false,
    parent: 'internet',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2 days',
    whyMatters: 'Performance optimization is impossible without knowing how browsers parse HTML, build the DOM and CSSOM, create a render tree, and paint pixels. Understanding reflow (layout) and repaint helps you write CSS and JavaScript that does not destroy your Core Web Vitals score. Senior frontend engineers are expected to diagnose performance bottlenecks using this knowledge.',
    learn: [
      'HTML parsing: tokenization, tree construction, DOM building',
      'CSS parsing: building the CSSOM in parallel with the DOM',
      'Render tree construction from DOM + CSSOM',
      'Layout (reflow): computing geometry of every element',
      'Paint: filling in pixels, layer compositing',
      'What blocks rendering: render-blocking scripts and stylesheets',
      'How async/defer attributes on <script> change loading behavior'
    ],
    prerequisites: 'HTTP & HTTPS, DNS & Domains',
    task: 'Open the Performance panel in Chrome DevTools. Record a page load of any news website. Identify in the flame chart where HTML parsing, style recalculation, layout, and paint occur. Take a screenshot and label each phase.',
    youtubeQuery: 'how browsers work rendering pipeline parsing DOM CSSOM',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work'
  },
  {
    id: 'browser-devtools',
    label: 'Browser DevTools',
    section: 1,
    sectionTitle: 'Internet Basics',
    isMain: false,
    parent: 'internet',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2 days',
    whyMatters: 'DevTools is your primary debugging environment as a frontend developer. You will live in it every single day. Mastering the Elements, Console, Network, and Performance panels dramatically reduces the time you spend debugging CSS layout issues, JavaScript errors, and slow API calls. Companies expect new hires to be fluent in DevTools from day one.',
    learn: [
      'Elements panel: inspect and live-edit DOM and CSS',
      'Console: logging, running JS snippets, viewing errors and warnings',
      'Network panel: filter requests, inspect headers, simulate slow 3G',
      'Sources panel: set breakpoints, step through JS, watch variables',
      'Performance panel: record and analyze frame rate, scripting, rendering',
      'Application panel: inspect localStorage, sessionStorage, cookies, service workers',
      'Lighthouse: run performance and accessibility audits'
    ],
    prerequisites: 'How Browsers Work',
    task: 'Go to any e-commerce site. Using only DevTools: (1) change the hero heading text live, (2) find the slowest API request in the Network tab, (3) run Lighthouse and note the Performance score and top 3 recommendations.',
    youtubeQuery: 'Chrome DevTools complete guide for web developers',
    docsUrl: 'https://developer.chrome.com/docs/devtools/'
  },

  // ─────────────────────────────────────────────
  // SECTION 2 — HTML
  // ─────────────────────────────────────────────
  {
    id: 'html',
    label: 'HTML',
    section: 2,
    sectionTitle: 'HTML',
    isMain: true,
    parent: null,
    border: 'orange',
    difficulty: 'BEGINNER',
    time: '5–7 days',
    whyMatters: 'HTML is the skeleton of every web page. Without solid HTML knowledge, your CSS will fight you and your JavaScript will break. Well-structured semantic HTML improves SEO, accessibility, and maintainability. Recruiters reviewing your GitHub portfolio can tell immediately if you write sloppy HTML div-soup versus clean, semantic markup.',
    learn: [
      'Document structure: DOCTYPE, html, head, body and their purposes',
      'Semantic vs non-semantic elements and why semantics matter for SEO',
      'All form input types and their built-in validation behavior',
      'Embedding media: images, video, audio with correct attributes',
      'Accessibility roles and ARIA attributes',
      'Table markup for tabular data (not layout)',
      'Meta tags for SEO, viewport, Open Graph, Twitter cards'
    ],
    prerequisites: 'Internet Basics',
    task: 'Build a fully semantic personal portfolio page from scratch with no CSS frameworks: header with nav, hero section, skills grid, project cards with figures, a contact form, and footer. Use zero <div> elements where a semantic alternative exists.',
    youtubeQuery: 'HTML full course for beginners semantic HTML5',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
  },
  {
    id: 'html-basics',
    label: 'Basics & Document Structure',
    section: 2,
    sectionTitle: 'HTML',
    isMain: false,
    parent: 'html',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 day',
    whyMatters: 'The foundation of every web page. Without knowing how DOCTYPE, head, and meta tags work, you will ship pages with incorrect encoding, broken mobile viewports, and missing SEO metadata. These are the first things a senior developer checks when reviewing your code.',
    learn: [
      '<!DOCTYPE html> declaration and why it triggers standards mode',
      '<html lang=""> and why the lang attribute matters for screen readers',
      '<head> vs <body>: what belongs where and why',
      '<meta charset>, <meta viewport>, <meta description> and their effects',
      '<title> tag — appears in browser tab and Google search results',
      '<link> for stylesheets, favicons, preconnect, preload',
      '<script> placement and async/defer attributes'
    ],
    prerequisites: 'None',
    task: 'Create an HTML file from memory without autocomplete. Add correct DOCTYPE, charset, viewport meta, a title, a linked stylesheet, and a deferred script. Validate it at validator.w3.org and fix all errors.',
    youtubeQuery: 'HTML document structure head body meta tags explained',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML'
  },
  {
    id: 'semantic-html',
    label: 'Semantic HTML5',
    section: 2,
    sectionTitle: 'HTML',
    isMain: false,
    parent: 'html',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2 days',
    whyMatters: 'Semantic HTML is the difference between a page Google can index and understand versus a wall of meaningless divs. It also determines how screen reader users navigate your site. Companies that care about accessibility and SEO — which is most companies — specifically look for semantic HTML in code reviews.',
    learn: [
      '<header>, <nav>, <main>, <footer> — landmark regions for screen readers',
      '<section> vs <article> vs <aside>: when to use which',
      '<figure> and <figcaption> for images with captions',
      '<time datetime=""> for machine-readable dates',
      '<address> for contact information',
      '<details> and <summary> for native accordions',
      'Heading hierarchy: h1–h6 for document outline and SEO'
    ],
    prerequisites: 'Basics & Document Structure',
    task: 'Take a real blog post from Medium. Recreate its HTML structure using only semantic elements. Show the page outline using the Chrome Accessibility tree (DevTools → Accessibility tab) — it should make logical sense with no landmarks missing.',
    youtubeQuery: 'semantic HTML5 elements explained header nav main article',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html'
  },
  {
    id: 'text-media',
    label: 'Text & Media',
    section: 2,
    sectionTitle: 'HTML',
    isMain: false,
    parent: 'html',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 day',
    whyMatters: 'Correctly embedding images and video affects your Core Web Vitals score directly. The width/height attributes on images prevent layout shift (CLS). The loading="lazy" attribute defers off-screen images. Using the correct heading hierarchy affects SEO. These are practical skills with immediate business impact.',
    learn: [
      'Heading hierarchy: h1–h6 and the one-h1-per-page rule',
      '<img> with src, alt, width, height, loading="lazy", srcset',
      '<picture> element with <source> for art direction and format switching',
      '<video> with controls, autoplay, muted, loop, poster, <source>',
      '<audio> with controls, autoplay, loop',
      '<iframe> for embedding maps, videos, third-party widgets',
      '<a href> targets: _blank with rel="noopener noreferrer" for security'
    ],
    prerequisites: 'Basics & Document Structure',
    task: 'Build a media-rich article page. Include: a responsive <picture> that serves WebP on modern browsers and JPEG as fallback, a lazy-loaded gallery of 6 images, an embedded YouTube video using <iframe>, and a linked audio player.',
    youtubeQuery: 'HTML images video audio iframe complete guide',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding'
  },
  {
    id: 'lists-tables',
    label: 'Lists & Tables',
    section: 2,
    sectionTitle: 'HTML',
    isMain: false,
    parent: 'html',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 day',
    whyMatters: 'Tables are misused constantly — some developers still use them for layout, which destroys accessibility and responsiveness. Knowing the correct markup for data tables (with thead, tbody, scope attributes) is important for dashboards, pricing pages, and comparison charts that appear in almost every professional web app.',
    learn: [
      '<ul>, <ol>, <li> — unordered vs ordered and when to choose which',
      '<dl>, <dt>, <dd> — definition lists for glossaries and metadata',
      '<table>, <thead>, <tbody>, <tfoot>, <tr>, <th>, <td>',
      'colspan and rowspan for spanning cells across columns/rows',
      'scope="col" and scope="row" on <th> for accessibility',
      '<caption> for table descriptions',
      'Why tables must never be used for layout'
    ],
    prerequisites: 'Basics & Document Structure',
    task: 'Build a pricing comparison table for 3 plans × 8 features. Use proper semantic table markup with thead/tbody, th elements with scope, a caption, and at least one colspan. Make it horizontally scrollable on mobile with CSS overflow-x: auto.',
    youtubeQuery: 'HTML tables tutorial lists semantic markup',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics'
  },
  {
    id: 'forms-inputs',
    label: 'Forms & Inputs',
    section: 2,
    sectionTitle: 'HTML',
    isMain: false,
    parent: 'html',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2 days',
    whyMatters: 'Forms are how users interact with your product — sign-up, login, checkout, search. A broken form means lost conversions. Native HTML validation (required, pattern, min, max) provides free UX improvements without JavaScript. Proper label associations improve accessibility scores and are legally required for government/enterprise applications.',
    learn: [
      'All input types: text, email, password, number, tel, url, date, file, checkbox, radio, range, color',
      '<label for=""> and how it pairs with input id for accessibility',
      '<fieldset> and <legend> for grouping related inputs',
      'Built-in validation: required, minlength, maxlength, pattern, min, max',
      '<select>, <option>, <optgroup> for dropdowns',
      '<textarea> for multiline input',
      'Form submission: action, method, enctype attributes; FormData API'
    ],
    prerequisites: 'Semantic HTML5',
    task: 'Build a complete multi-step registration form: Step 1 (name, email, password with strength indicator), Step 2 (profile: avatar upload, bio textarea, birthday date input), Step 3 (preferences: radio buttons, checkboxes). Add HTML5 validation on every field with custom error messages via setCustomValidity().',
    youtubeQuery: 'HTML forms inputs validation complete tutorial',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Forms'
  },
  {
    id: 'accessibility-aria',
    label: 'Accessibility / ARIA',
    section: 2,
    sectionTitle: 'HTML',
    isMain: false,
    parent: 'html',
    border: 'dashed',
    difficulty: 'INTERMEDIATE',
    time: '3 days',
    whyMatters: 'Web accessibility (a11y) is legally required in many countries (ADA in the US, EN 301 549 in Europe). Enterprise and government contracts often have WCAG 2.1 AA compliance as a hard requirement. Beyond legal obligation, accessible sites rank better in search engines and serve the 15% of users who have some form of disability.',
    learn: [
      'WCAG 2.1 four principles: Perceivable, Operable, Understandable, Robust',
      'ARIA roles: role="button", "dialog", "alert", "navigation", "main"',
      'aria-label, aria-labelledby, aria-describedby for naming elements',
      'aria-expanded, aria-hidden, aria-live for dynamic content',
      'Keyboard navigation: tab order, focus management, :focus-visible',
      'Screen reader testing with NVDA (Windows) or VoiceOver (Mac/iOS)',
      'Colour contrast requirements: 4.5:1 for normal text, 3:1 for large text'
    ],
    prerequisites: 'Semantic HTML5, Forms & Inputs',
    task: 'Take any component you have built before (a modal, dropdown, or tab panel) and make it fully keyboard accessible. Test it by unplugging your mouse and navigating only with Tab, Shift+Tab, Enter, and Escape. Then run axe DevTools browser extension and fix all violations.',
    youtubeQuery: 'web accessibility ARIA keyboard navigation WCAG guide',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
  },

  // ─────────────────────────────────────────────
  // SECTION 3 — CSS
  // ─────────────────────────────────────────────
  {
    id: 'css',
    label: 'CSS',
    section: 3,
    sectionTitle: 'CSS',
    isMain: true,
    parent: null,
    border: 'orange',
    difficulty: 'BEGINNER',
    time: '2–3 weeks',
    whyMatters: 'CSS is what makes websites beautiful, responsive, and usable. A developer who cannot confidently write CSS is limited to pre-built UI kits and will always struggle to implement precise designs. Modern CSS with Grid, Flexbox, custom properties, and animations covers everything that previously required JavaScript or image-based hacks.',
    learn: [
      'The cascade: how specificity, inheritance, and source order interact',
      'Flexbox for one-dimensional layouts',
      'CSS Grid for two-dimensional layouts',
      'Responsive design with media queries and fluid units',
      'CSS custom properties (variables) for dynamic theming',
      'Transitions and keyframe animations',
      'Modern selectors: :is(), :where(), :has(), :not()'
    ],
    prerequisites: 'HTML',
    task: 'Clone the Spotify web player layout using only HTML and CSS — no frameworks. It must have a sidebar, a main content area with a grid of albums, a sticky bottom player bar, and be fully responsive down to 375px mobile.',
    youtubeQuery: 'CSS complete course flexbox grid animations modern CSS',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
  },
  {
    id: 'css-selectors',
    label: 'Selectors & Specificity',
    section: 3,
    sectionTitle: 'CSS',
    isMain: false,
    parent: 'css',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2 days',
    whyMatters: 'Specificity wars are one of the most common sources of CSS bugs. When your styles "don\'t work", it is almost always a specificity issue. Understanding how the browser calculates which rule wins lets you write CSS that is predictable, maintainable, and doesn\'t require !important hacks.',
    learn: [
      'Type, class, ID, attribute, pseudo-class, pseudo-element selectors',
      'Specificity calculation: 0-0-0 to 1-0-0 notation',
      'The cascade order: user-agent → author → user → !important',
      'Combinators: descendant, child (>), adjacent (+), sibling (~)',
      ':is(), :where(), :not(), :has() modern pseudo-classes',
      '::before, ::after, ::placeholder, ::selection pseudo-elements',
      'CSS layers (@layer) for managing specificity in large codebases'
    ],
    prerequisites: 'HTML Basics',
    task: 'Without using any class or ID, write CSS that styles: every other table row differently, the first and last list items uniquely, any input that is focused AND invalid, and links inside nav that are not visited. Explain the specificity score of each rule.',
    youtubeQuery: 'CSS selectors specificity cascade explained',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity'
  },
  {
    id: 'box-model',
    label: 'Box Model',
    section: 3,
    sectionTitle: 'CSS',
    isMain: false,
    parent: 'css',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 day',
    whyMatters: 'The box model is the single most misunderstood CSS concept. Every layout bug involving unexpected sizes, overflow, or spacing comes back to not truly understanding content, padding, border, margin, and box-sizing. Mastering this eliminates an entire class of layout bugs permanently.',
    learn: [
      'Four layers: content, padding, border, margin and how they stack',
      'box-sizing: content-box (default) vs border-box and why you always want border-box',
      'display: block vs inline vs inline-block — how each affects box dimensions',
      'Margin collapsing: when adjacent margins merge and when they don\'t',
      'overflow: visible, hidden, scroll, auto — controlling content overflow',
      'outline vs border — outline does not affect layout',
      'DevTools box model visualizer for debugging padding/margin issues'
    ],
    prerequisites: 'Selectors & Specificity',
    task: 'Build a card component. Using only the box model (no flexbox/grid), create a card with an image, a padded content area, a visible border, outer margin, and a "read more" link. Set box-sizing: border-box globally and verify all measurements match what you expect using DevTools.',
    youtubeQuery: 'CSS box model explained box-sizing border-box',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model'
  },
  {
    id: 'display-positioning',
    label: 'Display & Positioning',
    section: 3,
    sectionTitle: 'CSS',
    isMain: false,
    parent: 'css',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2 days',
    whyMatters: 'Understanding position: relative, absolute, fixed, sticky is essential for modals, tooltips, sticky headers, and overlays — components that appear in almost every web app. Without this knowledge you will cargo-cult code and not understand why your dropdown appears in the wrong place or your modal breaks on scroll.',
    learn: [
      'display: block, inline, inline-block, none and their layout behaviours',
      'position: static (default), relative, absolute, fixed, sticky',
      'Stacking context: what creates one, how z-index works within it',
      'top, right, bottom, left — how they work relative to the positioning parent',
      'The containing block: which ancestor absolute positioning is relative to',
      'Common patterns: sticky header, fixed bottom bar, centred modal overlay',
      'visibility: hidden vs display: none — rendering vs hiding'
    ],
    prerequisites: 'Box Model',
    task: 'Build a tooltip component that appears absolutely positioned above or below a button depending on viewport space. Build a sticky sidebar that stays fixed on scroll but doesn\'t overlap the footer. Build a modal with a fixed backdrop that correctly covers the whole viewport.',
    youtubeQuery: 'CSS position absolute relative fixed sticky z-index explained',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/position'
  },
  {
    id: 'flexbox',
    label: 'Flexbox',
    section: 3,
    sectionTitle: 'CSS',
    isMain: false,
    parent: 'css',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '3 days',
    whyMatters: 'Flexbox is the workhorse of modern CSS layouts. Navigation bars, card rows, button groups, centered content — virtually every UI component uses Flexbox. It is impossible to write production CSS today without daily use of Flexbox. Knowing every property deeply (not just justify-content: center) is what separates confident CSS writers from those who guess until it works.',
    learn: [
      'flex container properties: flex-direction, flex-wrap, justify-content, align-items, align-content, gap',
      'flex item properties: flex-grow, flex-shrink, flex-basis, the flex shorthand',
      'align-self and order for per-item overrides',
      'The flex: 1 shorthand and what it actually means (1 1 0)',
      'Centring: the justify-content + align-items: center pattern',
      'flex-wrap: wrap for responsive grids without media queries',
      'Common Flexbox patterns: navigation bar, card layout, holy grail layout'
    ],
    prerequisites: 'Display & Positioning',
    task: 'Build a responsive navigation bar with Flexbox: logo left, links center, auth buttons right. On mobile it should stack vertically. Also build a product card grid that wraps naturally and has equal-height cards using flex column layout inside each card.',
    youtubeQuery: 'CSS flexbox complete guide tutorial all properties',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox'
  },
  {
    id: 'css-grid',
    label: 'CSS Grid',
    section: 3,
    sectionTitle: 'CSS',
    isMain: false,
    parent: 'css',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '3 days',
    whyMatters: 'CSS Grid solves two-dimensional layouts that were previously impossible or required JavaScript. Magazine layouts, dashboards, image galleries, and complex page layouts all become simple with Grid. Modern design systems like Tailwind are built on top of Grid concepts. Knowing Grid deeply makes you the person on the team who can implement any design spec.',
    learn: [
      'grid-template-columns and grid-template-rows with fr units, repeat(), minmax()',
      'grid-area, grid-column, grid-row for placing items explicitly',
      'Named template areas with grid-template-areas for readable layouts',
      'auto-fill vs auto-fit with minmax() for responsive grids without media queries',
      'gap (row-gap, column-gap) for consistent gutters',
      'Implicit vs explicit grid: how auto placement works',
      'Subgrid for aligning nested grid children across parent columns'
    ],
    prerequisites: 'Flexbox',
    task: 'Build a Pinterest-style masonry gallery using CSS Grid with grid-template-rows: masonry (or a JS fallback). Also build a full-page dashboard layout with a header, sidebar, main content area, and footer using named grid-template-areas.',
    youtubeQuery: 'CSS grid complete tutorial template areas fr units responsive',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids'
  },
  {
    id: 'responsive-design',
    label: 'Responsive Design',
    section: 3,
    sectionTitle: 'CSS',
    isMain: false,
    parent: 'css',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '3 days',
    whyMatters: 'More than 60% of web traffic is on mobile. A site that looks broken on phones is not just bad UX — it hurts SEO rankings since Google uses mobile-first indexing. Responsive design is not optional; it is a baseline expectation for any professional frontend developer.',
    learn: [
      'Mobile-first approach: write base styles for small screens, add breakpoints for larger',
      'Media queries: min-width, max-width, orientation, prefers-color-scheme, prefers-reduced-motion',
      'Viewport units: vw, vh, dvh (dynamic viewport height for mobile browsers)',
      'Fluid typography: clamp(min, preferred, max) for responsive font sizes without breakpoints',
      'Responsive images: srcset, sizes attributes, the <picture> element',
      'Container queries: @container for component-level responsiveness',
      'Common breakpoints and when to use them vs content-based breakpoints'
    ],
    prerequisites: 'Flexbox, CSS Grid',
    task: 'Take a complex desktop design (find one on Dribbble) and implement it fully responsive: desktop → tablet → mobile, with at least 3 breakpoints. Use clamp() for fluid typography, srcset for responsive images, and at least one container query.',
    youtubeQuery: 'responsive design CSS media queries mobile first clamp',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design'
  },
  {
    id: 'typography-colors',
    label: 'Typography & Colors',
    section: 3,
    sectionTitle: 'CSS',
    isMain: false,
    parent: 'css',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2 days',
    whyMatters: 'Typography and color are what make a UI feel professional versus amateurish. Bad font sizing, line heights, and color contrast are the most common signs of a junior developer. Learning to use type scales, pairing fonts, and building proper color palettes with CSS variables takes your UI from functional to polished.',
    learn: [
      'font-family stack: web fonts, system fonts, fallbacks',
      'font-size with rem vs px vs em — why rem is preferred',
      'line-height, letter-spacing, word-spacing for readability',
      'font-weight: 100–900 and variable fonts',
      'Color formats: hex, rgb(), hsl(), oklch() for perceptual uniformity',
      'CSS custom properties for design tokens (--color-primary, --font-size-lg)',
      'Linear and radial gradients, conic gradients'
    ],
    prerequisites: 'CSS Basics',
    task: 'Build a typography specimen page using Google Fonts. Show a heading scale (h1–h6) with correct proportions, body text at optimal line-length (60–75 chars), a color palette using HSL variables with light/dark variants, and a gradient hero section.',
    youtubeQuery: 'CSS typography fonts color palette design system variables',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text'
  },
  {
    id: 'transitions-animations',
    label: 'Transitions & Animations',
    section: 3,
    sectionTitle: 'CSS',
    isMain: false,
    parent: 'css',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '2 days',
    whyMatters: 'Animations are the difference between a UI that feels alive and one that feels static. Used correctly, they guide user attention, provide feedback, and make transitions feel natural. CSS animations are more performant than JavaScript-based ones because they run on the compositor thread, bypassing the main thread entirely.',
    learn: [
      'transition: property duration timing-function delay shorthand',
      'Which properties are cheap to animate: transform and opacity (compositor thread)',
      'Which properties are expensive: width, height, top, left (trigger reflow)',
      '@keyframes syntax: from/to and percentage keyframes',
      'animation shorthand: name duration timing-function delay iteration-count direction fill-mode',
      'will-change: transform — when to use and when it hurts performance',
      'prefers-reduced-motion: respecting user accessibility preferences'
    ],
    prerequisites: 'Display & Positioning',
    task: 'Build an animated loading skeleton for a card component. Build a page-enter animation with staggered fade-up for list items. Build a smooth CSS-only accordion. All animations must respect prefers-reduced-motion: reduce by disabling non-essential motion.',
    youtubeQuery: 'CSS animations transitions keyframes performance guide',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations'
  },
  {
    id: 'css-variables',
    label: 'CSS Variables',
    section: 3,
    sectionTitle: 'CSS',
    isMain: false,
    parent: 'css',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '1 day',
    whyMatters: 'CSS custom properties (variables) are the foundation of every modern design system and theming solution. They power dark/light mode toggles, brand customization, and component variants. Every major UI library from shadcn/ui to Material UI uses CSS custom properties under the hood. This is not optional knowledge for production frontend work.',
    learn: [
      'Declaring variables on :root for global scope',
      'Local variable scope: overriding on component selectors',
      'var(--name, fallback) syntax and the fallback mechanism',
      'Dynamic theming: toggling a class on <html> to swap an entire color palette',
      'JavaScript interop: getComputedStyle() and setProperty() for JS-driven theming',
      'Using custom properties for spacing scales, font size scales, border radii',
      'CSS variable inheritance and the cascade'
    ],
    prerequisites: 'Selectors & Specificity, Typography & Colors',
    task: 'Build a complete design token system with CSS variables for a UI component library: define color, spacing, font-size, border-radius, and shadow tokens. Implement a dark/light mode toggle that switches themes by adding a class to the root element, with no JavaScript required for the visual change.',
    youtubeQuery: 'CSS custom properties variables theming dark mode',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties'
  },
  {
    id: 'sass-scss',
    label: 'Sass / SCSS',
    section: 3,
    sectionTitle: 'CSS',
    isMain: false,
    parent: 'css',
    border: 'dashed',
    difficulty: 'INTERMEDIATE',
    time: '2 days',
    whyMatters: 'While modern CSS has closed the gap significantly, Sass/SCSS is still used in millions of production codebases. Many companies have existing SCSS codebases you will need to maintain. Mixins and functions provide reusable patterns that CSS variables alone cannot express. It is valuable knowledge even if you ultimately prefer CSS-in-JS or Tailwind.',
    learn: [
      'SCSS syntax vs indented Sass syntax — use SCSS for CSS compatibility',
      'Variables: $primary-color vs CSS custom properties — differences and use cases',
      'Nesting: keeping parent context with &, and the specificity trap of over-nesting',
      'Mixins: @mixin and @include with arguments for reusable patterns',
      '@extend and the %placeholder pattern — when to use vs mixins',
      'Partials and @use / @forward for modular file organization',
      'Built-in modules: sass:color, sass:math for programmatic manipulation'
    ],
    prerequisites: 'CSS Variables, CSS Selectors',
    task: 'Convert an existing CSS file you have written into SCSS. Create partials for variables, mixins, and components. Build a mixin for responsive breakpoints and a color-scheme mixin. Run the SCSS compiler with --watch to see live output.',
    youtubeQuery: 'Sass SCSS tutorial mixins variables nesting partials',
    docsUrl: 'https://sass-lang.com/documentation/'
  },
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    section: 3,
    sectionTitle: 'CSS',
    isMain: false,
    parent: 'css',
    border: 'purple',
    difficulty: 'INTERMEDIATE',
    time: '3 days',
    whyMatters: 'Tailwind CSS is the most popular CSS framework in 2024, used by companies like GitHub, Shopify, and Netflix. It dominates the React/Next.js ecosystem. Being fluent in Tailwind is practically a requirement for most modern frontend positions. Its utility-first approach forces you to deeply understand CSS while dramatically speeding up development.',
    learn: [
      'Utility-first philosophy: composing styles in HTML vs writing custom CSS',
      'Responsive prefixes: sm:, md:, lg:, xl:, 2xl: for mobile-first breakpoints',
      'State variants: hover:, focus:, active:, disabled:, group-hover:',
      'Dark mode: dark: variant with class or media strategy',
      'tailwind.config.js: extending theme, custom colors, fonts, spacing',
      'JIT (Just-in-Time) mode and arbitrary values with square brackets [value]',
      '@apply for extracting repeated utility patterns into component classes'
    ],
    prerequisites: 'Responsive Design, CSS Variables',
    task: 'Rebuild a component you previously made with plain CSS using only Tailwind utility classes. Then customise the Tailwind config to add your own brand color, a custom font, and a custom breakpoint. Finally use @apply to create a reusable .btn-primary class.',
    youtubeQuery: 'Tailwind CSS full tutorial complete guide config dark mode',
    docsUrl: 'https://tailwindcss.com/docs'
  },

  // ─────────────────────────────────────────────
  // SECTION 4 — JAVASCRIPT
  // ─────────────────────────────────────────────
  {
    id: 'javascript',
    label: 'JavaScript',
    section: 4,
    sectionTitle: 'JavaScript',
    isMain: true,
    parent: null,
    border: 'orange',
    difficulty: 'INTERMEDIATE',
    time: '3–4 weeks',
    whyMatters: 'JavaScript is the only programming language that runs natively in browsers, making it essential for any frontend developer. It is also the most used programming language in the world. Mastering JavaScript — not just its syntax but its runtime model, closures, prototypes, and async behaviour — is what transforms you from someone who reads tutorials into an engineer who can build anything.',
    learn: [
      'The JavaScript event loop and why it matters for performance',
      'Closures, scope, and the prototype chain',
      'Promises and async/await for asynchronous operations',
      'The DOM API for building interactive interfaces',
      'Modern ES6+ features used daily in production',
      'Error handling strategies for robust applications',
      'Browser storage APIs for client-side persistence'
    ],
    prerequisites: 'HTML, CSS',
    task: 'Build a fully functional Kanban board from scratch using vanilla JavaScript: drag-and-drop cards between columns, localStorage persistence, inline editing of card titles, and a "cards done today" counter. No frameworks, no libraries.',
    youtubeQuery: 'JavaScript full course modern ES6 complete guide',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'
  },
  {
    id: 'js-variables',
    label: 'Variables & Data Types',
    section: 4,
    sectionTitle: 'JavaScript',
    isMain: false,
    parent: 'javascript',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2 days',
    whyMatters: 'JavaScript\'s type system is the source of some of its most notorious bugs (undefined is not a function, NaN comparisons, loose equality). Understanding type coercion, the difference between == and ===, and how var/let/const differ prevents entire categories of bugs before they happen.',
    learn: [
      'var vs let vs const: hoisting, temporal dead zone, block scope vs function scope',
      'Primitive types: string, number, boolean, null, undefined, symbol, bigint',
      'typeof operator and its quirks (typeof null === "object")',
      'Explicit type coercion: String(), Number(), Boolean()',
      'Implicit coercion: truthy/falsy values, loose equality (==) hazards',
      'NaN: Not a Number, isNaN() vs Number.isNaN()',
      'Template literals: `${expression}` and tagged templates'
    ],
    prerequisites: 'HTML Basics',
    task: 'Without running the code first, predict the output of 20 JavaScript type coercion puzzles (search "JavaScript type coercion quiz"). Then verify your answers. For every wrong answer, write a comment explaining the actual behaviour.',
    youtubeQuery: 'JavaScript variables data types type coercion var let const',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures'
  },
  {
    id: 'js-functions',
    label: 'Functions & Scope',
    section: 4,
    sectionTitle: 'JavaScript',
    isMain: false,
    parent: 'javascript',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '3 days',
    whyMatters: 'Closures are asked about in virtually every frontend JavaScript interview. Understanding scope, the execution context, and how closures capture variables is essential for writing React hooks correctly, building event handlers that work as expected, and avoiding memory leaks. These are the concepts that define JavaScript fluency.',
    learn: [
      'Function declarations vs expressions vs arrow functions — hoisting differences',
      'this binding: implicit, explicit (call/apply/bind), arrow functions and lexical this',
      'Closures: functions remembering their lexical environment',
      'IIFE (Immediately Invoked Function Expression) for scoping',
      'Hoisting: how var declarations and function declarations are hoisted',
      'The call stack and execution context',
      'Higher-order functions: functions that take or return other functions'
    ],
    prerequisites: 'Variables & Data Types',
    task: 'Build a createCounter() factory function that returns an object with increment, decrement, reset, and getCount methods — all using closure (no class keyword). Then build a memoize() higher-order function that caches expensive function results. Test both with console.assert().',
    youtubeQuery: 'JavaScript closures scope execution context explained',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures'
  },
  {
    id: 'js-arrays-objects',
    label: 'Arrays & Objects',
    section: 4,
    sectionTitle: 'JavaScript',
    isMain: false,
    parent: 'javascript',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '3 days',
    whyMatters: 'Arrays and objects are the data structures you use for 95% of JavaScript programming. The array methods map, filter, reduce, and find are used constantly in React to render lists and transform API data. Destructuring and spread syntax appear in virtually every modern JavaScript codebase. These are must-know concepts.',
    learn: [
      'Array methods: map, filter, reduce, find, findIndex, some, every, flat, flatMap',
      'Mutating vs non-mutating methods: sort/splice vs slice/toSorted',
      'Object.keys(), Object.values(), Object.entries() for iteration',
      'Destructuring: array destructuring, object destructuring with renaming and defaults',
      'Spread operator (...) and rest parameters in functions',
      'Optional chaining (a?.b?.c) and nullish coalescing (a ?? b)',
      'Shallow vs deep cloning: structuredClone() vs JSON.parse(JSON.stringify())'
    ],
    prerequisites: 'Functions & Scope',
    task: 'Given a raw API response array of 50 user objects, write a data pipeline using only array methods (no loops): filter active users, sort by last login date, group by country using reduce, and return the top 3 most active countries with their user counts.',
    youtubeQuery: 'JavaScript array methods map filter reduce destructuring',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array'
  },
  {
    id: 'dom-manipulation',
    label: 'DOM Manipulation',
    section: 4,
    sectionTitle: 'JavaScript',
    isMain: false,
    parent: 'javascript',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '3 days',
    whyMatters: 'The DOM is the bridge between JavaScript and HTML. Every interactive feature — showing/hiding elements, updating content dynamically, building todo lists — uses the DOM API. Understanding the performance implications of DOM manipulation (batch reads before writes, using DocumentFragment) separates efficient developers from those who cause janky UIs.',
    learn: [
      'querySelector and querySelectorAll vs getElementById/getElementsByClassName',
      'createElement, appendChild, insertBefore, remove, replaceWith',
      'classList: add, remove, toggle, contains, replace',
      'dataset attributes for storing custom data on elements',
      'innerHTML (XSS risk) vs textContent vs innerText — when to use each',
      'Traversal: parentElement, children, nextElementSibling, closest()',
      'DocumentFragment for batching DOM insertions for performance'
    ],
    prerequisites: 'Arrays & Objects, HTML',
    task: 'Build a dynamic to-do list using only the DOM API (no innerHTML for user input — use textContent to prevent XSS). Features: add tasks, delete tasks, mark done, filter by status, persist to localStorage. All DOM updates must use createElement and appendChild.',
    youtubeQuery: 'JavaScript DOM manipulation complete guide querySelector',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model'
  },
  {
    id: 'js-events',
    label: 'Events',
    section: 4,
    sectionTitle: 'JavaScript',
    isMain: false,
    parent: 'javascript',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '2 days',
    whyMatters: 'Event handling is the mechanism behind all user interaction. Understanding event bubbling and delegation is crucial for performance — attaching one listener to a parent instead of hundreds to children. Misunderstanding how this works in event callbacks is a very common interview question and a source of real bugs.',
    learn: [
      'addEventListener and removeEventListener — the memory leak trap',
      'Event object: target, currentTarget, type, preventDefault(), stopPropagation()',
      'Event bubbling and capturing: how events travel through the DOM',
      'Event delegation: handling dynamic child elements with one parent listener',
      'Custom events: new CustomEvent() with detail payload for component communication',
      'Common events: click, input, change, submit, keydown, keyup, scroll, resize',
      'Passive event listeners: { passive: true } for scroll performance'
    ],
    prerequisites: 'DOM Manipulation',
    task: 'Build a comment section that uses a single delegated event listener on the container for all edit, delete, and upvote buttons — even for comments added after page load. Clicking outside an open edit form should close it. This must work for 1000 comments with only one event listener.',
    youtubeQuery: 'JavaScript events bubbling delegation preventDefault explained',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events'
  },
  {
    id: 'fetch-async',
    label: 'Fetch API & Async',
    section: 4,
    sectionTitle: 'JavaScript',
    isMain: false,
    parent: 'javascript',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '3 days',
    whyMatters: 'Asynchronous JavaScript is unavoidable in modern web development. Every API call, file read, and database query is async. Without understanding Promises and async/await deeply, you will write callback hell, miss error cases, and create race conditions. This is consistently the most tested topic in frontend interviews.',
    learn: [
      'The Promise constructor: resolve, reject, and the executor function',
      'Promise chaining: .then(), .catch(), .finally()',
      'async/await syntax as syntactic sugar over Promises',
      'try/catch/finally for error handling in async functions',
      'fetch() API: method, headers, body, response.json(), response.ok',
      'Promise.all(), Promise.allSettled(), Promise.race(), Promise.any()',
      'Handling loading, error, and success states in the UI'
    ],
    prerequisites: 'Functions & Scope',
    task: 'Build a GitHub user search tool: fetch user data from the GitHub API, display avatar, bio, repos, and followers. Implement debounced search input (300ms), loading skeleton, error state for 404 users, and an abort controller to cancel in-flight requests when the user types again.',
    youtubeQuery: 'JavaScript fetch API async await promises complete tutorial',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch'
  },
  {
    id: 'es6-modern',
    label: 'ES6+ Modern JS',
    section: 4,
    sectionTitle: 'JavaScript',
    isMain: false,
    parent: 'javascript',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '2 days',
    whyMatters: 'Modern JavaScript syntax (ES6 through ES2024) is used universally in professional codebases. React code, Node.js APIs, and tooling configuration all rely heavily on ES modules, template literals, and optional chaining. Writing old-style ES5 code in a modern codebase marks you as someone who hasn\'t kept up with the language.',
    learn: [
      'ES Modules: import, export, export default, named vs default exports',
      'Template literals and tagged templates',
      'Nullish coalescing (??), optional chaining (?.), logical assignment (&&=, ||=, ??=)',
      'for...of for iterables, for...in for object keys (and why to avoid it)',
      'Symbol for unique property keys and well-known symbols',
      'Iterators and generators: function*, yield, the iterator protocol',
      'Proxy and Reflect for meta-programming (used by Vue 3 under the hood)'
    ],
    prerequisites: 'Arrays & Objects, Functions & Scope',
    task: 'Build a small module-based app with three files: utils.js (pure helper functions using modern syntax), api.js (fetch wrapper using async/await with proper error handling), and main.js (composes the two). Use only ES module syntax — no require(). Run it in the browser with type="module".',
    youtubeQuery: 'JavaScript ES6 ES2023 modern features complete guide modules',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/JavaScript_technologies_overview'
  },
  {
    id: 'browser-storage',
    label: 'Browser Storage',
    section: 4,
    sectionTitle: 'JavaScript',
    isMain: false,
    parent: 'javascript',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 day',
    whyMatters: 'Client-side storage powers offline experiences, user preferences, shopping carts, and auth token persistence. Choosing the wrong storage mechanism — storing sensitive data in localStorage, not setting cookie flags correctly, or using sessionStorage when you need persistence — leads to security vulnerabilities and bugs. Every frontend developer uses these APIs daily.',
    learn: [
      'localStorage: setItem, getItem, removeItem, clear, JSON.stringify/parse for objects',
      'sessionStorage: same API but cleared when the tab closes',
      'Cookies: document.cookie API, Set-Cookie header, Secure, HttpOnly, SameSite, Expires',
      'When to use each: localStorage for preferences, sessionStorage for temporary state, cookies for auth',
      'IndexedDB: the async, transactional DB for large structured data',
      'Cache API (Service Workers): caching network requests for offline support',
      'Storage limits: ~5MB for localStorage, unlimited for IndexedDB'
    ],
    prerequisites: 'Fetch API & Async',
    task: 'Build a "recently viewed" products feature: store the last 10 viewed product IDs in localStorage with timestamps. On page load, fetch the product data for these IDs and render a "Recently Viewed" section. Include an expiry mechanism — remove items older than 7 days.',
    youtubeQuery: 'JavaScript localStorage sessionStorage cookies IndexedDB guide',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'
  },
  {
    id: 'error-handling',
    label: 'Error Handling & Debugging',
    section: 4,
    sectionTitle: 'JavaScript',
    isMain: false,
    parent: 'javascript',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '2 days',
    whyMatters: 'Unhandled errors crash applications and frustrate users. Professional JavaScript applications catch errors gracefully, log them to monitoring services like Sentry, and show user-friendly fallback states. Senior engineers are distinguished by how they handle failure modes, not just happy paths.',
    learn: [
      'try/catch/finally: when to use each, rethrowing errors',
      'Custom error classes: extending Error with class NetworkError extends Error',
      'Promise rejection: unhandledRejection global event handler',
      'console methods: log, warn, error, group, table, time, timeEnd',
      'Debugger keyword and setting breakpoints in DevTools Sources panel',
      'Call stack inspection: reading stack traces to find error origins',
      'window.onerror and window.onunhandledrejection for global error monitoring'
    ],
    prerequisites: 'Fetch API & Async',
    task: 'Wrap an entire multi-step fetch workflow (search → select → load details → post review) with proper error handling at each step. Create custom error types for NetworkError, NotFoundError, and ValidationError. Log errors with structured data to the console in a way that would be useful for a monitoring service.',
    youtubeQuery: 'JavaScript error handling debugging try catch custom errors',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling'
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    section: 4,
    sectionTitle: 'JavaScript',
    isMain: false,
    parent: 'javascript',
    border: 'dashed',
    difficulty: 'INTERMEDIATE',
    time: '5–7 days',
    whyMatters: 'TypeScript is now the industry standard for professional JavaScript development. Over 80% of npm packages ship TypeScript types. React, Next.js, and virtually all major frameworks are written in TypeScript. Knowing TypeScript makes you more employable and prevents entire categories of runtime errors by catching them at compile time.',
    learn: [
      'Basic types: string, number, boolean, null, undefined, any, unknown, never, void',
      'Interfaces vs type aliases: when to use each, declaration merging',
      'Union types (A | B), intersection types (A & B), literal types',
      'Generics: function generics, generic interfaces, generic constraints',
      'Utility types: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, ReturnType<T>',
      'Type narrowing: typeof, instanceof, in operator, discriminated unions',
      'Strict mode: strictNullChecks, noImplicitAny and why to always enable them'
    ],
    prerequisites: 'ES6+ Modern JS',
    task: 'Take a JavaScript project you have built and migrate it to TypeScript with strict: true. Define interfaces for all API responses, use generics for your fetch wrapper, and ensure zero use of any type. The compiler must produce zero errors.',
    youtubeQuery: 'TypeScript complete tutorial generics utility types strict mode',
    docsUrl: 'https://www.typescriptlang.org/docs/'
  },

  // ─────────────────────────────────────────────
  // SECTION 5 — VERSION CONTROL
  // ─────────────────────────────────────────────
  {
    id: 'git',
    label: 'Git & GitHub',
    section: 5,
    sectionTitle: 'Version Control',
    isMain: true,
    parent: null,
    border: 'orange',
    difficulty: 'BEGINNER',
    time: '4–5 days',
    whyMatters: 'Git is the universal standard for version control, used by every professional software team in the world. Without Git, you cannot collaborate with other developers, contribute to open source, deploy via CI/CD pipelines, or even apply for most jobs. It is a non-negotiable professional skill, not an optional nice-to-have.',
    learn: [
      'Local Git workflow: init, add, commit, status, log, diff',
      'Remote workflow: clone, push, pull, fetch',
      'Branching strategy: feature branches, GitFlow, trunk-based development',
      'Merge vs rebase: when to use each, handling conflicts',
      'GitHub features: Pull Requests, Issues, code review, protected branches',
      'GitHub Actions for CI/CD automation',
      'Conventional commits and semantic versioning'
    ],
    prerequisites: 'Any coding knowledge',
    task: 'Create a project repository on GitHub. Work on it using a proper feature branch workflow: create a branch for each feature, commit with conventional commit messages (feat:, fix:, chore:), open a Pull Request, add a PR description with what changed and why, then merge it. Do this for at least 3 features.',
    youtubeQuery: 'Git and GitHub complete tutorial for beginners workflow',
    docsUrl: 'https://git-scm.com/doc'
  },
  {
    id: 'git-basics',
    label: 'Git Basics',
    section: 5,
    sectionTitle: 'Version Control',
    isMain: false,
    parent: 'git',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2 days',
    whyMatters: 'Git basics are the foundation of every developer\'s daily workflow. You will use git add, commit, push, and pull dozens of times every single working day. Getting these habits right from the start — atomic commits, meaningful messages, not committing to main directly — prevents team conflicts and makes code history useful for debugging.',
    learn: [
      'git init: initializing a repository',
      'git add: staging changes (git add -p for selective staging)',
      'git commit -m: writing good commit messages (imperative mood, 50-char subject)',
      'git push and git pull: syncing with remote',
      'git clone: copying a repository',
      'git status and git log --oneline --graph for inspecting state',
      '.gitignore: patterns for files not to track (node_modules, .env, dist)'
    ],
    prerequisites: 'None',
    task: 'Initialize a new Git repository for a project. Make at least 5 commits with meaningful messages following the conventional commits format. Create a .gitignore file that correctly ignores node_modules, .env files, and build output. Push to GitHub and verify the history looks clean.',
    youtubeQuery: 'Git basics tutorial init add commit push pull for beginners',
    docsUrl: 'https://git-scm.com/book/en/v2/Getting-Started-Git-Basics'
  },
  {
    id: 'git-branching',
    label: 'Branching & Merging',
    section: 5,
    sectionTitle: 'Version Control',
    isMain: false,
    parent: 'git',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2 days',
    whyMatters: 'Branching is what allows teams to work on multiple features simultaneously without breaking each other\'s work. Understanding merge vs rebase is important for keeping a clean, readable git history. Conflict resolution is a practical skill you will use regularly when collaborating with other developers.',
    learn: [
      'git branch: create, list, delete branches',
      'git checkout and git switch for changing branches',
      'git merge: fast-forward vs 3-way merge, --no-ff flag',
      'git rebase: replaying commits on a new base, interactive rebase -i',
      'Resolving merge conflicts: understanding conflict markers <<<<, ====, >>>>',
      'git stash: temporarily shelving work-in-progress changes',
      'git cherry-pick: applying specific commits to another branch'
    ],
    prerequisites: 'Git Basics',
    task: 'Simulate a team workflow: create two feature branches from main and make conflicting changes to the same file. Merge the first branch into main. Then attempt to merge the second — resolve the conflict manually. Then use interactive rebase to squash the last 3 commits of a branch into one clean commit.',
    youtubeQuery: 'Git branching merging rebase conflict resolution tutorial',
    docsUrl: 'https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell'
  },
  {
    id: 'github-workflow',
    label: 'GitHub Workflow',
    section: 5,
    sectionTitle: 'Version Control',
    isMain: false,
    parent: 'git',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2 days',
    whyMatters: 'GitHub is where the entire open source world lives and where professional development happens. Knowing how to fork, write Pull Requests, respond to code review, use Issues, and follow GitHub Flow is required to work on any team. Contributing to open source via a GitHub PR is also one of the best things you can add to a junior portfolio.',
    learn: [
      'Forking: creating your own copy of a repository to contribute',
      'Pull Requests: opening a PR with a clear description, linking to issues',
      'Code review: requesting reviews, leaving comments, using suggestion mode',
      'GitHub Issues: creating, labeling, assigning, and closing issues',
      'GitHub Flow: branch → commit → PR → review → merge workflow',
      'Protected branches: requiring reviews, passing CI before merge',
      'GitHub Pages: deploying static sites directly from a repository'
    ],
    prerequisites: 'Git Basics, Branching & Merging',
    task: 'Find a beginner-friendly open source project (search "good first issue" on GitHub). Fork it, create a feature branch, make a genuine improvement (fix a bug, improve docs, add a feature), and open a real Pull Request with a proper description. Even if it is not merged, you will have practised the full workflow.',
    youtubeQuery: 'GitHub workflow pull requests code review open source contribute',
    docsUrl: 'https://docs.github.com/en/get-started/quickstart/github-flow'
  },
  {
    id: 'github-actions',
    label: 'GitHub Actions',
    section: 5,
    sectionTitle: 'Version Control',
    isMain: false,
    parent: 'git',
    border: 'dashed',
    difficulty: 'ADVANCED',
    time: '2–3 days',
    whyMatters: 'CI/CD pipelines are expected at every professional team. GitHub Actions automates running tests, linting, and deployments on every push and pull request. This prevents broken code from reaching production and gives teams confidence to deploy frequently. Knowing how to write a workflow YAML is a genuinely marketable skill.',
    learn: [
      'Workflow YAML structure: on, jobs, steps, uses, run',
      'Triggers: on push, on pull_request, on schedule, on workflow_dispatch',
      'Runners: ubuntu-latest, macos-latest, windows-latest',
      'Actions marketplace: actions/checkout, actions/setup-node, actions/cache',
      'Environment variables and secrets: ${{ secrets.MY_SECRET }}',
      'Matrix builds: testing on multiple Node.js versions simultaneously',
      'Deployment workflows: building and deploying to Vercel, Netlify, or GitHub Pages'
    ],
    prerequisites: 'GitHub Workflow',
    task: 'Create a GitHub Actions workflow for a frontend project that: (1) runs on every pull request, (2) installs dependencies with caching, (3) runs ESLint, (4) runs your test suite, (5) builds the project, and (6) deploys to GitHub Pages only when merged to main.',
    youtubeQuery: 'GitHub Actions CI CD tutorial workflow YAML deploy',
    docsUrl: 'https://docs.github.com/en/actions'
  },

  // ─────────────────────────────────────────────
  // SECTION 6 — TOOLING
  // ─────────────────────────────────────────────
  {
    id: 'tooling',
    label: 'Tooling',
    section: 6,
    sectionTitle: 'Package Managers & Tooling',
    isMain: true,
    parent: null,
    border: 'orange',
    difficulty: 'INTERMEDIATE',
    time: '4–5 days',
    whyMatters: 'Modern frontend development is impossible without a solid tooling setup. Package managers, bundlers, and linters are the infrastructure of every professional project. A developer who cannot configure a Vite project, set up ESLint, or understand npm scripts will struggle in any real-world team environment.',
    learn: [
      'npm/pnpm/yarn for managing project dependencies',
      'Vite as the modern, fast development and build tool',
      'ESLint and Prettier for code quality and consistency',
      'Understanding what bundlers do and why they are needed',
      'VS Code as a professional IDE with essential extensions',
      'Environment variables and .env files for configuration',
      'npm scripts for automating common development tasks'
    ],
    prerequisites: 'JavaScript, Git',
    task: 'Set up a new Vite + TypeScript project from scratch. Configure ESLint with the recommended ruleset and Prettier with your preferred formatting. Add npm scripts for dev, build, lint, and format. Configure VS Code to auto-fix ESLint errors and auto-format on save.',
    youtubeQuery: 'modern frontend tooling Vite ESLint Prettier npm setup',
    docsUrl: 'https://vitejs.dev/guide/'
  },
  {
    id: 'npm-yarn',
    label: 'npm / pnpm / yarn',
    section: 6,
    sectionTitle: 'Package Managers & Tooling',
    isMain: false,
    parent: 'tooling',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 day',
    whyMatters: 'Every frontend project uses a package manager. Understanding dependencies vs devDependencies, semantic versioning, package-lock.json, and npm scripts is fundamental. Choosing pnpm over npm can dramatically reduce disk space usage and installation time in large monorepos — knowledge that impresses senior engineers.',
    learn: [
      'npm install, install --save-dev, install -g for different scopes',
      'package.json: name, version, scripts, dependencies, devDependencies, engines',
      'Semantic versioning: major.minor.patch and the ^ vs ~ range operators',
      'package-lock.json and why it must be committed to git',
      'npm scripts: custom commands for start, build, test, lint, format',
      'pnpm advantages: symlinked node_modules, workspace support, faster installs',
      'npx: running packages without global installation'
    ],
    prerequisites: 'Git Basics',
    task: 'Create a package.json with at least 5 custom npm scripts: one for each of dev, build, lint, format, and a combined "check" script that runs lint and type-check in parallel using concurrently. Understand what every field in your generated package-lock.json means.',
    youtubeQuery: 'npm package.json scripts dependencies semver explained',
    docsUrl: 'https://docs.npmjs.com/getting-started'
  },
  {
    id: 'vite',
    label: 'Vite',
    section: 6,
    sectionTitle: 'Package Managers & Tooling',
    isMain: false,
    parent: 'tooling',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '2 days',
    whyMatters: 'Vite has replaced Create React App as the standard way to set up React projects. It starts in under 300ms, has near-instant Hot Module Replacement, and produces optimised production builds. Understanding how to configure it for different environments, write Vite plugins, and use environment variables is expected on modern teams.',
    learn: [
      'vite dev server: instant startup using native ESM — no bundling in development',
      'vite build: Rollup-based production bundling with tree-shaking and code splitting',
      'vite.config.ts: plugins array, resolve.alias, server options, build options',
      'HMR (Hot Module Replacement): how changes update without full page reload',
      'Environment variables: .env, .env.local, VITE_ prefix requirement',
      'Static assets: importing images, fonts, SVGs — URL vs raw imports',
      'Vite plugins: @vitejs/plugin-react, vite-plugin-svgr, compression'
    ],
    prerequisites: 'npm / pnpm / yarn',
    task: 'Create a Vite project with React and TypeScript. Set up: (1) path aliases (@/ for src/), (2) .env.development and .env.production files with different API URLs, (3) the @vitejs/plugin-react plugin with Fast Refresh, (4) build it and inspect the dist folder — analyze the bundle using rollup-plugin-visualizer.',
    youtubeQuery: 'Vite tutorial React TypeScript setup config plugins build',
    docsUrl: 'https://vitejs.dev/guide/'
  },
  {
    id: 'eslint-prettier',
    label: 'ESLint + Prettier',
    section: 6,
    sectionTitle: 'Package Managers & Tooling',
    isMain: false,
    parent: 'tooling',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 day',
    whyMatters: 'Code quality tools are mandatory on every professional team. ESLint catches bugs and enforces best practices before they reach production. Prettier eliminates all formatting debates by auto-formatting code consistently. Every company you work at will have these configured — knowing how to set them up and extend them is a practical day-one skill.',
    learn: [
      'ESLint config: .eslintrc.json structure, extends, plugins, rules',
      'eslint:recommended vs @typescript-eslint/recommended rulesets',
      'Configuring specific rules: "off", "warn", "error"',
      'Prettier config: .prettierrc options (printWidth, tabWidth, singleQuote, semi)',
      'Resolving ESLint/Prettier conflicts: eslint-config-prettier plugin',
      'Husky + lint-staged: running linting on git commit as a pre-commit hook',
      'VS Code integration: auto-fix on save with editor.codeActionsOnSave'
    ],
    prerequisites: 'npm / pnpm / yarn',
    task: 'Set up ESLint + Prettier on a project from scratch without using any wizard. Manually create the config files. Add a Husky pre-commit hook that blocks commits if there are ESLint errors. Test it by intentionally writing code with linting errors and attempting to commit.',
    youtubeQuery: 'ESLint Prettier setup TypeScript Husky pre-commit hook',
    docsUrl: 'https://eslint.org/docs/latest/use/getting-started'
  },
  {
    id: 'webpack',
    label: 'Webpack',
    section: 6,
    sectionTitle: 'Package Managers & Tooling',
    isMain: false,
    parent: 'tooling',
    border: 'dashed',
    difficulty: 'ADVANCED',
    time: '3 days',
    whyMatters: 'While Vite has replaced Webpack for new projects, Webpack still powers millions of existing applications including large-scale apps at major companies. Create React App and many legacy codebases use Webpack. Understanding how it works helps you debug build issues, configure custom loaders, and optimize bundle size in projects that cannot easily migrate.',
    learn: [
      'Entry point and output: the core Webpack configuration',
      'Loaders: transforming file types (babel-loader, css-loader, file-loader)',
      'Plugins: HtmlWebpackPlugin, MiniCssExtractPlugin, DefinePlugin',
      'Code splitting: dynamic import() and SplitChunksPlugin',
      'Tree shaking: how Webpack eliminates dead code with ES module analysis',
      'Source maps: devtool options and their trade-offs',
      'webpack-bundle-analyzer: visualizing what is in your bundle'
    ],
    prerequisites: 'npm / pnpm / yarn, ES6+ Modern JS',
    task: 'Configure Webpack from scratch (no CRA) for a React project: entry, output, babel-loader for JSX/TS, css-loader + MiniCssExtractPlugin for CSS, HtmlWebpackPlugin for the HTML template, and code splitting via dynamic imports. Run webpack-bundle-analyzer and identify the 3 largest modules.',
    youtubeQuery: 'Webpack configuration tutorial loaders plugins code splitting',
    docsUrl: 'https://webpack.js.org/guides/getting-started/'
  },
  {
    id: 'vscode',
    label: 'VS Code Setup',
    section: 6,
    sectionTitle: 'Package Managers & Tooling',
    isMain: false,
    parent: 'tooling',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 day',
    whyMatters: 'VS Code is used by over 70% of professional developers. A well-configured VS Code setup — with the right extensions, keyboard shortcuts, and snippets — can double your productivity. Developers who know multi-cursor editing, integrated terminal, and Git integration workflows are noticeably faster than those who use a bare editor.',
    learn: [
      'Essential extensions: ESLint, Prettier, GitLens, Error Lens, Path Intellisense',
      'settings.json: format on save, default formatter, editor preferences',
      'Keyboard shortcuts: multi-cursor (Alt+Click), select all occurrences (Ctrl+Shift+L)',
      'Command palette (Ctrl/Cmd+Shift+P) for all VS Code actions',
      'Integrated terminal: splitting, multiple profiles, tasks',
      'Code snippets: creating custom user snippets for boilerplate reduction',
      'Workspace settings vs user settings for per-project overrides'
    ],
    prerequisites: 'None',
    task: 'Export your VS Code settings and a list of all installed extensions. Create a settings.json that configures: format on save, Prettier as default formatter, ESLint auto-fix on save, a custom terminal starting path, and a custom color theme. Create 3 custom code snippets for your most-used code patterns.',
    youtubeQuery: 'VS Code setup extensions settings tips tricks productivity',
    docsUrl: 'https://code.visualstudio.com/docs'
  },

  // ─────────────────────────────────────────────
  // SECTION 7 — JS FRAMEWORK (PICK ONE)
  // ─────────────────────────────────────────────
  {
    id: 'framework',
    label: 'Pick a Framework',
    section: 7,
    sectionTitle: 'JS Framework',
    isMain: true,
    parent: null,
    border: 'orange',
    difficulty: 'INTERMEDIATE',
    time: '1 day (decision)',
    whyMatters: 'Modern web applications are built with component-based JavaScript frameworks. Plain HTML/CSS/JS does not scale for complex, interactive applications. Frameworks provide structure, state management, and component reuse that make large codebases maintainable. Picking the right one for your goals is an important early career decision.',
    learn: [
      'What problem frameworks solve: component reuse, state management, declarative UI',
      'The virtual DOM concept used by React and Vue',
      'Why React has the largest ecosystem and job market share',
      'Vue\'s progressive adoption philosophy and gentler learning curve',
      'Angular\'s opinionated enterprise-first approach with TypeScript',
      'Svelte\'s compile-time approach with no runtime and tiny bundle size',
      'How to evaluate a framework: job listings, community size, documentation quality'
    ],
    prerequisites: 'JavaScript (all sections), CSS, HTML',
    task: 'Spend one day building the EXACT same todo app in React and Vue. Note the differences in syntax, state management, and component patterns. Check LinkedIn and Indeed for frontend job listings in your city — count how many mention each framework. Make an informed decision and commit.',
    youtubeQuery: 'React vs Vue vs Angular vs Svelte 2024 comparison which to learn',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks'
  },
  {
    id: 'react-fw',
    label: 'React ⭐',
    section: 7,
    sectionTitle: 'JS Framework',
    isMain: false,
    parent: 'framework',
    border: 'purple',
    difficulty: 'INTERMEDIATE',
    time: '4–6 weeks',
    whyMatters: 'React is the most in-demand frontend framework by a wide margin, used by Meta, Netflix, Airbnb, Uber, and thousands of other companies. The React ecosystem (Next.js, React Native, React Query, shadcn/ui) covers web, mobile, and server-side rendering. Learning React opens more doors than any other framework choice.',
    learn: [
      'Component-based architecture: breaking UI into reusable pieces',
      'JSX: HTML-like syntax that compiles to React.createElement()',
      'Props and the unidirectional data flow model',
      'useState and useEffect hooks for state and side effects',
      'The virtual DOM diffing algorithm and reconciliation',
      'React DevTools for inspecting component tree and state',
      'React 18 features: automatic batching, Transitions, Suspense'
    ],
    prerequisites: 'JavaScript (all sections), Tooling',
    task: 'Build a full-featured weather dashboard: search by city, display current conditions and 5-day forecast, save favourite cities to localStorage, toggle Celsius/Fahrenheit, and handle loading/error/empty states. Use only React and the OpenWeatherMap free API.',
    youtubeQuery: 'React tutorial 2024 complete course hooks components',
    docsUrl: 'https://react.dev/'
  },
  {
    id: 'vue-fw',
    label: 'Vue.js',
    section: 7,
    sectionTitle: 'JS Framework',
    isMain: false,
    parent: 'framework',
    border: 'purple',
    difficulty: 'INTERMEDIATE',
    time: '4–6 weeks',
    whyMatters: 'Vue.js is the second most popular frontend framework and is especially dominant in Asia and Europe. It has an extremely approachable API, excellent documentation, and the Composition API introduced in Vue 3 matches React Hooks in power and flexibility. Many companies prefer Vue for its progressive adoption — you can add it to an existing project without a full rewrite.',
    learn: [
      'Single File Components (.vue): template, script, style in one file',
      'Composition API: ref(), reactive(), computed(), watch(), lifecycle hooks',
      'Directives: v-if, v-else, v-for, v-bind (:), v-on (@), v-model, v-show',
      'Props and emits for parent-child communication',
      'provide/inject for cross-component communication',
      'Vue Router for client-side routing',
      'Pinia for state management (the official successor to Vuex)'
    ],
    prerequisites: 'JavaScript (all sections), Tooling',
    task: 'Build a project management board with Vue 3 Composition API: multiple project columns, add/edit/delete tasks, drag-and-drop between columns using the Sortable.js integration, and Pinia store for state. Use Vue Router for a project detail page.',
    youtubeQuery: 'Vue 3 Composition API complete tutorial 2024',
    docsUrl: 'https://vuejs.org/guide/introduction.html'
  },
  {
    id: 'angular-fw',
    label: 'Angular',
    section: 7,
    sectionTitle: 'JS Framework',
    isMain: false,
    parent: 'framework',
    border: 'dashed',
    difficulty: 'ADVANCED',
    time: '6–8 weeks',
    whyMatters: 'Angular is Google\'s framework and is particularly dominant in enterprise software, banking, healthcare, and government applications. It is TypeScript-first, includes everything out of the box (routing, forms, HTTP, testing), and enforces strict architectural patterns that make large teams productive. If you want to work in enterprise or fintech, Angular skills are valuable.',
    learn: [
      'Angular CLI: ng new, ng generate, ng serve, ng build',
      'Components, modules, and the NgModule system (and standalone components in Angular 17+)',
      'TypeScript decorators: @Component, @Injectable, @Input, @Output',
      'Dependency injection: services, providers, hierarchical injectors',
      'Angular forms: Template-driven vs Reactive forms, FormGroup, FormControl',
      'Angular Router: Routes, RouterLink, guards, resolvers, lazy loading',
      'RxJS Observables: the async primitive used throughout Angular'
    ],
    prerequisites: 'TypeScript, JavaScript (all sections)',
    task: 'Build a full CRUD application with Angular: a product catalogue with list, detail, create, edit, and delete views. Use Reactive Forms with validation, the Angular Router with a guard that requires a "logged in" flag in a service, and an HttpClient service to interact with a mock API.',
    youtubeQuery: 'Angular tutorial 2024 complete course TypeScript components',
    docsUrl: 'https://angular.dev/overview'
  },
  {
    id: 'svelte-fw',
    label: 'Svelte',
    section: 7,
    sectionTitle: 'JS Framework',
    isMain: false,
    parent: 'framework',
    border: 'dashed',
    difficulty: 'INTERMEDIATE',
    time: '2–3 weeks',
    whyMatters: 'Svelte takes a radically different approach — it is a compiler, not a runtime framework. This means near-zero bundle overhead. Svelte\'s code is famously concise: features that take 20 lines in React take 5 in Svelte. SvelteKit (its Next.js equivalent) is gaining serious traction. It is worth learning for performance-critical applications and because it teaches you what React is actually doing.',
    learn: [
      'Compiler approach: Svelte converts components to vanilla JS at build time',
      'Reactive declarations: $: syntax for reactive statements and computed values',
      'Stores: writable, readable, derived stores for shared state',
      'Svelte directives: on:click, bind:value, each, if/else, await blocks',
      'Transitions and animations: built-in slide, fade, fly, scale transitions',
      'SvelteKit: file-based routing, load functions, form actions',
      'Slots for component composition (equivalent to React children/slots)'
    ],
    prerequisites: 'JavaScript (all sections), Tooling',
    task: 'Build a real-time chat interface with Svelte: a message list that animates new messages in with a fly transition, a typing indicator that appears when the "user is typing" (simulate with a setTimeout), writable stores for messages and users, and SvelteKit routes for different chat rooms.',
    youtubeQuery: 'Svelte tutorial 2024 complete course SvelteKit',
    docsUrl: 'https://svelte.dev/docs/introduction'
  },

// ─────────────────────────────────────────────
// SECTION 8 — REACT DEEP DIVE
// ─────────────────────────────────────────────
{
  id: 'react',
  label: 'React',
  section: 8,
  sectionTitle: 'React Deep Dive',
  isMain: true,
  parent: null,
  border: 'orange',
  difficulty: 'INTERMEDIATE',
  time: '6–8 weeks',
  whyMatters: 'React is the dominant library in the frontend job market. A surface-level understanding of components and useState is not enough for professional work — employers expect you to understand the full rendering model, performance optimisation, and the complete Hooks API. Deep React knowledge is what separates junior developers who follow tutorials from mid-level engineers who can architect production applications from scratch.',
  learn: [
    'React\'s reconciliation algorithm: how the virtual DOM diffing works under the hood',
    'The rules of Hooks and why they exist (no conditionals, no loops)',
    'Controlled vs uncontrolled components and when to use each',
    'Lifting state up vs colocating state as close to the consumer as possible',
    'React 18 features: automatic batching, Transitions, the new root API',
    'Performance patterns: avoiding unnecessary re-renders, memoization strategies',
    'React DevTools Profiler: identifying and fixing render bottlenecks'
  ],
  prerequisites: 'JavaScript (all sections), Pick a Framework → React',
  task: 'Refactor a tutorial-built React app you already have: eliminate all prop drilling using Context, add React.memo and useCallback to at least three components, profile before and after with React DevTools Profiler, and document the render count improvements in a README.',
  youtubeQuery: 'React deep dive hooks rendering performance advanced 2024',
  docsUrl: 'https://react.dev/learn'
},
{
  id: 'jsx-components',
  label: 'JSX & Components',
  section: 8,
  sectionTitle: 'React Deep Dive',
  isMain: false,
  parent: 'react',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '3–4 days',
  whyMatters: 'JSX is the template syntax that makes React code readable and composable. Understanding how JSX compiles to React.createElement() calls explains every JSX rule — why you need a single root, why className instead of class, why you must return from components. Component design is the primary skill that determines code quality in React codebases.',
  learn: [
    'JSX compilation: how Babel transforms JSX to React.createElement() calls',
    'Why className, htmlFor, and other camelCase prop names exist',
    'Fragments: <></> and React.Fragment to avoid extra DOM nodes',
    'Component types: function components vs class components (and why functions won)',
    'Children prop: passing JSX as children, render props pattern',
    'Conditional rendering: &&, ternary, early returns — and their trade-offs',
    'List rendering: .map() with stable key props and why keys must be unique'
  ],
  prerequisites: 'JavaScript ES6+, HTML',
  task: 'Build a reusable Card component that accepts title, description, imageUrl, tags (array), and an onAction callback prop. Render 12 cards from a hardcoded data array with correct keys. Add a filter bar above the grid that filters cards by tag without any library.',
  youtubeQuery: 'React JSX components props children explained tutorial',
  docsUrl: 'https://react.dev/learn/writing-markup-with-jsx'
},
{
  id: 'usestate-useeffect',
  label: 'useState & useEffect',
  section: 8,
  sectionTitle: 'React Deep Dive',
  isMain: false,
  parent: 'react',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '4–5 days',
  whyMatters: 'useState and useEffect are the two hooks every React developer uses daily. Misunderstanding them causes the most common React bugs: stale closures, infinite loops, missing dependencies, and failed cleanups. Mastering these two hooks and internalising the mental model of effects as synchronisation with external systems is the single biggest leap in React proficiency.',
  learn: [
    'useState: how React schedules re-renders, batching in React 18, functional updater form',
    'Why state updates are asynchronous and what stale state means',
    'useEffect dependency array: what triggers effects, empty array vs no array',
    'Effect cleanup: returning a cleanup function, why it matters for subscriptions and timers',
    'The "synchronise with external system" mental model for useEffect',
    'Common pitfalls: object/array dependencies, missing deps, over-fetching in effects',
    'Strict Mode double-invocation in development and what it reveals about your effects'
  ],
  prerequisites: 'JSX & Components',
  task: 'Build a live search component that fetches results from the GitHub API as the user types, with 300ms debounce, an AbortController to cancel in-flight requests when query changes, a loading spinner, an error state, and empty state messaging. Verify cleanup works by checking the Network tab.',
  youtubeQuery: 'useState useEffect React hooks deep dive stale closure',
  docsUrl: 'https://react.dev/reference/react/useState'
},
{
  id: 'ref-memo-callback',
  label: 'useRef / useMemo / useCallback',
  section: 8,
  sectionTitle: 'React Deep Dive',
  isMain: false,
  parent: 'react',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '3 days',
  whyMatters: 'These three hooks are the React performance toolkit. Without them, expensive computations re-run on every render, child components re-render unnecessarily, and event handlers break memoization. Knowing when and when NOT to use them is a sign of maturity — premature memoization adds complexity for no gain. The skill is in identifying the bottleneck first, then applying the right tool.',
  learn: [
    'useRef: accessing DOM nodes imperatively, storing mutable values without triggering re-renders',
    'The difference between a ref and state — refs do not cause re-renders',
    'useMemo: memoizing expensive computations, referential equality for objects/arrays',
    'useCallback: memoizing event handlers passed as props to prevent child re-renders',
    'React.memo: skipping re-render when props are shallowly equal',
    'Why over-memoizing is a real problem: the cost of cache comparison',
    'Practical profiling workflow: always measure before optimising'
  ],
  prerequisites: 'useState & useEffect',
  task: 'Build a data table component that renders 1000 rows. Measure its render time in React DevTools Profiler. Then apply useMemo for sort/filter logic, useCallback for row action handlers, and React.memo on the row component. Measure again and document the improvement.',
  youtubeQuery: 'useRef useMemo useCallback React performance optimization tutorial',
  docsUrl: 'https://react.dev/reference/react/useMemo'
},
{
  id: 'context-reducer',
  label: 'useContext & useReducer',
  section: 8,
  sectionTitle: 'React Deep Dive',
  isMain: false,
  parent: 'react',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '3–4 days',
  whyMatters: 'Prop drilling — passing data through many component layers — is the first scalability problem every React developer hits. useContext solves this by making data available anywhere in the tree. useReducer brings Redux-style predictable state transitions to local component state, which is invaluable for complex forms, shopping carts, and multi-step flows. Together they form a capable state management solution without external libraries.',
  learn: [
    'createContext, Provider, and the value prop — what causes context consumers to re-render',
    'Splitting contexts: why one giant context causes performance issues',
    'useReducer: actions, dispatching, the reducer pure function pattern',
    'Combining useContext + useReducer to build a lightweight Redux-like store',
    'Context vs prop drilling vs external state managers — when each is appropriate',
    'The Context API performance caveat: all consumers re-render on any value change',
    'Patterns for optimising context: memoizing values, splitting state from dispatch'
  ],
  prerequisites: 'useState & useEffect, useRef/useMemo/useCallback',
  task: 'Build a shopping cart that uses Context + useReducer: add to cart, remove, change quantity, apply a discount code, and clear cart. The cart icon in a Header component should show a live count badge. The checkout summary should show itemised totals. No external libraries.',
  youtubeQuery: 'useContext useReducer React state management tutorial 2024',
  docsUrl: 'https://react.dev/reference/react/useContext'
},
{
  id: 'custom-hooks',
  label: 'Custom Hooks',
  section: 8,
  sectionTitle: 'React Deep Dive',
  isMain: false,
  parent: 'react',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '2–3 days',
  whyMatters: 'Custom hooks are how you extract and share stateful logic between components without changing the component tree structure. They are the primary code reuse mechanism in modern React, replacing higher-order components and render props. Every professional React codebase has a library of custom hooks. Building and publishing your own hooks demonstrates true mastery of the composition model.',
  learn: [
    'The naming convention: custom hooks must start with "use"',
    'Extracting useEffect logic: useWindowSize, useOnlineStatus, useDebounce',
    'Extracting data-fetching logic: useFetch, useQuery, useInfiniteScroll',
    'Extracting form logic: useForm with validation, dirty state, and submission handling',
    'Using useLocalStorage as a useState wrapper with persistence',
    'Composing hooks: building complex hooks from simpler hooks',
    'Testing custom hooks with React Testing Library\'s renderHook()'
  ],
  prerequisites: 'useState & useEffect, useRef/useMemo/useCallback',
  task: 'Build a usePokeSearch custom hook that accepts a query string, debounces it by 400ms, fetches from the PokéAPI, returns { data, loading, error, reset }, and cancels the previous request on re-query. Use this hook in two completely different UI components to demonstrate its reusability.',
  youtubeQuery: 'React custom hooks tutorial build your own hooks 2024',
  docsUrl: 'https://react.dev/learn/reusing-logic-with-custom-hooks'
},
{
  id: 'component-patterns',
  label: 'Component Patterns',
  section: 8,
  sectionTitle: 'React Deep Dive',
  isMain: false,
  parent: 'react',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '3 days',
  whyMatters: 'Knowing a single way to build components is not enough when you work on a large codebase. Compound components, controlled/uncontrolled patterns, and render props are recurring patterns in popular libraries like Radix UI and Headless UI. Recognising and applying these patterns lets you build flexible, accessible component libraries that do not force consumers into rigid APIs.',
  learn: [
    'Compound components: sharing implicit state between related components (like <Select> and <Option>)',
    'Controlled vs uncontrolled components: letting the consumer own the state vs internal state',
    'Render props: passing a function as a child or prop for maximum flexibility',
    'Slots pattern: named children for layout components',
    'Component composition over configuration: building flexible UIs without a huge props API',
    'Polymorphic components: the "as" prop pattern for semantic HTML flexibility',
    'Provider pattern: wrapping subtrees in context to inject shared behaviour'
  ],
  prerequisites: 'useContext & useReducer, Custom Hooks',
  task: 'Build a fully compound <Tabs> component with <Tabs.Root>, <Tabs.List>, <Tabs.Trigger>, and <Tabs.Content> sub-components. The active tab state should live in the Root. Support both controlled (external state) and uncontrolled (internal default) modes via a defaultValue/value/onValueChange API.',
  youtubeQuery: 'React compound components render props advanced patterns tutorial',
  docsUrl: 'https://react.dev/learn/passing-data-deeply-with-context'
},
{
  id: 'react-router',
  label: 'React Router',
  section: 8,
  sectionTitle: 'React Deep Dive',
  isMain: false,
  parent: 'react',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '3–4 days',
  whyMatters: 'Single-page applications need client-side routing to function like multi-page apps without full page reloads. React Router is the standard solution and is used in the majority of React projects that are not using Next.js. Understanding nested routes, dynamic segments, and data loaders unlocks building complex multi-view applications with clean URL structures and deep linking.',
  learn: [
    'BrowserRouter vs HashRouter vs MemoryRouter and when to use each',
    'Route definitions: <Routes>, <Route path>, nested routes with <Outlet>',
    'Dynamic segments: /users/:id and reading params with useParams()',
    'Programmatic navigation with useNavigate() and the navigate() function',
    'Link and NavLink: client-side navigation and active link styling',
    'Route loaders and actions (React Router v6.4+ data APIs)',
    'Protected routes: wrapping routes with an auth check component'
  ],
  prerequisites: 'JSX & Components, useState & useEffect',
  task: 'Build a multi-page blog application: home page with post list, individual post page at /posts/:id, a tag filter page at /tags/:tag, a 404 not-found route, and a protected /admin/new route that redirects to /login if a mock auth flag is not set in localStorage.',
  youtubeQuery: 'React Router v6 tutorial nested routes params navigate 2024',
  docsUrl: 'https://reactrouter.com/en/main'
},
{
  id: 'error-suspense',
  label: 'Error Boundaries & Suspense',
  section: 8,
  sectionTitle: 'React Deep Dive',
  isMain: false,
  parent: 'react',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '2 days',
  whyMatters: 'Production applications crash. Error Boundaries are React\'s mechanism to catch rendering errors in a component subtree and display a fallback UI instead of a blank white screen. Suspense complements this by handling asynchronous loading states declaratively. Together they form the foundation of resilient UI architecture — and interviewers love asking about them.',
  learn: [
    'Why try/catch cannot catch errors thrown during React rendering',
    'Class-based Error Boundary: componentDidCatch and getDerivedStateFromError',
    'Using the react-error-boundary library for a functional alternative',
    'Suspense boundaries: wrapping async components for loading fallback UI',
    'React.lazy() for code-splitting: dynamically importing components',
    'Nested Suspense and Error Boundary placement strategies in a component tree',
    'Error recovery: reset keys and resetErrorBoundary to retry after failure'
  ],
  prerequisites: 'JSX & Components, useEffect',
  task: 'Wrap the main content area of an app in an ErrorBoundary that shows a friendly "Something went wrong" card with a Retry button. Wrap the router\'s lazy-loaded routes in a Suspense boundary showing a skeleton loader. Trigger the error boundary intentionally with a "Simulate Error" button to test it.',
  youtubeQuery: 'React Error Boundaries Suspense lazy loading code splitting tutorial',
  docsUrl: 'https://react.dev/reference/react/Suspense'
},
{
  id: 'react-query',
  label: 'React Query / TanStack',
  section: 8,
  sectionTitle: 'React Deep Dive',
  isMain: false,
  parent: 'react',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '4–5 days',
  whyMatters: 'Server state — data fetched from an API — has fundamentally different characteristics than UI state: it needs caching, background refetching, synchronisation across components, and optimistic updates. TanStack Query (formerly React Query) handles all of this elegantly. It eliminates hundreds of lines of useEffect-based data fetching boilerplate and is now standard in professional React codebases.',
  learn: [
    'The distinction between server state (async, shared, stale) and client state (synchronous, local)',
    'QueryClient, QueryClientProvider, and the global cache',
    'useQuery: queryKey arrays, queryFn, staleTime, gcTime, enabled flag',
    'Dependent queries: chaining queries when one depends on another\'s result',
    'useMutation: POST/PUT/DELETE, onSuccess/onError callbacks, invalidateQueries',
    'Optimistic updates: updating the UI before the server confirms success',
    'Infinite queries with useInfiniteQuery for paginated data and infinite scroll'
  ],
  prerequisites: 'Custom Hooks, useEffect, Fetch API & Async JS',
  task: 'Build a full GitHub repository explorer using TanStack Query: search repos by keyword, display results with pagination, click to view repo details and contributor list (dependent query), star/unstar a repo with an optimistic update via useMutation, and show stale data with a "Refetching..." indicator.',
  youtubeQuery: 'TanStack React Query tutorial 2024 useQuery useMutation caching',
  docsUrl: 'https://tanstack.com/query/latest/docs/framework/react/overview'
},

// ─────────────────────────────────────────────
// SECTION 9 — NEXT.JS
// ─────────────────────────────────────────────
{
  id: 'nextjs',
  label: 'Next.js ⭐',
  section: 9,
  sectionTitle: 'Next.js',
  isMain: true,
  parent: null,
  border: 'orange',
  difficulty: 'INTERMEDIATE',
  time: '4–6 weeks',
  whyMatters: 'Next.js has become the de-facto standard for production React applications. It solves SEO, performance, and deployment challenges that client-only React cannot address. The majority of new React job postings list Next.js as a requirement. Its App Router fundamentally changes how you think about server-client boundaries, making full-stack frontend development accessible without a separate backend.',
  learn: [
    'Next.js\'s value proposition: SSR, SSG, ISR, and RSC in one framework',
    'The App Router directory structure and file-based routing conventions',
    'How the build process generates static and dynamic pages from the same codebase',
    'Server Components vs Client Components: the rendering boundary and trade-offs',
    'Image, Link, Font, and Script optimisation components built into Next.js',
    'Middleware: running code at the edge before requests reach your pages',
    'Environment variables: NEXT_PUBLIC_ prefix for client-safe secrets'
  ],
  prerequisites: 'React Deep Dive (all sections), Node.js basics',
  task: 'Build a full-stack blog CMS: public blog pages with SSG, a dynamic post page with ISR (revalidate every 60s), an RSS feed API route, an admin panel (Client Component) to create/edit posts stored in a JSON file via Server Actions, and dynamic OG image generation for social sharing.',
  youtubeQuery: 'Next.js 14 App Router complete tutorial 2024 full stack',
  docsUrl: 'https://nextjs.org/docs'
},
{
  id: 'app-router',
  label: 'App Router',
  section: 9,
  sectionTitle: 'Next.js',
  isMain: false,
  parent: 'nextjs',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '3–4 days',
  whyMatters: 'The App Router represents a paradigm shift in React development, co-locating routing, data fetching, and server logic inside the component tree itself. Understanding layouts, nested routes, loading UI, error handling, and route groups is essential for any project using Next.js 13+. The Pages Router is legacy — every new project uses App Router.',
  learn: [
    'File conventions: page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx',
    'Route groups: (folder) syntax to organise routes without affecting the URL',
    'Nested layouts: sharing UI across multiple routes with persistent state',
    'Parallel routes and intercepting routes for modals and split views',
    'Dynamic route segments: [slug], [...slug] catch-all, [[...slug]] optional catch-all',
    'generateStaticParams() for statically generating dynamic routes at build time',
    'usePathname, useRouter, useSearchParams in Client Components'
  ],
  prerequisites: 'React Router, JSX & Components',
  task: 'Build a Next.js app with a root layout (navbar + footer), a marketing layout for (marketing) routes, and an app layout for (app) routes. Create a modal route using parallel routes that opens over the current page, and an intercepted image route that shows a lightbox in the same layout.',
  youtubeQuery: 'Next.js App Router tutorial layouts nested routes 2024',
  docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing'
},
{
  id: 'server-client-components',
  label: 'Server & Client Components',
  section: 9,
  sectionTitle: 'Next.js',
  isMain: false,
  parent: 'nextjs',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '3–4 days',
  whyMatters: 'React Server Components (RSC) are the most important architectural change in React since Hooks. They let you run components on the server — accessing databases, file systems, and secrets — with zero JavaScript sent to the client. The mental model of rendering as a server-first, progressively enhanced experience changes how you structure entire applications.',
  learn: [
    'Server Components: run on the server only, can be async, can access backend resources directly',
    'Client Components: the "use client" directive, needed for interactivity and browser APIs',
    'The rendering boundary: how server and client components compose together',
    'Why you cannot use useState/useEffect in a Server Component',
    'Passing Server Component output as children to Client Components',
    'Data fetching in Server Components: async/await directly in the component body',
    'Streaming: how React progressively sends HTML from the server using Suspense'
  ],
  prerequisites: 'App Router, React Deep Dive',
  task: 'Build a dashboard page: the outer layout and data tables are Server Components (fetching from a mock DB async), while the search input, filters, and modals are Client Components. Pass server-fetched data as props into client islands. Measure the bundle size difference with Next.js build output.',
  youtubeQuery: 'React Server Components vs Client Components Next.js explained',
  docsUrl: 'https://nextjs.org/docs/app/building-your-application/rendering/server-components'
},
{
  id: 'data-fetching',
  label: 'Data Fetching',
  section: 9,
  sectionTitle: 'Next.js',
  isMain: false,
  parent: 'nextjs',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '3 days',
  whyMatters: 'Next.js extends the native fetch() API with powerful caching semantics that control whether a page is static, dynamic, or incrementally regenerated. Choosing the wrong caching strategy is one of the most common production mistakes — serving stale data to users or bypassing caching entirely and hammering your database on every request.',
  learn: [
    'fetch() with { cache: \'force-cache\' } for static data that never changes',
    'fetch() with { next: { revalidate: N } } for ISR — regenerating every N seconds',
    'fetch() with { cache: \'no-store\' } for fully dynamic, always-fresh data',
    'Parallel data fetching with Promise.all() in Server Components',
    'Sequential fetching when one query depends on another\'s result',
    'The request deduplication and memoisation built into Next.js fetch',
    'On-demand revalidation: revalidatePath() and revalidateTag() from Server Actions'
  ],
  prerequisites: 'Server & Client Components',
  task: 'Build a product catalogue page: static hero section (SSG), a featured products section that revalidates every hour (ISR), and a "live inventory" counter that is always dynamic (SSR). Use Next.js build output and Vercel Analytics to verify each section\'s rendering strategy.',
  youtubeQuery: 'Next.js data fetching SSG SSR ISR cache revalidate tutorial',
  docsUrl: 'https://nextjs.org/docs/app/building-your-application/data-fetching'
},
{
  id: 'server-actions',
  label: 'Server Actions',
  section: 9,
  sectionTitle: 'Next.js',
  isMain: false,
  parent: 'nextjs',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '2–3 days',
  whyMatters: 'Server Actions allow you to write server-side mutation logic (form submissions, database writes) directly in your components without building separate API routes. This dramatically reduces the code needed for forms and CRUD operations. Combined with optimistic updates, they make full-stack forms feel instant — a capability that would have required a full backend framework just a few years ago.',
  learn: [
    '"use server" directive: defining a Server Action at the function or file level',
    'Invoking Server Actions from HTML <form> action attributes (no JS required for basic cases)',
    'Invoking Server Actions from event handlers in Client Components',
    'useFormStatus() hook: accessing pending state during a form submission',
    'useActionState() (formerly useFormState): managing form state and errors from actions',
    'Optimistic updates with useOptimistic() for instant UI feedback before server confirmation',
    'Security: Server Actions validate input, check auth, and cannot be called as public GET endpoints'
  ],
  prerequisites: 'Server & Client Components, Data Fetching',
  task: 'Build a todo app using ONLY Server Actions for mutations — create, update, and delete todos. Show an optimistic UI update that instantly adds/removes todos before the server confirms. Use useFormStatus to disable the submit button while the action is pending. No API routes allowed.',
  youtubeQuery: 'Next.js Server Actions tutorial useFormStatus useOptimistic 2024',
  docsUrl: 'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations'
},
{
  id: 'api-routes',
  label: 'API Routes',
  section: 9,
  sectionTitle: 'Next.js',
  isMain: false,
  parent: 'nextjs',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '2–3 days',
  whyMatters: 'API Routes turn your Next.js app into a full-stack application by letting you write backend HTTP endpoints alongside your frontend. They are perfect for webhooks, third-party integrations (hiding API keys), form handling that must support non-JS clients, and building a BFF (Backend for Frontend) layer without deploying a separate server.',
  learn: [
    'Route Handler file convention: app/api/route/route.ts, exported GET/POST/PUT/DELETE functions',
    'NextRequest and NextResponse: extended request/response APIs',
    'Reading request body, query params, headers, and cookies in Route Handlers',
    'Dynamic API routes: app/api/users/[id]/route.ts',
    'Streaming responses: using ReadableStream for real-time data like AI text generation',
    'Webhooks: verifying Stripe and GitHub signatures before processing',
    'When to use Route Handlers vs Server Actions: external clients vs internal mutations'
  ],
  prerequisites: 'Server & Client Components',
  task: 'Build a Next.js API that acts as a proxy for the OpenAI API: accept a POST with a { prompt } body, call the OpenAI API on the server (hiding the API key), stream the response back to the client, and display it character-by-character in the UI as it arrives.',
  youtubeQuery: 'Next.js API routes Route Handlers tutorial 2024',
  docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers'
},
{
  id: 'metadata-seo',
  label: 'Metadata & SEO',
  section: 9,
  sectionTitle: 'Next.js',
  isMain: false,
  parent: 'nextjs',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '2 days',
  whyMatters: 'Search engine optimisation and social sharing metadata directly impact whether your application gets discovered and looks professional when shared. Next.js has a first-class metadata system that handles all the complex Open Graph, Twitter Card, and structured data requirements in a type-safe way. Poorly configured metadata is one of the most common issues on otherwise well-built sites.',
  learn: [
    'The Metadata API: exporting a metadata object or generateMetadata() function from layout/page',
    'Static vs dynamic metadata: when to use each',
    'Open Graph tags: og:title, og:description, og:image for social sharing previews',
    'Twitter Card meta tags for Twitter/X link previews',
    'generateStaticParams for pre-rendering dynamic SEO pages',
    'Dynamic OG image generation with next/og (ImageResponse API)',
    'Canonical URLs, robots.txt, and sitemap.xml via Next.js file conventions'
  ],
  prerequisites: 'App Router, Data Fetching',
  task: 'Add full metadata to a blog application: static metadata on the home page, dynamic generateMetadata() on each post page that fetches post title/description from data, a dynamically generated OG image for each post showing the title on a branded background, and a generated sitemap.xml.',
  youtubeQuery: 'Next.js metadata SEO Open Graph image generation tutorial',
  docsUrl: 'https://nextjs.org/docs/app/building-your-application/optimizing/metadata'
},
{
  id: 'vercel-deploy',
  label: 'Deployment to Vercel',
  section: 9,
  sectionTitle: 'Next.js',
  isMain: false,
  parent: 'nextjs',
  border: 'purple',
  difficulty: 'BEGINNER',
  time: '1–2 days',
  whyMatters: 'Vercel is the company that built Next.js and their platform is purpose-built for it. Deploying to Vercel takes minutes, gives you preview deployments on every pull request, automatic HTTPS, global CDN, and built-in analytics. Knowing how to configure environment variables, custom domains, and Vercel\'s Edge Network is a practical skill every Next.js developer needs.',
  learn: [
    'Connecting a GitHub repository to Vercel for continuous deployment on push',
    'Environment variable management: development (.env.local), preview, and production envs',
    'Preview deployments: every PR gets a unique URL for stakeholder review',
    'Vercel build output: understanding which routes are static, SSR, or edge',
    'Custom domains: adding a domain and configuring DNS to point to Vercel',
    'Vercel Edge Functions vs Serverless Functions: latency trade-offs',
    'Vercel Analytics and Speed Insights for monitoring Core Web Vitals in production'
  ],
  prerequisites: 'App Router, Data Fetching',
  task: 'Deploy a Next.js app to Vercel from a GitHub repo, configure three environment variables (a public API key, a secret API key, and a feature flag), set up a custom domain (or a Vercel subdomain), and open a feature branch PR to verify the preview deployment URL is generated automatically.',
  youtubeQuery: 'deploy Next.js to Vercel custom domain environment variables tutorial',
  docsUrl: 'https://vercel.com/docs'
},

// ─────────────────────────────────────────────
// SECTION 10 — STYLING IN REACT
// ─────────────────────────────────────────────
{
  id: 'styling-react',
  label: 'Styling in React',
  section: 10,
  sectionTitle: 'Styling in React',
  isMain: true,
  parent: null,
  border: 'orange',
  difficulty: 'INTERMEDIATE',
  time: '1–2 weeks',
  whyMatters: 'Styling is not just making things look nice — it is a major architectural decision that affects maintainability, performance, and team onboarding. React applications have several styling options, each with different trade-offs around scoping, DX, and bundle size. Knowing all options and their contexts helps you pick the right tool for each project and navigate any codebase confidently.',
  learn: [
    'The CSS scoping problem in component-based apps and why it matters at scale',
    'Trade-offs between CSS-in-JS, CSS Modules, atomic CSS, and plain CSS',
    'When runtime CSS generation (Styled Components) becomes a performance liability',
    'How Tailwind\'s JIT compiler achieves zero unused CSS in production',
    'Design tokens and why they should drive your styling system',
    'Component library strategies: build from scratch vs headless vs full-kit',
    'Theming patterns: CSS custom properties vs JavaScript theme objects'
  ],
  prerequisites: 'CSS (all sections), React JSX & Components',
  task: 'Build the same product card component four times: once with plain CSS, once with CSS Modules, once with Tailwind CSS, and once with Styled Components. Compare bundle size, DX, and how dark mode theming works in each approach.',
  youtubeQuery: 'React styling approaches CSS Modules Tailwind Styled Components comparison',
  docsUrl: 'https://react.dev/learn/adding-styles'
},
{
  id: 'css-modules',
  label: 'CSS Modules',
  section: 10,
  sectionTitle: 'Styling in React',
  isMain: false,
  parent: 'styling-react',
  border: 'blue',
  difficulty: 'BEGINNER',
  time: '1 day',
  whyMatters: 'CSS Modules are the simplest way to get locally-scoped CSS in React. They require no additional dependencies (Vite and Next.js support them out of the box), have zero runtime cost, and generate readable class names in development. They are a natural transition from plain CSS and work well for teams that prefer writing standard CSS syntax.',
  learn: [
    'How CSS Modules work: filename.module.css files automatically scope class names',
    'Importing styles as a JavaScript object: styles.className',
    'Composition: the composes keyword to share base styles between modules',
    'Global escapes: :global() for classes that should not be scoped',
    'Conditional classes: combining with clsx or classnames library',
    'How Vite and Next.js generate hashed class names in production',
    'co-locating component.module.css next to component.tsx'
  ],
  prerequisites: 'CSS, React JSX & Components',
  task: 'Refactor a React component that uses inline styles into CSS Modules: extract all styles, use composes for shared button variants, add a :global(.dark) override for dark mode, and use clsx to conditionally apply active/disabled state classes.',
  youtubeQuery: 'CSS Modules React tutorial 2024 scoped styles',
  docsUrl: 'https://nextjs.org/docs/app/building-your-application/styling/css-modules'
},
{
  id: 'styled-components',
  label: 'Styled Components',
  section: 10,
  sectionTitle: 'Styling in React',
  isMain: false,
  parent: 'styling-react',
  border: 'blue',
  difficulty: 'INTERMEDIATE',
  time: '2–3 days',
  whyMatters: 'Styled Components pioneered CSS-in-JS and is still widely used in production codebases. It co-locates styles with component logic, supports dynamic styles based on props, and enables powerful theming via the ThemeProvider. Many existing React codebases — especially those from 2019–2022 — use it heavily, so recognising its patterns is practically a career requirement.',
  learn: [
    'Tagged template literals: how styled.div`` works syntactically',
    'Dynamic styles: interpolating props with ${props => props.active ? ... : ...}',
    'Extending styles: using styled(ExistingComponent) to add additional styles',
    'The "as" polymorphic prop: rendering a styled div as a button or anchor',
    'ThemeProvider: injecting a theme object accessible in all styled components',
    'Global styles with createGlobalStyle',
    'Server-side rendering: ServerStyleSheet for hydration without a flash of unstyled content'
  ],
  prerequisites: 'CSS, React JSX & Components',
  task: 'Build a complete button system with Styled Components: a base Button with size (sm/md/lg) and variant (primary/secondary/ghost/danger) props driven by a theme object. Wrap the app in a ThemeProvider with light and dark themes, and implement a toggle that switches between them.',
  youtubeQuery: 'Styled Components React tutorial theming props dynamic styles',
  docsUrl: 'https://styled-components.com/docs'
},
{
  id: 'shadcn-ui',
  label: 'shadcn/ui ⭐',
  section: 10,
  sectionTitle: 'Styling in React',
  isMain: false,
  parent: 'styling-react',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '3–4 days',
  whyMatters: 'shadcn/ui has become the most popular React component library approach in 2024. Unlike traditional libraries, you own the code — components are copied into your project, not installed as a black-box dependency. This means full customisability, no version lock-in, and components built on accessible Radix UI primitives. It is now listed in most frontend job descriptions alongside Tailwind CSS.',
  learn: [
    'The "copy into your project" model vs traditional npm library philosophy',
    'Radix UI as the accessible primitive layer underneath every shadcn component',
    'Adding components with the CLI: npx shadcn-ui@latest add button',
    'The components.json config: aliases, base colour, and CSS variable theming',
    'Customising components: editing the copied component file directly',
    'Dark mode with next-themes and the shadcn CSS variable system',
    'Building custom variants using the cva (class-variance-authority) utility'
  ],
  prerequisites: 'Tailwind CSS, React JSX & Components',
  task: 'Build a full admin dashboard UI using only shadcn/ui components: a sidebar nav with Sheet on mobile, a data Table with sorting/filtering, a Dialog-based create form with input validation, a set of Cards for KPI metrics, and a dark/light mode toggle in the header using next-themes.',
  youtubeQuery: 'shadcn/ui tutorial 2024 React Tailwind dashboard components',
  docsUrl: 'https://ui.shadcn.com'
},
{
  id: 'framer-motion',
  label: 'Framer Motion',
  section: 10,
  sectionTitle: 'Styling in React',
  isMain: false,
  parent: 'styling-react',
  border: 'dashed',
  difficulty: 'INTERMEDIATE',
  time: '3–4 days',
  whyMatters: 'Animation is the difference between a UI that feels professional and one that feels like a homework project. Framer Motion is the industry standard animation library for React — it abstracts complex CSS animation and Web Animations API details into a declarative, component-based API. Employers who value UI polish and consumer-facing products frequently ask for Framer Motion experience.',
  learn: [
    'motion.div and other motion components: the animate, initial, and exit props',
    'Transition configuration: duration, delay, ease, type (spring/tween/inertia)',
    'AnimatePresence: animating components when they are removed from the DOM',
    'Layout animations: the layout prop for automatic FLIP animations on position changes',
    'Variants: defining named animation states and orchestrating child animations',
    'useMotionValue and useTransform for scroll-linked and drag animations',
    'Shared layout animations: the layoutId prop for hero transitions across routes'
  ],
  prerequisites: 'React JSX & Components, CSS Transitions & Animations',
  task: 'Build an animated page transition system: each route entrance animates in from the right, exiting routes animate out to the left, shared-element hero transition between a list and detail page using layoutId, and a stagger animation on list items using variants with delayChildren.',
  youtubeQuery: 'Framer Motion React tutorial 2024 animations page transitions',
  docsUrl: 'https://www.framer.com/motion/'
},

// ─────────────────────────────────────────────
// SECTION 11 — BFF & DATABASES
// ─────────────────────────────────────────────
{
  id: 'bff-databases',
  label: 'BFF & Databases',
  section: 11,
  sectionTitle: 'BFF & Databases',
  isMain: true,
  parent: null,
  border: 'orange',
  difficulty: 'INTERMEDIATE',
  time: '3–4 weeks',
  whyMatters: 'Modern frontend developers are expected to build full-stack features, not just consume APIs built by others. The Backend for Frontend (BFF) pattern means writing the exact backend layer your frontend needs — tailored data shapes, authentication, file handling. Companies increasingly hire "full-stack" engineers who can own a feature end-to-end. These skills make you significantly more employable and self-sufficient.',
  learn: [
    'The BFF pattern: why a dedicated backend layer exists to serve one frontend client',
    'REST API design: resource naming, HTTP methods, response shapes, error formats',
    'Database fundamentals: tables, rows, relations, primary keys, foreign keys',
    'ORMs vs raw SQL: when the abstraction helps vs when it hides important details',
    'Authentication fundamentals: who you are (identity), sessions vs tokens',
    'The full request cycle: React → API Route → ORM → Database → Response',
    'Environment separation: local DB for dev, hosted DB for production'
  ],
  prerequisites: 'Next.js API Routes, JavaScript async/await',
  task: 'Build a full-stack Next.js app: a simple expense tracker with user authentication (email/password), a PostgreSQL database via Prisma, CRUD for expense records, and a CSV export endpoint. Deploy to Vercel with a Supabase or Neon PostgreSQL database.',
  youtubeQuery: 'Next.js full stack tutorial Prisma PostgreSQL authentication 2024',
  docsUrl: 'https://www.prisma.io/nextjs'
},
{
  id: 'rest-apis',
  label: 'REST APIs',
  section: 11,
  sectionTitle: 'BFF & Databases',
  isMain: false,
  parent: 'bff-databases',
  border: 'blue',
  difficulty: 'INTERMEDIATE',
  time: '3–4 days',
  whyMatters: 'REST is still the most widely used API paradigm. Frontend developers need to understand REST conventions to both consume external APIs correctly and design their own API routes. Poor API design — inconsistent naming, wrong HTTP methods, no proper error responses — makes frontends brittle and forces workarounds that accumulate as technical debt.',
  learn: [
    'REST constraints: stateless, uniform interface, resource-based URLs',
    'Resource naming conventions: plural nouns, nested resources (/users/:id/posts)',
    'HTTP method semantics: GET (read), POST (create), PUT (replace), PATCH (update), DELETE',
    'Response structure conventions: data envelope, meta, pagination cursors/offsets',
    'HTTP error codes for API errors: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404, 422, 500',
    'CORS: why it exists, Access-Control headers, preflight OPTIONS requests',
    'Rate limiting, pagination, and cursor-based vs offset-based approaches'
  ],
  prerequisites: 'HTTP & HTTPS, JavaScript Fetch API & Async',
  task: 'Design and implement a REST API for a blog: GET /posts (paginated), GET /posts/:id, POST /posts (auth required), PATCH /posts/:id, DELETE /posts/:id, GET /posts/:id/comments, POST /posts/:id/comments. Return consistent error responses in { error: { code, message } } format.',
  youtubeQuery: 'REST API design tutorial best practices Next.js Route Handlers',
  docsUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/REST'
},
{
  id: 'prisma-orm',
  label: 'Prisma ORM',
  section: 11,
  sectionTitle: 'BFF & Databases',
  isMain: false,
  parent: 'bff-databases',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '4–5 days',
  whyMatters: 'Prisma is the most popular ORM in the Node.js ecosystem and the standard choice for Next.js applications. It generates a fully type-safe database client from a schema file, catches type errors at compile time, and includes Prisma Studio for visual data browsing. Learning Prisma makes you productive with databases in hours rather than days.',
  learn: [
    'Prisma schema language: models, fields, types, attributes (@id, @unique, @relation)',
    'Relations: one-to-many, many-to-many, self-relations with explicit join tables',
    'prisma migrate dev: creating and applying database migrations from schema changes',
    'Prisma Client CRUD: findUnique, findMany, create, update, upsert, delete, deleteMany',
    'Filtering: where clauses, contains, startsWith, gt/lt, AND/OR/NOT',
    'Relations in queries: include (JOIN) vs select for efficient data fetching',
    'Transactions: prisma.$transaction() for atomic multi-operation updates'
  ],
  prerequisites: 'PostgreSQL basics, Node.js/Next.js',
  task: 'Build the data layer for a Twitter clone using Prisma: User, Post, Follow, and Like models with all relations. Write queries for a home timeline (posts from followed users, sorted by date), profile page (user + post count), and a like/unlike toggle that uses a transaction to prevent race conditions.',
  youtubeQuery: 'Prisma ORM tutorial 2024 Next.js PostgreSQL schema migrations',
  docsUrl: 'https://www.prisma.io/docs'
},
{
  id: 'postgresql-basics',
  label: 'PostgreSQL basics',
  section: 11,
  sectionTitle: 'BFF & Databases',
  isMain: false,
  parent: 'bff-databases',
  border: 'blue',
  difficulty: 'INTERMEDIATE',
  time: '3–4 days',
  whyMatters: 'Even when using an ORM like Prisma, you must understand the SQL it generates. Database performance issues — slow queries, missing indexes, N+1 problems — require SQL knowledge to diagnose. PostgreSQL is the most capable open-source relational database and the default choice for most new full-stack projects on Vercel, Supabase, Railway, and Neon.',
  learn: [
    'Relational model: tables, columns, rows, data types (text, integer, boolean, timestamptz, jsonb)',
    'Primary keys, foreign keys, and referential integrity constraints',
    'SELECT with WHERE, ORDER BY, LIMIT/OFFSET, and JOINs (INNER, LEFT, RIGHT)',
    'Indexes: what they are, how B-tree indexes work, when to add them',
    'The N+1 query problem and how JOINs and includes solve it',
    'Transactions: BEGIN, COMMIT, ROLLBACK and isolation levels',
    'EXPLAIN ANALYZE: reading query plans to find performance bottlenecks'
  ],
  prerequisites: 'None (conceptual), Prisma ORM (practical)',
  task: 'Use Supabase or a local PostgreSQL installation. Write raw SQL (no ORM) to create a schema for an e-commerce store, insert 1000 rows of seed data, write a query for "top 10 products by revenue this month" using a JOIN and aggregate, and use EXPLAIN ANALYZE to verify it uses an index.',
  youtubeQuery: 'PostgreSQL tutorial for beginners SQL queries joins indexes',
  docsUrl: 'https://www.postgresql.org/docs/current/tutorial.html'
},
{
  id: 'authentication',
  label: 'Authentication',
  section: 11,
  sectionTitle: 'BFF & Databases',
  isMain: false,
  parent: 'bff-databases',
  border: 'purple',
  difficulty: 'INTERMEDIATE',
  time: '4–5 days',
  whyMatters: 'Authentication is one of the most security-critical parts of any application and one of the most commonly botched. Mishandling tokens, sessions, or password hashing leads to real vulnerabilities. Understanding the core concepts — sessions vs JWTs, httpOnly cookies, OAuth flows — means you can evaluate auth libraries critically rather than cargo-culting patterns you do not understand.',
  learn: [
    'Session-based auth: server stores session, browser sends a session cookie',
    'JWT-based auth: server signs a token, browser stores and sends it with every request',
    'Why httpOnly + Secure + SameSite=Lax cookies are safer than localStorage for tokens',
    'Password hashing: bcrypt, salt rounds, why MD5/SHA1 are insufficient',
    'OAuth 2.0 flow: authorization code, redirect URIs, access tokens, refresh tokens',
    'Auth.js (formerly NextAuth): providers, sessions, JWT strategy, callbacks, middleware protection',
    'Row-level security: ensuring users can only access their own data'
  ],
  prerequisites: 'REST APIs, Next.js API Routes, PostgreSQL basics',
  task: 'Add Auth.js to a Next.js app with three providers: credentials (email/password with bcrypt), GitHub OAuth, and Google OAuth. Protect API routes and Server Components using the session. Implement a "my account" page that shows session data and a "sign out" button. Store OAuth account data in Prisma.',
  youtubeQuery: 'Auth.js NextAuth Next.js 14 authentication tutorial OAuth credentials',
  docsUrl: 'https://authjs.dev'
},
{
  id: 'file-uploads',
  label: 'File Uploads',
  section: 11,
  sectionTitle: 'BFF & Databases',
  isMain: false,
  parent: 'bff-databases',
  border: 'dashed',
  difficulty: 'INTERMEDIATE',
  time: '2–3 days',
  whyMatters: 'File uploads appear in almost every real product — profile photos, document uploads, CSV imports. Handling them correctly requires understanding multipart form data, file size limits, storage (you never store files in a database), CDN delivery, and upload security. Using a service like UploadThing or Cloudinary eliminates the infrastructure complexity while teaching you the underlying patterns.',
  learn: [
    'multipart/form-data: how files are encoded and sent in HTTP requests',
    'Why files should never be stored in a relational database (use object storage instead)',
    'Amazon S3 and compatible APIs: buckets, keys, presigned URLs for direct client uploads',
    'UploadThing: the developer-friendly file upload service for Next.js',
    'Client-side validation: file type checking, size limits, preview before upload',
    'Drag-and-drop upload UI: the HTML5 File API and DataTransfer events',
    'Image optimisation on upload: resizing, format conversion (WebP), and CDN caching'
  ],
  prerequisites: 'Next.js API Routes, Authentication',
  task: 'Add avatar upload to a profile page using UploadThing: drag-and-drop or click-to-select an image, preview it before uploading, enforce a 4MB limit and image-only restriction, upload to UploadThing on confirm, save the URL to the user\'s Prisma record, and display it in the header navbar.',
  youtubeQuery: 'Next.js file upload UploadThing tutorial 2024 profile avatar',
  docsUrl: 'https://docs.uploadthing.com'
},

// ─────────────────────────────────────────────
// SECTION 12 — TESTING
// ─────────────────────────────────────────────
{
  id: 'testing',
  label: 'Testing',
  section: 12,
  sectionTitle: 'Testing',
  isMain: true,
  parent: null,
  border: 'orange',
  difficulty: 'INTERMEDIATE',
  time: '3–4 weeks',
  whyMatters: 'Tests are not optional in professional software development — they are how teams move fast without breaking things. Untested code is a liability that slows down every future change. Employers increasingly ask about testing strategies in interviews and assess test coverage in take-home projects. A codebase with good tests signals maturity, professionalism, and long-term thinking.',
  learn: [
    'The test pyramid: unit tests (many, fast), integration tests (some), E2E tests (few, slow)',
    'What makes a test valuable: testing behaviour, not implementation details',
    'Test doubles: mocks, stubs, spies — when to use each and the risks of over-mocking',
    'Code coverage: what it measures, what it misses, and why 100% is not the goal',
    'TDD (Test-Driven Development): writing the test before the code',
    'Testing asynchronous code: async/await in tests, fake timers, and network mocking',
    'Continuous integration: running tests on every PR with GitHub Actions'
  ],
  prerequisites: 'React Deep Dive, JavaScript (all sections)',
  task: 'Add a complete test suite to an existing React application: unit tests for all utility functions, component tests for the three most complex components, and one E2E test for the critical user journey (sign up → create item → delete item). Achieve meaningful coverage, not 100%.',
  youtubeQuery: 'React testing tutorial Jest Testing Library Playwright 2024',
  docsUrl: 'https://testing-library.com/docs/react-testing-library/intro'
},
{
  id: 'jest-unit',
  label: 'Unit Testing — Jest',
  section: 12,
  sectionTitle: 'Testing',
  isMain: false,
  parent: 'testing',
  border: 'blue',
  difficulty: 'INTERMEDIATE',
  time: '3–4 days',
  whyMatters: 'Unit tests are the fastest feedback loop in development — they run in milliseconds and catch regressions instantly. Jest is the most widely used JavaScript test runner, and writing good unit tests for pure functions, utilities, and hooks is a skill every professional developer is expected to have. It also forces you to write modular, testable code.',
  learn: [
    'Jest basics: describe, it/test, expect matchers (toBe, toEqual, toContain, toThrow)',
    'Test setup and teardown: beforeEach, afterEach, beforeAll, afterAll',
    'Mocking modules with jest.mock() and jest.fn() for isolating units',
    'Spying on functions with jest.spyOn() without replacing the implementation',
    'Testing async code: async/await tests, mockResolvedValue, mockRejectedValue',
    'Snapshot testing: when it helps (UI regression) and when it hurts (brittle tests)',
    'Code coverage reports: jest --coverage and interpreting line/branch coverage'
  ],
  prerequisites: 'JavaScript (all sections)',
  task: 'Write a full Jest test suite for a utility library containing: a currency formatter, a date-distance function, an email validator, a debounce function, and a fetch wrapper that handles errors. Achieve 100% branch coverage on every function and include at least two tests per edge case.',
  youtubeQuery: 'Jest tutorial JavaScript unit testing 2024 complete guide',
  docsUrl: 'https://jestjs.io/docs/getting-started'
},
{
  id: 'rtl-component',
  label: 'Component Testing — RTL',
  section: 12,
  sectionTitle: 'Testing',
  isMain: false,
  parent: 'testing',
  border: 'blue',
  difficulty: 'INTERMEDIATE',
  time: '4–5 days',
  whyMatters: 'React Testing Library\'s guiding principle — "the more your tests resemble the way your software is used, the more confidence they give you" — has fundamentally changed how the industry writes component tests. RTL\'s query API forces you to test what the user sees and does, not implementation internals, producing tests that remain valid even after major refactors.',
  learn: [
    'render(), screen, and the query API: getBy, queryBy, findBy and their *AllBy variants',
    'Query priority: getByRole > getByLabelText > getByText — accessibility-first querying',
    'User interactions with @testing-library/user-event: type, click, keyboard, selectOptions',
    'Testing asynchronous behaviour: waitFor, findBy queries, flushing effects',
    'Mocking API calls with Mock Service Worker (MSW) in tests',
    'Testing forms: filling inputs, submitting, verifying validation messages appear',
    'Custom render functions: wrapping tests with Providers (Router, QueryClient, Theme)'
  ],
  prerequisites: 'Jest Unit Testing, React Hooks',
  task: 'Write RTL tests for a multi-step form component: step navigation works, validation messages appear on blur, the submit button is disabled while submitting, a success message appears after mock API resolves, and the error state shows when the mock API rejects. Use MSW to mock the API.',
  youtubeQuery: 'React Testing Library tutorial 2024 user-event MSW forms',
  docsUrl: 'https://testing-library.com/docs/react-testing-library/intro'
},
{
  id: 'playwright-e2e',
  label: 'E2E Testing — Playwright',
  section: 12,
  sectionTitle: 'Testing',
  isMain: false,
  parent: 'testing',
  border: 'dashed',
  difficulty: 'ADVANCED',
  time: '3–4 days',
  whyMatters: 'End-to-end tests run your entire application — frontend and backend together — in a real browser. They catch integration bugs that unit and component tests cannot. Playwright has overtaken Cypress as the preferred E2E tool because of its multi-browser support, automatic waiting, and superior parallelisation. CI pipelines that run Playwright on every PR prevent production regressions.',
  learn: [
    'Playwright test structure: test(), expect(), page, browser, and BrowserContext',
    'Navigation and interaction: page.goto(), page.click(), page.fill(), page.selectOption()',
    'Smart waiting: auto-waits, waitForResponse(), waitForURL() — no manual sleeps',
    'Locator API: page.getByRole(), page.getByLabel(), page.getByTestId()',
    'Page Object Model (POM): encapsulating page interactions in reusable classes',
    'API mocking with route(): intercepting and mocking network requests in E2E tests',
    'CI integration: running tests headless in GitHub Actions on every push'
  ],
  prerequisites: 'Component Testing — RTL',
  task: 'Write a Playwright test suite for a Next.js e-commerce app: sign up flow (fill form, verify redirect), add-to-cart (product page → cart badge updates → checkout page shows item), and checkout form validation (submit empty → error messages appear). Run the suite in GitHub Actions on PR.',
  youtubeQuery: 'Playwright E2E testing tutorial 2024 Next.js GitHub Actions',
  docsUrl: 'https://playwright.dev/docs/intro'
},
{
  id: 'storybook',
  label: 'Storybook',
  section: 12,
  sectionTitle: 'Testing',
  isMain: false,
  parent: 'testing',
  border: 'dashed',
  difficulty: 'INTERMEDIATE',
  time: '2–3 days',
  whyMatters: 'Storybook is a tool for developing and documenting UI components in isolation. It is the standard way to build a component library, share it with designers, and write visual regression tests. Larger organisations with design systems use Storybook as the single source of truth for all UI components. Knowing it demonstrates awareness of professional-grade frontend workflows.',
  learn: [
    'Stories: a story is a named visual state of a component (e.g. Button/Primary, Button/Disabled)',
    'The args/argTypes system: making stories configurable with controls UI',
    'Decorators: wrapping stories in providers (Router, Theme, i18n) without modifying components',
    'Autodocs: automatic documentation generation from JSDoc comments and TypeScript types',
    'Storybook interactions: writing play() functions that simulate user interactions in stories',
    'Visual regression testing with Chromatic (Storybook\'s cloud service)',
    'Accessibility addon: automatically flagging WCAG violations in every story'
  ],
  prerequisites: 'React Component Patterns, TypeScript',
  task: 'Create a Storybook for a design system with at least 5 components (Button, Input, Badge, Card, Modal). Write 3–5 stories per component covering all variants and states. Add a play() function to the Modal story that opens and closes it. Set up Chromatic for visual diff on PR.',
  youtubeQuery: 'Storybook tutorial 2024 React component library design system',
  docsUrl: 'https://storybook.js.org/docs'
},

// ─────────────────────────────────────────────
// SECTION 13 — PERFORMANCE
// ─────────────────────────────────────────────
{
  id: 'performance',
  label: 'Performance',
  section: 13,
  sectionTitle: 'Performance',
  isMain: true,
  parent: null,
  border: 'orange',
  difficulty: 'ADVANCED',
  time: '3–4 weeks',
  whyMatters: 'Performance is a feature. A 1-second delay in page load time can reduce conversions by 7%. Google\'s Core Web Vitals directly affect search rankings. Companies like Amazon and Walmart have published data showing the direct relationship between milliseconds and revenue. Senior frontend engineers are expected to own performance — to measure it, diagnose it, and fix it systematically.',
  learn: [
    'Performance is a spectrum: perceived performance matters as much as absolute metrics',
    'The RAIL model: Response, Animation, Idle, Load — targets for each',
    'Lighthouse and Chrome DevTools Performance panel as primary profiling tools',
    'The critical rendering path: what blocks first paint and how to unblock it',
    'Network performance: HTTP/2 multiplexing, resource hints (preload, prefetch, preconnect)',
    'JavaScript performance: main thread blocking, long tasks, and the 50ms budget',
    'Measuring in the field vs the lab: real user monitoring (RUM) vs synthetic testing'
  ],
  prerequisites: 'Next.js, React Deep Dive, CSS',
  task: 'Audit an existing Next.js application with Lighthouse. Identify the three biggest performance issues, implement fixes for each (e.g. lazy loading, image optimisation, code splitting), and re-run Lighthouse to document the score improvement. Write a performance report with before/after metrics.',
  youtubeQuery: 'web performance optimisation Core Web Vitals Lighthouse 2024',
  docsUrl: 'https://web.dev/performance'
},
{
  id: 'core-web-vitals',
  label: 'Core Web Vitals',
  section: 13,
  sectionTitle: 'Performance',
  isMain: false,
  parent: 'performance',
  border: 'green',
  difficulty: 'ADVANCED',
  time: '3–4 days',
  whyMatters: 'Core Web Vitals are Google\'s official metrics for page experience and they directly influence search rankings. Every frontend engineer building public-facing applications needs to understand what causes poor LCP, CLS, and INP scores and how to fix them. Vercel\'s Speed Insights and Next.js\'s built-in image/font optimisation are designed specifically around these metrics.',
  learn: [
    'LCP (Largest Contentful Paint): target <2.5s, caused by slow resources/render-blocking assets',
    'INP (Interaction to Next Paint): target <200ms, caused by long JS tasks on the main thread',
    'CLS (Cumulative Layout Shift): target <0.1, caused by images without size, late-loading fonts',
    'Measuring with Lighthouse, PageSpeed Insights, Chrome UX Report, and Vercel Speed Insights',
    'LCP optimisation: preload hero images, use priority on Next.js Image, host fonts locally',
    'INP optimisation: code splitting, moving work off the main thread, reducing bundle size',
    'CLS prevention: always specify width/height on images, use font-display: optional or swap'
  ],
  prerequisites: 'How Browsers Work, Next.js',
  task: 'Take a site with poor Core Web Vitals (use web.dev/measure to find one or deliberately break your own). Fix the LCP by preloading the hero image, fix the CLS by adding explicit dimensions to all images and a local font-face declaration, and fix an INP issue by deferring a heavy third-party script.',
  youtubeQuery: 'Core Web Vitals LCP CLS INP fix tutorial 2024',
  docsUrl: 'https://web.dev/vitals'
},
{
  id: 'code-splitting',
  label: 'Code Splitting',
  section: 13,
  sectionTitle: 'Performance',
  isMain: false,
  parent: 'performance',
  border: 'green',
  difficulty: 'ADVANCED',
  time: '2–3 days',
  whyMatters: 'Shipping all JavaScript in a single bundle means users on mobile connections must download, parse, and execute code for features they never use before they see the page. Code splitting breaks this monolith into smaller chunks that load on demand. It is one of the highest-impact performance optimisations available with relatively low implementation effort in a Next.js or Vite application.',
  learn: [
    'Static import vs dynamic import(): how dynamic import splits code into separate chunks',
    'React.lazy() and Suspense: component-level code splitting with loading boundaries',
    'Route-based splitting (automatic in Next.js): each route as a separate bundle',
    'Bundle analysis: using @next/bundle-analyzer or vite-bundle-visualizer to find large deps',
    'Tree shaking: how bundlers eliminate dead code and why named exports help',
    'Prefetching with <Link prefetch> in Next.js: loading future routes before they are needed',
    'Third-party library splitting: loading heavy libs (charts, maps, editors) only when needed'
  ],
  prerequisites: 'Next.js App Router, Vite/Tooling',
  task: 'Analyse the bundle of an existing Next.js app using @next/bundle-analyzer. Find the three largest dependencies. Code-split a heavy chart library using dynamic import with a Suspense skeleton, lazy-load a rich text editor component, and verify the main JS bundle size decrease in the build output.',
  youtubeQuery: 'code splitting React Next.js lazy loading dynamic import bundle analysis',
  docsUrl: 'https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading'
},
{
  id: 'image-optimisation',
  label: 'Image Optimisation',
  section: 13,
  sectionTitle: 'Performance',
  isMain: false,
  parent: 'performance',
  border: 'green',
  difficulty: 'INTERMEDIATE',
  time: '2 days',
  whyMatters: 'Images are typically the largest assets on a web page and the single biggest contributor to poor LCP scores. Unoptimised images — wrong format, wrong size, no lazy loading — can make a page 10x heavier than it needs to be. Next.js\'s built-in Image component handles most of this automatically, but you need to understand what it is doing to configure it correctly.',
  learn: [
    'Image formats: JPEG for photos, PNG for transparency, WebP as default, AVIF for best compression',
    'Responsive images: srcset and sizes attributes to serve different resolutions',
    'next/image: automatic WebP conversion, lazy loading, blur placeholder, priority prop',
    'Intrinsic vs fixed vs fill layout modes in next/image',
    'The priority prop: marking above-the-fold images to preload for LCP improvement',
    'External image domains: configuring remotePatterns in next.config.js',
    'Blur placeholder: blurDataURL as a LQIP (low-quality image placeholder) technique'
  ],
  prerequisites: 'Next.js, Core Web Vitals',
  task: 'Take a gallery page with 20 images loaded naively (<img> tags, no sizing, JPEG format). Migrate all images to next/image, set appropriate sizes, add priority to the first visible image, generate blurDataURL placeholders using plaiceholder, and measure before/after with Lighthouse and a Network throttling test.',
  youtubeQuery: 'Next.js image optimisation tutorial next/image responsive WebP',
  docsUrl: 'https://nextjs.org/docs/app/building-your-application/optimizing/images'
},
{
  id: 'caching-strategies',
  label: 'Caching Strategies',
  section: 13,
  sectionTitle: 'Performance',
  isMain: false,
  parent: 'performance',
  border: 'green',
  difficulty: 'ADVANCED',
  time: '3–4 days',
  whyMatters: 'Caching is the most powerful performance tool available — serving a cached resource takes microseconds instead of milliseconds. But caching is famously hard: stale data can be worse than slow data. Understanding the full caching stack — browser cache, CDN, server cache, React cache — and the cache invalidation strategies for each layer is what separates senior engineers from mid-level ones.',
  learn: [
    'Browser cache: Cache-Control headers, max-age, stale-while-revalidate, immutable for hashed assets',
    'CDN caching: edge servers, cache-hit ratios, vary headers, and cache purging',
    'Next.js caching layers: fetch() cache, router cache, full route cache, and data cache',
    'Stale-while-revalidate: serving stale data while fetching fresh data in the background',
    'Cache invalidation: revalidatePath(), revalidateTag(), and on-demand webhooks',
    'React cache() function: request-level memoisation for Server Components',
    'Service Worker caching: cache-first, network-first, stale-while-revalidate strategies'
  ],
  prerequisites: 'Next.js Data Fetching, HTTP & HTTPS',
  task: 'Implement a three-layer caching strategy on a Next.js app: browser caching for static assets using immutable Cache-Control, Next.js ISR with revalidate for product pages, and on-demand revalidation via a webhook when product data changes. Verify each layer with DevTools and Next.js build output.',
  youtubeQuery: 'web caching strategies HTTP cache CDN Next.js revalidation tutorial',
  docsUrl: 'https://nextjs.org/docs/app/building-your-application/caching'
},
{
  id: 'web-security',
  label: 'Web Security',
  section: 13,
  sectionTitle: 'Performance',
  isMain: false,
  parent: 'performance',
  border: 'green',
  difficulty: 'ADVANCED',
  time: '3–4 days',
  whyMatters: 'Security vulnerabilities in frontend code are real and frequent. XSS attacks steal session tokens. CSRF exploits authenticated sessions. Exposed secrets in client bundles compromise backends. Frontend developers who understand security write more defensive code, pass security reviews, and are trusted with more critical projects. The OWASP Top 10 is required reading for any professional web developer.',
  learn: [
    'XSS (Cross-Site Scripting): reflected, stored, DOM-based — and how to prevent with CSP and encoding',
    'CSRF (Cross-Site Request Forgery): how SameSite cookies and CSRF tokens prevent it',
    'Content Security Policy: restricting allowed sources for scripts, styles, and images',
    'HTTPS everywhere: HSTS headers, mixed content, certificate transparency',
    'Dependency vulnerabilities: npm audit, Snyk, and keeping packages updated',
    'Secrets management: never put API keys in client bundles — use server-side env vars',
    'Authentication security: httpOnly cookies, short-lived tokens, refresh token rotation'
  ],
  prerequisites: 'Authentication, HTTP & HTTPS, Next.js',
  task: 'Run a security audit on an existing app: use npm audit to find vulnerable packages and update them, implement a strict Content Security Policy header in next.config.js, identify and move any client-exposed secrets to server-side env vars, and verify cookie security flags are set correctly in Auth.js.',
  youtubeQuery: 'web security XSS CSRF CSP headers frontend tutorial 2024',
  docsUrl: 'https://owasp.org/www-project-top-ten/'
},
{
  id: 'pwa',
  label: 'PWA',
  section: 13,
  sectionTitle: 'Performance',
  isMain: false,
  parent: 'performance',
  border: 'dashed',
  difficulty: 'ADVANCED',
  time: '3–4 days',
  whyMatters: 'Progressive Web Apps bridge the gap between web and native apps. They are installable, work offline, receive push notifications, and load instantly from cache. For content-heavy applications — news sites, e-commerce, productivity tools — PWA features dramatically improve user retention and engagement. In emerging markets with unreliable connectivity, offline capability is a hard requirement.',
  learn: [
    'PWA requirements: HTTPS, a Web App Manifest, and a registered Service Worker',
    'Web App Manifest: name, icons, display: standalone, theme_color, start_url',
    'Service Worker lifecycle: install, activate, fetch events and the Cache API',
    'Caching strategies in Service Workers: cache-first, network-first, stale-while-revalidate',
    'Offline fallback pages: serving a cached fallback when network requests fail',
    'Push notifications: the Push API, VAPID keys, and the Notifications API',
    'next-pwa plugin: adding Service Worker support to a Next.js application'
  ],
  prerequisites: 'Caching Strategies, Next.js',
  task: 'Convert a Next.js app to a PWA using next-pwa: configure the manifest, implement a Service Worker with network-first for API routes and cache-first for static assets, add an offline fallback page, and install the app on your device to verify standalone mode and offline capability.',
  youtubeQuery: 'PWA Next.js tutorial 2024 service worker offline manifest install',
  docsUrl: 'https://web.dev/progressive-web-apps/'
},
{
  id: 'websockets',
  label: 'Web Sockets',
  section: 13,
  sectionTitle: 'Performance',
  isMain: false,
  parent: 'performance',
  border: 'dashed',
  difficulty: 'ADVANCED',
  time: '2–3 days',
  whyMatters: 'HTTP is request-response — the server cannot send data to the client unprompted. WebSockets solve this with a persistent bidirectional connection, enabling real-time features like live chat, collaborative editing, notifications, and live dashboards. Understanding when to use WebSockets vs Server-Sent Events vs polling is a common senior interview question.',
  learn: [
    'The WebSocket handshake: upgrading from HTTP to a persistent TCP connection',
    'WebSocket API: new WebSocket(url), onopen, onmessage, onerror, onclose, send()',
    'Server-Sent Events (SSE): simpler one-directional alternative for server push',
    'Socket.io: the most popular WebSocket library with rooms, namespaces, and fallback',
    'Scaling WebSockets: sticky sessions, Redis pub/sub for multi-server deployments',
    'When not to use WebSockets: polling is simpler and sufficient for many use cases',
    'Ably and Pusher: managed WebSocket services that eliminate infrastructure complexity'
  ],
  prerequisites: 'Next.js API Routes, React useEffect',
  task: 'Build a real-time collaborative whiteboard using Socket.io: multiple users can draw with different colours, see each other\'s cursors in real time, and the board state is synchronised when a new user connects. Deploy to a Node.js server (Railway or Render) and test with two browser tabs.',
  youtubeQuery: 'WebSockets Socket.io React tutorial real-time app 2024',
  docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API'
},

// ─────────────────────────────────────────────
// SECTION 14 — AI TOOLS
// ─────────────────────────────────────────────
{
  id: 'ai-tools',
  label: 'AI Tools',
  section: 14,
  sectionTitle: 'AI Tools',
  isMain: true,
  parent: null,
  border: 'orange',
  difficulty: 'BEGINNER',
  time: '1–2 weeks',
  whyMatters: 'AI coding tools have fundamentally changed frontend development productivity. Developers who use AI tools effectively ship features 30–50% faster than those who do not. This is not about replacing developers — it is about understanding which tasks AI handles well (boilerplate, tests, refactoring) and which require human judgment (architecture, security, product decisions). In 2025, AI-assisted coding is expected, not optional.',
  learn: [
    'The AI pair programming model: you are still the architect, AI is the tireless implementer',
    'Writing effective prompts for code generation: be specific, provide context, show examples',
    'When to trust AI output: always review generated code before committing it',
    'Using AI for tests: generating test cases for edge cases you might have missed',
    'Using AI for documentation: converting complex code to readable explanations',
    'AI limitations: hallucinated APIs, outdated patterns, security blind spots',
    'The emerging agentic model: AI tools that can browse docs, run tests, and iterate autonomously'
  ],
  prerequisites: 'JavaScript, React, TypeScript',
  task: 'Use an AI tool (Cursor or GitHub Copilot) to build a feature from scratch: describe it in natural language, accept/reject/refine suggestions, generate tests with AI assistance, and write a retrospective documenting what the AI got right, what it got wrong, and how you guided it to the final result.',
  youtubeQuery: 'AI coding tools Cursor GitHub Copilot developer productivity 2024',
  docsUrl: 'https://docs.cursor.com'
},
{
  id: 'github-copilot',
  label: 'GitHub Copilot',
  section: 14,
  sectionTitle: 'AI Tools',
  isMain: false,
  parent: 'ai-tools',
  border: 'dashed',
  difficulty: 'BEGINNER',
  time: '2–3 days',
  whyMatters: 'GitHub Copilot is integrated directly into VS Code and is the most widely adopted AI coding assistant. Understanding how to get the most from it — writing descriptive function signatures, using inline chat, generating tests, and knowing when to override its suggestions — makes it a genuine productivity multiplier rather than a distraction that inserts subtle bugs.',
  learn: [
    'Ghost text completions: writing comments and type signatures to steer suggestions',
    'Copilot Chat (inline and sidebar): asking questions about your own code',
    'Generating unit tests with /tests slash command in Copilot Chat',
    'Explaining unfamiliar code with /explain in a selected block',
    'Fixing bugs with /fix and reviewing what Copilot actually changed',
    'Copilot limitations: it does not know your codebase deeply — context files help',
    'Security awareness: reviewing every suggested import and external URL'
  ],
  prerequisites: 'JavaScript, VS Code',
  task: 'Enable GitHub Copilot in VS Code. Use it to write a complete sorting algorithm library with 5 algorithms, generate a full test suite for it using /tests, ask it to explain the time complexity of each algorithm using /explain, and identify one suggestion it got wrong. Document your review process.',
  youtubeQuery: 'GitHub Copilot tutorial 2024 VS Code tips productivity',
  docsUrl: 'https://docs.github.com/en/copilot'
},
{
  id: 'cursor',
  label: 'Cursor',
  section: 14,
  sectionTitle: 'AI Tools',
  isMain: false,
  parent: 'ai-tools',
  border: 'dashed',
  difficulty: 'BEGINNER',
  time: '2–3 days',
  whyMatters: 'Cursor is a VS Code fork with deeply integrated AI that can understand and edit entire files at once — not just the line under your cursor. Its Composer feature can implement multi-file features from a single natural language description. Cursor has become the favourite IDE of many professional developers for its ability to handle complex refactors that would take hours manually.',
  learn: [
    'Cursor Chat: asking questions about files with @filename context injection',
    'Composer: multi-file edits from a single prompt, reviewing diffs before accepting',
    'Agent mode: Cursor autonomously runs terminal commands, reads error output, and iterates',
    'Ctrl+K inline edits: quick in-place code transformations with natural language',
    'Rules for AI (.cursorrules): project-specific instructions that guide all AI responses',
    'Model selection: when to use Claude vs GPT-4o vs Gemini for different tasks',
    'Privacy mode: keeping sensitive code out of training data'
  ],
  prerequisites: 'JavaScript, React, VS Code Setup',
  task: 'Install Cursor. Use Composer to implement a complete feature from a description: "Add a dark mode toggle to this app with system preference detection, localStorage persistence, and smooth transition". Review the multi-file diff, accept good changes, reject bad ones, and iterate with follow-up prompts.',
  youtubeQuery: 'Cursor IDE tutorial 2024 AI coding Composer agent mode',
  docsUrl: 'https://docs.cursor.com'
},
{
  id: 'claude-code',
  label: 'Claude Code',
  section: 14,
  sectionTitle: 'AI Tools',
  isMain: false,
  parent: 'ai-tools',
  border: 'dashed',
  difficulty: 'INTERMEDIATE',
  time: '2–3 days',
  whyMatters: 'Claude Code is Anthropic\'s agentic coding tool that lives in your terminal. It can read your entire codebase, write and run commands, create and edit files, and iterate based on test results — all from a conversational CLI. It excels at large refactors, implementing complex features across many files, and tasks that require understanding project-wide patterns.',
  learn: [
    'Installing Claude Code via npm and authenticating with your Anthropic account',
    'Giving Claude Code permission to read/write files and run terminal commands',
    'Using natural language to describe multi-file refactors and letting it execute them',
    'Reviewing changes with git diff before committing AI-generated code',
    'CLAUDE.md: the project instructions file that Claude Code reads on every session',
    'Agentic loops: Claude Code running tests, seeing failures, and fixing them autonomously',
    'Cost awareness: complex agentic tasks can use significant API tokens'
  ],
  prerequisites: 'Git & GitHub, JavaScript, React',
  task: 'Install Claude Code. Give it a task that spans multiple files: "Migrate this class-based React component to a functional component with hooks, update all its tests, and update the Storybook stories to use the new API". Review every file change in git diff and commit only what is correct.',
  youtubeQuery: 'Claude Code agentic coding tutorial terminal 2024 Anthropic',
  docsUrl: 'https://docs.anthropic.com/en/docs/claude-code'
},
{
  id: 'v0-vercel',
  label: 'v0 by Vercel',
  section: 14,
  sectionTitle: 'AI Tools',
  isMain: false,
  parent: 'ai-tools',
  border: 'dashed',
  difficulty: 'BEGINNER',
  time: '1–2 days',
  whyMatters: 'v0 is Vercel\'s generative UI tool that produces full React + shadcn/ui + Tailwind components from a text or image prompt. It dramatically accelerates the prototyping and scaffolding phase of frontend work — generating a polished dashboard UI that would take hours to build manually in under a minute. Understanding how to critically evaluate and clean up AI-generated UI code is a modern frontend skill.',
  learn: [
    'Prompting v0 effectively: describing layout, interactions, and data structure precisely',
    'Iterating on generated UI with follow-up prompts: "make the sidebar collapsible"',
    'Copying v0 output into your codebase: understanding every line before committing',
    'When v0 shines: complex layout scaffolding, shadcn/ui component composition',
    'When v0 falls short: custom animations, complex state logic, non-standard interactions',
    'Using v0-generated code as a starting point, not a finished product',
    'Image-to-code: uploading a design mockup and getting a React component back'
  ],
  prerequisites: 'React JSX & Components, Tailwind CSS, shadcn/ui',
  task: 'Use v0 to generate a complete admin dashboard layout: sidebar nav, header with user menu, a data table with mock data, and a set of stat cards. Copy the output, clean up any hallucinated component names, add real interactivity (sorting, filtering), and document what you changed from the generated code.',
  youtubeQuery: 'v0 by Vercel tutorial 2024 AI UI generation shadcn Tailwind',
  docsUrl: 'https://v0.dev'
},

// ─────────────────────────────────────────────
// FINAL NODE — CONGRATULATIONS
// ─────────────────────────────────────────────
{
  id: 'congrats',
  label: '🎉 Frontend Developer',
  section: 15,
  sectionTitle: 'Job Ready',
  isMain: true,
  parent: null,
  border: 'orange',
  difficulty: 'BEGINNER',
  time: 'You made it',
  special: true,
  whyMatters: 'Congratulations — you have completed the entire frontend roadmap. You now possess the skills that professional frontend developers use every day: semantic HTML and accessible CSS, responsive design with Flexbox and Grid, modern JavaScript and TypeScript, React and Next.js for full-stack applications, databases and authentication, testing strategies, and performance optimisation. This is not the end — it is the beginning. The best developers never stop learning. But you now have a complete, solid foundation to build a real career on. Go ship something that matters.',
  learn: [
    'Build at least 3 portfolio projects that use Next.js, Prisma, and Auth.js end-to-end',
    'Contribute to an open-source project — even documentation fixes count',
    'Write 3 technical blog posts explaining something you found difficult',
    'Complete at least 50 LeetCode problems to prepare for technical interviews',
    'Build your personal website with a blog, project showcase, and contact form',
    'Set up a professional GitHub profile with pinned repos and a polished README',
    'Apply for your first role: apply to 5 jobs per day until you land interviews'
  ],
  prerequisites: 'Everything on this roadmap',
  task: 'Apply for your first frontend developer role or take on your first freelance project. Your portfolio should include a full-stack Next.js app with authentication, a REST API, and a database. Deploy everything publicly, write a README, and share it on LinkedIn and Twitter.',
  youtubeQuery: 'how to get your first frontend developer job 2024 portfolio tips',
  docsUrl: 'https://roadmap.sh/frontend'
}

]; // end FE_RM_NODES


// ─────────────────────────────────────────────────────────────
// § 2 — PROGRESS STATE
// ─────────────────────────────────────────────────────────────
let feRmProgress = JSON.parse(localStorage.getItem('fe_visual_progress') || '{}');
const feRmSaveProgress = () => localStorage.setItem('fe_visual_progress', JSON.stringify(feRmProgress));

// ─────────────────────────────────────────────────────────────
// § 3 — EXPAND STATE  (all sections expanded by default)
// ─────────────────────────────────────────────────────────────
let feRmExpanded = {};


// ─────────────────────────────────────────────────────────────
// § 4 — RENDERING ENGINE  (Part 4)
// ─────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
// PART 4 OF 6 — RENDERING ENGINE (Graph Layout)
// Paste this entire block inside the <script> in Part 6,
// AFTER the FE_RM_NODES declaration and progress state vars.
// ═══════════════════════════════════════════════════════════════

// ── Expand state: all sections start expanded ──────────────────
// feRmExpanded declared in state block above

// ── Border → visual style map ──────────────────────────────────
const FE_RM_BORDER_STYLES = {
  orange: { border: '2px solid #f97316', bg: '#1a0f05', glow: 'rgba(249,115,22,0.18)', color: '#f97316' },
  blue:   { border: '2px solid #3b82f6', bg: '#05101a', glow: 'rgba(59,130,246,0.15)',  color: '#3b82f6' },
  purple: { border: '2px solid #a855f7', bg: '#0f0520', glow: 'rgba(168,85,247,0.15)', color: '#a855f7' },
  green:  { border: '2px solid #22c55e', bg: '#051a0f', glow: 'rgba(34,197,94,0.12)',  color: '#22c55e' },
  dashed: { border: '2px dashed #8080a8', bg: '#0c0c20', glow: 'rgba(128,128,168,0.1)', color: '#8080a8' }
};

// Sections structure: sectionNum → display title
const FE_RM_SECTION_TITLES = {
  1: 'Internet Basics',
  2: 'HTML',
  3: 'CSS',
  4: 'JavaScript',
  5: 'Version Control',
  6: 'Tooling',
  7: 'JS Framework',
  8: 'React Deep Dive',
  9: 'Next.js',
  10: 'Styling in React',
  11: 'BFF & Databases',
  12: 'Testing',
  13: 'Performance',
  14: 'AI Tools',
  15: 'Job Ready'
};

// ── MAIN RENDER FUNCTION ───────────────────────────────────────
function feRmRender() {
  const graph = document.getElementById('fe-rm-graph');
  if (!graph) return;

  // Clear everything
  graph.innerHTML = '';

  // Group nodes by section
  const sections = {};
  FE_RM_NODES.forEach(node => {
    if (!sections[node.section]) sections[node.section] = [];
    sections[node.section].push(node);
  });

  const sectionNums = Object.keys(sections).map(Number).sort((a, b) => a - b);

  // Initialize expand state for all sections
  sectionNums.forEach(sNum => {
    if (feRmExpanded[sNum] === undefined) feRmExpanded[sNum] = true;
  });

  // Create the SVG layer (drawn after DOM is built)
  const svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgLayer.setAttribute('class', 'fe-rm-svg-layer');
  svgLayer.setAttribute('id', 'fe-rm-svg-layer');
  graph.appendChild(svgLayer);

  // Render each section
  sectionNums.forEach((sNum, idx) => {
    const sectionNodes = sections[sNum];
    const mainNode = sectionNodes.find(n => n.isMain);
    const children = sectionNodes.filter(n => !n.isMain);
    const sectionTitle = mainNode?.sectionTitle || FE_RM_SECTION_TITLES[sNum] || `Section ${sNum}`;

    // ── Section label ──
    if (sNum !== 15) {
      const labelEl = document.createElement('div');
      labelEl.className = 'fe-rm-section-label';

      // Count done nodes in this section
      const sectionDone = sectionNodes.filter(n => {
        const p = feRmProgress[n.id];
        return p && p.status === 'done';
      }).length;

      labelEl.innerHTML = `
        <span class="fe-rm-section-num">§${String(sNum).padStart(2,'0')}</span>
        <span class="fe-rm-section-title-text">${sectionTitle.toUpperCase()}</span>
        <span class="fe-rm-section-line"></span>
        <span class="fe-rm-section-mini-prog">${sectionDone}/${sectionNodes.length}</span>
      `;
      graph.appendChild(labelEl);
    }

    // ── Section block ──
    const block = document.createElement('div');
    block.className = 'fe-rm-section-block';
    block.dataset.section = sNum;

    // ── Trunk node row ──
    const trunkRow = document.createElement('div');
    trunkRow.className = 'fe-rm-trunk-row';

    if (mainNode) {
      const nodeEl = feRmCreateNodeEl(mainNode, true, children.length > 0, sNum);
      trunkRow.appendChild(nodeEl);
    }
    block.appendChild(trunkRow);

    // ── Children grid ──
    if (children.length > 0) {
      const childrenWrap = document.createElement('div');
      childrenWrap.className = 'fe-rm-children-wrap';
      childrenWrap.id = `fe-rm-children-${sNum}`;

      if (!feRmExpanded[sNum]) {
        childrenWrap.style.display = 'none';
      }

      // Arrange children in rows of max 2 (one left, one right)
      // For sections with many children, we stack them in alternating pairs
      const leftCol = document.createElement('div');
      leftCol.className = 'fe-rm-child-col fe-rm-child-left';
      const rightCol = document.createElement('div');
      rightCol.className = 'fe-rm-child-col fe-rm-child-right';

      children.forEach((child, i) => {
        const childEl = feRmCreateNodeEl(child, false, false, sNum);
        if (i % 2 === 0) {
          leftCol.appendChild(childEl);
        } else {
          rightCol.appendChild(childEl);
        }
      });

      childrenWrap.appendChild(leftCol);
      childrenWrap.appendChild(rightCol);
      block.appendChild(childrenWrap);
    }

    graph.appendChild(block);

    // ── Connector between sections (not after last) ──
    if (idx < sectionNums.length - 1) {
      const connector = document.createElement('div');
      connector.className = 'fe-rm-connector-wrap';
      const vLine = document.createElement('div');
      vLine.className = 'fe-rm-v-line';
      vLine.style.height = '28px';
      connector.appendChild(vLine);
      graph.appendChild(connector);
    }
  });

  // Apply progress visuals
  feRmApplyProgress();

  // Draw SVG lines after layout is computed
  requestAnimationFrame(() => {
    feRmDrawLines();
  });
}

// ── Create a node DOM element ──────────────────────────────────
function feRmCreateNodeEl(node, isTrunk, hasChildren, sNum) {
  const style = FE_RM_BORDER_STYLES[node.border] || FE_RM_BORDER_STYLES.dashed;

  const el = document.createElement('div');
  el.className = isTrunk ? 'fe-rm-node fe-rm-trunk' : 'fe-rm-node fe-rm-child';
  el.id = `fe-rm-node-${node.id}`;
  el.dataset.nodeId = node.id;
  el.dataset.section = sNum;

  // Special congrats node
  if (node.special) {
    el.classList.add('fe-rm-node-congrats');
  }

  el.style.cssText = `
    background: ${style.bg};
    border: ${style.border};
    box-shadow: 0 0 0 0 ${style.glow};
  `;

  // Build inner HTML
  let innerHtml = '';

  // Status badge placeholder (injected by feRmApplyProgress)
  innerHtml += `<div class="fe-rm-node-status-badge" id="fe-rm-badge-${node.id}"></div>`;

  // Label
  innerHtml += `<span class="fe-rm-node-label" style="color: ${isTrunk ? style.color : 'var(--t1)'}">${node.label}</span>`;

  // Time chip on trunk
  if (isTrunk && node.time && node.time !== 'You made it') {
    innerHtml += `<span class="fe-rm-node-time">${node.time}</span>`;
  }

  // Expand toggle dot on trunk if has children
  if (isTrunk && hasChildren) {
    innerHtml += `<div class="fe-rm-expand-dot" id="fe-rm-exp-${sNum}"></div>`;
  }

  el.innerHTML = innerHtml;

  // Click handler
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isTrunk && hasChildren) {
      feRmToggleSection(sNum, el);
    } else {
      feRmOpenSheet(node.id);
    }
  });

  // Long press / second tap on trunk to open sheet too
  if (isTrunk) {
    let longPressTimer = null;
    el.addEventListener('touchstart', () => {
      longPressTimer = setTimeout(() => {
        feRmOpenSheet(node.id);
      }, 500);
    }, { passive: true });
    el.addEventListener('touchend', () => clearTimeout(longPressTimer), { passive: true });
    el.addEventListener('touchmove', () => clearTimeout(longPressTimer), { passive: true });
  }

  return el;
}

// ── Toggle section expand/collapse ─────────────────────────────
function feRmToggleSection(sNum, trunkEl) {
  feRmExpanded[sNum] = !feRmExpanded[sNum];
  const childrenWrap = document.getElementById(`fe-rm-children-${sNum}`);
  const expDot = document.getElementById(`fe-rm-exp-${sNum}`);

  if (childrenWrap) {
    if (feRmExpanded[sNum]) {
      childrenWrap.style.display = 'flex';
      childrenWrap.style.animation = 'fe-rm-fadeIn 0.2s ease';
      if (expDot) expDot.classList.remove('fe-rm-collapsed');
    } else {
      childrenWrap.style.display = 'none';
      if (expDot) expDot.classList.add('fe-rm-collapsed');
    }
  }

  // Redraw lines after toggle
  requestAnimationFrame(() => feRmDrawLines());
}

// ── DRAW SVG CONNECTOR LINES ───────────────────────────────────
function feRmDrawLines() {
  const graph = document.getElementById('fe-rm-graph');
  const svgLayer = document.getElementById('fe-rm-svg-layer');
  if (!svgLayer || !graph) return;

  const graphRect = graph.getBoundingClientRect();
  const scrollTop = graph.scrollTop;

  // Set SVG to cover full scrollable area
  const totalHeight = graph.scrollHeight;
  svgLayer.setAttribute('width', graphRect.width);
  svgLayer.setAttribute('height', totalHeight);
  svgLayer.setAttribute('viewBox', `0 0 ${graphRect.width} ${totalHeight}`);

  // Clear old lines
  svgLayer.innerHTML = '';

  // Define arrowhead marker
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <marker id="fe-rm-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L6,3 z" fill="#3a3a5a"/>
    </marker>
    <marker id="fe-rm-arrow-orange" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L6,3 z" fill="rgba(249,115,22,0.4)"/>
    </marker>
  `;
  svgLayer.appendChild(defs);

  // Helper: get element's center-bottom and center-top relative to graph's scrollable area
  const getNodePoints = (el) => {
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const graphScrollTop = graph.scrollTop;
    const top = rect.top - graphRect.top + graphScrollTop;
    const left = rect.left - graphRect.left;
    const width = rect.width;
    const height = rect.height;
    return {
      top,
      bottom: top + height,
      left,
      right: left + width,
      centerX: left + width / 2,
      centerY: top + height / 2,
      topCenter: { x: left + width / 2, y: top },
      bottomCenter: { x: left + width / 2, y: top + height },
      midLeft: { x: left, y: top + height / 2 },
      midRight: { x: left + width, y: top + height / 2 }
    };
  };

  const makePath = (d, color = '#2a2a4a', dashArray = '') => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('fill', 'none');
    path.setAttribute('marker-end', 'url(#fe-rm-arrow)');
    if (dashArray) path.setAttribute('stroke-dasharray', dashArray);
    return path;
  };

  // Group nodes by section
  const sections = {};
  FE_RM_NODES.forEach(node => {
    if (!sections[node.section]) sections[node.section] = [];
    sections[node.section].push(node);
  });

  const sectionNums = Object.keys(sections).map(Number).sort((a, b) => a - b);

  // Draw spine: vertical line connecting trunk nodes top-to-bottom
  const trunkEls = sectionNums.map(sNum => {
    const mainNode = sections[sNum].find(n => n.isMain);
    return mainNode ? document.getElementById(`fe-rm-node-${mainNode.id}`) : null;
  }).filter(Boolean);

  // Draw vertical spine between consecutive trunks
  for (let i = 0; i < trunkEls.length - 1; i++) {
    const fromPts = getNodePoints(trunkEls[i]);
    const toPts = getNodePoints(trunkEls[i + 1]);
    if (!fromPts || !toPts) continue;

    const x = fromPts.bottomCenter.x;
    const y1 = fromPts.bottomCenter.y;
    const y2 = toPts.topCenter.y;

    if (y2 > y1) {
      const spineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      spineEl.setAttribute('x1', x);
      spineEl.setAttribute('y1', y1);
      spineEl.setAttribute('x2', x);
      spineEl.setAttribute('y2', y2);
      spineEl.setAttribute('stroke', 'rgba(249,115,22,0.2)');
      spineEl.setAttribute('stroke-width', '2');
      spineEl.setAttribute('stroke-dasharray', '4 4');
      svgLayer.appendChild(spineEl);
    }
  }

  // Draw child connectors
  sectionNums.forEach(sNum => {
    if (!feRmExpanded[sNum]) return;

    const sectionNodes = sections[sNum];
    const mainNode = sectionNodes.find(n => n.isMain);
    const children = sectionNodes.filter(n => !n.isMain);

    if (!mainNode || children.length === 0) return;

    const trunkEl = document.getElementById(`fe-rm-node-${mainNode.id}`);
    const trunkPts = getNodePoints(trunkEl);
    if (!trunkPts) return;

    const borderStyle = FE_RM_BORDER_STYLES[mainNode.border] || FE_RM_BORDER_STYLES.dashed;
    const lineColor = '#2a2a4a';

    children.forEach((child, i) => {
      const childEl = document.getElementById(`fe-rm-node-${child.id}`);
      if (!childEl) return;

      const childPts = getNodePoints(childEl);
      if (!childPts) return;

      const isLeft = (i % 2 === 0);
      const childBorderStyle = FE_RM_BORDER_STYLES[child.border] || FE_RM_BORDER_STYLES.dashed;
      const connColor = childBorderStyle.color === '#f97316' ? 'rgba(249,115,22,0.3)' : lineColor;

      // From trunk side to child
      const fromX = isLeft ? trunkPts.midLeft.x : trunkPts.midRight.x;
      const fromY = trunkPts.centerY;
      const toX = isLeft ? childPts.midRight.x : childPts.midLeft.x;
      const toY = childPts.centerY;

      // Draw elbow path: horizontal from trunk, then vertical, then horizontal to child
      const midX = isLeft ? (fromX + toX) / 2 : (fromX + toX) / 2;

      // If the child is at a different vertical level, use an L-shaped path
      if (Math.abs(fromY - toY) > 5) {
        const d = `M ${fromX} ${fromY} H ${midX} V ${toY} H ${toX}`;
        const isDashed = child.border === 'dashed';
        svgLayer.appendChild(makePath(d, connColor, isDashed ? '5 3' : ''));
      } else {
        // Same height — direct horizontal line
        const d = `M ${fromX} ${fromY} H ${toX}`;
        svgLayer.appendChild(makePath(d, connColor, child.border === 'dashed' ? '5 3' : ''));
      }
    });
  });
}

// ── APPLY PROGRESS VISUALS ─────────────────────────────────────
function feRmApplyProgress() {
  const allNodes = FE_RM_NODES;
  let doneCount = 0;
  const totalCount = allNodes.length;

  allNodes.forEach(node => {
    const el = document.getElementById(`fe-rm-node-${node.id}`);
    const badge = document.getElementById(`fe-rm-badge-${node.id}`);
    if (!el) return;

    // Remove all status classes first
    el.classList.remove('fe-rm-done', 'fe-rm-inprogress', 'fe-rm-skip');
    if (badge) badge.innerHTML = '';

    const prog = feRmProgress[node.id];
    if (!prog) return;

    if (prog.status === 'done') {
      doneCount++;
      el.classList.add('fe-rm-done');
      if (badge) {
        badge.innerHTML = `<span class="fe-rm-done-badge">✓</span>`;
      }
    } else if (prog.status === 'progress') {
      el.classList.add('fe-rm-inprogress');
      if (badge) {
        badge.innerHTML = `<span class="fe-rm-progress-ring"></span>`;
      }
    } else if (prog.status === 'skip') {
      el.classList.add('fe-rm-skip');
      if (badge) {
        badge.innerHTML = `<span class="fe-rm-skip-badge">→</span>`;
      }
    }
  });

  // Update header progress pill
  const progText = document.getElementById('fe-rm-prog-text');
  if (progText) progText.textContent = `${doneCount} / ${totalCount} done`;

  // Update bottom progress bar
  const bar = document.getElementById('fe-rm-progress-bar');
  if (bar) {
    const pct = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;
    bar.style.width = `${pct}%`;
  }

  // Update section mini-progress labels
  const sections = {};
  FE_RM_NODES.forEach(node => {
    if (!sections[node.section]) sections[node.section] = [];
    sections[node.section].push(node);
  });

  // Refresh section mini labels (they're re-rendered on full render, but update in-place too)
}

// Add required CSS for status badges and node states (appended dynamically)
(function feRmInjectExtraStyles() {
  const styleId = 'fe-rm-dynamic-styles';
  if (document.getElementById(styleId)) return;
  const s = document.createElement('style');
  s.id = styleId;
  s.textContent = `
    /* Status badge inside node */
    .fe-rm-node-status-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      z-index: 3;
      pointer-events: none;
    }
    .fe-rm-done-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background: rgba(34,197,94,0.2);
      border: 1px solid rgba(34,197,94,0.5);
      border-radius: 50%;
      color: #86efac;
      font-size: 9px;
      font-weight: 800;
      font-family: var(--font-mono);
    }
    .fe-rm-skip-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background: rgba(128,128,168,0.12);
      border: 1px solid rgba(128,128,168,0.3);
      border-radius: 50%;
      color: #8080a8;
      font-size: 9px;
      font-weight: 800;
      font-family: var(--font-mono);
    }
    .fe-rm-progress-ring {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(249,115,22,0.2);
      border-top-color: #f97316;
      border-radius: 50%;
      animation: fe-rm-spin 1.2s linear infinite;
    }
    @keyframes fe-rm-spin {
      to { transform: rotate(360deg); }
    }

    /* Node state classes */
    .fe-rm-node.fe-rm-done {
      border-color: rgba(34,197,94,0.6) !important;
      background: rgba(34,197,94,0.05) !important;
    }
    .fe-rm-node.fe-rm-inprogress {
      box-shadow: 0 0 0 2px rgba(249,115,22,0.25), 0 0 12px rgba(249,115,22,0.12) !important;
    }
    .fe-rm-node.fe-rm-skip {
      opacity: 0.45;
      filter: saturate(0.3);
    }

    /* Children layout */
    .fe-rm-children-wrap {
      display: flex;
      flex-direction: row;
      gap: 10px;
      width: 100%;
      margin-top: 10px;
      justify-content: center;
      position: relative;
      z-index: 2;
    }
    .fe-rm-child-col {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
      max-width: calc(50% - 5px);
    }
    .fe-rm-child-left {
      align-items: flex-end;
    }
    .fe-rm-child-right {
      align-items: flex-start;
    }

    /* Expand dot indicator */
    .fe-rm-expand-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(249,115,22,0.5);
      margin: 4px auto 0;
      transition: transform 0.2s;
      flex-shrink: 0;
    }
    .fe-rm-expand-dot.fe-rm-collapsed {
      transform: rotate(180deg);
      opacity: 0.35;
    }

    /* Node base styles */
    .fe-rm-node {
      position: relative;
      border-radius: 10px;
      cursor: pointer;
      transition: border-color 0.2s, box-shadow 0.2s, opacity 0.2s, background 0.2s;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    .fe-rm-node:active {
      transform: scale(0.97);
    }
    .fe-rm-trunk {
      padding: 10px 18px 12px;
      min-width: 160px;
      max-width: 260px;
      width: auto;
      text-align: center;
    }
    .fe-rm-child {
      padding: 7px 12px;
      min-width: 100px;
      max-width: 160px;
      width: 100%;
      text-align: center;
      border-radius: 8px;
    }
    .fe-rm-node-label {
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.2px;
      line-height: 1.3;
      pointer-events: none;
      display: block;
      width: 100%;
    }
    .fe-rm-trunk .fe-rm-node-label {
      font-size: 13px;
      letter-spacing: 0.3px;
    }
    .fe-rm-node-time {
      font-family: var(--font-mono);
      font-size: 9px;
      color: rgba(249,115,22,0.55);
      letter-spacing: 0.3px;
      pointer-events: none;
      margin-top: 1px;
    }

    /* Congrats special node */
    .fe-rm-node-congrats {
      background: linear-gradient(135deg, #1a0f05, #120a18) !important;
      border: 2px solid #f97316 !important;
      box-shadow: 0 0 20px rgba(249,115,22,0.2), 0 0 40px rgba(168,85,247,0.1) !important;
      padding: 14px 24px 16px !important;
    }
    .fe-rm-node-congrats .fe-rm-node-label {
      background: linear-gradient(90deg, #f97316, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 15px !important;
    }

    /* Fade-in animation for expanding children */
    @keyframes fe-rm-fadeIn {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(s);
})();


// ─────────────────────────────────────────────────────────────
// § 5 — BOTTOM SHEET & PROGRESS LOGIC  (Part 5)
// ─────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
// PART 5 OF 6 — BOTTOM SHEET & PROGRESS LOGIC
// Paste this entire block inside the <script> in Part 6,
// AFTER Part 4's rendering engine code.
// ═══════════════════════════════════════════════════════════════

// ── Open Bottom Sheet ──────────────────────────────────────────
function feRmOpenSheet(nodeId) {
  const node = FE_RM_NODES.find(n => n.id === nodeId);
  if (!node) return;

  // Track which node is active (used by status button onclicks in HTML)
  window._feRmActiveNode = nodeId;

  const sheet  = document.getElementById('fe-rm-sheet');
  const overlay = document.getElementById('fe-rm-overlay');
  if (!sheet || !overlay) return;

  // ── Populate difficulty badge ──
  const diffEl = document.getElementById('fe-rm-sheet-difficulty');
  if (diffEl) {
    const diff = (node.difficulty || 'BEGINNER').toUpperCase();
    const diffClass = {
      'BEGINNER':     'beginner',
      'INTERMEDIATE': 'intermediate',
      'ADVANCED':     'advanced',
      'OPTIONAL':     'optional'
    }[diff] || 'beginner';

    diffEl.textContent = diff;
    diffEl.className = `fe-rm-sheet-difficulty ${diffClass}`;
  }

  // ── Title ──
  const titleEl = document.getElementById('fe-rm-sheet-title');
  if (titleEl) {
    // Special congrats override
    titleEl.textContent = node.special
      ? "🎉 You're Job Ready!"
      : node.label;
  }

  // ── Time badge ──
  const timeTextEl = document.getElementById('fe-rm-sheet-time-text');
  if (timeTextEl) timeTextEl.textContent = node.time || '—';

  // ── Why This Matters ──
  const whyEl = document.getElementById('fe-rm-sheet-why');
  if (whyEl) whyEl.textContent = node.whyMatters || '';

  // ── What You'll Learn — build bullet list ──
  const learnEl = document.getElementById('fe-rm-sheet-learn');
  if (learnEl) {
    learnEl.innerHTML = '';
    const items = Array.isArray(node.learn) ? node.learn : [];
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      learnEl.appendChild(li);
    });
  }

  // ── Prerequisites ──
  const prereqEl = document.getElementById('fe-rm-sheet-prereq');
  if (prereqEl) prereqEl.textContent = node.prerequisites || 'None';

  // ── Practice Task ──
  const taskEl = document.getElementById('fe-rm-sheet-task');
  if (taskEl) taskEl.textContent = node.task || '';

  // ── YouTube button ──
  const ytBtn = document.getElementById('fe-rm-sheet-youtube');
  if (ytBtn) {
    ytBtn.onclick = () => {
      const query = encodeURIComponent(node.youtubeQuery || node.label + ' tutorial');
      window.open('https://www.youtube.com/results?search_query=' + query, '_blank', 'noopener');
    };
  }

  // ── Docs button ──
  const docsBtn = document.getElementById('fe-rm-sheet-docs');
  if (docsBtn) {
    docsBtn.onclick = () => {
      if (node.docsUrl) window.open(node.docsUrl, '_blank', 'noopener');
    };
    // Dim docs button slightly if no URL
    docsBtn.style.opacity = node.docsUrl ? '1' : '0.4';
    docsBtn.style.pointerEvents = node.docsUrl ? '' : 'none';
  }

  // ── Highlight current status on the three buttons ──
  feRmRefreshStatusButtons(nodeId);

  // ── Animate sheet up ──
  overlay.classList.add('fe-rm-visible');
  sheet.classList.add('fe-rm-sheet-open');

  // Scroll sheet body back to top each open
  requestAnimationFrame(() => { sheet.scrollTop = 0; });

  // Disable body scroll (prevent background scroll on iOS)
  document.body.style.overflow = 'hidden';
}

// ── Close Bottom Sheet ─────────────────────────────────────────
function feRmCloseSheet() {
  const sheet   = document.getElementById('fe-rm-sheet');
  const overlay = document.getElementById('fe-rm-overlay');

  if (sheet)   sheet.classList.remove('fe-rm-sheet-open');
  if (overlay) overlay.classList.remove('fe-rm-visible');

  document.body.style.overflow = '';

  // Clear active node after transition
  setTimeout(() => {
    if (!sheet || !sheet.classList.contains('fe-rm-sheet-open')) {
      window._feRmActiveNode = null;
    }
  }, 350);
}

// ── Set Node Status ────────────────────────────────────────────
function feRmSetStatus(nodeId, status) {
  if (!nodeId) return;

  // Read current progress from memory (feRmProgress is live reference)
  const existing = feRmProgress[nodeId];
  const wasAlreadyThisStatus = existing && existing.status === status;

  if (wasAlreadyThisStatus) {
    // Toggle off — remove the entry entirely
    delete feRmProgress[nodeId];
  } else {
    feRmProgress[nodeId] = {
      status,
      doneAt: new Date().toISOString()
    };
  }

  // Persist
  feRmSaveProgress();

  // Update graph visuals
  feRmApplyProgress();

  // Refresh button highlights in the open sheet
  feRmRefreshStatusButtons(nodeId);

  // Show toast on done (or cleared)
  if (!wasAlreadyThisStatus && status === 'done') {
    feRmShowToast('✓ Marked complete!');
  } else if (wasAlreadyThisStatus && status === 'done') {
    feRmShowToast('↩ Unmarked');
  }
}

// ── Refresh the three status button highlights ─────────────────
function feRmRefreshStatusButtons(nodeId) {
  const prog = feRmProgress[nodeId];
  const currentStatus = prog ? prog.status : null;

  const btnDone     = document.getElementById('fe-rm-btn-done');
  const btnProgress = document.getElementById('fe-rm-btn-progress');
  const btnSkip     = document.getElementById('fe-rm-btn-skip');

  [btnDone, btnProgress, btnSkip].forEach(btn => {
    if (btn) btn.classList.remove('fe-rm-active-status');
  });

  if (currentStatus === 'done'     && btnDone)     btnDone.classList.add('fe-rm-active-status');
  if (currentStatus === 'progress' && btnProgress) btnProgress.classList.add('fe-rm-active-status');
  if (currentStatus === 'skip'     && btnSkip)     btnSkip.classList.add('fe-rm-active-status');
}

// ── Toast notification ─────────────────────────────────────────
function feRmShowToast(msg) {
  // Use APP.toast if the host app provides it
  if (typeof APP !== 'undefined' && typeof APP.toast === 'function') {
    APP.toast(msg);
    return;
  }

  const toast = document.getElementById('fe-rm-toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add('fe-rm-toast-show');

  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => {
    toast.classList.remove('fe-rm-toast-show');
  }, 1800);
}

// ── Swipe-to-dismiss gesture on the sheet ─────────────────────
(function feRmInitSwipe() {
  const sheet = document.getElementById('fe-rm-sheet');
  if (!sheet) return;

  let startY       = 0;
  let currentY     = 0;
  let isDragging   = false;
  let startScrollTop = 0;

  sheet.addEventListener('touchstart', (e) => {
    // Only drag from the handle area or when sheet is scrolled to top
    startScrollTop = sheet.scrollTop;
    startY   = e.touches[0].clientY;
    currentY = startY;
    isDragging = true;
  }, { passive: true });

  sheet.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    // Only allow swipe-down drag when sheet is at the top
    if (deltaY > 0 && startScrollTop <= 0) {
      // Apply drag resistance to the sheet
      const resistance = Math.min(deltaY * 0.6, 200);
      sheet.style.transform = `translateY(${resistance}px)`;
      sheet.style.transition = 'none';
    }
  }, { passive: true });

  sheet.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;

    const deltaY = currentY - startY;

    // Restore transition
    sheet.style.transition = '';

    if (deltaY > 80 && startScrollTop <= 0) {
      // Swipe down far enough — dismiss
      sheet.style.transform = '';
      feRmCloseSheet();
    } else {
      // Snap back
      sheet.style.transform = '';
    }
  }, { passive: true });

  // Cancel drag if touch is cancelled
  sheet.addEventListener('touchcancel', () => {
    isDragging = false;
    sheet.style.transform = '';
    sheet.style.transition = '';
  }, { passive: true });
})();

// ── Overlay click to dismiss ───────────────────────────────────
// (The onclick="feRmCloseSheet()" is already on .fe-rm-overlay in Part 1 HTML.
//  This is a belt-and-suspenders fallback for programmatic overlay elements.)
(function feRmInitOverlayClick() {
  const overlay = document.getElementById('fe-rm-overlay');
  if (!overlay) return;
  // Only add if the inline onclick isn't already handling it
  overlay.addEventListener('click', feRmCloseSheet);
})();

// ── Keyboard: Escape closes sheet ─────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const sheet = document.getElementById('fe-rm-sheet');
    if (sheet && sheet.classList.contains('fe-rm-sheet-open')) {
      feRmCloseSheet();
    }
  }
});


// ─────────────────────────────────────────────────────────────
// § 6 — INIT FUNCTION
// ─────────────────────────────────────────────────────────────

function feRmInit() {
  // Render the full graph from node data
  feRmRender();

  // Draw SVG connector lines (also called after expand/collapse)
  feRmDrawLines();

  // Apply any saved progress from localStorage
  feRmApplyProgress();

  // Redraw lines on resize (layout shifts when viewport changes)
  window.addEventListener('resize', () => {
    clearTimeout(window._feRmResizeTimer);
    window._feRmResizeTimer = setTimeout(feRmDrawLines, 150);
  });

  // Redraw lines when the graph container is scrolled
  // (SVG layer is absolute-positioned inside the scroll container)
  const graph = document.getElementById('fe-rm-graph');
  if (graph) {
    graph.addEventListener('scroll', () => {
      clearTimeout(window._feRmScrollTimer);
      window._feRmScrollTimer = setTimeout(feRmDrawLines, 80);
    }, { passive: true });
  }
}

// ─────────────────────────────────────────────────────────────
// § 7 — GLOBAL EXPOSURES
// (onclick attributes in Part 1 HTML need these on window)
// ─────────────────────────────────────────────────────────────

window.feRmCloseSheet = feRmCloseSheet;
window.feRmOpenSheet  = feRmOpenSheet;
window.feRmSetStatus  = feRmSetStatus;

// _feRmActiveNode is read by the status button onclicks in Part 1 HTML:
// onclick="feRmSetStatus(window._feRmActiveNode, 'done')"
if (typeof window._feRmActiveNode === 'undefined') {
  window._feRmActiveNode = null;
}

// ─────────────────────────────────────────────────────────────
// § 8 — BOOT  (DOMContentLoaded guard)
// ─────────────────────────────────────────────────────────────

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', feRmInit);
} else {
  feRmInit();
}

})(); // end IIFE

// ═══════════════════════════════════════════════════════
//  FRONTEND ROADMAP — STRUCTURED DATA + LOGIC
//  Color: --cf (orange #f97316) — matches existing palette
//  Structure: mirrors STRUCTURED_AI_ROADMAP exactly
//  3 levels: Beginner (45d) · Intermediate (60d) · Advanced (75d)
// ═══════════════════════════════════════════════════════

const STRUCTURED_FE_ROADMAP = (function() {

function d(day, title, goal, explanation, resources, practice, task, time) {
  return { day, title, goal, explanation, resources, practice, task, time };
}

// ─── BEGINNER (45 Days) ─────────────────────────────────────────────────────
const beginner = {
  label: '🟠 Beginner', days: 45, totalHours: 90, goal: 'HTML + CSS + JS Foundations',
  weeks: [

    { week: 1, title: 'HTML — The Skeleton of the Web', timeRange: '10–12 hrs',
      days: [
        d(1, 'What is HTML & Your First Webpage', 'Understand HTML and create your very first webpage.',
          'HTML (HyperText Markup Language) is the backbone of every webpage. Tags like <html>, <head>, <body> give structure. The browser reads this and displays content. Create an index.html, open in browser — and you\'ve made a website!',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML+full+course+beginners+2024', label: 'HTML Full Course for Beginners' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML', label: 'MDN: Intro to HTML' }],
          'Create an index.html with DOCTYPE, html, head, body. Add a title in head and "Hello Web!" in body.', 
          'Build a "My First Webpage" with your name as h1, a short bio in a paragraph, and a list of 3 hobbies. Open in browser.', '1.5 hrs'),

        d(2, 'Headings, Paragraphs & Text Tags', 'Master all text-level HTML elements.',
          'HTML has 6 heading levels h1–h6. Paragraphs use <p>. Inline elements: <strong> (bold), <em> (italic), <mark> (highlight), <small>, <del>, <ins>. Block vs inline distinction is fundamental — block elements stack vertically, inline flow with text.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML+text+elements+headings+paragraphs', label: 'HTML Text Elements' },
           { type: 'web', url: 'https://www.w3schools.com/html/html_headings.asp', label: 'W3Schools: Headings' }],
          'Create a document using all 6 heading levels and paragraph tags. Use strong, em, mark on some words.',
          'Write a styled article "My Favourite Movie" using all heading levels, paragraphs, and at least 4 inline text tags. Use proper hierarchy (h1 for title, h2 for sections).', '1.5 hrs'),

        d(3, 'Links, Images & Media', 'Embed hyperlinks, images, audio, and video.',
          '<a href="URL"> creates links. Relative paths link within your project; absolute paths link externally. target="_blank" opens in new tab. <img src="" alt=""> for images — alt is critical for accessibility. <video> and <audio> tags embed media with controls attribute.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML+links+images+media+tutorial', label: 'HTML Links & Images' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding', label: 'MDN: Multimedia & Embedding' }],
          'Create links to 5 websites. Add an image from the web. Link between 2 HTML files.',
          'Build a "Favourite Band" page: h1 band name, band image (from web URL), biography paragraph, link to their official website, embedded YouTube video using <iframe>, and a list of top 5 songs.', '1.5–2 hrs'),

        d(4, 'Lists & Tables', 'Create ordered, unordered lists and data tables.',
          'Unordered lists: <ul><li>. Ordered lists: <ol><li>. Nested lists go inside an <li>. Tables: <table>, <thead>, <tbody>, <tr>, <th>, <td>. Use colspan and rowspan to merge cells. Tables are for tabular data, NOT layout.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML+lists+tables+complete+tutorial', label: 'HTML Lists & Tables' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics', label: 'MDN: Table Basics' }],
          'Create a nested grocery list (categories with items). Build a simple 3×3 table.',
          'Build a "Class Schedule" table: days as columns (Mon–Fri), time slots as rows, subject in each cell. Use th for headers, td for data, and add a colspan for a "Lunch Break" spanning all 5 days.', '2 hrs'),

        d(5, 'Forms & Input Elements', 'Build interactive HTML forms.',
          'Forms collect user data. <form action="" method="get/post">. Input types: text, email, password, number, checkbox, radio, date, range, file. Labels: <label for="id">. Group with <fieldset> and <legend>. Validation attributes: required, minlength, pattern. <select> for dropdowns, <textarea> for multiline.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML+forms+complete+tutorial+2024', label: 'HTML Forms Deep Dive' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms', label: 'MDN: HTML Forms' }],
          'Create a form with text, email, password, and radio inputs. Add required to all fields.',
          'Build a "User Registration Form" with: name, email, password, date of birth, gender (radio), country (select), profile picture (file), bio (textarea), terms checkbox, and Submit button. All fields properly labeled and validated.', '2 hrs'),

        d(6, 'Semantic HTML5 — Structure That Means Something', 'Use semantic elements for accessible, SEO-friendly markup.',
          'Semantic elements describe meaning, not just appearance: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>, <figure>, <figcaption>, <time>. Screen readers and search engines use these. div and span are non-semantic and should be used sparingly.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML5+semantic+elements+tutorial', label: 'Semantic HTML5 Elements' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics#Semantics_in_HTML', label: 'MDN: Semantics in HTML' }],
          'Rebuild any previous page replacing all divs with proper semantic tags.',
          'Build a full "Blog Post Page" layout using: header (site title + nav), main (article: title, date/time, figure with image + figcaption, sections), aside (related posts list), footer. Zero div usage.', '1.5–2 hrs'),

        d(7, 'Week 1 Project — Personal Portfolio Page', 'Build a complete multi-section portfolio page with pure HTML.',
          'Apply everything from Week 1: semantic structure, headings, images, links, lists, a table, and a contact form. A portfolio is the #1 project every frontend dev should have. Focus on solid semantic HTML — we\'ll add CSS next week.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML+portfolio+page+project+beginners', label: 'HTML Portfolio Project' },
           { type: 'web', url: 'https://www.freecodecamp.org/news/html-css-portfolio-page/', label: 'FCC: Portfolio Tutorial' }],
          'Outline your sections first: About, Skills, Projects, Contact. Then build one section at a time.',
          '🚀 PROJECT: Build a Personal Portfolio in HTML only: (1) Header with name + nav links, (2) Hero section with photo + tagline, (3) About section with bio, (4) Skills table, (5) Projects section with 3 project cards (image, title, description), (6) Contact form, (7) Footer with social links.', '2.5–3 hrs'),
      ],
      project: { id: 'bfw1', title: 'Semantic Recipe Page', desc: 'Build a complete recipe webpage using proper semantic HTML5. Structure: header with site nav, main article with recipe title, metadata (time, servings as a table), ingredients (ul), step-by-step instructions (ol), figure with food image + figcaption, aside with nutritional info table, footer. No CSS allowed — focus on clean semantic structure and accessibility.' }
    },

    { week: 2, title: 'CSS — Making Things Beautiful', timeRange: '12–14 hrs',
      days: [
        d(8, 'CSS Basics — Selectors & Properties', 'Link CSS to HTML and style elements.',
          'CSS (Cascading Style Sheets) styles HTML. Three ways: inline style="", internal <style>, external stylesheet (best). Selectors: element (p), class (.box), ID (#header), universal (*). Properties: color, background-color, font-size, text-align. Cascade order: later rules override earlier ones.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+full+course+beginners+2024', label: 'CSS Complete Course' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps', label: 'MDN: CSS First Steps' }],
          'Link styles.css to index.html. Style headings with colors. Add background color to body.',
          'Style your Week 1 portfolio: set body font-family (use Google Fonts), color the h1 and h2, add background to header and footer. Use external stylesheet only — no inline styles.', '1.5 hrs'),

        d(9, 'Box Model — Margin, Padding, Border', 'Master the CSS box model completely.',
          'Every element is a box: content → padding → border → margin. box-sizing: border-box makes sizing intuitive — width includes padding and border. margin: auto centers block elements. Shorthand: margin: 10px 20px (top/bottom left/right). Use browser DevTools to inspect boxes.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+box+model+explained+2024', label: 'CSS Box Model Explained' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model', label: 'MDN: The Box Model' }],
          'Create 3 colored divs. Experiment with padding/margin/border on each. Open DevTools to inspect.',
          'Build a "Card Component" from scratch: a 300px wide card with 20px padding, 1px border, border-radius, box-shadow, title, paragraph, and a button. Center the card on the page with margin: auto.', '2 hrs'),

        d(10, 'Typography & Colors in CSS', 'Style fonts and work with color values.',
          'Font properties: font-family, font-size, font-weight, line-height, letter-spacing, text-transform. Google Fonts: import in CSS with @import. Colors: named (red), hex (#ff0000), rgb(255,0,0), hsl(0,100%,50%). CSS variables: --my-color: blue; use: var(--my-color). Best practice: define a color palette with CSS variables.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+typography+colors+google+fonts+tutorial', label: 'CSS Typography & Colors' },
           { type: 'web', url: 'https://fonts.google.com/', label: 'Google Fonts' }],
          'Import 2 Google Fonts. Create a CSS variable palette with 5 colors. Style an article with matching font pairs.',
          'Create a "Design System Starter": define 8 CSS variables (4 colors, 2 fonts, spacing, border-radius). Apply them to style a heading, subheading, body text, and accent text.', '1.5–2 hrs'),

        d(11, 'Display, Position & Overflow', 'Control element layout and positioning.',
          'display: block (full width), inline (flows with text), inline-block (both). position: static (default), relative (offset from normal), absolute (relative to nearest positioned parent), fixed (stays on screen), sticky (hybrid). z-index controls stacking. overflow: hidden/scroll/auto controls content that overflows.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+display+position+explained', label: 'CSS Display & Position' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning', label: 'MDN: CSS Positioning' }],
          'Create a fixed navbar that stays on scroll. Use absolute positioning to overlay a badge on an image.',
          'Build a "sticky header + hero section": fixed navbar at top, big hero with centered text (using position), a "NEW" badge absolutely positioned on a product image, and a back-to-top button fixed at bottom-right.', '2 hrs'),

        d(12, 'Flexbox — One-Dimensional Layouts', 'Master CSS Flexbox for rows and columns.',
          'Flexbox solves the alignment problem. display: flex on parent. justify-content aligns main axis (row), align-items aligns cross axis. flex-wrap allows wrapping. flex-grow, flex-shrink, flex-basis control item sizing. gap adds space between items. Most navbar, card row, and centering problems are solved with Flexbox.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+flexbox+complete+tutorial+2024', label: 'Flexbox Complete Tutorial' },
           { type: 'web', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', label: 'CSS-Tricks: Flexbox Guide' }],
          'Create a row of 4 colored boxes. Use justify-content and align-items to position them all ways.',
          'Build a complete navbar using Flexbox (logo left, links right), a row of 3 cards (equal height, even spacing), and a centered hero section. All with pure Flexbox, no hacks.', '2–2.5 hrs'),

        d(13, 'CSS Grid — Two-Dimensional Layouts', 'Master CSS Grid for complex page layouts.',
          'Grid is a 2D layout system. display: grid on parent. grid-template-columns: repeat(3, 1fr) makes 3 equal columns. grid-gap adds gutters. grid-column: 1 / 3 spans columns. Named areas with grid-template-areas create readable layouts. Grid and Flexbox complement each other — use both.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+grid+complete+tutorial+2024', label: 'CSS Grid Complete Tutorial' },
           { type: 'web', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', label: 'CSS-Tricks: Grid Guide' }],
          'Create a 3-column grid of cards. Make a 2-column layout with sidebar. Use named grid areas.',
          'Build a "Magazine Layout" using CSS Grid named areas: header spans full width, main content takes 2/3, sidebar 1/3, and footer spans full width. Add 6 article cards inside main using a nested 2-column grid.', '2–2.5 hrs'),

        d(14, 'Week 2 Project — Style Your Portfolio', 'Apply all CSS knowledge to fully style your Week 1 portfolio.',
          'Add complete CSS styling to the portfolio built in Week 1. Focus on visual hierarchy, consistent spacing, color palette, typography, and layout using Flexbox and Grid. This is your showpiece project.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+portfolio+styling+project+tutorial', label: 'CSS Portfolio Styling' },
           { type: 'web', url: 'https://www.freecodecamp.org/news/how-to-build-a-portfolio-website/', label: 'FCC: Portfolio CSS' }],
          'Style one section at a time. Define CSS variables first. Start with typography, then layout, then details.',
          '🚀 PROJECT: Fully style your portfolio: (1) CSS variables color palette, (2) Google Fonts, (3) Fixed navbar with Flexbox, (4) Grid-based projects section, (5) Styled form inputs, (6) Hover effects on buttons/cards, (7) box-shadow and border-radius refinements throughout.', '2.5–3 hrs'),
      ],
      project: { id: 'bfw2', title: 'Responsive Card Grid', desc: 'Build a product card grid page using Flexbox and CSS Grid. Design: CSS variable palette (5 colors), Google Fonts, fixed header with Flexbox nav, hero section with centered text, 3-column card grid (image, title, price, button) using CSS Grid, and footer. Cards must have hover effect (translateY + box-shadow). No JavaScript, no frameworks.' }
    },

    { week: 3, title: 'Responsive Design & Animations', timeRange: '12–14 hrs',
      days: [
        d(15, 'Media Queries & Mobile-First Design', 'Make your websites work on all screen sizes.',
          'Mobile-first: write base CSS for mobile, then use @media (min-width: 768px) for larger screens. Breakpoints: 480px (small mobile), 768px (tablet), 1024px (laptop), 1280px (desktop). min-width is mobile-first; max-width is desktop-first. Common pattern: stack vertically on mobile, side-by-side on desktop.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+media+queries+responsive+design+tutorial', label: 'Media Queries & Responsive Design' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design', label: 'MDN: Responsive Design' }],
          'Take your card grid from Week 2 and add 3 breakpoints: mobile (1 col), tablet (2 col), desktop (3 col).',
          'Make your portfolio fully responsive: single column on mobile, 2-col on tablet, 3-col projects grid on desktop. Hide nav links on mobile and show a hamburger menu icon.', '2 hrs'),

        d(16, 'Viewport Units, Min/Max & clamp()', 'Use modern CSS sizing techniques.',
          'Viewport units: vw (viewport width), vh (viewport height), vmin, vmax. Full-screen hero: height: 100vh. min(), max(), clamp() for fluid sizing without breakpoints. clamp(min, preferred, max): clamp(1rem, 2.5vw, 2rem) makes text scale smoothly. Use clamp for responsive font-sizes — one line replaces multiple media queries.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+clamp+viewport+units+tutorial', label: 'CSS clamp() & Viewport Units' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp', label: 'MDN: clamp()' }],
          'Create a full-viewport hero with 100vh. Add clamp() to your h1 so it scales between 1.5rem and 3rem.',
          'Redesign your portfolio hero: 100vh height, clamp() for all font sizes (so they scale with viewport), max-width: 1200px centered content. The section should look great from 320px to 1600px without any media queries.', '2 hrs'),

        d(17, 'CSS Transitions & Hover Effects', 'Add smooth transitions and interactive hover states.',
          'transition: property duration easing. Easing functions: ease, linear, ease-in, ease-out, ease-in-out. Common transitions: opacity, transform, background-color, box-shadow, border-color. transition: all 0.3s ease is a quick shortcut. Multiple transitions: comma-separate them. Always transition specific properties for performance.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+transitions+hover+effects+tutorial', label: 'CSS Transitions & Hover Effects' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions', label: 'MDN: CSS Transitions' }],
          'Add hover effects to 5 elements: a button (scale), a card (lift), a link (color shift), an image (opacity), a nav item (underline slide).',
          'Build an "Interactive Components Library": 5 buttons with different hover effects, image card with zoom-on-hover overlay, navigation links with animated underline, and a "ghost" button that fills on hover — all with smooth transitions.', '2 hrs'),

        d(18, 'CSS Animations & Keyframes', 'Create complex CSS animations with @keyframes.',
          '@keyframes defines animation steps. animation: name duration easing delay iteration direction. Values: forwards (keeps end state), infinite (loops), alternate (ping-pong). Transform functions: rotate(), scale(), translateX(), translateY(), skew(). Animate multiple properties simultaneously for complex effects.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+animations+keyframes+tutorial+2024', label: 'CSS Animations & Keyframes' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations', label: 'MDN: CSS Animations' }],
          'Create: spinning loader, pulsing button, bouncing ball, fade-in hero text.',
          'Build a "Loading Screen": animated gradient background that shifts colors, spinning CSS-only loader, "Loading..." text that fades in and out, and a progress bar that fills from 0 to 100%. All CSS animations, no JavaScript.', '2 hrs'),

        d(19, 'CSS Custom Properties & Theming', 'Build a dark/light theme toggle with CSS variables.',
          'CSS Custom Properties (variables) are live, cascade-aware, and work with JavaScript. Define on :root {}. Override in specific selectors. data-theme="dark" on html element: html[data-theme="dark"] { --bg: #000 }. Transitions on variables make theme switching smooth. This pattern powers every modern theming system.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+custom+properties+dark+mode+tutorial', label: 'CSS Variables Dark Mode' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties', label: 'MDN: CSS Custom Properties' }],
          'Define a full CSS variable palette. Add data-theme="dark" to html and override all variables. Add body { transition: background 0.3s }.',
          'Add dark/light mode to your portfolio: define all colors as CSS variables, create dark theme overrides, add a 🌙/☀️ toggle button that uses JavaScript to switch data-theme attribute. Everything should transition smoothly.', '1.5–2 hrs'),

        d(20, 'Pseudo-classes & Pseudo-elements', 'Master :hover, :focus, ::before, ::after and more.',
          'Pseudo-classes select elements in states: :hover, :focus, :active, :nth-child(n), :first-child, :last-child, :not(), :is(), :where(). Pseudo-elements style parts of elements: ::before and ::after inject content before/after (need content: ""). ::placeholder, ::selection, ::first-line, ::first-letter. These unlock creative possibilities without extra HTML.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+pseudo-classes+pseudo-elements+tutorial', label: 'Pseudo-classes & Pseudo-elements' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements', label: 'MDN: Pseudo-classes' }],
          'Style form inputs with :focus. Use :nth-child to zebra-stripe a table. Add ::before decorators to headings.',
          'Refactor your portfolio: use :focus-visible on all interactive elements (accessibility!), :nth-child to alternate project card bg colors, ::before decorative lines on section headings, ::after arrow on CTA button, ::placeholder styled on contact form.', '2 hrs'),

        d(21, 'Week 3 Project — Responsive Landing Page', 'Build a fully responsive animated landing page.',
          'Combine all of Week 3: mobile-first responsive layout, viewport units, smooth transitions, CSS animations, dark mode, and advanced selectors. A landing page is the most common frontend project in industry.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=responsive+landing+page+CSS+project+2024', label: 'Responsive Landing Page Project' },
           { type: 'web', url: 'https://www.frontendmentor.io/challenges', label: 'Frontend Mentor Challenges' }],
          'Start with mobile. Add content sections one at a time, then make each responsive.',
          '🚀 PROJECT: Build a "SaaS Product Landing Page": (1) Animated gradient hero with clamp() headings, (2) Responsive 3-feature section (stacks on mobile, row on desktop), (3) Pricing table (3 plans), (4) FAQ accordion (CSS-only using :target or details/summary), (5) Contact section, (6) Dark mode toggle.', '3 hrs'),
      ],
      project: { id: 'bfw3', title: 'Animated Landing Page', desc: 'Build a fully responsive, animated product landing page. Requirements: CSS-only hamburger menu (checkbox hack), animated hero with gradient text, CSS keyframe animations for feature icons, responsive 3-column feature grid (1-col mobile, 3-col desktop), dark/light toggle with CSS variables, and smooth hover transitions throughout. No JavaScript allowed (except the 3-line theme toggle script).' }
    },

    { week: 4, title: 'JavaScript Foundations for the Web', timeRange: '14–16 hrs',
      days: [
        d(22, 'JS & the Browser — DOM Basics', 'Connect JavaScript to your HTML and manipulate elements.',
          'The DOM (Document Object Model) is a tree representation of your HTML. JavaScript can read and modify it. document.querySelector("#id") selects elements. element.textContent changes text. element.style.color changes style. element.classList.add/remove/toggle handles CSS classes. Events: element.addEventListener("click", fn).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+DOM+manipulation+beginners+2024', label: 'JavaScript DOM Manipulation' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents', label: 'MDN: DOM Manipulation' }],
          'Select h1 and change its text. Select all buttons and loop through them. Add click event to a div.',
          'Build "DOM Inspector": page with title, counter (0), and 3 buttons. Click + increments counter, Click - decrements, Click Reset sets to 0. Counter turns red below 0, green above 0, white at 0.', '2 hrs'),

        d(23, 'Events Deep Dive — Click, Input, Keyboard', 'Handle all types of browser events.',
          'Event types: click, dblclick, mouseover, mouseout, keydown, keyup, input, change, submit, scroll, resize. event object holds details: event.target (element), event.key (keyboard key), event.preventDefault() (stop default). Event delegation: one listener on parent handles all children. Bubbling: events travel up the DOM.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+events+addEventListener+tutorial', label: 'JavaScript Events Tutorial' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events', label: 'MDN: Introduction to Events' }],
          'Log every keydown to console. Build a "press Enter to submit" input. Use event delegation on a ul to detect which li was clicked.',
          'Build a "Keyboard Tracker": shows what key was pressed (key name, code), a live character counter on a textarea, and a "click the right box" game where clicking a random colored box scores points.', '2 hrs'),

        d(24, 'Creating & Modifying DOM Elements', 'Dynamically create and inject HTML with JavaScript.',
          'createElement, appendChild, insertBefore, prepend, append, remove. innerHTML (fast but risky with user input — XSS). textContent (safe). cloneNode(true) copies an element. template literals make building HTML strings clean. Always sanitize user input before inserting into DOM.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+createElement+appendChild+DOM', label: 'Creating DOM Elements JS' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement', label: 'MDN: createElement' }],
          'Dynamically create a list of 5 items from an array. Add a "Remove" button to each that deletes it.',
          'Build a "Dynamic Task Board": input + Add button. Each task appears as a card with title, timestamp, and Delete button. Tasks persist in an array. Show total count. Empty state message when no tasks.', '2 hrs'),

        d(25, 'Forms, Validation & Local Storage', 'Handle form submissions and persist data.',
          'form.addEventListener("submit", e => { e.preventDefault() }) intercepts submission. Input validation: check value.trim(), use regex for email/phone. localStorage.setItem(key, JSON.stringify(data)) persists between sessions. localStorage.getItem returns string — always JSON.parse. sessionStorage clears when tab closes.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+form+validation+localStorage+tutorial', label: 'JS Forms & LocalStorage' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage', label: 'MDN: localStorage' }],
          'Validate an email form with JS: show errors in red below fields. Save form data to localStorage. Load it back on page refresh.',
          'Build a "Contacts App": add contact form (name, email, phone) with JS validation (all fields required, email format, phone digits only). Save contacts to localStorage. Display contact cards. Add delete button. Data persists on page reload.', '2.5 hrs'),

        d(26, 'Fetch API — Loading Real Data', 'Make HTTP requests and display API data.',
          'fetch(url) returns a Promise. .then(res => res.json()) parses JSON. async/await makes this cleaner. Always handle errors with try/catch or .catch(). Show loading state while fetching. Free public APIs: JSONPlaceholder, Open-Meteo (weather), REST Countries, DeckOfCards API.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+fetch+API+async+await+tutorial', label: 'Fetch API & Async/Await' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch', label: 'MDN: Using Fetch' }],
          'Fetch data from JSONPlaceholder /posts. Display 10 posts as cards. Show loading spinner while fetching.',
          'Build a "Country Explorer": search input + button. Fetch from restcountries.com API, display flag, name, capital, population, region, currencies in a card. Show error if country not found. Handle loading state.', '2 hrs'),

        d(27, 'Week 4 Mini Project — To-Do App', 'Build a complete interactive to-do application.',
          'Combines all of Week 4: DOM manipulation, events, dynamic elements, form validation, localStorage. A to-do app is a rite of passage for every frontend developer and covers every core interaction pattern.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+todo+app+project+beginners+2024', label: 'JS To-Do App Project' },
           { type: 'web', url: 'https://www.theodinproject.com/lessons/node-path-javascript-todo-list', label: 'The Odin Project: To-Do' }],
          'Start with add/display tasks. Then add delete. Then complete toggle. Then localStorage. Then filters.',
          '🚀 PROJECT: To-Do App: (1) Add tasks with priority (High/Medium/Low), (2) Mark complete with strikethrough, (3) Delete tasks, (4) Filter: All / Active / Completed, (5) Count remaining tasks, (6) Clear completed button, (7) Persist all to localStorage, (8) Empty state message.', '3 hrs'),
      ],
      project: { id: 'bfw4', title: 'Weather Dashboard', desc: 'Build a weather app using the Open-Meteo API (free, no key needed). Features: city search with autocomplete using GeoDB Cities API, current weather (temp, wind, humidity, weather code icon), 7-day forecast cards, unit toggle (Celsius/Fahrenheit), localStorage for last 5 searches, and loading/error states. Style with pure CSS — no frameworks.' }
    },

    { week: 5, title: 'Projects & Portfolio Polish', timeRange: '12–14 hrs',
      days: [
        d(28, 'CSS Architecture — BEM & Organization', 'Organize CSS professionally with BEM naming.',
          'BEM: Block__Element--Modifier. .card (block), .card__title (element), .card--featured (modifier). Keeps CSS scalable and readable. Organize files: reset.css, variables.css, components.css, layout.css. Avoid over-specificity — a rule in 2 classes is already complex. Use low-specificity selectors.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+BEM+methodology+tutorial', label: 'CSS BEM Methodology' },
           { type: 'web', url: 'https://getbem.com/introduction/', label: 'BEM Official Docs' }],
          'Refactor a component to use strict BEM naming. Move all classes in HTML to follow BEM.',
          'Refactor your portfolio CSS using BEM for all components (nav, hero, card, form). Split styles into 4 organized files. Document CSS variables at top of file.', '2 hrs'),

        d(29, 'JavaScript — Array Methods for UI', 'Use map, filter, reduce, and sort to build dynamic UIs.',
          'Array methods return new arrays — no mutation. map() transforms: items.map(i => <li>${i}</li>). filter() selects. find() gets one. sort() needs a comparator. reduce() aggregates. These are the workhorses of rendering lists in every framework. Chain them: items.filter(active).sort(byDate).map(render).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+array+methods+map+filter+reduce+UI', label: 'Array Methods for UI' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', label: 'MDN: Array Methods' }],
          'Build a searchable, filterable list of 20 products using filter and map. Sort by price asc/desc.',
          'Build a "Product Catalogue": 12 products array (name, category, price, rating). Implement: search by name, filter by category (radio), sort by price or rating, display count of results. All dynamic with array methods.', '2 hrs'),

        d(30, 'Debugging & Browser DevTools', 'Master Chrome DevTools for efficient debugging.',
          'Elements panel: inspect DOM, modify styles live, toggle classes. Console: console.log, console.table, console.error. Sources: set breakpoints, step through code, inspect variables. Network: see API calls, response data, loading time. Performance: identify slow rendering. DevTools is every developer\'s most used tool.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Chrome+DevTools+tutorial+2024+web+developer', label: 'Chrome DevTools Mastery' },
           { type: 'web', url: 'https://developer.chrome.com/docs/devtools/', label: 'Chrome DevTools Docs' }],
          'Inspect your portfolio in DevTools. Find an element and modify its CSS live. Set a console.log breakpoint. View a network request.',
          'Debug a broken webpage (find 3 intentional bugs using only DevTools): style not applying (specificity issue), JS error (undefined variable), and API call failing (wrong URL). Document your findings.', '1.5 hrs'),

        d(31, 'Git & Version Control Basics', 'Learn Git to track and share your projects.',
          'Git tracks changes in your code over time. Core commands: git init, git add ., git commit -m "message", git status, git log. Branches: git checkout -b feature-name. Merge: git merge branch-name. GitHub: remote repository. Push: git push origin main. Clone: git clone URL. Every project should be version controlled from day 1.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Git+GitHub+tutorial+beginners+2024', label: 'Git & GitHub for Beginners' },
           { type: 'web', url: 'https://docs.github.com/en/get-started', label: 'GitHub: Getting Started' }],
          'Run git init on a project. Make 3 commits. Create a branch. Merge it back to main.',
          'Push your portfolio to GitHub: init repo, add all files, make meaningful commits (one per section), push to GitHub, and enable GitHub Pages to make it live at username.github.io/portfolio.', '2 hrs'),

        d(32, 'Accessibility (a11y) Fundamentals', 'Build websites everyone can use.',
          'a11y affects 1 in 4 people. Key rules: alt text on all images, label every form input, use semantic HTML (the most important a11y step!), ensure color contrast ratio ≥ 4.5:1, never rely on color alone. ARIA: aria-label, aria-hidden, role. Tab order should make sense. Test with keyboard-only navigation.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=web+accessibility+a11y+tutorial+beginners', label: 'Web Accessibility Tutorial' },
           { type: 'web', url: 'https://www.w3.org/WAI/fundamentals/accessibility-intro/', label: 'W3C: Accessibility Intro' }],
          'Audit your portfolio with Chrome Lighthouse (Accessibility score). Fix all issues flagged.',
          'Audit your portfolio: (1) Run Lighthouse → fix all issues until score ≥ 90, (2) Navigate entire site keyboard-only (Tab, Enter, Space), (3) Check color contrast with DevTools, (4) Add aria-labels to all icon buttons.', '1.5 hrs'),

        d(33, 'Performance & Image Optimization', 'Make websites load fast.',
          'Page speed directly affects conversions and SEO. Image optimization: use WebP format, compress with TinyPNG, use srcset for responsive images, add loading="lazy". Minify CSS/JS. Use Google Fonts with display=swap. Measure with Lighthouse. Core Web Vitals: LCP (load), FID (interaction), CLS (layout shift).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=web+performance+optimization+tutorial+2024', label: 'Web Performance Optimization' },
           { type: 'web', url: 'https://web.dev/performance/', label: 'web.dev: Performance' }],
          'Run Lighthouse on your portfolio. Check Performance score. Convert an image to WebP and compare file size.',
          'Optimize your portfolio for performance: convert images to WebP, add lazy loading, add font-display: swap, check Lighthouse Performance score, and document before/after scores.', '1.5–2 hrs'),

        d(34, 'Week 5 Project — Pixel-Perfect Redesign', 'Recreate a real website design as a code challenge.',
          'Pixel-perfect implementation is a key skill for frontend developers working with designers. Pick any site from Dribbble/Behance and implement it as static HTML/CSS/JS. Focus on matching spacing, typography, colors, and responsive behavior.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML+CSS+design+challenge+pixel+perfect', label: 'Pixel-Perfect CSS Challenge' },
           { type: 'web', url: 'https://www.frontendmentor.io/challenges', label: 'Frontend Mentor (free challenges)' }],
          'Choose a free challenge from frontendmentor.io. Read the design brief. Set up your files. Work through it section by section.',
          '🚀 PROJECT: Complete 2 Frontend Mentor challenges (choose free ones): implement pixel-perfect HTML/CSS matching their design screenshots, make them fully responsive, and submit solutions on GitHub with a README.', '3–4 hrs'),
      ],
      project: { id: 'bfw5', title: 'Portfolio Launch on GitHub Pages', desc: 'Polish and deploy your complete portfolio. Requirements: all 5 sections (Hero, About, Projects with 3 real thumbnails, Skills, Contact), fully responsive (320px to 1440px), dark mode toggle, working contact form (use Formspree for backend), 90+ Lighthouse scores in all 4 categories, and live at GitHub Pages URL. Write a README with screenshot and technology list.' }
    },

    { week: 6, title: 'JavaScript DOM Projects & Review', timeRange: '10–12 hrs',
      days: [
        d(35, 'Image Slider & Modal Components', 'Build reusable UI components from scratch.',
          'Component thinking: every repeated UI pattern becomes a reusable module. Image slider: array of images, currentIndex, prev/next buttons, auto-play with setInterval. Modal: overlay div, show/hide with classList, click outside to close, keyboard Escape to close. These patterns appear in every website.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+image+slider+modal+tutorial', label: 'JS Slider & Modal Tutorial' },
           { type: 'web', url: 'https://css-tricks.com/considerations-styling-modal/', label: 'CSS-Tricks: Styling Modals' }],
          'Build an image slider with 5 images, prev/next, and auto-play. Build a modal with open/close.',
          'Build a "Component Library": (1) Auto-playing image slider with dots indicator and pause-on-hover, (2) Modal with overlay, close button, keyboard Escape support, (3) Accordion (multiple open), (4) Tabs component.', '2.5 hrs'),

        d(36, 'Scroll Animations & IntersectionObserver', 'Animate elements when they scroll into view.',
          'IntersectionObserver watches elements entering/leaving viewport — much better than scroll event (no jank). new IntersectionObserver(callback, {threshold: 0.1}) fires when 10% of element is visible. Add class to trigger CSS animation. Popular pattern: elements start invisible/shifted, animate in when scrolled to.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=IntersectionObserver+scroll+animations+JavaScript', label: 'IntersectionObserver Tutorial' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API', label: 'MDN: IntersectionObserver' }],
          'Add reveal animations to 5 sections of your portfolio using IntersectionObserver.',
          'Add scroll-triggered animations to your portfolio: sections fade-in from bottom, feature items stagger-reveal left-to-right, counter numbers animate from 0 when they scroll into view.', '2 hrs'),

        d(37, 'Build a JS Quiz App', 'Build a full quiz application with timer and scoring.',
          'Quiz app pattern: questions array with question, options, correctIndex. Render current question. Handle answer: highlight correct/wrong. Track score. Timer with setInterval. Results screen with percentage and review. This project tests: array manipulation, DOM updates, timers, state management.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+quiz+app+project+2024', label: 'JS Quiz App Project' },
           { type: 'web', url: 'https://www.youtube.com/results?search_query=quiz+app+javascript+localStorage', label: 'Quiz App with LocalStorage' }],
          'Build a 5-question quiz, display score at end.',
          '🚀 Build a complete quiz app: 10 questions (your choice of topic), 4 options each, countdown timer per question, score tracking, progress bar, results summary with correct answers review, and high-score saved to localStorage.', '3 hrs'),

        d(38, 'Drag & Drop Interface', 'Build a drag-and-drop Kanban board.',
          'HTML5 Drag & Drop API: draggable="true", dragstart, dragover (preventDefault), drop events. event.dataTransfer.setData stores dragged item ID. Move elements between containers using appendChild. This pattern is used in Trello, Jira, Asana — understanding it shows serious frontend skill.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+drag+drop+kanban+board+tutorial', label: 'JS Drag & Drop Kanban' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API', label: 'MDN: Drag & Drop API' }],
          'Make 5 divs draggable between 2 columns.',
          '🚀 Build a Kanban Board: 3 columns (To Do, In Progress, Done). Add task cards with text. Drag cards between columns. Add new cards with a form. Delete cards. Persist board state to localStorage.', '2.5 hrs'),

        d(39, 'Canvas API — Drawing with JavaScript', 'Draw 2D graphics with the HTML5 Canvas.',
          'canvas.getContext("2d") returns drawing context. Fill shapes: fillRect, arc. Stroke shapes: strokeRect, beginPath/stroke. Draw images: drawImage. Text: fillText. Animation: requestAnimationFrame for smooth 60fps loops. clearRect clears the canvas each frame. Canvas is used for charts, games, and data visualizations.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML5+Canvas+tutorial+beginners+JavaScript', label: 'HTML5 Canvas Tutorial' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial', label: 'MDN: Canvas Tutorial' }],
          'Draw 5 shapes (rect, circle, line, triangle, text) on canvas. Animate a moving ball.',
          'Build a "Drawing Board": click-drag to draw freehand, color picker, brush size slider, eraser tool, clear button. Bonus: save drawing as PNG with canvas.toDataURL().', '2 hrs'),

        d(40, 'Build a Memory Card Game', 'Build a complete interactive card matching game.',
          'Memory game teaches: array shuffling (Fisher-Yates), state management (flipped cards, matched pairs), timing with setTimeout, win condition detection. Build incrementally: display grid → flip cards → check match → track score → win screen.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+memory+card+game+project+tutorial', label: 'Memory Game JS Project' },
           { type: 'web', url: 'https://marina-ferreira.github.io/tutorials/js/memory-game/', label: 'Memory Game Tutorial Guide' }],
          'Create 4 pairs of cards. Implement flip animation. Detect match. Show win screen.',
          '🚀 PROJECT: Memory Card Game: (1) 8 pairs of emoji cards, (2) CSS 3D flip animation, (3) Shuffle on start, (4) Match detection (matched cards stay flipped), (5) Move counter, (6) Timer, (7) Win screen with stats, (8) Difficulty modes (4x4, 6x6 grids).', '3 hrs'),

        d(41, 'Week 6 Review & Polish', 'Review everything, fix weak spots, polish all projects.',
          'Review the 6 weeks: HTML semantics, CSS layout (Flexbox/Grid), responsive design, animations, JavaScript DOM, events, fetch, localStorage. Identify your weakest area and spend extra time there. Polish your portfolio — this is what employers will see.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=frontend+developer+review+checklist+2024', label: 'Frontend Developer Review' },
           { type: 'web', url: 'https://roadmap.sh/frontend', label: 'roadmap.sh: Frontend Roadmap' }],
          'List 3 topics you feel uncertain about. Review those first. Then make sure all your projects are on GitHub.',
          'Final Review Sprint: (1) Audit your portfolio for broken links, responsive issues, a11y problems, (2) Add a README to every GitHub project, (3) Write 5 things you\'d do differently if you started over, (4) Plan your next 30 days of learning.', '2 hrs'),
      ],
      project: { id: 'bfw6', title: 'Final Project: Interactive Dashboard', desc: 'Build a personal learning dashboard that combines everything: HTML5 semantic structure, CSS Grid + Flexbox layout with dark mode, JS for: a live clock, weather widget (Open-Meteo API), to-do checklist with localStorage, study timer (pomodoro-style), and a quiz widget with 5 questions. Fully responsive. Deployed on GitHub Pages. Lighthouse scores 90+ across all 4 categories.' }
    },

  ]
};

// ─── INTERMEDIATE (60 Days) ──────────────────────────────────────────────────
const intermediate = {
  label: '🟡 Intermediate', days: 60, totalHours: 120, goal: 'React + State + APIs',
  weeks: [

    { week: 1, title: 'Modern JavaScript — ES6+ Essentials', timeRange: '12–14 hrs',
      days: [
        d(1, 'Destructuring, Spread & Rest', 'Master modern JS syntax used everywhere in React.',
          'Destructuring arrays: const [a, b] = arr. Destructuring objects: const {name, age} = person — can rename: const {name: myName} = person. Default values: const {age = 18} = {}. Spread: [...arr1, ...arr2] merges arrays; {...obj1, ...obj2} merges objects. Rest: function(...args) collects remaining. These appear in every modern React codebase.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+ES6+destructuring+spread+rest', label: 'ES6+ Destructuring & Spread' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment', label: 'MDN: Destructuring' }],
          'Destructure a user object from an API response. Use spread to merge two state objects.',
          'Refactor a function that takes an old-style config object to use destructuring with defaults, spread for partial updates, and rest for unknown keys. Practice with real-world API response shapes.', '2 hrs'),

        d(2, 'Promises, Async/Await & Error Handling', 'Write clean async code without callback hell.',
          'Promise states: pending → fulfilled/rejected. Promise.all([p1, p2]) runs in parallel. Promise.allSettled gets all results regardless of failure. async function always returns a Promise. await pauses until resolved. try/catch handles rejections. Always handle errors — unhandled rejections crash Node apps.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+promises+async+await+tutorial+2024', label: 'Promises & Async/Await' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises', label: 'MDN: Using Promises' }],
          'Chain 3 API calls with async/await. Use Promise.all to fetch 3 endpoints in parallel.',
          'Build a "Multi-Source Dashboard": fetch from 3 APIs simultaneously (weather, news headlines, joke) using Promise.all. Show loading for all, display all results, handle any individual failure gracefully.', '2 hrs'),

        d(3, 'Modules — Import, Export & JS Tooling', 'Organize code into modules and use npm.',
          'ES Modules: export const fn = () => {} or export default fn. import {fn} from "./file.js" or import fn from "./file.js". Named exports (multiple) vs default export (one). Node.js modules use require/module.exports (CommonJS). npm: package.json, node_modules, npm install, scripts. Use a local dev server with live reload.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+ES6+modules+import+export+tutorial', label: 'ES6 Modules Tutorial' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules', label: 'MDN: JavaScript Modules' }],
          'Split a monolithic JS file into 3 modules: utils.js, api.js, render.js. Import them into main.js.',
          'Refactor your To-Do App into modules: data.js (localStorage ops), ui.js (DOM rendering), events.js (event listeners), api.js (if using any). Use a bundler (Parcel — zero config) to bundle them.', '2 hrs'),

        d(4, 'Classes, Prototypes & "this"', 'Understand OOP in JavaScript.',
          'class is syntax sugar over prototypes. constructor initializes properties. Methods on prototype (not instance) save memory. extends for inheritance, super() calls parent constructor. "this" context: in class method, this = instance. Arrow functions capture "this" from surrounding scope — crucial for event handlers in classes.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+classes+prototype+this+tutorial', label: 'JS Classes & Prototypes' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', label: 'MDN: JavaScript Classes' }],
          'Create a Rectangle class with area() method. Extend it to Square. Use "this" in an event handler.',
          'Build a "Game Character System": base Character class (name, hp, attack()), Warrior extends Character (armor, shieldBash()), Mage extends Character (mana, castSpell()). Create 2 of each, simulate a battle.', '2 hrs'),

        d(5, 'Closures, Higher-Order Functions & Functional JS', 'Think functionally — write cleaner code.',
          'Closure: inner function remembers outer function\'s variables even after outer returns. Uses: private state, factory functions, memoization. HOF: functions that take/return functions. Functional principles: pure functions (no side effects), immutability, composition. These are deeply used in React hooks internals.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+closures+higher+order+functions+functional', label: 'Closures & Functional JS' },
           { type: 'web', url: 'https://javascript.info/closure', label: 'JavaScript.info: Closures' }],
          'Write memoize(fn) that caches results. Write compose(f,g) that returns f(g(x)).',
          'Build a "Functional Utility Library": memoize(), curry(), compose(), pipe(), debounce(), throttle(). Test each with console demonstrations. These are used daily in professional code.', '2 hrs'),

        d(6, 'Regular Expressions & String Processing', 'Handle text processing professionally.',
          'Regex patterns: \\d (digit), \\w (word char), \\s (space), . (any), * (0+), + (1+), ? (0 or 1), ^ (start), $ (end), [] (character class). Methods: test(), match(), replace(), matchAll(). Flags: g (global), i (case-insensitive), m (multiline). Common patterns: email, phone, URL, password strength.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+regular+expressions+tutorial+practical', label: 'JavaScript RegEx Tutorial' },
           { type: 'web', url: 'https://regexr.com/', label: 'RegExr: Learn & Test Regex' }],
          'Validate email with regex. Extract all hashtags from a tweet. Replace all phone numbers in text with "HIDDEN".',
          'Build a "Form Validator Library": validate email (RFC format), phone (10 digits, optional country code), URL (http/https), password (min 8, uppercase, number, special char), credit card (Luhn algorithm).', '2 hrs'),

        d(7, 'Week 1 Project — Advanced JS Utilities', 'Build a real-world JS utility showcase.',
          'Apply ES6+, async/await, modules, closures, and regex in one cohesive project. Professional developers combine these tools naturally — this week bridges beginner JS to React-ready JS.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+advanced+project+tutorial+2024', label: 'Advanced JS Project' },
           { type: 'web', url: 'https://javascript30.com/', label: 'JavaScript30 (30 Projects)' }],
          'Plan what features you\'ll build first. Use modules from day 1.',
          '🚀 PROJECT: "JS Swiss Army Knife" — a web app with 6 utility tools: (1) Password Generator (regex + closures), (2) Email/Phone validator, (3) Color scheme generator (HSL math), (4) Text diff highlighter, (5) CSV to HTML Table converter, (6) Markdown-to-HTML converter.', '3 hrs'),
      ],
      project: { id: 'ifw1', title: 'Real-Time Search App', desc: 'Build a real-time search app using async/await + Fetch: connect to Wikipedia API (en.wikipedia.org/api/rest_v1/page/summary/{title}). Features: debounced search input (300ms, using closures), async fetch with loading/error states, display results as cards (title, description, thumbnail), search history (last 10 queries in localStorage using a closure-based cache), and keyboard navigation through results.' }
    },

    { week: 2, title: 'React — Component Thinking', timeRange: '14–16 hrs',
      days: [
        d(8, 'React Setup & First Component', 'Set up a React project and understand JSX.',
          'React uses JSX — JavaScript that looks like HTML. Create React App (create-react-app) or Vite (faster, modern). Every React app has a root component rendered into <div id="root">. JSX rules: className not class, htmlFor not for, all tags must close, only one root element (use <> Fragment). Props pass data down from parent to child.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+beginners+tutorial+2024+Vite', label: 'React + Vite Setup Tutorial' },
           { type: 'web', url: 'https://react.dev/learn', label: 'React Official Docs' }],
          'Create a Vite React app. Build 3 components: Header, Card, Footer. Pass props to Card.',
          'Build a "Profile Card" React app: 3 components (App, ProfileCard, Badge). Pass name, bio, skills array, and online status as props. Render a skills list and different Badge component based on status.', '2 hrs'),

        d(9, 'useState — Managing Component State', 'Add interactivity with React useState hook.',
          'useState(initialValue) returns [value, setter]. Call setter to update and re-render. Never mutate state directly — always use the setter. For objects: spread and update: setUser({...user, name: "new"}). For arrays: use map/filter, never push. Multiple state variables are fine — use one per concern.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+useState+hook+tutorial+2024', label: 'React useState Tutorial' },
           { type: 'web', url: 'https://react.dev/reference/react/useState', label: 'React Docs: useState' }],
          'Build a toggle (useState bool), counter, and a controlled input (useState string).',
          'Build a "Shopping Cart": product list with Add/Remove buttons. Cart shows items and total. Quantity controls (increment/decrement). All state in one useState (cart array). Total auto-calculates.', '2.5 hrs'),

        d(10, 'useEffect — Side Effects & Lifecycle', 'Fetch data and sync with external systems.',
          'useEffect(() => { /* side effect */ }, [deps]). Dependencies array: [] runs once on mount, [value] runs when value changes, omitted runs every render. Always return a cleanup function for subscriptions, timers, event listeners. Fetch in useEffect is the most common pattern: show loading state, fetch, set data, handle error.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+useEffect+hook+tutorial+data+fetching', label: 'React useEffect Tutorial' },
           { type: 'web', url: 'https://react.dev/reference/react/useEffect', label: 'React Docs: useEffect' }],
          'Fetch from JSONPlaceholder inside useEffect. Show loading spinner. Cleanup a timer in useEffect.',
          'Build a "Live GitHub Profile": input for GitHub username, useEffect fetches github.com/users/:username API on submit, show avatar, name, repos count, followers. Loading/error states. 5-second auto-refresh with cleanup.', '2.5 hrs'),

        d(11, 'Lists, Keys & Conditional Rendering', 'Render dynamic lists and conditional content.',
          'Map over arrays to render lists: arr.map(item => <Card key={item.id} {...item} />). key must be unique and stable — never use array index as key. Conditional rendering: ternary (condition ? <A/> : <B/>), short-circuit (&& for show-or-nothing), separate variable for complex logic. Early return pattern for loading/error states.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+lists+keys+conditional+rendering+tutorial', label: 'React Lists & Conditional Rendering' },
           { type: 'web', url: 'https://react.dev/learn/rendering-lists', label: 'React Docs: Rendering Lists' }],
          'Render a list of 10 products. Show a "Sold Out" badge for some. Filter with a state variable.',
          'Build a "Movie Catalogue": fetch from OMDB API, render movies as cards, filter by genre (tabs), show/hide plot with a toggle per card, "No results" empty state.', '2 hrs'),

        d(12, 'Forms in React — Controlled Components', 'Handle user input with controlled components.',
          'Controlled: input value tied to state, onChange updates state. Uncontrolled: ref accesses DOM value directly. Controlled is preferred — you control the data. Form submission: onSubmit + e.preventDefault(). Validation: check before setting state or on submit. Complex forms: one state object for all fields.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+forms+controlled+components+tutorial', label: 'React Forms & Controlled Components' },
           { type: 'web', url: 'https://react.dev/learn/reacting-to-input-with-state', label: 'React Docs: Reacting to Input' }],
          'Build a controlled form with 4 fields. Add validation. Show errors below fields.',
          'Build a "Multi-Step Registration Form": 3 steps (personal info, account details, preferences). Next/Back navigation. Validation per step. Progress indicator. Summary review on step 3 before submit.', '2.5 hrs'),

        d(13, 'Component Composition & Props Patterns', 'Build flexible, reusable components.',
          'Composition over inheritance. children prop for content injection. Render props pattern: prop = fn that returns JSX. Component as prop. Slot pattern (named children). Lifting state up: shared state lives in the common ancestor. Props drilling problem introduces Context (next week). Build components as small, single-purpose units.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+component+composition+patterns+tutorial', label: 'React Composition Patterns' },
           { type: 'web', url: 'https://react.dev/learn/passing-props-to-a-component', label: 'React Docs: Props' }],
          'Build a Card component using children. Build a Modal that accepts title and body as props.',
          'Build a "Component Kit": (1) Button (variant: primary/secondary/danger, size, disabled), (2) Modal (children, isOpen, onClose), (3) Tabs (Tab components as children), (4) Toast notification system.', '2 hrs'),

        d(14, 'Week 2 Project — React Todo App', 'Build a full-featured React to-do app.',
          'Combine useState, useEffect, events, forms, lists, and component composition to build a complete to-do app. This is the canonical React learning project — every hook and pattern appears naturally.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+todo+app+project+2024+hooks', label: 'React Todo App Project' },
           { type: 'web', url: 'https://react.dev/learn/thinking-in-react', label: 'React Docs: Thinking in React' }],
          'Plan component tree first: App → TodoInput, FilterBar, TodoList → TodoItem.',
          '🚀 PROJECT: Todo App in React: (1) Add/Delete/Toggle tasks, (2) Filter: All/Active/Done, (3) Priority (High/Med/Low), (4) Due date with overdue highlighting, (5) Drag to reorder (optional), (6) localStorage persistence via useEffect, (7) Task count stats.', '3 hrs'),
      ],
      project: { id: 'ifw2', title: 'React Movie Search App', desc: 'Build a movie search app using the OMDB API (free key at omdbapi.com). Components: SearchBar (controlled input with debounce), MovieGrid (list rendering with keys), MovieCard (poster, title, year, type), MovieModal (full details on click — actors, plot, ratings). State: search query, results, selected movie, loading, error. useEffect for fetching. No Redux — just useState and lifting state up.' }
    },

    { week: 3, title: 'React — Hooks & Context', timeRange: '14–16 hrs',
      days: [
        d(15, 'useContext — Global State Without Redux', 'Share state across components without prop drilling.',
          'Context solves prop drilling (passing props through many levels). createContext() makes a context. Provider wraps components that need access. useContext(MyContext) reads the value. Combine with useState for mutable global state. Common uses: theme, auth, language, shopping cart. Not a replacement for Redux in complex apps.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+useContext+tutorial+2024', label: 'React useContext Tutorial' },
           { type: 'web', url: 'https://react.dev/reference/react/useContext', label: 'React Docs: useContext' }],
          'Create ThemeContext. Provide dark/light value. Consume in 3 different nested components.',
          'Build a "Theme + Auth Context": ThemeContext (dark/light + toggle), AuthContext (user object, login, logout). Both provided at root. NavBar and UserProfile consume both. Login form toggles auth state.', '2.5 hrs'),

        d(16, 'useReducer — Complex State Logic', 'Manage complex state with useReducer.',
          'useReducer(reducer, initialState) returns [state, dispatch]. Reducer: (state, action) => newState. Action: {type: "INCREMENT", payload: 5}. Good when next state depends on previous, multiple sub-values, or complex update logic. switch(action.type) is the classic pattern. Use with Context for "mini-Redux" global state.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+useReducer+hook+tutorial+2024', label: 'React useReducer Tutorial' },
           { type: 'web', url: 'https://react.dev/reference/react/useReducer', label: 'React Docs: useReducer' }],
          'Convert a shopping cart (add, remove, update quantity, clear) from useState to useReducer.',
          'Build a "Shopping Cart with useReducer": actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART, APPLY_DISCOUNT. State: items, total, discount, itemCount. Reducer handles all transitions.', '2.5 hrs'),

        d(17, 'useRef, useMemo & useCallback', 'Optimize with the less-common hooks.',
          'useRef: mutable ref that persists across renders without causing re-render. Uses: accessing DOM nodes, storing previous value, cancelling async. useMemo: memoizes expensive calculations — only recomputes when deps change. useCallback: memoizes functions — prevents child re-renders. Don\'t prematurely optimize — profile first.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+useRef+useMemo+useCallback+tutorial', label: 'React useRef useMemo useCallback' },
           { type: 'web', url: 'https://react.dev/reference/react/useRef', label: 'React Docs: useRef' }],
          'Use useRef to focus an input programmatically. Use useMemo for an expensive list filter.',
          'Optimize a "Heavy List App": 10,000 items, filter input, sort options. useMemo for filtered+sorted list, useCallback for sort handler, useRef to track render count without causing re-renders. Profile before and after with React DevTools.', '2 hrs'),

        d(18, 'Custom Hooks — Reusable Logic', 'Extract and share stateful logic across components.',
          'Custom hooks: functions starting with "use" that call other hooks. Return values for component to use. Common custom hooks: useFetch(url), useLocalStorage(key, initial), useDebounce(value, delay), useWindowSize(), useOnClickOutside(ref, handler). Extract when multiple components share the same stateful logic.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+custom+hooks+tutorial+2024', label: 'React Custom Hooks Tutorial' },
           { type: 'web', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', label: 'React Docs: Custom Hooks' }],
          'Extract fetch logic into useFetch(url) hook. Build useLocalStorage(key, initial).',
          'Build a "Custom Hooks Library": useFetch, useDebounce, useLocalStorage, useWindowSize, useDarkMode, useOnClickOutside. Document each with a demo component showing its usage.', '2.5 hrs'),

        d(19, 'React Router — Multi-Page Apps', 'Build a multi-page React app with React Router.',
          'React Router v6: BrowserRouter wraps app. Routes / Route defines pages. Link replaces <a>. useNavigate() for programmatic nav. useParams() for URL parameters (/user/:id). useSearchParams() for query string (?tab=home). Nested routes for layouts. Protected routes for auth.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Router+v6+tutorial+2024', label: 'React Router v6 Tutorial' },
           { type: 'web', url: 'https://reactrouter.com/en/main/start/overview', label: 'React Router Docs' }],
          'Add React Router to To-Do app: /home, /todos, /profile routes. Add Link navigation. Use useParams for a /todos/:id detail page.',
          'Build a "React Blog App" with routes: / (home, recent posts), /posts (all posts), /posts/:id (post detail + comments), /categories/:slug, /about. Protected /write route that requires login. 404 page.', '2.5 hrs'),

        d(20, 'Styling React — CSS Modules & Styled Components', 'Style React apps professionally.',
          'CSS Modules: import styles from "./Card.module.css". styles.card is locally scoped — no global clashes. Styled-components: const Button = styled.button`background: blue;`. Template literals. Props-based styling: ${props => props.primary ? "blue" : "gray"}. Tailwind CSS: utility classes directly in JSX — most popular in industry today.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+CSS+Modules+styled+components+Tailwind+tutorial', label: 'React Styling Options' },
           { type: 'web', url: 'https://tailwindcss.com/docs/guides/vite', label: 'Tailwind CSS with Vite' }],
          'Install Tailwind in your Vite app. Convert 3 components to use Tailwind utilities.',
          'Rebuild your movie card component 3 ways: plain CSS, CSS Modules, Tailwind. Compare DX. Choose one and apply it to your entire React app consistently.', '2 hrs'),

        d(21, 'Week 3 Project — Reddit-Style Feed', 'Build a social media style feed with React.',
          'Apply all hooks and React Router: fetching Reddit API (reddit.com/r/{sub}.json), listing posts, routing to detail pages, filtering, sorting, and voting UI. This mimics real-world React application architecture.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Reddit+clone+project+tutorial', label: 'React Reddit Feed Project' },
           { type: 'web', url: 'https://www.reddit.com/dev/api/', label: 'Reddit Public API' }],
          'Fetch reddit.com/r/programming.json — it requires no auth. Map posts to cards.',
          '🚀 PROJECT: Reddit Feed App — routes: / (subreddit list), /r/:sub (post feed from Reddit API), /post/:id (detail view). Features: sort (hot/new/top), search, infinite scroll (or Load More). Custom useFetch hook. React Router. Tailwind styling.', '3 hrs'),
      ],
      project: { id: 'ifw3', title: 'E-Commerce Product Page', desc: 'Build a complete product page like Shopify. Components: ImageGallery (main + thumbnails, click to change), ProductInfo (name, price, ratings, description), SizeSelector (controlled), ColorPicker, QuantitySelector, CartButton. Global CartContext (useContext + useReducer) shared with mini cart in header. React Router for /product/:id. Tailwind CSS. Fetch product data from FakeStore API.' }
    },

    { week: 4, title: 'APIs, State Management & Performance', timeRange: '14–16 hrs',
      days: [
        d(22, 'REST APIs — Patterns & Best Practices', 'Consume REST APIs like a professional.',
          'HTTP methods: GET (read), POST (create), PUT/PATCH (update), DELETE (remove). Status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error. Headers: Content-Type, Authorization: Bearer {token}. Axios vs Fetch: Axios auto-parses JSON, has interceptors, better error handling.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=REST+API+axios+React+tutorial+2024', label: 'REST APIs & Axios in React' },
           { type: 'web', url: 'https://axios-http.com/docs/intro', label: 'Axios Documentation' }],
          'Use Axios to GET, POST, PUT, DELETE from JSONPlaceholder. Handle each response status.',
          'Build an "API Explorer": CRUD interface for JSONPlaceholder /posts. List all posts, create new, edit in-place, delete with confirmation. Show HTTP status for each operation.', '2 hrs'),

        d(23, 'JWT Auth & Protected Routes', 'Implement authentication in React.',
          'JWT (JSON Web Token): server returns token on login, stored in localStorage or cookie. Send in header: Authorization: Bearer {token}. React auth flow: login → save token → decode payload (user info) → protect routes. AuthContext stores user state. Protected route component: check auth → redirect if not logged in. Logout clears token.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+JWT+authentication+tutorial+2024', label: 'React JWT Auth Tutorial' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication', label: 'MDN: HTTP Authentication' }],
          'Use reqres.in API (free fake auth). Store JWT in localStorage. Create a protected route that redirects to /login if no token.',
          'Build full auth flow: Login page (POST to reqres.in/api/login), store token, decode it (jwt-decode library), show user info on profile page, protect /dashboard route, logout button clears token and redirects.', '2.5 hrs'),

        d(24, 'React Query — Server State Management', 'Use React Query (TanStack Query) for data fetching.',
          'React Query manages server state separately from UI state. useQuery({queryKey, queryFn}) handles fetching, caching, background refetching, loading/error states. useMutation for POST/PUT/DELETE with optimistic updates. queryClient.invalidateQueries refreshes data. Reduces boilerplate significantly vs raw useEffect fetching.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Query+TanStack+tutorial+2024', label: 'React Query Tutorial 2024' },
           { type: 'web', url: 'https://tanstack.com/query/latest/docs/react/overview', label: 'TanStack Query Docs' }],
          'Install @tanstack/react-query. Convert a useEffect fetch to useQuery. Add a useMutation for creating a post.',
          'Rebuild your Reddit Feed App with React Query: useQuery for post lists, infinite scroll with useInfiniteQuery, useMutation for a "Save" feature, cache persistence with persistQueryClient.', '2.5 hrs'),

        d(25, 'Zustand — Lightweight State Management', 'Use Zustand for clean global state.',
          'Zustand: tiny (8kb), no boilerplate, no Provider needed. const useStore = create(set => ({count: 0, increment: () => set(state => ({count: state.count + 1}))}). Use in any component: const count = useStore(state => state.count). Slice pattern for large stores. Persist middleware for localStorage. Simpler than Redux for most apps.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Zustand+React+state+management+tutorial+2024', label: 'Zustand Tutorial 2024' },
           { type: 'web', url: 'https://zustand-demo.pmnd.rs/', label: 'Zustand Docs' }],
          'Install Zustand. Create a cart store (items, total, add, remove, clear). Use in Header (count badge) and ProductPage (add button).',
          'Migrate your E-Commerce app\'s CartContext to Zustand. Split into slices: cartSlice, userSlice, uiSlice. Add persist middleware. Compare the code — Zustand should be 60% less code.', '2 hrs'),

        d(26, 'React Performance Optimization', 'Profile and optimize React app performance.',
          'React DevTools Profiler shows which components render and why. Unnecessary renders: component re-renders when parent renders, even if props didn\'t change. Fix: React.memo wraps component. useCallback on passed functions. useMemo on computed values. Key strategy: measure first, optimize only proven bottlenecks. Premature optimization is the root of all evil.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+performance+optimization+tutorial+2024', label: 'React Performance Optimization' },
           { type: 'web', url: 'https://react.dev/learn/render-and-commit', label: 'React Docs: Render & Commit' }],
          'Open React DevTools. Profile your app clicking around. Find the most-rendering component.',
          'Profile and optimize your largest React project: (1) Identify unnecessary renders with Profiler, (2) Wrap expensive components in React.memo, (3) useCallback on all passed functions, (4) useMemo on computed lists, (5) Code split with React.lazy().', '2 hrs'),

        d(27, 'TypeScript Basics for React', 'Add type safety to React components.',
          'TypeScript adds static typing to JS. Types: string, number, boolean, string[], {name: string}, interface, type. React with TS: functional components: const App: React.FC = () => {}. Props typing: interface Props { name: string; age?: number }. useState<string[]>([]) types state. Props make errors appear in editor, not browser.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=TypeScript+React+tutorial+beginners+2024', label: 'TypeScript React Tutorial' },
           { type: 'web', url: 'https://react.dev/learn/typescript', label: 'React Docs: TypeScript' }],
          'Convert your ProfileCard component to TypeScript. Type all props. Type useState.',
          'Migrate one React project to TypeScript: type all component props with interfaces, type all useState calls, type API response shapes, fix all TypeScript errors. This is the real industry standard.', '2 hrs'),

        d(28, 'Week 4 Project — Full-Stack-Ready React App', 'Build a production-quality React application.',
          'Combines React Router, React Query, Zustand, TypeScript, and proper auth. This is close to what a real React frontend developer builds in their job.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+fullstack+app+project+2024', label: 'React Full App Project' },
           { type: 'web', url: 'https://vitejs.dev/', label: 'Vite Documentation' }],
          'Use Vite + React + TypeScript template. Install React Router, React Query, Zustand.',
          '🚀 PROJECT: "HackerNews Reader" — React Router (routes: /, /item/:id, /user/:id), React Query (fetch HN Algolia API — hn.algolia.com/api/v1), Zustand (saved items, theme), TypeScript (typed responses), lazy code splitting per route.', '4 hrs'),
      ],
      project: { id: 'ifw4', title: 'Full React Dashboard', desc: 'Build a complete dashboard with: Vite + React + TypeScript, React Router (5 pages: Overview, Analytics, Users, Settings, Profile), Recharts (line, bar, pie charts fetching from open APIs), Zustand for theme + user state, React Query for all data fetching, Tailwind CSS, responsive (mobile drawer nav, desktop sidebar), and deploy to Vercel. This is portfolio-grade.' }
    },

    { week: 5, title: 'Next.js & Advanced Frontend', timeRange: '14–16 hrs',
      days: [
        d(29, 'Next.js — React for Production', 'Build with the most popular React framework.',
          'Next.js adds: file-based routing (pages/ or app/ directory), Server-Side Rendering (SSR), Static Site Generation (SSG), API routes, Image optimization, Font optimization, and built-in performance. App Router (Next 13+): Server Components (no useState), Client Components ("use client" directive). getServerSideProps vs getStaticProps vs fetch in Server Components.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+14+tutorial+beginners+2024', label: 'Next.js 14 Tutorial' },
           { type: 'web', url: 'https://nextjs.org/docs', label: 'Next.js Documentation' }],
          'Create a Next.js app. Make 3 pages using App Router. Fetch data in a Server Component.',
          'Build a "News Site" in Next.js: home (SSG, fetched at build time), /article/:slug (SSR), /search (client component with React Query). Use next/image for all images, next/font for typography.', '3 hrs'),

        d(30, 'Next.js API Routes & Deployment', 'Build backend endpoints and deploy to Vercel.',
          'Next.js API routes: /app/api/route/route.ts exports GET, POST handlers. Access request body, query params. Can connect to databases, third-party APIs, or add server-side secrets. Vercel: push to GitHub → auto-deploy. Environment variables in .env.local. Preview deployments for every branch. Vercel Analytics tracks Core Web Vitals.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+API+routes+Vercel+deployment+tutorial', label: 'Next.js API Routes & Vercel' },
           { type: 'web', url: 'https://vercel.com/docs', label: 'Vercel Documentation' }],
          'Create an API route that returns JSON. Deploy a Next.js app to Vercel.',
          '🚀 Build and deploy a full Next.js app: (1) 3+ pages with SSR/SSG, (2) API route that proxies an external API (hiding the key in server), (3) Contact form that calls an API route, (4) Deployed on Vercel with custom domain (free .vercel.app).', '3 hrs'),

        d(31, 'Tailwind CSS — Utility-First Mastery', 'Master Tailwind CSS for production development.',
          'Tailwind utility classes cover every CSS property. Responsive: sm: md: lg: xl: prefixes. Dark mode: dark:. Hover/focus: hover: focus:. Animations: animate-spin, animate-pulse, animate-bounce. Custom values: arbitrary values like w-[432px]. Config: tailwind.config.js extends theme. @apply to extract repeated class lists into components.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Tailwind+CSS+advanced+tutorial+2024', label: 'Advanced Tailwind CSS' },
           { type: 'web', url: 'https://tailwindcss.com/docs', label: 'Tailwind Documentation' }],
          'Rebuild a card component using only Tailwind classes. Add dark: and hover: variants.',
          'Build a complete UI in Tailwind: responsive navbar (hamburger on mobile), hero section, feature cards grid, pricing table, and footer. Dark mode with dark: variant. No custom CSS allowed.', '2 hrs'),

        d(32, 'Animation Libraries — Framer Motion', 'Add professional animations with Framer Motion.',
          'Framer Motion: motion.div, motion.h1 are animated versions of elements. animate prop changes state. initial/animate/exit for mount/unmount. variants for reusable animation states. whileHover, whileTap for interactive. AnimatePresence for exit animations (lists, modals). layout prop for auto-animating layout changes.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Framer+Motion+React+tutorial+2024', label: 'Framer Motion Tutorial' },
           { type: 'web', url: 'https://www.framer.com/motion/', label: 'Framer Motion Docs' }],
          'Add page transition animations. Animate a modal mount/unmount. Add stagger animation to a list.',
          'Rebuild your portfolio with Framer Motion: page transitions, scroll-reveal sections (whileInView), staggered card animations, hover effects on project cards, and an animated hero entrance.', '2 hrs'),

        d(33, 'Testing — React Testing Library', 'Write tests for React components.',
          'React Testing Library (RTL): render component, query DOM (getByText, getByRole, getByTestId), simulate events (userEvent.click), assert with expect().toBe(). Philosophy: test behavior, not implementation. Vitest (with Vite) or Jest as test runner. Priority queries: getByRole > getByLabelText > getByText > getByTestId.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Testing+Library+Vitest+tutorial+2024', label: 'React Testing Tutorial' },
           { type: 'web', url: 'https://testing-library.com/docs/react-testing-library/intro/', label: 'RTL Documentation' }],
          'Write tests for your Todo component: adding an item, deleting an item, filtering.',
          'Test your shopping cart: (1) adds item increases count, (2) remove item works, (3) quantity update works, (4) empty cart shows empty state, (5) total calculates correctly. Aim for 100% of functions covered.', '2 hrs'),

        d(34, 'Build a Full Next.js Blog', 'Build a complete blog with MDX, CMS integration.',
          'MDX combines Markdown with JSX — write blog posts as .mdx files with React components inside. next-mdx-remote or Contentlayer processes MDX. Alternatively, use a headless CMS: Sanity (most popular), Contentful, or Strapi. Fetch posts from CMS API. Deploy with ISR (Incremental Static Regeneration) for updated content without full rebuild.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+blog+MDX+tutorial+2024', label: 'Next.js Blog with MDX' },
           { type: 'web', url: 'https://nextjs.org/learn/dashboard-app', label: 'Next.js Dashboard Tutorial' }],
          'Set up MDX in Next.js. Write 3 blog posts. Create a post listing page and dynamic detail page.',
          '🚀 PROJECT: Launch a real blog: (1) Next.js + MDX, (2) Post listing with title/date/tags, (3) Dynamic /blog/[slug] pages, (4) Syntax highlighting (rehype-highlight), (5) RSS feed API route, (6) SEO meta tags (next/head), (7) Deployed on Vercel.', '3 hrs'),

        d(35, 'Week 5 Project — SaaS Dashboard', 'Build a production-quality SaaS dashboard.',
          'Combines everything: Next.js, React Query, Zustand, Tailwind, Framer Motion, TypeScript, API routes, auth, testing. This is the type of project you put on your resume to get a mid-level frontend job.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+dashboard+full+project+2024', label: 'SaaS Dashboard Tutorial' },
           { type: 'web', url: 'https://ui.shadcn.com/', label: 'shadcn/ui Components' }],
          'Plan your dashboard: what data to show, what charts, what pages. Start with the layout.',
          '🚀 PROJECT: Analytics Dashboard — Next.js 14 App Router, TypeScript, Tailwind, shadcn/ui components, Recharts for line/bar/pie charts (real data from public APIs), sidebar nav, responsive, dark mode, Framer Motion page transitions, and deployed to Vercel.', '4 hrs'),
      ],
      project: { id: 'ifw5', title: 'Next.js SaaS Landing + Dashboard', desc: 'Build a complete SaaS product with Next.js: landing page (/, /pricing, /features) with Framer Motion animations + Tailwind, auth pages (/login, /signup) with NextAuth.js, protected /dashboard with sidebar nav, 4 dashboard pages (Overview with charts, Users table, Settings form, Profile), API routes for data, deployed to Vercel. TypeScript throughout. This is interview-level work.' }
    },

    { week: 6, title: 'Final Projects & Job Readiness', timeRange: '12–14 hrs',
      days: [
        d(36, 'System Design for Frontend', 'Understand how to architect large frontend apps.',
          'Feature-based folder structure: /features/auth, /features/cart, each with components, hooks, api, types, tests. State architecture: server state (React Query) vs client state (Zustand) vs form state (React Hook Form) vs URL state (React Router). Design principles: single responsibility, DRY, separation of concerns. Think in layers: UI → Logic → Data → Network.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+architecture+large+app+design+2024', label: 'React App Architecture' },
           { type: 'web', url: 'https://react.dev/learn/scaling-up-with-reducer-and-context', label: 'React Docs: Scaling Up' }],
          'Sketch a folder structure for a Twitter-clone frontend. Identify what goes in which layer.',
          'Refactor one of your projects into feature-based architecture. Document the folder structure in your README.', '2 hrs'),

        d(37, 'Frontend Security Essentials', 'Secure your frontend applications.',
          'XSS (Cross-Site Scripting): never use innerHTML with user data, use textContent or sanitize with DOMPurify. CSRF: tokens in forms, SameSite cookies. CORS: understand preflight requests. CSP: Content-Security-Policy header. Don\'t store tokens in localStorage (prefer httpOnly cookies). HTTPS everywhere. React already escapes JSX — but dangerouslySetInnerHTML bypasses this.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=frontend+security+XSS+CSRF+web+security+tutorial', label: 'Frontend Security Tutorial' },
           { type: 'web', url: 'https://owasp.org/www-project-top-ten/', label: 'OWASP Top 10' }],
          'Find 3 potential XSS vulnerabilities in your existing projects. Fix them.',
          'Security audit your portfolio/app: (1) CSP header added, (2) All inputs sanitized, (3) No sensitive data in localStorage, (4) HTTPS enforced, (5) Form CSRF protection.', '2 hrs'),

        d(38, 'Build Your GitHub Profile README', 'Craft a developer profile that attracts recruiters.',
          'GitHub profile README is your developer homepage. Add: brief bio, skills icons (shields.io), GitHub stats cards, top languages card, recent projects with screenshots, links to portfolio, LinkedIn, Twitter. Pinned repos should show your best 6 projects. Each repo needs a README with: what it is, screenshot, tech stack, setup instructions.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=GitHub+profile+README+tutorial+2024', label: 'GitHub Profile README Tutorial' },
           { type: 'web', url: 'https://github.com/abhisheknaiidu/awesome-github-profile-readme', label: 'Awesome GitHub READMEs' }],
          'Create or update your GitHub profile README. Write detailed READMEs for your 3 best projects.',
          'Polish GitHub presence: (1) Profile README with skills, projects, contact, (2) 6 pinned repos with screenshots, (3) Each repo has README with live demo link, (4) At least 30 commits visible in last month.', '2 hrs'),

        d(39, 'Technical Interview Prep — Frontend', 'Prepare for frontend developer interviews.',
          'Common questions: How does the DOM work? Event bubbling vs capturing? == vs ===? Promises vs async/await? Virtual DOM? Closure example? Explain "this"? Practical: build a debounce function, implement event emitter, find elements by CSS selector. React: explain reconciliation, when to use useEffect, useState vs useReducer, how does Context work.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=frontend+developer+interview+questions+2024', label: 'Frontend Interview Prep' },
           { type: 'web', url: 'https://www.frontendinterviewhandbook.com/', label: 'Frontend Interview Handbook' }],
          'Practice explaining: virtual DOM, event delegation, closures, and CSS specificity — out loud, to yourself.',
          'Mock interview: spend 15 min on each — (1) explain 5 JS concepts, (2) build debounce function, (3) answer 3 React questions, (4) CSS layout challenge (flexbox or grid), (5) optimize a slow component.', '2 hrs'),

        d(40, 'Freelancing & Getting Your First Job', 'Take your skills to the job market.',
          'Portfolio must have: 3–5 polished projects, live demos, GitHub with commit history. Resume: ATS-friendly, keywords matching job descriptions, quantify impact. Platforms: LinkedIn, Indeed, AngelList. Cold email: find hiring managers directly. Freelance: Upwork, Fiverr, Toptal. Networking: local meetups, Twitter/X, open source contributions.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=how+to+get+first+frontend+developer+job+2024', label: 'How to Get Frontend Dev Job' },
           { type: 'web', url: 'https://www.levels.fyi/', label: 'Levels.fyi: Salary Data' }],
          'Update your LinkedIn with all projects and skills. Write 3 versions of your bio (short, medium, long).',
          'Job Hunt Sprint: (1) Apply to 5 entry-level/junior frontend roles, (2) Update LinkedIn to "Open to work", (3) Reach out to 3 developers in your network, (4) Join 2 developer communities (Discord, Reddit).', '2 hrs'),

        d(41, 'Capstone Project Planning', 'Plan your signature portfolio project.',
          'Your capstone should demonstrate all intermediate skills: React + TypeScript, Next.js or Vite, state management, API integration, auth, testing, responsive design, performance optimization, and deployment. It should solve a real problem you care about. This is the project you talk about in every interview.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Next.js+capstone+project+ideas+2024', label: 'React Capstone Project Ideas' },
           { type: 'web', url: 'https://github.com/florinpop17/app-ideas', label: 'App Ideas Collection' }],
          'Brainstorm 5 project ideas. Evaluate each on: interesting to you, demonstrates skills, can be built in 2–3 weeks.',
          '🚀 Plan and start your capstone: write a project brief (problem, solution, tech stack, pages/features list). Set up repo, boilerplate, basic routing. Aim to complete in the next 2 weeks.', '3 hrs'),
      ],
      project: { id: 'ifw6', title: 'Capstone: Full-Stack React App', desc: 'Build your signature project using everything from this roadmap. Requirements: Next.js 14 with App Router, TypeScript, Tailwind CSS, authentication (NextAuth or Clerk), database (use Supabase free tier or PlanetScale), React Query for data fetching, Zustand for UI state, at least 5 pages, 1 data visualization (Recharts), testing (RTL for 3+ components), CI/CD with GitHub Actions, deployed on Vercel with custom domain. Build something you\'d be proud to show in an interview.' }
    },

  ]
};

// ─── ADVANCED (75 Days) ──────────────────────────────────────────────────────
const advanced = {
  label: '🔴 Advanced', days: 75, totalHours: 150, goal: 'Full-Stack, Performance & Production',
  weeks: [

    { week: 1, title: 'Advanced React Patterns & Architecture', timeRange: '14–16 hrs',
      days: [
        d(1, 'Compound Components Pattern', 'Build flexible component APIs like Radix UI.',
          'Compound components work together sharing implicit state. Example: <Tabs><Tabs.List><Tabs.Tab/></Tabs.List><Tabs.Panel/></Tabs>. Uses React.createContext internally. Consumer components access shared state without explicit props. This is how shadcn/ui, Radix, Headless UI are built. Forces you to think in terms of APIs, not just implementations.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+compound+components+pattern+tutorial', label: 'Compound Components Pattern' },
           { type: 'web', url: 'https://www.patterns.dev/posts/compound-pattern', label: 'Patterns.dev: Compound Pattern' }],
          'Build a Tabs compound component where Tab and TabPanel are sub-components of Tabs.',
          'Build an Accordion compound component: <Accordion><Accordion.Item><Accordion.Header/><Accordion.Panel/></Accordion.Item></Accordion>. Internal Context tracks open items. Support single and multi-open modes.', '3 hrs'),

        d(2, 'Render Props & HOC Patterns', 'Master advanced component reuse patterns.',
          'Render Props: component shares logic by calling a function prop with data. <DataFetcher url={...} render={data => <Card data={data}/>}/>. HOC (Higher-Order Component): function wrapping a component with added behavior. const EnhancedComp = withAuth(MyComp). HOCs receive component, return enhanced component. These are pre-hooks patterns — understanding them is essential for reading older codebases.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+render+props+higher+order+components', label: 'Render Props & HOC' },
           { type: 'web', url: 'https://www.patterns.dev/posts/hoc-pattern', label: 'Patterns.dev: HOC' }],
          'Convert a HOC to a custom hook. Identify where render props are used in a library you use.',
          'Build: (1) withAuth HOC that redirects unauthenticated users, (2) withErrorBoundary HOC, (3) <MousePosition render={({x,y}) => <Tooltip/>}/> using render props, (4) Refactor all to custom hooks and compare.', '2.5 hrs'),

        d(3, 'Error Boundaries & Suspense', 'Handle errors and async loading gracefully.',
          'Error Boundaries: class components (or react-error-boundary library) that catch errors in child tree. Prevent entire app crash. Show fallback UI. logErrorToService in componentDidCatch. React.Suspense: wraps lazy-loaded components and shows fallback while loading. Works with React.lazy(() => import("./Component")). In React 18+: works with data fetching via use() hook.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Error+Boundary+Suspense+tutorial', label: 'Error Boundaries & Suspense' },
           { type: 'web', url: 'https://react.dev/reference/react/Suspense', label: 'React Docs: Suspense' }],
          'Wrap your app in an ErrorBoundary. Lazy-load 3 routes with Suspense.',
          'Production-harden your React app: (1) Global ErrorBoundary with friendly error page, (2) Per-section ErrorBoundaries (sidebar can fail without crashing content), (3) Lazy-load all routes with Suspense loading skeletons, (4) Track errors with console reporting.', '2 hrs'),

        d(4, 'React 18 — Concurrent Features', 'Use React 18\'s latest capabilities.',
          'React 18 concurrent features: useTransition marks non-urgent state updates (keeps UI responsive during heavy renders). useDeferredValue defers an expensive computation. Automatic batching (multiple setState calls batched in event handlers, timeouts, and Promises). startTransition for non-blocking updates. use() hook for Promises (experimental). These power fast, responsive UIs.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+18+concurrent+features+useTransition+2024', label: 'React 18 Concurrent Features' },
           { type: 'web', url: 'https://react.dev/blog/2022/03/29/react-v18', label: 'React 18 Release Blog' }],
          'Add useTransition to a search that filters 10,000 items. Notice the UI stays responsive.',
          'Build a "10K Item Virtualized List" demo: without optimization (laggy), with useDeferredValue on search input (better), with React Window virtualization (fast). Profile all 3 with React DevTools.', '2.5 hrs'),

        d(5, 'State Machines with XState', 'Model complex UI flows with state machines.',
          'State machines eliminate impossible states. XState: createMachine({states: {idle, loading, success, error}}). Transitions: on({SUBMIT: "loading"}). Guards (conditional transitions), Actions (side effects). React: useMachine hook from @xstate/react. Perfect for: multi-step forms, loading states, authentication flows, game logic.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=XState+React+state+machines+tutorial', label: 'XState React Tutorial' },
           { type: 'web', url: 'https://xstate.js.org/docs/', label: 'XState Documentation' }],
          'Model a traffic light with XState (red → green → yellow → red). Implement it in React.',
          'Model and implement a "Form Submission Flow": idle → filling → validating → submitting → success / error. With retry from error state. Visualize it in XState Visualizer.', '2 hrs'),

        d(6, 'Monorepo Architecture with Turborepo', 'Manage multiple related packages in one repo.',
          'Monorepo: multiple packages/apps in one repository. Turborepo orchestrates builds with caching. Structure: /apps (web, mobile, storybook), /packages (ui, utils, config). Shared UI package: components used across apps. pnpm workspaces for package linking. Benefits: shared code, atomic commits, consistent tooling.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Turborepo+monorepo+tutorial+2024', label: 'Turborepo Tutorial' },
           { type: 'web', url: 'https://turbo.build/repo/docs', label: 'Turborepo Documentation' }],
          'Create a Turborepo with 2 apps (web, docs) sharing a UI package.',
          'Set up a Turborepo: /apps/web (Next.js), /packages/ui (shared React components), /packages/utils (shared TypeScript utilities). Share Button and Card components between apps.', '2 hrs'),

        d(7, 'Week 1 Project — Advanced Component Library', 'Build a Storybook-documented component library.',
          'A component library is the pinnacle of reusable frontend development. Use Storybook to document every component with interactive examples. This demonstrates compound components, TypeScript, accessibility, and design system thinking.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Storybook+component+library+2024', label: 'React Storybook Component Library' },
           { type: 'web', url: 'https://storybook.js.org/docs/get-started/install', label: 'Storybook Docs' }],
          'Set up Storybook. Write stories for 3 components (Button, Input, Card).',
          '🚀 PROJECT: Build a component library with Storybook: Button (5 variants, 3 sizes), Input (label, error, disabled), Card (compound), Modal, Tabs, Accordion, Toast, Badge. TypeScript props, accessibility (ARIA), and Storybook stories for every component.', '4 hrs'),
      ],
      project: { id: 'afw1', title: 'Open-Source Component Library', desc: 'Publish a real npm package: @yourusername/ui. Components: Button, Input, Modal, Select, Tabs, Toast, Spinner. TypeScript, CSS Modules (or Tailwind peer). Rollup or tsup to bundle. Storybook for documentation (deploy to Chromatic). GitHub Actions CI/CD. Semantic versioning. README with installation + usage examples. This is a real portfolio differentiator.' }
    },

    { week: 2, title: 'Backend for Frontend — Node.js & Databases', timeRange: '14–16 hrs',
      days: [
        d(8, 'Node.js & Express REST API', 'Build a backend API to power your frontend.',
          'Node.js runs JavaScript on the server. Express: const app = express(); app.get("/api/users", handler); app.listen(3000). Middleware: app.use(express.json()) parses body. Route params: req.params, query: req.query, body: req.body. Error middleware: (err, req, res, next) => {}. Structure: routes/, controllers/, middleware/, models/.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Node.js+Express+REST+API+tutorial+2024', label: 'Node.js Express REST API' },
           { type: 'web', url: 'https://expressjs.com/', label: 'Express Documentation' }],
          'Build a CRUD API for /api/todos: GET all, POST new, PUT/:id, DELETE/:id.',
          'Build a "Blog API": POST /api/posts (create), GET /api/posts (all), GET /api/posts/:id, PUT /api/posts/:id, DELETE /api/posts/:id. Return proper status codes. Add pagination (page, limit query params).', '3 hrs'),

        d(9, 'PostgreSQL & Prisma ORM', 'Store and query data with a real database.',
          'PostgreSQL: relational database, most popular in production. Prisma ORM: schema-first, generates TypeScript client. schema.prisma defines models. prisma generate creates the client. prisma migrate dev creates database tables. Query: await prisma.user.findMany(), .create(), .update(), .delete(). Relations: one-to-many, many-to-many with @relation.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Prisma+PostgreSQL+tutorial+Node.js+2024', label: 'Prisma + PostgreSQL Tutorial' },
           { type: 'web', url: 'https://www.prisma.io/docs', label: 'Prisma Documentation' }],
          'Define User and Post models in Prisma schema. Run migration. CRUD users and posts.',
          'Add Prisma to your Blog API: User model (id, email, name, createdAt), Post model (id, title, content, published, authorId). Implement auth on the API (JWT). Users can only edit their own posts.', '3 hrs'),

        d(10, 'Authentication — NextAuth & Clerk', 'Implement full authentication.',
          'NextAuth.js: built for Next.js. Providers: GitHub, Google, Credentials (email+password). Session stored in JWT or database. useSession() hook in client components. getServerSession() in server components and API routes. Middleware to protect routes. Alternative: Clerk — fully hosted auth, even simpler, beautiful UI, free tier.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=NextAuth.js+tutorial+2024+authentication', label: 'NextAuth.js Tutorial' },
           { type: 'web', url: 'https://next-auth.js.org/getting-started/introduction', label: 'NextAuth.js Docs' }],
          'Add GitHub OAuth to a Next.js app. Protect a route that requires login.',
          '🚀 Full auth implementation: (1) NextAuth with GitHub + Google + Credentials providers, (2) Database session storage with Prisma adapter, (3) Protected dashboard route (middleware), (4) User profile page with session data, (5) Sign-in page with provider buttons.', '3 hrs'),

        d(11, 'File Uploads & Storage — S3 / Cloudinary', 'Handle file uploads in full-stack apps.',
          'Never store files in your database (bloated, slow). Use object storage: AWS S3 or Cloudinary. S3: get presigned URL from your API → client uploads directly to S3 (faster). Cloudinary: auto-optimizes images, free tier generous. Next.js API route generates presigned URL. Client POSTs file to URL. Store only the URL in your database.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+file+upload+Cloudinary+S3+tutorial', label: 'File Uploads Next.js Tutorial' },
           { type: 'web', url: 'https://cloudinary.com/documentation', label: 'Cloudinary Docs' }],
          'Create a file input. Upload to Cloudinary API. Store the returned URL in state and display the image.',
          'Add avatar upload to your user profile: (1) File input (image only), (2) Client-side preview with FileReader, (3) Compress with browser-image-compression, (4) Upload to Cloudinary API route, (5) Save URL to Prisma User model, (6) Show avatar in header.', '2.5 hrs'),

        d(12, 'WebSockets & Real-Time Features', 'Add real-time functionality to your apps.',
          'WebSocket: persistent bi-directional connection between client and server. Socket.io: most popular library, works with Node.js. Client: io.on("message", handler); io.emit("message", data). Server: io.on("connection", socket => socket.on("message"...)). Use cases: chat, live notifications, collaborative editing, live sports scores.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Socket.io+React+Node.js+real-time+tutorial+2024', label: 'Socket.io React Tutorial' },
           { type: 'web', url: 'https://socket.io/docs/v4/', label: 'Socket.io Documentation' }],
          'Create a Node.js + Socket.io server. Connect from React. Emit a message and show it in the UI.',
          '🚀 Build a real-time chat app: rooms, username, online user list, typing indicators, message history (last 50 in memory). Socket.io server + React client. Styled with Tailwind.', '3 hrs'),

        d(13, 'tRPC — End-to-End Type Safety', 'Share types between frontend and backend.',
          'tRPC eliminates the API contract problem — procedures defined on server are automatically typed on client. No code generation, no schema files. Works with Next.js (app router or pages). Router defines queries and mutations. Client: trpc.posts.getAll.useQuery(). Server: publicProcedure.input(z.object({id: z.string()})).query(). Zod for input validation.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=tRPC+Next.js+tutorial+2024', label: 'tRPC Next.js Tutorial' },
           { type: 'web', url: 'https://trpc.io/docs/quickstart', label: 'tRPC Documentation' }],
          'Add tRPC to a Next.js app. Define a getUsers query and a createUser mutation. Call them from a React component.',
          'Build a type-safe API with tRPC: post CRUD, user auth, comment system. Share response types between server and client — no type assertions, no any.', '3 hrs'),

        d(14, 'Week 2 Project — Full-Stack App', 'Build a complete full-stack application.',
          'Now you can build from database to UI. Combine: Next.js, Prisma, NextAuth, tRPC, and real-time features. This week bridges the frontend and backend worlds.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+fullstack+app+Prisma+tRPC+2024', label: 'Full-Stack Next.js Project' },
           { type: 'web', url: 'https://create.t3.gg/', label: 'create-t3-app (T3 Stack)' }],
          'Use create-t3-app (Next.js + TypeScript + Tailwind + tRPC + NextAuth + Prisma) for an instant boilerplate.',
          '🚀 PROJECT: Build a "Dev Bookmarks" app — full-stack: (1) NextAuth (GitHub login), (2) Prisma (User, Bookmark models), (3) tRPC (add, delete, tag, search bookmarks), (4) Tags filtering, (5) Import from browser (URL parsing), (6) Deployed on Vercel with PlanetScale database.', '4 hrs'),
      ],
      project: { id: 'afw2', title: 'Full-Stack Social Platform', desc: 'Build a Twitter/X-like micro-blogging platform. T3 Stack: Next.js + tRPC + Prisma + NextAuth. Features: sign in with GitHub, post tweets (280 char), reply threads, likes (real-time count with Pusher or Ably), follow/unfollow, profile page with all tweets, infinite scroll feed, image uploads to Cloudinary, and deployed to Vercel + PlanetScale.' }
    },

    { week: 3, title: 'Performance, PWA & Advanced CSS', timeRange: '14–16 hrs',
      days: [
        d(15, 'Core Web Vitals & Advanced Performance', 'Optimize for Google\'s performance metrics.',
          'Core Web Vitals: LCP (Largest Contentful Paint < 2.5s), FID/INP (Interaction to Next Paint < 200ms), CLS (Cumulative Layout Shift < 0.1). Tools: Lighthouse, PageSpeed Insights, web-vitals npm package. Image optimization: next/image (auto WebP, lazy, responsive srcset). Font optimization: next/font (eliminates FOUT). Bundle analysis: @next/bundle-analyzer.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Core+Web+Vitals+optimization+Next.js+2024', label: 'Core Web Vitals Optimization' },
           { type: 'web', url: 'https://web.dev/vitals/', label: 'web.dev: Core Web Vitals' }],
          'Run PageSpeed Insights on your portfolio. Identify what\'s causing poor LCP/CLS.',
          'Optimize your Next.js app for 90+ PageSpeed scores: (1) All images via next/image with correct sizes, (2) Font via next/font, (3) Bundle split via dynamic imports, (4) Cache-Control headers, (5) Preconnect hints for critical resources.', '2.5 hrs'),

        d(16, 'Progressive Web Apps (PWA)', 'Make your web app installable and work offline.',
          'PWA requirements: HTTPS, Web App Manifest, Service Worker. Service Worker: intercepts network requests, enables offline cache, background sync, push notifications. Cache strategies: cache-first, network-first, stale-while-revalidate. next-pwa or Workbox automates this. PWA score in Lighthouse. Install prompt with beforeinstallprompt event.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Progressive+Web+App+PWA+tutorial+2024', label: 'PWA Tutorial 2024' },
           { type: 'web', url: 'https://developer.chrome.com/docs/workbox/', label: 'Workbox Documentation' }],
          'Add manifest.json and a basic service worker to your portfolio. Test offline mode in DevTools.',
          'Convert your learning dashboard to a PWA: (1) Manifest (name, icons, theme), (2) Workbox service worker (cache-first for assets, network-first for API), (3) Offline page, (4) Install button, (5) Push notification on study reminder (use Notification API).', '2.5 hrs'),

        d(17, 'Advanced CSS — Container Queries & Layers', 'Use the newest CSS features.',
          'Container Queries: @container (min-width: 400px) { .card { flex-direction: row } } — styles based on parent size, not viewport. Replaces many media query hacks. CSS Layers: @layer base, components, utilities {} — controls specificity without !important. CSS Nesting (now native in modern browsers). :has() relational selector. Logical properties for RTL support.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+container+queries+cascade+layers+2024', label: 'CSS Container Queries & Layers' },
           { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries', label: 'MDN: Container Queries' }],
          'Refactor a card component to use container queries instead of media queries.',
          'Build a "Responsive Dashboard Widget System": widgets resize based on their container (not viewport). Use @container for 3 different widget sizes. Use @layer for clean specificity. Use :has() for interactive state.', '2.5 hrs'),

        d(18, 'Three.js — 3D Graphics on the Web', 'Add 3D elements to your websites.',
          'Three.js: WebGL-based 3D library. Core concepts: Scene, Camera (PerspectiveCamera), Renderer (WebGLRenderer). Objects: Mesh = Geometry + Material. Light sources: AmbientLight, DirectionalLight, PointLight. Animation loop: requestAnimationFrame. React Three Fiber: declarative Three.js for React components. Popular for hero sections, interactive portfolios, data visualization.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Three.js+tutorial+beginners+2024', label: 'Three.js Beginner Tutorial' },
           { type: 'web', url: 'https://threejs.org/docs/', label: 'Three.js Documentation' }],
          'Create a spinning 3D cube in Three.js. Add lighting and materials.',
          'Build an "Interactive 3D Portfolio Hero": a floating 3D object (your initials or geometric shape) that rotates on scroll, responds to mouse movement, has particle system background. Use React Three Fiber + Drei.', '3 hrs'),

        d(19, 'Data Visualization — D3.js & Recharts', 'Build complex data visualizations.',
          'D3.js: data-driven DOM manipulation. Scales: d3.scaleLinear, scaleOrdinal. Axes: d3.axisBottom, axisLeft. Selection: d3.select, selectAll. Data binding: .data([]).join("circle"). Transitions for animations. For React apps, Recharts is easier (React component wrappers). Combine: D3 for math/scales, React for rendering.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=D3.js+React+data+visualization+tutorial+2024', label: 'D3.js & React Visualization' },
           { type: 'web', url: 'https://d3js.org/', label: 'D3.js Documentation' }],
          'Build a bar chart with D3 from scratch (no library). Then build the same with Recharts.',
          'Build a "GitHub Contribution Graph" clone: 52 weeks × 7 days grid, color intensity based on commit count (fetch from GitHub API). Tooltip on hover showing date + count. All with D3 or canvas.', '3 hrs'),

        d(20, 'Micro-Frontends Architecture', 'Build large-scale frontend apps with micro-frontends.',
          'Micro-frontends: split one large app into independently deployable frontend apps. Module Federation (Webpack 5): share React components across apps at runtime. Each team deploys their piece independently. Shell app composes remote apps. Challenges: shared state, routing, styling conflicts. Used at large companies (IKEA, Zalando, Spotify).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=micro+frontends+module+federation+tutorial+2024', label: 'Micro-Frontends Tutorial' },
           { type: 'web', url: 'https://webpack.js.org/concepts/module-federation/', label: 'Module Federation Docs' }],
          'Read the concepts. Sketch a micro-frontend architecture for an e-commerce site.',
          'Build a 2-app micro-frontend demo: Host app (shell) + Remote app (product catalogue). Host consumes ProductCard from Remote at runtime via Module Federation. Separately deployed.', '2.5 hrs'),

        d(21, 'Week 3 Project — High-Performance PWA', 'Build a top-scoring Progressive Web App.',
          'Combine everything: Core Web Vitals optimization, PWA features, advanced CSS, performance monitoring. The goal: 100 Lighthouse score across all 4 categories on a feature-rich app.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+PWA+performance+tutorial+production', label: 'Next.js PWA Performance' },
           { type: 'web', url: 'https://developer.chrome.com/docs/lighthouse/', label: 'Lighthouse Documentation' }],
          'Start with a 60-score app. Apply optimizations one by one. Measure impact of each.',
          '🚀 PROJECT: Optimize a Next.js app to 95+ Lighthouse in all 4 categories (Performance, Accessibility, Best Practices, SEO) AND pass PWA checks. Document every optimization made and its impact on scores.', '3 hrs'),
      ],
      project: { id: 'afw3', title: 'Interactive 3D Data Dashboard', desc: 'Build a dashboard combining Three.js 3D visualizations with D3 charts. Homepage: React Three Fiber 3D globe showing real-time data (COVID stats, earthquake data, or satellite positions from a public API). Dashboard: D3 choropleth map, D3 force graph, Recharts time-series. PWA features (offline, installable). 95+ Lighthouse. Deployed on Vercel. This is portfolio gold.' }
    },

    { week: 4, title: 'DevOps, CI/CD & Developer Tooling', timeRange: '12–14 hrs',
      days: [
        d(22, 'Docker for Frontend Developers', 'Containerize your applications.',
          'Docker packages app with all dependencies into a container — runs identically anywhere. Dockerfile: FROM node:20-alpine, WORKDIR /app, COPY, RUN npm install, CMD. Build: docker build -t myapp. Run: docker run -p 3000:3000 myapp. Docker Compose: orchestrate multi-container (frontend + backend + database) with docker-compose.yml.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Docker+tutorial+Node.js+Next.js+beginners+2024', label: 'Docker for Frontend Devs' },
           { type: 'web', url: 'https://docs.docker.com/get-started/', label: 'Docker Getting Started' }],
          'Write a Dockerfile for a Next.js app. Build and run the container.',
          'Dockerize your full-stack app: Next.js Dockerfile (multi-stage build for small image), docker-compose with frontend + PostgreSQL. Run entire stack with one command.', '2 hrs'),

        d(23, 'CI/CD with GitHub Actions', 'Automate testing and deployment.',
          'GitHub Actions: workflows triggered by push, PR, schedule. Jobs: lint → test → build → deploy. Steps use actions (actions/checkout@v4, actions/setup-node@v4). Secrets: stored in GitHub repository settings. Deploy to Vercel: use vercel/actions. Run tests: vitest or jest. Cache node_modules. Matrix builds for multiple Node versions.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=GitHub+Actions+CI+CD+tutorial+Next.js+2024', label: 'GitHub Actions CI/CD' },
           { type: 'web', url: 'https://docs.github.com/en/actions', label: 'GitHub Actions Docs' }],
          'Create a workflow that runs tests and linting on every push.',
          'Set up full CI/CD: lint (ESLint) → type check (tsc) → test (Vitest) → build → deploy to Vercel on main. Add branch protection: PRs must pass CI before merging. Lighthouse CI check as status check.', '2.5 hrs'),

        d(24, 'Monitoring & Observability', 'Monitor your production apps.',
          'Sentry: error tracking — captures exceptions, stack traces, user context. session replay shows exactly what user did before error. Analytics: Vercel Analytics (free, privacy-friendly), Plausible, PostHog (feature flags + session recording). Performance monitoring: web-vitals reporting. Uptime: Uptime Robot (free, pings every 5 min). Logging: Axiom, Logtail.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Sentry+Next.js+error+tracking+tutorial', label: 'Sentry Next.js Tutorial' },
           { type: 'web', url: 'https://docs.sentry.io/platforms/javascript/guides/nextjs/', label: 'Sentry Next.js Docs' }],
          'Add Sentry to a Next.js app. Trigger a test error. View it in Sentry dashboard.',
          'Production monitoring setup: (1) Sentry (errors + performance), (2) Vercel Analytics (page views), (3) PostHog (user events), (4) Uptime Robot (5-min checks), (5) Web Vitals reporting to Sentry.', '2 hrs'),

        d(25, 'Advanced TypeScript Patterns', 'Write production-grade TypeScript.',
          'Generic types: function identity<T>(arg: T): T {}. Conditional types: T extends string ? "yes" : "no". Mapped types: {[K in keyof T]: boolean}. Utility types: Partial<T>, Required<T>, Pick<T, K>, Omit<T, K>, Record<K, V>, Exclude<T, U>. Discriminated unions for state modeling. Template literal types. infer in conditional types.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=TypeScript+advanced+patterns+generics+utility+types', label: 'Advanced TypeScript Patterns' },
           { type: 'web', url: 'https://www.typescriptlang.org/docs/handbook/2/types-from-types.html', label: 'TypeScript: Creating Types' }],
          'Write a generic useFetch<T> hook. Use Omit to create a CreateUserInput type from User.',
          'Build a type-safe API client library using generics, conditional types, and template literals. All endpoints type-safe. Response types inferred from request types.', '2.5 hrs'),

        d(26, 'AI-Powered Development Workflow', 'Use AI tools to 10x your productivity.',
          'Claude Code and GitHub Copilot autocomplete code. Claude.ai for debugging, code review, architecture decisions. Cursor: AI-native IDE with codebase-aware chat. Prompting for code: be specific, provide context, show expected input/output. Use AI to write tests, refactor, explain unfamiliar code, generate boilerplate. Don\'t blindly accept AI code — review everything.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=AI+coding+tools+developer+workflow+2024+Cursor+Copilot', label: 'AI Coding Tools Workflow' },
           { type: 'web', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', label: 'Prompt Engineering Guide' }],
          'Use Claude to review your largest component and list all improvement suggestions.',
          'AI-assisted sprint: (1) Use Cursor/Copilot to write 50 tests for your app, (2) Ask Claude to code-review your most complex component, (3) Use AI to refactor a messy piece of code, (4) Generate TypeScript types from an API response automatically.', '2 hrs'),

        d(27, 'Open Source Contribution', 'Contribute to open source projects.',
          'Contributing to open source: find issues with "good first issue" label on GitHub. Fork → clone → branch → fix → test → PR. Good commit messages: "fix: resolve hydration error in Modal component". Read CONTRIBUTING.md. React, Next.js, Tailwind, shadcn/ui, and thousands more welcome contributions. OSS contributions are powerful resume builders.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=how+to+contribute+open+source+github+tutorial', label: 'Open Source Contribution Guide' },
           { type: 'web', url: 'https://opensource.guide/how-to-contribute/', label: 'Open Source Guide' }],
          'Find a "good first issue" in a JS/React repo. Read the contributing guide. Set up the dev environment.',
          'Make your first open source contribution: (1) Fix a bug or typo in any repo, (2) Improve documentation for a library you use, (3) Add a test to improve coverage. Share the PR on LinkedIn.', '1.5 hrs'),

        d(28, 'Week 4 Project — DevOps Pipeline', 'Build a fully automated deployment pipeline.',
          'The final DevOps week brings together Docker, CI/CD, monitoring, and TypeScript in a production-grade pipeline. This is what separates senior developers from juniors.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+production+deployment+CI+CD+Docker', label: 'Production Next.js Deployment' },
           { type: 'web', url: 'https://vercel.com/docs/deployments/overview', label: 'Vercel Deployment Docs' }],
          'Set up a new Next.js project from scratch. Configure CI/CD first (before writing features).',
          '🚀 PROJECT: Production-ready CI/CD pipeline for a Next.js app: GitHub Actions (lint + typecheck + test + build + Lighthouse CI + deploy). Sentry error monitoring. Vercel Analytics. Docker Compose for local dev. Automated Storybook deployment to Chromatic on PR.', '3 hrs'),
      ],
      project: { id: 'afw4', title: 'Platform Engineering: Developer Portal', desc: 'Build an internal developer portal like Backstage: (1) Service catalog (fetch from GitHub API — list repos, tech stack, owner), (2) Deployment status (fetch from Vercel API), (3) On-call schedule, (4) Incident log (CRUD with Prisma), (5) API documentation viewer (Swagger UI embed), (6) Full CI/CD pipeline with GitHub Actions, Sentry, Docker. Next.js + TypeScript + Tailwind.' }
    },

    { week: 5, title: 'Capstone & Career Launch', timeRange: '14–16 hrs',
      days: [
        d(29, 'Capstone Project — Week 1', 'Build your most impressive portfolio project.',
          'Your capstone demonstrates everything: advanced React patterns, full-stack with Next.js, database, auth, real-time features, TypeScript, CI/CD, monitoring, and design. Choose a project you are genuinely excited about — your enthusiasm comes through in interviews.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=advanced+React+Next.js+fullstack+project+2024', label: 'Advanced React Project Ideas' },
           { type: 'web', url: 'https://github.com/nicholasgasior/gsfetchapi', label: 'Project Planning Resources' }],
          'Set up project with CI/CD and monitoring before writing business logic.',
          'Capstone Sprint 1: (1) Architecture document (tech stack, data models, component tree), (2) Repo setup with CI/CD, (3) Database schema with Prisma, (4) Auth implemented (NextAuth), (5) Core layout and navigation working.', '4 hrs'),

        d(30, 'Capstone Project — Week 2', 'Complete core features and polish.',
          'Sprint 2 focuses on core features, API integration, and UI polish. The goal is a working app that solves the problem you set out to solve. Don\'t add features — make existing ones excellent.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+project+development+best+practices', label: 'React Project Best Practices' },
           { type: 'web', url: 'https://www.refactoringui.com/', label: 'Refactoring UI' }],
          'Implement the 3 most important user flows first. Test each before adding another.',
          'Capstone Sprint 2: (1) All core CRUD features, (2) Real-time updates (if applicable), (3) Responsive design across all breakpoints, (4) Empty states, error states, loading states for every view, (5) 80%+ test coverage.', '4 hrs'),

        d(31, 'Capstone Project — Week 3', 'Performance, accessibility, and deployment.',
          'Polish sprint: optimize performance, ensure full accessibility (Lighthouse a11y 100), SEO meta tags, and deploy to production with monitoring.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+app+production+checklist', label: 'Production React Checklist' },
           { type: 'web', url: 'https://developer.chrome.com/docs/lighthouse/', label: 'Lighthouse Auditing' }],
          'Run Lighthouse. Fix every issue it flags. Then run it again on mobile.',
          'Capstone Sprint 3: (1) 90+ Lighthouse all categories, (2) Full keyboard navigation, (3) SEO meta tags and OG images, (4) Production deployment with custom domain, (5) Sentry monitoring, (6) README with demo GIF.', '4 hrs'),

        d(32, 'Senior Dev Skills — Code Review', 'Learn to give and receive code reviews.',
          'Code review is a core senior developer skill. What to check: correctness (does it work?), readability (is it clear?), performance (any bottlenecks?), security (any vulnerabilities?), test coverage. How to give good reviews: be specific ("const isDone = status === \'done\'" not "make it cleaner"), suggest don\'t demand, acknowledge good code. PR size: < 400 lines ideal.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=code+review+best+practices+senior+developer', label: 'Code Review Best Practices' },
           { type: 'web', url: 'https://google.github.io/eng-practices/review/', label: 'Google: Code Review Guide' }],
          'Review someone else\'s open PR on GitHub. Write 3 constructive comments.',
          'Self-code-review your capstone: (1) Check every function for single responsibility, (2) Look for code duplicates (extract shared logic), (3) Check error handling completeness, (4) Check TypeScript — no any types, (5) Document findings in a REVIEW.md file.', '2 hrs'),

        d(33, 'Salary Negotiation & Interview Strategy', 'Maximize your compensation and pass interviews.',
          'Research salary: Levels.fyi, Glassdoor, LinkedIn Salary. Know your number before the first call. Don\'t give a number first — ask for their range. Counter every offer (the worst they say is no). Framework: anchoring, silent pressure, competing offers. Technical interviews: LeetCode (easy/medium), system design, take-home projects, culture fit. Interview stages: phone screen → technical → system design → final loop.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=tech+salary+negotiation+tips+software+engineer', label: 'Tech Salary Negotiation' },
           { type: 'web', url: 'https://www.levels.fyi/', label: 'Levels.fyi: Salary Data' }],
          'Research 5 companies you want to work at. Find salary ranges for frontend roles.',
          'Interview prep sprint: (1) Solve 10 LeetCode easy problems, (2) Practice explaining your capstone project in 2 min, (3) Prepare 5 behavioral stories (STAR method), (4) Research 3 companies and prepare company-specific questions.', '2 hrs'),

        d(34, 'Build in Public & Personal Brand', 'Grow your developer presence online.',
          'Building in public: share your learning journey on Twitter/X, LinkedIn, or a blog. Post about problems you solved, things you built, things that confused you. Developers with an audience get inbound job offers. Consistency > perfection. Weekly posts about what you learned. Tutorial articles drive Google traffic. YouTube tutorials build authority fastest.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=build+in+public+developer+personal+brand+growth', label: 'Building in Public as a Dev' },
           { type: 'web', url: 'https://dev.to/', label: 'dev.to: Developer Community' }],
          'Post on LinkedIn about what you built this month with a screenshot. See the engagement.',
          'Start your public presence: (1) Write a "What I learned in 75 days of frontend" blog post, (2) Tweet/post your capstone with video demo, (3) Create a dev.to account, write your first article, (4) Join 2 Discord communities and answer one question.', '2 hrs'),

        d(35, 'Graduation & What\'s Next', 'Celebrate your progress and plan your next chapter.',
          'You now have the skills of a junior-to-mid level frontend developer. What\'s next: specialize (React → mobile with React Native, or backend with Node.js/Python, or DevRel/teaching), contribute to open source, keep building projects, stay current (React blog, Twitter/X frontend community, podcasts: Syntax, JS Party).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=frontend+developer+roadmap+2024+2025+what+next', label: 'Frontend Dev — What\'s Next?' },
           { type: 'web', url: 'https://roadmap.sh/frontend', label: 'roadmap.sh: Full Roadmap' }],
          'Write down what you\'ve accomplished. List the 3 things you\'re most proud of building.',
          '🎓 GRADUATION CHECKLIST: (1) Capstone deployed with custom domain, (2) Portfolio live with 5+ projects, (3) GitHub — 100+ contributions visible, (4) LinkedIn updated, (5) Applied to 10 jobs this week, (6) Posted capstone on social media, (7) Celebrate! You\'ve completed the Advanced Frontend Roadmap. 🎉', '1 hr'),
      ],
      project: { id: 'afw5', title: 'Capstone: Production SaaS', desc: 'Your graduation project — a production-grade SaaS application. Required: Next.js 14 App Router, TypeScript (strict mode), Tailwind + shadcn/ui, auth (Clerk or NextAuth), database (Supabase or PlanetScale via Prisma), payments (Stripe), real-time feature (Pusher or Supabase Realtime), Framer Motion animations, full test suite (>80% coverage), CI/CD (GitHub Actions), monitoring (Sentry + PostHog), custom domain on Vercel. Something you would actually use yourself.' }
    },

  ]
};

return { beginner, intermediate, advanced };
})();


// ═══════════════════════════════════════════════════════
//  FRONTEND ROADMAP STATE & NAVIGATION
// ═══════════════════════════════════════════════════════
let feCurrentLevel = null;
let feCurrentWeek  = null;

function feSwitchSub(sub, btn) {
  ['roadmap','revision','pomo','notes','projects'].forEach(s => {
    const el = document.getElementById('fe-sub-' + s);
    if (el) el.style.display = s === sub ? 'block' : 'none';
  });
  document.querySelectorAll('#fe-subtab-bar .section-subtab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  if (sub === 'roadmap') feShowScreen('fe-screen-levels');
  if (sub === 'revision') renderFERevisions();
  if (sub === 'pomo') {}
  if (sub === 'notes') loadFENotes();
}

function feShowScreen(id) {
  ['fe-screen-levels','fe-screen-weeks','fe-screen-days'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = 'none';
  });
  const t = document.getElementById(id);
  if (t) t.style.display = 'block';
}

function feSelectLevel(levelKey) {
  feCurrentLevel = levelKey;
  feCurrentWeek = null;
  const levelData = STRUCTURED_FE_ROADMAP[levelKey];
  if (!levelData) return;

  const titleEl = document.getElementById('fe-weeks-title');
  if (titleEl) titleEl.textContent = levelData.label + ' (' + levelData.days + ' Days)';

  const sumEl = document.getElementById('fe-level-summary');
  if (sumEl) {
    sumEl.innerHTML = `<div class="ai-level-summary-bar" style="border-color:rgba(249,115,22,0.3);background:linear-gradient(135deg,rgba(249,115,22,0.05),transparent);">
      <div class="ai-sum-left">
        <div class="ai-sum-title" style="color:var(--cf)">${escH(levelData.label)}</div>
        <div class="ai-sum-sub">${escH(levelData.goal)}</div>
      </div>
      <div class="ai-sum-stats">
        <div class="ai-sum-stat"><div class="ai-sum-val" style="color:var(--cf)">${levelData.days}</div><div class="ai-sum-lbl">Days</div></div>
        <div class="ai-sum-stat"><div class="ai-sum-val" style="color:var(--cf)">${levelData.totalHours}h</div><div class="ai-sum-lbl">Total</div></div>
      </div>
    </div>`;
  }

  const weeksEl = document.getElementById('fe-weeks-list');
  if (!weeksEl) return;
  const progKey = 'fe_struct_' + levelKey;
  const progress = JSON.parse(localStorage.getItem(progKey) || '{}');

  let html = '';
  levelData.weeks.forEach(week => {
    const totalDays = week.days.length;
    const doneDays  = week.days.filter(d => progress['w' + week.week + 'd' + d.day]?.done).length;
    const pct       = Math.round((doneDays / totalDays) * 100);
    const isComplete = doneDays === totalDays;

    html += `<div class="ai-week-card ${isComplete ? 'week-complete' : ''}" style="${isComplete ? 'border-color:rgba(249,115,22,0.4)' : ''}" onclick="APP.feSelectWeek(${week.week})">
      <div class="ai-week-header">
        <div class="ai-week-num" style="background:rgba(249,115,22,0.12);border-color:rgba(249,115,22,0.25);">
          <div class="ai-week-num-lbl" style="color:var(--cf)">WK</div>
          <div class="ai-week-num-val" style="color:var(--cf)">${week.week}</div>
        </div>
        <div class="ai-week-info">
          <div class="ai-week-title">${escH(week.title)}</div>
          <div class="ai-week-sub">${totalDays} days</div>
          <span class="ai-week-time-badge" style="border-color:rgba(249,115,22,0.2);color:var(--cf)">⏱️ ${escH(week.timeRange)}</span>
        </div>
        <div class="ai-week-right">
          <div class="ai-week-prog-txt" style="color:var(--cf)">${doneDays}/${totalDays}</div>
          <div class="ai-week-mini-prog"><div class="ai-week-mini-fill" style="width:${pct}%;background:var(--cf)"></div></div>
        </div>
      </div>
    </div>`;
  });
  weeksEl.innerHTML = html;
  feShowScreen('fe-screen-weeks');
}

function feSelectWeek(weekNum) {
  feCurrentWeek = weekNum;
  const levelData = STRUCTURED_FE_ROADMAP[feCurrentLevel];
  if (!levelData) return;
  const weekData = levelData.weeks.find(w => w.week === weekNum);
  if (!weekData) return;

  const titleEl = document.getElementById('fe-days-title');
  if (titleEl) titleEl.textContent = 'Week ' + weekNum + ' — ' + weekData.title;

  const wSumEl = document.getElementById('fe-week-summary');
  if (wSumEl) {
    const progKey = 'fe_struct_' + feCurrentLevel;
    const progress = JSON.parse(localStorage.getItem(progKey) || '{}');
    const totalDays = weekData.days.length;
    const doneDays  = weekData.days.filter(d => progress['w' + weekNum + 'd' + d.day]?.done).length;
    wSumEl.innerHTML = `<div class="ai-week-summary-bar" style="border-color:rgba(249,115,22,0.15);">
      <div class="ai-wsb-left">
        <div class="ai-wsb-title" style="color:var(--cf)">Week ${weekNum}</div>
        <div class="ai-wsb-sub">${escH(weekData.title)}</div>
      </div>
      <div class="ai-wsb-right">
        <div class="ai-wsb-stat"><div class="ai-wsb-val" style="color:var(--cf)">${escH(weekData.timeRange)}</div><div class="ai-wsb-lbl">⏱️ Week Time</div></div>
        <div class="ai-wsb-stat"><div class="ai-wsb-val" style="color:var(--cf)">${doneDays}/${totalDays}</div><div class="ai-wsb-lbl">Days Done</div></div>
      </div>
    </div>`;
  }

  const daysEl = document.getElementById('fe-structured-days-list');
  if (!daysEl) return;
  const progKey = 'fe_struct_' + feCurrentLevel;
  const progress = JSON.parse(localStorage.getItem(progKey) || '{}');

  let html = '';
  weekData.days.forEach(d => {
    const pk = 'w' + weekNum + 'd' + d.day;
    const isDone = !!(progress[pk]?.done);
    const resHtml = (d.resources || []).map(r => {
      const ico = r.type === 'yt' ? '▶' : '🌐';
      const bg  = r.type === 'yt' ? 'rgba(255,0,0,.15)' : 'rgba(249,115,22,.1)';
      return `<a class="resource-link" href="${escH(r.url)}" target="_blank" rel="noopener"><div class="resource-icon" style="background:${bg}">${ico}</div><span>${escH(r.label)}</span></a>`;
    }).join('');

    html += `<div class="ai-s-day-card ${isDone ? 's-done' : ''}" id="fe-sday-${weekNum}-${d.day}" style="${isDone ? '' : ''}">
      <div class="ai-s-day-header" onclick="APP.feToggleDay(${weekNum},${d.day})">
        <div class="ai-s-day-num" style="background:rgba(249,115,22,0.1);border-color:rgba(249,115,22,0.2);">
          <div class="ai-s-day-lbl" style="color:var(--cf)">DAY</div>
          <div class="ai-s-day-val" style="color:var(--cf)">${d.day}</div>
        </div>
        <div class="ai-s-day-info">
          <div class="ai-s-day-title">${escH(d.title)}</div>
          <div class="ai-s-day-meta">
            <span class="ai-s-time-badge" style="border-color:rgba(249,115,22,0.2);color:var(--cf)">⏱️ ${escH(d.time)}</span>
            ${isDone ? '<span style="font-size:9px;padding:1px 6px;border-radius:9999px;background:rgba(249,115,22,.15);border:1px solid rgba(249,115,22,.3);color:var(--cf);font-weight:700">✓ Done</span>' : ''}
          </div>
        </div>
        <div class="ai-s-day-right">
          <div class="cb ${isDone ? 'checked' : ''}" style="${isDone ? 'background:var(--cf);border-color:var(--cf)' : ''}" onclick="event.stopPropagation();APP.feToggleDone(${weekNum},${d.day})">${isDone ? '✓' : ''}</div>
          <div class="expand-btn">▾</div>
        </div>
      </div>
      <div class="ai-s-day-body">
        <div class="ai-s-body-inner">
          <div class="ai-s-section">
            <div class="ai-s-section-title">🎯 Goal</div>
            <div class="ai-s-text">${escH(d.goal)}</div>
          </div>
          <div class="ai-s-section">
            <div class="ai-s-section-title">📖 Explanation</div>
            <div class="ai-s-text">${escH(d.explanation)}</div>
          </div>
          ${resHtml ? `<div class="ai-s-section"><div class="ai-s-section-title">📺 Resources</div>${resHtml}</div>` : ''}
          <div class="ai-s-section">
            <div class="ai-s-section-title">💻 Practice</div>
            <div class="ai-s-practice">${escH(d.practice)}</div>
          </div>
          <div class="ai-s-section">
            <div class="ai-s-section-title">🚀 Task</div>
            <div class="ai-s-task">${escH(d.task)}</div>
          </div>
          <div class="ai-s-section">
            <div class="ai-s-time-box" style="border-color:rgba(249,115,22,0.2);background:rgba(249,115,22,0.05)">
              <span class="ai-s-time-ico">⏱️</span>
              <span class="ai-s-time-text" style="color:var(--cf)">${escH(d.time)} estimated for today</span>
            </div>
          </div>
          <div class="ai-s-section" style="padding-top:0">
            <button class="fe-mark-done-btn ${isDone ? 'done' : ''}" onclick="APP.feToggleDone(${weekNum},${d.day})" style="width:100%;padding:10px;border-radius:8px;background:${isDone ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.1)'};border:1px solid rgba(249,115,22,${isDone ? '0.4' : '0.25'});color:var(--cf);font-weight:700;font-size:12px;cursor:pointer;transition:all .2s;">
              ${isDone ? '✓ Completed — Click to Undo' : '○ Mark as Complete'}
            </button>
          </div>
        </div>
      </div>
    </div>`;
  });

  // Week project card
  const proj = weekData.project;
  if (proj) {
    const prog3 = JSON.parse(localStorage.getItem('fe_struct_' + feCurrentLevel) || '{}');
    const projStatus = prog3['proj_' + proj.id] || 'not-started';
    const psc = projStatus === 'completed' ? 'status-completed' : projStatus === 'in-progress' ? 'status-in-progress' : 'status-not-started';
    const psl = projStatus === 'completed' ? '✓ Completed' : projStatus === 'in-progress' ? '⚡ In Progress' : '○ Not Started';
    const pcc = projStatus === 'completed' ? 'ai-proj-status-completed' : projStatus === 'in-progress' ? 'ai-proj-status-in-progress' : '';

    html += `
    <div class="ai-proj-divider">
      <div class="ai-proj-divider-line" style="background:rgba(249,115,22,0.2)"></div>
      <div class="ai-proj-divider-label" style="border-color:rgba(249,115,22,0.25);color:var(--cf)">🚀 Week ${weekNum} Project</div>
      <div class="ai-proj-divider-line right" style="background:rgba(249,115,22,0.2)"></div>
    </div>
    <div class="ai-proj-card ${pcc}" id="fe-proj-${proj.id}" style="border-color:rgba(249,115,22,0.15)">
      <div class="ai-proj-header" onclick="APP.feToggleProject('${proj.id}')">
        <div class="ai-proj-icon">🌐</div>
        <div class="ai-proj-info">
          <div class="ai-proj-badge" style="background:rgba(249,115,22,0.12);border-color:rgba(249,115,22,0.25);color:var(--cf)">✦ Week Project</div>
          <div class="ai-proj-title">${escH(proj.title)}</div>
          <div class="ai-proj-meta">Applies all Week ${weekNum} concepts</div>
        </div>
        <div class="ai-proj-status-pill">
          <div class="ai-proj-status ${psc}" id="fe-proj-status-pill-${proj.id}">${psl}</div>
          <div class="ai-proj-chevron" id="fe-proj-chev-${proj.id}">▾</div>
        </div>
      </div>
      <div class="ai-proj-body" id="fe-proj-body-${proj.id}" style="display:none">
        <div class="ai-proj-desc">${escH(proj.desc)}</div>
        <div class="ai-proj-status-btns">
          <button onclick="APP.feSetProjectStatus('${proj.id}','not-started')" class="proj-status-btn ${projStatus==='not-started'?'active':''}" style="border-color:rgba(249,115,22,0.2);">○ Not Started</button>
          <button onclick="APP.feSetProjectStatus('${proj.id}','in-progress')" class="proj-status-btn ${projStatus==='in-progress'?'active':''}">⚡ In Progress</button>
          <button onclick="APP.feSetProjectStatus('${proj.id}','completed')" class="proj-status-btn ${projStatus==='completed'?'active':''}">✓ Complete</button>
        </div>
      </div>
    </div>`;
  }

  daysEl.innerHTML = html;
  feShowScreen('fe-screen-days');
}

function feToggleDay(weekNum, dayNum) {
  const card = document.getElementById('fe-sday-' + weekNum + '-' + dayNum);
  if (!card) return;
  card.classList.toggle('expanded');
  const chevron = card.querySelector('.expand-btn');
  if (chevron) chevron.textContent = card.classList.contains('expanded') ? '▴' : '▾';
}

function feToggleDone(weekNum, dayNum) {
  const progKey = 'fe_struct_' + feCurrentLevel;
  const progress = JSON.parse(localStorage.getItem(progKey) || '{}');
  const pk = 'w' + weekNum + 'd' + dayNum;
  const isDone = !!(progress[pk]?.done);
  progress[pk] = { done: !isDone, doneAt: !isDone ? new Date().toISOString() : null };
  localStorage.setItem(progKey, JSON.stringify(progress));
  // Re-render to reflect new state
  feSelectWeek(weekNum);
  updateFEProgress();
  try { if (typeof APP !== 'undefined' && APP.updateHeader) APP.updateHeader(); } catch(e) {}
  const msg = !isDone ? '🎉 Day ' + dayNum + ' marked complete!' : '↩️ Day ' + dayNum + ' unmarked';
  try { if (typeof toast !== 'undefined') toast(msg); } catch(e) {}
}

function feToggleProject(projId) {
  const body = document.getElementById('fe-proj-body-' + projId);
  const chev = document.getElementById('fe-proj-chev-' + projId);
  if (!body) return;
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  if (chev) chev.textContent = isOpen ? '▾' : '▴';
}

function feSetProjectStatus(projId, status) {
  const progKey = 'fe_struct_' + feCurrentLevel;
  const prog = JSON.parse(localStorage.getItem(progKey) || '{}');
  prog['proj_' + projId] = status;
  localStorage.setItem(progKey, JSON.stringify(prog));
  feSelectWeek(feCurrentWeek);
}

function updateFEProgress() {
  // Update the home card progress bar
  const bar = document.getElementById('home-fe-prog');
  if (!bar) return;
  let totalDone = 0, totalAll = 0;
  ['beginner', 'intermediate', 'advanced'].forEach(level => {
    const prog = JSON.parse(localStorage.getItem('fe_struct_' + level) || '{}');
    const ld = STRUCTURED_FE_ROADMAP[level];
    if (!ld) return;
    ld.weeks.forEach(w => {
      w.days.forEach(d => {
        totalAll++;
        if (prog['w' + w.week + 'd' + d.day]?.done) totalDone++;
      });
    });
  });
  const pct = totalAll > 0 ? Math.round(totalDone / totalAll * 100) : 0;
  bar.style.width = pct + '%';
  const statEl = document.getElementById('home-stat-fe');
  if (statEl) statEl.textContent = totalDone;
}

function renderFERevisions() {
  const el = document.getElementById('fe-revision-list');
  if (el) el.innerHTML = '<div style="text-align:center;color:var(--t2);font-size:13px;padding:24px">Revision tracking for Frontend coming soon.</div>';
}

function loadFENotes() {
  const saved = localStorage.getItem('fe-notes') || '';
  const ta = document.getElementById('fe-notes-ta');
  if (ta) ta.value = saved;
}

function saveFENotes() {
  const ta = document.getElementById('fe-notes-ta');
  if (!ta) return;
  localStorage.setItem('fe-notes', ta.value);
  try { if (typeof toast !== 'undefined') toast('📝 Notes saved!'); } catch(e) {}
}

// Helper (may be defined in script.js, but define as fallback)
function escH(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ═══════════════════════════════════════════════════════
//  ATTACH TO APP
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Initialize progress bar on home card
  updateFEProgress();

  // Attach to APP global if it exists
  if (typeof APP !== 'undefined') {
    Object.assign(APP, {
      feSelectLevel,
      feSelectWeek,
      feToggleDay,
      feToggleDone,
      feToggleProject,
      feSetProjectStatus,
      feSwitchSub,
      saveFENotes,
    });
  } else {
    // Expose to window directly
    window.feSelectLevel   = feSelectLevel;
    window.feSelectWeek    = feSelectWeek;
    window.feToggleDay     = feToggleDay;
    window.feToggleDone    = feToggleDone;
    window.feToggleProject = feToggleProject;
    window.feSetProjectStatus = feSetProjectStatus;
    window.feSwitchSub     = feSwitchSub;
    window.saveFENotes     = saveFENotes;
  }
});

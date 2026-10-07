// Accessibility acceptance criteria for each component.
// Format: groups → [groupName, [[criterionText, 'space-separated WCAG ids' or '' for best practice]]]
//         affects → [[disabilityId, why this component matters to that group]]
// All criteria are written in plain language so they can be pasted straight into a story.

const RAW = [
  /* ───────────── Page view ───────────── */
  {
    id: 'android-view',
    name: 'Android app view',
    summary: 'A full screen in an Android app. It is the frame every other component sits in.',
    groups: [
      ['Name', [
        [`Each screen has a unique, descriptive title that TalkBack announces when the screen opens, such as “Pay bill”, not “Screen 3”.`, '2.4.2'],
        [`The app language is set so TalkBack pronounces content correctly.`, '3.1.1'],
      ]],
      ['Structure', [
        [`Section titles are marked as headings so TalkBack users can jump between them.`, '1.3.1 2.4.6'],
        [`Focus order is annotated and follows the visual reading order, top to bottom and start to end.`, '1.3.2 2.4.3'],
      ]],
      ['Visual', [
        [`The layout works in portrait and landscape unless one orientation is essential.`, '1.3.4'],
        [`Text scales to 200% with the system font size setting without being cut off or overlapping.`, '1.4.4'],
        [`Text meets 4.5:1 contrast, or 3:1 for large text, in both light and dark themes.`, '1.4.3'],
        [`Touch targets are at least 48 × 48dp, following Android guidance. The WCAG minimum is 24 × 24.`, '2.5.8'],
      ]],
      ['Behaviour', [
        [`Every gesture-based action, such as swipe to delete, also has a single-tap alternative.`, '2.5.1'],
        [`Time limits can be turned off, adjusted or extended.`, '2.2.1'],
      ]],
    ],
    affects: [
      ['blind', `TalkBack users rely on the screen title, headings and a logical focus order to understand where they are.`],
      ['low-vision', `People who use large system fonts need text that wraps rather than truncates.`],
      ['motor', `Small targets and swipe-only actions are hard to use with tremors, switch access or voice control.`],
      ['cognitive', `A clear title on every screen helps people keep track of where they are in a task.`],
    ],
  },
  {
    id: 'html',
    name: 'Web HTML page',
    summary: 'A single web page. Its title, language, landmarks and layout set the foundation for everything on it.',
    groups: [
      ['Name', [
        [`Each page has a unique <title> that starts with the page topic and ends with the site name.`, '2.4.2'],
        [`The page language is set with the lang attribute on the <html> element.`, '3.1.1'],
      ]],
      ['Structure', [
        [`The page has one h1 that describes its main purpose.`, '1.3.1 2.4.6'],
        [`Content is organized into header, nav, main and footer landmarks.`, '1.3.1'],
        [`A “Skip to main content” link is the first thing keyboard users reach.`, '2.4.1'],
        [`The page can be reached more than one way, such as navigation, search or a site map.`, '2.4.5'],
      ]],
      ['Visual', [
        [`Content reflows into one column at 320 CSS pixels wide with no horizontal scrolling.`, '1.4.10'],
        [`Text can be zoomed to 200% without losing content.`, '1.4.4'],
        [`Increasing text spacing (line height 1.5, paragraph spacing 2× font size) does not clip or overlap content.`, '1.4.12'],
        [`Sticky headers, footers and cookie banners never completely cover the element with keyboard focus.`, '2.4.11'],
      ]],
      ['Behaviour', [
        [`Navigation and repeated components appear in the same place and order on every page.`, '3.2.3 3.2.4'],
        [`Help, such as contact details, appears in the same place on every page.`, '3.2.6'],
      ]],
    ],
    affects: [
      ['blind', `Screen reader users hear the title first and use landmarks and headings to move around the page.`],
      ['low-vision', `People zoomed to 400% need content to reflow instead of scrolling sideways.`],
      ['motor', `A skip link saves keyboard and switch users from tabbing through every navigation link on every page.`],
      ['cognitive', `Consistent layout and navigation make the site predictable and easier to learn.`],
    ],
  },
  {
    id: 'ios-view',
    name: 'iOS app view',
    summary: 'A full screen in an iOS app. It is the frame every other component sits in.',
    groups: [
      ['Name', [
        [`Each screen has a descriptive navigation title that VoiceOver announces when the screen appears.`, '2.4.2'],
        [`The content language is set so VoiceOver pronounces words correctly.`, '3.1.1'],
      ]],
      ['Structure', [
        [`Section titles are marked as headings so the VoiceOver rotor can jump between them.`, '1.3.1 2.4.6'],
        [`VoiceOver reading order matches the visual order.`, '1.3.2 2.4.3'],
      ]],
      ['Visual', [
        [`Text supports Dynamic Type, including the larger accessibility sizes, without truncation.`, '1.4.4'],
        [`Text contrast meets 4.5:1 in light mode, dark mode and with Increase Contrast turned on.`, '1.4.3'],
        [`Touch targets are at least 44 × 44pt, following Apple guidance.`, '2.5.8'],
        [`Both orientations are supported unless one is essential.`, '1.3.4'],
      ]],
      ['Behaviour', [
        [`Custom gestures have a button alternative, and the VoiceOver escape gesture dismisses modal views.`, '2.5.1'],
        [`Transitions and parallax effects are reduced when Reduce Motion is on.`, '2.3.3'],
      ]],
    ],
    affects: [
      ['blind', `VoiceOver users navigate by the rotor, so headings and a logical reading order are essential.`],
      ['low-vision', `Many people use the largest Dynamic Type sizes, which break layouts that assume fixed text size.`],
      ['motor', `Custom gestures can be impossible for people using Switch Control or Voice Control.`],
      ['vestibular', `Large zooming and sliding transitions can cause dizziness unless Reduce Motion is honoured.`],
    ],
  },

  /* ───────────── Header ───────────── */
  {
    id: 'header',
    name: 'Header landmark',
    summary: 'The banner at the top of every page that holds the logo, main navigation and search.',
    groups: [
      ['Role', [
        [`The site header is a banner landmark: a <header> that is not inside article, aside, main, nav or section, or role="banner".`, '1.3.1'],
        [`There is only one banner landmark per page.`, '1.3.1'],
      ]],
      ['Content', [
        [`The header holds only content that repeats on every page: logo, main navigation, search and account links.`, '3.2.3'],
        [`The logo links to the home page, and its accessible name is the organization name, such as “Northgrid Power home”.`, '1.1.1 2.4.4'],
      ]],
      ['Keyboard and focus', [
        [`A skip link before the header lets keyboard users jump straight to the main content.`, '2.4.1'],
        [`A sticky header never completely covers the element with keyboard focus.`, '2.4.11'],
      ]],
      ['Visual', [
        [`At 400% zoom the header collapses or scrolls away, so it does not fill most of the screen.`, '1.4.10'],
      ]],
    ],
    affects: [
      ['blind', `The banner landmark lets screen reader users skip the header or jump back to it in one keystroke.`],
      ['motor', `Without a skip link, keyboard users must tab through every header link on every page.`],
      ['low-vision', `A sticky header can take up half the screen when zoomed and hide what the user is working on.`],
    ],
  },
  {
    id: 'nav',
    name: 'Navigation landmark',
    summary: 'A group of major links, such as the main menu, a section menu or footer links.',
    groups: [
      ['Name', [
        [`When a page has more than one nav, each has a unique accessible name, such as “Main” and “Footer”.`, '1.3.1 2.4.6'],
        [`The name does not include the word “navigation”, because screen readers already announce the role.`, ''],
      ]],
      ['Role', [
        [`Major groups of links use a <nav> element or role="navigation".`, '1.3.1'],
        [`Links inside are in a list, so screen readers announce how many there are.`, '1.3.1'],
      ]],
      ['State', [
        [`The link to the current page has aria-current="page" and is visually distinct by more than colour, such as an underline or bar.`, '1.3.1 1.4.1'],
      ]],
      ['Behaviour', [
        [`Navigation appears in the same place and order on every page.`, '3.2.3'],
        [`Links with the same destination use the same wording everywhere.`, '3.2.4'],
      ]],
    ],
    affects: [
      ['blind', `Named nav landmarks let screen reader users jump directly to the menu they want.`],
      ['color', `A current-page indicator shown only by colour may not be visible to people with colour blindness.`],
      ['cognitive', `A menu that stays the same on every page reduces the effort of finding things.`],
    ],
  },
  {
    id: 'search',
    name: 'Search form',
    summary: 'A search field and button, often in the header, with optional suggestions and a results page.',
    groups: [
      ['Name', [
        [`The search input has a visible label or a clearly labelled button, and an accessible name such as “Search the site”.`, '2.4.6 3.3.2'],
        [`The submit button is named “Search”. An icon-only button still needs that name.`, '1.1.1 4.1.2'],
      ]],
      ['Role', [
        [`The form is a search landmark: a <search> element or role="search".`, '1.3.1'],
        [`The input uses type="search".`, ''],
      ]],
      ['Behaviour', [
        [`Suggestions that appear while typing are announced and can be reached with the arrow keys.`, '2.1.1 4.1.3'],
        [`The number of results is announced when results load.`, '4.1.3'],
        [`A search with no results suggests a next step, such as checking spelling or browsing a category.`, '3.3.3'],
      ]],
      ['Visual', [
        [`The input border has at least 3:1 contrast against the background.`, '1.4.11'],
      ]],
    ],
    affects: [
      ['blind', `Without announcements, screen reader users do not know suggestions or results have appeared.`],
      ['cognitive', `Spelling help and suggestions support people with dyslexia or memory difficulties.`],
      ['motor', `Search is often much faster than browsing through many pages by keyboard.`],
      ['low-vision', `A faint input border makes the search field hard to find at all.`],
    ],
  },

  /* ───────────── Navigation ───────────── */
  {
    id: 'breadcrumbs',
    name: 'Breadcrumb navigation',
    summary: 'A trail of links showing where the current page sits in the site hierarchy.',
    groups: [
      ['Name', [
        [`The breadcrumb nav has the accessible name “Breadcrumb”.`, '1.3.1 2.4.6'],
      ]],
      ['Role', [
        [`Breadcrumbs are a nav landmark containing an ordered list of links.`, '1.3.1'],
      ]],
      ['State', [
        [`The last item is the current page. It has aria-current="page" and is not a link to somewhere else.`, '1.3.1'],
      ]],
      ['Visual', [
        [`Separators between items are decorative and hidden from screen readers.`, '1.1.1'],
        [`Links meet 4.5:1 contrast and can be identified without colour alone.`, '1.4.3 1.4.1'],
        [`On small screens, breadcrumbs wrap or shorten to a single “Back to” link rather than overflowing.`, '1.4.10'],
      ]],
    ],
    affects: [
      ['cognitive', `Breadcrumbs answer “where am I?” and offer an easy way back up the hierarchy.`],
      ['blind', `An ordered list tells screen reader users how deep they are, without reading every separator aloud.`],
      ['low-vision', `Breadcrumbs that overflow at high zoom force sideways scrolling.`],
    ],
  },
  {
    id: 'button',
    name: 'Button',
    summary: 'Triggers an action on the current page, such as submitting, saving, opening or closing.',
    groups: [
      ['Name', [
        [`The visible label describes the action, such as “Pay bill” or “Report an outage”.`, '2.4.6'],
        [`The accessible name starts with or matches the visible label, so voice control users can say what they see.`, '2.5.3'],
        [`Icon-only buttons have an accessible name, such as “Close” or “Download PDF”.`, '1.1.1 4.1.2'],
      ]],
      ['Role', [
        [`Buttons perform actions. Anything that takes the user to a new page or URL is a link instead.`, '4.1.2'],
      ]],
      ['State', [
        [`Toggle buttons expose pressed or not pressed with aria-pressed.`, '4.1.2'],
        [`Disabled buttons look disabled, and the reason is explained nearby.`, '1.3.1 3.3.2'],
      ]],
      ['Keyboard and focus', [
        [`Activates with both Enter and Space.`, '2.1.1'],
        [`Has a visible focus indicator with at least 3:1 contrast.`, '2.4.7 1.4.11'],
      ]],
      ['Visual', [
        [`Label text meets 4.5:1 against the button background in every state, including hover.`, '1.4.3'],
        [`The button edge or fill meets 3:1 against the page when it is the only cue that this is a button.`, '1.4.11'],
        [`The target is at least 24 × 24 CSS pixels.`, '2.5.8'],
      ]],
    ],
    affects: [
      ['blind', `Screen readers announce a button by its name and role. A vague or missing name leaves users guessing.`],
      ['motor', `Voice control users activate buttons by saying the visible label, so the name must match it.`],
      ['low-vision', `Low-contrast buttons and faint focus rings are hard to find on the page.`],
      ['cognitive', `Specific labels such as “Pay $142.18” are clearer than “Submit” or “OK”.`],
    ],
  },
  {
    id: 'link',
    name: 'Link',
    summary: 'Takes the user to another page, a different part of the page, or a file.',
    groups: [
      ['Name', [
        [`Link text makes sense on its own, or with its sentence, such as “Read the 2026 rate notice”, not “Click here”.`, '2.4.4'],
        [`Links to the same destination use the same text throughout the site.`, '3.2.4'],
        [`Links that open a new tab or download a file say so, such as “Rate notice (PDF, 2 MB)”.`, '2.4.4'],
      ]],
      ['Role', [
        [`Links navigate. Actions on the current page use a button instead.`, '4.1.2'],
      ]],
      ['Keyboard and focus', [
        [`Links activate with Enter and have a visible focus indicator.`, '2.1.1 2.4.7'],
      ]],
      ['Visual', [
        [`Links in body text are underlined or otherwise identifiable without relying on colour.`, '1.4.1'],
        [`Link text meets 4.5:1 contrast.`, '1.4.3'],
      ]],
    ],
    affects: [
      ['blind', `Screen reader users often list all links on a page. “Click here” repeated ten times means nothing out of context.`],
      ['color', `Links shown only by a colour change can blend into the surrounding text.`],
      ['cognitive', `Descriptive link text sets clear expectations about where a link goes.`],
      ['motor', `Voice control users say the link text to activate it, which is hard when many links share the same words.`],
    ],
  },
  {
    id: 'nav-button',
    name: 'Nav menu button',
    summary: 'A button, often a three-line icon, that shows and hides the main navigation on small screens.',
    groups: [
      ['Name', [
        [`The button is named “Menu” or “Main menu”, and the name stays the same when the menu opens.`, '4.1.2 2.5.3'],
      ]],
      ['State', [
        [`The button exposes expanded or collapsed with aria-expanded.`, '4.1.2'],
        [`The button is associated with the menu it controls.`, '1.3.1'],
      ]],
      ['Keyboard and focus', [
        [`After opening, Tab moves into the menu links in visual order.`, '2.4.3'],
        [`Escape closes the menu and returns focus to the button.`, '2.1.1'],
        [`Hidden menu links cannot receive focus while the menu is closed.`, '2.4.3 2.4.7'],
      ]],
      ['Visual', [
        [`The icon has a visible text label such as “Menu” beside it.`, '3.3.2'],
        [`The target is at least 24 × 24 CSS pixels, ideally 44 × 44.`, '2.5.8'],
      ]],
    ],
    affects: [
      ['blind', `Without an expanded state, screen reader users cannot tell whether the menu opened.`],
      ['cognitive', `The three-line icon is not universally understood. A “Menu” label removes the guesswork.`],
      ['motor', `Focus moving to invisible links is disorienting and wastes keystrokes.`],
    ],
  },

  /* ───────────── Main content ───────────── */
  {
    id: 'animation',
    name: 'Animation & motion',
    summary: 'Anything that moves on screen: transitions, parallax, auto-playing animation and loading effects.',
    groups: [
      ['Behaviour', [
        [`Anything that moves, blinks or scrolls automatically for more than 5 seconds has a control to pause, stop or hide it.`, '2.2.2'],
        [`Nothing flashes more than 3 times in any one second.`, '2.3.1'],
        [`Motion triggered by interaction, such as parallax or zooming transitions, is turned off when reduced motion is set.`, '2.3.3'],
        [`Animation never moves, covers or hides the element with keyboard focus.`, '2.4.11'],
      ]],
      ['Content', [
        [`Information shown through animation is also available as text or a static state.`, '1.1.1'],
      ]],
      ['Visual', [
        [`Decorative animation does not autoplay where it distracts from the main task.`, '2.2.2'],
      ]],
    ],
    affects: [
      ['vestibular', `Parallax, zoom and large sliding effects can trigger dizziness, nausea and migraines.`],
      ['seizure', `Rapid flashing can trigger seizures in people with photosensitive epilepsy.`],
      ['cognitive', `Constant motion pulls attention away from reading, especially for people with ADHD.`],
      ['blind', `Information that exists only in an animation is not available to screen reader users.`],
    ],
  },
  {
    id: 'audio',
    name: 'Audio player',
    summary: 'Plays sound such as podcasts, recorded announcements or voice messages.',
    groups: [
      ['Content', [
        [`Pre-recorded audio, such as a podcast, has a text transcript.`, '1.2.1'],
        [`The transcript is linked right next to the player.`, '1.2.1'],
      ]],
      ['Behaviour', [
        [`Audio does not play automatically. If it must, it stops within 3 seconds or has a pause or mute control near the start of the page.`, '1.4.2'],
      ]],
      ['Name and role', [
        [`Every control, including play, pause, mute, volume and seek, has an accessible name and the right role, such as button or slider.`, '4.1.2'],
        [`Play and pause expose their current state.`, '4.1.2'],
      ]],
      ['Keyboard and focus', [
        [`All controls work with the keyboard, including volume and seeking.`, '2.1.1'],
        [`Controls are visible without hovering and show focus clearly.`, '2.4.7'],
      ]],
      ['Visual', [
        [`Control icons meet 3:1 contrast.`, '1.4.11'],
      ]],
    ],
    affects: [
      ['deaf', `A transcript is the only way Deaf users can get the content of audio.`],
      ['blind', `Autoplaying audio talks over the screen reader, making the page unusable until it stops.`],
      ['motor', `Sliders for volume and seeking must work with arrow keys, not just dragging.`],
      ['cognitive', `Transcripts let people read at their own pace and search for what they need.`],
    ],
  },
  {
    id: 'card',
    name: 'Card box',
    summary: 'A container that groups a heading, short text, an image and a link to more detail.',
    groups: [
      ['Name', [
        [`Each card has a heading that describes its content.`, '1.3.1 2.4.6'],
        [`When the whole card is clickable, the link name is the card heading, not all of the card text.`, '2.4.4 2.5.3'],
      ]],
      ['Role', [
        [`A set of cards is marked up as a list, so screen readers announce how many there are.`, '1.3.1'],
        [`Each card has one primary link. Extra actions are separate buttons or links with unique names.`, '2.4.4'],
      ]],
      ['Keyboard and focus', [
        [`A clickable card is a single Tab stop for its primary link, plus one stop for each extra action.`, '2.4.3'],
        [`Focus is visible around the card or its main link.`, '2.4.7'],
      ]],
      ['Visual', [
        [`Card edges meet 3:1 contrast when they are the only cue that the content is grouped.`, '1.4.11'],
        [`Content is read in the order shown: image, heading, text, then action.`, '1.3.2'],
      ]],
    ],
    affects: [
      ['blind', `A whole card announced as one link can be read as a long, confusing paragraph.`],
      ['motor', `Too many Tab stops per card makes a grid of cards slow to move through.`],
      ['cognitive', `Clear headings and one obvious action per card make choices easier.`],
    ],
  },
  {
    id: 'carousel',
    name: 'Carousel slideshow',
    summary: 'A rotating set of slides showing one or a few items at a time.',
    groups: [
      ['Behaviour', [
        [`A carousel that advances automatically has a visible pause button and stops when it receives keyboard focus or hover.`, '2.2.2'],
        [`Previous and next buttons move between slides, so swiping is not required.`, '2.5.1 2.1.1'],
      ]],
      ['Name', [
        [`The carousel has an accessible name, such as “Featured programs”.`, '1.3.1'],
        [`Each slide is labelled with its position, such as “Slide 2 of 5”.`, '1.3.1'],
        [`Previous, next and slide-picker buttons have accessible names.`, '4.1.2'],
      ]],
      ['State', [
        [`The current-slide indicator uses more than colour, such as a filled dot plus a text label.`, '1.4.1'],
        [`Slides that are not visible are hidden from screen readers and keyboard focus.`, '2.4.3 1.3.2'],
      ]],
      ['Visual', [
        [`Controls meet 3:1 contrast over every slide image behind them.`, '1.4.11'],
      ]],
    ],
    affects: [
      ['cognitive', `Slides that change on their own can disappear before people finish reading them.`],
      ['motor', `Swipe-only carousels exclude keyboard, switch and voice control users.`],
      ['blind', `Hidden slides that are still in the reading order make content repeat and confuse users.`],
      ['vestibular', `Constant sliding motion can be uncomfortable for people with vestibular disorders.`],
    ],
  },
  {
    id: 'image-decorative',
    name: 'Decorative image / icon',
    summary: 'An image or icon that adds visual interest but no information the text does not already give.',
    groups: [
      ['Name', [
        [`Decorative images have empty alt text (alt="") or are added as CSS backgrounds.`, '1.1.1'],
        [`Icons next to text that says the same thing are hidden from screen readers with aria-hidden="true".`, '1.1.1'],
      ]],
      ['Content', [
        [`An image is only decorative if removing it would lose no information. Otherwise treat it as an informative image.`, '1.1.1'],
      ]],
      ['Keyboard and focus', [
        [`Decorative images and icons cannot receive keyboard focus.`, '2.4.3'],
      ]],
      ['Visual', [
        [`Decorative images never sit behind text in a way that drops its contrast below 4.5:1.`, '1.4.3'],
      ]],
    ],
    affects: [
      ['blind', `Announcing every decorative image adds noise and slows screen reader users down.`],
      ['low-vision', `Busy background images behind text can make the text unreadable.`],
      ['cognitive', `Extra visual clutter makes it harder to focus on what matters.`],
    ],
  },
  {
    id: 'dialog-modal',
    name: 'Dialog modal',
    summary: 'A window that appears over the page and must be dealt with before returning to it.',
    groups: [
      ['Name', [
        [`The dialog has a visible title, which is also its accessible name.`, '4.1.2 2.4.6'],
      ]],
      ['Role', [
        [`Uses modal dialog behaviour: a native <dialog> opened with showModal(), or role="dialog" with aria-modal="true".`, '4.1.2'],
        [`Content behind the dialog cannot be read by screen readers or focused while the dialog is open.`, '1.3.2'],
      ]],
      ['Keyboard and focus', [
        [`Opening the dialog moves focus into it, to the title or the first control.`, '2.4.3'],
        [`Tab and Shift+Tab move only between controls inside the dialog.`, '2.4.3'],
        [`Escape closes the dialog, and so does a visible close button.`, '2.1.1'],
        [`Closing returns focus to the control that opened the dialog.`, '2.4.3'],
      ]],
      ['Visual', [
        [`The dialog fits at 320 pixels wide and 200% zoom, and scrolls inside itself if needed.`, '1.4.10'],
        [`The close button is at least 24 × 24 CSS pixels and has an accessible name.`, '2.5.8 1.1.1'],
      ]],
    ],
    affects: [
      ['blind', `If focus stays behind the dialog, screen reader users may not know it opened at all.`],
      ['motor', `Keyboard users can get lost on the page behind if focus is not kept inside the dialog.`],
      ['low-vision', `Dialogs that do not fit at high zoom can hide their buttons off-screen.`],
      ['cognitive', `A clear title and obvious actions help people decide quickly and safely.`],
    ],
  },
  {
    id: 'expander',
    name: 'Expander accordion',
    summary: 'A heading button that shows and hides a section of content, often stacked in a group.',
    groups: [
      ['Name', [
        [`Each trigger has a clear label that describes the hidden content.`, '2.4.6'],
        [`The trigger sits inside a heading at the right level, so it appears in the page’s heading list.`, '1.3.1'],
      ]],
      ['Role', [
        [`The trigger is a button.`, '4.1.2'],
      ]],
      ['State', [
        [`The button exposes expanded or collapsed with aria-expanded, and shows a visual cue such as a rotating chevron.`, '4.1.2 1.3.1'],
      ]],
      ['Keyboard and focus', [
        [`Enter and Space toggle the section.`, '2.1.1'],
        [`Focus stays on the button when the section opens, and the content comes next in Tab order.`, '2.4.3'],
      ]],
      ['Visual', [
        [`The chevron or plus/minus icon meets 3:1 contrast.`, '1.4.11'],
        [`Long accordions offer “Expand all”, so content can be read or searched in one go.`, ''],
      ]],
    ],
    affects: [
      ['blind', `Without an expanded state, screen reader users cannot tell whether anything happened.`],
      ['cognitive', `Breaking long content into sections makes it less overwhelming.`],
      ['low-vision', `Content that opens far from its trigger can be missed when zoomed in.`],
      ['motor', `A large, full-width trigger is easier to hit than a small icon.`],
    ],
  },
  {
    id: 'heading',
    name: 'Heading: h1, h2, h3',
    summary: 'Titles that introduce sections and create the outline of a page.',
    groups: [
      ['Structure', [
        [`Each page has one h1 that describes the page.`, '1.3.1 2.4.6'],
        [`Heading levels follow a logical order without skipping, such as h2 then h3, not h2 then h4.`, '1.3.1'],
        [`Heading levels describe structure, not size. Visual style is set separately.`, '1.3.1'],
      ]],
      ['Content', [
        [`Headings are short and describe the section that follows.`, '2.4.6'],
        [`Text that looks like a heading is marked up as one, and text that is not a heading is not.`, '1.3.1'],
      ]],
      ['Visual', [
        [`Headings stand out by size or weight, not by colour alone.`, '1.4.1'],
        [`Heading text meets 3:1 contrast when large (24px, or 18.66px bold) and 4.5:1 otherwise.`, '1.4.3'],
      ]],
    ],
    affects: [
      ['blind', `Jumping between headings is the most common way screen reader users find content on a page.`],
      ['cognitive', `Descriptive headings let people scan and find the section they need.`],
      ['low-vision', `Clear heading styles help zoomed-in users keep their place in the page.`],
    ],
  },
  {
    id: 'image',
    name: 'Informative image',
    summary: 'An image that conveys information, such as a photo, illustration, diagram or icon with meaning.',
    groups: [
      ['Name', [
        [`Every informative image has alt text that gives the same information as the image, in context.`, '1.1.1'],
        [`Alt text does not start with “Image of” or “Picture of”, because screen readers already announce it is an image.`, ''],
        [`Images of text are avoided. If unavoidable, the alt text contains the same text.`, '1.4.5 1.1.1'],
      ]],
      ['Content', [
        [`Complex images, such as diagrams, have short alt text plus a longer description nearby.`, '1.1.1'],
        [`Images that are links describe the destination, not the picture.`, '2.4.4'],
      ]],
      ['Visual', [
        [`Information in the image does not depend on colour alone.`, '1.4.1'],
        [`Meaningful parts of the image meet 3:1 contrast.`, '1.4.11'],
      ]],
    ],
    affects: [
      ['blind', `Alt text is the only way screen reader users receive what the image shows.`],
      ['low-vision', `Pictures of text blur when zoomed. Real text stays sharp.`],
      ['color', `Images that use colour to show meaning, such as red and green status, may be unreadable.`],
      ['cognitive', `Good images support understanding when they are paired with clear text.`],
    ],
  },
  {
    id: 'figure',
    name: 'Maps, charts & graphics',
    summary: 'Data visualizations, maps and infographics, such as usage charts and outage maps.',
    groups: [
      ['Name', [
        [`The graphic has a title and a short text summary of the key point, such as the trend, peak or total.`, '1.1.1'],
        [`The full data is available as a table or text alternative.`, '1.1.1 1.3.1'],
      ]],
      ['Content', [
        [`Maps that show locations also list them as text, such as an outage list with areas and restore times.`, '1.1.1'],
      ]],
      ['Visual', [
        [`Data series are told apart without colour, using labels, patterns or shapes.`, '1.4.1'],
        [`Lines, bars and map regions meet 3:1 contrast against their background.`, '1.4.11'],
        [`Labels and legends stay readable at 200% zoom.`, '1.4.4'],
      ]],
      ['Keyboard and focus', [
        [`Interactive charts and maps work with the keyboard, and tooltips appear on focus as well as hover.`, '2.1.1 1.4.13'],
        [`Map panning and zooming have buttons as well as drag and pinch.`, '2.5.7 2.5.1'],
      ]],
    ],
    affects: [
      ['blind', `Without a summary and a data table, a chart is a blank space to screen reader users.`],
      ['color', `Red and green series, or colour-coded map regions, can look identical.`],
      ['low-vision', `Thin lines and small labels disappear unless contrast and size are generous.`],
      ['motor', `Drag-only maps cannot be used by keyboard, switch or voice control users.`],
      ['cognitive', `A plain-language summary saves people from interpreting the chart themselves.`],
    ],
  },
  {
    id: 'popover',
    name: 'Popover',
    summary: 'A small panel that opens from a button to show extra content or controls without leaving the page.',
    groups: [
      ['Name', [
        [`The trigger has a clear label, and the popover has an accessible name.`, '4.1.2'],
      ]],
      ['Role', [
        [`The trigger is a button that exposes its expanded state, or uses the native popover attribute.`, '4.1.2'],
      ]],
      ['Keyboard and focus', [
        [`Enter or Space opens the popover. Escape closes it and returns focus to the trigger.`, '2.1.1 2.4.3'],
        [`When the popover has interactive content, focus moves into it, and it comes right after the trigger in reading order.`, '2.4.3 1.3.2'],
      ]],
      ['Behaviour', [
        [`Content that appears on hover or focus can be dismissed without moving the pointer, can be hovered over, and stays until dismissed.`, '1.4.13'],
        [`The popover does not cover the element with keyboard focus.`, '2.4.11'],
      ]],
      ['Visual', [
        [`The popover’s border or shadow separates it from the page with 3:1 contrast.`, '1.4.11'],
      ]],
    ],
    affects: [
      ['low-vision', `Magnifier users may only see the popover, or only the trigger, unless the two sit close together.`],
      ['motor', `Popovers that close when the pointer drifts are hard to use with tremors.`],
      ['blind', `Content that opens at the end of the page is hard to find. It should follow the trigger.`],
      ['cognitive', `Popovers that close unexpectedly make people lose their place.`],
    ],
  },
  {
    id: 'tabs',
    name: 'Tab group',
    summary: 'A set of tabs that switches between panels of related content in the same place.',
    groups: [
      ['Name', [
        [`The tab list has an accessible name, and each tab has a short, unique label.`, '4.1.2 2.4.6'],
        [`Each panel is labelled by its tab.`, '1.3.1'],
      ]],
      ['Role', [
        [`Uses the tablist, tab and tabpanel roles. Tabs that load new pages are links in a nav instead.`, '4.1.2'],
      ]],
      ['State', [
        [`The selected tab has aria-selected="true" and is visually distinct by more than colour, such as an underline.`, '4.1.2 1.4.1'],
      ]],
      ['Keyboard and focus', [
        [`Tab moves to the selected tab, arrow keys move between tabs, and Tab again moves into the panel.`, '2.1.1 2.4.3'],
        [`Home and End move to the first and last tab.`, ''],
      ]],
      ['Visual', [
        [`On small screens tabs wrap or scroll, and labels are never cut off.`, '1.4.10'],
      ]],
    ],
    affects: [
      ['blind', `Screen reader users need to hear “tab, 2 of 3, selected” to understand the pattern.`],
      ['motor', `Arrow-key navigation means users do not have to tab through every tab to reach the content.`],
      ['color', `A selected tab shown only by colour can look the same as the others.`],
      ['cognitive', `Short, distinct tab labels make it clear what each panel contains.`],
    ],
  },
  {
    id: 'video',
    name: 'Video player',
    summary: 'Plays recorded or live video, such as safety explainers or town hall streams.',
    groups: [
      ['Content', [
        [`Pre-recorded video with speech has accurate, synchronized captions.`, '1.2.2'],
        [`Important visual information is described in an audio description track or in the narration.`, '1.2.3 1.2.5'],
        [`Live video has live captions.`, '1.2.4'],
        [`A transcript is available for people who cannot watch or listen.`, '1.2.3'],
      ]],
      ['Behaviour', [
        [`Video does not autoplay with sound. Background video longer than 5 seconds has a pause control.`, '1.4.2 2.2.2'],
        [`The video has no more than 3 flashes in any one second.`, '2.3.1'],
      ]],
      ['Name and keyboard', [
        [`Every player control has an accessible name, works with the keyboard and shows focus.`, '4.1.2 2.1.1 2.4.7'],
        [`Captions can be turned on with a clearly labelled CC button.`, '1.2.2'],
      ]],
      ['Visual', [
        [`Player controls meet 3:1 contrast over every frame of the video.`, '1.4.11'],
      ]],
    ],
    affects: [
      ['deaf', `Without captions, Deaf and hard of hearing viewers miss all spoken content.`],
      ['blind', `Without audio description, blind viewers miss anything shown but not said.`],
      ['seizure', `Flashing footage can trigger seizures in people with photosensitive epilepsy.`],
      ['motor', `Players with mouse-only controls cannot be paused or adjusted by keyboard users.`],
      ['cognitive', `Captions and transcripts help people follow along and review content.`],
    ],
  },

  /* ───────────── Form ───────────── */
  {
    id: 'alert',
    name: 'Alert notification',
    summary: 'A message about an event or outcome, such as an error, a warning, a confirmation or a service update.',
    groups: [
      ['Role', [
        [`Urgent, time-sensitive messages use role="alert". Routine confirmations use role="status".`, '4.1.3'],
        [`The live region exists in the page before the message is added, so screen readers announce it.`, '4.1.3'],
      ]],
      ['Content', [
        [`The message says what happened and what to do next.`, '3.3.1 3.3.3'],
        [`Messages already present when the page loads are not live regions. They are read in normal order.`, '4.1.3'],
      ]],
      ['Behaviour', [
        [`Alerts do not move keyboard focus unless the user must respond to them.`, '4.1.3'],
        [`Alerts that disappear on their own stay at least 20 seconds, or can be found again.`, '2.2.1'],
      ]],
      ['Visual', [
        [`Each type, such as error, warning, success or info, has an icon and a text label, not colour alone.`, '1.4.1'],
        [`Text meets 4.5:1, and icons and borders meet 3:1.`, '1.4.3 1.4.11'],
      ]],
    ],
    affects: [
      ['blind', `Without a live region, screen reader users never learn that a payment failed or succeeded.`],
      ['color', `Red versus green alerts can look identical without icons and words.`],
      ['cognitive', `Messages that explain the next step reduce stress and abandoned tasks.`],
      ['low-vision', `Alerts that appear far from where the user is zoomed in may go unnoticed.`],
    ],
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    summary: 'Lets users select any number of options, or confirm a single choice such as agreeing to terms.',
    groups: [
      ['Name', [
        [`Each checkbox has a visible label, and clicking the label toggles the box.`, '3.3.2 2.5.8'],
        [`A group of checkboxes has a group label, such as a fieldset legend.`, '1.3.1'],
      ]],
      ['Role', [
        [`Uses a native checkbox (input type="checkbox") or role="checkbox".`, '4.1.2'],
      ]],
      ['State', [
        [`Checked, unchecked and mixed states are announced and look different by more than colour, such as a checkmark.`, '4.1.2 1.4.1'],
      ]],
      ['Keyboard and focus', [
        [`Space toggles the checkbox, and focus is clearly visible.`, '2.1.1 2.4.7'],
      ]],
      ['Visual', [
        [`The box border meets 3:1 contrast in both checked and unchecked states.`, '1.4.11'],
        [`Requirements and errors for the group are explained in text.`, '3.3.1 3.3.2'],
      ]],
    ],
    affects: [
      ['blind', `A group label tells screen reader users what question the checkboxes answer.`],
      ['motor', `A clickable label makes the target far larger than the box alone.`],
      ['low-vision', `Faint checkbox borders make unchecked boxes hard to see.`],
      ['color', `A state shown only by fill colour may not be visible.`],
    ],
  },
  {
    id: 'form',
    name: 'Form',
    summary: 'A set of fields that collects information, such as starting service, paying a bill or reporting an issue.',
    groups: [
      ['Structure', [
        [`Related fields are grouped with a heading or a fieldset and legend, such as “Service address”.`, '1.3.1'],
        [`Fields appear in a logical order, and the visual order matches the Tab order.`, '1.3.2 2.4.3'],
      ]],
      ['Content', [
        [`Instructions and format requirements appear before the field, not only in placeholder text.`, '3.3.2'],
        [`Required fields are marked in text, or a note explains the marker used.`, '3.3.2'],
        [`Users are not asked to re-enter information they already gave in the same process.`, '3.3.7'],
      ]],
      ['Errors', [
        [`On a failed submit, an error summary at the top lists each problem and links to the field.`, '3.3.1'],
        [`Each field with an error shows a message beside it that explains how to fix it.`, '3.3.1 3.3.3'],
        [`Payments and other legal or financial submissions can be reviewed, corrected or cancelled before they are final.`, '3.3.4'],
      ]],
      ['Behaviour', [
        [`Changing a field never submits the form or opens a new page without warning.`, '3.2.2'],
        [`Signing in does not require memorizing or retyping a code. Paste and password managers work.`, '3.3.8'],
        [`Session timeouts warn the user and let them extend the time.`, '2.2.1'],
      ]],
    ],
    affects: [
      ['cognitive', `Clear instructions, helpful errors and no repeated typing make forms possible to finish.`],
      ['blind', `An error summary and connected messages tell screen reader users exactly what to fix.`],
      ['motor', `Re-entering data and fighting timeouts is exhausting for people who type slowly.`],
      ['low-vision', `Errors shown only at the top or only in colour are easy to miss when zoomed in.`],
    ],
  },
  {
    id: 'input-number',
    name: 'Number input',
    summary: 'A field for entering numbers, such as a meter reading, an amount or a quantity.',
    groups: [
      ['Name', [
        [`The visible label includes the unit, such as “Meter reading (kWh)” or “Amount ($)”.`, '3.3.2'],
        [`Stepper buttons, if any, are named, such as “Increase amount”.`, '4.1.2'],
      ]],
      ['Role', [
        [`Numbers that are not quantities, such as account numbers and postal codes, use a text input with inputmode="numeric" instead of type="number".`, ''],
        [`Fields for personal data, such as phone numbers, have the correct autocomplete value.`, '1.3.5'],
      ]],
      ['Behaviour', [
        [`Users can type and paste freely. Spaces and separators are accepted rather than blocked.`, ''],
        [`Scrolling the mouse wheel over the field does not change its value by accident.`, ''],
      ]],
      ['Errors', [
        [`The allowed range is explained in a hint before the user types.`, '3.3.2'],
        [`Out-of-range values show a message that states the allowed range.`, '3.3.1 3.3.3'],
      ]],
      ['Visual', [
        [`The input border meets 3:1 contrast, and stepper buttons are at least 24 × 24 CSS pixels.`, '1.4.11 2.5.8'],
      ]],
    ],
    affects: [
      ['cognitive', `Units and ranges in the label prevent mistakes before they happen.`],
      ['motor', `Tiny stepper arrows are hard to hit. Typing should always work.`],
      ['blind', `Native number inputs read some values oddly. The right input type avoids surprises.`],
      ['low-vision', `Faint borders make the field hard to locate in a form.`],
    ],
  },
  {
    id: 'radio',
    name: 'Radio button',
    summary: 'Lets users choose exactly one option from a short list.',
    groups: [
      ['Name', [
        [`The group has a visible question as its label (fieldset legend), and each option has its own label.`, '1.3.1 3.3.2'],
      ]],
      ['Role', [
        [`Uses native radio inputs that share a name, or role="radiogroup" with role="radio".`, '4.1.2'],
      ]],
      ['State', [
        [`The selected option is announced and shown by more than colour, such as a filled dot.`, '4.1.2 1.4.1'],
      ]],
      ['Keyboard and focus', [
        [`Tab moves into the group, and arrow keys move between and select options.`, '2.1.1'],
        [`Selecting an option does not submit the form or change the page.`, '3.2.2'],
      ]],
      ['Visual', [
        [`Radio circles meet 3:1 contrast, and clicking a label selects its option.`, '1.4.11 2.5.8'],
        [`Options are short and do not overlap. More than about 7 options may work better as a select.`, ''],
      ]],
    ],
    affects: [
      ['blind', `Without the group question, screen reader users hear “Yes” or “No” with nothing to answer.`],
      ['motor', `Clickable labels make the target far larger than the small circle.`],
      ['cognitive', `A short list of clearly different options is easier to decide between.`],
      ['color', `A selected state shown only by colour can be missed.`],
    ],
  },
  {
    id: 'select',
    name: 'Select dropdown',
    summary: 'Lets users choose one option from a longer list that opens on demand.',
    groups: [
      ['Name', [
        [`The select has a visible label that is programmatically associated with it.`, '3.3.2 1.3.1'],
      ]],
      ['Role', [
        [`Use a native <select> when possible. Custom dropdowns follow the listbox or combobox pattern with full keyboard support.`, '4.1.2'],
      ]],
      ['State', [
        [`The selected value is visible and announced.`, '4.1.2'],
      ]],
      ['Keyboard and focus', [
        [`Arrow keys move through options, typing a letter jumps to matching options, and Escape closes the list.`, '2.1.1'],
        [`Choosing an option does not navigate away or submit the form automatically.`, '3.2.2'],
      ]],
      ['Visual', [
        [`The select border and the arrow icon meet 3:1 contrast.`, '1.4.11'],
        [`Long option text stays readable when the select is narrow or zoomed.`, '1.4.10'],
      ]],
    ],
    affects: [
      ['blind', `Custom dropdowns often lose their role and selected value for screen reader users.`],
      ['motor', `Keyboard type-ahead makes long lists, such as provinces, quick to use.`],
      ['cognitive', `Selects that navigate on change surprise people and lose their place.`],
      ['low-vision', `Truncated options at high zoom force people to guess.`],
    ],
  },
  {
    id: 'input-text',
    name: 'Text input',
    summary: 'A single-line field for entering text, such as a name, email or address.',
    groups: [
      ['Name', [
        [`Every input has a visible label that stays visible while typing. Placeholder text is not the label.`, '3.3.2 2.4.6'],
        [`The accessible name matches the visible label.`, '2.5.3'],
      ]],
      ['Content', [
        [`Hints are connected to the input with aria-describedby, so they are read with the label.`, '1.3.1'],
        [`Personal data fields use the right autocomplete value, such as “email” or “street-address”.`, '1.3.5'],
      ]],
      ['State', [
        [`Required and invalid states are exposed to assistive technology with required and aria-invalid.`, '4.1.2'],
      ]],
      ['Errors', [
        [`Error messages appear beside the field in text with an icon, and explain how to fix the problem.`, '3.3.1 3.3.3 1.4.1'],
      ]],
      ['Visual', [
        [`The input border meets 3:1 contrast, and hint text meets 4.5:1.`, '1.4.11 1.4.3'],
        [`Focus is clearly visible.`, '2.4.7'],
        [`The field width suggests the expected length of the answer.`, ''],
      ]],
    ],
    affects: [
      ['cognitive', `Placeholder labels disappear when typing starts, so people forget what the field was for.`],
      ['blind', `Unlabelled fields are announced only as “edit text”.`],
      ['motor', `Autocomplete fills details in one step instead of many keystrokes.`],
      ['low-vision', `Light grey placeholder and hint text is often unreadable.`],
    ],
  },
  {
    id: 'textarea',
    name: 'Textarea multiline input',
    summary: 'A multi-line field for longer text, such as describing a problem or leaving feedback.',
    groups: [
      ['Name', [
        [`The textarea has a visible label, and any hint is connected with aria-describedby.`, '3.3.2 1.3.1'],
      ]],
      ['Content', [
        [`Any character limit is stated up front, and a remaining-characters count is announced politely after typing pauses, not on every keystroke.`, '3.3.2 4.1.3'],
      ]],
      ['Behaviour', [
        [`Users can resize the textarea, or it grows with its content.`, ''],
        [`Text is not lost to a session timeout. Users are warned and can extend the time.`, '2.2.1'],
      ]],
      ['Errors', [
        [`Going over the limit shows a text error that says by how much.`, '3.3.1 3.3.3'],
      ]],
      ['Visual', [
        [`The border meets 3:1 contrast, and focus is visible.`, '1.4.11 2.4.7'],
        [`Text inside reflows at high zoom without horizontal scrolling.`, '1.4.10'],
      ]],
    ],
    affects: [
      ['cognitive', `Writing takes longer for many people. Losing text to a timeout is very discouraging.`],
      ['motor', `People who type slowly need time limits they can extend.`],
      ['blind', `A character count that speaks on every keystroke interrupts typing.`],
      ['low-vision', `A small fixed-size box hides most of what the user has written.`],
    ],
  },
  {
    id: 'toggle-switch',
    name: 'Toggle switch',
    summary: 'An on/off control for a setting that takes effect immediately, such as paperless billing.',
    groups: [
      ['Name', [
        [`The switch has a visible label that names the setting, such as “Paperless billing”.`, '3.3.2'],
        [`The label stays the same when the switch toggles. Only the state changes.`, '2.5.3 4.1.2'],
      ]],
      ['Role', [
        [`Uses role="switch", or a checkbox, and exposes on or off.`, '4.1.2'],
      ]],
      ['State', [
        [`On and off look different by more than colour, such as thumb position plus “On”/“Off” text or an icon.`, '1.4.1'],
        [`The switch takes effect immediately. If a Save button is needed, use a checkbox instead.`, '3.2.2'],
      ]],
      ['Keyboard and focus', [
        [`Space toggles the switch, and Enter also works if it is built as a button.`, '2.1.1'],
      ]],
      ['Visual', [
        [`The track and thumb meet 3:1 contrast in both states.`, '1.4.11'],
        [`The target is at least 24 × 24 CSS pixels, and clicking the label also toggles it.`, '2.5.8'],
      ]],
    ],
    affects: [
      ['color', `A green versus grey track is the classic colour-only state that many people cannot read.`],
      ['blind', `Screen reader users need to hear “on” or “off”, not just the label.`],
      ['motor', `Small switches are hard to hit. A clickable label helps.`],
      ['cognitive', `People may not know whether a switch saved. Immediate effect plus confirmation helps.`],
    ],
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    summary: 'A short text hint that appears when a control is hovered or focused.',
    groups: [
      ['Content', [
        [`Tooltips hold short, extra text only. Essential information and interactive content belong on the page or in a popover.`, '1.3.1'],
        [`A tooltip is never the only label for a control.`, '3.3.2'],
      ]],
      ['Name', [
        [`The tooltip is connected to its trigger with aria-describedby, or provides the name for an icon-only button.`, '4.1.2'],
      ]],
      ['Behaviour', [
        [`Appears on keyboard focus as well as hover.`, '2.1.1 1.4.13'],
        [`Can be dismissed with Escape without moving focus or the pointer.`, '1.4.13'],
        [`Stays visible while the pointer moves over it, until the user moves away or dismisses it.`, '1.4.13'],
        [`Touch screen users can reach the same information, for example by tapping an info button.`, ''],
      ]],
      ['Visual', [
        [`Tooltip text meets 4.5:1 contrast, and the tooltip does not cover its trigger.`, '1.4.3 2.4.11'],
      ]],
    ],
    affects: [
      ['low-vision', `Tooltips that vanish when the pointer moves are impossible to read with a magnifier.`],
      ['motor', `Hover-only tooltips exclude keyboard, switch and touch users.`],
      ['blind', `Tooltip text that is not connected to its trigger is never announced.`],
      ['cognitive', `Important instructions hidden in tooltips are easy to miss.`],
    ],
  },

  /* ───────────── Dashboard ───────────── */
  {
    id: 'stat-card',
    name: 'KPI stat card',
    summary: 'A single headline number with its label, change and trend, such as customers affected or average restore time.',
    groups: [
      ['Name', [
        [`The metric label comes before the value in reading order, so screen readers say “Customers affected, 12,480”.`, '1.3.1 1.3.2'],
        [`Values include their unit in text, such as “2 h 14 min” or “1,240 kWh”, not a bare number.`, '1.3.1'],
      ]],
      ['Content', [
        [`Change is described in words, such as “Up 12% from last week”, not only with a coloured arrow.`, '1.4.1 1.1.1'],
        [`Sparklines have a text summary or are hidden from screen readers when the change text already says the same thing.`, '1.1.1'],
        [`Abbreviations such as MWh or SAIDI are spelled out on first use or in a tooltip that works on focus.`, ''],
        [`A “Last updated” time is shown so people know how fresh the number is.`, ''],
      ]],
      ['Behaviour', [
        [`Live-updating values are not announced on every change. Only meaningful changes are announced, politely.`, '4.1.3'],
        [`A clickable card is one link whose name is the metric label.`, '2.4.4'],
      ]],
      ['Visual', [
        [`Value and label text meet 4.5:1 contrast. Good and bad change colours also meet 4.5:1.`, '1.4.3'],
        [`A row of cards wraps to fewer columns on small screens and at 400% zoom.`, '1.4.10'],
      ]],
    ],
    affects: [
      ['blind', `A number with no label or unit read in isolation means nothing.`],
      ['color', `Green-up and red-down arrows are the classic colour-only signal.`],
      ['cognitive', `“Up 12% from last week” is quicker to understand than an arrow and a percentage.`],
      ['low-vision', `Big numbers in pale brand colours are common and often fail contrast.`],
    ],
  },
  {
    id: 'data-table',
    name: 'Data table',
    summary: 'Rows and columns of records, such as active outages, work orders or meter reads, often with sorting and paging.',
    groups: [
      ['Name', [
        [`The table has a caption or heading that says what it contains.`, '1.3.1 2.4.6'],
        [`Column headers include units, such as “Restore time (min)”.`, '1.3.1'],
      ]],
      ['Role', [
        [`Uses a real <table> with <th scope="col"> headers, and row headers where the first cell names the row.`, '1.3.1'],
        [`Tables are only used for data, never for layout.`, '1.3.1'],
      ]],
      ['State', [
        [`Sortable headers are buttons, and the sorted column has aria-sort.`, '4.1.2'],
        [`Row selection checkboxes are named after their row, such as “Select outage OUT-5821”.`, '4.1.2'],
        [`Pagination buttons are named, such as “Next page”, and the current page is identified.`, '4.1.2 1.3.1'],
      ]],
      ['Keyboard and focus', [
        [`Wide tables scroll inside a focusable, labelled region instead of making the whole page scroll sideways.`, '2.1.1 1.4.10'],
        [`Sticky table headers never cover the focused row.`, '2.4.11'],
      ]],
      ['Content', [
        [`Empty cells say “None” or “No data” rather than being blank.`, ''],
        [`Status cells use text, with optional icons, not a colour alone.`, '1.4.1'],
        [`Sorting, filtering and paging results are announced, such as “Sorted by restore time, longest first”.`, '4.1.3'],
      ]],
    ],
    affects: [
      ['blind', `Header associations let screen readers announce each cell with its column, so data stays meaningful.`],
      ['low-vision', `Dense tables at high zoom are only usable if they scroll in their own region.`],
      ['motor', `Large tables need efficient keyboard paths: sortable headers and paging, not endless tabbing.`],
      ['cognitive', `Units in headers and words for statuses reduce the effort of reading rows.`],
    ],
  },
  {
    id: 'status-badge',
    name: 'Status badge',
    summary: 'A short label that shows the state of something, such as Outage, Crew assigned or Restored.',
    groups: [
      ['Content', [
        [`The status is always written as text. A coloured dot alone is never the status.`, '1.4.1'],
        [`The same status always uses the same word and style across the dashboard.`, '3.2.4'],
      ]],
      ['Name', [
        [`Icons inside a badge are decorative when the text says the same thing.`, '1.1.1'],
      ]],
      ['Role', [
        [`Badges are static text. A badge that filters content is a toggle button with aria-pressed.`, '4.1.2'],
      ]],
      ['Behaviour', [
        [`Status changes on a live screen are announced through a polite status message.`, '4.1.3'],
      ]],
      ['Visual', [
        [`Badge text meets 4.5:1 against the badge fill.`, '1.4.3'],
        [`Statuses differ by icon or shape as well as colour, so they can be told apart in greyscale.`, '1.4.1'],
      ]],
    ],
    affects: [
      ['color', `Red, amber and green dots are indistinguishable for many people.`],
      ['blind', `A coloured dot has no text for a screen reader to announce.`],
      ['cognitive', `Consistent status words make a busy dashboard quicker to scan.`],
      ['low-vision', `Small badges with pale fills are easy to misread.`],
    ],
  },
  {
    id: 'filter-bar',
    name: 'Filters & date range',
    summary: 'Controls that narrow what a dashboard shows, such as region, status and a date range.',
    groups: [
      ['Name', [
        [`Every filter has a visible label, such as “Region” or “Date range”.`, '3.3.2'],
        [`The filter group has an accessible name, such as “Filter outages”.`, '1.3.1'],
      ]],
      ['Behaviour', [
        [`Changing a filter updates results without moving focus or reloading the page unexpectedly.`, '3.2.2'],
        [`The new result count is announced, such as “Showing 37 outages”.`, '4.1.3'],
        [`Applied filters appear as removable chips named “Remove filter: North region”, with a “Clear all filters” button.`, '4.1.2'],
      ]],
      ['Keyboard and focus', [
        [`All filters, including date pickers, work with the keyboard.`, '2.1.1'],
        [`Dates can be typed in a stated format, such as YYYY-MM-DD, as well as picked from a calendar.`, '3.3.2'],
      ]],
      ['Visual', [
        [`On small screens filters collapse behind a “Filters” button that shows how many are applied.`, '1.4.10'],
        [`Control borders meet 3:1 contrast, and focus is visible.`, '1.4.11 2.4.7'],
      ]],
    ],
    affects: [
      ['blind', `Without a count announcement, screen reader users do not know whether the filter worked.`],
      ['cognitive', `Visible applied filters explain why the data looks the way it does.`],
      ['motor', `Calendar-only date pickers can take dozens of keystrokes. Typing a date is one step.`],
      ['low-vision', `A long row of filters overflows at high zoom unless it collapses.`],
    ],
  },
  {
    id: 'loading-state',
    name: 'Loading & empty states',
    summary: 'What a screen shows while data loads, when there is nothing to show, or when loading fails.',
    groups: [
      ['Behaviour', [
        [`Loading is announced once, such as “Loading outage data”, and completion is announced when content appears.`, '4.1.3'],
        [`Focus does not jump when content finishes loading.`, '2.4.3'],
        [`Long loads show a progress bar with role="progressbar" and a current value when progress is known.`, '4.1.2'],
      ]],
      ['Visual', [
        [`Skeletons and spinners do not flash, and their pulsing stops when reduced motion is set.`, '2.3.1 2.3.3'],
        [`Placeholder shapes are hidden from screen readers.`, '1.1.1'],
      ]],
      ['Content', [
        [`Empty states explain why there is no data and what to do next, such as “No outages in North region. Try All regions.”`, ''],
        [`Errors say what failed and offer a Retry button.`, '3.3.1'],
      ]],
    ],
    affects: [
      ['blind', `Without announcements, a screen reader user hears silence and cannot tell loading from broken.`],
      ['cognitive', `Clear empty and error states prevent confusion about whether something went wrong.`],
      ['vestibular', `Constantly pulsing skeletons can be uncomfortable without a reduced-motion option.`],
      ['low-vision', `A spinner far from the user’s zoomed-in view is easy to miss.`],
    ],
  },

  /* ───────────── Footer ───────────── */
  {
    id: 'footer',
    name: 'Footer landmark',
    summary: 'The section at the bottom of every page with secondary links, contact details and legal text.',
    groups: [
      ['Role', [
        [`The site footer is a contentinfo landmark: a <footer> not inside article, aside, main, nav or section, or role="contentinfo". There is only one per page.`, '1.3.1'],
      ]],
      ['Content', [
        [`Footer links are in a nav landmark with a unique name, such as “Footer”.`, '1.3.1 2.4.6'],
        [`Contact and help links appear in the same place on every page.`, '3.2.6'],
      ]],
      ['Visual', [
        [`Small copyright and legal text still meets 4.5:1 contrast.`, '1.4.3'],
        [`Footer links are at least 24 × 24 CSS pixels or well spaced, and are identifiable as links.`, '2.5.8 1.4.1'],
        [`At narrow widths, footer columns stack into one.`, '1.4.10'],
      ]],
    ],
    affects: [
      ['blind', `The contentinfo landmark lets screen reader users jump straight to contact and legal links.`],
      ['cognitive', `Help in the same place on every page is easy to find when people are stuck.`],
      ['low-vision', `Footer text is often the smallest and palest on the page.`],
      ['motor', `Tightly packed footer links are easy to mis-tap.`],
    ],
  },
];

export const COMPONENTS = RAW.map((c) => ({
  id: c.id,
  name: c.name,
  summary: c.summary,
  groups: c.groups.map(([name, items], gi) => ({
    name,
    items: items.map(([text, sc], ii) => ({
      key: `${c.id}.${gi}.${ii}`,
      text,
      sc: sc ? sc.split(' ') : [],
    })),
  })),
  affects: c.affects.map(([id, why]) => ({ id, why })),
}));

const BY_ID = new Map(COMPONENTS.map((c) => [c.id, c]));
export const getComponent = (id) => BY_ID.get(id);

// WCAG 2.2 success criteria referenced by the checklists.
// Summaries are plain-language paraphrases. The W3C "Understanding" pages are the authority.

export const PRINCIPLES = [
  { id: '1', name: 'Perceivable', blurb: 'People can perceive the content, whatever senses they use.' },
  { id: '2', name: 'Operable', blurb: 'People can operate the interface, whatever input they use.' },
  { id: '3', name: 'Understandable', blurb: 'People can understand the content and how the interface behaves.' },
  { id: '4', name: 'Robust', blurb: 'Content works reliably with browsers and assistive technology.' },
];

const RAW = [
  ['1.1.1', 'Non-text Content', 'A', 'non-text-content', 'Images, icons and other non-text content have a text alternative that serves the same purpose. Purely decorative content is hidden from assistive technology.'],
  ['1.2.1', 'Audio-only and Video-only (Prerecorded)', 'A', 'audio-only-and-video-only-prerecorded', 'Pre-recorded audio has a transcript. Pre-recorded video with no sound has a text or audio description.'],
  ['1.2.2', 'Captions (Prerecorded)', 'A', 'captions-prerecorded', 'Pre-recorded video with sound has accurate, synchronized captions.'],
  ['1.2.3', 'Audio Description or Media Alternative (Prerecorded)', 'A', 'audio-description-or-media-alternative-prerecorded', 'Pre-recorded video has audio description or a full text alternative of what is shown.'],
  ['1.2.4', 'Captions (Live)', 'AA', 'captions-live', 'Live video with sound has live captions.'],
  ['1.2.5', 'Audio Description (Prerecorded)', 'AA', 'audio-description-prerecorded', 'Important visual information in pre-recorded video is described in audio.'],
  ['1.3.1', 'Info and Relationships', 'A', 'info-and-relationships', 'Structure that is shown visually, such as headings, lists, tables, labels and groups, is also available in code.'],
  ['1.3.2', 'Meaningful Sequence', 'A', 'meaningful-sequence', 'The reading order in code matches the order that makes sense visually.'],
  ['1.3.4', 'Orientation', 'AA', 'orientation', 'Content works in both portrait and landscape unless one orientation is essential.'],
  ['1.3.5', 'Identify Input Purpose', 'AA', 'identify-input-purpose', 'Fields that collect personal information declare their purpose, so browsers and tools can fill them in.'],
  ['1.4.1', 'Use of Color', 'A', 'use-of-color', 'Colour is never the only way information, actions or states are shown.'],
  ['1.4.2', 'Audio Control', 'A', 'audio-control', 'Audio that plays automatically for more than 3 seconds can be paused, stopped or muted.'],
  ['1.4.3', 'Contrast (Minimum)', 'AA', 'contrast-minimum', 'Text has at least 4.5:1 contrast with its background, or 3:1 for large text.'],
  ['1.4.4', 'Resize Text', 'AA', 'resize-text', 'Text can be resized to 200% without losing content or function.'],
  ['1.4.5', 'Images of Text', 'AA', 'images-of-text', 'Real text is used instead of pictures of text, except for logos.'],
  ['1.4.10', 'Reflow', 'AA', 'reflow', 'Content fits a screen 320 CSS pixels wide without scrolling in two directions.'],
  ['1.4.11', 'Non-text Contrast', 'AA', 'non-text-contrast', 'Controls, their states and meaningful graphics have at least 3:1 contrast against adjacent colours.'],
  ['1.4.12', 'Text Spacing', 'AA', 'text-spacing', 'Nothing breaks when users increase line, paragraph, letter and word spacing.'],
  ['1.4.13', 'Content on Hover or Focus', 'AA', 'content-on-hover-or-focus', 'Content that appears on hover or focus can be dismissed, can be hovered over, and stays until the user moves away.'],
  ['2.1.1', 'Keyboard', 'A', 'keyboard', 'Everything works with a keyboard alone.'],
  ['2.2.1', 'Timing Adjustable', 'A', 'timing-adjustable', 'Users can turn off, adjust or extend time limits.'],
  ['2.2.2', 'Pause, Stop, Hide', 'A', 'pause-stop-hide', 'Content that moves, blinks, scrolls or updates automatically can be paused, stopped or hidden.'],
  ['2.3.1', 'Three Flashes or Below Threshold', 'A', 'three-flashes-or-below-threshold', 'Nothing flashes more than three times in any one second.'],
  ['2.3.3', 'Animation from Interactions', 'AAA', 'animation-from-interactions', 'Motion triggered by interaction can be turned off, unless the motion is essential.'],
  ['2.4.1', 'Bypass Blocks', 'A', 'bypass-blocks', 'There is a way to skip blocks of content that repeat on every page.'],
  ['2.4.2', 'Page Titled', 'A', 'page-titled', 'Each page or screen has a title that describes its topic or purpose.'],
  ['2.4.3', 'Focus Order', 'A', 'focus-order', 'Keyboard focus moves in an order that keeps meaning and makes the interface usable.'],
  ['2.4.4', 'Link Purpose (In Context)', 'A', 'link-purpose-in-context', 'The purpose of each link is clear from its text, or from its text plus the surrounding sentence or list item.'],
  ['2.4.5', 'Multiple Ways', 'AA', 'multiple-ways', 'There is more than one way to find a page, such as navigation, search or a site map.'],
  ['2.4.6', 'Headings and Labels', 'AA', 'headings-and-labels', 'Headings and labels describe their topic or purpose.'],
  ['2.4.7', 'Focus Visible', 'AA', 'focus-visible', 'Keyboard focus is always visible.'],
  ['2.4.11', 'Focus Not Obscured (Minimum)', 'AA', 'focus-not-obscured-minimum', 'The focused element is never completely hidden by other content, such as sticky headers or popovers.'],
  ['2.5.1', 'Pointer Gestures', 'A', 'pointer-gestures', 'Multi-finger or path-based gestures have a single-pointer alternative, such as a button.'],
  ['2.5.3', 'Label in Name', 'A', 'label-in-name', 'A control’s accessible name includes the text of its visible label.'],
  ['2.5.7', 'Dragging Movements', 'AA', 'dragging-movements', 'Anything done by dragging can also be done with single clicks or taps.'],
  ['2.5.8', 'Target Size (Minimum)', 'AA', 'target-size-minimum', 'Pointer targets are at least 24 by 24 CSS pixels, or have enough space around them.'],
  ['3.1.1', 'Language of Page', 'A', 'language-of-page', 'The default language of each page is set in code.'],
  ['3.2.2', 'On Input', 'A', 'on-input', 'Changing a setting does not cause an unexpected change, such as submitting a form or opening a new page.'],
  ['3.2.3', 'Consistent Navigation', 'AA', 'consistent-navigation', 'Navigation that repeats across pages appears in the same relative order.'],
  ['3.2.4', 'Consistent Identification', 'AA', 'consistent-identification', 'Components with the same function are labelled consistently across pages.'],
  ['3.2.6', 'Consistent Help', 'A', 'consistent-help', 'Help, such as contact details or a chat link, appears in the same relative place on each page.'],
  ['3.3.1', 'Error Identification', 'A', 'error-identification', 'Input errors are detected, the field is identified, and the error is described in text.'],
  ['3.3.2', 'Labels or Instructions', 'A', 'labels-or-instructions', 'Labels or instructions are provided wherever users enter information.'],
  ['3.3.3', 'Error Suggestion', 'AA', 'error-suggestion', 'When an error is detected and a fix is known, the fix is suggested to the user.'],
  ['3.3.4', 'Error Prevention (Legal, Financial, Data)', 'AA', 'error-prevention-legal-financial-data', 'Submissions with legal or financial consequences can be reviewed, corrected, confirmed or reversed.'],
  ['3.3.7', 'Redundant Entry', 'A', 'redundant-entry', 'Information already entered in the same process is filled in automatically or available to select.'],
  ['3.3.8', 'Accessible Authentication (Minimum)', 'AA', 'accessible-authentication-minimum', 'Signing in does not depend on remembering or transcribing something unless paste, password managers or another method is supported.'],
  ['4.1.2', 'Name, Role, Value', 'A', 'name-role-value', 'Every control exposes its name, role, state and value to assistive technology.'],
  ['4.1.3', 'Status Messages', 'AA', 'status-messages', 'Status messages are announced by assistive technology without moving focus.'],
];

export const WCAG = RAW.map(([id, name, level, slug, summary]) => ({
  id,
  name,
  level,
  summary,
  principle: id.split('.')[0],
  url: `https://www.w3.org/WAI/WCAG22/Understanding/${slug}.html`,
}));

const BY_ID = new Map(WCAG.map((sc) => [sc.id, sc]));
export const getSc = (id) => BY_ID.get(id);

export function compareSc(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i += 1) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
}

export const scAnchor = (id) => `sc-${id.replace(/\./g, '-')}`;

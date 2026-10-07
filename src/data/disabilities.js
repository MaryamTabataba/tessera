// Disability groups. Each component explains why it matters to specific groups.

export const DISABILITIES = [
  {
    id: 'blind',
    name: 'Blind and screen reader users',
    short: 'Screen reader',
    description:
      'People who are blind or have very little sight use screen readers that speak the page aloud or send it to a braille display. They move through a page by headings, landmarks, links and form fields rather than by looking at it.',
    tech: ['JAWS', 'NVDA', 'VoiceOver (macOS and iOS)', 'TalkBack (Android)', 'Refreshable braille displays'],
    needs: [
      'Every control has a meaningful name, role and state',
      'Reading and focus order follows the visual order',
      'Changes on the page are announced',
    ],
  },
  {
    id: 'low-vision',
    name: 'Low vision',
    short: 'Low vision',
    description:
      'People with partial sight enlarge text, zoom the page, or use magnifiers that show only a small part of the screen at a time. Many rely on high contrast and on layouts that reflow instead of scrolling sideways.',
    tech: ['Browser and OS zoom', 'Screen magnifiers such as ZoomText', 'Large text settings and Dynamic Type', 'High-contrast and forced-colours modes'],
    needs: [
      'Strong contrast for text, controls and focus',
      'Layouts that reflow at 200% to 400% zoom',
      'Related content kept close together',
    ],
  },
  {
    id: 'color',
    name: 'Colour vision deficiency',
    short: 'Colour vision',
    description:
      'Roughly 1 in 12 men and 1 in 200 women have some form of colour blindness, most often trouble telling red from green. Anything shown by colour alone, such as a red error border, can be invisible to them.',
    tech: ['Usually no assistive technology', 'Some use colour filters built into the OS'],
    needs: [
      'Text, icons or patterns alongside colour',
      'Underlined links in body text',
      'Charts that use labels or patterns, not only colour',
    ],
  },
  {
    id: 'deaf',
    name: 'Deaf and hard of hearing',
    short: 'Deaf',
    description:
      'People who are Deaf or hard of hearing rely on captions, transcripts and visual alternatives to sound. For some Deaf people, a sign language is their first language and written English is a second language.',
    tech: ['Captions and subtitles', 'Transcripts', 'Hearing aids and cochlear implants', 'Sign language interpretation'],
    needs: [
      'Accurate captions on all video with speech',
      'Transcripts for audio',
      'No information conveyed by sound alone',
    ],
  },
  {
    id: 'motor',
    name: 'Motor and mobility',
    short: 'Motor',
    description:
      'People with limited dexterity, tremors, paralysis or repetitive strain may use only a keyboard, switch devices, voice control, eye tracking or a head pointer. Small targets, precise gestures and drag-only actions can be hard or impossible.',
    tech: ['Keyboard only', 'Switch access', 'Voice Control and Dragon', 'Eye tracking', 'Head or mouth pointers'],
    needs: [
      'Everything works by keyboard',
      'Large, well-spaced targets',
      'Simple alternatives to gestures and dragging',
    ],
  },
  {
    id: 'cognitive',
    name: 'Cognitive, learning and neurodivergent',
    short: 'Cognitive',
    description:
      'Includes people with learning disabilities, ADHD, autism, dyslexia, memory loss or brain injury, as well as anyone tired, stressed or distracted, such as a customer reporting an outage at night on their phone.',
    tech: ['Text-to-speech readers', 'Reading and focus tools', 'Spelling and grammar aids', 'Reminders and password managers'],
    needs: [
      'Plain language and clear labels',
      'Consistent layouts and predictable behaviour',
      'Forgiving forms with helpful errors',
    ],
  },
  {
    id: 'vestibular',
    name: 'Vestibular disorders',
    short: 'Vestibular',
    description:
      'Inner-ear and balance conditions can make on-screen motion, such as parallax scrolling, zooming and large sliding transitions, cause dizziness, nausea, migraines or loss of balance.',
    tech: ['Reduce motion settings in the operating system'],
    needs: [
      'Respect the reduced-motion setting',
      'No large movement the user did not ask for',
      'A way to pause anything that moves',
    ],
  },
  {
    id: 'seizure',
    name: 'Photosensitive seizure risk',
    short: 'Seizure',
    description:
      'Flashing content, especially saturated red flashes more than 3 times a second, can trigger seizures in people with photosensitive epilepsy. There is no assistive technology for this, so prevention in design is the only protection.',
    tech: ['None: prevention is the only protection'],
    needs: [
      'No more than 3 flashes in any one second',
      'No large areas of rapidly changing colour',
      'Warnings before unavoidable flashing content',
    ],
  },
];

const BY_ID = new Map(DISABILITIES.map((d) => [d.id, d]));
export const getDisability = (id) => BY_ID.get(id);
export const disabilityAnchor = (id) => `dis-${id}`;

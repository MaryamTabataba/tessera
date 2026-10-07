// Front-end standards: how the team designs in Figma and hands off to development.
// Section shapes: { title, intro?, list?: [text], steps?: [[title, text]], table?: { head: [...], rows: [[...]] }, example?: [text] }

export const STANDARDS_VERSION = '1.0 · proposed';

export const STANDARDS = [
  {
    id: 'figma',
    label: 'Figma',
    summary: 'How every Figma file is structured, named and themed, so any designer or developer can open any file and find their way.',
    sections: [
      {
        title: 'Libraries and files',
        list: [
          'One shared library file, “Tessera Core”, holds every component and the colour, spacing and type variables. Nobody builds components in project files.',
          'Each client brand is a mode of the same variables, not a separate library. Switching mode re-themes a whole screen, exactly like the brand picker in this playbook.',
          'One project file per client feature, such as “Northgrid · Outage reporting”. Project files only use library components.',
          'Every project file has the same pages, in this order: Cover, Explorations, Ready for dev, Archive.',
        ],
      },
      {
        title: 'Naming',
        intro: 'Names describe what something is, not how it looks. A developer should be able to search for it.',
        table: {
          head: ['What', 'Pattern', 'Example'],
          rows: [
            ['Component', 'Category / Component', 'Form / Text input'],
            ['Variant property', 'Property=Value', 'State=Error, Size=Medium'],
            ['Screen frame', 'Screen – Breakpoint – State', 'Outage list – 320 – Empty'],
            ['Layer', 'Role, never “Frame 12”', 'Error summary'],
            ['Colour variable', 'Matches the playbook role', 'color/primary, color/on-primary'],
          ],
        },
      },
      {
        title: 'Variables and styles',
        list: [
          'Colour: one collection named “Brand” with a variable for every colour role in the playbook (primary, onPrimary, surface, border, focus…) and one mode per brand: Tessera default, Northgrid, Lakeshore, Summit.',
          'Designs never use raw hex values. If a colour is not a variable, it is not on brand.',
          'Spacing: a 4px scale (4, 8, 12, 16, 24, 32, 48). Radius: the brand radius variable.',
          'Text styles: Display, Heading 1, Heading 2, Heading 3, Body, Small. Body is never smaller than 16px.',
          'Import each brand with the “Export for Figma” file below: in the Variables panel, right-click the Brand collection and import one file per mode. The number of modes per collection depends on the Figma plan, so confirm the plan supports one mode per client.',
        ],
      },
      {
        title: 'Components',
        list: [
          'Built with auto layout so they resize with their content and with larger text.',
          'Every interactive component has these states: Default, Hover, Focus, Pressed, Disabled, and Error where it applies. A component without a focus state is not finished.',
          'Touch targets are at least 44 × 44px.',
          'Use component properties for text, icons and booleans instead of extra variants.',
          'Never detach an instance. If the component cannot do what you need, ask the library owner for a change.',
        ],
      },
      {
        title: 'Accessibility annotations',
        intro: 'Developers cannot see intent in a picture. Every “Ready for dev” frame is annotated with:',
        list: [
          'Heading levels (h1, h2, h3) and landmarks (header, nav, main, footer).',
          'Focus order, numbered, including where focus goes when a dialog opens and closes.',
          'Accessible names for icon-only buttons, and alt text for informative images (or “decorative”).',
          'What is announced when content changes, such as “Showing 37 outages”.',
          'Responsive frames at 320, 768 and 1280 wide, and the empty, loading and error states.',
          'Colour pairings checked on the component’s Branding tab before handoff.',
        ],
      },
      {
        title: 'Handoff and versioning',
        list: [
          'A frame moves to the “Ready for dev” page only when it meets the Definition of Ready (see Workflow). If the team’s plan includes Dev Mode, mark it Ready for development there too.',
          'The ticket links to the exact frame, not the file, and includes the acceptance criteria copied from this playbook.',
          'Library updates are published with a one-line description of what changed and why. Breaking changes are announced in the team channel first.',
          'Large library changes are made in a branch if the Figma plan supports branching; otherwise in a duplicate file that is merged by the library owner.',
        ],
      },
    ],
  },
  {
    id: 'workflow',
    label: 'Workflow',
    summary: 'The same path for every piece of UI work, with a clear owner and exit check at each stage.',
    sections: [
      {
        title: 'Stages',
        table: {
          head: ['Stage', 'Owner', 'Done when'],
          rows: [
            ['1. Define', 'Product owner', 'The story names the components involved and the client brand.'],
            ['2. Design', 'Designer', 'All states and breakpoints are designed with library components and annotated.'],
            ['3. Design review', 'Front-end lead', 'Brand contrast passes and the Definition of Ready is met.'],
            ['4. Build', 'Developer', 'Acceptance criteria are checked off in the pull request.'],
            ['5. QA', 'QA', 'Keyboard and screen reader passes are done and the Definition of Done is met.'],
            ['6. Release', 'Front-end lead', 'Changelog updated; new patterns are added to the playbook.'],
          ],
        },
      },
      {
        title: 'Definition of Ready (a UI story can start)',
        list: [
          'Linked Figma frame on the “Ready for dev” page, annotated for accessibility.',
          'Acceptance criteria copied from this playbook into the story, with the brand specs included.',
          'Client brand chosen, and every colour pairing passes on the Branding tab.',
          'Empty, loading, error and success states are designed.',
          'Final copy is written. No lorem ipsum.',
        ],
      },
      {
        title: 'Definition of Done (a UI story can ship)',
        list: [
          'Every acceptance criterion is checked off.',
          'Keyboard-only walkthrough passes: logical order, visible focus, no traps.',
          'Screen reader pass with NVDA or VoiceOver on the main flow.',
          'Automated check (axe or Lighthouse) reports zero critical issues.',
          'Works at 320px wide and at 200% zoom.',
          'Designer has compared the build with the Figma frame and signed off.',
        ],
      },
      {
        title: 'Rituals',
        list: [
          'Weekly 30-minute design review: walk through work moving to “Ready for dev”.',
          'Fortnightly 15-minute library sync: what changed in Figma and in code, and what is next.',
          'Monthly accessibility spot check of one live screen, tracked as a ticket.',
        ],
      },
    ],
  },
];

/** Markdown / Jira / plain text for one standards tab. */
export function standardsText(tab, format = 'md') {
  const md = format === 'md';
  const jira = format === 'jira';
  const out = [md ? `# ${tab.label} standards` : jira ? `h2. ${tab.label} standards` : `${tab.label.toUpperCase()} STANDARDS`, tab.summary];
  tab.sections.forEach((s) => {
    out.push('', md ? `## ${s.title}` : jira ? `h3. ${s.title}` : s.title);
    if (s.intro) out.push(s.intro);
    s.list?.forEach((t) => out.push(`${jira ? '*' : md ? '- [ ]' : '-'} ${t}`));
    s.steps?.forEach(([t, b], i) => out.push(`${jira ? '#' : `${i + 1}.`} ${t}: ${b}`));
    if (s.table) {
      if (md) {
        out.push(`| ${s.table.head.join(' | ')} |`, `| ${s.table.head.map(() => '---').join(' | ')} |`);
        s.table.rows.forEach((r) => out.push(`| ${r.join(' | ')} |`));
      } else if (jira) {
        out.push(`|| ${s.table.head.join(' || ')} ||`);
        s.table.rows.forEach((r) => out.push(`| ${r.join(' | ')} |`));
      } else {
        s.table.rows.forEach((r) => out.push(`- ${r.join(' · ')}`));
      }
    }
  });
  return out.join('\n');
}

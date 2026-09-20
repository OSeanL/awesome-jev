const en = {
  seo: {
    title: (projects: number) => `${projects} Jev AI Projects, SDKs & Tools | bestjev`,
    description: (projects: number) => `Search ${projects} open-source projects, SDKs, agents, integrations, benchmarks, and tools built around Jev, TypeSafe AI's System One model.`,
    catalogName: 'bestjev Open-Source Project Catalog',
    alternateName: 'Awesome Jev Open-Source Project Catalog',
    imageAlt: (projects: number, categories: number) => `${projects} verified open-source Jev projects across ${categories} categories`,
  },
  nav: {
    close: 'Close navigation', primary: 'Primary navigation', overview: 'Overview', allProjects: 'All projects', aboutBestjev: 'About bestjev', aboutJev: 'About Jev',
    categories: 'Categories', projectCategories: 'Project categories', collaborate: 'Submit & collaborate', collaborateLabel: 'Submit and collaborate',
    submit: 'Submit', email: 'Email', promote: 'Promote your project', open: 'Open navigation', language: 'Language',
  },
  hero: {
    title: 'Best Jev Projects',
    summary: (projects: number, categories: number, languages: number) => `Search ${projects} verified repositories across ${categories} categories and ${languages} languages.`,
    lastUpdated: 'Last updated', updatedDate: 'September 20, 2026', filterLanguage: 'Filter by language', allLanguages: 'All languages', languages: 'Languages',
    searchPlaceholder: 'Search projects, languages, or decisions', imageAlt: 'Structured inputs flow through Jev into probabilistic decisions',
  },
  catalog: {
    all: 'All', project: 'Project', stars: 'Stars', language: 'Language', description: 'Description', projectsLabel: 'Jev projects',
    sortAscending: 'Sort by stars ascending', sortDescending: 'Sort by stars descending', noMatches: 'No matching projects',
    noMatchesHint: 'Try another keyword or category.', showMore: 'Show more projects',
  },
  siteIntro: {
    eyebrow: 'About the catalog',
    title: 'What is bestjev?',
    paragraphs: [
      "bestjev is an independent, community-maintained directory of open-source projects built around Jev, TypeSafe AI's System One model for typed decisions.",
      'Each listing links to its original repository and records its category, primary language, GitHub star snapshot, and a localized description, helping developers find verifiable Jev SDKs, agents, integrations, applications, research, and tools.',
      'bestjev is not affiliated with or endorsed by TypeSafe AI.',
    ],
  },
  about: {
    title: 'What is Jev?',
    paragraphs: [
      "Jev is TypeSafe AI's System One model for decisions that software needs to consume. Instead of generating free-form prose, it accepts a state and one or more typed questions, then returns structured answers with calibrated probabilities.",
      'It fits workflows where the option space or scoring rubric is known in advance: routing an agent, validating a tool call, ranking candidates, checking a policy, or deciding whether an action should proceed.',
    ],
    advantage: 'Operational advantage',
    advantageText: 'Applications can set deterministic thresholds, inspect uncertainty, and route low-confidence cases to a person or a larger model.',
    primitives: [
      { code: 'CHOICE', title: 'Pick one option', description: 'Select from a known set and return probabilities with confidence.' },
      { code: 'SCORE', title: 'Rate on a rubric', description: 'Place an input on an ordered scale with a full distribution.' },
      { code: 'NOUL', title: 'Estimate truth', description: 'Return the probability that a statement is true, from zero to one.' },
    ],
  },
  methodology: {
    title: 'How is this catalog verified?',
    intro: 'Each entry is checked against public evidence: the upstream repository, project-authored documentation, and visible Jev usage. Stars are a dated discovery snapshot, not a quality ranking.',
    curatedBy: 'Curated by', quote: '“Think of Jev as a frontier-intelligence function call: unstructured state in, typed probabilistic decisions out.”',
    quoteSource: 'TypeSafe AI, introducing Jev', sourcesTitle: 'Which sources does bestjev use?',
    officialDocs: 'Official Jev documentation', officialDocsSuffix: ' for product concepts and primitives.',
    repositories: 'Public GitHub repositories', repositoriesSuffix: ' for implementation evidence and metadata.',
    catalogData: 'Machine-readable catalog data', catalogDataSuffix: ' for reproducible project records.',
  },
  footer: { label: 'Site information', about: 'About', contact: 'Contact', privacy: 'Privacy', terms: 'Terms', docs: 'Jev docs' },
} as const;

type DeepWiden<T> = T extends (...args: infer Args) => infer Result
  ? (...args: Args) => Result
  : T extends string ? string
  : T extends readonly unknown[] ? { readonly [Key in keyof T]: DeepWiden<T[Key]> }
  : T extends object ? { readonly [Key in keyof T]: DeepWiden<T[Key]> }
  : T;

export type Messages = DeepWiden<typeof en>;
export default en;

import type { Locale } from './config';

type ChangelogCopy = {
  navLabel: string;
  pageTitle: string;
  pageDescription: string;
  heroTitle: string;
  heroSummary: string;
  contextLabel: string;
  contextHeading: string;
  contextSummary: string;
  sourceSummary: string;
  sourceLink: string;
  bylineLabel: string;
  dayCount: (days: number) => string;
  projectCount: (projects: number) => string;
  additions: string;
  latest: string;
  githubCta: string;
  githubTitle: string;
  timelineLabel: string;
};

const changelogMessages = {
  en: {
    navLabel: 'Changelog',
    pageTitle: 'Jev Project Changelog & Daily Additions | bestjev',
    pageDescription: 'Track verified open-source Jev projects added to bestjev each day, including categories, GitHub repositories, star counts, languages, and update dates.',
    heroTitle: 'Catalog Changelog',
    heroSummary: 'A daily, source-backed record of every project added to the bestjev catalog.',
    contextLabel: 'About this record',
    contextHeading: 'What does the bestjev changelog record?',
    contextSummary: 'bestjev records every verified open-source Jev project added to the catalog. Each entry preserves its addition date, category, language, current GitHub star count, and repository URL so the source can be checked.',
    sourceSummary: 'The canonical machine-generated record is published in the public GitHub repository as',
    sourceLink: 'CHANGELOG.md',
    bylineLabel: 'Maintained by',
    dayCount: (days) => `${days} update days`,
    projectCount: (projects) => `${projects} projects recorded`,
    additions: 'additions',
    latest: 'Latest',
    githubCta: 'View CHANGELOG.md on GitHub',
    githubTitle: 'Open the generated changelog in the GitHub repository',
    timelineLabel: 'Daily catalog additions',
  },
  zh: {
    navLabel: '更新日志',
    pageTitle: 'Jev 开源项目更新日志与每日新增记录 | bestjev',
    pageDescription: '查看 bestjev 每日新增并核验的 Jev 开源项目，按日期与分类浏览项目名称、GitHub 仓库、Star 数、开发语言及收录时间。',
    heroTitle: '目录更新日志',
    heroSummary: '按天记录 bestjev 目录新增的每一个项目，并保留可核验的仓库来源。',
    contextLabel: '关于这份记录',
    contextHeading: 'bestjev 更新日志记录什么？',
    contextSummary: 'bestjev 记录每个经过核验并加入目录的 Jev 开源项目。每条记录保留收录日期、所属分类、开发语言、当前 GitHub Star 数和仓库地址，方便读者核对来源。',
    sourceSummary: '规范的机器生成记录发布在公开 GitHub 仓库的',
    sourceLink: 'CHANGELOG.md',
    bylineLabel: '维护者：',
    dayCount: (days) => `${days} 个更新日`,
    projectCount: (projects) => `已记录 ${projects} 个项目`,
    additions: '项新增',
    latest: '最新',
    githubCta: '在 GitHub 查看 CHANGELOG.md',
    githubTitle: '打开 GitHub 仓库中的自动生成更新日志',
    timelineLabel: '每日目录新增记录',
  },
  ja: {
    navLabel: '変更履歴',
    pageTitle: 'Jevプロジェクト変更履歴 | bestjev',
    pageDescription: 'bestjevに毎日追加された検証済みオープンソースJevプロジェクトをカテゴリー別に確認できます。',
    heroTitle: 'カタログ変更履歴',
    heroSummary: 'bestjevカタログに追加されたすべてのプロジェクトを、検証可能な情報源とともに日別で記録します。',
    contextLabel: 'この記録について',
    contextHeading: 'bestjevの変更履歴には何が記録されていますか？',
    contextSummary: 'bestjevは、検証後にカタログへ追加された各オープンソースJevプロジェクトについて、追加日、カテゴリー、言語、現在のGitHubスター数、リポジトリURLを記録します。',
    sourceSummary: '正式な自動生成記録は、公開GitHubリポジトリの次のファイルで確認できます：',
    sourceLink: 'CHANGELOG.md',
    bylineLabel: '管理者：',
    dayCount: (days) => `${days}日分の更新`,
    projectCount: (projects) => `${projects}件を記録`,
    additions: '件追加',
    latest: '最新',
    githubCta: 'GitHubでCHANGELOG.mdを見る',
    githubTitle: 'GitHubリポジトリの自動生成変更履歴を開く',
    timelineLabel: '日別カタログ追加履歴',
  },
  ko: {
    navLabel: '변경 기록',
    pageTitle: 'Jev 프로젝트 변경 기록 | bestjev',
    pageDescription: 'bestjev에 매일 추가된 검증된 오픈 소스 Jev 프로젝트를 카테고리별로 확인하세요.',
    heroTitle: '카탈로그 변경 기록',
    heroSummary: 'bestjev 카탈로그에 추가된 모든 프로젝트를 검증 가능한 출처와 함께 날짜별로 기록합니다.',
    contextLabel: '이 기록에 관하여',
    contextHeading: 'bestjev 변경 기록에는 무엇이 기록되나요?',
    contextSummary: 'bestjev는 검증 후 카탈로그에 추가된 각 오픈 소스 Jev 프로젝트의 추가 날짜, 카테고리, 언어, 현재 GitHub 스타 수와 저장소 URL을 기록합니다.',
    sourceSummary: '정식 자동 생성 기록은 공개 GitHub 저장소의 다음 파일에 게시됩니다:',
    sourceLink: 'CHANGELOG.md',
    bylineLabel: '관리자:',
    dayCount: (days) => `${days}일의 업데이트`,
    projectCount: (projects) => `${projects}개 프로젝트 기록`,
    additions: '개 추가',
    latest: '최신',
    githubCta: 'GitHub에서 CHANGELOG.md 보기',
    githubTitle: 'GitHub 저장소의 자동 생성 변경 기록 열기',
    timelineLabel: '일별 카탈로그 추가 기록',
  },
  es: {
    navLabel: 'Cambios',
    pageTitle: 'Registro de proyectos Jev | bestjev',
    pageDescription: 'Consulta los proyectos Jev de código abierto verificados que se añaden cada día a bestjev, agrupados por categoría.',
    heroTitle: 'Registro del catálogo',
    heroSummary: 'Un registro diario y verificable de cada proyecto añadido al catálogo de bestjev.',
    contextLabel: 'Acerca de este registro',
    contextHeading: '¿Qué registra el historial de bestjev?',
    contextSummary: 'bestjev registra cada proyecto Jev de código abierto verificado que se añade al catálogo, incluida la fecha, la categoría, el lenguaje, las estrellas actuales de GitHub y la URL del repositorio.',
    sourceSummary: 'El registro canónico generado automáticamente se publica en el repositorio público de GitHub como',
    sourceLink: 'CHANGELOG.md',
    bylineLabel: 'Mantenido por',
    dayCount: (days) => `${days} días con cambios`,
    projectCount: (projects) => `${projects} proyectos registrados`,
    additions: 'incorporaciones',
    latest: 'Más reciente',
    githubCta: 'Ver CHANGELOG.md en GitHub',
    githubTitle: 'Abrir el registro generado en el repositorio de GitHub',
    timelineLabel: 'Incorporaciones diarias al catálogo',
  },
  'pt-br': {
    navLabel: 'Alterações',
    pageTitle: 'Histórico de projetos Jev | bestjev',
    pageDescription: 'Veja os projetos Jev open source verificados adicionados diariamente ao bestjev, agrupados por categoria.',
    heroTitle: 'Histórico do catálogo',
    heroSummary: 'Um registro diário e verificável de cada projeto adicionado ao catálogo do bestjev.',
    contextLabel: 'Sobre este registro',
    contextHeading: 'O que o histórico do bestjev registra?',
    contextSummary: 'O bestjev registra cada projeto Jev open source verificado adicionado ao catálogo, incluindo data, categoria, linguagem, número atual de estrelas no GitHub e URL do repositório.',
    sourceSummary: 'O registro canônico gerado automaticamente é publicado no repositório público do GitHub como',
    sourceLink: 'CHANGELOG.md',
    bylineLabel: 'Mantido por',
    dayCount: (days) => `${days} dias com alterações`,
    projectCount: (projects) => `${projects} projetos registrados`,
    additions: 'adições',
    latest: 'Mais recente',
    githubCta: 'Ver CHANGELOG.md no GitHub',
    githubTitle: 'Abrir o histórico gerado no repositório do GitHub',
    timelineLabel: 'Adições diárias ao catálogo',
  },
} satisfies Record<Locale, ChangelogCopy>;

export const getChangelogMessages = (locale: Locale): ChangelogCopy => changelogMessages[locale];

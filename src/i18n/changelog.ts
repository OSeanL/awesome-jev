import type { Locale } from './config';

type ChangelogCopy = {
  navLabel: string;
  pageTitle: string;
  pageDescription: string;
  heroTitle: string;
  heroSummary: string;
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
    pageTitle: 'Jev Project Changelog | bestjev',
    pageDescription: 'Browse the verified open-source Jev projects added to bestjev each day, grouped by category and linked to their GitHub repositories.',
    heroTitle: 'Catalog Changelog',
    heroSummary: 'A daily, source-backed record of every project added to the bestjev catalog.',
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
    pageTitle: 'Jev 项目更新日志 | bestjev',
    pageDescription: '按日期和分类查看 bestjev 每天新增的 Jev 开源项目，并直接访问对应 GitHub 仓库。',
    heroTitle: '目录更新日志',
    heroSummary: '按天记录 bestjev 目录新增的每一个项目，并保留可核验的仓库来源。',
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

import type { Locale } from './config';

type ShowcaseCopy = {
  navLabel: string;
  pageTitle: string;
  pageDescription: string;
  heroTitle: string;
  heroSummary: string;
  demoCount: string;
  filtersLabel: string;
  searchPlaceholder: string;
  categoryLabel: string;
  filterCategory: string;
  allCategories: string;
  all: string;
  manifestErrorTitle: string;
  manifestErrorBody: string;
  reload: string;
  gridLabel: string;
  play: (title: string) => string;
  source: string;
  sourceTitle: (handle: string) => string;
  emptyTitle: string;
  emptyBody: string;
  clearFilters: string;
  videoLabel: string;
  videoLoadError: string;
  closeDetails: string;
  creatorLabel: string;
  publishedLabel: string;
  durationLabel: string;
  resolutionLabel: string;
  originalPostLabel: string;
  expandOriginalPost: string;
  collapseOriginalPost: string;
  previous: string;
  next: string;
};

const showcaseMessages = {
  en: {
    navLabel: 'Showcase',
    pageTitle: 'Jev Showcase — Real-world demos',
    pageDescription: 'Explore real Jev demo videos by use case, then open the original post for implementation context.',
    heroTitle: 'Jev Showcase',
    heroSummary: 'Real examples of Jev making decisions, routing work, and powering automation.',
    demoCount: 'demos',
    filtersLabel: 'Filter demos',
    searchPlaceholder: 'Search descriptions, creators, or technologies',
    categoryLabel: 'Showcase categories',
    filterCategory: 'Filter by category',
    allCategories: 'All categories',
    all: 'All',
    manifestErrorTitle: 'The showcase list is temporarily unavailable',
    manifestErrorBody: 'The CDN may still be syncing. Please refresh in a moment.',
    reload: 'Reload',
    gridLabel: 'Jev demo videos',
    play: (title) => `Play demo: ${title}`,
    source: 'View original post',
    sourceTitle: (handle) => `View @${handle}'s original post`,
    emptyTitle: 'No matching demos',
    emptyBody: 'Try another keyword or return to the All category.',
    clearFilters: 'Clear filters',
    videoLabel: 'Jev demo video',
    videoLoadError: 'Video failed to load. Click to retry.',
    closeDetails: 'Close demo details',
    creatorLabel: 'Creator',
    publishedLabel: 'Published',
    durationLabel: 'Duration',
    resolutionLabel: 'Resolution',
    originalPostLabel: 'Original post',
    expandOriginalPost: 'Expand',
    collapseOriginalPost: 'Collapse',
    previous: 'Previous',
    next: 'Next',
  },
  zh: {
    navLabel: '案例展示',
    pageTitle: 'Jev Showcase — 真实使用演示',
    pageDescription: '浏览真实的 Jev 使用演示视频，按场景筛选，并从原帖了解每个案例的实现背景。',
    heroTitle: 'Jev Showcase',
    heroSummary: '真实案例，直接看 Jev 如何参与判断、路由和自动化。',
    demoCount: '个演示',
    filtersLabel: '筛选演示',
    searchPlaceholder: '搜索描述、作者或技术关键词',
    categoryLabel: '案例分类',
    filterCategory: '按分类筛选',
    allCategories: '全部分类',
    all: '全部',
    manifestErrorTitle: '暂时无法读取演示清单',
    manifestErrorBody: 'CDN 可能仍在同步，请稍后刷新页面。',
    reload: '重新加载',
    gridLabel: 'Jev 演示视频',
    play: (title) => `播放演示：${title}`,
    source: '查看原帖',
    sourceTitle: (handle) => `查看 @${handle} 的原帖`,
    emptyTitle: '没有找到匹配的演示',
    emptyBody: '换一个关键词，或切回“全部”分类。',
    clearFilters: '清除筛选',
    videoLabel: 'Jev 演示视频',
    videoLoadError: '视频加载失败，点击重试',
    closeDetails: '关闭演示详情',
    creatorLabel: '作者',
    publishedLabel: '发布日期',
    durationLabel: '视频时长',
    resolutionLabel: '分辨率',
    originalPostLabel: '原帖内容',
    expandOriginalPost: '展开',
    collapseOriginalPost: '收起',
    previous: '上一个',
    next: '下一个',
  },
  ja: {
    navLabel: '活用事例',
    pageTitle: 'Jev Showcase — 実際の活用デモ',
    pageDescription: 'Jev の実際のデモ動画を用途別に探し、元の投稿から実装の背景を確認できます。',
    heroTitle: 'Jev Showcase',
    heroSummary: 'Jev が判断、ルーティング、自動化に使われる実例を紹介します。',
    demoCount: '件のデモ',
    filtersLabel: 'デモを絞り込む',
    searchPlaceholder: '説明、作成者、技術キーワードを検索',
    categoryLabel: '活用事例カテゴリー',
    filterCategory: 'カテゴリーで絞り込む',
    allCategories: 'すべてのカテゴリー',
    all: 'すべて',
    manifestErrorTitle: 'デモ一覧を一時的に読み込めません',
    manifestErrorBody: 'CDN の同期中かもしれません。少し待ってから更新してください。',
    reload: '再読み込み',
    gridLabel: 'Jev デモ動画',
    play: (title) => `デモを再生：${title}`,
    source: '元の投稿を見る',
    sourceTitle: (handle) => `@${handle} の元の投稿を見る`,
    emptyTitle: '一致するデモがありません',
    emptyBody: '別のキーワードを試すか、「すべて」に戻してください。',
    clearFilters: '絞り込みを解除',
    videoLabel: 'Jev デモ動画',
    videoLoadError: '動画を読み込めませんでした。クリックして再試行してください。',
    closeDetails: 'デモ詳細を閉じる',
    creatorLabel: '作成者',
    publishedLabel: '公開日',
    durationLabel: '長さ',
    resolutionLabel: '解像度',
    originalPostLabel: '元の投稿',
    expandOriginalPost: '展開',
    collapseOriginalPost: '折りたたむ',
    previous: '前へ',
    next: '次へ',
  },
  ko: {
    navLabel: '활용 사례',
    pageTitle: 'Jev Showcase — 실제 활용 데모',
    pageDescription: '실제 Jev 데모 영상을 사용 사례별로 살펴보고 원문에서 구현 배경을 확인하세요.',
    heroTitle: 'Jev Showcase',
    heroSummary: 'Jev가 판단, 라우팅, 자동화에 활용되는 실제 사례를 확인하세요.',
    demoCount: '개 데모',
    filtersLabel: '데모 필터',
    searchPlaceholder: '설명, 제작자 또는 기술 키워드 검색',
    categoryLabel: '활용 사례 카테고리',
    filterCategory: '카테고리로 필터링',
    allCategories: '모든 카테고리',
    all: '전체',
    manifestErrorTitle: '데모 목록을 일시적으로 불러올 수 없습니다',
    manifestErrorBody: 'CDN이 동기화 중일 수 있습니다. 잠시 후 새로고침하세요.',
    reload: '다시 불러오기',
    gridLabel: 'Jev 데모 영상',
    play: (title) => `데모 재생: ${title}`,
    source: '원문 보기',
    sourceTitle: (handle) => `@${handle}의 원문 보기`,
    emptyTitle: '일치하는 데모가 없습니다',
    emptyBody: '다른 키워드를 사용하거나 전체 카테고리로 돌아가세요.',
    clearFilters: '필터 지우기',
    videoLabel: 'Jev 데모 영상',
    videoLoadError: '영상을 불러오지 못했습니다. 클릭하여 다시 시도하세요.',
    closeDetails: '데모 상세 정보 닫기',
    creatorLabel: '제작자',
    publishedLabel: '게시일',
    durationLabel: '재생 시간',
    resolutionLabel: '해상도',
    originalPostLabel: '원문 내용',
    expandOriginalPost: '펼치기',
    collapseOriginalPost: '접기',
    previous: '이전',
    next: '다음',
  },
  es: {
    navLabel: 'Demostraciones',
    pageTitle: 'Jev Showcase — Demostraciones reales',
    pageDescription: 'Explora demostraciones reales de Jev por caso de uso y consulta la publicación original para conocer su implementación.',
    heroTitle: 'Jev Showcase',
    heroSummary: 'Ejemplos reales de Jev tomando decisiones, distribuyendo trabajo y automatizando procesos.',
    demoCount: 'demos',
    filtersLabel: 'Filtrar demostraciones',
    searchPlaceholder: 'Buscar descripciones, autores o tecnologías',
    categoryLabel: 'Categorías de demostraciones',
    filterCategory: 'Filtrar por categoría',
    allCategories: 'Todas las categorías',
    all: 'Todo',
    manifestErrorTitle: 'La lista de demostraciones no está disponible temporalmente',
    manifestErrorBody: 'Es posible que el CDN aún se esté sincronizando. Actualiza la página en unos instantes.',
    reload: 'Recargar',
    gridLabel: 'Vídeos de demostración de Jev',
    play: (title) => `Reproducir demostración: ${title}`,
    source: 'Ver publicación original',
    sourceTitle: (handle) => `Ver la publicación original de @${handle}`,
    emptyTitle: 'No hay demostraciones coincidentes',
    emptyBody: 'Prueba otra palabra clave o vuelve a la categoría Todo.',
    clearFilters: 'Borrar filtros',
    videoLabel: 'Vídeo de demostración de Jev',
    videoLoadError: 'No se pudo cargar el vídeo. Haz clic para reintentar.',
    closeDetails: 'Cerrar detalles de la demostración',
    creatorLabel: 'Autor',
    publishedLabel: 'Publicado',
    durationLabel: 'Duración',
    resolutionLabel: 'Resolución',
    originalPostLabel: 'Publicación original',
    expandOriginalPost: 'Ampliar',
    collapseOriginalPost: 'Contraer',
    previous: 'Anterior',
    next: 'Siguiente',
  },
  'pt-br': {
    navLabel: 'Demonstrações',
    pageTitle: 'Jev Showcase — Demonstrações reais',
    pageDescription: 'Explore demonstrações reais do Jev por caso de uso e consulte a publicação original para entender a implementação.',
    heroTitle: 'Jev Showcase',
    heroSummary: 'Exemplos reais do Jev tomando decisões, distribuindo trabalho e automatizando processos.',
    demoCount: 'demonstrações',
    filtersLabel: 'Filtrar demonstrações',
    searchPlaceholder: 'Buscar descrições, autores ou tecnologias',
    categoryLabel: 'Categorias de demonstrações',
    filterCategory: 'Filtrar por categoria',
    allCategories: 'Todas as categorias',
    all: 'Tudo',
    manifestErrorTitle: 'A lista de demonstrações está temporariamente indisponível',
    manifestErrorBody: 'A CDN pode ainda estar sincronizando. Atualize a página em instantes.',
    reload: 'Recarregar',
    gridLabel: 'Vídeos de demonstração do Jev',
    play: (title) => `Reproduzir demonstração: ${title}`,
    source: 'Ver publicação original',
    sourceTitle: (handle) => `Ver a publicação original de @${handle}`,
    emptyTitle: 'Nenhuma demonstração encontrada',
    emptyBody: 'Tente outra palavra-chave ou volte para a categoria Tudo.',
    clearFilters: 'Limpar filtros',
    videoLabel: 'Vídeo de demonstração do Jev',
    videoLoadError: 'Não foi possível carregar o vídeo. Clique para tentar novamente.',
    closeDetails: 'Fechar detalhes da demonstração',
    creatorLabel: 'Criador',
    publishedLabel: 'Publicado',
    durationLabel: 'Duração',
    resolutionLabel: 'Resolução',
    originalPostLabel: 'Publicação original',
    expandOriginalPost: 'Expandir',
    collapseOriginalPost: 'Recolher',
    previous: 'Anterior',
    next: 'Próximo',
  },
} satisfies Record<Locale, ShowcaseCopy>;

const categoryLabels = {
  en: { '游戏': 'Games', '效率工具': 'Productivity', '内容营销': 'Content Marketing', '数据分析': 'Data Analysis', '编程开发': 'Development', '自动化': 'Automation', '任务分配': 'Task Routing', '安全审核': 'Security Review', '金融交易': 'Financial Trading', '硬件设备': 'Hardware' },
  zh: { '游戏': '游戏', '效率工具': '效率工具', '内容营销': '内容营销', '数据分析': '数据分析', '编程开发': '编程开发', '自动化': '自动化', '任务分配': '任务分配', '安全审核': '安全审核', '金融交易': '金融交易', '硬件设备': '硬件设备' },
  ja: { '游戏': 'ゲーム', '效率工具': '生産性', '内容营销': 'コンテンツマーケティング', '数据分析': 'データ分析', '编程开发': '開発', '自动化': '自動化', '任务分配': 'タスク振り分け', '安全审核': 'セキュリティレビュー', '金融交易': '金融取引', '硬件设备': 'ハードウェア' },
  ko: { '游戏': '게임', '效率工具': '생산성', '内容营销': '콘텐츠 마케팅', '数据分析': '데이터 분석', '编程开发': '개발', '自动化': '자동화', '任务分配': '작업 분배', '安全审核': '보안 검토', '金融交易': '금융 거래', '硬件设备': '하드웨어' },
  es: { '游戏': 'Juegos', '效率工具': 'Productividad', '内容营销': 'Marketing de contenidos', '数据分析': 'Análisis de datos', '编程开发': 'Desarrollo', '自动化': 'Automatización', '任务分配': 'Asignación de tareas', '安全审核': 'Revisión de seguridad', '金融交易': 'Operaciones financieras', '硬件设备': 'Hardware' },
  'pt-br': { '游戏': 'Jogos', '效率工具': 'Produtividade', '内容营销': 'Marketing de conteúdo', '数据分析': 'Análise de dados', '编程开发': 'Desenvolvimento', '自动化': 'Automação', '任务分配': 'Distribuição de tarefas', '安全审核': 'Revisão de segurança', '金融交易': 'Operações financeiras', '硬件设备': 'Hardware' },
} satisfies Record<Locale, Record<string, string>>;

export const showcaseCategoryDefinitions = [
  { id: '游戏', slug: 'games', sourceCategory: 'Games & real time' },
  { id: '效率工具', slug: 'productivity', sourceCategory: 'Tools & apps' },
  { id: '内容营销', slug: 'content-marketing', sourceCategory: 'Content & growth' },
  { id: '数据分析', slug: 'data-analysis', sourceCategory: 'Research & data' },
  { id: '编程开发', slug: 'development', sourceCategory: 'Dev tools' },
  { id: '自动化', slug: 'automation', sourceCategory: 'Agents & browsers' },
  { id: '任务分配', slug: 'task-routing', sourceCategory: 'Triage & routing' },
  { id: '安全审核', slug: 'security-review', sourceCategory: 'Safety & moderation' },
  { id: '金融交易', slug: 'financial-trading', sourceCategory: 'Trading & markets' },
  { id: '硬件设备', slug: 'hardware', sourceCategory: 'Robotics & devices' },
] as const;

export const showcaseRouteSlugs = [
  'today',
  'this-week',
  ...showcaseCategoryDefinitions.map(({ slug }) => slug),
] as const;

export type ShowcaseCategoryId = (typeof showcaseCategoryDefinitions)[number]['id'];
export type ShowcaseCategorySlug = (typeof showcaseCategoryDefinitions)[number]['slug'];

const showcaseCategoryEnvironments = {
  en: {
    '游戏': 'real-time game state evaluation and action selection',
    '效率工具': 'daily tools, workplace workflows, and productivity apps',
    '内容营销': 'social-content evaluation, copy decisions, and growth workflows',
    '数据分析': 'review classification, structured scoring, and data interpretation',
    '编程开发': 'CLIs, code tools, and developer workflows',
    '自动化': 'agent orchestration, model routing, and automated execution',
    '任务分配': 'candidate ranking, task triage, and context-aware routing',
    '安全审核': 'code review, risk classification, and safety moderation',
    '金融交易': 'fraud detection, payment decisions, and market analysis',
    '硬件设备': 'robot control, visual guidance, and device decisions',
  },
  zh: {
    '游戏': '实时游戏状态判断与动作选择',
    '效率工具': '日常工具、办公流程与生产力应用',
    '内容营销': '社交内容评估、文案判断与增长流程',
    '数据分析': '评论分类、结构化评分与数据判断',
    '编程开发': '命令行工具、代码工具与开发者工作流',
    '自动化': 'Agent 编排、模型路由与自动执行流程',
    '任务分配': '候选排序、任务分流与上下文决策',
    '安全审核': '代码审查、风险分级与安全审核',
    '金融交易': '欺诈检测、支付决策与市场分析',
    '硬件设备': '机器人控制、视觉引导与设备决策',
  },
  ja: {
    '游戏': 'リアルタイムのゲーム状態評価と行動選択',
    '效率工具': '日常ツール、業務フロー、生産性アプリ',
    '内容营销': 'ソーシャル投稿の評価、コピー判断、成長施策',
    '数据分析': 'レビュー分類、構造化スコアリング、データ判断',
    '编程开发': 'CLI、コードツール、開発ワークフロー',
    '自动化': 'エージェント編成、モデルルーティング、自動実行',
    '任务分配': '候補順位付け、タスク振り分け、文脈判断',
    '安全审核': 'コードレビュー、リスク分類、安全性審査',
    '金融交易': '不正検知、決済判断、市場分析',
    '硬件设备': 'ロボット制御、視覚誘導、デバイス判断',
  },
  ko: {
    '游戏': '실시간 게임 상태 평가와 행동 선택',
    '效率工具': '일상 도구, 업무 흐름, 생산성 앱',
    '内容营销': '소셜 콘텐츠 평가, 카피 판단, 성장 워크플로',
    '数据分析': '리뷰 분류, 구조화 점수화, 데이터 판단',
    '编程开发': 'CLI, 코드 도구, 개발자 워크플로',
    '自动化': '에이전트 오케스트레이션, 모델 라우팅, 자동 실행',
    '任务分配': '후보 순위 지정, 작업 분류, 맥락 기반 라우팅',
    '安全审核': '코드 리뷰, 위험 분류, 안전 검토',
    '金融交易': '사기 탐지, 결제 판단, 시장 분석',
    '硬件设备': '로봇 제어, 시각 안내, 기기 의사결정',
  },
  es: {
    '游戏': 'evaluación del estado del juego y selección de acciones en tiempo real',
    '效率工具': 'herramientas cotidianas, flujos de trabajo y aplicaciones de productividad',
    '内容营销': 'evaluación de contenido social, decisiones de copy y flujos de crecimiento',
    '数据分析': 'clasificación de reseñas, puntuación estructurada e interpretación de datos',
    '编程开发': 'CLI, herramientas de código y flujos para desarrolladores',
    '自动化': 'orquestación de agentes, selección de modelos y ejecución automatizada',
    '任务分配': 'ordenación de candidatos, clasificación de tareas y enrutamiento contextual',
    '安全审核': 'revisión de código, clasificación de riesgos y moderación de seguridad',
    '金融交易': 'detección de fraude, decisiones de pago y análisis de mercados',
    '硬件设备': 'control robótico, guía visual y decisiones de dispositivos',
  },
  'pt-br': {
    '游戏': 'avaliação do estado do jogo e seleção de ações em tempo real',
    '效率工具': 'ferramentas diárias, fluxos de trabalho e aplicativos de produtividade',
    '内容营销': 'avaliação de conteúdo social, decisões de copy e fluxos de crescimento',
    '数据分析': 'classificação de avaliações, pontuação estruturada e interpretação de dados',
    '编程开发': 'CLIs, ferramentas de código e fluxos para desenvolvedores',
    '自动化': 'orquestração de agentes, roteamento de modelos e execução automatizada',
    '任务分配': 'ordenação de candidatos, triagem de tarefas e roteamento contextual',
    '安全审核': 'revisão de código, classificação de riscos e moderação de segurança',
    '金融交易': 'detecção de fraude, decisões de pagamento e análise de mercados',
    '硬件设备': 'controle robótico, orientação visual e decisões de dispositivos',
  },
} satisfies Record<Locale, Record<ShowcaseCategoryId, string>>;

const showcaseCategorySeoTemplates = {
  en: {
    title: (name: string, count: number) => `Jev ${name} Demos: ${count} Real ${count === 1 ? 'Case' : 'Cases'} | bestjev`,
    heroTitle: (name: string) => `Jev ${name} Demos`,
    description: (_name: string, count: number, environment: string) => `See ${count} real Jev ${count === 1 ? 'demo' : 'demos'} showing how it handles ${environment}, with ${count === 1 ? 'video and the original post' : 'videos and the original posts'}.`,
  },
  zh: {
    title: (name: string, count: number) => `Jev ${name}演示：${count} 个真实应用案例 | bestjev`,
    heroTitle: (name: string) => `Jev ${name}案例`,
    description: (name: string, count: number, environment: string) => `浏览 ${count} 个${name}类 Jev 演示，直接了解 Jev 在「${environment}」中的应用方式，并查看视频、原帖和实现背景。`,
  },
  ja: {
    title: (name: string, count: number) => `Jevの${name}活用事例：${count}件 | bestjev`,
    heroTitle: (name: string) => `Jevの${name}活用事例`,
    description: (name: string, count: number, environment: string) => `${environment}に Jev を使った${name}事例を ${count} 件紹介します。動画と元投稿で実際の使い方を確認できます。`,
  },
  ko: {
    title: (name: string, count: number) => `Jev ${name} 활용 사례 ${count}개 | bestjev`,
    heroTitle: (name: string) => `Jev ${name} 활용 사례`,
    description: (name: string, count: number, environment: string) => `${environment}에 Jev를 적용한 ${name} 사례 ${count}개를 영상과 원문으로 확인할 수 있습니다.`,
  },
  es: {
    title: (name: string, count: number) => `Jev para ${name}: ${count} ${count === 1 ? 'caso' : 'casos'} | bestjev`,
    heroTitle: (name: string) => `Jev para ${name}`,
    description: (_name: string, count: number, environment: string) => `Consulta ${count} ${count === 1 ? 'demo real' : 'demos reales'} de Jev aplicado a ${environment}, con ${count === 1 ? 'vídeo y publicación original' : 'vídeos y publicaciones originales'}.`,
  },
  'pt-br': {
    title: (name: string, count: number) => `Jev em ${name}: ${count} ${count === 1 ? 'caso' : 'casos'} | bestjev`,
    heroTitle: (name: string) => `Jev em ${name}`,
    description: (_name: string, count: number, environment: string) => `Confira ${count} ${count === 1 ? 'demonstração real' : 'demonstrações reais'} do Jev aplicado a ${environment}, com ${count === 1 ? 'vídeo e post original' : 'vídeos e posts originais'}.`,
  },
} satisfies Record<Locale, {
  title: (name: string, count: number) => string;
  heroTitle: (name: string) => string;
  description: (name: string, count: number, environment: string) => string;
}>;

export type ShowcaseRecencySlug = 'today' | 'this-week';

const showcaseRecencySeoTemplates = {
  en: {
    today: {
      title: (count: number) => `Jev Demos Added Today: ${count} | bestjev`,
      heroTitle: 'Jev Demos Added Today',
      description: (count: number) => `Browse ${count} Jev ${count === 1 ? 'demo' : 'demos'} added today and see each application in its video and original post.`,
    },
    'this-week': {
      title: (count: number) => `Jev Demos Added This Week: ${count} | bestjev`,
      heroTitle: 'Jev Demos Added This Week',
      description: (count: number) => `Browse ${count} Jev ${count === 1 ? 'demo' : 'demos'} added this week and see each application in its video and original post.`,
    },
  },
  zh: {
    today: {
      title: (count: number) => `今日新增 Jev 演示：${count} 个案例 | bestjev`,
      heroTitle: '今日新增 Jev 案例',
      description: (count: number) => `查看今天新增的 ${count} 个 Jev 演示，通过视频和原帖了解每个案例的实际应用方式。`,
    },
    'this-week': {
      title: (count: number) => `本周新增 Jev 演示：${count} 个案例 | bestjev`,
      heroTitle: '本周新增 Jev 案例',
      description: (count: number) => `查看本周新增的 ${count} 个 Jev 演示，通过视频和原帖了解每个案例的实际应用方式。`,
    },
  },
  ja: {
    today: {
      title: (count: number) => `本日追加のJev活用事例：${count}件 | bestjev`,
      heroTitle: '本日追加のJev活用事例',
      description: (count: number) => `本日追加されたJevの活用事例を${count}件掲載。動画と元投稿で実際の使い方を確認できます。`,
    },
    'this-week': {
      title: (count: number) => `今週追加のJev活用事例：${count}件 | bestjev`,
      heroTitle: '今週追加のJev活用事例',
      description: (count: number) => `今週追加されたJevの活用事例を${count}件掲載。動画と元投稿で実際の使い方を確認できます。`,
    },
  },
  ko: {
    today: {
      title: (count: number) => `오늘 추가된 Jev 활용 사례 ${count}개 | bestjev`,
      heroTitle: '오늘 추가된 Jev 활용 사례',
      description: (count: number) => `오늘 추가된 Jev 활용 사례 ${count}개를 영상과 원문으로 확인하세요.`,
    },
    'this-week': {
      title: (count: number) => `이번 주 추가된 Jev 활용 사례 ${count}개 | bestjev`,
      heroTitle: '이번 주 추가된 Jev 활용 사례',
      description: (count: number) => `이번 주 추가된 Jev 활용 사례 ${count}개를 영상과 원문으로 확인하세요.`,
    },
  },
  es: {
    today: {
      title: (count: number) => `Demos de Jev añadidas hoy: ${count} | bestjev`,
      heroTitle: 'Demos de Jev añadidas hoy',
      description: (count: number) => `Consulta ${count} ${count === 1 ? 'demo de Jev añadida' : 'demos de Jev añadidas'} hoy, con sus vídeos y publicaciones originales.`,
    },
    'this-week': {
      title: (count: number) => `Demos de Jev de esta semana: ${count} | bestjev`,
      heroTitle: 'Demos de Jev de esta semana',
      description: (count: number) => `Consulta ${count} ${count === 1 ? 'demo de Jev añadida' : 'demos de Jev añadidas'} esta semana, con sus vídeos y publicaciones originales.`,
    },
  },
  'pt-br': {
    today: {
      title: (count: number) => `Demonstrações do Jev adicionadas hoje: ${count} | bestjev`,
      heroTitle: 'Demonstrações do Jev adicionadas hoje',
      description: (count: number) => `Confira ${count} ${count === 1 ? 'demonstração do Jev adicionada' : 'demonstrações do Jev adicionadas'} hoje, com vídeos e posts originais.`,
    },
    'this-week': {
      title: (count: number) => `Demonstrações do Jev desta semana: ${count} | bestjev`,
      heroTitle: 'Demonstrações do Jev desta semana',
      description: (count: number) => `Confira ${count} ${count === 1 ? 'demonstração do Jev adicionada' : 'demonstrações do Jev adicionadas'} esta semana, com vídeos e posts originais.`,
    },
  },
} satisfies Record<Locale, Record<ShowcaseRecencySlug, {
  title: (count: number) => string;
  heroTitle: string;
  description: (count: number) => string;
}>>;

const sourceCategoryLabels = {
  en: {
    'Games & real time': 'Games & real time',
    'Tools & apps': 'Tools & apps',
    'Content & growth': 'Content & growth',
    'Research & data': 'Research & data',
    'Dev tools': 'Developer tools',
    'Agents & browsers': 'Agents & browsers',
    'Triage & routing': 'Triage & routing',
    'Safety & moderation': 'Safety & moderation',
    'Trading & markets': 'Trading & markets',
    'Robotics & devices': 'Robotics & devices',
  },
  zh: {
    'Games & real time': '游戏与实时交互',
    'Tools & apps': '工具与应用',
    'Content & growth': '内容与增长',
    'Research & data': '研究与数据',
    'Dev tools': '开发工具',
    'Agents & browsers': '智能体与浏览器',
    'Triage & routing': '分类与路由',
    'Safety & moderation': '安全与审核',
    'Trading & markets': '交易与市场',
    'Robotics & devices': '机器人与设备',
  },
  ja: {
    'Games & real time': 'ゲーム・リアルタイム',
    'Tools & apps': 'ツール・アプリ',
    'Content & growth': 'コンテンツ・成長',
    'Research & data': '研究・データ',
    'Dev tools': '開発ツール',
    'Agents & browsers': 'エージェント・ブラウザー',
    'Triage & routing': '分類・ルーティング',
    'Safety & moderation': '安全性・モデレーション',
    'Trading & markets': '取引・市場',
    'Robotics & devices': 'ロボティクス・デバイス',
  },
  ko: {
    'Games & real time': '게임 및 실시간',
    'Tools & apps': '도구 및 앱',
    'Content & growth': '콘텐츠 및 성장',
    'Research & data': '연구 및 데이터',
    'Dev tools': '개발 도구',
    'Agents & browsers': '에이전트 및 브라우저',
    'Triage & routing': '분류 및 라우팅',
    'Safety & moderation': '안전 및 검토',
    'Trading & markets': '거래 및 시장',
    'Robotics & devices': '로봇 및 기기',
  },
  es: {
    'Games & real time': 'Juegos y tiempo real',
    'Tools & apps': 'Herramientas y aplicaciones',
    'Content & growth': 'Contenido y crecimiento',
    'Research & data': 'Investigación y datos',
    'Dev tools': 'Herramientas de desarrollo',
    'Agents & browsers': 'Agentes y navegadores',
    'Triage & routing': 'Clasificación y enrutamiento',
    'Safety & moderation': 'Seguridad y moderación',
    'Trading & markets': 'Operaciones y mercados',
    'Robotics & devices': 'Robótica y dispositivos',
  },
  'pt-br': {
    'Games & real time': 'Jogos e tempo real',
    'Tools & apps': 'Ferramentas e aplicativos',
    'Content & growth': 'Conteúdo e crescimento',
    'Research & data': 'Pesquisa e dados',
    'Dev tools': 'Ferramentas de desenvolvimento',
    'Agents & browsers': 'Agentes e navegadores',
    'Triage & routing': 'Triagem e roteamento',
    'Safety & moderation': 'Segurança e moderação',
    'Trading & markets': 'Negociação e mercados',
    'Robotics & devices': 'Robótica e dispositivos',
  },
} satisfies Record<Locale, Record<string, string>>;

const descriptions = {
  en: {
    '2101297208091939101': 'Jev receives the live Pong game state and continuously chooses whether to move up, stay still, or move down.',
    '2101761585978962097': 'A newly formed hackathon team used Jev to build a working application prototype in just a few hours.',
    '2102136442625695744': 'Paste a post and let Jev judge whether it reads like a hit or something better left unpublished.',
    '2102344943390122106': 'Turn reviews of food, drinks, and service into structured options, then use Jev to return a consistent score.',
    '2101097815686480367': 'A lightweight command-line tool that uses Jev to fix the command or spelling mistake you just typed.',
    '2101498725411746098': 'Jevbrain reads the task and candidate models, then selects the sub-agent, role, and reasoning effort automatically.',
    '2101714593261437107': 'Rerank Japanese IME candidates from sentence context to distinguish homophones with different meanings.',
    '2100632643331149984': 'Read a code diff, label its risk green, yellow, or red, and identify the reviewer best placed to intervene.',
    '2101588911239938048': 'Test Jev on payment-fraud action selection and compare its results with a LightGBM baseline.',
    '2100584131910352896': 'Combine PyBullet, a vision-language model, and Jev into a decision pipeline for visually guided robotic grasping.',
  },
  zh: {
    '2101297208091939101': '把 Pong 的实时游戏状态交给 Jev，在上移、停留和下移之间持续选择下一步动作。',
    '2101761585978962097': '一支临时组队的黑客松团队，用 Jev 在数小时内完成可运行的应用原型。',
    '2102136442625695744': '粘贴一条推文，让 Jev 在发布前判断它更像爆款，还是会让人尴尬。',
    '2102344943390122106': '把食物、饮品、服务等评价整理成结构化选项，再由 Jev 返回统一评分。',
    '2101097815686480367': '一个轻量命令行工具，调用 Jev 自动纠正终端里刚刚输错的命令或拼写。',
    '2101498725411746098': 'Jevbrain 根据任务说明和候选模型，自动选择子代理、角色与推理强度。',
    '2101714593261437107': '根据整句上下文重新排列日语输入法候选，区分“概率”和“确立”等同音词。',
    '2100632643331149984': '读取代码 diff，把风险标成绿、黄、红三档，并指出最适合介入的审查者。',
    '2101588911239938048': '用支付欺诈检测检验 Jev 的动作选择能力，并与 LightGBM 的效果进行对照。',
    '2100584131910352896': '结合 PyBullet、视觉语言模型与 Jev，完成视觉引导的机器人抓取决策链路。',
  },
  ja: {
    '2101297208091939101': 'Pong のリアルタイム状態を Jev に渡し、上移動、停止、下移動から次の行動を選び続けます。',
    '2101761585978962097': '結成直後のハッカソンチームが Jev を使い、数時間で動作するアプリの試作を完成させました。',
    '2102136442625695744': '投稿文を貼り付け、公開前にヒットしそうか、見送るべきかを Jev が判定します。',
    '2102344943390122106': '食事、飲み物、サービスの評価を構造化し、Jev が一貫したスコアを返します。',
    '2101097815686480367': '直前に入力したコマンドやスペルの誤りを Jev で修正する軽量 CLI ツールです。',
    '2101498725411746098': 'Jevbrain がタスクと候補モデルを読み、サブエージェント、役割、推論強度を自動選択します。',
    '2101714593261437107': '文脈から日本語 IME の候補を並べ替え、意味の異なる同音語を見分けます。',
    '2100632643331149984': 'コード差分を読み、リスクを緑・黄・赤に分類して、最適なレビュアーを示します。',
    '2101588911239938048': '決済不正検知で Jev の行動選択を検証し、LightGBM の基準結果と比較します。',
    '2100584131910352896': 'PyBullet、視覚言語モデル、Jev を組み合わせ、視覚誘導ロボット把持の判断パイプラインを構築します。',
  },
  ko: {
    '2101297208091939101': 'Pong의 실시간 게임 상태를 Jev에 전달해 위로 이동, 정지, 아래로 이동 중 다음 행동을 계속 선택합니다.',
    '2101761585978962097': '새로 구성된 해커톤 팀이 Jev를 사용해 몇 시간 만에 작동하는 애플리케이션 프로토타입을 완성했습니다.',
    '2102136442625695744': '게시물을 붙여 넣으면 Jev가 공개 전에 흥행할 글인지 보류할 글인지 판단합니다.',
    '2102344943390122106': '음식, 음료, 서비스 리뷰를 구조화된 선택지로 정리하고 Jev가 일관된 점수를 반환합니다.',
    '2101097815686480367': '방금 입력한 명령어나 철자 오류를 Jev로 수정하는 가벼운 명령줄 도구입니다.',
    '2101498725411746098': 'Jevbrain이 작업과 후보 모델을 읽고 하위 에이전트, 역할, 추론 강도를 자동으로 선택합니다.',
    '2101714593261437107': '문장 맥락으로 일본어 IME 후보 순서를 다시 정해 의미가 다른 동음이의어를 구분합니다.',
    '2100632643331149984': '코드 diff를 읽고 위험을 초록, 노랑, 빨강으로 분류한 뒤 가장 적합한 리뷰어를 제안합니다.',
    '2101588911239938048': '결제 사기 탐지에서 Jev의 행동 선택을 검증하고 LightGBM 기준선과 비교합니다.',
    '2100584131910352896': 'PyBullet, 비전 언어 모델, Jev를 결합해 시각 기반 로봇 파지 의사결정 파이프라인을 만듭니다.',
  },
  es: {
    '2101297208091939101': 'Jev recibe el estado de Pong en tiempo real y elige continuamente entre subir, quedarse quieto o bajar.',
    '2101761585978962097': 'Un equipo recién formado utilizó Jev para crear un prototipo funcional durante un hackatón en pocas horas.',
    '2102136442625695744': 'Pega una publicación y deja que Jev decida antes de publicarla si parece un éxito o si conviene descartarla.',
    '2102344943390122106': 'Convierte reseñas de comida, bebidas y servicio en opciones estructuradas para que Jev devuelva una puntuación uniforme.',
    '2101097815686480367': 'Una herramienta ligera de línea de comandos que usa Jev para corregir el comando o error ortográfico recién escrito.',
    '2101498725411746098': 'Jevbrain lee la tarea y los modelos candidatos y elige automáticamente el subagente, el rol y el nivel de razonamiento.',
    '2101714593261437107': 'Reordena candidatos de un IME japonés según el contexto de la frase para distinguir homófonos con significados diferentes.',
    '2100632643331149984': 'Lee un diff, clasifica el riesgo como verde, amarillo o rojo e identifica al revisor más adecuado.',
    '2101588911239938048': 'Prueba la selección de acciones de Jev en fraude de pagos y compara los resultados con una referencia de LightGBM.',
    '2100584131910352896': 'Combina PyBullet, un modelo de visión y lenguaje y Jev en una cadena de decisión para agarre robótico guiado visualmente.',
  },
  'pt-br': {
    '2101297208091939101': 'O Jev recebe o estado do Pong em tempo real e escolhe continuamente entre subir, ficar parado ou descer.',
    '2101761585978962097': 'Uma equipe recém-formada usou o Jev para criar um protótipo funcional durante um hackathon em poucas horas.',
    '2102136442625695744': 'Cole uma publicação e deixe o Jev avaliar, antes de publicar, se ela parece um sucesso ou se deve ser descartada.',
    '2102344943390122106': 'Transforme avaliações de comida, bebidas e atendimento em opções estruturadas para o Jev retornar uma pontuação consistente.',
    '2101097815686480367': 'Uma ferramenta leve de linha de comando que usa o Jev para corrigir o comando ou erro de digitação recém-inserido.',
    '2101498725411746098': 'O Jevbrain lê a tarefa e os modelos candidatos e escolhe automaticamente o subagente, o papel e o nível de raciocínio.',
    '2101714593261437107': 'Reordene candidatos de um IME japonês pelo contexto da frase para distinguir homófonos com significados diferentes.',
    '2100632643331149984': 'Leia um diff, classifique o risco como verde, amarelo ou vermelho e indique o revisor mais adequado.',
    '2101588911239938048': 'Teste a seleção de ações do Jev em fraude de pagamentos e compare os resultados com uma referência do LightGBM.',
    '2100584131910352896': 'Combine PyBullet, um modelo de visão e linguagem e o Jev em um fluxo de decisão para preensão robótica guiada por visão.',
  },
} satisfies Record<Locale, Record<string, string>>;

export const getShowcaseMessages = (locale: Locale): ShowcaseCopy => showcaseMessages[locale];
export const getShowcaseCategoryLabel = (locale: Locale, category: string) =>
  (sourceCategoryLabels[locale] as Record<string, string>)[category]
  ?? (categoryLabels[locale] as Record<string, string>)[category]
  ?? category;
export const getShowcaseCategoryBySlug = (slug: string | undefined) =>
  showcaseCategoryDefinitions.find((category) => category.slug === slug);
export const getShowcaseCategorySlug = (category: string) =>
  showcaseCategoryDefinitions.find((definition) => (
    definition.sourceCategory === category || definition.id === category
  ))?.slug;
export const getShowcaseCategorySeo = (locale: Locale, category: ShowcaseCategoryId, count: number) => {
  const name = getShowcaseCategoryLabel(locale, category);
  const environment = showcaseCategoryEnvironments[locale][category];
  const template = showcaseCategorySeoTemplates[locale];
  return {
    name,
    environment,
    title: template.title(name, count),
    heroTitle: template.heroTitle(name),
    description: template.description(name, count, environment),
  };
};
export const getShowcaseRecencySeo = (locale: Locale, recency: ShowcaseRecencySlug, count: number) => {
  const template = showcaseRecencySeoTemplates[locale][recency];
  return {
    title: template.title(count),
    heroTitle: template.heroTitle,
    description: template.description(count),
  };
};
export const getShowcaseDescription = (locale: Locale, id: string, fallback: string) =>
  (descriptions[locale] as Record<string, string>)[id]
  ?? (descriptions.en as Record<string, string>)[id]
  ?? fallback;

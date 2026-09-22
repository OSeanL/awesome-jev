import type { Locale } from './config';

type GuideCopy = { intro: string; scope: string };
type GuideUi = {
  eyebrow: string;
  title: (category: string) => string;
  faqTitle: (category: string) => string;
  sourceTitle: string;
  sourceIntro: string;
  scopeQuestion: (category: string) => string;
  compareQuestion: (category: string) => string;
  compareAnswer: string;
  evidenceQuestion: (category: string) => string;
  evidenceAnswer: string;
};

export type CategoryGuide = GuideCopy & {
  eyebrow: string;
  title: string;
  faqTitle: string;
  sourceTitle: string;
  sourceIntro: string;
  faqs: Array<{ question: string; answer: string }>;
};

const guides: Record<Locale, Record<string, GuideCopy>> = {
  en: {
    official: { intro: 'Official Jev projects are the primary implementations, examples, and resources published or maintained by TypeSafe AI.', scope: 'This category includes first-party repositories whose ownership and documentation provide authoritative evidence about Jev APIs, primitives, and supported workflows.' },
    'sdks-and-clients': { intro: 'Jev SDKs and clients help applications call Jev from different languages, runtimes, and deployment environments.', scope: 'Entries include language clients, typed wrappers, API helpers, generated bindings, and reusable packages that make Jev easier to integrate into production software.' },
    'jev-like-models': { intro: 'Jev-like models explore typed, constrained, or probabilistic decision interfaces similar to Jev.', scope: 'These projects may be alternative models, open runtimes, compatible experiments, or independent implementations. Inclusion does not imply official Jev compatibility or TypeSafe AI endorsement.' },
    'frameworks-and-integrations': { intro: 'Frameworks and integrations connect Jev decisions to broader application stacks and developer platforms.', scope: 'Entries include adapters, plugins, workflow components, middleware, and connectors that bring Jev into existing frameworks, data systems, or automation pipelines.' },
    'agent-tooling': { intro: 'Agent tooling uses Jev to make bounded decisions inside agentic systems.', scope: 'Projects may use Jev for routing, tool selection, validation, policy checks, candidate ranking, confidence gates, or escalation between automated and human workflows.' },
    'browser-and-computer-use': { intro: 'Browser and computer-use projects apply Jev to decisions made while operating websites, desktops, and user interfaces.', scope: 'Entries include browser agents, UI automation, action validation, navigation policies, and computer-use workflows with publicly verifiable Jev usage.' },
    applications: { intro: 'Jev applications turn typed probabilistic decisions into complete user-facing products and practical features.', scope: 'This category covers deployed apps, product prototypes, assistants, services, and domain-specific experiences where Jev contributes directly to application behavior.' },
    'games-and-simulations': { intro: 'Games and simulations use Jev for bounded choices in interactive or modeled environments.', scope: 'Entries include game mechanics, NPC behavior, scenario engines, simulations, and experimental worlds that use Jev for selection, scoring, or truth estimation.' },
    'demos-and-playgrounds': { intro: 'Demos and playgrounds provide small, inspectable ways to learn and test Jev.', scope: 'Projects include starter examples, interactive sandboxes, minimal reproductions, notebooks, and focused demonstrations of Jev primitives or integration patterns.' },
    'benchmarks-and-research': { intro: 'Benchmarks and research evaluate Jev behavior, decision quality, calibration, performance, and practical tradeoffs.', scope: 'Entries include datasets, evaluation harnesses, comparison studies, research prototypes, measurements, and reproducible experiments involving Jev.' },
    'other-lists': { intro: 'Other lists organize Jev projects, use cases, examples, and ecosystem updates for further discovery.', scope: 'These resources include curated indexes, radars, galleries, cookbooks, and community collections. Follow their upstream links and evidence to verify individual projects.' },
  },
  zh: {
    official: { intro: '官方 Jev 项目是 TypeSafe AI 发布或维护的核心实现、示例与资源。', scope: '本分类收录具有第一方所有权与官方文档依据的仓库，可用于核对 Jev API、基础能力和受支持的工作流。' },
    'sdks-and-clients': { intro: 'Jev SDK 与客户端帮助应用从不同语言、运行时和部署环境调用 Jev。', scope: '收录语言客户端、类型化封装、API 辅助库、生成式绑定和可复用软件包，方便把 Jev 接入生产系统。' },
    'jev-like-models': { intro: 'Jev-like 模型探索与 Jev 相似的类型约束或概率决策接口。', scope: '项目可能是替代模型、开放运行时、兼容性实验或独立实现；被收录不代表与官方 Jev 完全兼容，也不代表获得 TypeSafe AI 背书。' },
    'frameworks-and-integrations': { intro: '框架与集成项目把 Jev 决策连接到更广泛的应用技术栈和开发平台。', scope: '收录适配器、插件、工作流组件、中间件和连接器，用于把 Jev 接入现有框架、数据系统或自动化流程。' },
    'agent-tooling': { intro: 'Agent 工具使用 Jev 在智能体系统中完成边界明确的决策。', scope: '常见用途包括任务路由、工具选择、调用校验、策略检查、候选排序、置信度门控，以及自动流程与人工处理之间的升级。' },
    'browser-and-computer-use': { intro: '浏览器与计算机操作项目把 Jev 用于网站、桌面和用户界面操作过程中的决策。', scope: '收录浏览器 Agent、界面自动化、动作校验、导航策略和具有公开 Jev 使用依据的计算机操作工作流。' },
    applications: { intro: 'Jev 应用把类型化概率决策转化为完整的用户产品和实用功能。', scope: '涵盖已部署应用、产品原型、助手、服务和垂直领域体验，其中 Jev 会直接影响应用行为。' },
    'games-and-simulations': { intro: '游戏与模拟项目使用 Jev 在交互式或建模环境中做边界明确的选择。', scope: '收录游戏机制、NPC 行为、场景引擎、模拟系统和实验性世界，并使用 Jev 进行选择、评分或真值估计。' },
    'demos-and-playgrounds': { intro: '演示与 Playground 提供小而清晰的 Jev 学习和测试入口。', scope: '收录入门示例、交互式沙盒、最小复现、Notebook，以及展示 Jev 基础能力或集成模式的聚焦示例。' },
    'benchmarks-and-research': { intro: '基准与研究项目评估 Jev 的行为、决策质量、校准程度、性能和实际取舍。', scope: '收录数据集、评估框架、对比研究、研究原型、测量工具和涉及 Jev 的可复现实验。' },
    'other-lists': { intro: '其他列表整理 Jev 项目、用例、示例和生态更新，便于进一步发现。', scope: '包括精选索引、生态雷达、项目画廊、Cookbook 和社区合集；应继续查看上游链接和证据来核验具体项目。' },
  },
  ja: {
    official: { intro: '公式Jevプロジェクトは、TypeSafe AIが公開または管理する主要な実装、例、リソースです。', scope: 'Jev API、プリミティブ、対応ワークフローの信頼できる根拠となる、公式所有・公式文書付きのリポジトリを掲載します。' },
    'sdks-and-clients': { intro: 'Jev SDKとクライアントは、さまざまな言語、ランタイム、環境からJevを利用しやすくします。', scope: '言語クライアント、型付きラッパー、APIヘルパー、生成バインディング、再利用可能なパッケージを掲載します。' },
    'jev-like-models': { intro: 'Jev-likeモデルは、Jevに似た型付き・制約付き・確率的な意思決定インターフェースを探究します。', scope: '代替モデル、オープンランタイム、互換実験、独立実装を含みます。掲載は公式互換性やTypeSafe AIの承認を意味しません。' },
    'frameworks-and-integrations': { intro: 'フレームワークと統合は、Jevの判断を幅広いアプリケーション基盤や開発プラットフォームへ接続します。', scope: '既存のフレームワーク、データ基盤、自動化パイプライン向けのアダプター、プラグイン、ミドルウェア、コネクターを掲載します。' },
    'agent-tooling': { intro: 'エージェントツールは、エージェントシステム内の範囲が明確な判断にJevを利用します。', scope: 'ルーティング、ツール選択、検証、ポリシーチェック、候補順位付け、信頼度ゲート、人へのエスカレーションなどを含みます。' },
    'browser-and-computer-use': { intro: 'ブラウザーとコンピューター操作のプロジェクトは、Webサイトやデスクトップを操作する際の判断にJevを適用します。', scope: 'ブラウザーエージェント、UI自動化、操作検証、ナビゲーション方針、Jev利用を確認できるコンピューター操作ワークフローを掲載します。' },
    applications: { intro: 'Jevアプリケーションは、型付き確率的判断をユーザー向け製品や実用機能に変換します。', scope: 'Jevが動作に直接関与する、公開アプリ、製品プロトタイプ、アシスタント、サービス、分野特化型体験を掲載します。' },
    'games-and-simulations': { intro: 'ゲームとシミュレーションは、対話型またはモデル化された環境での限定的な選択にJevを利用します。', scope: 'ゲーム機構、NPC行動、シナリオエンジン、シミュレーション、選択・評価・真偽推定を行う実験世界を掲載します。' },
    'demos-and-playgrounds': { intro: 'デモとプレイグラウンドは、Jevを学び試すための小さく確認しやすい環境を提供します。', scope: 'スターター例、対話型サンドボックス、最小再現、ノートブック、Jevプリミティブや統合パターンのデモを掲載します。' },
    'benchmarks-and-research': { intro: 'ベンチマークと研究は、Jevの挙動、判断品質、較正、性能、実用上のトレードオフを評価します。', scope: 'データセット、評価ハーネス、比較研究、研究プロトタイプ、測定、再現可能なJev実験を掲載します。' },
    'other-lists': { intro: 'その他のリストは、Jevプロジェクト、ユースケース、例、エコシステム更新を整理します。', scope: '厳選インデックス、レーダー、ギャラリー、クックブック、コミュニティ集を含みます。個別案件は上流リンクと根拠で確認してください。' },
  },
  ko: {
    official: { intro: '공식 Jev 프로젝트는 TypeSafe AI가 게시하거나 관리하는 핵심 구현, 예제 및 리소스입니다.', scope: 'Jev API, 기본 기능 및 지원 워크플로를 확인할 수 있는 공식 소유권과 문서가 있는 저장소를 포함합니다.' },
    'sdks-and-clients': { intro: 'Jev SDK와 클라이언트는 다양한 언어, 런타임 및 배포 환경에서 Jev를 호출하도록 돕습니다.', scope: '언어 클라이언트, 타입 래퍼, API 도우미, 생성 바인딩 및 프로덕션 통합을 위한 재사용 패키지를 포함합니다.' },
    'jev-like-models': { intro: 'Jev-like 모델은 Jev와 유사한 타입 기반, 제한형 또는 확률적 의사결정 인터페이스를 탐구합니다.', scope: '대안 모델, 오픈 런타임, 호환성 실험 또는 독립 구현을 포함할 수 있습니다. 등재가 공식 호환성이나 TypeSafe AI의 보증을 의미하지는 않습니다.' },
    'frameworks-and-integrations': { intro: '프레임워크와 통합은 Jev 결정을 더 넓은 애플리케이션 스택과 개발 플랫폼에 연결합니다.', scope: '기존 프레임워크, 데이터 시스템 또는 자동화 파이프라인에 Jev를 연결하는 어댑터, 플러그인, 미들웨어 및 커넥터를 포함합니다.' },
    'agent-tooling': { intro: '에이전트 도구는 에이전트 시스템 안에서 범위가 정해진 결정을 내리는 데 Jev를 사용합니다.', scope: '라우팅, 도구 선택, 검증, 정책 확인, 후보 순위, 신뢰도 게이트 및 자동화에서 사람으로의 에스컬레이션을 포함합니다.' },
    'browser-and-computer-use': { intro: '브라우저와 컴퓨터 사용 프로젝트는 웹사이트, 데스크톱 및 UI를 조작할 때의 결정에 Jev를 적용합니다.', scope: '브라우저 에이전트, UI 자동화, 작업 검증, 탐색 정책 및 공개적으로 Jev 사용을 확인할 수 있는 컴퓨터 사용 워크플로를 포함합니다.' },
    applications: { intro: 'Jev 애플리케이션은 타입이 있는 확률적 결정을 완성된 사용자 제품과 실용 기능으로 전환합니다.', scope: 'Jev가 애플리케이션 동작에 직접 기여하는 배포 앱, 제품 프로토타입, 도우미, 서비스 및 분야별 경험을 포함합니다.' },
    'games-and-simulations': { intro: '게임과 시뮬레이션은 상호작용 또는 모델링 환경의 제한된 선택에 Jev를 사용합니다.', scope: '게임 메커니즘, NPC 행동, 시나리오 엔진, 시뮬레이션 및 Jev로 선택·점수·진실성을 추정하는 실험 세계를 포함합니다.' },
    'demos-and-playgrounds': { intro: '데모와 플레이그라운드는 Jev를 배우고 시험할 수 있는 작고 확인하기 쉬운 환경을 제공합니다.', scope: '시작 예제, 대화형 샌드박스, 최소 재현, 노트북 및 Jev 기본 기능이나 통합 패턴을 보여 주는 데모를 포함합니다.' },
    'benchmarks-and-research': { intro: '벤치마크와 연구는 Jev의 동작, 결정 품질, 보정, 성능 및 실용적 장단점을 평가합니다.', scope: '데이터셋, 평가 하네스, 비교 연구, 연구 프로토타입, 측정 및 재현 가능한 Jev 실험을 포함합니다.' },
    'other-lists': { intro: '기타 목록은 Jev 프로젝트, 사용 사례, 예제 및 생태계 업데이트를 정리해 추가 탐색을 돕습니다.', scope: '큐레이션 인덱스, 레이더, 갤러리, 쿡북 및 커뮤니티 모음을 포함합니다. 개별 프로젝트는 원본 링크와 근거로 확인하세요.' },
  },
  es: {
    official: { intro: 'Los proyectos oficiales de Jev son implementaciones, ejemplos y recursos principales publicados o mantenidos por TypeSafe AI.', scope: 'Incluye repositorios propios cuya titularidad y documentación ofrecen evidencia autorizada sobre las API, primitivas y flujos compatibles con Jev.' },
    'sdks-and-clients': { intro: 'Los SDK y clientes de Jev permiten utilizarlo desde distintos lenguajes, entornos de ejecución y despliegues.', scope: 'Incluye clientes por lenguaje, envoltorios tipados, asistentes de API, bindings generados y paquetes reutilizables para integrar Jev en producción.' },
    'jev-like-models': { intro: 'Los modelos Jev-like exploran interfaces de decisión tipadas, restringidas o probabilísticas similares a Jev.', scope: 'Pueden ser modelos alternativos, runtimes abiertos, experimentos compatibles o implementaciones independientes. La inclusión no implica compatibilidad oficial ni respaldo de TypeSafe AI.' },
    'frameworks-and-integrations': { intro: 'Los frameworks e integraciones conectan las decisiones de Jev con plataformas y pilas de aplicaciones más amplias.', scope: 'Incluye adaptadores, plugins, middleware y conectores para incorporar Jev a frameworks, sistemas de datos o procesos de automatización existentes.' },
    'agent-tooling': { intro: 'Las herramientas para agentes usan Jev para tomar decisiones acotadas dentro de sistemas agénticos.', scope: 'Incluye enrutamiento, selección de herramientas, validación, controles de políticas, ranking, umbrales de confianza y escalado a personas.' },
    'browser-and-computer-use': { intro: 'Los proyectos de navegador y uso del ordenador aplican Jev a decisiones al operar sitios web, escritorios e interfaces.', scope: 'Incluye agentes de navegador, automatización de UI, validación de acciones, políticas de navegación y flujos con uso público y verificable de Jev.' },
    applications: { intro: 'Las aplicaciones Jev convierten decisiones probabilísticas tipadas en productos completos y funciones prácticas.', scope: 'Incluye aplicaciones desplegadas, prototipos, asistentes, servicios y experiencias especializadas donde Jev influye directamente en el comportamiento.' },
    'games-and-simulations': { intro: 'Los juegos y simulaciones usan Jev para decisiones acotadas en entornos interactivos o modelados.', scope: 'Incluye mecánicas, comportamiento de NPC, motores de escenarios, simulaciones y mundos experimentales que usan selección, puntuación o estimación de verdad.' },
    'demos-and-playgrounds': { intro: 'Las demos y playgrounds ofrecen formas pequeñas e inspeccionables de aprender y probar Jev.', scope: 'Incluye ejemplos iniciales, sandboxes interactivos, reproducciones mínimas, notebooks y demostraciones de primitivas o patrones de integración.' },
    'benchmarks-and-research': { intro: 'Los benchmarks y la investigación evalúan el comportamiento, la calidad, la calibración, el rendimiento y los compromisos de Jev.', scope: 'Incluye datasets, herramientas de evaluación, estudios comparativos, prototipos, mediciones y experimentos reproducibles con Jev.' },
    'other-lists': { intro: 'Otras listas organizan proyectos, casos de uso, ejemplos y novedades del ecosistema Jev.', scope: 'Incluye índices, radares, galerías, recetarios y colecciones comunitarias. Verifica cada proyecto mediante sus enlaces y evidencias originales.' },
  },
  'pt-br': {
    official: { intro: 'Os projetos oficiais do Jev são implementações, exemplos e recursos principais publicados ou mantidos pela TypeSafe AI.', scope: 'Inclui repositórios próprios cuja titularidade e documentação oferecem evidências confiáveis sobre APIs, recursos básicos e fluxos compatíveis com o Jev.' },
    'sdks-and-clients': { intro: 'SDKs e clientes Jev permitem usar o serviço em diferentes linguagens, runtimes e ambientes de implantação.', scope: 'Inclui clientes por linguagem, wrappers tipados, auxiliares de API, bindings gerados e pacotes reutilizáveis para integrar Jev em produção.' },
    'jev-like-models': { intro: 'Modelos Jev-like exploram interfaces de decisão tipadas, restritas ou probabilísticas semelhantes ao Jev.', scope: 'Podem ser modelos alternativos, runtimes abertos, experimentos compatíveis ou implementações independentes. A inclusão não indica compatibilidade oficial nem endosso da TypeSafe AI.' },
    'frameworks-and-integrations': { intro: 'Frameworks e integrações conectam decisões do Jev a plataformas e stacks de aplicações mais amplas.', scope: 'Inclui adaptadores, plugins, middleware e conectores que levam Jev a frameworks, sistemas de dados ou pipelines de automação existentes.' },
    'agent-tooling': { intro: 'Ferramentas de agentes usam Jev para decisões delimitadas dentro de sistemas agênticos.', scope: 'Inclui roteamento, seleção de ferramentas, validação, verificações de política, ranking, limites de confiança e escalonamento para pessoas.' },
    'browser-and-computer-use': { intro: 'Projetos de navegador e uso do computador aplicam Jev a decisões tomadas ao operar sites, desktops e interfaces.', scope: 'Inclui agentes de navegador, automação de UI, validação de ações, políticas de navegação e fluxos com uso público e verificável do Jev.' },
    applications: { intro: 'Aplicações Jev transformam decisões probabilísticas tipadas em produtos completos e recursos práticos.', scope: 'Inclui aplicativos publicados, protótipos, assistentes, serviços e experiências especializadas em que Jev influencia diretamente o comportamento.' },
    'games-and-simulations': { intro: 'Jogos e simulações usam Jev para escolhas delimitadas em ambientes interativos ou modelados.', scope: 'Inclui mecânicas, comportamento de NPCs, motores de cenários, simulações e mundos experimentais com seleção, pontuação ou estimativa de verdade.' },
    'demos-and-playgrounds': { intro: 'Demos e playgrounds oferecem formas pequenas e inspecionáveis de aprender e testar Jev.', scope: 'Inclui exemplos iniciais, sandboxes interativos, reproduções mínimas, notebooks e demonstrações de primitivas ou padrões de integração.' },
    'benchmarks-and-research': { intro: 'Benchmarks e pesquisas avaliam comportamento, qualidade, calibração, desempenho e compromissos práticos do Jev.', scope: 'Inclui datasets, ferramentas de avaliação, estudos comparativos, protótipos, medições e experimentos reproduzíveis envolvendo Jev.' },
    'other-lists': { intro: 'Outras listas organizam projetos, casos de uso, exemplos e atualizações do ecossistema Jev.', scope: 'Inclui índices, radares, galerias, cookbooks e coleções da comunidade. Verifique cada projeto pelos links e evidências originais.' },
  },
};

const ui: Record<Locale, GuideUi> = {
  en: { eyebrow: 'Category guide', title: (c) => `What does the ${c} category include?`, faqTitle: (c) => `${c} FAQ`, sourceTitle: 'Which sources support this category?', sourceIntro: 'bestjev grounds this category in named primary sources:', scopeQuestion: (c) => `What qualifies for the ${c} category?`, compareQuestion: (c) => `How should I compare ${c} projects?`, compareAnswer: 'Start with the documented use case, repository activity, primary language, license, and visible Jev implementation. GitHub stars are a dated discovery signal, not a quality score.', evidenceQuestion: (c) => `How does bestjev verify ${c} entries?`, evidenceAnswer: 'bestjev checks public repositories, project-authored documentation, code, demos, and other visible evidence. Always confirm current behavior and compatibility in the upstream project.' },
  zh: { eyebrow: '分类指南', title: (c) => `${c}分类收录什么？`, faqTitle: (c) => `${c}常见问题`, sourceTitle: '这个分类依据哪些来源？', sourceIntro: 'bestjev 使用以下具名的一手来源作为分类依据：', scopeQuestion: (c) => `什么项目符合${c}分类？`, compareQuestion: (c) => `应该如何比较${c}项目？`, compareAnswer: '先查看项目用例、仓库活跃度、主要语言、许可证和可以确认的 Jev 实现。GitHub Star 只是特定日期的发现信号，不代表质量排名。', evidenceQuestion: (c) => `bestjev 如何核验${c}条目？`, evidenceAnswer: 'bestjev 会检查公开仓库、项目方文档、代码、演示和其他可见依据。实际使用前仍应到上游项目确认最新行为与兼容性。' },
  ja: { eyebrow: 'カテゴリーガイド', title: (c) => `${c}カテゴリーには何が含まれますか？`, faqTitle: (c) => `${c}のよくある質問`, sourceTitle: 'このカテゴリーはどの情報源に基づいていますか？', sourceIntro: 'bestjevは、次の名称が明示された一次情報をカテゴリーの根拠にしています：', scopeQuestion: (c) => `どのようなプロジェクトが${c}に該当しますか？`, compareQuestion: (c) => `${c}プロジェクトはどう比較すべきですか？`, compareAnswer: '用途、リポジトリの活動、主要言語、ライセンス、確認可能なJev実装から比較してください。GitHubスターは特定日の発見指標であり、品質評価ではありません。', evidenceQuestion: (c) => `bestjevは${c}の項目をどう検証しますか？`, evidenceAnswer: '公開リポジトリ、プロジェクト文書、コード、デモなどの根拠を確認します。最新の挙動と互換性は上流プロジェクトでも確認してください。' },
  ko: { eyebrow: '범주 안내', title: (c) => `${c} 범주에는 무엇이 포함되나요?`, faqTitle: (c) => `${c} 자주 묻는 질문`, sourceTitle: '이 범주는 어떤 출처를 근거로 하나요?', sourceIntro: 'bestjev는 다음과 같은 이름이 명시된 1차 출처를 범주의 근거로 사용합니다:', scopeQuestion: (c) => `어떤 프로젝트가 ${c}에 포함되나요?`, compareQuestion: (c) => `${c} 프로젝트는 어떻게 비교해야 하나요?`, compareAnswer: '문서화된 사용 사례, 저장소 활동, 주요 언어, 라이선스 및 확인 가능한 Jev 구현부터 살펴보세요. GitHub 스타는 특정 날짜의 탐색 신호이며 품질 점수가 아닙니다.', evidenceQuestion: (c) => `bestjev는 ${c} 항목을 어떻게 검증하나요?`, evidenceAnswer: '공개 저장소, 프로젝트 문서, 코드, 데모 및 기타 확인 가능한 근거를 검토합니다. 최신 동작과 호환성은 원본 프로젝트에서도 확인하세요.' },
  es: { eyebrow: 'Guía de categoría', title: (c) => `¿Qué incluye la categoría ${c}?`, faqTitle: (c) => `Preguntas frecuentes sobre ${c}`, sourceTitle: '¿Qué fuentes respaldan esta categoría?', sourceIntro: 'bestjev fundamenta esta categoría en fuentes primarias identificadas:', scopeQuestion: (c) => `¿Qué proyectos se incluyen en ${c}?`, compareQuestion: (c) => `¿Cómo comparar proyectos de ${c}?`, compareAnswer: 'Empieza por el caso de uso, la actividad del repositorio, el lenguaje, la licencia y la implementación visible de Jev. Las estrellas de GitHub son una señal fechada, no una puntuación de calidad.', evidenceQuestion: (c) => `¿Cómo verifica bestjev las entradas de ${c}?`, evidenceAnswer: 'bestjev revisa repositorios públicos, documentación del proyecto, código, demos y otras evidencias visibles. Confirma el comportamiento y la compatibilidad actuales en el proyecto original.' },
  'pt-br': { eyebrow: 'Guia da categoria', title: (c) => `O que a categoria ${c} inclui?`, faqTitle: (c) => `Perguntas frequentes sobre ${c}`, sourceTitle: 'Quais fontes sustentam esta categoria?', sourceIntro: 'O bestjev fundamenta esta categoria em fontes primárias identificadas:', scopeQuestion: (c) => `Quais projetos entram em ${c}?`, compareQuestion: (c) => `Como comparar projetos de ${c}?`, compareAnswer: 'Comece pelo caso de uso, atividade do repositório, linguagem, licença e implementação visível do Jev. Estrelas do GitHub são um sinal datado, não uma nota de qualidade.', evidenceQuestion: (c) => `Como o bestjev verifica itens de ${c}?`, evidenceAnswer: 'O bestjev revisa repositórios públicos, documentação do projeto, código, demos e outras evidências visíveis. Confirme comportamento e compatibilidade atuais no projeto original.' },
};

export const getCategoryGuide = (locale: Locale, categoryId: string, categoryName: string): CategoryGuide | undefined => {
  const copy = guides[locale][categoryId];
  if (!copy) return undefined;
  const labels = ui[locale];
  return {
    ...copy,
    eyebrow: labels.eyebrow,
    title: labels.title(categoryName),
    faqTitle: labels.faqTitle(categoryName),
    sourceTitle: labels.sourceTitle,
    sourceIntro: labels.sourceIntro,
    faqs: [
      { question: labels.scopeQuestion(categoryName), answer: copy.scope },
      { question: labels.compareQuestion(categoryName), answer: labels.compareAnswer },
      { question: labels.evidenceQuestion(categoryName), answer: labels.evidenceAnswer },
    ],
  };
};

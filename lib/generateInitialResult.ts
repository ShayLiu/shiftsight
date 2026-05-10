import { TestAnswer, StuckType, InitialResult } from '@/types/test';
import { determineStuckType, getSecondaryType } from './determineStuckType';
import { calculateActionPosition } from './calculateActionPosition';
import { calculateConstraintScores } from './calculateConstraintScores';
import { calculateDashboardScores } from './calculateDashboardScores';

function getIdentity(answers: TestAnswer[]): string {
  const q1 = answers.find((a) => a.questionId === 'q1');
  return q1?.value === 'phd' ? '博士/博士生'
    : q1?.value === 'executive' ? '高管/管理者'
    : q1?.value === 'doctor' ? '医生'
    : q1?.value === 'lawyer' ? '律师'
    : q1?.value === 'consultant' ? '咨询顾问'
    : q1?.value === 'finance' ? '金融从业者'
    : q1?.value === 'entrepreneur' ? '创业者'
    : q1?.value === 'professional' ? '高学历职场人'
    : '专业人士';
}

function getTimeAvailable(answers: TestAnswer[]): string {
  const q7 = answers.find((a) => a.questionId === 'q7');
  return q7?.label || '有限的时间';
}

function getTopResource(answers: TestAnswer[]): string {
  const q8 = answers.find((a) => a.questionId === 'q8');
  return q8?.label || '专业能力';
}

function getTopFear(answers: TestAnswer[]): string {
  const q6 = answers.find((a) => a.questionId === 'q6');
  return q6?.label || '未知风险';
}

function getTrigger(answers: TestAnswer[]): string {
  const q3 = answers.find((a) => a.questionId === 'q3');
  return q3?.label || '近期的变化';
}

function getWorry(answers: TestAnswer[]): string {
  const q4 = answers.find((a) => a.questionId === 'q4');
  return q4?.label || '现状持续恶化';
}

interface ResultTemplate {
  title: string;
  buildSummary: (id: string, trigger: string) => string;
  coreConflict: string;
  realRisk: (fear: string, worry: string) => string;
  amplifiedFear: string;
  keyVariables: (id: string, resource: string, time: string) => string[];
  notRecommended: string[];
  minimalAction: (id: string) => string;
  sevenDayExperiment: (id: string, resource: string) => string;
  reflectionQuestions: string[];
}

const TEMPLATES: Record<StuckType, ResultTemplate> = {
  high_pressure_low_action: {
    title: '高压低行动型',
    buildSummary: (id, trigger) =>
      `作为${id}，你最近因为「${trigger}」而感到压力加剧。你不是缺少想法，而是想法太多、压力太大，导致行动力被消耗。你需要的不是更多信息，而是一个足够小的起点。`,
    coreConflict:
      '你的信息输入远大于行动输出。你在"想清楚再做"和"再不做就来不及了"之间反复拉扯。这种拉扯本身就是最大的消耗——你既没有选择不动，也没有真正开始。',
    realRisk: (fear, worry) =>
      `你最担心的「${fear}」是合理的顾虑，但它正在被焦虑放大。如果 3 个月不变，真正的风险是「${worry}」，而不是你想象中的全面崩溃。`,
    amplifiedFear:
      '你可能高估了"做错"的代价，低估了"不做"的代价。大多数让你焦虑的最坏情况并不会同时发生，而持续犹豫的精力消耗是确定的。',
    keyVariables: (id, resource, time) => [
      `你每周可用时间：${time}——这决定了行动方案的颗粒度`,
      `你最有价值的资源是「${resource}」——这是你行动的起点`,
      '你的决策标准是否清晰——没有标准时任何选项都让人焦虑',
      '你的信息来源质量——二手焦虑和一手经验对判断的影响完全不同',
      '你是否有一个可以讨论真实想法的人——孤立决策会放大恐惧',
    ],
    notRecommended: [
      '不要在深夜或情绪低谷时做任何重大决定',
      '不要继续无目的地刷行业文章、转型故事和成功案例',
      '不要同时启动多个方向——先选一个最小的验证',
      '不要把"想清楚"作为行动的前提——很多事想不清楚，做了才知道',
    ],
    minimalAction: (id) =>
      `今天拿出一张纸，写下 3 个最消耗你精力的问题。划掉你无法控制的那些。剩下的里面，选最小的一个，写出一个 15 分钟内能完成的动作。做完它。作为${id}，你需要用一次"完成"来打破"一直在想"的循环。`,
    sevenDayExperiment: (id, resource) =>
      `用 7 天做一次"信息断食"实验：停止所有关于职业焦虑的内容输入（文章、播客、朋友圈），只专注完成每天一个 15 分钟的小任务。第 7 天回顾：你的焦虑是增加了还是减少了？你利用「${resource}」完成了什么？`,
    reflectionQuestions: [
      '过去一周，你在"想"和"做"上分别花了多少时间？',
      '如果只能选一个问题解决，你会选哪个？',
      '你最近做成的一件小事是什么？那次是怎么开始的？',
    ],
  },

  capable_not_externalized: {
    title: '有能力但未外化型',
    buildSummary: (id, trigger) =>
      `作为${id}，你有扎实的专业积累，但这些能力主要被组织内部或学术体系认可。最近「${trigger}」让你意识到，你的价值需要被更广泛地看见和理解。`,
    coreConflict:
      '你的核心矛盾是：内部评价体系和外部市场价值之间存在鸿沟。你习惯了被组织评价，但外部世界不按论文数、职称或 KPI 来衡量你——它看的是你能帮谁解决什么问题。',
    realRisk: (fear, worry) =>
      `你担心「${fear}」，但真正的风险不是外化本身有什么代价，而是如果不开始，「${worry}」会持续下去。你的能力不会因为你不展示就自动贬值，但也不会因为你不展示就自动被看见。`,
    amplifiedFear:
      '你可能觉得"专业人士不应该做这些"，或者"我的东西不值得分享"。这不是事实判断，而是长期在封闭体系内工作形成的心理惯性。',
    keyVariables: (id, resource, time) => [
      `你的核心资源「${resource}」——这是你外化的素材`,
      '你能帮谁解决什么具体问题——这决定了你的外部定位',
      `你每周可投入时间 ${time}——决定了第一步做内容、咨询还是服务`,
      '你是否有一个可以开始的小平台（朋友圈、社群、专业论坛）',
      '你对"被评价"的心理承受力——外化意味着接受外部反馈',
    ],
    notRecommended: [
      '不要一开始就做系统课程、付费社群或复杂的商业模式',
      '不要用"我还没准备好"作为不开始的理由——60 分就够了',
      '不要否定你在组织内的积累——它是你外化的原料',
      '不要只关注变现——先建立外部信任，变现是结果',
    ],
    minimalAction: (id) =>
      `打开备忘录，写下过去 2 年里至少 3 次「别人主动向你请教的问题」。这些就是你的外部价值信号。从中选一个你最有把握回答的问题，用 300 字写清楚你的观点。作为${id}，你不缺能力，缺的是第一次把它写下来。`,
    sevenDayExperiment: (id, resource) =>
      `挑战：7 天写 3 条专业内容（每条 200-500 字），发在你最常用的社交平台或专业社群。主题围绕你的「${resource}」。不追求完美，追求完成。第 7 天统计：有多少人回应？谁回应了？他们关心什么？`,
    reflectionQuestions: [
      '如果有人花钱请你帮忙解决一个问题，那会是什么问题？',
      '你觉得自己最独特的职业经验是什么？',
      '你愿意在哪个平台上先做一次尝试？是什么阻止了你？',
    ],
  },

  clear_but_bound: {
    title: '清晰但被绑定型',
    buildSummary: (id, trigger) =>
      `作为${id}，你对自己想要什么其实有初步判断，但现有的工作、收入、身份或关系让你无法轻易行动。「${trigger}」让这种拉扯更明显了。`,
    coreConflict:
      '你面对的不是选择困难，而是退出成本评估。你知道当前路径有问题，但也知道离开的代价不低。你需要的不是鼓励你跳出去，而是帮你建立一个"不离开也能开始准备"的并行方案。',
    realRisk: (fear, worry) =>
      `「${fear}」是你最大的顾虑，这说明你不是冲动型决策者。但如果一直等"万事俱备"，「${worry}」会成为现实。你需要在保持稳定的前提下，创造至少一个外部选择权。`,
    amplifiedFear:
      '你可能高估了"改变"必须是一次大动作。实际上，大多数成功转型都是先在主业之外建立了一个小据点，验证了可行性之后才切换的。',
    keyVariables: (id, resource, time) => [
      `你不能轻易离开的核心原因是什么——这决定了你的行动边界`,
      `你每周有 ${time}——这是你并行探索的带宽`,
      `你最有价值的「${resource}」是否只在组织内有用——还是外部也需要`,
      '你是否已经有任何外部机会或信号',
      '你设想的理想状态是什么样的——不需要完美，但需要方向',
    ],
    notRecommended: [
      '不要在没有 Plan B 的情况下辞职或正面冲突',
      '不要等一个"完美时机"——它不会来',
      '不要把所有希望放在组织改善上——同时建设外部选择权',
      '不要对同事或领导过早透露你的想法——先做到有底气再谈',
    ],
    minimalAction: (id) =>
      `拿出一张纸分两栏：左栏写"我不能轻易离开的 3 个原因"，右栏写"我可以在不离开的前提下做的 3 件事"。作为${id}，你的目标不是逃跑，而是在保持稳定的同时建立第二根支柱。`,
    sevenDayExperiment: (id, resource) =>
      `用 7 天完成一次"外部信号收集"：联系 2 个你领域内已经做了你想做的事的人（不一定认识，可以在社交媒体私信），各聊 20 分钟。问他们三个问题：是怎么开始的？最大的坑是什么？如果重来会怎么做？`,
    reflectionQuestions: [
      '如果维持现状 1 年，你最不能接受的结果是什么？',
      '你身边有没有人在类似处境下成功转换的？他们是怎么做的？',
      '你现在是否有至少一个"不靠现有组织也能做的事"？',
    ],
  },

  want_transition_low_risk: {
    title: '想转型但风险承受低型',
    buildSummary: (id, trigger) =>
      `作为${id}，你内心有转型的冲动，但对风险的敏感度很高。「${trigger}」激发了你的想法，但你担心万一走错了无法回头。你需要的不是勇气，而是一个低成本验证方法。`,
    coreConflict:
      '你真正需要做的不是"转型"这个大动作，而是用最小代价回答一个问题：新方向是否真的适合我？你把"验证"和"转型"混为一谈了——验证不需要离开现有位置，也不需要公开宣布。',
    realRisk: (fear, worry) =>
      `你最怕「${fear}」，这恰恰说明你不会冲动行事。但过度的风险规避本身也是一种风险——如果什么都不试，「${worry}」就会成为你一年后的真实处境。`,
    amplifiedFear:
      '你可能把"尝试"和"全面切换"画了等号。一次 20 分钟的信息交流、一个周末的小实验、一篇试水文章——这些都不是转型，而是信息收集。',
    keyVariables: (id, resource, time) => [
      '你想转向的方向是否有具体画像——"做点别的"不是方向',
      '你在新方向上有多少一手信息——看文章不算',
      `你每周 ${time} 的时间够做什么样的验证`,
      `你的「${resource}」在新方向是否有用`,
      '最差情况下你能承受多少个月的过渡期',
    ],
    notRecommended: [
      '不要在没有一手信息的情况下做出重大决定',
      '不要辞职去"想清楚"——在职验证成本更低',
      '不要把别人的转型故事当作自己的路线图——幸存者偏差很强',
      '不要花钱报课来"准备转型"——先和真正做过的人聊聊',
    ],
    minimalAction: (id) =>
      `打开通讯录或社交媒体，找到 2 个正在做你想做方向的人。给他们发一条消息："你好，我是${id}，正在考虑往这个方向探索，能否占用你 15 分钟聊聊你的经验？"。真实对话比 100 篇文章更有用。`,
    sevenDayExperiment: (id, resource) =>
      `用 7 天完成一次"最小转型验证"：第 1-2 天确定一个具体方向，第 3-4 天联系 2 个行内人，第 5-6 天做一次最小形式的实践（写一篇内容/做一次免费服务/参加一次活动），第 7 天回顾：我是更想做了还是更犹豫了？`,
    reflectionQuestions: [
      '你想转的方向，你做过任何哪怕最小的实际行动吗？',
      '如果这个方向失败了，最坏的结果是什么？你能承受吗？',
      '有没有一种不用辞职就能验证的方式？',
    ],
  },

  want_monetize_unclear: {
    title: '想变现但目标不清型',
    buildSummary: (id, trigger) =>
      `作为${id}，你有变现的意愿，也有专业积累，但目前还没有回答清楚三个核心问题：帮谁、解决什么、交付什么。「${trigger}」激发了你的想法，但模糊的方向比没有方向更危险。`,
    coreConflict:
      '你的瓶颈不是"没有能力变现"，而是没有把能力翻译成别人能理解、信任并愿意购买的形式。在你回答清楚"我帮谁解决什么问题"之前，任何变现动作都是试错，而不是建设。',
    realRisk: (fear, worry) =>
      `你担心「${fear}」，这种谨慎是对的。但变现的第一步不需要任何投入——只需要一次对话来验证需求。如果迟迟不开始，「${worry}」会持续下去。`,
    amplifiedFear:
      '你可能觉得变现需要一个完整的产品、一个漂亮的品牌和一大批粉丝。实际上，最成功的个人变现几乎都是从"帮一个人解决了一个具体问题"开始的。',
    keyVariables: (id, resource, time) => [
      '你想帮助什么样的人——越具体越好',
      '这些人最愿意为什么结果付费——不是知识，而是结果',
      `你的「${resource}」能交付什么具体结果`,
      `你每周有 ${time}——决定做咨询、内容还是产品`,
      '你能接受的最低起步方式是什么——免费试做 vs 低价测试',
    ],
    notRecommended: [
      '不要在没有验证需求之前花时间做课程、写书或建社群',
      '不要把个人品牌放在变现前面——先有价值交付，品牌自然跟随',
      '不要学别人做知识付费——你的路径取决于你的能力和用户',
      '不要一开始就追求规模化——先服务好 3 个人',
    ],
    minimalAction: (id) =>
      `现在用一句话填空：「我帮助________（什么人）解决________（什么问题），让他们获得________（什么结果）」。如果你填不满，说明你的方向还不够具体。作为${id}，先把这句话想清楚比做任何事都重要。`,
    sevenDayExperiment: (id, resource) =>
      `7 天"需求验证"实验：第 1 天写出上面那句话；第 2-3 天在朋友圈或社群发一条："我最近在思考如何帮助 XX 人解决 XX 问题，有这方面困扰的朋友可以找我免费聊 20 分钟"；第 4-6 天完成 2-3 次免费交流；第 7 天回顾：有人来吗？他们真正的痛点是什么？和你想的一样吗？`,
    reflectionQuestions: [
      '如果只做一种形式的变现（咨询/内容/课程/工具），你最想做哪种？',
      '过去有没有人主动为你的建议或帮助付过费（哪怕请吃饭）？',
      '你认为自己和市场上其他选择的最大差异是什么？',
    ],
  },

  org_constrained: {
    title: '组织处境受限型',
    buildSummary: (id, trigger) =>
      `作为${id}，你的能力和贡献没有得到对等的认可或回报。「${trigger}」让你更清楚地意识到，你面对的不只是个人努力的问题，而是一个结构性问题。`,
    coreConflict:
      '你当前的困境本质上是一个定价问题：你的能力和贡献被组织的评价体系低估了。你可以选择试图改变组织对你的定价，或者去一个定价更公平的地方——但两条路都需要先拥有外部选择权作为底气。',
    realRisk: (fear, worry) =>
      `你担心「${fear}」，这是理性的。在组织中硬碰硬而没有退路是最危险的策略。但如果你只忍耐不行动，「${worry}」就是必然结果。关键是在保持安全的前提下建设谈判筹码。`,
    amplifiedFear:
      '你可能觉得"离开组织就什么都没了"。但你积累的专业能力、行业认知和问题解决经验并不属于组织——它们属于你。组织给你的是平台，但你在平台上建立的能力是可以带走的。',
    keyVariables: (id, resource, time) => [
      '你在组织中最不可替代的贡献是什么——这是你的谈判筹码',
      `你最有价值的「${resource}」——是否只在组织内有用`,
      '你的直属上级是你的支持者还是障碍',
      '组织的评价体系短期内有没有可能改变',
      '你目前有多少外部选择权——猎头联系、同行邀请、自由合作',
      `你每周有 ${time}——能做多少外部建设`,
    ],
    notRecommended: [
      '不要在没有外部选择权时和组织正面对抗',
      '不要只靠忍耐——忍耐不会自动改善你的处境',
      '不要向不信任的人透露你的不满或计划',
      '不要在情绪最差的时候做离开的决定——先恢复判断力',
    ],
    minimalAction: (id) =>
      `画一张你的"组织权力地图"：写出 3 个对你职业发展影响最大的人，标注他们是支持者、中立还是障碍。再写下你手中掌握的 3 个资源（技能、关系、信息）和你最缺的 1 个筹码。作为${id}，看清棋盘比着急下棋更重要。`,
    sevenDayExperiment: (id, resource) =>
      `7 天"双线建设"实验：内部线——选一个能展示你价值的小机会（汇报、提案、帮同事解决问题），主动做并让关键人看到；外部线——更新你的简历或职业档案，联系 1 个猎头或行业同行，了解外部机会的真实情况。第 7 天评估：内部还有没有空间？外部有没有可能？`,
    reflectionQuestions: [
      '如果你明天离开这个组织，你能带走什么？',
      '你在组织中最大的"不可替代性"是什么？如果没有，怎么建立？',
      '你有没有设过一个底线——什么情况下你一定会离开？',
    ],
  },
};

export function generateInitialResult(answers: TestAnswer[], optionalText: string): InitialResult {
  const resultType = determineStuckType(answers);
  const template = TEMPLATES[resultType];
  const identity = getIdentity(answers);
  const trigger = getTrigger(answers);
  const fear = getTopFear(answers);
  const worry = getWorry(answers);
  const resource = getTopResource(answers);
  const time = getTimeAvailable(answers);

  return {
    resultType,
    title: template.title,
    identity,
    summary: template.buildSummary(identity, trigger),
    coreConflict: template.coreConflict,
    realRisk: template.realRisk(fear, worry),
    amplifiedFear: template.amplifiedFear,
    keyVariables: template.keyVariables(identity, resource, time),
    notRecommended: template.notRecommended,
    minimalAction: template.minimalAction(identity),
    sevenDayExperiment: template.sevenDayExperiment(identity, resource),
    reflectionQuestions: template.reflectionQuestions,
    actionPosition: calculateActionPosition(answers),
    constraintScores: calculateConstraintScores(answers),
    dashboardScores: calculateDashboardScores(answers),
  };
}

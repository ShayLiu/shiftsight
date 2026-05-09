import { TestAnswer, StuckType, InitialResult } from '@/types/test';
import { determineStuckType } from './determineStuckType';

const RESULT_CONTENT: Record<StuckType, Omit<InitialResult, 'resultType'>> = {
  high_pressure_low_action: {
    title: '高压低行动型',
    coreConflict: '你现在不是缺少信息，而是信息过载削弱了行动能力。当前最重要的不是继续寻找完美答案，而是把问题缩小到一个可以执行的小动作。',
    notRecommended: '不建议继续大量刷信息、反复比较别人的路径，也不建议在情绪很累的时候做重大职业决定。',
    minimalAction: '未来 24 小时，只写下一个你最想解决的问题，并列出 3 个你能控制的小动作。只选其中最小的一个完成。',
    ctaText: '完整行动咨询单会继续追问你的具体约束，并生成关键变量、路径对比、风险边界、24小时/7天/14天/30天行动实验。',
  },
  capable_not_externalized: {
    title: '有能力但未外化型',
    coreConflict: '你不是没有价值，而是价值还停留在组织、学历或职位内部，尚未转化为外部也能理解、信任和购买的形式。',
    notRecommended: '不建议一开始就做大型课程、社群或复杂商业模式，也不建议马上否定自己的主业积累。',
    minimalAction: '写下过去 3 年别人找你帮忙最多的 3 件事，从中选出一个可以整理成清单、模板或分享的主题。',
    ctaText: '完整行动咨询单会继续追问你的具体约束，并生成关键变量、路径对比、风险边界、24小时/7天/14天/30天行动实验。',
  },
  clear_but_bound: {
    title: '清晰但被绑定型',
    coreConflict: '你不是完全没有方向，而是现有安全感和未来可能性之间存在拉扯。现在不适合激进跳出，而适合建立组织外部的第二选择权。',
    notRecommended: '不建议马上离开现有平台，也不建议用一次冲动选择解决长期结构问题。',
    minimalAction: '写下你当前不能轻易离开的 3 个原因，再写下一个不影响主业的外部小实验。',
    ctaText: '完整行动咨询单会继续追问你的具体约束，并生成关键变量、路径对比、风险边界、24小时/7天/14天/30天行动实验。',
  },
  want_transition_low_risk: {
    title: '想转型但风险承受低型',
    coreConflict: '你真正需要的不是马上转型，而是验证新方向是否值得投入。当前阶段应该先做低成本测试，而不是身份级改变。',
    notRecommended: '不建议立刻辞职、退学、离开主业或投入大量时间金钱进入新方向。',
    minimalAction: '选择一个你想转的方向，找 2 个已经在做的人交流，先获取真实信息，而不是马上行动。',
    ctaText: '完整行动咨询单会继续追问你的具体约束，并生成关键变量、路径对比、风险边界、24小时/7天/14天/30天行动实验。',
  },
  want_monetize_unclear: {
    title: '想变现但目标不清型',
    coreConflict: '你想把能力变成收入，但目前还没有明确回答：你帮谁、解决什么问题、交付什么结果。',
    notRecommended: '不建议马上卖课、做社群或包装个人品牌。先验证你能为谁解决什么具体问题。',
    minimalAction: '用一句话写清楚：我想帮助哪类人，解决什么具体问题，最后让他们获得什么结果。',
    ctaText: '完整行动咨询单会继续追问你的具体约束，并生成关键变量、路径对比、风险边界、24小时/7天/14天/30天行动实验。',
  },
  org_constrained: {
    title: '组织处境受限型',
    coreConflict: '你现在的问题不只是努力不够，而是处在一个资源、评价和话语权不完全由你控制的结构里。你需要同时评估内部谈判空间和外部选择权。',
    notRecommended: '不建议只靠忍耐，也不建议在没有外部选择权时直接硬碰硬。',
    minimalAction: '写下你在组织中掌握的 3 个资源，以及你目前最缺的 1 个筹码。',
    ctaText: '完整行动咨询单会继续追问你的具体约束，并生成关键变量、路径对比、风险边界、24小时/7天/14天/30天行动实验。',
  },
};

export function generateInitialResult(answers: TestAnswer[], optionalText: string): InitialResult {
  const resultType = determineStuckType(answers);
  const content = RESULT_CONTENT[resultType];

  return {
    resultType,
    ...content,
  };
}

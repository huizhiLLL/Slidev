---
theme: default
title: 基于单帧斜视图像的三阶魔方局部状态推断与公式匹配方法研究
info: |
  SITP 申报汇报。内容依据研究总纲第 14 章，7 页研究内容与 1 页致谢。
author: 胡泽亮
lang: zh-CN
colorSchema: light
aspectRatio: 16/9
canvasWidth: 1200
fonts:
  sans: MiSans
  serif: Noto Serif SC
  provider: none
  local: [MiSans, Noto Serif SC]
drawings:
  enabled: false
transition: view-transition
mdc: true
download: false
exportFilename: LLCV-SITP
layout: default
---

<div class="cover-layout">
  <div class="cover-copy">
    <p class="eyebrow">SITP 申报汇报</p>
    <h1 class="cover-title">基于单帧斜视图像的<br>三阶魔方局部状态推断<br>与公式匹配方法研究</h1>
    <p class="cover-description">面向三阶魔方单帧斜视照片，<br>推断局部状态，匹配适用公式。</p>
    <p class="cover-path"><span class="blue">图像感知</span><i>→</i><span class="green">状态推断</span><i>→</i><span class="orange">公式匹配</span></p>
    <p class="cover-author">汇报人：胡泽亮</p>
  </div>
  <div class="cover-visual">
    <AssetFrame name="input" class="cover-photo" />
    <div class="cover-prompts" lang="en" aria-hidden="true">
      <span class="prompt-case">Which case?</span>
      <span class="prompt-alg">Which alg?</span>
      <span class="prompt-how">How to do it?</span>
    </div>
  </div>
</div>

<DeckFooter page="01" />

<!--
用时：35 秒。累计：0:35。

这项研究来自玩家用照片查公式的需求。研究对象是三阶魔方的单帧斜视照片，任务是利用有限的可见色块推断局部状态，最终匹配适用公式。图像感知、状态推断和公式匹配是整套方法的三个层次。目前已有传统视觉版本接入 cuberoot.me，后续从这个可运行原型出发。

内容依据：研究总纲第 14.1、14.2 节第 1 页。照片由用户提供。
-->

---
layout: default
title: 一张照片中的有限观测
---

<p class="eyebrow">研究背景与问题边界</p>
<h1>一张照片中的有限观测</h1>

<div class="observation-layout">
  <div class="observation-visual">
    <AssetFrame name="observation" />
  </div>
  <div class="observation-copy">
    <p class="observation-demand">面对种类繁杂的公式库，如何快捷查询？</p>
    <div class="query-comparison">
      <p><span>一般场景</span>人工辨认情况查表 / 社区询问</p>
      <p><strong class="blue">本项目</strong>单张斜视照片 → 局部状态 → 适用公式</p>
    </div>
    <div class="observation-equation" aria-label="顶面九格，加两个侧面顶行各三格，共十五格">
      <div class="blue">9<small>顶面</small></div><i>+</i><div class="green">3<small>顶层左侧</small></div><i>+</i><div class="orange">3<small>顶层右侧</small></div><i>=</i><div>15<small>局部观测</small></div>
    </div>
    <div class="input-priors">
      <h2>第一阶段输入先验</h2>
      <dl>
        <div><dt>对象与参考</dt><dd>标准配色三阶魔方<br>固定参考系、合法状态</dd></div>
        <div><dt>状态与可见性</dt><dd><strong>F2L 完整复原且各层对齐</strong><br>顶面与两侧顶行清晰可见</dd></div>
      </dl>
    </div>
  </div>
</div>

<DeckFooter page="02" />

<!--
用时：65 秒。累计：1:40。

玩家在群聊或论坛里经常用照片交流魔方情况。人工查公式需要先辨认情况，多面录入则要额外拍摄和转动。我们希望把这一步变成单张照片查询。左图已经标出了观测范围：顶面九格、左侧顶行三格、右侧顶行三格，总共十五格。但这个信息量必须和输入先验一起理解：标准配色，固定参考系，合法魔方状态，尤其是前两层完整复原且各层对齐，相关区域清晰可见。在这些受控条件下，局部观测可以结合结构约束推断末层。F2L 已复原不能由这十五格自行验证，所以这不是任意打乱魔方的通用识别方案。

内容依据：研究总纲第 14.2 节第 2 页及第 14.3 节。15 格标注图由用户提供。
-->

---
layout: default
title: 从局部观测到适用公式
---

<p class="eyebrow">研究思路与核心原理</p>
<h1>从局部观测到适用公式</h1>

<ResearchFlow />

<div class="principle-layout">
  <section>
    <h2>状态不唯一 ≠ 公式不可查询</h2>
    <p><span class="green">状态可辨识性</span>：能否恢复唯一状态？<br><span class="orange">任务可辨识性</span>：是否存在共同适用公式？</p>
  </section>
  <section class="goal-validation">
    <h2>完整、非空候选集合上的验证</h2>
    <MathBlock expression="\forall s\in C,\quad G_T(A(s))=\mathrm{true}" />
    <p class="goal-legend"><strong>C</strong> 合法候选集合　<strong>A</strong> 待验证公式<br><strong>G<sub>T</sub></strong> 对应公式体系的目标条件</p>
  </section>
</div>

<DeckFooter page="03" />

<!--
用时：95 秒。累计：3:15。

方法分三层。视觉感知从边缘、直线寻找网格和角点，透视展开后采样十五格颜色。状态推断把颜色映射为角块、棱块的身份与朝向，用角扭转模三为零、棱翻转模二为零，以及角棱排列奇偶性一致筛选合法候选。约束能排除矛盾，但不能保证纠正所有视觉错误。

第三层查询公式库，考虑持握方向和 AUF 顶层对齐，再模拟验证。关键区别是状态不唯一，不等于公式不可查询。例如 OLL 只要求顶层朝向完成，不要求排列复原，多个候选可能共享适用公式。表达式中 C 是完整非空候选集合，A 是同一条公式，G_T 是对应体系目标。每个候选都通过、执行约定一致，才能返回；候选截断不能冒充完整验证。无共同公式则校正、补拍或拒识。这层机制已有实现，研究重点是完善不确定观测处理与可靠性评价。62,208 理想离散状态的穷举记录保留在备用 A，不代表照片准确率。

内容依据：研究总纲第 14.2 节第 3 页、第 14.3 节；已有能力核对依据见文档第 8.5、10.5 节。
-->

---
layout: default
title: 相关研究与项目切入点
---

<p class="eyebrow">相关工作</p>
<h1>相关研究与项目切入点</h1>

<table class="research-table">
  <thead><tr><th>技术方向</th><th>已有研究基础</th><th>本项目关注</th></tr></thead>
  <tbody>
    <tr><td><span class="blue">传统几何视觉</span></td><td>颜色、几何与结构先验重建可见面<small>Kasprzak 等，2007 · 单视角重建</small></td><td>定位单帧斜视网格<br>分析背景与透视干扰</td></tr>
    <tr><td><span class="green">学习辅助定位</span></td><td>CNN 定位魔方与面中心，结合传统视觉<small>Hack &amp; Shutzberg，2015 · CS231n 课程报告</small></td><td>视瓶颈探索关键点定位<br>共享透视与颜色后处理</td></tr>
    <tr><td><span class="orange">颜色识别</span></td><td>光照变化、颜色漂移与颜色分类<small>Liu 等，2019 · arXiv 预印本</small></td><td>独立检查颜色错误<br>保留观测可靠性信息</td></tr>
    <tr><td>魔方状态建模</td><td>Cubie 表示：块身份、朝向与排列<small>Kociemba / Heise · 状态表示与约束说明</small></td><td>局部观测 → 合法候选<br>按公式体系目标验证</td></tr>
  </tbody>
</table>

<div class="research-focus">
  <span>本项目切入点</span>
  <p>面向公式查询：<span class="blue">局部视觉观测</span> → <span class="green">合法状态推断</span> → <span class="orange">公式目标验证</span></p>
</div>

<DeckFooter page="04" />

<!--
用时：50 秒。累计：4:05。

按环节看已有基础。Kasprzak 等提供单视角重建的颜色与几何先验；Hack 与 Shutzberg 用 CNN 定位魔方及面中心，属于课程报告，不能称为本项目已训练的关键点模型。Liu 的预印本研究颜色漂移，不涉及几何定位或 Cubie 推断。状态建模沿用 Kociemba 的块表示和 Heise 的约束说明。右栏对应本项目关注的问题。项目不主张首次单图识别，重点是局部视觉、合法候选与公式目标验证的组合及可靠性。

代表文献来自研究总纲第 14.2 节第 4 页与第 12 章，状态建模资料来自第 3、9 章，未在本次制作中增加新文献或复现其性能。
完整标题与来源见 appendix.md 的参考资料页。课程报告和预印本的证据性质已在页面注明。
-->

---
layout: default
title: 已有原型：cuberoot.me/zh/alg/photo
---

<p class="eyebrow">前期工作与原型展示</p>
<h1 class="prototype-title">已有原型：<a href="https://cuberoot.me/zh/alg/photo" target="_blank" rel="noopener noreferrer">cuberoot.me/zh/alg/photo</a></h1>

<div class="prototype-gallery">
  <AssetFrame name="overview" class="prototype-overview" />
  <div class="prototype-copy">
    <p class="prototype-status"><strong>已实现</strong> / 传统视觉 + Web 接入</p>
    <p class="prototype-summary">合适拍摄条件下，真实照片<br>可完成识别与公式查询。</p>
    <section>
      <h2>完整流程</h2>
      <p class="prototype-pipeline">单帧照片 → <span class="blue">几何定位</span><br>→ 透视处理 → <span class="green">颜色识别</span><br>→ 状态约束 → <span class="orange">公式匹配</span></p>
    </section>
    <section>
      <h2>当前局限</h2>
      <p>复杂背景、光照 / 反光、角度变化<br>可能导致定位失败或颜色错误。</p>
    </section>
  </div>
</div>

<DeckFooter page="05" />

<!--
用时：80 秒。累计：5:25。

这一页是已经实现的工程基础。标题给出完整入口 cuberoot.me/zh/alg/photo，截图完整保留原始照片、网格标注和公式结果，不依赖现场上传。讲述时从截图中的照片指向几何标注，再指向右边的公式结果。右栏是实际处理链：单帧照片经过几何定位、透视处理和颜色识别，再进入状态约束和公式匹配。传统视觉中边缘与直线提供几何候选，网格规则帮助确定角点，整个流程不依赖针对魔方照片训练的神经网络。当前在合适条件下已可用，但背景干扰、光照、反光和拍摄角度变化仍可能造成定位失败和颜色错误。截图证明有可运行原型，不是统计性能证据。我们尚无系统量化结果，也未完成深度学习定位模型训练。后续要把这些失败整理成可解释、可复现的测试记录。

内容依据：研究总纲第 14.2 节第 5 页及第 14.3 节。原型截图由用户提供，原有三个占位合并为这一张完整截图，不依赖现场网络演示。
-->

---
layout: default
title: 后续研究与可靠性改进
---

<p class="eyebrow">后续研究内容与技术路线</p>
<h1>后续研究与可靠性改进</h1>

<div class="research-plan">
  <ResearchRoadmap />
  <section class="evaluation-plan">
    <h2>真实样本评价</h2>
    <table class="evaluation-table">
      <thead><tr><th>环节</th><th>拟记录指标</th></tr></thead>
      <tbody>
        <tr><td>几何定位</td><td>成功情况 / 角点误差</td></tr>
        <tr><td>颜色识别</td><td>单格 / 15 格整体正确率</td></tr>
        <tr><td>状态推断</td><td>真值候选覆盖 / 错误唯一解</td></tr>
        <tr><td>公式匹配</td><td>公式对真实状态的目标正确性</td></tr>
        <tr><td>系统表现</td><td>拒识 / 人工调整 / 处理时间</td></tr>
      </tbody>
    </table>
    <p class="evaluation-conditions">覆盖背景、光照、角度、反光与遮挡，<br>按成功、失败、拒识分别记录。</p>
  </section>
</div>

<DeckFooter page="06" />

<!--
用时：80 秒。累计：6:45。

三条研究线从现有原型出发。第一，整理失败样本，改进网格、角点、透视与颜色，分析背景、光照、角度影响。第二，保留颜色可靠性信息，处理低可靠色块，完善合法多候选、共同公式和拒识。颜色距离未经校准不能直接当作统计概率。第三，只有定位成为瓶颈时才探索关键点模型；尚未训练，不预设一定更好。

右侧是拟记录指标，不是实验结果。定位看成功情况和角点偏差，颜色区分单格与十五格整组正确，状态看真值覆盖和错误唯一解，公式要对真实状态验证目标。系统记录拒识、人工调整和耗时，同时报告输出覆盖与正确情况。测试覆盖背景、光照、角度、反光和遮挡，不符合输入条件允许拒识。如果比较学习定位，使用相同样本和统一下游，只替换定位模块，不承诺大规模训练或准确率。

内容依据：研究总纲第 14.2 节第 6 页、第 14.3 节；评价与遮挡条件遵循第 13.3 节，覆盖率及统一比较原则来自第 5.2、4.1 节，按第 13 章收敛实验粒度。
-->

---
layout: default
title: 计划安排与预期成果
---

<p class="eyebrow">研究计划与交付</p>
<h1>计划安排与预期成果</h1>

<ol class="project-timeline">
  <li><span class="phase blue">01 / 前期</span><strong>梳理基础</strong><p>文献与原型分析<br>明确输入与测试标准</p></li>
  <li><span class="phase green">02 / 中期</span><strong>完善方法</strong><p>传统视觉优化<br>状态约束与公式验证</p></li>
  <li><span class="phase orange">03 / 后期</span><strong>测试与探索</strong><p>真实样本可靠性评价<br>必要时探索学习定位</p></li>
  <li><span class="phase red">04 / 结题</span><strong>整合演示</strong><p>系统整合与应用演示<br>研究总结与报告</p></li>
</ol>

<div class="deliverables">
  <h2>预期交付</h2>
  <dl>
    <div><dt>方法</dt><dd>局部视觉观测、合法状态推断与公式匹配方法</dd></div>
    <div><dt>系统</dt><dd>完善 cuberoot.me Web 工具，<span class="green">现有入口已接入</span></dd></div>
    <div><dt>应用</dt><dd>AstrBot WCA 插件<span class="green">（已接入并验收）</span> / MCP · Agent 接口<span class="orange">（后续拓展）</span></dd></div>
  </dl>
</div>

<DeckFooter page="07" />

<!--
用时：40 秒。累计：7:25。

四个阶段各有明确输出：前期确定输入和测试规范，中期留下改进模块及记录，后期形成真实样本测试和失败分析，结题整合工具、演示和 SITP 报告。具体日期随学校周期安排。交付区分方法、系统、应用和研究记录：Web 是已有入口，继续完善；AstrBot WCA 插件也已接入并验收；MCP 或 Agent 专用接口只是总纲已有的后续应用展望，不作为本期核心研究承诺。项目以可运行原型为起点，用可复现记录评价可靠性。

内容依据：研究总纲第 14.2 节第 7 页；MCP / Agent 仅沿用第 4 章应用拓展背景；AstrBot 状态以用户 2026-11-04 最新确认的“已接入并验收”为准。研究内容结束，下一页致谢。备用资料仍为独立入口。
-->

---
layout: default
title: Thanks！
---

<div class="thanks-layout">
  <h1 class="thanks-title" lang="en">Thanks！</h1>
</div>

<DeckFooter page="08" />

<!--
用时：5 秒。累计：7:30。

谢谢各位老师，欢迎批评指正。

按用户要求增加致谢页，不增加研究内容。答辩备用页使用 appendix.md 独立入口，不计入主讲时间。
-->

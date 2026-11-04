---
theme: default
title: 基于单帧斜视图像的三阶魔方局部状态推断与公式匹配方法研究
info: |
  SITP 申报汇报。内容依据研究总纲第 14 章，7 页主体。
author: ''
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
用时：40 秒。累计：0:40。

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
    <p class="figure-caption">真实标注图：顶面与相邻两侧顶行</p>
  </div>
  <div class="observation-copy">
    <p class="observation-demand">玩家通过照片交流，能否直接查公式？</p>
    <div class="query-comparison">
      <p><span>人工查询</span>辨认情况 / 转动魔方逐面录入 → 查表</p>
      <p><strong class="blue">本项目</strong>单张斜视照片 → 局部状态 → 适用公式</p>
    </div>
    <div class="observation-equation" aria-label="顶面九格，加两个侧面顶行各三格，共十五格">
      <div class="blue">9<small>顶面</small></div><i>+</i><div class="green">3<small>左侧顶行</small></div><i>+</i><div class="orange">3<small>右侧顶行</small></div><i>=</i><div>15<small>局部观测</small></div>
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

<p class="boundary-note"><strong>15 格推断依赖上述先验，不适用于任意打乱状态。</strong><br>F2L 是否已复原，不能仅凭这 15 格自行验证。</p>
<DeckFooter page="02" />

<!--
用时：60 秒。累计：1:40。

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
    <p class="small-detail">例如 OLL 目标为顶层朝向完成，不要求排列复原。</p>
  </section>
  <section class="goal-validation">
    <h2>完整、非空候选集合上的验证</h2>
    <MathBlock expression="\forall s\in C,\quad G_T(A(s))=\mathrm{true}" />
    <p class="goal-legend"><strong>C</strong> 合法候选集合　<strong>A</strong> 待验证公式<br><strong>G<sub>T</sub></strong> 对应公式体系的目标条件</p>
  </section>
</div>

<p class="core-boundary">候选须完整，执行约定须一致；没有共同公式时，允许校正、补拍或拒识。</p>
<DeckFooter page="03" />

<!--
用时：75 秒。累计：2:55。

这一页把方法拆成三个层次。第一层从像素到颜色：预处理后用边缘与直线寻找网格和角点，通过透视变换展开面片，再在色块内部采样和分类。第二层从颜色到状态：Corner 和 Edge Cubies 分别是角块和棱块。把颜色对应到块身份、朝向和排列后，用角扭转总和模三为零、棱翻转总和模二为零，以及角棱排列奇偶性一致筛选合法候选。这些约束能排除矛盾，但不能保证纠正所有颜色错误。

第三层按任务验证公式：查询公式库，考虑持握方向和 AUF，也就是顶层对齐调整，再模拟执行。下面的区别是核心：状态不唯一，不等于公式不可查询。比如 OLL 只要求顶层朝向完成，不要求排列复原，所以某些不同状态候选可能共享同一条适用公式。右侧表达式中 C 是完整、非空的合法候选集合，A 是同一条待验证公式，G_T 是对应体系目标。只有每个候选都通过，且持握和执行约定一致，才能返回。候选截断不能冒充完整验证，没有共同公式则需要校正或拒识。合法补全与共同公式验证已有实现，后续研究重点是完善不确定观测处理和可靠性评价。理想离散状态的 62,208 穷举记录及边界放在备用 A，不代表照片准确率。

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
  <p>面向公式查询：<span class="blue">局部视觉观测</span> → <span class="green">合法状态推断</span> → <span class="orange">公式目标验证</span><br><small>基础技术已有先例，研究重点是上述任务组合及其可靠性。</small></p>
</div>

<DeckFooter page="04" />

<!--
用时：50 秒。累计：3:45。

相关研究按环节看。Kasprzak 等的单视角重建提供了颜色和几何先验的基础；Hack 与 Shutzberg 用 CNN 定位魔方及面中心，再结合传统视觉，属于课程报告，不是已验证的本项目关键点模型。Liu 等的预印本研究的是光照变化和颜色漂移，不能用来证明几何定位或 Cubie 推断。状态建模则沿用 Kociemba 的块表示与 Heise 的合法性约束说明。右栏对应我们在各环节要解决的问题。项目不主张首次实现单图魔方识别，关注的是局部视觉、合法候选和公式目标验证的任务组合，以及真实样本中的可靠性。

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
    <p class="prototype-evidence">已有工程基础；尚无系统量化结果。<br>深度学习定位模型尚未完成训练。</p>
  </div>
</div>

<DeckFooter page="05" />

<!--
用时：90 秒。累计：5:15。

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
        <tr><td>颜色识别</td><td>单格正确率<br>15 格整体正确率</td></tr>
        <tr><td>状态推断</td><td>真值候选覆盖<br>错误唯一解</td></tr>
        <tr><td>公式匹配</td><td>公式对真实状态的目标正确性</td></tr>
        <tr><td>系统表现</td><td>拒识 / 人工调整 / 处理时间</td></tr>
      </tbody>
    </table>
    <p class="evaluation-conditions">覆盖背景、光照、角度、反光与遮挡，<br>按成功、失败、拒识分别记录。</p>
  </section>
</div>

<p class="boundary-note">先由失败样本定位瓶颈；若引入学习模型，仅替换定位模块，共用颜色、状态与公式验证流程。<br>采用相同测试样本，报告输出覆盖与正确情况，不预设性能提升或大规模训练任务。</p>
<DeckFooter page="06" />

<!--
用时：65 秒。累计：6:20。

后续工作分三条。第一，整理真实失败样本，判断问题来自网格与角点定位，还是透视、颜色或输入先验，再针对背景、光照和角度改进。第二，完善不确定观测处理，保留颜色可靠性信息，处理低可靠色块，生成合法多候选并验证共同公式。已有候选验证机制还要补充系统评价，不能保证约束修复所有视觉错误，也不能把颜色距离当作已校准概率。第三，虚线表示后续探索：只有定位确实成为主要瓶颈，才尝试关键点检测辅助；目前模型未训练，也不预设一定优于传统方案。

右侧是拟记录的评价维度，不是已有实验结果。定位看成功情况与角点偏差，颜色区分单格与十五格整组正确，状态看候选有没有覆盖真值、有没有错误唯一解，公式则要对真实状态验证目标。系统同时记录拒识、人工调整和耗时，并报告输出覆盖与正确情况。测试条件包括背景、光照、角度、反光和遮挡，严重不符合输入条件的照片允许拒识。若比较学习模型，只替换定位，保持样本和下游处理一致。先做适度的真实样本测试，不承诺数据规模、网络结构或准确率。

内容依据：研究总纲第 14.2 节第 6 页、第 14.3 节；评价与遮挡条件遵循第 13.3 节，覆盖率及统一比较原则来自第 5.2、4.1 节，按第 13 章收敛实验粒度。
-->

---
layout: default
title: 计划安排与预期成果
---

<p class="eyebrow">研究计划与交付</p>
<h1>计划安排与预期成果</h1>

<ol class="project-timeline">
  <li><span class="phase blue">01 / 前期</span><strong>梳理基础</strong><p>文献与原型分析<br>明确输入与测试标准</p><small>输出：输入 / 测试规范</small></li>
  <li><span class="phase green">02 / 中期</span><strong>完善方法</strong><p>传统视觉优化<br>状态约束与公式验证</p><small>输出：改进模块与记录</small></li>
  <li><span class="phase orange">03 / 后期</span><strong>测试与探索</strong><p>真实样本可靠性评价<br>必要时探索学习定位</p><small>输出：测试与失败分析</small></li>
  <li><span class="phase red">04 / 结题</span><strong>整合演示</strong><p>系统整合与应用演示<br>研究总结与报告</p><small>输出：工具与 SITP 报告</small></li>
</ol>

<div class="deliverables">
  <h2>预期交付</h2>
  <dl>
    <div><dt>方法</dt><dd>局部视觉观测、合法状态推断与公式匹配方法</dd></div>
    <div><dt>系统</dt><dd>完善 cuberoot.me Web 工具，<span class="green">现有入口已接入</span></dd></div>
    <div><dt>应用</dt><dd>AstrBot WCA 群聊插件<span class="orange">（计划接入）</span><br>MCP / Agent 专用识别接口<span class="orange">（后续拓展）</span></dd></div>
    <div><dt>研究记录</dt><dd>真实测试样本、失败案例、实验记录与 SITP 研究报告</dd></div>
  </dl>
</div>

<p class="closing-line">以可运行原型为起点，用可复现的测试记录评价可靠性。</p>
<DeckFooter page="07" />

<!--
用时：40 秒。累计：7:00。

四个阶段各有明确输出：前期确定输入和测试规范，中期留下改进模块及记录，后期形成真实样本测试和失败分析，结题整合工具、演示和 SITP 报告。具体日期随学校周期安排。交付区分方法、系统、应用和研究记录：Web 是已有入口，继续完善；AstrBot WCA 是计划接入；MCP 或 Agent 专用接口只是总纲已有的后续应用展望，不作为本期核心研究承诺。项目以可运行原型为起点，用可复现记录评价可靠性，谢谢各位老师。

内容依据：研究总纲第 14.2 节第 7 页；MCP / Agent 仅沿用第 4 章应用拓展背景。主体结束，答辩备用页使用 appendix.md 独立入口，不计入七页主体或主讲时间。
-->

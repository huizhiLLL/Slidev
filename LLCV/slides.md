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
    <h2>结构约束筛选可能状态</h2>
    <p>将颜色组合成角块、棱块观测，<br>利用朝向与排列约束排除不合法状态。</p>
    <p class="small-detail">角块扭转总和 / 棱块翻转总和 / 角棱排列奇偶性</p>
  </section>
  <section>
    <h2>按公式目标验证候选</h2>
    <p>状态不唯一时，仍可检查同一条公式<br>是否对全部合法候选都满足目标。</p>
    <p class="small-detail">共同公式可能存在，结果须逐候选模拟验证</p>
  </section>
</div>

<p class="takeaway">状态是否唯一，与公式是否适用，需要分别判断。</p>
<DeckFooter page="03" />

<!--
用时：75 秒。累计：2:55。

整体分成四步。先在照片中定位魔方网格，进行透视处理并读取十五格颜色。再把色块组合为角块和棱块的观测，用魔方的合法性约束筛选状态，例如角块扭转总和、棱块翻转总和和角棱排列的奇偶性。最后查询公式库，并模拟执行，检查公式能否达到对应体系的目标。这里有一个值得研究的区别：完整状态不唯一，并不一定意味着无法查公式。例如 OLL 的目标是顶层朝向完成，不要求排列已经复原。因此多个状态候选可能共享一条适用公式。但这需要对完整候选集合中的每个状态逐一验证，不能只检查其中一个，也不能保证每次都有共同公式。这一处理在现有系统中已有实现，后续需要系统评价它的可靠性。

内容依据：研究总纲第 14.2 节第 3 页、第 14.3 节；已有能力核对依据见文档第 8.5、10.5 节。
-->

---
layout: default
title: 相关研究与项目切入点
---

<p class="eyebrow">相关工作</p>
<h1>相关研究与项目切入点</h1>

<table class="research-table">
  <thead><tr><th>研究方向</th><th>代表工作</th><th>已有基础</th></tr></thead>
  <tbody>
    <tr><td><span class="blue">传统几何视觉</span></td><td>Kasprzak 等，2007<small>单视角魔方重建</small></td><td>利用颜色、几何结构与先验<br>检测并重建可见表面</td></tr>
    <tr><td><span class="green">CNN 辅助定位</span></td><td>Hack &amp; Shutzberg，2015<small>Stanford CS231n 课程项目报告</small></td><td>学习模型定位，结合透视处理<br>与传统视觉读取状态</td></tr>
    <tr><td><span class="orange">颜色识别</span></td><td>Liu 等，2019<small>arXiv 预印本</small></td><td>关注光照变化、颜色漂移<br>与颜色分类</td></tr>
  </tbody>
</table>

<div class="research-focus">
  <span>本项目切入点</span>
  <p>面向公式查询，研究<span class="blue">局部观测</span>下的<span class="green">合法状态推断</span><br>与<span class="orange">公式目标验证</span>。</p>
</div>

<DeckFooter page="04" />

<!--
用时：50 秒。累计：3:45。

魔方视觉识别已经有研究基础。2007 年的单视角重建工作利用颜色、几何和结构先验提取可见面。2015 年的 Stanford 课程项目报告采用 CNN 辅助定位，再结合传统视觉处理透视和颜色。2019 年的颜色识别预印本则关注光照变化带来的颜色漂移。因此，这个项目不主张首次实现单张照片识别魔方。我们的切入点是面向公式查询，把局部可见信息、合法状态推断与公式目标验证结合起来，并通过现有应用和后续样本测试分析它的可靠性。

文献依据全部来自研究总纲第 14.2 节第 4 页与第 12 章，未在本次制作中增加新文献或复现其性能。
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
    <p class="prototype-status">传统视觉已实现<br>Web 拍照查公式已接入</p>
    <section>
      <h2>已有流程</h2>
      <p>边缘与直线特征、网格几何定位、透视处理与颜色识别，再进行状态约束与公式匹配。</p>
    </section>
    <section>
      <h2>当前边界</h2>
      <p>合适拍摄条件下可用；复杂背景、光照与角度仍有失败情况，尚无系统量化结论。</p>
    </section>
  </div>
</div>

<DeckFooter page="05" />

<!--
用时：90 秒。累计：5:15。

这一页展示项目已有的前期基础。传统视觉流程已经接入 cuberoot.me 的拍照查公式页面，不依赖针对魔方照片训练的神经网络。左侧是用户提供的完整原型截图，其中左半展示照片与网格标注，右半展示查询得到的公式。讲述时依次指认照片、几何标注与公式结果，右栏说明已有流程及当前边界。这里的主要环节包括图像边缘与直线特征、网格几何定位、透视处理和颜色识别，之后进入状态约束与公式匹配。当前原型在背景较简单、拍摄条件合适时已经能够工作，也会在复杂背景、光照或拍摄角度变化时失败。我们还没有系统的测试数据来支持高准确率或复杂环境稳定识别的结论。这些失败情况正是下一阶段优化和评价的起点。

内容依据：研究总纲第 14.2 节第 5 页及第 14.3 节。原型截图由用户提供，原有三个占位合并为这一张完整截图，不依赖现场网络演示。
-->

---
layout: default
title: 后续研究与可靠性改进
---

<p class="eyebrow">后续研究内容与技术路线</p>
<h1>后续研究与可靠性改进</h1>

<ResearchRoadmap />

<p class="boundary-note">先用真实失败样本判断瓶颈。若引入学习定位模型，采用相同测试样本与统一下游流程比较。</p>
<DeckFooter page="06" />

<!--
用时：65 秒。累计：6:20。

后续工作以现有原型为起点。首先整理真实失败样本，区分问题出在几何定位、颜色读取，还是输入条件不满足，再改进对应环节。同时完善不确定观测的处理，保留多个合法候选，并按公式体系目标验证共同适用公式。图中的虚线是后续探索：如果确认传统几何定位成为主要瓶颈，再尝试关键点检测模型辅助定位。目前模型还没有完成训练，也不预设它一定优于传统方案。如果开展比较，会使用相同测试照片并保持下游处理一致。应用方面继续完善 Web，并计划把识别核心复用到 AstrBot WCA 插件的群聊图片查询中，插件接入目前不能作为已上线成果。

内容依据：研究总纲第 14.2 节第 6 页、第 14.3 节；统一比较原则来自第 4.1 节，研究规模遵循第 13 章的收敛，不承诺特定训练集或模型结构。
-->

---
layout: default
title: 计划安排与预期成果
---

<p class="eyebrow">研究计划与交付</p>
<h1>计划安排与预期成果</h1>

<ol class="project-timeline">
  <li><span class="phase blue">前期</span><strong>梳理基础</strong><p>相关研究与原型<br>输入条件与测试标准</p></li>
  <li><span class="phase green">中期</span><strong>完善方法</strong><p>优化传统视觉<br>候选状态与公式验证</p></li>
  <li><span class="phase orange">后期</span><strong>测试与探索</strong><p>记录效果与失败类型<br>视瓶颈探索学习定位</p></li>
  <li><span class="phase red">结题</span><strong>整理成果</strong><p>实验结果与应用演示<br>SITP 研究报告</p></li>
</ol>

<div class="deliverables">
  <h2>预期交付</h2>
  <div><p><strong>完整方法</strong>局部观测、状态约束推断与公式匹配</p><p><strong>应用工具</strong>完善 Web，计划接入 AstrBot 群聊插件</p><p><strong>研究记录</strong>覆盖不同拍摄条件的样本、错误与拒识记录、研究报告</p></div>
</div>

<p class="closing-line">以可运行原型为起点，用可复现的测试记录评价可靠性。</p>
<DeckFooter page="07" />

<!--
用时：40 秒。累计：7:00。

计划按前期、中期、后期和结题推进，具体日期随学校周期调整。先梳理研究与原型，明确测试标准；再优化传统视觉和状态约束；之后开展样本测试，并根据实际瓶颈决定是否探索学习定位。预期交付包括完整的方法、完善后的 Web 与计划接入的群聊入口，以及测试记录和研究报告。评价会记录识别成功情况、错误类型和拒识，暂不承诺没有证据支持的准确率数字。我的汇报到这里，谢谢各位老师。

内容依据：研究总纲第 14.2 节第 7 页。主体结束。答辩备用页使用 appendix.md 独立入口，不计入这七页或七分钟。
-->

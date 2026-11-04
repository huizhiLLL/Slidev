---
theme: default
title: LLCV 答辩备用资料
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
transition: none
mdc: true
download: false
layout: default
---

<p class="eyebrow">备用 A / 理论依据</p>
<h1>15 格观测的适用前提与验证</h1>

<p class="appendix-lead">标准配色、F2L 已复原且对齐、固定参考系、指定可见区域与合法状态</p>

<div class="theory-layout">
  <div>
    <h2>逻辑依据</h2>
    <ol class="numbered-list">
      <li>结合可见位置与有序颜色关系，确定顶层角块身份、朝向和排列。</li>
      <li>可见侧面约束棱块，隐藏部分再由合法性与排列奇偶性筛选。</li>
      <li>结论依赖输入先验，不适用于任意打乱状态。</li>
    </ol>
  </div>
  <div class="enumeration">
    <h2>研究文档记录的穷举</h2>
    <div class="state-count">62,208</div>
    <p>合法末层状态，15 格观测无碰撞</p>
    <MathBlock class="state-formula" expression="N=4!\times4!\times3^3\times2^3/2" />
  </div>
</div>

<p class="boundary-note">这是理想、无噪声的离散状态验证，不代表照片识别准确率，也未证明 15 格是最小数量。</p>
<DeckFooter page="A" appendix />

<!--
来源：研究总纲第 7 章、附录 A、第 14.3 节和第 14.4 节 Q2、Q3。数字为原文记录，本次制作没有重新运行穷举。
详细推导：四个顶层角块的有序颜色对需要结合固定角位置和手性，不能简化成任意两个颜色总能确定任意角块。前三个角块确定后，剩余角块身份由排除确定；可见顶色确定合法朝向。两个可见顶层棱可直接约束，余下两个棱的身份安排受角棱排列奇偶性约束。角扭转总和和棱翻转总和进一步限定合法状态。输入是合法状态时，文档的离散穷举记录了 62,208 个状态和 62,208 个不同观测。
-->

---
layout: default
title: 不确定观测与共同公式验证
---

<p class="eyebrow">备用 B / 状态推断</p>
<h1>不确定观测与共同公式验证</h1>

<div class="uncertainty-layout">
  <section>
    <h2>候选为空</h2>
    <p>检查定位、颜色、参考系与输入先验。<br>可探索放宽低置信度观测的硬约束。</p>
    <h2 class="spaced-title">候选不唯一</h2>
    <p>保留完整候选集合，优先检查共同公式。<br>继续放宽约束不会减少已有候选。</p>
  </section>
  <section class="verification-block">
    <h2>同一公式，验证全部候选</h2>
    <MathBlock expression="\forall s\in C,\quad G_T(a(s))=\mathrm{true}" />
    <p>公式 <em>a</em> 必须使每个候选 <em>s</em><br>满足对应体系的目标 <em>G<sub>T</sub></em>。</p>
    <p class="small-detail">候选须完整。截断样本不能用于声称“全部有效”。</p>
  </section>
</div>

<p class="boundary-note">仍无法确定时，可用原始观测评分辅助排序，并请求人工校正或补拍。约束无法保证纠正所有视觉错误。</p>
<DeckFooter page="B" appendix />

<!--
来源：研究总纲第 8、10 章和第 14.4 节 Q4、Q5。当前已有候选状态共同公式验证，置信度恢复与系统评价仍待完善。原型中的颜色距离、margin 和 reliable 不能未经校准便称作统计概率。
不把状态唯一当作查询必要条件。OLL 的完成目标只要求顶层朝向完成，不要求排列复原，但不能简化为只看 U 面黄色。没有共同公式时允许校正或拒识，不主张所有多个候选都能输出公式。这里的公式表示判定条件，不代表无条件存在这样的 a。
-->

---
layout: default
title: 参考资料
---

<p class="eyebrow">备用 C / 资料来源</p>
<h1>参考资料</h1>

<ol class="reference-list">
  <li><span>Kasprzak, W., Szynkiewicz, W., &amp; Czajka, Ł. (2007).</span><strong>Rubik's Cube Reconstruction from Single View for Service Robots.</strong><small>Machine Graphics &amp; Vision, 16(2–3), 451–459.</small></li>
  <li><span>Hack, J., &amp; Shutzberg, K. (2015).</span><strong>Rubiks Cube Localization, Face Detection, and Interactive Solving.</strong><small>Stanford CS231n 课程项目报告。</small></li>
  <li><span>Liu, S., et al. (2019).</span><strong>Color Recognition for Rubik's Cube Robot.</strong><small>arXiv:1901.03470，预印本。</small></li>
  <li><span>Herbert Kociemba. <em>The Cubie Level.</em></span><small>角块、棱块的排列与朝向表示。</small></li>
  <li><span>Ryan Heise. <em>Laws of the cube.</em></span><small>魔方合法状态约束说明。</small></li>
</ol>

<DeckFooter page="C" appendix />

<!--
资料沿用研究总纲第 9、12、14 章，本轮未新增检索或声称复现。
1. https://www.researchgate.net/publication/234829781_Rubik%27s_cube_reconstruction_from_single_view_for_Service_robots
2. https://cs231n.stanford.edu/reports/2015/pdfs/jaykevin_final.pdf
3. https://arxiv.org/abs/1901.03470
4. https://www.kociemba.org/math/cubielevel.htm
5. https://www.ryanheise.com/cube/cube_laws.html
其余扩展资料与证据边界保留在原始研究总纲，不在此备用页扩写研究范围。
-->

---
layout: default
title: 答辩问答：方法与输入
---

<p class="eyebrow">备用 D / 答辩问答</p>
<h1>方法与输入</h1>

<dl class="qa-list">
  <div><dt>为什么不直接用 AI 看图？</dt><dd>专用流程能分别验证定位、颜色与状态，并通过合法性和公式模拟检查结果。通用模型可作为后续对照或辅助。</dd></div>
  <div><dt>为什么只看 15 格？</dt><dd>第一阶段已知 F2L 复原，利用顶面与两个侧面顶行的观测推断末层。任意打乱状态不满足这一前提。</dd></div>
  <div><dt>15 格足够的依据是什么？</dt><dd>文档包含块身份、朝向与排列约束推导，以及 62,208 个合法末层状态的无碰撞穷举记录。详见备用 A。</dd></div>
  <div><dt>颜色识别错了怎么办？</dt><dd>无合法候选时检查错误来源，探索放宽低置信度硬约束，保留原始观测评分，并允许人工校正或拒识。</dd></div>
</dl>

<DeckFooter page="D" appendix />

<!--
依据研究总纲第 14.4 节 Q1–Q4。详细回答保留在原文，页面为压缩短答。不能声称通用模型全部不可靠、约束能纠正任意错误或穷举结果就是实际图像准确率。
-->

---
layout: default
title: 答辩问答：研究价值与后续路线
---

<p class="eyebrow">备用 E / 答辩问答</p>
<h1>研究价值与后续路线</h1>

<dl class="qa-list">
  <div><dt>状态不唯一，还能查公式吗？</dt><dd>视体系目标而定。同一条公式对全部合法候选都满足目标时可以返回，不能保证任意多候选都有共同公式。</dd></div>
  <div><dt>为什么还考虑深度学习？</dt><dd>如果传统几何定位成为主要瓶颈，再探索关键点检测辅助定位。模型尚未完成训练，是否采用由实测决定。</dd></div>
  <div><dt>项目的研究切入点是什么？</dt><dd>面向公式查询，结合局部视觉、合法状态推断与任务目标验证，研究状态不唯一时的任务可辨识性及可靠性。</dd></div>
  <div><dt>魔方题目的研究价值是什么？</dt><dd>结构和状态约束明确，适合验证视觉感知与组合推理的结合，同时具有真实使用需求和现成产品入口。</dd></div>
</dl>

<DeckFooter page="E" appendix />

<!--
依据研究总纲第 14.4 节 Q5–Q8。不主张首次提出单图魔方识别，也不把已有共同公式验证包装成尚未实现的新算法。
-->

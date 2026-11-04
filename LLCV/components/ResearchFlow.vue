<script setup lang="ts">
import MathBlock from './MathBlock.vue'
</script>

<template>
  <div class="research-flow" aria-label="视觉感知、Cubie 合法候选推断、公式匹配与模拟验证三层技术流程">
    <section class="flow-stage blue">
      <span class="flow-number">01 / Computer Vision</span>
      <h2>视觉感知</h2>
      <p>图像预处理 · 边缘 / 直线<br>几何网格 / 角点 → 透视变换<br>色块采样 → 颜色分类</p>
      <span class="flow-output">输出：15 格颜色观测</span>
    </section>
    <section class="flow-stage green">
      <span class="flow-number">02 / State Inference</span>
      <h2>局部状态推断</h2>
      <p>颜色 → <strong>Corner / Edge Cubies</strong></p>
      <div class="flow-constraints">
        <MathBlock expression="\textstyle\sum_i \mathrm{twist}_i \equiv 0 \pmod{3}" />
        <MathBlock expression="\textstyle\sum_i \mathrm{flip}_i \equiv 0 \pmod{2}" />
        <span>角块与棱块排列奇偶性一致</span>
      </div>
      <span class="flow-output">输出：合法候选集合 C</span>
    </section>
    <section class="flow-stage orange">
      <span class="flow-number">03 / Algorithm Matching</span>
      <h2>公式匹配与验证</h2>
      <p>查询公式库 · 对齐持握 / AUF<br>确定公式体系目标<br><strong>同一公式，逐候选模拟执行</strong></p>
      <span class="flow-output">输出：共同适用公式 / 歧义提示</span>
    </section>
  </div>
</template>

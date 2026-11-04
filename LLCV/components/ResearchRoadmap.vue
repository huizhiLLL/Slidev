<script setup lang="ts">
const lines = [
  {
    title: '传统视觉优化', status: '拟优化', tone: 'blue',
    steps: ['真实失败样本 → 网格 / 角点定位改进', '优化透视与颜色，分析背景 / 光照 / 角度影响'],
  },
  {
    title: '不确定观测与状态推断', status: '拟完善', tone: 'green',
    steps: ['颜色置信度 → 低可靠色块处理 → 合法多候选', '完善共同公式验证、校正与拒识机制'],
  },
  {
    title: '学习模型辅助定位', status: '后续探索 · 未训练', tone: 'orange', future: true,
    steps: ['定位成为瓶颈时，探索关键点检测辅助定位', '相同样本、统一下游比较，不预设优于传统视觉'],
  },
]
</script>

<template>
  <div class="research-roadmap">
    <p class="roadmap-origin">已有传统视觉原型 → 三项拟研究工作</p>
    <section v-for="line in lines" :key="line.title" class="roadmap-line" :class="[line.tone, { future: line.future }]">
      <div class="roadmap-line-title">
        <h2>{{ line.title }}</h2>
        <span>{{ line.status }}</span>
      </div>
      <p><span v-for="step in line.steps" :key="step">{{ step }}</span></p>
    </section>
  </div>
</template>

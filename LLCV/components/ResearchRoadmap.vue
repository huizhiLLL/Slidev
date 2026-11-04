<script setup lang="ts">
const lines = [
  { title: '传统视觉优化', detail: '分析复杂背景、光照、反光与角度导致的失败', tone: 'blue' },
  { title: '状态推断完善', detail: '处理不确定观测，保留候选并验证共同公式', tone: 'green' },
  { title: '学习模型辅助定位', detail: '定位成为主要瓶颈时探索关键点检测，尚未训练', tone: 'orange', future: true },
  { title: '应用接入', detail: '完善 Web，计划复用识别核心接入 AstrBot', tone: 'red' },
]
</script>

<template>
  <div class="research-roadmap" role="img" aria-label="已有传统视觉原型分出传统视觉优化、状态推断完善、学习模型后续探索与应用接入四条工作线">
    <div class="roadmap-origin">
      <span class="status-label">已有基础</span>
      <strong>传统视觉<br>识别原型</strong>
      <span>已接入 cuberoot.me</span>
    </div>
    <div class="roadmap-branches">
      <div v-for="line in lines" :key="line.title" class="roadmap-line" :class="[line.tone, { future: line.future }]">
        <div class="roadmap-line-title">
          <strong>{{ line.title }}</strong>
          <span v-if="line.future" class="future-label">后续探索</span>
        </div>
        <p>{{ line.detail }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stages = [
  { number: '01', title: '斜视照片', subtitle: '标准三阶 · F2L 已复原', color: 'blue' },
  { number: '02', title: '15 格观测', subtitle: '几何定位 · 透视与颜色', color: 'orange' },
  { number: '03', title: '合法候选状态', subtitle: '角块 · 棱块 · 状态约束', color: 'green' },
  { number: '04', title: '适用公式', subtitle: '按目标逐候选模拟验证', color: 'red' },
]
</script>

<template>
  <ol class="research-flow" aria-label="技术流程：斜视照片、15 格观测、合法候选状态、适用公式">
    <li v-for="stage in stages" :key="stage.number" :class="stage.color">
      <span class="flow-number">{{ stage.number }}</span>
      <strong>{{ stage.title }}</strong>
      <span class="flow-detail">{{ stage.subtitle }}</span>
    </li>
  </ol>
</template>

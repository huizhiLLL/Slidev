<script setup lang="ts">
withDefaults(defineProps<{ page: string; appendix?: boolean }>(), { appendix: false })
const logoUrl = `${import.meta.env.BASE_URL}images/tongji-university.png`
</script>

<template>
  <img class="school-logo" :src="logoUrl" alt="同济大学" width="180" height="47">
  <footer class="deck-footer">
    <span>{{ appendix ? 'LLCV / 答辩备用资料' : 'LLCV / 魔方视觉识别' }}</span>
    <span>{{ appendix ? page : `${page} / 08` }}</span>
  </footer>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ page: string; appendix?: boolean }>(), { appendix: false })
</script>

<template>
  <footer class="deck-footer">
    <span>{{ appendix ? 'LLCV / 答辩备用资料' : 'LLCV / 魔方视觉识别' }}</span>
    <span>{{ appendix ? page : `${page} / 07` }}</span>
  </footer>
</template>

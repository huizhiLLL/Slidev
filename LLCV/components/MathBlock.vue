<script setup lang="ts">
import { computed } from 'vue'
import katex from 'katex'
import 'katex/dist/katex.min.css'

const props = defineProps<{ expression: string }>()
const html = computed(() => katex.renderToString(props.expression, {
  displayMode: true,
  throwOnError: true,
  output: 'htmlAndMathml',
}))
</script>

<template>
  <div class="math-block" v-html="html" />
</template>

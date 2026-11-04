<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { assets, type AssetName } from '../assets'

const props = withDefaults(defineProps<{
  name: AssetName
  fit?: 'contain' | 'cover'
}>(), { fit: 'contain' })

const asset = computed(() => assets[props.name])
const failed = ref(false)
const knownImages = import.meta.glob('/public/images/*.{png,jpg,jpeg,webp,avif}', { eager: true, query: '?url', import: 'default' })
const exists = computed(() => `/public/${asset.value.src}` in knownImages)
const url = computed(() => `${import.meta.env.BASE_URL}${asset.value.src}`)
watch(url, () => { failed.value = false })
</script>

<template>
  <figure class="asset-frame" :class="{ 'has-image': exists && !failed }">
    <img
      v-if="exists && !failed"
      :src="url"
      :alt="`${asset.label}：${asset.detail}`"
      :style="{ objectFit: fit }"
      @error="failed = true"
    >
    <div v-else class="asset-placeholder">
      <span class="asset-kind">{{ asset.kind }}</span>
      <strong>{{ asset.label }}</strong>
      <span class="asset-detail">{{ asset.detail }}</span>
      <span class="asset-pending">待补真实素材</span>
    </div>
  </figure>
</template>

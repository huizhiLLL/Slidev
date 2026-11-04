import { disableBuiltinSync } from '@slidev/client'
import { onMounted } from 'vue'

export default function setup() {
  if (new URLSearchParams(window.location.search).get('thumbnail') === 'true') {
    // Root setups run before Slidev opens its sync channels; close them after mount.
    onMounted(disableBuiltinSync)
  }
}

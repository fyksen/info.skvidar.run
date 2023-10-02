# My Page Title

Here's a Strava route:

<div class="strava-embed-placeholder" data-embed-type="route" data-embed-id="3141372052271268226" data-full-width="true"></div>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://strava-embeds.com/embed.js'
  document.body.appendChild(script)
})
</script>

<template>
  <div>
    <div class="pretix-widget-compat" :event="eventUrl"></div>
    <noscript>
      <div class="pretix-widget">
        <div class="pretix-widget-info-message">
          JavaScript is disabled in your browser. To access our ticket shop without JavaScript, please <a target="_blank" :href="eventUrl">click here</a>.
        </div>
      </div>
    </noscript>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';

// Get the prop
const props = defineProps({
  eventId: String
});

// Construct the URLs using the prop
const eventUrl = ref(`https://tickets.skvidar.run/SKV/${props.eventId}/`);
const cssUrl = ref(`https://tickets.skvidar.run/SKV/${props.eventId}/widget/v1.css`);

onMounted(() => {
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";
  cssLink.href = cssUrl.value;
  document.head.appendChild(cssLink);

  const jsScript = document.createElement("script");
  jsScript.type = "text/javascript";
  jsScript.src = "https://tickets.skvidar.run/widget/v1.en.js";
  jsScript.async = true;
  document.head.appendChild(jsScript);
});
</script>

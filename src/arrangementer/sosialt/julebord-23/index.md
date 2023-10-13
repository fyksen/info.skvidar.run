# Julebord 23

* Julebord informasjon ligger ute på [Facebook eventet](https://www.facebook.com/events/1359388694612729/).
* Lurer du på hvem som har kjøpt billett, kan du sjekke det [her](./attending).

## Påmelding

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Add the CSS to the document's head
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";
  cssLink.href = "https://tickets.skvidar.run/SKV/julebord23/widget/v1.css";
  document.head.appendChild(cssLink);

  // Add the JavaScript to the document's head
  const jsScript = document.createElement("script");
  jsScript.type = "text/javascript";
  jsScript.src = "https://tickets.skvidar.run/widget/v1.en.js";
  jsScript.async = true;
  document.head.appendChild(jsScript);
});
</script>


<pretix-widget event="https://tickets.skvidar.run/SKV/julebord23/"></pretix-widget>
<noscript>
  <div class="pretix-widget">
    <div class="pretix-widget-info-message">
      JavaScript is disabled in your browser. To access our ticket shop without JavaScript, please <a target="_blank" rel="noopener" href="https://tickets.skvidar.run/SKV/julebord23/">click here</a>.
    </div>
  </div>
</noscript>

::: info Problemer med påmelding?
Om du har problemer med å bruke den innebygde påmeldingen vår, kan du melde deg på direkte [her](https://tickets.skvidar.run/SKV/julebord23/).
:::

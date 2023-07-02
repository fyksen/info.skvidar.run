<script>
  export default {
    mounted() {
      const body = document.querySelector("body");
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "https://tickets.skvidar.run/SKV/treningsleirtest/widget/v1.css";
      body.appendChild(link);

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://tickets.skvidar.run/widget/v1.en.js";
      script.async = true;
      body.appendChild(script);
    },
  };
</script>

# Her kan du melde deg på treningsleir

## Dette er bare en test woopwoop

<pretix-widget event="https://tickets.skvidar.run/SKV/treningsleirtest/"></pretix-widget>
<noscript>
   <div class="pretix-widget">
        <div class="pretix-widget-info-message">
            JavaScript is disabled in your browser. To access our ticket shop without JavaScript, please <a target="_blank" rel="noopener" href="https://tickets.skvidar.run/SKV/treningsleirtest/">click here</a>.
        </div>
    </div>
</noscript>
# info.skvidar.run
* Source for nettside [info.skvidar.run](https://info.skvidar.run).
* Det er et ganske standard [vitepress](https://vitepress.dev/) oppsett.

---

Hvordan sette opp lokalt miljø:

* Installer [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
```
git clone git@github.com:fyksen/info.skvidar.run.git
cd info.skvidar.run
npm add -D vitepress
npm run docs:dev
```
Du kan nå besøke nettsiden på lokal maskin, på adressen: [http://localhost:5173/](http://localhost:5173/)


## Custom scripts:

Dette er scripts som er laget for info.skvidar.run

For å bruke flere scripts på samme side, må man kjøre script setup med flere scripts. F.eks:

```
<script setup>
import PretixWidgetCompat from '/arrangementer/PretixWidgetCompat.vue'
import AttendeesTable from '/arrangementer/attendees.vue'
</script>
```
---

### /src/arrangementer/attendees.vue

Dette er et script som kan brukes for å hente inn en liste over hvor mange deltakere det kommer til et arrangement.
For å bruke scriptet, kan man skrive:

```
<script setup>
import AttendeesTable from '/arrangementer/attendees.vue'
</script>

<AttendeesTable eventId="julebord23"/>
```

Merk at AttendeesTable linjen henter en .json fil. .json filene blir hentet hvert 5 minutt via et python script fra pretix (tickets.skvidar.run).
EventId, i dette tilfelle `julebord23` er det pretix kaller slug. Slug er det samme som shortname til et arrangement.
Logg inn på tickets.skvidar.run for å se hva shortnamet til arrangementet er.

### /src/arrangementer/PretixWidgetCompat.vue

Dette er et script som henter inn butikken til tickets.skvidar.run, og embedder det på siden.
```
<script setup>
import AttendeesTable from '/arrangementer/PretixWidgetCompat.vue'
</script>

<PretixWidgetCompat eventId="julebord23" />
```

På samme måte som attendees scriptet, så må man hente eventId fra slug på pretix.
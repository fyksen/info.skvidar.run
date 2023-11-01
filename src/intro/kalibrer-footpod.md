# Bislett innendørs kalibreringskalkulator

Dette er en kalkulator å kalibrere foot-poden når man løper inne på Bislett.

---

<br>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const intervaller = ref([{ meter: '', runder: 1 }])

const leggTilIntervall = async (index) => {
  intervaller.value.splice(index + 1, 0, { meter: '', runder: 1 })
  await nextTick()  // wait for DOM update
  const nextMeterInput = document.querySelector(`[data-ref="meterInput${index + 1}"]`)
  if (nextMeterInput) {
    nextMeterInput.focus()
  }
}


// Helper function to compute the rounds
const computeRounds = (meters) => {
  const oneRound = 546.5
  return Math.round(meters / oneRound)
}

// Watch for changes in the intervaller array
watch(intervaller, (newIntervaller) => {
  for (let intervall of newIntervaller) {
    intervall.runder = computeRounds(intervall.meter)
  }
}, { deep: true })

const kalibreringsVerdier = computed(() => {
  return intervaller.value.map(interval => {
    const meter = parseFloat(interval.meter)
    const runder = parseInt(interval.runder)
    if (isNaN(meter) || meter <= 0 || isNaN(runder) || runder <= 0) {
      return ''
    }
    return (((546.5 * runder) / meter ) * 100).toFixed(8)  // Multiplied by 100 here
  })
})

const gjennomsnittligKalibreringsverdi = computed(() => {
  const gyldigeVerdier = kalibreringsVerdier.value.filter(v => v !== '')
  if (gyldigeVerdier.length === 0) {
    return ''
  }
  const sum = gyldigeVerdier.reduce((acc, v) => acc + parseFloat(v), 0)
  return (sum / gyldigeVerdier.length).toFixed(8);  // Removed multiplication by 100
})


const kalibreringsFaktorForKlokken = computed(() => {
  const value = parseFloat(gjennomsnittligKalibreringsverdi.value);
  if (isNaN(value)) {
    return "-"
  }
  return value.toFixed(1);
})



const fjernIntervall = (index) => {
  intervaller.value.splice(index, 1)
}
</script>

<div v-for="(intervall, index) in intervaller" :key="index" style="margin-bottom: 15px; display: flex; align-items: center;">
  <label style="flex: 1;">
    Meter:
    <input :data-ref="`meterInput${index}`" v-model="intervall.meter" type="number" min="0" placeholder="Skriv inn meter klokken telte" @keyup.enter="leggTilIntervall(index)" style="margin-right: 10px; background-color: #f5f5f5; border: 1px solid #ccc; padding: 5px 10px;"/>
  </label>
  <label style="flex: 1;">
    Runder:
    <input 
      v-model="intervall.runder" 
      type="number" 
      min="1" 
      placeholder="Runder" 
      readonly
      style="width: 40px; 
        text-align: center; 
        background-color: #e5e5e5;  <!-- This is where you had an inline comment -->
        border: 1px solid #ccc; 
        padding: 5px 10px; 
        margin-left: 5px; 
        margin-right: 5px;
        cursor: default;">
  </label>
  <button v-if="index !== intervaller.length - 1" style="opacity: 0; cursor: default; width: 40px; margin-left: 5px;" disabled></button>
  <button v-else @click="leggTilIntervall(index)" style="background-color: #4CAF50; color: white; border: none; padding: 5px 10px; cursor: pointer; margin-left: 5px; width: 40px;">+</button>
  <button @click="fjernIntervall(index)" v-if="intervaller.length > 1" style="background-color: #f44336; color: white; border: none; padding: 5px 10px; cursor: pointer; margin-left: 5px; width: 40px;">-</button>
  <button v-else style="background-color: #f44336; color: white; border: none; padding: 5px 10px; cursor: not-allowed; margin-left: 5px; width: 40px; opacity: 0.5;" disabled>-</button>
</div>

<p><strong>Kalibrerings faktor:</strong> {{ kalibreringsFaktorForKlokken }}</p>


## Brukerveiledning
1. Skriv inn hvor mange meter klokken trodde du løp på intervallen.
2. Løp du flere runder, trykk på `+`, eller trykk `enter`.
3. Skriv inn kalibreringsfaktoren din på klokken.

### Hvordan legge inn på Garmin klokke
1. Hold inne `opp`knappen.
2. Bla til `Sensorer og tilbehør`
3. Bla til navnet på footpoden og trykk på `start` knappen på klokken (knappen oppe til høyre).
4. Bla til Kalibrerings faktor og trykk på `start`.
5. Bla til `Angi verdi` og trykk på `start`.
6. Skriv inn verdien fra kalkulatoren.
7. Hurra, du har nå kalibrert foot-poden din.

## Andre tips og FAQ:

::: details Hvordan finner jeg ut om jeg må kalibrere foot-poden?
Om du konsekvent får feil distanse på intervallene inne på Bislett må du kalibrere den. Om det varierer om den måler for langt eller for kort hjelper det ikke å kalibrere.
:::

::: details Hvorfor må jeg kalibrere foot-poden flere ganger?
Foot-poder bruker gyroskop og akselerometer for å estimere hastighet.

Ting som **kan** påvirke estimeringen er:
* Skomodell
* Bedre/dårligere form
* Endret løpssteg (belastningsskader osv)
:::

::: details Hvordan funker denne kalkulatoren?
* Kalkulatoren tar input fra brukeren om hvor mange meter foot poden leste.
* Deretter fyller den ut nærmeste runde på Bislett (en runde er 546,5 meter.)
* Så tar den (faktisk løpt distanse / input fra brukeren) * 100.
* Dette gjør den på hver intervall, og viser gjennomsnittet av dette til brukeren.
:::
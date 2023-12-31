  # Bislett innendørs kalibreringskalkulator

  Dette er en kalkulator for å kalibrere footpoden når man løper inne på Bislett.

  ---

  <br>

  <script setup>
  import { ref, computed, watch, nextTick } from 'vue'

  const intervaller = ref([{ meter: '', runder: 1 }])
  const tidligereKalibreringsverdi = ref('100')

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

  // Update the intervals display (including the single-round calibration factors)
  // when the rounds or previous factor changes
  let displayIntervals = (prevFactor, intervals) => {
    let outputFactor = 100.0 * (parseFloat(prevFactor) / 100.0);
    for (let intervall of intervals) {
      intervall.runder = computeRounds(intervall.meter);
      intervall.rundeFaktor = outputFactor * (546.5 * intervall.runder) / intervall.meter;
    }
  };
  watch(tidligereKalibreringsverdi, (newPrevFactor) => {
    displayIntervals(newPrevFactor, intervaller.value);
  });
  watch(intervaller, (newIntervals) => {
    displayIntervals(tidligereKalibreringsverdi.value, newIntervals);
  }, { deep: true })

  // Prefill intervals if given in the URL
  if (window.location.hash !== undefined) {
    const rounds = window.location.hash.substr(1).split(',').map(x => parseFloat(x));
    intervaller.value = rounds.map(x => { return { meter: x, rounds: computeRounds(x) }});
  }

  const kalibreringsVerdier = computed(() => {
    const meterSum = intervaller.value.reduce((acc, interval) => {
      const meter = parseFloat(interval.meter);
      return acc + (isNaN(meter) ? 0 : meter);
    }, 0);
    
    const roundsSum = intervaller.value.reduce((acc, interval) => {
      const rounds = parseInt(interval.runder);
      return acc + (isNaN(rounds) ? 0 : rounds);
    }, 0);
    
    if (meterSum <= 0 || roundsSum <= 0) {
      return '';
    }
    
    return (((546.5 * roundsSum) / meterSum) * 100).toFixed(8);
  });

  const gjennomsnittligKalibreringsverdi = computed(() => {
    const value = kalibreringsVerdier.value;
    if (value === '') {
      return '';
    }
    return parseFloat(value).toFixed(8);
  });

  const kalibreringsFaktorForKlokken = computed(() => {
      const actualDistance = 546.5 * intervaller.value.reduce((acc, interval) => {
        const rounds = parseInt(interval.runder);
        return acc + (isNaN(rounds) ? 0 : rounds);
      }, 0);
  
      const measuredDistance = intervaller.value.reduce((acc, interval) => {
        const meter = parseFloat(interval.meter);
        return acc + (isNaN(meter) ? 0 : meter);
      }, 0);
  
      const tidligereVerdi = parseFloat(tidligereKalibreringsverdi.value);
      
      if (measuredDistance === 0 || isNaN(tidligereVerdi)) {
        return "-";
      }
  
      return (tidligereVerdi * (actualDistance / measuredDistance)).toFixed(1);
  });

// Find the difference (as a ratio) of the longest and shortest measured rounds;
// this is a simple measurement of the footpod's error. (Standard deviation does
// not make all that much sense when we have so few data points.)
//
// We set a tolerance of 1% (allowing roughly +/- 0.5% from perfect after calibration)
// before we start displaying a warning.
const roundSpread = computed(() => {
  const intervals = intervaller.value;

  let longestRoundDistance, shortestRoundDistance;

  for (let i = 0; i < intervals.length; i++) {
    const meter = parseFloat(intervals[i].meter);
    const rounds = parseInt(intervals[i].runder);

    if (isNaN(meter) || isNaN(rounds)) {
      continue;
    }

    let roundDistance = meter / rounds;
    if (!longestRoundDistance || roundDistance > longestRoundDistance) {
      longestRoundDistance = roundDistance;
    }
    if (!shortestRoundDistance || roundDistance < shortestRoundDistance) {
      shortestRoundDistance = roundDistance;
    }
  }

  console.log(longestRoundDistance, shortestRoundDistance);
  if (!shortestRoundDistance || !longestRoundDistance) {
    return 1.0;
  } else {
    return longestRoundDistance / shortestRoundDistance;
  }
});



  const fjernIntervall = (index) => {
    intervaller.value.splice(index, 1)
  }
  </script>

<div>
  <label>
    Tidligere kalibreringsverdi:
    <input v-model="tidligereKalibreringsverdi" type="number" placeholder="Skriv inn tidligere kalibreringsverdi" style="margin-bottom: 15px; padding: 5px 10px;"/>
  </label>
</div>

<div v-for="(intervall, index) in intervaller" :key="index" style="margin-bottom: 15px; display: flex; align-items: center;">
  <label style="flex: 1;">
    Meter:
    <input :data-ref="`meterInput${index}`" v-model="intervall.meter" type="number" min="0" placeholder="Skriv inn meter klokken telte" @keyup.enter="leggTilIntervall(index)" style="margin-right: 10px; padding: 5px 10px;"/>
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
        padding: 5px 10px; 
        margin-left: 5px; 
        margin-right: 5px;
        cursor: default;">
    <span style="text-align: center; font-size: x-small; width: 100px; display: inline-block">
    {{ intervall.rundeFaktor ? '(' + intervall.rundeFaktor.toFixed(1) + ')' : '' }}
    </span>
  </label>
    <button v-if="index !== intervaller.length - 1" style="opacity: 0; cursor: default; width: 40px; margin-left: 5px;" disabled></button>
    <button v-else @click="leggTilIntervall(index)" style="background-color: #4CAF50; color: white; border: none; padding: 5px 10px; cursor: pointer; margin-left: 5px; width: 40px;">+</button>
    <button @click="fjernIntervall(index)" v-if="intervaller.length > 1" style="background-color: #f44336; color: white; border: none; padding: 5px 10px; cursor: pointer; margin-left: 5px; width: 40px;">-</button>
    <button v-else style="background-color: #f44336; color: white; border: none; padding: 5px 10px; cursor: not-allowed; margin-left: 5px; width: 40px; opacity: 0.5;" disabled>-</button>
  </div>

<div v-if="roundSpread > 1.01" style="color: red; margin-top: 20px; margin-bottom: 20px;">
  Footpoden din varierer for mye fra intervall til intervall (forskjellen på lengste og korteste rundemåling
  er {{ (100.0 * roundSpread - 100.0).toFixed(1).replace('.', ',') }}%); dette er et problem du ikke får løst med å kalibrere den. Forsøk å feste footpoden bedre til skoen,
  og gå litt i pausene, så den ikke går i dvale imellom intervallene og tar tid før den begynner å spore.
</div>


  <p><strong>Kalibreringsfaktor:</strong> {{ kalibreringsFaktorForKlokken }}</p>

  ## Brukerveiledning
  1. Skriv inn hvor mange meter klokken trodde du løp på intervallet.
  2. Løp du flere intervaller, trykk på `+`, eller trykk `enter`.
  3. Skriv inn kalibreringsfaktoren din på klokken.

  ### Hvordan legge inn på Garmin-klokke
  1. Hold inne `opp`-knappen.
  2. Bla til `Sensorer og tilbehør`
  3. Bla til navnet på footpoden og trykk på `start`-knappen på klokken (knappen oppe til høyre).
  4. Bla til «Kalibreringsfaktor» og trykk på `start`.
  5. Bla til `Angi verdi` og trykk på `start`.
  6. Skriv inn verdien fra kalkulatoren.
  7. Hurra, du har nå kalibrert footpoden din.

  ## Andre tips og FAQ:

  ::: details Hvordan finner jeg ut om jeg må kalibrere footpoden?
  Om du konsekvent får feil distanse på intervallene inne på Bislett, må du kalibrere den. Om det varierer om den måler for langt eller for kort, hjelper det ikke å kalibrere.
  :::

  ::: details Hvorfor må jeg kalibrere footpoden flere ganger?
  Foot-poder bruker gyroskop og akselerometer for å estimere hastighet.

  Ting som **kan** påvirke estimeringen er:
  * Skomodell
  * Bedre/dårligere form
  * Endret løpssteg (belastningsskader osv)
  :::

  ::: details Hvordan funker denne kalkulatoren?
  * Kalkulatoren tar input fra brukeren om hvor mange meter footpoden leste.
  * Deretter fyller den ut nærmeste runde på Bislett (en runde er 546,5 meter).
  * Så beregner den (faktisk løpt distanse / input fra brukeren) * 100.
  * Dette gjør den på hver intervall, og viser gjennomsnittet av dette til brukeren.
  :::

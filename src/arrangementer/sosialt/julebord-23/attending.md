# Påmelding til julebord 23

* Tilbake til [påmelding](/arrangementer/sosialt/julebord-23/).

* Antall påmeldte: **{{ attendees.length }}**

<table class="attendees-table">
    <thead>
        <tr>
            <th @click="sortBy('name')">Name <span v-if="sortKey === 'name'">{{ sortOrder === 1 ? '▲' : '▼' }}</span></th>
            <th @click="sortBy('order_datetime')">Order Date and Time <span v-if="sortKey === 'order_datetime'">{{ sortOrder === 1 ? '▲' : '▼' }}</span></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="person in attendees" :key="person.position_id">
            <td>{{ person.name }}</td>
            <td>{{ new Date(person.order_datetime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</td>
        </tr>
    </tbody>
</table>

<script setup>
import { ref, onMounted } from 'vue'

const attendees = ref([])
const sortKey = ref('name') // default sort by name
const sortOrder = ref(1)  // 1 for ascending, -1 for descending

onMounted(async () => {
  try {
    const response = await fetch('/arrangementer/attendees/julebord23_attendees.json')
    attendees.value = await response.json()
  } catch (e) {
    console.error('Failed to fetch attendees:', e)
  }
})

const sortBy = (key) => {
  if(sortKey.value === key) {
    sortOrder.value = -sortOrder.value // If same key, toggle order
  } else {
    sortOrder.value = 1 // If different key, default to ascending
  }
  sortKey.value = key
  attendees.value.sort((a, b) => {
    if (a[key] < b[key]) return -sortOrder.value
    if (a[key] > b[key]) return sortOrder.value
    return 0
  })
}
</script>

<style scoped>
.attendees-table th {
    cursor: pointer;
}
</style>

# Påmeldt til julebord 23

* Tilbake til [påmelding](/arrangementer/sosialt/julebord-23/).


Sorter på: <button @click="sortBy('name')">Navn</button> | <button @click="sortBy('order_datetime')">Bestillingstidspunkt</button>

<table class="attendees-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Order Date and Time</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="person in attendees" :key="person.position_id">
            <td>{{ person.name }}</td>
            <td>{{ new Date(person.order_datetime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</td>
        </tr>
    </tbody>
</table>

<style>
.attendees-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

.attendees-table th, .attendees-table td {
    border: 1px solid #e0e0e0;
    padding: 8px 12px;
    text-align: left;
}

.attendees-table th {
    background-color: #f5f5f5;
    font-weight: 600;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'

const attendees = ref([])
const sortKey = ref('name') // default sort by name
const sortOrder = ref(1)  // 1 for ascending, -1 for descending

// Fetch attendee data when component is mounted
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

---
title: Training Club
---

<script setup>
import { ref, onMounted, computed } from 'vue'

const attendees = ref([])
const sortKey = ref('name')
const sortOrder = ref(1)

const fetchUrl = '/ressurser/reactions.json'

onMounted(async () => {
  try {
    const response = await fetch(fetchUrl)
    const data = await response.json()
    attendees.value = processData(data)
  } catch (e) {
    console.error('Failed to fetch attendees:', e)
  }
})

const processData = (data) => {
  const attendees = []
  for (const emoji in data) {
    for (const name in data[emoji]) {
      attendees.push({
        name,
        emoji,
        timestamp: data[emoji][name].timestamp,
      })
    }
  }
  return attendees
}

const sortBy = (key) => {
  if (sortKey.value === key) {
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

# Training Club

## Who is coming to the next training

<p>Antall påmeldte: <strong>{{ attendees.length }}</strong></p>

<table>
    <thead>
        <tr>
            <th @click="sortBy('name')">Name <span v-if="sortKey === 'name'">{{ sortOrder === 1 ? '▲' : '▼' }}</span></th>
            <th @click="sortBy('emoji')">Emoji <span v-if="sortKey === 'emoji'">{{ sortOrder === 1 ? '▲' : '▼' }}</span></th>
            <th @click="sortBy('timestamp')">Timestamp <span v-if="sortKey === 'timestamp'">{{ sortOrder === 1 ? '▲' : '▼' }}</span></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="row in attendees" :key="row.name">
            <td>{{ row.name }}</td>
            <td>{{ row.emoji }}</td>
            <td>{{ row.timestamp }}</td>
        </tr>
    </tbody>
</table>

<style module>
.attendees-table th {
    cursor: pointer;
}
</style>

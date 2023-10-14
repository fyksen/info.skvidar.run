<script>
import { ref, onMounted } from 'vue'

export default {
  props: ['eventId'],
  setup(props) {
    const attendees = ref([])
    const sortKey = ref('name')
    const sortOrder = ref(1)
    
    // Fetch URL is built using the eventId prop
    const fetchUrl = `/arrangementer/attendees/${props.eventId}_attendees.json`

    onMounted(async () => {
      try {
        const response = await fetch(fetchUrl)
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

    return {
      attendees,
      sortKey,
      sortOrder,
      sortBy,
    }
  }
}
</script>


<template>
    <div>
      <p>Antall påmeldte: <strong>{{ attendees.length }}</strong></p>
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
    </div>
</template>

<style scoped>
.attendees-table th {
    cursor: pointer;
}
</style>

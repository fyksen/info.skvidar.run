
<div>
  <table>
    <thead>
      <tr>
        <th @click="sortBy('lastName')">
          Last Name
          <span v-if="sortColumn === 'lastName'">
            <span v-if="sortOrder === 1">▼</span>
            <span v-else>▲</span>
          </span>
        </th>
        <th @click="sortBy('firstName')">
          First Name
          <span v-if="sortColumn === 'firstName'">
            <span v-if="sortOrder === 1">▼</span>
            <span v-else>▲</span>
          </span>
        </th>
        <th @click="sortBy('itemName')">
          Item
          <span v-if="sortColumn === 'itemName'">
            <span v-if="sortOrder === 1">▼</span>
            <span v-else>▲</span>
          </span>
        </th>
        <th @click="sortBy('orderTime')">
          Order Time
          <span v-if="sortColumn === 'orderTime'">
            <span v-if="sortOrder === 1">▼</span>
            <span v-else>▲</span>
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="name in sortedNames" :key="name.lastName + name.firstName">
        <td>{{ name.lastName }}</td>
        <td>{{ name.firstName }}</td>
        <td>{{ name.itemName }}</td>
        <td>{{ name.orderTime }}</td>
      </tr>
    </tbody>
  </table>
</div>

<script>
// This script loads data from a file "fileName".
// You have to set the itemMappings. Get the ints from https://pretixurl.com/control/event/ORGANISER/EVENT/items/ 
// Example: https://tickets.skvidar.run/control/event/SKV/treningsleirtest/items/
// The format of the fileName file has to be: <lastname>,<firstname>,<itemNumber>,<boughtdate>
// Exameple: Fyksen,Fredrik Sætereng,22,2023-07-01 19:19

export default {
  data() {
    return {
      names: [],
      sortColumn: "",
      sortOrder: 1,
      itemMappings: {
        "22": "en uke",
        "23": "to uker",
        // Add more mappings as needed
      },
      fileName: "attendees-files/names.txt",
    };
  },
  mounted() {
    this.fetchNames();
  },
  computed: {
    sortedNames() {
      return this.names.slice().sort((a, b) => {
        const columnA = a[this.sortColumn];
        const columnB = b[this.sortColumn];

        if (columnA < columnB) return -1 * this.sortOrder;
        if (columnA > columnB) return 1 * this.sortOrder;
        return 0;
      });
    },
  },
  methods: {
    fetchNames() {
      const timestamp = Date.now(); // Unique value for cache-busting

      fetch(`/${this.fileName}?${timestamp}`)
        .then((response) => response.text())
        .then((data) => {
          const rows = data.split("\n").filter((name) => name.trim() !== "");
          this.names = rows.map((row) => {
            const [lastName, firstName, itemNumber, orderTime] = row.split(",");
            const itemName = this.getItemName(itemNumber);
            return { lastName, firstName, itemName, orderTime };
          });
        })
        .catch((error) => {
          console.error("Error fetching names:", error);
        });
    },
    getItemName(itemNumber) {
      return this.itemMappings[itemNumber] || "N/A";
    },
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortOrder *= -1;
      } else {
        this.sortColumn = column;
        this.sortOrder = 1;
      }
    },
  },
};
</script>

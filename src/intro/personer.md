<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Gustav Vasdal',
    title: 'Trenger og organisator'
  },
    {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Markus Harbo',
    title: 'Sportslig tankesmed'
  }
]


</script>

# Trenere

Si hei til vårt fantastiske trenerteam!

<VPTeamMembers size="small" :members="members" />

---

## Ildsjeler

Det er mange ildsjeler i SK Vidar Lang som gjør det mulig, og det er vanskelig å dra frem bare en håndfull.
<VPTeamMembers
  size="small"
  :members="[
    { avatar: '...', name: 'Fredrik Sætereng Fyksen' },
    { avatar: '...', name: 'Erik Sørensen' },
  ]"
/>
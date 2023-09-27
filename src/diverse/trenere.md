<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: '/avatars/gustavvasdal.jpg',
    name: 'Gustav Vasdal',
    title: 'Trener og organisator'
  },
  {
    avatar: '/avatars/magnushojen.jpg',
    name: 'Magnus Højen',
    title: 'Trener'
  },
    {
    avatar: '/avatars/markusharbo.jpg',
    name: 'Markus Harbo',
    title: 'Sportslig tankesmed'
  }
]
</script>

# Trenere

Si hei til vårt fantastiske trenerteam!

<VPTeamMembers size="small" :members="members" />


## Ildsjeler

Det er mange ildsjeler i SK Vidar Lang som gjør det mulig, og det er vanskelig å dra frem bare en håndfull.
<VPTeamMembers
  size="small"
  :members="[
        {
          avatar: '/avatars/fredrikfyksen.jpg',
          name: 'Fredrik Sætereng Fyksen',
          title: 'Altmuligmann'
        }
]"
/>
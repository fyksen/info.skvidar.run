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

<VPTeamMembers size="medium" :members="members" />


## Ildsjeler

Det er mange ildsjeler i SK Vidar Lang som gjør det mulig, og det er vanskelig å dra frem bare en håndfull.
<VPTeamMembers
  size="medium"
  :members="[
        {
          avatar: '/avatars/anne-line.png',
          name: 'Anne-Line Evenstad Dahlen',
          title: 'Alt mulig dame'
        },
        {
          avatar: '/avatars/axel-wolland.png',
          name: 'Axel Wollan',
          title: 'Styremedlem i SKV'
        },
        {
          avatar: '/avatars/fredrikfyksen.jpg',
          name: 'Fredrik Sætereng Fyksen',
          title: 'Alt mulig mann'
        },
        {
          avatar: '/avatars/ingrid-huitfeldt.png',
          name: 'Ingrid Marie Schaumburg Huitfeldt',
          title: 'Styremedlem i SKV'
        },
        {
          avatar: '/avatars/magnus-warvik.png',
          name: 'Magnus Warvik',
          title: 'Tidtakning'
        },
        {
          avatar: '/avatars/mathilde-theisen.png',
          name: 'Mathilde Theisen',
          title: 'Passer på alle'
        },
        {
          avatar: '/avatars/sofie-fosselie.jpg',
          name: 'Sofie Fosselie',
          title: 'Alt mulig dame'
        },
        {
          avatar: '/avatars/steinar-gunderson.png',
          name: 'Steinar H. Gunderson',
          title: 'Kodekriger, integrasjon mellom Slack og regneark'
        },
        {
          avatar: '/avatars/tore-lervik.png',
          name: 'Tore Lervik',
          title: 'Main guy bak skvidar.run'
        }
]"
/>
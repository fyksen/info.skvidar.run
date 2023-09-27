import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "info.skvidar.run",
  description: "Informasjonsside for Skvidar Lang",
  cleanUrls: true,
  ignoreDeadLinks: true,
  head: [
    ['script', { defer: true, 'data-domain': 'info.skvidar.run', src: 'https://plausible.tresh.run/js/script.js' }]
  ],
  srcDir: './src',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Startside', link: '/' },
      { text: 'Introguide', link: '/intro/forste-okt' },
    ],

    sidebar: [
      {
        text: 'Intro',
        items: [
          { text: 'Første økt', link: '/intro/forste-okt' },
          { text: 'Oppmøtesteder og intervallrunder', link: '/intro/steder' },
          { text: 'bislett-innendors', link: '/intro/bislett-innendors' },        
        ]
      },

      {
        text: 'Diverse',
        items: [
          { text: 'Trenere', link: '/diverse/trenere' },
          { text: 'Chat', link: '/diverse/chat' },
          { text: 'Treningsfilosofi', link: '/diverse/treningsfilosofi' },
        ]
      },

      {
        text: 'Arrangementer',
        items: [
          { text: 'Oversikt', link: '/arrangementer/oversikt' },  
        ]
      }      

    ],

    // Oversetting av gui.
    outlineTitle: 'På denne siden',
    lastUpdatedText: 'Sist oppdatert',
    darkModeSwitchLabel: 'Bytt utseende',
    sidebarMenuLabel: 'Meny',
    returnToTopLabel: 'Tilbake til toppen',

    socialLinks: [
      { icon: 'facebook', link: 'https://www.facebook.com/groups/314712537171067' }
    ]
  }
})

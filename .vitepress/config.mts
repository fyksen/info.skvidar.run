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
      { text: 'Hjem', link: '/' },
      { text: 'Introguide', link: '/intro/forste-okt' },
    ],

    sidebar: [
      {
        text: 'Intro',
        items: [
          { text: 'Første økt', link: '/intro/forste-okt' },
          { text: 'Oppmøtesteder og intervallrunder', link: '/intro/steder' },
          { text: 'Chat', link: '/intro/chat' },
          { text: 'Trenere', link: '/intro/personer' },
          { text: 'Treningsfilosofi', link: '/intro/treningsfilosofi' },          
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

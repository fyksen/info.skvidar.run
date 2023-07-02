import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "info.skvidar.run",
  description: "Informasjonsside for Skvidar Lang",
  srcDir: './src',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Hjem', link: '/' },
      { text: 'Intro Guide', link: '/intro/' },
    ],

    sidebar: [
      {
        text: 'Intro',
        items: [
          { text: 'Oppmøtesteder og intervallrunder', link: '/intro/steder' },
          { text: 'Første økt', link: '/intro/' },
          { text: 'Trenere', link: '/intro/personer' }
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

import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "info.skvidar.run",
  description: "Informasjonsside for Skvidar Lang",
  cleanUrls: true,
  ignoreDeadLinks: true,
  base: '/',
  head: [
    ['script', { defer: true, 'data-domain': 'info.skvidar.run', src: 'https://plausible.tresh.run/js/script.js' }],
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  srcDir: './src',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config


    sidebar: [
      {
        text: 'Intro',
        items: [
          { text: 'Første økt', link: '/intro/forste-okt' },
          { text: 'Oppmøtesteder og intervallrunder', link: '/intro/steder' },
          { text: 'Innendørsløping på Bislett', link: '/intro/bislett-innendors' },        
        ]
      },

      {
        text: 'Diverse',
        items: [
          { text: 'Hvem er vi?', link: '/diverse/om-skv-lang' },
          { text: 'Trenere', link: '/diverse/trenere' },
          { text: 'Chat', link: '/diverse/chat' },
          { text: 'Treningsfilosofi', link: '/diverse/treningsfilosofi' },
          { text: 'Klubbtøy', link: '/diverse/klubbtoy' },
          { text: 'Kontakt', link: '/diverse/kontakt' },
        ]
      },

      {
        text: 'Arrangementer',
        items: [
          { text: 'Oversikt', link: '/arrangementer/oversikt' },
          { text: '2023-Q4-Julebord', link: '/arrangementer/sosialt/julebord-23/' },
          { text: '2024-Q1-Fuerteventura', link: '/arrangementer/treningsleir/2024-q1-fuerteventura' },
          
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
      { icon: 'facebook', link: 'https://www.facebook.com/groups/314712537171067' },
      { icon: 'slack', link: 'https://join.slack.com/t/skvidar/shared_invite/zt-25gq4jieq-NTjoVUjJlMi_lhEcAtGD3Q'},
      {
        icon: {
          svg: `
          <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 64 64">
              <defs>
                  <filter id="grayscale">
                      <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />
                  </filter>
              </defs>
              <path d="M41.03 47.852l-5.572-10.976h-8.172L41.03 64l13.736-27.124h-8.18" fill="#f9b797" filter="url(#grayscale)" />
              <path d="M27.898 21.944l7.564 14.928h11.124L27.898 0 9.234 36.876H20.35" fill="#f05222" filter="url(#grayscale)" />
          </svg>
          `
        },
        link: 'https://www.strava.com/clubs/97233',
        ariaLabel: 'Lenke til SK Vidar Strava gruppe'
      }
    ]
    
  }
})

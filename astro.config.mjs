import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false
    })
  ],
  adapter: vercel({
    webAnalytics: {
      enabled: false
    }
  }),
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  output: 'static',
  compressHTML: true,
  prefetch: true
});

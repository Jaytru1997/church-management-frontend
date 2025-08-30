// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Enable TypeScript
  typescript: {
    strict: true,
  },

  // Development tools
  devtools: { enabled: true },

  // CSS
  css: ["~/assets/css/main.css"],

  // Modules
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  // TailwindCSS configuration
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    configPath: "tailwind.config.ts",
  },

  // Pinia configuration
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    // apiSecret: process.env.API_SECRET,

    // Public keys (exposed to client-side)
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "http://localhost:5000/api",
      pusherKey: process.env.PUSHER_KEY || "your-pusher-key",
      pusherCluster: process.env.PUSHER_CLUSTER || "mt1",
      monnifyPublicKey:
        process.env.MONNIFY_PUBLIC_KEY || "your-monnify-public-key",
      monnifyContractCode:
        process.env.MONNIFY_CONTRACT_CODE || "your-contract-code",
    },
  },

  // App configuration
  app: {
    head: {
      title: "Church Management System",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Comprehensive church management system for managing members, donations, and campaigns.",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // Nitro configuration
  nitro: {
    preset: "node",
  },
});

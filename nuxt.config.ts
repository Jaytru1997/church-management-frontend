import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Enable TypeScript
  typescript: {
    strict: false,
    typeCheck: false,
  },

  // Development tools
  devtools: { enabled: true },

  // CSS
  css: ["~/assets/css/main.css"],

  // Modules
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    // apiSecret: process.env.API_SECRET,

    // Public keys (exposed to client-side)
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "http://localhost:5000/api",
      pusherKey: process.env.PUSHER_KEY || "your-pusher-key",
      pusherCluster: process.env.PUSHER_CLUSTER || "mt1",
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
          key: "description",
          name: "description",
          content:
            "Comprehensive church management system for managing members, donations, and campaigns.",
        },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
      ],
    },
  },

  // Nitro configuration
  nitro: {
    preset: "static",
  },
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/image-edge',
        '@nuxtjs/supabase'
    ],
    plugins: [
        {
            src: '~/plugins/vercel.ts', mode: 'client'
        }
    ]
})

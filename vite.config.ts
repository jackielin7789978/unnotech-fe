import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components(),
		AutoImport({
			imports: ['vue', 'vue-router'],
			eslintrc: {
				enabled: true,
			},
		}),
		vueI18n({
			include: path.resolve(__dirname, './src/locales/**'),
			runtimeOnly: false,
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
		},
	},
})

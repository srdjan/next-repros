const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
const withOffline = moduleExists('next-offline') ? require('next-offline') : {}
const env = process.env.NODE_ENV === 'production' ? process.env : localEnv

const nextConfig = {
	target: 'serverless',
	webpack: config => {
		config.plugins.push(new webpack.EnvironmentPlugin(env))
		config.resolve.alias = {
      ...config.resolve.alias,
      react: 'preact/compat',
      react$: 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom$': 'preact/compat',
    }
		return config
	},
	workboxOpts: {
		swDest: 'public/service-worker.js',
		runtimeCaching: [
			{
				urlPattern: /^https?.*/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'https-calls',
					networkTimeoutSeconds: 15,
					expiration: {
						maxEntries: 150,
						maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
		],
	},
	experimental: {
		css: true,
		granularChunks: true,
		modern: true,
	},
}

function moduleExists(name) {
	try {
		return require.resolve(name)
	} catch (error) {
		return false
	}
}

module.exports = moduleExists('next-offline') ? withOffline(nextConfig) : nextConfig
const withPreact = require('next-plugin-preact')

module.exports = withPreact({
  experimental: {
    modern: true
  },
  images: {
    domains: ['firebasestorage.googleapis.com']
  }
})

const withPreact = require('next-plugin-preact')

module.exports = withPreact({
  images: {
    domains: ['firebasestorage.googleapis.com']
  }
})

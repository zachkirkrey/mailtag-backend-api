const isProduction = process.env.PRODUCTION !== undefined
if (!isProduction) {
  require('husky').install()
}

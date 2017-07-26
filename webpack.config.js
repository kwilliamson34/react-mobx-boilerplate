//env variable passed in from webpack --env=(dev|stage|prod) build call
module.exports = function(env) {
  let _env = env || 'prod';
  return require(`./webpack.config.${_env}.js`)
}

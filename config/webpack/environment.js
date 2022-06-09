const { environment } = require('@rails/webpacker')
const webpack = require('webpack')
environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  parsley:  'parsleyjs/dist/parsley.min.js',
  rangeslider:"rangeslider-js/dist/rangeslider-js.min.js",
  Popper: ['popper.js', 'default']
}))

const aliasConfig = {
  'jquery': 'jquery-ui-dist/external/jquery/jquery.js',
  'jquery-ui': 'jquery-ui-dist/jquery-ui.js'
};

environment.config.set('resolve.alias', aliasConfig);
module.exports = environment

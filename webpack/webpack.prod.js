const { merge } = require('webpack-merge');
const common = require('../webpack/webpack.common.js');

 module.exports = merge(common, {
   mode: 'production',
 });
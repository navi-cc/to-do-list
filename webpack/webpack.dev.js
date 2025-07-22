const { merge } = require('webpack-merge');
const common = require('../webpack/webpack.common.js');

module.exports = merge(common, {
   mode: 'development',
   devtool: "eval-source-map",
   devServer: {
        open: true,
        watchFiles: ["./src/index.html"],
    },
 });
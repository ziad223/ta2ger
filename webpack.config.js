const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true, // تفعيل التصغير
    minimizer: [new TerserPlugin()], // استخدام Terser
  },
};

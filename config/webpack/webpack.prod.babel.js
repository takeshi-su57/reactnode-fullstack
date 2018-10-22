// Important modules this config uses
const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let plugins = [
  new ExtractTextPlugin({
    filename: 'style.[chunkhash].css'
  }),
  // Minify and optimize the index.html
  new HtmlWebpackPlugin({
    template: 'app/index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
    inject: true,
  }),
  // Generate a service worker script that will precache, and keep up to date,
  // the HTML & assets that are part of the Webpack build.
  new WorkboxWebpackPlugin.GenerateSW({
    clientsClaim: true,
    exclude: [/\.map$/, /asset-manifest\.json$/],
    importWorkboxFrom: 'cdn',
    navigateFallback: '/index.html',
    navigateFallbackBlacklist: [
      // Exclude URLs starting with /_, as they're likely an API call
      new RegExp('^/_'),
      // Exclude URLs containing a dot, as they're likely a resource in
      // public/ and not a SPA route
      new RegExp('/[^/]+\\.[^/]+$'),
    ],
  }),
];

if (process.env.BUNDLE_ANALYZE) {
  plugins = plugins.concat([new BundleAnalyzerPlugin()]);
}
module.exports = require('./webpack.base.babel')({
  mode: 'production',
  // In production, we skip all hot-reloading stuff
  entry: [
    path.join(process.cwd(), 'app/main.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  plugins: plugins,

  performance: {
    assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  },
});

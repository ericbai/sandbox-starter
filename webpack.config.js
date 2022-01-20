// Dependencies
const fs = require('fs');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Customize behavior based on mode in Webpack 5, `process.env.NODE_ENV` is for Webpack <= 3
// Must use `--mode <env>` NOT `--mode=<env>`
// see https://stackoverflow.com/a/54482904
const MODE_DEV = process.argv[process.argv.indexOf('--mode') + 1] !== 'production';

// Automatically build the first
// see https://stackoverflow.com/a/67928998
// see https://nodejs.org/docs/latest-v14.x/api/fs.html#fs_fs_readdirsync_path_options
const DIRECTORY_EJS = path.resolve(process.cwd(), 'src', 'ejs');
const htmlPagePlugins = fs
  .readdirSync(DIRECTORY_EJS)
  .filter(fileName => fileName.endsWith('.ejs'))
  .map(
    ejsName =>
      // see https://github.com/jantimon/html-webpack-plugin#options
      // default `inject: true` so will automatically inject script/style tags into EJS template
      new HTMLWebpackPlugin({
        template: path.resolve(DIRECTORY_EJS, ejsName),
        filename: `${ejsName.slice(0, -4)}.html`,
      }),
  );

// why we use `process.cwd()` instead of `__dirname`, see https://stackoverflow.com/a/45145514
module.exports = {
  entry: {
    main: path.resolve(process.cwd(), 'src', 'main.js'),
  },
  output: {
    path: path.resolve(process.cwd(), 'build'),
    // uses substitution that each entry point has a corresponding output
    // see https://webpack.js.org/concepts/output/#multiple-entry-points
    // see https://webpack.js.org/configuration/output/#outputfilename
    filename: MODE_DEV ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
  },
  // uses webpack-dev-server v4, see https://webpack.js.org/configuration/dev-server
  devServer: {
    // opens new browser window after start
    open: true,
    // for simplicity, use live reload instead of hot module replacement
    hot: false,
    liveReload: true,
    watchFiles: ['src/**/*', 'assets/**/*'],
  },
  // see https://webpack.js.org/concepts/entry-points/#separate-app-and-vendor-entries
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  resolve: {
    // enables absolute urls, see https://stackoverflow.com/a/41684002
    // JS: just directly use alias object key to start import
    // SASS: add '~' before sass urls means to resolve as a module, see https://stackoverflow.com/a/39535907
    alias: {
      assets: path.resolve(process.cwd(), 'assets'),
      src: path.resolve(process.cwd(), 'src'),
    },
  },
  module: {
    rules: [
      // for transpilation via Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // handling SCSS files
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      // handles EJS files
      {
        test: /\.ejs$/,
        exclude: /node_modules/,
        use: ['ejs-compiled-loader'],
      },
      // Webpack v5 deprecated `file-loader` and `url-loader` in favor of asset modules
      // see https://webpack.js.org/guides/asset-modules/
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|svg)$/,
        exclude: /node_modules/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    // see https://webpack.js.org/plugins/mini-css-extract-plugin/#options
    new MiniCssExtractPlugin({
      // see https://webpack.js.org/plugins/mini-css-extract-plugin/#advanced-configuration-example
      filename: MODE_DEV ? '[name].css' : '[name].[contenthash].css',
    }),
    ...htmlPagePlugins,
  ],
};

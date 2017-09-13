import * as path from 'path';
import * as webpack from 'webpack';
declare var __dirname;

const config: webpack.Configuration = {
  devtool: 'inline-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', // note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index'),
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, '/dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    noInfo: false,
    contentBase: path.resolve(__dirname, 'src'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          'ts-loader',
          'tslint-loader',
        ],
      },
      {
        test: /(\.css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
          'sass-loader',

        ],
      },
      {
        test: /(\.scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|jpg)$/i,
        use: [
          {
            loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',

          },
          {
            loader: 'image-webpack-loader?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}',
          },
        ],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
};

export default config;

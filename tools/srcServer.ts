import * as dotenv from 'dotenv';
import * as express from 'express';
import open = require('open');
import * as path from 'path';
import * as webpack from 'webpack';
import * as winston from 'winston';
import webpackConfigDev from '../webpack.config.dev';

class App {
  protected app: express.Application;

  constructor(PORT: string = '3000') {
    /**
     * Setting port number
     */
    process.env.PORT = process.env.PORT || PORT;

    this.app = express();
    const compiler = webpack(webpackConfigDev);

    this.app.use(require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfigDev.output.publicPath,
    }));

    this.app.use(require('webpack-hot-middleware')(compiler));

    this.app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, '../src/index.html'));
    });

    this.app.listen(process.env.PORT, (err) => {
      err ? winston.log('error', err) : open(`http://localhost:${process.env.PORT}`);
    });
  }
}
new App();

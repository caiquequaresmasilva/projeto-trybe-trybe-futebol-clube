import * as express from 'express';
import * as cors from 'cors';
import { clubsRouter, leaderboardRouter, loginRouter, matchesRouter } from './routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.setRoutes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setRoutes():void {
    this.app.use('/login', loginRouter);
    this.app.use('/matchs', matchesRouter);
    this.app.use('/clubs', clubsRouter);
    this.app.use('/leaderboard', leaderboardRouter);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
  }
}

export { App };

export const { app } = new App();

import * as express from 'express';
import * as bodyParser from 'body-parser';

import { signUpController, BatteryDetailsController } from './controllers';

const app: express.Application = express();
const port: number = 3000;
const baseRoute: string = '/shop';

app.use(bodyParser.json());
app.use(baseRoute, signUpController);
app.use(baseRoute, signUpController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});

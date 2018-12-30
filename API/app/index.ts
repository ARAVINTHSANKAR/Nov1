import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { signUpController } from './controllers';

const app: express.Application = express();
const port: number = 3000;
const homeRoute: string = '/home';
const batteryRoute: string = '/battery';

app.use(cors());
app.use(bodyParser.json());
app.use(homeRoute, signUpController);

// app.use(batteryRoute, BatteryDetailsController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});

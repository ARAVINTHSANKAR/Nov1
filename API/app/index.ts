import * as express from 'express';
import * as bodyParser from 'body-parser';

import { signUpController } from './controllers';


const app: express.Application = express();
const port: number = 3000;
const baseRoute: string = '/shop';
const userRoute: string = '/user';

app.use(bodyParser.json());
app.use(baseRoute + userRoute, signUpController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});

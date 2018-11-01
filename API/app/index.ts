import * as express from 'express';
import * as bodyParser from 'body-parser';

import { signUpController } from './controllers';


const app: express.Application = express();
const port: number = 3000;
const baseUrl: string = '/shop';

app.use(bodyParser.json());
app.use(baseUrl, signUpController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});

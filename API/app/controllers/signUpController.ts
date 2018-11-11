import { Router, Request, Response } from 'express';
import { dao } from '../dao/dao';

const router: Router = Router();
const daoObj = new dao();

router.post('/addUser', (req: Request, res: Response) => {
    daoObj.saveUser(req, res);
});

router.post('/authenticate', (req: Request, res: Response) => {
    daoObj.authentication(req, res);
});

export const signUpController: Router = router;

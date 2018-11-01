import { Router, Request, Response } from 'express';
import { dao } from '../dao/dao';

const router: Router = Router();

router.post('/addUser', (req: Request, res: Response) => {
    dao.addAccessor(req, res);
});

export const signUpController: Router = router;

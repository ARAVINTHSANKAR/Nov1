import { Router, Request, Response } from 'express';
import { dao } from '../dao/dao';

const router: Router = Router();

router.post('/add', (req: Request, res: Response) => {
        dao.addAccessor(req, res);
});

export const signUpController: Router = router;

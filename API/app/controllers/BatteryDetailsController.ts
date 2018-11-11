import { Router, Request, Response } from 'express';
import { dao } from '../dao/dao';

const router: Router = Router();
const daoObj = new dao();

router.post('/savebatterydetails', (req: Request, res: Response) => {
    daoObj.saveBattery(req, res);
});

router.get('/salesHistory', (req: Request, res: Response) => {
    daoObj.getSalesHistory(req, res);
});

router.get('/batteryDetails/:batteryBikeBuyerId', (req: Request, res: Response) => {
    daoObj.getParticularBatteryDetails(req, res);
});

export const BatteryDetailsController: Router = router;

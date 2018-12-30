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

router.get('/getAllUser', (req: Request, res: Response) => {
    daoObj.getAllUser(req, res);
});

router.put('/toggleUser', (req: Request, res: Response) => {
    daoObj.activateDeactivateUser(req, res);
});

router.get('/stockDetails', (req: Request, res: Response) => {
    daoObj.getStockDetails(req, res);
});

router.post('/savebatterydetails', (req: Request, res: Response) => {
    daoObj.saveBattery(req, res);
});

router.get('/totalsalesHistory', (req: Request, res: Response) => {
    daoObj.getSalesHistory(req, res);
});

router.get('/batteryDetails/:batteryBikeBuyerId', (req: Request, res: Response) => {
    daoObj.getParticularBatteryDetails(req, res);
});

router.put('/claimWarrenty', (req: Request, res: Response) => {
    daoObj.updateBatteryDetailsForWarrenty(req, res);
});

router.post('/saveWarrentyBattery', (req: Request, res: Response) => {
    daoObj.saveWarrentyBattery(req, res);
});

router.get('/getWarrentyBatteries', (req: Request, res: Response) => {
    daoObj.fetchWarrentyBatteryDetails(req, res);
});

router.get('/batterybrandsModels', (req: Request, res: Response) => {
    daoObj.getBatteryBrandsModels(req, res);
});

export const signUpController: Router = router;

import { Request, Response } from 'express';

/**DbConnection */
import { sequelize } from '../config/dbConnection';
import { queries } from '../helpers/query';

/**Models */
import { AccessorDetails } from '../models/AccessorDetails';


export class dao {

    public errorBag: any = {
        message: "Failed",
        dbData: null,
        comments: ""
    };

    public successBag: any = {
        message: "Success",
        dbData: null,
        comments: ""
    };

    public saveUser = async (req: Request, res: Response) => {
        let daoObj = new dao();
        let userDetailsPayLoad: AccessorDetails = req.body;
        let transaction;
        transaction = await sequelize.transaction();
        try {
            let lastRowIndexResponse = await dao.getLastRowIndex('AccessorDetails');
            let accessDetailsLastRowIndexDetails;
            if (lastRowIndexResponse.length > 0 && lastRowIndexResponse.length == 1) {
                accessDetailsLastRowIndexDetails = lastRowIndexResponse[0];
                userDetailsPayLoad.accessId = accessDetailsLastRowIndexDetails.lastRowId + 1;
                const dbResponse = await sequelize.query(queries.insertAccessor, {
                    replacements: userDetailsPayLoad,
                    type: sequelize.QueryTypes.INSERT,
                    transaction
                });
                const updateQueryForNextIdTable = `UPDATE LastRowIndex
                SET lastRowId = `+ userDetailsPayLoad.accessId + `
                WHERE nextId = 1;`;
                await sequelize.query(updateQueryForNextIdTable, {
                    type: sequelize.QueryTypes.UPDATE,
                    transaction
                });
                await transaction.commit();
                daoObj.successBag.comments = "Insertion success";
                daoObj.successBag.dbData = dbResponse;
                res.send(daoObj.successBag);
            } else {
                daoObj.errorBag.comments = "Fetching last row index failed as entire array is empty";
                throw 'error in fetching data from LastRowIndex';
            }
        } catch (error) {
            await transaction.rollback();
            daoObj.errorBag.comments = "Insertion failed";
            daoObj.errorBag.dbData = error ? error : [];
            res.send(daoObj.errorBag);
        }
    }

    public authentication = async (req: Request, res: Response) => {
        let daoObj = new dao();
        let transaction;
        let requestedUser = req.body;
        transaction = await sequelize.transaction();
        try {
            const userDetails = await sequelize.query(queries.searchParticularUser,
                {
                    replacements: { payLoadName: requestedUser.name },
                    type: sequelize.QueryTypes.SELECT, transaction
                });
                if (userDetails.length > 0) {
                    const isAuthSuccess = (requestedUser.password == userDetails[0].password.trim());
                    if (isAuthSuccess) {
                        await transaction.commit();
                        daoObj.successBag.comments = 'Authentication success';
                        daoObj.successBag.dbData = userDetails;
                        daoObj.successBag['status'] = 1;
                        res.send(daoObj.successBag);
                } else {
                    throw 'Incorrect Password';
                }
            } else {
                throw 'User Details unavailable';
            }
        } catch (error) {
            transaction.rollback();
            daoObj.errorBag.comments = "Something went wrong";
            daoObj.errorBag.dbData = error ? error : [];
            daoObj.errorBag['status'] = 0;
            res.send(daoObj.errorBag);
        };
    }

    public saveBattery = async (req: Request, res: Response) => {
        let daoObj = new dao();
        const batteryDetails = req.body.batteryDetails;
        const buyerDetails = req.body.buyerDetails;
        const bikeDetails = req.body.bikeDetails;
        let transaction = await sequelize.transaction();
        try {
            let lastRowIndexResponse = await dao.getLastRowIndex('BatteryDetails', 'BuyerDetails', 'BikeDetails', 'BatteryBikeBuyerIds');
            let batteryLastRowDetails, bikeLastRowDetails, buyerLastRowDetails, BatteryBikeBuyerIdsLastRowDetails;
            if (lastRowIndexResponse.length == 4) {
                for (let i = 0; i < lastRowIndexResponse.length; i++) {
                    if (lastRowIndexResponse[i].projectxTableName.trim() == 'BatteryDetails') {
                        batteryLastRowDetails = lastRowIndexResponse[i];
                    } else if (lastRowIndexResponse[i].projectxTableName.trim() == 'BikeDetails') {
                        bikeLastRowDetails = lastRowIndexResponse[i];
                    } else if (lastRowIndexResponse[i].projectxTableName.trim() == 'BuyerDetails') {
                        buyerLastRowDetails = lastRowIndexResponse[i];
                    } else if (lastRowIndexResponse[i].projectxTableName.trim() == 'BatteryBikeBuyerIds') {
                        BatteryBikeBuyerIdsLastRowDetails = lastRowIndexResponse[i];
                    }
                }
                batteryDetails.batteryId = batteryLastRowDetails.lastRowId + 1;
                await sequelize.query(queries.insertBatteryDetails, {
                    replacements: batteryDetails,
                    type: sequelize.QueryTypes.INSERT,
                    transaction
                });
                buyerDetails.buyerId = buyerLastRowDetails.lastRowId + 1;
                await sequelize.query(queries.insertBuyerDetails, {
                    replacements: buyerDetails,
                    type: sequelize.QueryTypes.INSERT,
                    transaction
                });
                bikeDetails.bikeDetailsId = bikeLastRowDetails.lastRowId + 1;
                await sequelize.query(queries.insertBikeDetails, {
                    replacements: bikeDetails,
                    type: sequelize.QueryTypes.INSERT,
                    transaction
                });
                let bbbId = BatteryBikeBuyerIdsLastRowDetails.lastRowId + 1;
                const a = `UPDATE LastRowIndex
                SET lastRowId = `+ batteryDetails.batteryId + `
                WHERE nextId = 3;`;
                const b = `UPDATE LastRowIndex
                SET lastRowId = `+ bikeDetails.bikeDetailsId + `
                WHERE nextId = 6;`;
                const c = `UPDATE LastRowIndex
                SET lastRowId = `+ buyerDetails.buyerId + `
                WHERE nextId = 7;`;
                const d = `UPDATE LastRowIndex
                SET lastRowId = `+ bbbId + `
                WHERE nextId = 11;`;
                await sequelize.query(a, {
                    type: sequelize.QueryTypes.UPDATE,
                    transaction
                });
                await sequelize.query(b, {
                    type: sequelize.QueryTypes.UPDATE,
                    transaction
                });
                await sequelize.query(c, {
                    type: sequelize.QueryTypes.UPDATE,
                    transaction
                });
                await sequelize.query(d, {
                    type: sequelize.QueryTypes.UPDATE,
                    transaction
                });
                let batteryBikeBuyerInsertionQuery = queries.insertBatteryBikeBuyerIDs;
                let IdsObj = {
                    batteryBikeBuyerId: bbbId,
                    batteryId: batteryDetails.batteryId,
                    bikeId: bikeDetails.bikeDetailsId,
                    buyerId: buyerDetails.buyerId
                };
                await sequelize.query(batteryBikeBuyerInsertionQuery, {
                    replacements: IdsObj,
                    type: sequelize.QueryTypes.INSERT,
                    transaction
                })
                await transaction.commit();
                daoObj.successBag.comments = "Battery details saved successfully";
                res.send(daoObj.successBag);
            } else {
                throw 'error in fetching data from LastRowIndex';
            }
        } catch (error) {
            await transaction.rollback();
            daoObj.errorBag.comments = "Operation Failed";
            daoObj.errorBag.dbData = error;
            res.send(daoObj.errorBag);
        }
    }

    public static getLastRowIndex = async (...tableName: any[]) => {
        let transaction;
        transaction = await sequelize.transaction();
        let queryValues = tableName.map(a => JSON.stringify(a)).join();
        let lastRowIndexResponse: any = [];
        if (tableName.length > 0) {
            try {
                let fetchLastRowIndexQuery =
                    'select * from LastRowIndex where projectxTableName in (' + queryValues + ')';
                fetchLastRowIndexQuery = fetchLastRowIndexQuery.replace(/"/g, '\'');
                lastRowIndexResponse = await sequelize.query(fetchLastRowIndexQuery, {
                    type: sequelize.QueryTypes.SELECT,
                    transaction
                });
                await transaction.commit();
            } catch (error) {
                await transaction.rollback();
                lastRowIndexResponse = [];
            }
        }
        return lastRowIndexResponse;
    }

    public getSalesHistory = async (req: Request, res: Response) => {
        let daoObj = new dao();
        let transaction;
        transaction = await sequelize.transaction();
        try {
            const salesDetails = await sequelize.query(queries.getSalesDetails, {
                type: sequelize.QueryTypes.SELECT
            });
            await transaction.commit();
            daoObj.successBag.comments = 'Sales Details Fetched successfully';
            daoObj.successBag.dbData = salesDetails;
            res.send(daoObj.successBag);
        } catch(error) {
            await transaction.rollback();
            daoObj.errorBag.comments = 'Failed';
            daoObj.errorBag.dbData = error;
            res.send(daoObj.errorBag);
        }
    }

    public getParticularBatteryDetails = async (req: Request, res: Response) => {
        let daoObj = new dao();
        let transaction;
        let bbbId = req.params['batteryBikeBuyerId'];
        transaction = await sequelize.transaction();
        try {
            const batteryDetails = await sequelize.query(queries.fetchParticularBatteryDetails, {
                replacements: {batteryBikeBuyerId: bbbId},
                type: sequelize.QueryTypes.SELECT
            });
            await transaction.commit();
            daoObj.successBag.comments = 'success';
            daoObj.successBag.dbData = batteryDetails;
            res.send(daoObj.successBag);
        } catch (error) {
            await transaction.rollback();
            daoObj.errorBag.comments = 'FAILED';
            daoObj.errorBag.dbData = error;
            res.send(daoObj.errorBag);
        }
    }

    public getStockDetails = async (req: Request, res: Response) => {
        let transaction;
        let daoObj = new dao();
        transaction = await sequelize.transaction();
        try {
            const stockDetails = await sequelize.query(queries.fetchStockList,
                {
                    type: sequelize.QueryTypes.SELECT, transaction
                });
            await transaction.commit();
            daoObj.successBag.comments = 'success';
            daoObj.successBag.dbData = stockDetails;
            res.send(daoObj.successBag);
        } catch (error) {
            await transaction.rollback();
            daoObj.errorBag.comments = "Error in fetching data";
            daoObj.errorBag.dbData = error ? error : [];
            res.send(daoObj.errorBag)
        }
    }

    public getAllUser = async(req: Request, res: Response) => {
        let transaction;
        let daoObj = new dao();
        transaction = await sequelize.transaction();
        try {
            const allUser = await sequelize.query(queries.fetchAllUsers, {type: sequelize.QueryTypes.SELECT});
            await transaction.commit();
            daoObj.successBag.comments = 'Success';
            daoObj.successBag.dbData = allUser;
            res.send(daoObj.successBag);
        } catch(error) {
            await transaction.rollback();
            daoObj.errorBag.comments = 'Failed';
            daoObj.errorBag.dbData = error;
            res.send(daoObj.errorBag);
        }
    }

    public activateDeactivateUser =  async(req: Request, res: Response) => {
        let transaction;
        let daoObj = new dao();
        transaction = await sequelize.transaction();
        let values: any = {};
        try {
            if(req.body['activateIds'].length) {
                values['activateIds'] = req.body['activateIds'];
                await sequelize.query(queries.activateUsers, {
                    type: sequelize.QueryTypes.UPDATE,
                    replacements: values
                });
            }
            if(req.body['deactivateIds'].length) {
                values['deactivateIds'] = req.body['deactivateIds'];
                await sequelize.query(queries.deactivateUsers, {
                    type: sequelize.QueryTypes.UPDATE,
                        replacements: values
                });
            }
            await transaction.commit();
            daoObj.successBag.comments = 'Success';
            res.send(daoObj.successBag);
        } catch(error) {
            await transaction.rollback();
            daoObj.errorBag.comments = 'Failed';
            daoObj.errorBag.dbData = error;
            res.send(daoObj.errorBag);
        }
    }

    public updateBatteryDetailsForWarrenty = async(req: Request, res: Response) => {
        let transaction;
        let daoObj = new dao();
        let values: any = {};
        transaction = await sequelize.transaction();
        try {
            if(req.body['warrentyType'] !== 0) {
                values['isReplacable'] = 1;
            } else {
                values['isReplacable'] = 0;
            }
            values['batteryId'] = req.body['batteryId'];
            values['batteryNumber'] = req.body['batteryNumber'];
            values['type'] = req.body['warrentyType'];
            await sequelize.query(queries.updateWarrentyType, {
                type: sequelize.QueryTypes.UPDATE,
                replacements: values
            });
            await transaction.commit();
            daoObj.successBag.comments = 'Success';
            res.send(daoObj.successBag);
        } catch (error) {
            await transaction.rollback();
            daoObj.errorBag.comments = 'Failed';
            daoObj.errorBag.dbData = error;
            res.send(daoObj.errorBag);
        }
    }

    public saveWarrentyBattery = async(req: Request, res: Response) => {
        let values: any = {};
        let transaction;
        let daoObj = new dao();
        transaction = await sequelize.transaction();
        try {
            let count = await sequelize.query(queries.checkForTableExists, {
                type: sequelize.QueryTypes.SELECT
            });
            if(count[0]['totalCount'] === 0) {
                values['warrentyBatteryId'] = 1;
            } else {
                values['warrentyBatteryId'] = count[0]['totalCount'] + 1;
            }
            values['oldBatteryId'] = req.body['oldBatteryId'];
            values['exchangeReason'] = req.body['exchangeReason'];
            values['warrentyBatteryNumber'] = req.body['warrentyBatteryNumber'];
            values['exchangerName'] = req.body['exchangerName'];
            console.log(values)
            await sequelize.query(queries.saveWarrentyBattery, {
                replacements: values,
                type: sequelize.QueryTypes.INSERT
            });
            await transaction.commit();
            daoObj.successBag.comments = 'Success';
            res.send(daoObj.successBag);
        } catch (error) {
            await transaction.rollback();
            daoObj.errorBag.comments = 'Failed';
            daoObj.errorBag.dbData = error;
            res.send(daoObj.errorBag);
        }
    }

    public fetchWarrentyBatteryDetails = async(req: Request, res: Response) => {
        let values: any = {};
        let transaction;
        let daoObj = new dao();
        transaction = await sequelize.transaction();
        try {
            const result = await sequelize.query(queries.getWarrentyBatteries, {
                type: sequelize.QueryTypes.SELECT
            });
            await transaction.commit();
            daoObj.successBag.comments = 'Success';
            daoObj.successBag.dbData = result;
            res.send(daoObj.successBag);
        } catch (error) {
            await transaction.rollback();
            daoObj.errorBag.comments = 'Failed';
            daoObj.errorBag.dbData = error;
            res.send(daoObj.errorBag);
        }
    }

    public getBatteryBrandsModels = async (req: Request, res: Response) => {
        let values: any = {};
        let transaction;
        let daoObj = new dao();
        transaction = await sequelize.transaction();
        try {
            const brandsResult = await sequelize.query(queries.fetchBatteryBrands, {
                type: sequelize.QueryTypes.SELECT
            });
            const modelsResult = await sequelize.query(queries.fetchBatteryModels, {
                type: sequelize.QueryTypes.SELECT
            });
            daoObj.successBag.comments = 'Success';
            daoObj.successBag.dbData = {};
            daoObj.successBag.dbData['batteryModels'] = modelsResult;
            daoObj.successBag.dbData['batteryBrands'] = brandsResult;
            await transaction.commit();
            res.send(daoObj.successBag);
        } catch (error) {
            await transaction.rollback();
            daoObj.errorBag.comments = 'Failed';
            daoObj.errorBag.dbData = error;
            res.send(daoObj.errorBag);
        }
    }
}
 
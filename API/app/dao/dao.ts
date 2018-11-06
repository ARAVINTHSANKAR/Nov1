import { Request, Response } from 'express';

/**DbConnection */
import { sequelize } from '../config/dbConnection';
import { queries } from '../helpers/query';

/**Models */
import { AccessorDetails } from '../models/AccessorDetails';


export class dao {

    public static errorBag: any = {
        message: "Failed",
        dbData: null,
        comments: ""
    };

    public static successBag: any = {
        message: "Success",
        dbData: null,
        comments: ""
    };

    public saveUser = async (req: Request, res: Response) => {
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
                dao.successBag.comments = "Insertion success";
                dao.successBag.dbData = dbResponse;
                res.send(dao.successBag);
            } else {
                dao.errorBag.comments = "Fetching last row index failed as entire array is empty";
                throw 'error in fetching data from LastRowIndex';
            }
        } catch (error) {
            await transaction.rollback();
            dao.errorBag.comments = "Insertion failed";
            dao.errorBag.dbData = error ? error : [];
            res.send(dao.errorBag);
        }
    }

    public authentication = async (req: Request, res: Response) => {
        let transaction;
        let requestedUser = req.body;
        transaction = await sequelize.transaction();
        try {
            const userDetails = await sequelize.query(queries.searchParticularUser,
                {
                    replacements: { payLoadName: requestedUser.name },
                    type: sequelize.QueryTypes.SELECT, transaction
                });
            await transaction.commit();
            if (userDetails.length > 0) {
                const isAuthSuccess = (requestedUser.password == userDetails[0].password.trim());
                if (isAuthSuccess) {
                    dao.successBag.comments = 'Authentication success';
                    dao.successBag.dbData = userDetails;
                    res.send(dao.successBag);
                } else {
                    throw 'Incorrect Password';
                }
            } else {
                throw 'User Details unavailable';
            }
        } catch (error) {
            dao.errorBag.comments = "Something went wrong";
            dao.errorBag.dbData = error ? error : [];
            res.send(dao.errorBag);
        };
    }

    public saveBattery = async (req: Request, res: Response) => {
        const batteryDetails = req.body.batteryDetails;
        const buyerDetails = req.body.buyerDetails;
        const bikeDetails = req.body.bikeDetails;
        let transaction = await sequelize.transaction();
        try {
            let lastRowIndexResponse = await dao.getLastRowIndex('BatteryDetails', 'BuyerDetails', 'BikeDetails');
            let batteryLastRowDetails, bikeLastRowDetails, buyerLastRowDetails;
            if (lastRowIndexResponse.length == 3) {
                for (let i = 0; i < lastRowIndexResponse.length; i++) {
                    if (lastRowIndexResponse[i].projectxTableName.trim() == 'BatteryDetails') {
                        batteryLastRowDetails = lastRowIndexResponse[i];
                    } else if (lastRowIndexResponse[i].projectxTableName.trim() == 'BikeDetails') {
                        bikeLastRowDetails = lastRowIndexResponse[i];
                    } else if (lastRowIndexResponse[i].projectxTableName.trim() == 'BuyerDetails') {
                        buyerLastRowDetails = lastRowIndexResponse[i];
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
                const a = `UPDATE LastRowIndex
                SET lastRowId = `+ batteryDetails.batteryId + `
                WHERE nextId = 3;`;
                const b = `UPDATE LastRowIndex
                SET lastRowId = `+ bikeDetails.bikeDetailsId + `
                WHERE nextId = 6;`;
                const c = `UPDATE LastRowIndex
                SET lastRowId = `+ buyerDetails.buyerId + `
                WHERE nextId = 7;`;
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
                await transaction.commit();
                dao.successBag.comments = "Details saved successfully";
                res.send(dao.successBag);
            } else {
                throw 'error in fetching data from LastRowIndex';
            }
        } catch (error) {
            await transaction.rollback();
            dao.errorBag.comments = "Operation Failed";
            dao.errorBag.dbData = error ? error : [];
            res.send(dao.errorBag);
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
}

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
            const dbResponse = await sequelize.query(queries.insertAccessor, {
                replacements: userDetailsPayLoad,
                type: sequelize.QueryTypes.INSERT
            });
            await transaction.commit();
            dao.successBag.comments = "Insertion success";
            dao.successBag.dbData = dbResponse;
            res.send(dao.successBag);
        } catch(err) {
            await transaction.rollback();
            dao.errorBag.comments = "Insertion failed";
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
                if(isAuthSuccess) {
                    dao.successBag.comments = "Authentication success";
                    dao.successBag.dbData = userDetails;
                    res.send(dao.successBag);
                } else {
                    dao.errorBag.comments = "Incorrect Password";
                    res.send(dao.errorBag);                    
                }
            } else {
                dao.errorBag.comments = "User Not Available";
                res.send(dao.errorBag);
            }
        } catch(error) {
            dao.errorBag.comments = "Something went wrong";
            dao.errorBag.dbData = error;
            res.send(dao.errorBag);
        };
    }
}

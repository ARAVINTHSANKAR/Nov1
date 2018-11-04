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

    public static saveUser = async (req: Request, res: Response) => {
        let userDetailsPayLoad: AccessorDetails = req.body;
        let transaction;
        transaction = await sequelize.transaction();
        try {
            await sequelize.query(queries.insertAccessor, {
                replacements: userDetailsPayLoad,
                type: sequelize.QueryTypes.INSERT
            });
            await transaction.commit();
            dao.successBag.comments = "Insertion success";
            res.send(dao.successBag);
        } catch(err) {
            await transaction.rollback();
            dao.errorBag.comments = "Insertion failed";
            res.send(dao.errorBag);
        }
    }
}

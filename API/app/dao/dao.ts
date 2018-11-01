import { Request, Response } from 'express';
import * as CryptoJS from "crypto-js";

/**Models */
import { AccessorDetails } from '../models/AccessorDetails';

/**DbConnection */
import { sequelize } from '../config/dbConnection';
import { queries } from '../helpers/query';

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

    public static addAccessor = async (req: Request, res: Response) => {
        const accessorDetailsPayLoad = req.body;
        try {
            await sequelize.query(queries.insertAccessor, {
                replacements: accessorDetailsPayLoad,
                type: sequelize.QueryTypes.INSERT
            });
            dao.successBag.comments = "Insertion success";
            res.send(dao.successBag);
        } catch(err) {
            dao.errorBag.comments = "Insertion failed";
            res.send(dao.errorBag);
        }
    }

}

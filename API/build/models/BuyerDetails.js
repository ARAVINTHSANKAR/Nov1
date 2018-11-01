"use strict";
// import * as Sequelize from 'sequelize'
// /**config */
// import { dbConnection } from '../config/dbConnection';
// export interface BuyerDetailsRequestPayLoad
//     {
//         name: string;
//         contact: string;
//         role: string;
//         purchasedDate: Date;
//         location: string;
//     }
// export interface BuyerDetailsTableFields extends Sequelize.Model<BuyerDetailsTableFields, BuyerDetailsRequestPayLoad> 
//     {
//         buyerId: number; // primary key
//         name: string;
//         contact: string;
//         role: string;
//         purchasedDate: Date;
//         location: string;
//     }
// export const BuyerDetailsTableStructure  = dbConnection.define<BuyerDetailsTableFields, BuyerDetailsRequestPayLoad>('BuyerDetails', 
//     {
//         name: {
//             type: Sequelize.STRING
//         },
//         contact: {
//             type: Sequelize.STRING
//         },
//         role: {
//             type: Sequelize.STRING
//         },
//         purchasedDate: {
//             type: Sequelize.DATE
//         },
//         location: {
//             type: Sequelize.STRING
//         },
//     },
//     {
//         timestamps: false,
//         freezeTableName: true
//     });

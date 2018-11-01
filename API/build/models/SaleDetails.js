"use strict";
// import * as Sequelize from 'sequelize'
// /**config */
// import { dbConnection } from '../config/dbConnection';
// export interface saleDetailsRequestPayLoad 
//     {
//         buyerId: number;
//         batteryId: number;
//         bikeId: number;
//     }
// export interface saleDetailsTableFields extends Sequelize.Model<saleDetailsTableFields, saleDetailsRequestPayLoad> 
//     {
//         saleDetailId: number; // primary key
//         buyerId: number;
//         batteryId: number;
//         bikeId: number;
//     }
// export const SaleDetailsTableStructure  = dbConnection.define<saleDetailsTableFields, saleDetailsRequestPayLoad>('SaleDetails',
//     {
//         buyerId: {
//             type: Sequelize.NUMBER
//         },
//         batteryId: {
//             type: Sequelize.NUMBER
//         },
//         bikeId: {
//             type: Sequelize.NUMBER
//         }
//     },
//     {
//         timestamps: false,
//         freezeTableName: true
//     });

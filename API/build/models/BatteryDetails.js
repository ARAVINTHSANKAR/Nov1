"use strict";
// import * as Sequelize from 'sequelize'
// /**config */
// import { dbConnection } from '../config/dbConnection';
// export interface BatteryDetailsRequestPayLoad
//     {
//         batteryBrandId: number;  // foreign key
//         batteryModelId: number;  // foreign key
//         bQuantity: number;
//         batteryPrice: number;
//         cgst: number;
//         cgstAmount: number;
//         sgst: number;
//         sgstAmount: number;
//         totalPrice: number;
//         purchasedFrom: string;
//         batteryNumber: string;
//     }
// export interface BatteryDetailsTableFields extends Sequelize.Model<BatteryDetailsTableFields, BatteryDetailsRequestPayLoad>
//     {
//         batteryId: number;       // primary key
//         batteryBrandId: number;  // foreign key
//         batteryModelId: number;  // foreign key
//         bQuantity: number;
//         batteryPrice: number;
//         cgst: number;
//         cgstAmount: number;
//         sgst: number;
//         sgstAmount: number;
//         totalPrice: number;
//         purchasedFrom: string;
//         batteryNumber: string;
//     }
// export const BatteryDetailsTableStructure  = dbConnection.define<BatteryDetailsTableFields, BatteryDetailsRequestPayLoad>('BatteryDetails',
//     {
//         batteryBrandId: {
//             type: Sequelize.NUMBER
//         },
//         batteryModelId: {
//             type: Sequelize.NUMBER
//         },
//         bQuantity: {
//             type: Sequelize.NUMBER
//         },
//         batteryPrice: {
//             type: Sequelize.FLOAT
//         },
//         cgst: {
//             type: Sequelize.FLOAT
//         },
//         cgstAmount: {
//             type: Sequelize.FLOAT
//         },
//         sgst: {
//             type: Sequelize.FLOAT
//         },
//         sgstAmount: {
//             type: Sequelize.FLOAT
//         },
//         totalPrice: {
//             type: Sequelize.FLOAT
//         },
//         purchasedFrom: {
//             type: Sequelize.STRING
//         },
//         batteryNumber: {
//             type: Sequelize.STRING
//         }
//     },
//     {
//         timestamps: false,
//         freezeTableName: true
//     });

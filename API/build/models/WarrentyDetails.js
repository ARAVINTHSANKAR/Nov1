"use strict";
// import * as Sequelize from 'sequelize'
// /**config */
// import { dbConnection } from '../config/dbConnection';
// export interface WarrentyDetailsRequestPayLoad 
//     {
//         oldBatteryId: number;
//         exchangeReason: string;
//         warrentyBatteryNumber: string;
//         replacedDate: Date;
//         exchangerName: string;
//     }
// export interface WarrentyDetailsTableFields extends Sequelize.Model<WarrentyDetailsTableFields, WarrentyDetailsRequestPayLoad> 
//     {
//         warrentyBatteryId: number // primary key
//         oldBatteryId: number
//         exchangeReason: string;
//         warrentyBatteryNumber: string;
//         replacedDate: Date;
//         exchangerName: string;
//     }
// export const WarrentyDetailsTableStructure  = dbConnection.define<WarrentyDetailsTableFields, WarrentyDetailsRequestPayLoad>('WarrentyDetails', 
//     {
//         oldBatteryId: {
//             type: Sequelize.NUMBER
//         },
//         exchangeReason: {
//             type: Sequelize.STRING
//         },
//         warrentyBatteryNumber: {
//             type: Sequelize.STRING
//         },
//         replacedDate: {
//             type: Sequelize.DATE
//         },
//         exchangerName: {
//             type: Sequelize.STRING
//         }
//     },
//     {
//         timestamps: false,
//         freezeTableName: true
//     });

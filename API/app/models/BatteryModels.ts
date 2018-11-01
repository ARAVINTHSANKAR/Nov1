// import * as Sequelize from 'sequelize'

// /**config */
// import { dbConnection } from '../config/dbConnection';


// export interface BatteryModelsRequestPayLoad
//     {
//         batteryModel: string;
//     }

// export interface BatteryModelsTableFields extends Sequelize.Model<BatteryModelsTableFields, BatteryModelsRequestPayLoad>
//     {
//         batteryModelId: number; // primary key
//         batteryModel: string;
//     }

// export const UserTableStructure  = dbConnection.define<BatteryModelsTableFields, BatteryModelsRequestPayLoad>('BatteryModels',
//     {
//         batteryModel: {
//             type: Sequelize.STRING
//         }
//     },
//     {
//         timestamps: false,
//         freezeTableName: true
//     });

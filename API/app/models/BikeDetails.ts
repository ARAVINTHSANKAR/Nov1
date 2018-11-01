// import * as Sequelize from 'sequelize'

// /**config */
// import { dbConnection } from '../config/dbConnection';


// export interface BikeDetailsRequestPayLoad
//     {
//         maker: string;
//         bikeModel: string;
//         registrationNumber: string;
//         bikeColor: string;
//     }

// export interface BikeDetailsTableFields extends Sequelize.Model<BikeDetailsTableFields, BikeDetailsRequestPayLoad> 
//     {
//         bikeDetailsId: number; // primary key
//         maker: string;
//         bikeModel: string;
//         registrationNumber: string;
//         bikeColor: string;
//     }

// export const BikeDetailsTableStructure  = dbConnection.define<BikeDetailsTableFields, BikeDetailsRequestPayLoad>('BikeDetails',
//     {
//         maker: {
//             type: Sequelize.STRING
//         },
//         bikeModel: {
//             type: Sequelize.STRING
//         },
//         registrationNumber: {
//             type: Sequelize.STRING
//         },
//         bikeColor: {
//             type: Sequelize.STRING
//         }
//     },
//     {
//         timestamps: false,
//         freezeTableName: true
//     });

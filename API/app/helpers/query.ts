export const queries = {

    insertAccessor: `SET IDENTITY_INSERT AccessorDetails ON 

                        INSERT INTO AccessorDetails
                        (accessId, name, userRoleId, password, contact, isActive) values 
                        (:accessId, :name, :userRoleId, :password, :contact, :isActive)
                        
                        SET IDENTITY_INSERT AccessorDetails OFF`,

    searchParticularUser: `SELECT * from AccessorDetails WHERE name = :payLoadName`,

    insertBatteryDetails: `SET IDENTITY_INSERT BatteryDetails ON

                            INSERT INTO BatteryDetails
                            (batteryId, batteryBrandId, batteryModelId, bQuantity, batteryPrice, cgst, cgstAmount,
                            sgst, sgstAmount, totalPrice, purchasedFrom, batteryNumber, isWarrentyBattery, warrentyType)
                            values
                            (:batteryId, :batteryBrandId, :batteryModelId, :bQuantity, :batteryPrice, :cgst, :cgstAmount,
                            :sgst, :sgstAmount, :totalPrice, :purchasedFrom, :batteryNumber, 0, 0)
                            
                            SET IDENTITY_INSERT BatteryDetails OFF`,

    insertBuyerDetails: `SET IDENTITY_INSERT BuyerDetails ON
                        
                        INSERT INTO BuyerDetails
                        (buyerId, name, contact, role, purchasedDate, location) values 
                        (:buyerId, :name, :contact, :role, GETDATE(), :location)
                        
                        SET IDENTITY_INSERT BuyerDetails OFF`,

    insertBikeDetails: `SET IDENTITY_INSERT BikeDetails ON
    
                        INSERT INTO BikeDetails
                        (bikeDetailsId, maker, bikeModel, registrationNumber, bikeColor) values
                        (:bikeDetailsId, :maker, :bikeModel, :registrationNumber, :bikeColor)
                        
                        SET IDENTITY_INSERT BikeDetails OFF`,

    insertBatteryBikeBuyerIDs: `INSERT INTO BatteryBikeBuyerIds
                        (batteryBikeBuyerId, batteryId, bikeId, buyerId) values 
                        (:batteryBikeBuyerId, :batteryId, :bikeId, :buyerId)`,

    getSalesDetails: `SELECT 
                bbbids.batteryBikeBuyerId,
                btd.batteryNumber,
                bm.batteryModel,
                bb.batteryBrand,
                bkd.registrationNumber,
                byd.name,
                byd.purchasedDate
            FROM BatteryBikeBuyerIds bbbids
                INNER JOIN BatteryDetails btd ON bbbids.batteryId = btd.batteryId
                INNER JOIN BikeDetails bkd ON bbbids.bikeId = bkd.bikeDetailsId
                INNER JOIN BuyerDetails byd ON bbbids.buyerId = byd.buyerId
                INNER JOIN BatteryModels bm ON btd.batteryModelId = bm.batteryModelId
                INNER JOIN BatteryBrands bb ON btd.batteryBrandId = bb.batteryBrandId`,

    fetchParticularBatteryDetails: `SELECT * 
    FROM
        BatteryBikeBuyerIds 
    INNER JOIN BatteryDetails on
        (BatteryBikeBuyerIds.batteryId = BatteryDetails.batteryId)
    INNER JOIN BikeDetails on
        (BatteryBikeBuyerIds.bikeId= BikeDetails.bikeDetailsId)
    INNER JOIN BuyerDetails on
        (BatteryBikeBuyerIds.buyerId= BuyerDetails.buyerId)
    where 
        batteryBikeBuyerId = :batteryBikeBuyerId`,

    searchParticularBattery: `
    `,

    fetchStockList: `SELECT *
    FROM
        StockDetails`,

    fetchAllUsers: `select * from AccessorDetails`,

    activateUsers: `UPDATE AccessorDetails
        SET isActive = 1
    WHERE accessId in (:activateIds)`,
    
    deactivateUsers: `UPDATE AccessorDetails
        SET isActive = 0
    WHERE accessId in (:deactivateIds)`,

    updateWarrentyType: `UPDATE BatteryDetails
    SET
        isWarrentyBattery = :isReplacable,
        warrentyType = :type
    WHERE
        batteryNumber = :batteryNumber
    AND
        batteryId = :batteryId`,


    checkForTableExists: `SELECT COUNT (warrentyBatteryId)  as totalCount FROM WarrentyDetails`,

    saveWarrentyBattery: `SET IDENTITY_INSERT WarrentyDetails ON
    INSERT INTO WarrentyDetails(
        warrentyBatteryId,
        oldBatteryId,
        exchangeReason,
        warrentyBatteryNumber,
        replacedDate,
        exchangerName)
    VALUES(
        :warrentyBatteryId,
        :oldBatteryId,
        :exchangeReason,
        :warrentyBatteryNumber,
        GETDATE(),
        :exchangerName)

    SET IDENTITY_INSERT WarrentyDetails ON`,

    getWarrentyBatteries: `SELECT 
        b.batteryId,
        w.warrentyBatteryNumber,
        b.batteryNumber as oldBatteryNumber,
        w.replacedDate,
        buy.purchasedDate,
        buy.name,
        b.totalPrice,
        buy.contact
    FROM WarrentyDetails w
    INNER JOIN BatteryDetails b 
    ON
        w.oldBatteryId = b.batteryId
    INNER JOIN BatteryBikeBuyerIds bbb
    ON
        bbb.batteryId = w.warrentyBatteryId
    INNER JOIN BuyerDetails buy
    ON
        buy.buyerId = bbb.buyerId`
}

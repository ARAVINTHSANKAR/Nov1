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
                            sgst, sgstAmount, totalPrice, purchasedFrom, batteryNumber) values
                            (:batteryId, :batteryBrandId, :batteryModelId, :bQuantity, :batteryPrice, :cgst, :cgstAmount,
                            :sgst, :sgstAmount, :totalPrice, :purchasedFrom, :batteryNumber)
                            
                            SET IDENTITY_INSERT BatteryDetails OFF`,

    insertBuyerDetails: `SET IDENTITY_INSERT BuyerDetails ON
                        
                        INSERT INTO BuyerDetails
                        (buyerId, name, contact, role, purchasedDate, location) values 
                        (:buyerId, :name, :contact, :role, :purchasedDate, :location)
                        
                        SET IDENTITY_INSERT BuyerDetails OFF`,

    insertBikeDetails: `SET IDENTITY_INSERT BikeDetails ON
    
                        INSERT INTO BikeDetails
                        (bikeDetailsId, maker, bikeModel, registrationNumber, bikeColor) values
                        (:bikeDetailsId, :maker, :bikeModel, :registrationNumber, :bikeColor)
                        
                        SET IDENTITY_INSERT BikeDetails OFF`
}

to initialize a folder as git repo in github

https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/



  app folder la vache give tsc command

  https://www.dotnetcurry.com/nodejs/1238/connect-sql-server-nodejs-mssql-package


check password 
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
 
 package com.SriMeenakshiBatteries.Dao;

import java.util.List;

import com.SriMeenakshiBatteries.Model.BatteryDetails;
import com.SriMeenakshiBatteries.Model.CustomerDetails;
import com.SriMeenakshiBatteries.Model.Login;
import com.SriMeenakshiBatteries.Model.StockDetails;
import com.SriMeenakshiBatteries.Model.WarrentyBatteries;
import com.SriMeenakshiBatteries.Util.Util;

public class DaoImpl implements Dao {
	
	@Override
	public Login checkLogin(String currentName, String currentPass) {
		Util util = new Util();
		Login particularLoginRow;
		@SuppressWarnings("unused")
		String dbName,dbPass;
		
		util.openCurrentSession();
		particularLoginRow = (Login) util.getCurrentSession().createQuery("from Login where name=  '"+currentName+"'").uniqueResult();
		dbName = particularLoginRow.getName();
		dbPass = particularLoginRow.getLoginPassword().trim();
		
		if ( dbPass.equalsIgnoreCase(currentPass) ) {
			particularLoginRow.setRole("loginSuccess");
			particularLoginRow.setLoginPassword("xxx");
		} else {
			particularLoginRow.setRole("loginFailed");
			particularLoginRow.setLoginPassword("xxx");
		}
		
		util.closeCurrentSession();
		return particularLoginRow;
	}

	@Override
	public Login saveBillingDetails(BatteryDetails batteryDetails, CustomerDetails customerDetails) {
		Util util = new Util();
		String batteryModel = batteryDetails.getModelName();
		String batteryModelSale = batteryModel+ "_sale";
		
		util.openCurrentSessionwithTransaction();
		util.getCurrentSession().save(batteryDetails);
		util.getCurrentSession().save(customerDetails);
		util.getCurrentSession().createQuery("update StockDetails set "+batteryModel+" = "+batteryModel+" - 1 , "+batteryModelSale+" = "+batteryModelSale+" + 1 where StockId=1").executeUpdate();
		util.closeCurrentSessionwithTransaction();
		return null;
	}

	@Override
	public StockDetails getStockDetails() {
		Util util = new Util();
		StockDetails stockdetails; 
		util.openCurrentSession();
		stockdetails = (StockDetails) util.getCurrentSession().createQuery("from StockDetails").uniqueResult();
		util.closeCurrentSession();
		return stockdetails;
	}

	@Override
	public CustomerDetails getBillingData(String batteryNumber) {
		String bN = batteryNumber;
		CustomerDetails customerData;
		int batteryId;
		Util util = new Util();
		util.openCurrentSession();
		BatteryDetails billingData = (BatteryDetails)util.getCurrentSession().createQuery("from BatteryDetails where  batteryNumber='"+bN+"'").uniqueResult();
		batteryId = billingData.getBatteryId();
		customerData = (CustomerDetails) util.getCurrentSession().createQuery("from CustomerDetails where batteryId='"+batteryId+"'").uniqueResult();
		util.closeCurrentSession();
		return customerData;
	}

	@Override
	public CustomerDetails getCustomerData(BatteryDetails batteryDetails) {
		Util util = new Util();
		int cI = 12;
		CustomerDetails customerDetails = (CustomerDetails) util.getCurrentSession().createQuery("from CustomerDetails where customerId='"+cI+"'").uniqueResult();
		return customerDetails;
	}

	@Override
	public List<BatteryDetails> getSalesHistory() {
		Util util = new Util();
		util.openCurrentSession();
		@SuppressWarnings("unchecked")
		List<BatteryDetails> billingData = (List<BatteryDetails>) util.getCurrentSession().createQuery("from BatteryDetails").list();
		util.closeCurrentSession();
		return billingData;
	}

	@Override
	public List<CustomerDetails> getCustomerHistory() {
		Util util = new Util();
		util.openCurrentSession();
		@SuppressWarnings("unchecked")
		List<CustomerDetails> customerData = (List<CustomerDetails>) util.getCurrentSession().createQuery("from CustomerDetails").list();
		util.closeCurrentSession();
		return customerData;
	
	}

	@Override
	public CustomerDetails getSearchedBattery(String batteryNumber) {
		String bN = batteryNumber;
		Util util = new Util();
		util.openCurrentSession();
		BatteryDetails billingData = (BatteryDetails)util.getCurrentSession().createQuery("from BatteryDetails where  batteryNumber='"+bN+"'").uniqueResult();
		int batteryId = billingData.getBatteryId();
		CustomerDetails customerDetails = (CustomerDetails) util.getCurrentSession().createQuery("from CustomerDetails where batteryId='"+batteryId+"'").uniqueResult();
		util.closeCurrentSession();		
		return customerDetails;
	}

	@Override
	public StockDetails addBatteryStock(String batteryType, int count) {
		Util util = new Util();
		int id  = 1;
		int previousStock;
		
		util.openCurrentSession();
		previousStock = (int) util.getCurrentSession().createSQLQuery("select "+batteryType+" from StockDetails where StockId = '"+id+"'").uniqueResult();
		util.closeCurrentSession();
		
		util.openCurrentSessionwithTransaction();
		util.getCurrentSession().createQuery("UPDATE StockDetails SET "+batteryType+"= '"+(previousStock+count)+"' WHERE stockId= '"+id+"'").executeUpdate();
//		util.getCurrentSession().getTransaction().commit();
		util.closeCurrentSessionwithTransaction();
		return null;
	}

	@Override
	public StockDetails updateStock(String batteryType) {
		Util util = new Util();
		int id = 1;
		String saleBatteryType = batteryType+"_Sale";
		int saleCount,remainingCount;
		
		util.openCurrentSession();
		remainingCount = (int) util.getCurrentSession().createSQLQuery("select "+batteryType+" from StockDetails where StockId = '"+id+"'").uniqueResult();                
		saleCount = (int) util.getCurrentSession().createSQLQuery("select "+saleBatteryType+" from StockDetails where StockId = '"+id+"'").uniqueResult();
		util.closeCurrentSession();
		
//		saleCount = saleCount + 0;
//		remainingCount = remainingCount - 0;

		util.openCurrentSessionwithTransaction();
		util.getCurrentSession().createQuery("UPDATE StockDetails SET "+batteryType+"= '"+(remainingCount)+"' WHERE stockId= '"+id+"'").executeUpdate()  ;
		util.getCurrentSession().createQuery("UPDATE StockDetails SET "+saleBatteryType+"= '"+(saleCount)+"' WHERE stockId= '"+id+"'").executeUpdate();
//		util.getCurrentSession().getTransaction().commit();
		util.closeCurrentSessionwithTransaction();
		return null;
	}


	@Override
	public WarrentyBatteries saveNewWarrentyBatteryDetails(String oldDate, String oldBatteryNum,String newBatteryNum) {
		Util util = new Util();
		BatteryDetails batteryDetail = new BatteryDetails();
		String bN = oldBatteryNum;
		WarrentyBatteries wBattery = new WarrentyBatteries();
		
		util.openCurrentSession();
		batteryDetail = (BatteryDetails)util.getCurrentSession().createQuery("from BatteryDetails where  batteryNumber='"+bN+"'").uniqueResult();
		util.closeCurrentSession();
		
		wBattery.setBatteryId(batteryDetail);
		wBattery.setNewBatteryNumber(newBatteryNum);
		wBattery.setOldDate(oldDate);		
		
		util.openCurrentSessionwithTransaction();
		util.getCurrentSession().save(wBattery);
		util.closeCurrentSessionwithTransaction();
		return null;
	}

	@Override
	public List<WarrentyBatteries> getWarrentyBatteryList() {
		Util util = new Util();
		util.openCurrentSession();
		@SuppressWarnings("unchecked")
		List<WarrentyBatteries> warrentyData = (List<WarrentyBatteries>) util.getCurrentSession().createQuery("from WarrentyBatteries").list();
		util.closeCurrentSession();
		return warrentyData;
	}

	@Override
	public int getBatteryCount(String batteryName) {
		System.out.println("DAO");
		Util util = new Util();
		int id = 1;
		int remainingCount;
		util.openCurrentSession();
		remainingCount = (int) util.getCurrentSession().createSQLQuery("select "+batteryName+" from StockDetails where StockId = '"+id+"'").uniqueResult();
		System.out.println("remainingCount" +remainingCount);
		util.closeCurrentSession();
		return remainingCount;
	}
	
	@Override
	public WarrentyBatteries getSearchedWarrentyBattery(String batteryNumber) {
		String bN = batteryNumber;
		Util util = new Util();
		util.openCurrentSession();
		WarrentyBatteries warrentyData = (WarrentyBatteries)util.getCurrentSession().createQuery("from WarrentyBatteries where  newBatteryNumber='"+bN+"'").uniqueResult();
		util.closeCurrentSession();
		return warrentyData;
	}


	@Override
	public String checkWheatherBatteryIsReplaced(int OldBatteryId) {							
		Util util = new Util();
		String newBatteryNum = null;
		util.openCurrentSession();
		try {
		WarrentyBatteries warrentyData = (WarrentyBatteries)util.getCurrentSession().createQuery("from WarrentyBatteries where batteryId='"+OldBatteryId+"'").uniqueResult();
		newBatteryNum = warrentyData.getNewBatteryNumber();				
		System.out.println(newBatteryNum);		
		} catch (Exception ex) {
			System.out.println("Nothing found");
		}		
		if(newBatteryNum != null) {
			util.closeCurrentSession();
			return newBatteryNum;		
		} else {
			util.closeCurrentSession();
			return "No";
		}
	}
	
	@Override
	public String warrentyOrNormalBattery(String batteryNumber) {
		Util util = new Util();
		int temp = 0;
		util.openCurrentSession();
		try {
			BatteryDetails batteryDetail = (BatteryDetails)util.getCurrentSession().createQuery("from BatteryDetails where  batteryNumber='"+batteryNumber+"'").uniqueResult();
			if(batteryDetail != null) {
				temp = 1;
			}
		} catch (Exception ex) {
			WarrentyBatteries warrentyData = (WarrentyBatteries)util.getCurrentSession().createQuery("from WarrentyBatteries where newBatteryNumber='"+batteryNumber+"'").uniqueResult();
			if(warrentyData != null) {
				temp = 0;
			}
		}
		if(temp == 1) {
			return "this is from normal battery";
		} else {
			return "this is a warrenty battery";
		}
		
	}
}





// for foreignKey
UserTableStructure.belongsTo(Company, {foreignKey: 'fk_company'});

// this is snake case
snake_case
PascalCase
camelCase


default launch.json

{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/API\\app\\dao\\dao.ts",
            "outFiles": [
                "${workspaceFolder}/**/*.js"
            ]
        }
    ]
}

method to insert user
            // await sequelize.query(queries.insertAccessor, {
            //     replacements: userDetailsPayLoad,
            //     type: sequelize.QueryTypes.INSERT
            // });

REFER BELOW LINK FOR SIMPLE TRANSACTION
			https://stackoverflow.com/questions/42870374/node-js-7-how-to-use-sequelize-transaction-with-async-await

addUser: 

1. should not allow existing name from db.
2. should encrypt password and store in db
3. can implement jwt

General

1. should optmize code
2. variable names should be relevent
3. intentation
4. error and success msg should be clear
5. joi validation is must
6. have to check all apis by creating a new db without PK
7. comments should be added for each method and some logic also for queries
8. optimize query for nextRow Id
9. refer web app in iff app regarding pdf download
10. IDENTITY_INSERT should not be mentioned in a query if that id is not a primary key
11. if needed v can use async await / promise.all for fetching all details for a particular battery as v have that 
	id of battery bike buyer details
12. script file to start services.msc

query to update multiple particularLoginRow
update drinks
set dName = case drinksId
                  when 1 then 'limer'
                  when 5 then 'rose'
                end
where drinksId in (1, 5);
/*                 const updateQueryForNextIdTable = `update LastRowIndex
                    set lastRowId = case projectxTableName
                                      when BatteryDetails then `+ batteryDetails.batteryId + ` 
                                      when BikeDetails then `+ bikeDetails.bikeDetailsId + `
                                      when BuyerDetails then `+ buyerDetails.buyerId + `
                                    end
                    where nextId in (3, 6, 7);`; */
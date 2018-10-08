/**
 * New script file
 */

const namespace = "org.simpledex";

/**
 *
 * @param {org.simpledex.CreateDEX} param - model instance
 * @transaction
 */
async function CreateDEXFunction(param) {  
    let factory = await getFactory();
  
    // creating dex
    const dexReg = await getParticipantRegistry(namespace + '.DEX');   

    const dex = await factory.newResource(namespace, 'DEX', "1");
    dex.orders = new Array();
    await dexReg.add(dex);         
}

/**
 *
 * @param {org.simpledex.ClearData} param - model instance
 * @transaction
 */
async function ClearDataFunction(param) {  
    console.log('clearing test data');

    // deleting assets
    const dexReg = await getAssetRegistry(namespace + '.DEX'); 
    let dex = await dexReg.getAll();
    await dexReg.removeAll(dex);

    const orderReg = await getAssetRegistry(namespace + '.Order'); 
    let orders = await orderReg.getAll();
    await orderReg.removeAll(orders);
    
    console.log('clearing all data finished');    
}


/**
 *
 * @param {org.simpledex.PlaceOrder} param - model instance
 * @transaction
 */
async function PlaceOrderFunction(param) {  
  let order = param.order;
  let dex = param.dex;  
  
  await PlaceOrderFunction(dex,order);
}

/**
 *
 * @param {org.simpledex.CreateAndPlaceOrder} param - model instance
 * @transaction
 */
async function CreateAndPlaceOrderFunction(param) { 
    let dex = param.dex;
    let factory = await getFactory();
  
    // creating cell phone
    const orderReg = await getAssetRegistry(namespace + '.Order');   

    // getting next id
    let existingOrders = await orderReg.getAll();
  	let numberOfOrders = 0;
  
    await existingOrders.forEach(function (order) {
      numberOfOrders ++;
    });
 	numberOfOrders ++; 	

    const newOrder = await factory.newResource(namespace, 'Order', numberOfOrders.toString());
    newOrder.orderStatus = "INITIATED";
    newOrder.amount = param.amount;
    newOrder.assetType = param.assetType;
    newOrder.buyOrSell = param.buyOrSell;
    await orderReg.add(newOrder);       
	
  	await PlaceOrderFunction(dex, newOrder);
  
}


// Internal functions
async function PlaceOrderFunction (dex, order) {
	
  
}





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
  
}

/**
 *
 * @param {org.simpledex.CreateAndPlaceOrder} param - model instance
 * @transaction
 */
async function CreateAndPlaceOrderFunction(param) {  
}






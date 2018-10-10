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
    dex.orderBook = new Array();
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
    const dexReg = await getParticipantRegistry(namespace + '.DEX'); 
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
    newOrder.price = param.price;
    newOrder.assetType = param.assetType;
    newOrder.buyOrSell = param.buyOrSell;
    await orderReg.add(newOrder);       
	
  	await PlaceOrderFunction(dex, newOrder);
  
}


// Internal functions
// Placing order internally
async function PlaceOrderFunction (dex, order) {
    const dexReg = await getParticipantRegistry(namespace + '.DEX'); 		  
  	dex.orderBook.push(order);
    dexReg.update(dex);	
 //   await MatchingFunction(dex);
}

// matching order function of the decentralized exchange
/**
 *
 * @param {org.simpledex.Match} param - model instance
 * @transaction
 */
async function MatchingFunction (param) {
  	let dex = param.dex;
	console.log('start matching');
    const factory = getFactory(); 
 		
  	for(i=0; i < dex.orderBook.length; i++) {
      	if ((dex.orderBook[i].buyOrSell == true) && (dex.orderBook[i].orderStatus != "CLOSED")) {
	  		let actualBuyOrder = dex.orderBook[i];
		  	for(j=0; j < dex.orderBook.length; j++) {
				if ((dex.orderBook[j].buyOrSell == false) && (dex.orderBook[j].orderStatus != "CLOSED")) {
			  		let actualSellOrder = dex.orderBook[j];
                	// matching asset type 
                  	if (dex.orderBook[i].assetType == dex.orderBook[j].assetType) {       
                        // matching amount
	                  	if (dex.orderBook[i].price == dex.orderBook[j].price) {
                          	console.log('matching');
                         	//	creating matching event
                          	let matchingEvent = factory.newEvent(namespace, 'MatchingEvent');
		                    matchingEvent.dex = dex;
		                    matchingEvent.price = dex.orderBook[j].price;
  							matchingEvent.orders = new Array();
  							matchingEvent.orders.push(dex.orderBook[i]);
  							matchingEvent.orders.push(dex.orderBook[j]);
    						await emit(matchingEvent);                            

                          	const orderReg = await getAssetRegistry(namespace + '.Order'); 	

                            dex.orderBook[i].orderStatus = "CLOSED";
                            orderReg.update(dex.orderBook[i]);	

                            const orderReg2 = await getAssetRegistry(namespace + '.Order'); 	
                            dex.orderBook[j].orderStatus = "CLOSED";
                            orderReg2.update(dex.orderBook[j]);	
                          		                          		
                          	// deleting element from the array
                          	//delete dex.orderBook[i];
                          	//delete dex.orderBook.remove[j];                           		
                        }                      	
                    }                  	
                }      		
            }
        }
    }
  

  	console.log('end matching');
}










import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.simpledex{
   export enum OrderStatus {
      INITIATED,
      OFFERED,
      CLOSED,
   }
   export abstract class AssetAncestor extends Asset {
      assetId: string;
   }
   export abstract class OrderAncestor extends Asset {
      orderId: string;
      price: number;
      assetType: string;
      buyOrSell: boolean;
      orderStatus: OrderStatus;
   }
   export class Order extends OrderAncestor {
   }
   export abstract class DEXAncestor extends Participant {
      dexId: string;
      orderBook: Order[];
   }
   export class DEX extends DEXAncestor {
   }
   export class CreateDEX extends Transaction {
   }
   export class ClearData extends Transaction {
   }
   export class CreateAndPlaceOrder extends Transaction {
      dex: DEX;
      price: number;
      assetType: string;
      buyOrSell: boolean;
   }
   export class PlaceOrder extends Transaction {
      order: Order;
      dex: DEX;
   }
   export class Match extends Transaction {
      dex: DEX;
   }
   export class OrderPlacedEvent extends Event {
      order: Order;
      dex: DEX;
   }
   export class MatchingEvent extends Event {
      orders: Order[];
      dex: DEX;
      price: number;
   }
// }

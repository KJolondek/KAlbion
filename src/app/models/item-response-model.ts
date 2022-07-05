export class ItemResponseModel {
    item_id: string;
    item_description: string;
    city: string;
    quality: string;
    sell_price_min: number;
    sell_price_min_date: string;
    sell_price_max: number;
    sell_price_max_dat: string;
    buy_price_min: number;
    buy_price_min_date: string;
    buy_price_max: number;
    buy_price_max_date: string;
    max_profit: number;
    is_min: boolean = false;
    is_max: boolean = false;

    profit: number = 0;
  }
export default {
  public: {
    
    /**
     GET /v1/pubticker/${symbol}
     
     Path:
     @requires {string} symbol - symbol of candles to query
     */
    ticker: "pubticker/",
    
    /**
     GET /v1/today/${symbol}
     
     Path:
     @requires {string} symbol - symbol of candles to query
     */
    today: "today/",
    
    /**
     GET /v1/candles/${symbol}
     
     Path:
     @requires {string} symbol - symbol of candles to query
     */
    candles: "candles/",
    
    /**
     GET /v1/lendbook/${currency}
     
     Path:
     @requires {string} currency - currency of lendbook to query
     */
    lendbook: "lendbook/",
    
    // orderbook(symbol, options, cb) {
    //
    //   let index = 0;
    //   let uri = `book/${symbol}`;
    //
    //   if(typeof options === 'function') {
    //     cb = options;
    //   } else {
    //     try {
    //       let query_string;
    //       for(let option in options) {
    //         const value = options[option];
    //         if(index++ > 0) {
    //           query_string += `&${option}=${value}`;
    //         } else {
    //           query_string = `/?${option}=${value}`;
    //         }
    //       }
    //
    //       if(index > 0) {
    //         uri += query_string;
    //       }
    //     } catch(err) {
    //       return cb(err);
    //     }
    //   }
    //
    //   return this.make_public_request(uri, cb);
    // }
    
    /**
     GET /v1/trades/${symbol}
     
     Path:
     @requires {string} symbol - symbol of trades to query
     */
    trades: "trades/",
    
    /**
     GET /v1/lends/${currency}
     
     Path:
     @requires {string} currency - currency of lends to query
     */
    lends: "lends/",
    
    /**
     GET /v1/symbols_details
     */
    symbols: "symbols",
    
    /**
     GET /v1/symbols_details
     */
    symbolsDetails: "symbols_details"
  },
  privates: {
    /**
     POST /v1/order/new
     
     Parameters:
     {string} symbol - The name of the symbol (see /symbols).
     {int} amount - Order size: how much to buy or sell.
     {float} price - Price to buy or sell at. May omit if a market order.
     {string} exchange - “bitfinex”
     {string} side - Either “buy” or “sell”.
     {boolean} type - Either “market” / “limit” / “stop” / “trailing-stop” / “fill-or-kill” / “exchange market” / “exchange limit” / “exchange stop” / “exchange trailing-stop” / “exchange fill-or-kill”. (type starting by “exchange ” are exchange orders, others are margin trading orders)
     {boolean} is_hidden - true if the order should be hidden.
     {boolean} is_postonly - true if the order should be post only. Only relevant for limit orders.
     {int} use_all_available - 1 will post an order that will use all of your available balance.
     @requires {boolean} ocoorder - Set an additional STOP OCO order that will be linked with the current order.
     @requires {float} buy_price_oco - If ocoorder is true, this field represent the price of the OCO stop order to place
     @requires {float} sell_price_oco - If ocoorder is true, this field represent the price of the OCO stop order to place
     */
    newOrder: "order/new",
    
    /**
     POST /v1/order/new/multi
     
     Parameters:
     {string} symbol - The name of the symbol (see /symbols).
     {int} amount - Order size: how much to buy or sell.
     {float} price - Price to buy or sell at. May omit if a market order.
     {string} exchange - “bitfinex”
     {string} side - Either “buy” or “sell”.
     {boolean} type - Either “market” / “limit” / “stop” / “trailing-stop” / “fill-or-kill” / “exchange market” / “exchange limit” / “exchange stop” / “exchange trailing-stop” / “exchange fill-or-kill”. (type starting by “exchange ” are exchange orders, others are margin trading orders)
     */
    newOrders: "order/new/multi",
    
    /**
     POST /v1/order/cancel
     
     Parameters:
     @requires {int64} order_id - The order ID given by /order/new
     */
    cancel: "order/cancel",
    
    
    /**
     POST /v1/order/cancel/all
     */
    cancelAll: "order/cancel/all",
    
    /**
     POST /v1/order/cancel/multi
     
     Parameters:
     @requires {array} order_ids - An array of the order IDs given by /order/new or /order/new/multi.
     */
    cancelOrders: "order/cancel/multi",
    
    /**
     POST /v1/order/cancel/replace
     
     Parameters:
     @requires {int64} order_id - The order ID given by /order/new.
     {string} symbol - The name of the symbol (see /symbols).
     {int} amount - Order size: how much to buy or sell.
     {float} price - Price to buy or sell at. May omit if a market order.
     {string} exchange - “bitfinex”
     {string} side - Either “buy” or “sell”.
     {boolean} type - Either “market” / “limit” / “stop” / “trailing-stop” / “fill-or-kill” / “exchange market” / “exchange limit” / “exchange stop” / “exchange trailing-stop” / “exchange fill-or-kill”. (type starting by “exchange ” are exchange orders, others are margin trading orders)
     {string} is_hidden - true if the order should be hidden.
     {boolean} is_postonly - true if the order should be post only. Only relevant for limit orders.
     {boolean} use_remaining - True if the new order should use the remaining amount of the original order.
     */
    orderReplace: "order/cancel/replace",
    
    /**
     POST /v1/order/status
     
     Parameters:
     @requires {int64} order_id - The order ID given by /order/new.
     */
    orderStatus: "order/status",
    
    /**
     POST /v1/orders
     */
    orders: "orders",
    
    /**
     POST /v1/positions
     */
    positions: "positions",
    
    /**
     POST /v1/history/movements
     
     Parameters:
     @requires {string} currency - The currency to look for.
     {string} method - The method of the deposit/withdrawal (can be “bitcoin”, “litecoin”, “darkcoin”, “wire”).
     {datetime} since - Return only the history after this timestamp.
     {datetime} until - Return only the history before this timestamp.
     {int} limit - Limit the number of entries to return.
     */
    movements: "history/movements",
    
    /**
     POST /v1/mytrades
     
     Parameters:
     @requires {string} symbol - The pair traded (BTCUSD, …).
     @requires {datetime} timestamp - Trades made before this timestamp won’t be returned.
     {datetime} until - Trades made after this timestamp won’t be returned.
     {int} limit_trades - Limit the number of trades returned.
     {int} reverse - Return trades in reverse order (the oldest comes first). Default is returning newest trades first.
     */
    trades: "mytrades",
    
    /**
     POST /v1/deposit/new
     
     Parameters:
     {string} currency - currency of funds to transfer
     @required {string} method - Method of deposit (methods accepted: “bitcoin”, “litecoin”, “ethereum”, “tetheruso", "ethereumc", "zcash", "monero", "iota", "bcash").
     @required {string} wallet_name - Wallet to deposit in (accepted: “trading”, “exchange”, “deposit”). Your wallet needs to already exist
     {int} renew - Default is 0. If set to 1, will return a new unused deposit address
     */
    deposit: "deposit/new",
    
    /**
     POST /v1/offer/new
     
     Parameters:
     'amount': decimal (amount to transfer)
     'currency': string, currency of funds to transfer
     rate
     period
     direction
     insurance_option
     */
    new_offer: "offer/new",
    
    /**
     POST /v1/offer/cancel
     
     Parameters:
     'offer_id' : id of offer to cancel
     */
    cancelOffer: "offer/cancel",
    
    /**
     POST /v1/offer/status
     
     Parameters:
     'order_id' : id of order to query
     */
    offerStatus: "offer/status",
    
    /**
     POST /v1/offers
     */
    offers: "offers",
    
    /**
     POST /v1/credits
     */
    credits: "credits",
    
    /**
     POST /v1/balances
     */
    balances: "balances",
    
    /**
     POST /v1/taken_swaps
     */
    takenSwaps: "taken_swaps",
    
    /**
     POST /v1/swap/close
     
     Parameters:
     'swap_id' : id of swap to close
     */
    closeSwap: "swap/close",
    
    /**
     POST /v1/account_infos
     */
    accountInfo: "account_infos",
    
    /**
     POST /v1/margin_infos
     */
    marginInfo: "margin_infos",
    
    /**
     POST /v1/withdraw
     
     Parameters:
     'withdraw_type' :string (can be "bitcoin", "litecoin" or "darkcoin" or "mastercoin")
     'walletselected' :string (the origin of the wallet to withdraw from, can be "trading", "exchange", or "deposit")
     'amount' :decimal (amount to withdraw)
     'address' :address (destination address for withdrawal)
     */
    withdraw: "withdraw",
    
    /**
     POST /v1/transfer
     
     Parameters:
     'amount': decimal (amount to transfer)
     'currency': string, currency of funds to transfer
     'walletfrom': string. Wallet to transfer from
     'walletto': string. Wallet to transfer to
     */
    transfer: "transfer"
  }
};

// OptionsChainDocumentation.js
import React from "react";

const OptionsChainDocumentation = () => {
  return (
    <div>
      <h1>Options Chain</h1>
      <div className="documentation">
        <h2>Options Chains Documentation</h2>
        <p>
          This page provides detailed information on the response attributes
          returned by the Options Chain API...
        </p>

        <h3>Response Overview</h3>
        <p>
          The response contains several attributes related to the options
          contracts, including their pricing, trading volumes, and detailed
          contract information.
        </p>

        <h4>Response Attributes</h4>
        <table>
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                attribute: "next_url",
                type: "string",
                description:
                  "If present, this value can be used to fetch the next page of data.",
              },
              {
                attribute: "request_id*",
                type: "string",
                description: "Unique identifier for the request.",
              },
              {
                attribute: "results",
                type: "array",
                description:
                  "The array of option contracts returned in the response.",
              },
              {
                attribute: "break_even_price*",
                type: "number",
                description:
                  "The price of the underlying asset for the contract to break even.",
              },
              {
                attribute: "day",
                type: "object",
                description: "The most recent daily bar for this contract.",
              },
              {
                attribute: "change*",
                type: "number",
                description:
                  "The value of the price change for the contract from the previous trading day.",
              },
              {
                attribute: "change_percent*",
                type: "number",
                description:
                  "The percent of the price change for the contract from the previous trading day.",
              },
              {
                attribute: "close*",
                type: "number",
                description: "The closing price for the contract of the day.",
              },
              {
                attribute: "high*",
                type: "number",
                description: "The highest price for the contract of the day.",
              },
              {
                attribute: "last_updated*",
                type: "integer",
                description:
                  "The nanosecond timestamp of when this information was updated.",
              },
              {
                attribute: "low*",
                type: "number",
                description: "The lowest price for the contract of the day.",
              },
              {
                attribute: "open*",
                type: "number",
                description: "The open price for the contract of the day.",
              },
              {
                attribute: "previous_close*",
                type: "number",
                description:
                  "The closing price for the contract of the previous trading day.",
              },
              {
                attribute: "volume*",
                type: "number",
                description: "The trading volume for the contract of the day.",
              },
              {
                attribute: "vwap*",
                type: "number",
                description:
                  "The trading volume weighted average price for the contract of the day.",
              },
              {
                attribute: "details",
                type: "object",
                description: "The details for this contract.",
              },
              {
                attribute: "contract_type*",
                type: "enum [put, call, other]",
                description:
                  'The type of contract. Can be "put", "call", or in some rare cases, "other".',
              },
              {
                attribute: "exercise_style*",
                type: "enum [american, european, bermudan]",
                description: "The exercise style of this contract.",
              },
              {
                attribute: "expiration_date*",
                type: "string",
                description:
                  "The contract's expiration date in YYYY-MM-DD format.",
              },
              {
                attribute: "shares_per_contract*",
                type: "number",
                description:
                  "The number of shares per contract for this contract.",
              },
              {
                attribute: "strike_price*",
                type: "number",
                description: "The strike price of the option contract.",
              },
              {
                attribute: "ticker*",
                type: "string",
                description: "The ticker symbol for the asset.",
              },
              {
                attribute: "fmv",
                type: "number",
                description:
                  "Fair market value is only available on Business plans.",
              },
              {
                attribute: "greeks",
                type: "object",
                description: "The greeks for this contract.",
              },
              {
                attribute: "delta*",
                type: "number",
                description:
                  "The change in the option's price per $0.01 increment in the price of the underlying asset.",
              },
              {
                attribute: "gamma*",
                type: "number",
                description:
                  "The change in delta per $0.01 change in the price of the underlying asset.",
              },
              {
                attribute: "theta*",
                type: "number",
                description: "The change in the option's price per day.",
              },
              {
                attribute: "vega*",
                type: "number",
                description:
                  "The change in the option's price per 1% increment in volatility.",
              },
              {
                attribute: "implied_volatility",
                type: "number",
                description:
                  "The market's forecast for the volatility of the underlying asset.",
              },
              {
                attribute: "last_quote",
                type: "object",
                description: "The most recent quote for this contract.",
              },
              {
                attribute: "ask*",
                type: "number",
                description: "The ask price.",
              },
              {
                attribute: "ask_exchange",
                type: "number",
                description: "The ask side exchange ID.",
              },
              {
                attribute: "ask_size*",
                type: "number",
                description: "The ask size.",
              },
              {
                attribute: "bid*",
                type: "number",
                description: "The bid price.",
              },
              {
                attribute: "bid_exchange",
                type: "number",
                description: "The bid side exchange ID.",
              },
              {
                attribute: "bid_size*",
                type: "number",
                description: "The bid size.",
              },
              {
                attribute: "midpoint*",
                type: "number",
                description: "The average of the bid and ask price.",
              },
              {
                attribute: "timeframe*",
                type: "enum [DELAYED, REAL-TIME]",
                description: "The time relevance of the data.",
              },
              {
                attribute: "last_trade",
                type: "object",
                description: "The most recent trade for this contract.",
              },
              {
                attribute: "conditions",
                type: "array [integer]",
                description: "A list of condition codes.",
              },
              {
                attribute: "exchange*",
                type: "integer",
                description: "The exchange ID.",
              },
              {
                attribute: "price*",
                type: "number",
                description: "The price of the trade.",
              },
              {
                attribute: "sip_timestamp*",
                type: "integer",
                description:
                  "The timestamp of when the SIP received this trade from the exchange.",
              },
              {
                attribute: "size*",
                type: "integer",
                description: "The size of a trade.",
              },
              {
                attribute: "open_interest*",
                type: "number",
                description:
                  "The quantity of this contract held at the end of the last trading day.",
              },
              {
                attribute: "underlying_asset",
                type: "object",
                description: "The underlying asset for the options contract.",
              },
              {
                attribute: "underlying_asset_symbol*",
                type: "string",
                description: "The ticker symbol of the underlying asset.",
              },
              {
                attribute: "underlying_security_id*",
                type: "integer",
                description:
                  "The unique identifier for the underlying security.",
              },
              {
                attribute: "quote_time*",
                type: "integer",
                description: "The time when the last quote was received.",
              },
              {
                attribute: "trade_time*",
                type: "integer",
                description: "The time when the last trade was executed.",
              },
            ].map(({ attribute, type, description }) => (
              <tr key={attribute}>
                <td>{attribute}</td>
                <td>{type}</td>
                <td>{description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>* - indicates required attributes.</p>
      </div>
    </div>
  );
};

export default OptionsChainDocumentation;

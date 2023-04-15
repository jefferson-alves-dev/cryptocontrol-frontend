export default function get(
  contributionSymbolIdInCoinMarketCap: number,
  basePricesFiatCoins: string
) {
  try {
    const { data } = JSON.parse(basePricesFiatCoins);
    return data[contributionSymbolIdInCoinMarketCap].price;
  } catch (error) {
    return '!';
  }
}

import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";
import { theme } from "../theme";

const PriceBox = styled.div`
  background-color: ${theme.textColor};
  color: black;
  max-width: 480px;
  height: 50px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`;

const ChangeRate = styled.text<{ isMinus: boolean }>`
  color: ${(props) => (props.isMinus ? theme.minusColor : theme.plusColor)};
  font-weight: bold;
  padding-left: 5px;
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          <PriceBox>
            Price :
            <ChangeRate
              isMinus={data?.quotes.USD.price.toString().slice(0, 1) === "-"}
            >
              $ {data?.quotes.USD.price}
            </ChangeRate>
          </PriceBox>
          <PriceBox>
            Max Change rate in last 24h :
            <ChangeRate
              isMinus={
                data?.quotes.USD.percent_change_24h.toString().slice(0, 1) ===
                "-"
              }
            >
              {data?.quotes.USD.percent_change_24h} %
            </ChangeRate>
          </PriceBox>
          <PriceBox>
            Change rate(last 30 Min) :
            <ChangeRate
              isMinus={
                data?.quotes.USD.percent_change_30m.toString().slice(0, 1) ===
                "-"
              }
            >
              {data?.quotes.USD.percent_change_30m} %
            </ChangeRate>
          </PriceBox>
          <PriceBox>
            Change rate (last 1 hours) :
            <ChangeRate
              isMinus={
                data?.quotes.USD.percent_change_1h.toString().slice(0, 1) ===
                "-"
              }
            >
              {data?.quotes.USD.percent_change_1h} %
            </ChangeRate>
          </PriceBox>
          <PriceBox>
            Change rate (last 12 hours) :
            <ChangeRate
              isMinus={
                data?.quotes.USD.percent_change_12h.toString().slice(0, 1) ===
                "-"
              }
            >
              {data?.quotes.USD.percent_change_12h} %
            </ChangeRate>
          </PriceBox>
          <PriceBox>
            Change rate (last 24 hours) :
            <ChangeRate
              isMinus={
                data?.quotes.USD.percent_change_24h.toString().slice(0, 1) ===
                "-"
              }
            >
              {data?.quotes.USD.percent_change_24h} %
            </ChangeRate>
          </PriceBox>
        </div>
      )}
    </div>
  );
}

export default Price;

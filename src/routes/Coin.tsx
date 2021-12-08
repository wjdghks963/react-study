import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { theme } from "../theme";

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-self: center;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 40px;
  color: ${theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

function Coin() {
  const [loading, setLoding] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;

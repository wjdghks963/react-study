import styled from "styled-components";
import { theme } from "../theme";

const Title = styled.h1`
  color: ${theme.accentColor};
`;

function Coins() {
  return <Title>코인</Title>;
}

export default Coins;

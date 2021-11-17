import styled, { keyframes, Keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: red;
  height: 200px;
  width: 200px;
`;

function App() {
  return (
    <Wrapper>
      <Box />
    </Wrapper>
  );
}

export default App;

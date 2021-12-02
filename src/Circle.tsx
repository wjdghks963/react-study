import { useState } from "react";
import styled from "styled-components";

// Containrt가 가져야 하는 interface bgColor={bgColor}일때 왼쪽 것
interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

// TS에게 Container가 interface ContainerProps에 있는 props들을 받을 거라 말함
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

// ts에서 변수 타입 설정, obect shape를 ts에게 설명
interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

// borderColor가 undefined면 bgColor로 대체한다.
function Circle({ bgColor, borderColor }: CircleProps) {
  const [counter, setCounter] = useState(1);
  return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor} />;
}

export default Circle;

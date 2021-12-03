ThemProvider : 이 컴포넌트에 쌓인 컴포넌트는 props를 통해 theme에 접근이 가능함

다크모드 라이트모드를 구현하기 위해선 theme의 object들이 같은 property 이름을 가지고 있어야한다.

---

<h2>TS</h2> : TS는 JS로 만들어진 라이브러리에 불만을 표출하기 때문에 TS에게 모든 정보를 알려줘야 한다. 오류가 난 부분에 필요한 커맨드가 적혀 있을 경우 그것을 npm을 이용해 install한다.

이것은 @types, 즉 Type definition은 해당 라이브러리의 소스코드를 보고 TS에게 해 줄 설명서를 만들어 준다.

이 설명서는 원하는 사람들이 공헌해 만들기 때문에 있을 수도 없을 수도 있다.

JSX는 TSX로 JS는 TS로 파일 이름을 바꾼다.

---

<h4>interface란</h4>
ts에서 변수 타입 설정, obect shape를 ts에게 설명
그저 object가 어떤 모양인지 알려주는 기능

interface CircleProps {
bgColor: string;
}

<h5>TS에게 Container가 bgColor를 받을 거라 말함</h5>

```javascript
interface ContainerProps {
  bgColor: string;
}

const Container =
  styled.div <
  ContainerProps >
  `
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  `;

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}
```

```javascript
interface PlayerShape {
  name: string;
  age: string;
}

const sayHello = (playerObj: PlayerShape) =>
  `Hello ${playerObj.name} you are ${playerObj.age} years old`;

sayHello({ name: "jung", age: "20" }); // ok
sayHello({ name: "jung", age: 20 }); // age에서 오류
```

---

<h4>State</h4>

```javascript
const [counter, setCounter] = useState(1);
setCounter(2); // ok
setCounter("blabla"); // useState에서 초기값을 number로 줬기때문에 string이 들어오면 불만 표출
```

일반적으로 쓰이지 않지만 상태가 undefined또는 null이 될 수도 있거나 객체 또는 배열일 때는 지정해주는 것이 좋다.

ex) const [val,setVal] = useState<Value|null>(null);

```
const [counter, setCounter] = useState<number|string>(1);
setCounter(2); // ok
setCounter("blabla"); // ok
setCounter(true); // 불만!
```

---

<h4>Form</h4>

TS에서 event.target을 currentTarget으로 한다.
event: React.FormEvent<HTMLInputElement>와 같이 event 등 타입 설정은 다양하고 양이 방대하기 때문에 모르는 것들은 구글링을 해야한다.

```javascript
const [value, setValue] = useState("");
const onChange = (event: React.FormEvent<HTMLInputElement>) => {
  const {
    currentTarget: { value },
  } = event;
  setValue(value);
};
```

---

<h4>Theme</h4>

타입선언과 테마를 작성해 공통적으로 사용되는 스타일을 테마로 묶어서 코드일관성을 지킬 수 있도록 한다.

styled.d.ts: 타입선언파일, 테마작성

---

<h4>createGlobalStyle</h4>

styled-components의 createGlobalStyle를 사용해 전체적으로 적용할 style을 설정한다.

App파일 안에 넣어준다.

---

<h4>()()</h4>

앞에 있는 ()안에 함수를 넣어주면 그 함수는 뒤 ()에 의해 즉시 실행된다.

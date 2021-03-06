ThemProvider : 이 컴포넌트에 쌓인 컴포넌트는 props를 통해 theme에 접근이 가능함

다크모드 라이트모드를 구현하기 위해선 theme의 object들이 같은 property 이름을 가지고 있어야한다.

---

# <h2>TS</h2>

TS는 JS로 만들어진 라이브러리에 불만을 표출하기 때문에 TS에게 모든 정보를 알려줘야 한다. 오류가 난 부분에 필요한 커맨드가 적혀 있을 경우 그것을 npm을 이용해 install한다.

**이것은 @types, 즉 Type definition은 해당 라이브러리의 소스코드를 보고 TS에게 해 줄 설명서를 만들어 준다.**

이 설명서는 원하는 사람들이 공헌해 만들기 때문에 있을 수도 없을 수도 있다.

JSX는 TSX로 JS는 TS로 파일 이름을 바꾼다.

CRA에 typescript를 같이 설치 
```
npx create-react-app my-app --template typescript
```

---

<h4>interface란</h4>
ts에서 변수 타입 설정, obect shape를 ts에게 설명

**그저 object가 어떤 모양인지 알려주는 기능**

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

<h4>Form</h4>

TS에서 event.target을 currentTarget으로 한다.
event: React.FormEvent<HTMLInputElement>와 같이 event 등 _타입 설정은 다양하고 양이 방대하기 때문에 모르는 것들은 구글링을 해야한다._

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

<h4>API의 Interface 설정 </h4>

**API에서 json을 받고 난 후 state를 사용할때 빈 object라고 판단한 TS가 불만은 표출하기 때문에 interface로 설정을 해줘야한다.**

그런데 json안에는 엄청난 정보가 있기 때문에 전부 다 타이핑하기엔 힘들다.(필요한것만 뽑더라도...)
따라서 console.log로 json을 표시하고 브라우저에서 Store object as global variable을 클릭하면 임의의 변수(temp1)로 브라우저에 저장이 된다.

여기서 object의 key()를 사용해 key를 찾고 value()와 map(v => tpye of v).join()을 사용해 value의 type들을 string으로 얻어낸다.

---

---

---

## <h2>React & Hooks</h2>

<h4>State</h4>

```javascript
const [counter, setCounter] = useState(1);
setCounter(2); // ok
setCounter("blabla"); // useState에서 초기값을 number로 줬기때문에 string이 들어오면 불만 표출
```

_일반적으로 쓰이지 않지만 상태가 undefined또는 null이 될 수도 있거나 객체 또는 배열일 때는 지정해주는 것이 좋다._

ex) const [val,setVal] = useState<Value|null>(null);

```
const [counter, setCounter] = useState<number|string>(1);
setCounter(2); // ok
setCounter("blabla"); // ok
setCounter(true); // 불만!
```

---

<h4>Link, useLocation</h4>

1.

```javascript
<Link to={url}>
```

1번과 같은 코드를 통해 useParams를 사용해 해당 링크에 대한 params를 받아와 정보처리

2.

```javascript
<Link to={{
pathname: `/${coin.id}`,
state: { name: coin.name },
}}>
```

useLocation를 이용해 정보를 이용할 수 있다(location객체 사용가능).
대표적으로 pathname과 search 객체가 있다.

2번의 방법은 위와 다르게 API를 계속 받을 필요가 없어지고 state를 전달하는 것이기 때문에 효율적이다.

하지만 클릭 의외의 방법으로 직접적으로 url을 입력해서 접속한다면 state가 생성되지 않기 때문에 에러가 발생한다.

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

---

<h4>useRouteMatch</h4>

useRouteMatch("url")은 유저가 해당 url에 있다면 Object를 받으며 path property와 현재 페이지의 url이 일치하지 않을 경우 *null*을 반환한다.

Object는 path, strict, sensitive, exact같은 값을 가진 객체다.

---

<h4>react query</h4>

스스로 실핼하고 있었던 로직들을 축약시켜줌
cache에 data를 저장하고 그 cache data를 사용하여 API를 계속 불러오지 않게 해줌

useQuery("고유 식별자", fetcher함수, object)

고유 식별자는 query를 unique하게 식별해주는 key이다.
이것은 개발자가 설정하는 것이며 "" 즉, string일 필욘 없다.
**React query는 query를 array로 보고 있기때문에 밑과 같이 설정이 가능하다.**
3번째 인자 object는 선택적이다.

```javascript
const { isLoading: infoLoading, data: infoData } =
  useQuery < InfoData > (["info", coinId], () => fetchCoinInfo(coinId));
```

같은 property를 key로 이용하는 hook을 두개 사용할 경우 key가 중복되기 때문에 설정을 다르게 해줘야한다.
따라서 query를 array로 보는 React query의 성질을 사용해 array안에서 key를 unique하게 설정할 수 있다.

```javascript
const { isLoading, data } = useQuery("allCoins", fetchCoins);
```

이러할때 isLoading,data는 함수의 실행이 끝나면 값을 리턴한다.
이때 실행이란 isLoading은 로딩이 끝난다면 일반적으로 사용했던 useEffect안의
const [loading,isLoading] = useState(true))와 같은 기능을 한다.
data는 내용물 즉 이 프로젝트에서의 json을 표현한다.

React Query Devtools를 사용하여 query에 저장된 cache를 볼 수 있다.

---

<h2>RECOIL</h2>

REACT를 위한 state management 라이브러리

원래 global state 관리를 위해선 APP에서부터 내려가는 부모가 필요한 계층 구조였지만 state management를 통해 관리 한다면 박스에서 접근해서 사용 가능하게 할 수 있다.

## Atom은 상태(state)의 일부를 나타낸다. Atoms는 어떤 component에서나 읽고 쓸 수 있으며 atom의 값을 읽는 component들은 암묵적으로 atom을 구독한다. 따라서 atom에 어떤 변화가 있으면 그 atom을 구독하는 모든 component들이 rerendering된다.

useRecoilValue Atom value를 사용하는 함수
useSetRecoilState Atom value를 useState와 같이 setting하는 함수

---

---

<h2>Library</h2>

<h4>APEXCHARTS</h4>

커스텀이 가능한 차트를 만들 수 있으며 png등 다양한 형태로 저장도 가능하다.

```
npm install --save react-apexcharts apexcharts
```

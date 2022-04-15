import React, { useEffect, useState } from "react";

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update - count: ${count}`);
  });
  return <div>{count}</div>;
});
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`CounterB Update - count: ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  // return 이 true 일때 이전 프롭스와 현재프롭스가 같다 -> 리렌더링을 일으키지 않는다
  // return 이 false 일때 이전 프롭스와 현재프롭스가 다르다 -> 리렌더링을 일으킨다
  return prevProps.obj.count === nextProps.obj.count
  // if (prevProps.obj.count === nextProps.obj.count) { // 위 리턴과같은뜻
  //   return true;
  // }
  // return false;

};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B Button
        </button>
      </div>
    </div>
  );
};

// const Textview = React.memo(({text})=>{
//   // React.memo는 컴포넌트들이 서로 쓸데없이 렌더되는걸 맊기위해 사용
//   useEffect(()=>{
//     console.log(`Update :: text : ${text}`);
//   })
//   return <div>{text}</div>
// })

// const Countview = React.memo(({count})=>{
//   useEffect(()=>{
//     console.log(`Update :: count : ${count}`);
//   })
//   return <div>{count}</div>
// })

// const OptimizeTest = () => {
//   const [count, setCount] = useState(1);
//   const [text, setText] = useState("");

//   return (
//     <div style={{ padding: 50 }}>
//       <div>
//         <h2>count</h2>
//         <Countview count={count}/>
//         <button onClick={() => setCount(count + 1)}>+</button>
//       </div>
//       <h2>text</h2>
//       <Textview text={text}/>
//       <input value={text} onChange={(e)=>setText(e.target.value)} />
//     </div>
//   );
// };

export default OptimizeTest;

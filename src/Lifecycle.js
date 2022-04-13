import React, {useEffect, useState} from "react";

const UnmountTest = ()=>{

  useEffect (()=>{
    console.log("Mount!");

    return ()=>{
      // Unmount시점(false)에 실행되게 됨(리턴으로하면됨)
      console.log("Unmount!");
    }
  },[])

  return <div>Unmount Testing Component</div>
}

const Lifecycle = ()=>{
  const [isVisble, setIsVisible] = useState(false);
  const toggle = ()=>{
    setIsVisible(!isVisble)
  }

  return (
    <div style={{padding:20}}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisble && <UnmountTest />} {/* <-단락회로평가 isvisible값과 UnmountTest값이 트루가되면 값이 렌더링됨 */}
    </div>
  )
}

export default Lifecycle;


// useEffect(()=>{
//   console.log("Mount!");
// },[]); // []빈배열을 추가하면 처음렌더링될때만 사용됨

// useEffect(()=>{
//   console.log("Update!");
// });

// useEffect(()=>{
//   console.log(`count is update : ${count}`);
//   if(count > 5){
//     alert("count가 5를 넘었습니다. 따라서 1로 초기화합니다");
//     setCount(1);
//   }
// },[count])

// useEffect(()=>{
//   console.log(`text is update : ${text}`);
// },[text])

// return <div style={{padding:20}}>
//   <div>
//     {count}
//     <button onClick={()=>setCount(count+1)}>+</button>
//   </div>
//   <div>
//     <input value={text} onChange={(e)=>setText(e.target.value)} />
//   </div>
// </div>
// }
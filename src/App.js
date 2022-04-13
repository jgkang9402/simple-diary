import { useState, useRef, useEffect } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList.js";
import "./App.css";

// https://jsonplaceholder.typicode.com/comments

const App = () => {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    // console.log((res));
    const initData = res.slice(0,20).map((it)=>{
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random()*5)+1, // 1~5까지의 랜덤숫자
        created_date : new Date().getTime(), //현재시간 불러오고 밀리세컨즈로
        id : dataId.current++ // dataId.current에 +1
      }
    }); // 20개데이터만 저장
    // console.log(initData);

    setData(initData);
  };

  useEffect(()=>{
    getData();
  },[])

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]); // 원래데이터(...data)에 새로운아이템(newIteam)추가
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    const newDiarylist = data.filter((it) => it.id !== targetId);
    console.log(newDiarylist);
    setData(newDiarylist);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map(
        (it) => (it.id === targetId ? { ...it, content: newContent } : it)
        // true일떄 원본데이터 ...it를 불러온후 contenet를 newContent로 업데이트, false일땐 it을 반환
      )
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};

export default App;

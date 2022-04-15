import { useState, useRef, useEffect } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList.js";
import "./App.css";
import { useMemo } from "react";

// https://jsonplaceholder.typicode.com/comments

const App = () => {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    // console.log((res));
    const initData = res.slice(0, 20).map((it) => {
      // 20개데이터만 저장
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, // 1~5까지의 랜덤숫자
        created_date: new Date().getTime(), //현재시간 불러오고 밀리세컨즈로
        id: dataId.current++, // dataId.current에 +1
      };
    });
    // console.log(initData);

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

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
    const newDiarylist = data.filter((it) => it.id !== targetId);
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

  const getDiaryAnalysis = useMemo(() => {

    const goodCount = data.filter((it) => it.emotion >= 3).length; // 감정점수3이상인데이터만 담아서 배열로새로만든뒤 길이를잰다
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  },[data.length]); // useMemo함수의 두번째 값에들어온 [data.length]는 그값이 변할때만 함수가 실행되게함(연산최적화)

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};

export default App;

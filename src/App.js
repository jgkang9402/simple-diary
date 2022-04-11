import { useState, useRef } from "react"
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList.js';
import './App.css';

const App = () => {

  const [data, setData] = useState([]);
  const dataId = useRef(0)

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current
    }
    dataId.current += 1;
    setData([newItem, ...data]); // 원래데이터(...data)에 새로운아이템(newIteam)추가
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList diaryList={data} />
    </div>
  );
};

export default App;

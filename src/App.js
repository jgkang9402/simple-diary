import React, { useState, useEffect } from "react"
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList.js';
import './App.css';

const dummyList = [
  {
    id:1,
    authur:"강정구",
    content:"하이 1",
    emotion:5,
    created_date: new Date().getTime(),
  },
  {
    id:2,
    authur:"홍길동",
    content:"하이 2",
    emotion:2,
    created_date: new Date().getTime(),
  },
  {
    id:3,
    authur:"아무개",
    content:"하이 3",
    emotion:3,
    created_date: new Date().getTime(),
  },
];

const App = () => {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
};

export default App;

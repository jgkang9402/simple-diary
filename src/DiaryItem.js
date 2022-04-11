const DiaryItem = ({
  onRemove,
  authur,
  content,
  created_date,
  emotion,
  id,
}) => {
  const handleRemove = () => {
    if (window.confirm(`${id}번쨰 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {authur} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">{content}</div>
      <button onClick={handleRemove}>삭제하기</button>
      <button>수정하기</button>
    </div>
  );
};

export default DiaryItem;

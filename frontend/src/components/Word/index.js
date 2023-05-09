const Word = (props) => {
  const { value: lettersList } = props;
  return (
    <div className={`word word-${props.status} ${props.caret}`}>
      {lettersList.map((letter) => {
        return (
          <div className={`letter ${letter.status} ${letter.caret}`} key={letter.key}>
            {letter.value}
          </div>
        );
      })}
    </div>
  );
};
export default Word;
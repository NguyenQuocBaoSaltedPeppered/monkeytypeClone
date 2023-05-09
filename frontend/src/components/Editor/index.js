import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import hplipsum from "hplipsum";
import { useState, useEffect,useContext } from "react";
import "./Editor.css";
import Word from "../Word";
import Counter from "../Counter";
import Result from "../Result";
import AuthenticationContext from "../../Context";
import {
  noneStatus,
  activeStatus,
  correctStatus,
  incorrectStatus,
  extra_errorStatus,
  caretActived,
  blurred,
  hidden,
  lengthTextDefault,
  lengthTextWordsMode,
  timerTimeMode,
  timerWordsMode,
  isStarted,
  isTimeMode,
  isWordsMode,
  isStopped,
} from "../../config/constants";

const Editor = (props) => {
  const {gameMode, setIsPageAccount} = useContext(AuthenticationContext)
  useEffect(() => {
    setIsPageAccount(false)
  }, [])

  const [timerStatus, setTimerStatus] = useState("");
  const [timer, setTimer] = useState(timerTimeMode);
  const [wordsList, setWordsList] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [history, setHistory] = useState([]);
  const [focusStatus, setFocusStatus] = useState("");
  const [warningStatus, setWarningStatus] = useState(hidden);
  const [gameStatus, setGameStatus] = useState("");
  const [resultStatus, setResultStatus] = useState(hidden);

  useEffect(() => {
    setupText(lengthTextDefault);
  }, [gameMode]);

  useEffect(() => {
    const ele = document.getElementById("words-input");
    if (gameStatus === noneStatus) return ele.focus();
  }, [gameStatus]);

  const wordsInput = document.querySelector("#words-input");
  if (wordsInput) {
    wordsInput.addEventListener("blur", (event) => {
      setFocusStatus(blurred);
      setWarningStatus(noneStatus);
    });
    wordsInput.addEventListener("focus", (event) => {
      if (focusStatus === blurred) setFocusStatus("");
      setWarningStatus(hidden);
    });
  }

  function setupText(lengthText) {
    const text = hplipsum(lengthText); //hplipsum(length) return a paragraph have minimum words = length
    let tempList = text.split(" ");
    setTimerStatus(noneStatus);

    if (gameMode === isTimeMode) {
      tempList = tempList.slice(0, lengthTextDefault);
      setTimer(timerTimeMode);
    } else {
      tempList = tempList.slice(0, lengthTextWordsMode);
      setTimer(timerWordsMode);
    }
    setCurrentInput("");
    setHistory([]);
    setCurrentWord(0);
    setWordsList(
      tempList.map((word, wordIndex) => ({
        mainValue: word,
        index: wordIndex,
        key: word + wordIndex,
        caret: wordIndex === 0 ? caretActived : "",
        status: wordIndex === 0 ? activeStatus : noneStatus,
        value: word.split("").map((letter, letterIndex) => ({
          key: wordIndex.toString() + letterIndex,
          index: letterIndex,
          status: noneStatus,
          value: letter,
          caret: "",
        })),
      }))
    );
  }

  function onInputChangeHandler(event) {
    const tempInput = event.target.value;
    const inputLength = tempInput.length;
    if (inputLength > 0) {
      const newWordsList = wordsList.map((word) => {
        return {
          ...word,
          caret: "",
        };
      });
      setWordsList(newWordsList);
    }
    setCurrentInput(tempInput);
    if (tempInput === "") {
      const newWordsList = wordsList.map((word) => {
        if (word.status !== activeStatus) return word;

        return {
          ...word,
          caret: caretActived,
          value: word.mainValue.split("").map((letter, letterIndex) => ({
            key: word.index.toString() + letterIndex,
            index: letterIndex,
            status: noneStatus,
            value: letter,
          })),
        };
      });
      setWordsList(newWordsList);
    }
  }

  function onInputKeyDownHandler(event) {
    const inputLength = currentInput.length;
    const historyLength = history.length;
    if (
      historyLength !== 0 &&
      inputLength === 0 &&
      event.keyCode === 8 // keyCode of eventKeyDown BackSpace button
    ) {
      event.preventDefault();
      const newHistory = [...history];
      const newInput = newHistory.pop();
      const newWordsList = wordsList.map((word, index) => {
        if (index !== currentWord - 1 && index !== currentWord) return word;
        if (index !== currentWord) {
          return {
            ...word,
            status: activeStatus,
            value: word.value.map((letter) => {
              return {
                ...letter,
                caret: letter.index === newInput.length - 1 ? caretActived : "",
              };
            }),
          };
        }
        return {
          ...word,
          status: noneStatus,
          caret: "",
        };
      });
      setCurrentWord(currentWord - 1);
      setWordsList(newWordsList);
      setCurrentInput(newInput);
      setHistory(newHistory);
      return;
    }
    if (
      inputLength > 0 &&
      event.keyCode === 8 // keyCode of eventKeyDown BackSpace button
    ) {
      const newWordsList = wordsList.map((word) => {
        if (word.status !== activeStatus) return word;
        if (inputLength <= word.mainValue.length)
          return {
            ...word,
            value: word.value.map((letter, letterIndex) => {
              if (
                letterIndex !== inputLength - 1 &&
                letterIndex !== inputLength - 2
              )
                return letter;
              if (letterIndex !== inputLength - 2)
                return {
                  ...letter,
                  status: noneStatus,
                  caret: "",
                };
              return {
                ...letter,
                caret: caretActived,
              };
            }),
          };
        const newWord = {
          ...word,
          value: word.value.map((letter, letterIndex) => {
            return {
              ...letter,
              caret: letterIndex === inputLength - 2 ? caretActived : "",
            };
          }),
        };
        newWord.value.pop();
        return newWord;
      });
      setWordsList(newWordsList);
      return;
    }
    if (
      event.keyCode === 32 || // keyCode of eventKeyDown Space button
      event.keyCode === 13 // keyCode of event Enter button
    ) {
      event.preventDefault();
      if (inputLength !== 0) {
        const newWordsList = wordsList.map((word, index) => {
          if (index !== currentWord && index !== currentWord + 1) return word;
          if (index !== currentWord + 1)
            return {
              ...word,
              status:
                word.mainValue?.toLowerCase() === currentInput.toLowerCase()
                  ? correctStatus
                  : incorrectStatus,
              value: word.value.map((letter) => {
                return {
                  ...letter,
                  caret: "",
                };
              }),
            };
          return {
            ...word,
            status: activeStatus,
            caret: caretActived,
          };
        });
        setCurrentWord(currentWord + 1);
        setWordsList(newWordsList);
        const newHistory = [...history];
        newHistory.push(currentInput);
        setCurrentInput("");
        setHistory(newHistory);
      }
      return;
    }
  }

  //typing a letter
  function onInputKeyPressHandler(event) {
    const inputLength = currentInput.length;
    if (inputLength === 0 && history.length === 0) {
      setTimerStatus(isStarted);
    }
    
    const newWordsList = wordsList.map((word) => {
      if (word.status !== activeStatus) return word;
      if (inputLength < word.value.length)
        return {
          ...word,
          value: word.value.map((letter) => {
            if (letter.index !== inputLength)
              return {
                ...letter,
                caret: "",
              };
            return {
              ...letter,
              status:
                event.key.toLowerCase() === letter.value.toLowerCase()
                  ? correctStatus
                  : incorrectStatus,
              caret: caretActived,
            };
          }),
        };
      const newLetter = {
        key: currentWord.toString() + inputLength,
        index: inputLength,
        value: event.key.toLowerCase(),
        status: extra_errorStatus,
        caret: caretActived,
      };
      const newWord = {
        ...word,
        value: word.value.map((letter) => {
          return {
            ...letter,
            caret: "",
          };
        }),
      };
      newWord.value.push(newLetter);
      return newWord;
    });
    setWordsList(newWordsList);
    if (gameMode !== isWordsMode) return;
    if (
      currentWord === newWordsList.length - 1 &&
      inputLength === newWordsList[currentWord].mainValue.length - 1
    ) {
      setTimerStatus(isStopped);
      setGameStatus(hidden);
      setResultStatus("");
    }
  }

  return (
    <div>
      <div id="game-container" className={`${gameStatus}`}>
        <Counter
          gameMode={gameMode}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          timer={timer}
          setTimer={setTimer}
          timerStatus={timerStatus}
          setTimerStatus={setTimerStatus}
          setResultStatus={setResultStatus}
          currentWord={currentWord}
        />
        <div id="outFocusWarning" className={`${warningStatus}`}>
          Click me to focus
        </div>
        <div
          id="words-wrapper"
          onClick={() => {
            const ele = document.getElementById("words-input");
            ele.focus();
          }}
        >
          <input
            id="words-input"
            onKeyDown={onInputKeyDownHandler}
            onKeyPress={onInputKeyPressHandler}
            value={currentInput}
            type="text"
            onChange={onInputChangeHandler}
            autoFocus
            tabIndex="0"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
          ></input>
          <div id="words" className={`words ${focusStatus}`}>
            {wordsList.map((word) => (
              <Word
                key={word.key}
                status={word.status}
                value={word.value}
                caret={word.caret}
              />
            ))}
          </div>
        </div>
        <div id="restart-button">
          <button
            className="button"
            tabIndex="0"
            onClick={() => {
              setupText(lengthTextDefault);
              const ele = document.getElementById("words-input");
              ele.focus();
            }}
          >
            <div className="icon">
              <FontAwesomeIcon icon={faRotateRight} />
            </div>
          </button>
        </div>
      </div>
      <Result
        setupText={setupText}
        timer={timer}
        timerStatus={timerStatus}
        setTimerStatus={setTimerStatus}
        setGameStatus={setGameStatus}
        resultStatus={resultStatus}
        setResultStatus={setResultStatus}
        wordsList={wordsList}
        gameMode={gameMode}
      />
    </div>
  );
};
export default Editor;

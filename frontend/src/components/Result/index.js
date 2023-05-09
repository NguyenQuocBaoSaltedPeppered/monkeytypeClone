import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Word from "../Word";
import "./Result.css";
import {
  noneStatus,
  correctStatus,
  incorrectStatus,
  extra_errorStatus,
  isStopped,
  hidden,
  lengthTextDefault,
} from "../../config/constants";
import { GetInfo } from "../pageLogin/Utils/Common";

const oneMinute = 60;
async function saveResult(raw, acc, mode, wpm) {
  const userID = GetInfo("id");
  try {
    await fetch(`${process.env.REACT_APP_IP_KEY}/user/history`, {
      method: "POST",
      body: JSON.stringify({
        userID: userID,
        mode: mode === 0 ? "time" : "word",
        wpm: wpm,
        acc: acc,
        raw: raw,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    })
  } catch (error) {
  }
}

const Result = (props) => {
  const {
    setupText,
    timer,
    timerStatus,
    setTimerStatus,
    setGameStatus,
    resultStatus,
    setResultStatus,
    wordsList,
    gameMode,
  } = props;
  const [countRaw, setCountRaw] = useState(0);
  const [countCorrect, setCountCorrect] = useState(0);
  const [countIncorrect, setCountIncorrect] = useState(0);
  const [countExtra, setCountExtra] = useState(0);
  const [countMissed, setCountMissed] = useState(0);
  const [countCorrectWords, setCountCorrectWords] = useState(0);
  const newWordsList = wordsList.map((word) => {
    return {
      ...word,
      caret: noneStatus,
      value: word.value.map((letter) => {
        return {
          ...letter,
          caret: "",
        };
      }),
    };
  });

  useEffect(() => {
    let newcountRaw = 0,
      newcountCorrect = 0,
      newcountIncorrect = 0,
      newcountExtra = 0,
      newcountMissed = 0,
      newcountCorrectWords = 0;
    if (timerStatus !== isStopped) return;
    else {
      wordsList.forEach((word) => {
        if (word.status === noneStatus) return;
        else {
          if (word.status === correctStatus) {
            newcountCorrectWords++;
            newcountRaw = newcountRaw + word.mainValue.length;
            newcountCorrect = newcountCorrect + word.mainValue.length;
          } else {
            word.value.forEach((letter) => {
              switch (letter.status) {
                case correctStatus:
                  newcountRaw++;
                  newcountCorrect++;
                  break;
                case incorrectStatus:
                  newcountRaw++;
                  newcountIncorrect++;
                  break;
                case extra_errorStatus:
                  newcountRaw++;
                  newcountExtra++;
                  break;
                default:
                  newcountMissed++;
              }
            });
          }
        }
      });
    }

    const acc = (
      (100 * newcountCorrect) /
      (newcountRaw !== 0 ? newcountRaw : 1)
    ).toFixed(2);
    const wpm =
      (oneMinute * newcountCorrectWords) / (timer === 0 ? 1 : timer).toFixed(2);

    saveResult(newcountRaw, acc, gameMode, wpm);
    setCountCorrectWords(newcountCorrectWords);
    setCountCorrect(newcountCorrect);
    setCountIncorrect(newcountIncorrect);
    setCountExtra(newcountExtra);
    setCountMissed(newcountMissed);
    setCountRaw(newcountRaw);
  }, [timerStatus]);

  return (
    <div className={`result ${resultStatus}`}>
      <div className="stats">
        <div
          id="WPM"
          data-balloon={`${(
            (oneMinute * countCorrectWords) /
            (timer === 0 ? 1 : timer)
          ).toFixed(2)} (  ${Math.round(
            (oneMinute * countCorrect) / (timer === 0 ? 1 : timer)
          )} cpm)`}
          data-balloon-pos="up"
        >
          <div className="top">WPM</div>
          <div className="bottom">
            {Math.round(
              (oneMinute * countCorrectWords) / (timer === 0 ? 1 : timer)
            )}
          </div>
        </div>
        <div
          id="accuracy"
          data-balloon={`${(
            (100 * countCorrect) /
            (countRaw !== 0 ? countRaw : 1)
          ).toFixed(2)}%`}
          data-balloon-pos="up"
        >
          <div className="top">acc%</div>
          <div className="bottom">
            {Math.round((100 * countCorrect) / (countRaw !== 0 ? countRaw : 1))}
            %
          </div>
        </div>
        <div id="raw" data-balloon={`${countRaw}`} data-balloon-pos="up">
          <div className="top">raw</div>
          <div className="bottom">{countRaw}</div>
        </div>
        <div
          id="characters"
          data-balloon="correct, incorrect, extra-error and missed"
          data-balloon-pos="up"
        >
          <div className="top">characters</div>
          <div className="bottom">
            {countCorrect}/{countIncorrect}/{countExtra}/{countMissed}
          </div>
        </div>
        <div id="time" data-balloon={`game mode time`} data-balloon-pos="up">
          <div className="top">time</div>
          <div className="bottom">{timer}s</div>
        </div>
      </div>
      <div className="bottoms">
        <div id="result-history" className={`result-history`}>
          <div className="title">input history</div>
          <div className="words-history">
            {newWordsList.map((word, index) => {
              if (word.status !== "") {
                return (
                  <Word
                    key={word.key}
                    status={word.status}
                    value={word.value}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="buttons">
          <div
            id="next-text-button"
            data-balloon="next text"
            data-balloon-pos="down"
          >
            <button
              className="button"
              onClick={() => {
                setTimerStatus("");
                setResultStatus(hidden);
                setGameStatus("");
                setupText(lengthTextDefault);
                setCountRaw(0);
                setCountCorrect(0);
                setCountIncorrect(0);
                setCountExtra(0);
                setCountMissed(0);
                setCountCorrectWords(0);
              }}
            >
              <FontAwesomeIcon
                className="icon-button"
                icon={faAngleDoubleRight}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;

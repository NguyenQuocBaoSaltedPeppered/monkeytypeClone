import { useEffect, useState, useContext } from "react";
import {
  lengthTextWordsMode,
  isStopped,
  hidden,
  isTimeMode,
} from "../../config/constants";
import AuthenticationContext from "../../Context";

const Counter = (props) => {
  const {gameMode} = useContext(AuthenticationContext)
  const {
    gameStatus,
    setGameStatus,
    timer,
    setTimer,
    timerStatus,
    setTimerStatus,
    setResultStatus,
    currentWord,
  } = props;
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    setRemainingTime(timer);
  }, [gameStatus]);

  useEffect(() => {
    if (gameMode === isTimeMode) {
      if (timerStatus === "") {
        setRemainingTime(timer);
        return;
      }
      if (timerStatus === isStopped) {
        return;
      }
      if (remainingTime === 0) {
        setTimerStatus(isStopped);
        setGameStatus(hidden);
        setResultStatus("");
        return;
      }

      setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
      return;
    }
    if (timerStatus === "") {
      setTimer(0);
      return;
    }

    if (timerStatus === isStopped) return;

    setTimeout(() => setTimer(timer + 1), 1000);
    return;
  }, [timerStatus, remainingTime, timer]);

  return gameMode === isTimeMode ? (
    <div className="countdown-timer">{remainingTime}</div>
  ) : (
    <div className="countdown-timer">
      {currentWord}/{lengthTextWordsMode}
    </div>
  );
};
export default Counter;

import { useEffect } from "react";
import { differenceInSeconds } from "date-fns";
import { useCycles } from "../../contexts/cycles-context";
import { CountdownContainer, Separator } from "./countdown.styles";
import { finishedCycleAction } from "../../reducers/cycles/action";

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    totalSeconds,
    minutes,
    seconds,
    dispatch,
    setAmountSecondsPassed,
  } = useCycles();

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          dispatch(finishedCycleAction());

          setAmountSecondsPassed(totalSeconds);

          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
};

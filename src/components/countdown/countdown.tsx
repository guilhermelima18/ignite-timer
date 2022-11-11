import { useEffect } from "react";
import { differenceInSeconds } from "date-fns";
import { useCycles } from "../../contexts/cycles-context";
import { CountdownContainer, Separator } from "./countdown.styles";

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    totalSeconds,
    minutes,
    seconds,
    setCycles,
    setAmountSecondsPassed,
  } = useCycles();

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          setCycles((prevState) =>
            prevState.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return {
                  ...cycle,
                  fineshedDate: new Date(),
                };
              } else {
                return cycle;
              }
            })
          );

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

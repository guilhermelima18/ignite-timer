import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Cycle } from "../@types/cycle";

type CyclesProviderProps = {
  children: ReactNode;
};

type CyclesContextProps = {
  activeCycle: Cycle | undefined;
  cycles: Cycle[];
  activeCycleId: string | null;
  minutes: string;
  seconds: string;
  totalSeconds: number;
  setCycles: Dispatch<SetStateAction<Cycle[]>>;
  setActiveCycleId: Dispatch<SetStateAction<string | null>>;
  setAmountSecondsPassed: Dispatch<SetStateAction<number>>;
};

const CyclesContext = createContext({} as CyclesContextProps);

export function CyclesProvider({ children }: CyclesProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        cycles,
        activeCycleId,
        minutes,
        seconds,
        totalSeconds,
        setCycles,
        setActiveCycleId,
        setAmountSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}

export const useCycles = () => useContext(CyclesContext);

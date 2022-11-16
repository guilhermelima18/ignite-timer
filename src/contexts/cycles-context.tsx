import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Cycle } from "../@types/cycle";
import { cyclesReducer } from "../reducers/cycles/reducer";

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
  dispatch: any;
  setAmountSecondsPassed: Dispatch<SetStateAction<number>>;
};

const CyclesContext = createContext({} as CyclesContextProps);

export function CyclesProvider({ children }: CyclesProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storage = localStorage.getItem("@ignite-timer:cycles-1.0.0");

      if (storage) {
        return JSON.parse(storage);
      }

      return {
        cycles: [],
        activeCycleId: null,
      };
    }
  );

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cyclesState.cycles.find(
    (cycle) => cycle.id === cyclesState.activeCycleId
  );

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    const JSONStorage = JSON.stringify(cyclesState);

    localStorage.setItem("@ignite-timer:cycles-1.0.0", JSONStorage);
  }, [cyclesState]);

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        cycles,
        activeCycleId,
        minutes,
        seconds,
        totalSeconds,
        dispatch,
        setAmountSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}

export const useCycles = () => useContext(CyclesContext);

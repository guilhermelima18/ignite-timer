import { useFormContext } from "react-hook-form";
import { useCycles } from "../../contexts/cycles-context";
import {
  FormContainer,
  TaskInput,
  MinutesAmountInput,
} from "./new-cycle-form.styles";

export const NewCycleForm = () => {
  const { activeCycle } = useCycles();
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        {...register("task")}
        disabled={!!activeCycle}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        {...register("minutesAmount", { valueAsNumber: true })}
        step={5}
        min={0}
        max={60}
        disabled={!!activeCycle}
      />

      <span>minutos.</span>
    </FormContainer>
  );
};

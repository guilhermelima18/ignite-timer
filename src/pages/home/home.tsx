import { v4 as uuid } from "uuid";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { NewCycleForm } from "../../components/new-cycle-form/new-cycle-form";
import { Countdown } from "../../components/countdown/countdown";
import { useCycles } from "../../contexts/cycles-context";
import { CreateNewCycle, Cycle } from "../../@types/cycle";
import { newCycleFormValidationSchema } from "../../validations/cycle";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./home.styles";
import {
  addNewCycleAction,
  interruptCycleAction,
} from "../../reducers/cycles/action";

export const Home = () => {
  const { activeCycleId, activeCycle, dispatch } = useCycles();

  const methods = useForm<CreateNewCycle>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const taskWatch = methods.watch("task");
  const isButtonSubmitDisabled = !taskWatch;

  const handleCreateNewCycle = (data: CreateNewCycle) => {
    const newCycle: Cycle = {
      id: uuid(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));

    methods.reset();
  };

  const handleInterruptCycle = () => {
    dispatch(interruptCycleAction());
  };

  return (
    <HomeContainer>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleCreateNewCycle)}>
          <NewCycleForm />
          <Countdown />

          {activeCycle ? (
            <StopCountdownButton type="button" onClick={handleInterruptCycle}>
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          ) : (
            <StartCountdownButton
              type="submit"
              disabled={isButtonSubmitDisabled}
            >
              <Play size={24} />
              Começar
            </StartCountdownButton>
          )}
        </form>
      </FormProvider>
    </HomeContainer>
  );
};

import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useCycles } from "../../contexts/cycles-context";
import { HistoryContainer, HistoryList, Status } from "./history.styles";

interface StatusComponentProps {
  finishedDate?: Date;
  interruptedDate?: Date;
}

const StatusComponent = ({
  finishedDate,
  interruptedDate,
}: StatusComponentProps) => {
  return (
    <>
      {finishedDate && <Status statusColor="green">Concluído</Status>}
      {interruptedDate && <Status statusColor="red">Interrompido</Status>}
      {!interruptedDate && !finishedDate && (
        <Status statusColor="yellow">Em andamento</Status>
      )}
    </>
  );
};

export const History = () => {
  const { cycles } = useCycles();

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              const startDateFormatted = formatDistanceToNow(
                new Date(cycle.startDate),
                {
                  addSuffix: true,
                  locale: ptBR,
                }
              );

              const interruptedDateFormatted =
                cycle.interruptedDate && cycle.interruptedDate;

              const finishedDateFormatted =
                cycle.finishedDate && cycle.finishedDate;

              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>{startDateFormatted}</td>
                  <td>
                    <StatusComponent
                      finishedDate={finishedDateFormatted}
                      interruptedDate={interruptedDateFormatted}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};

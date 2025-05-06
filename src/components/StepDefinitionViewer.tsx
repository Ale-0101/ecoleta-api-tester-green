
import { agendamentoColetaSteps, consultaPontosSteps, gerenciamentoEntregasSteps } from "@/data/step-definitions";

interface StepDefinitionViewerProps {
  featureId: string;
}

const StepDefinitionViewer = ({ featureId }: StepDefinitionViewerProps) => {
  const getStepDefinition = (id: string) => {
    switch (id) {
      case "agendamento-coleta":
        return agendamentoColetaSteps;
      case "consulta-pontos":
        return consultaPontosSteps;
      case "gerenciamento-entregas":
        return gerenciamentoEntregasSteps;
      default:
        return "";
    }
  };

  return (
    <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md text-sm font-mono overflow-auto max-h-[60vh]">
      {getStepDefinition(featureId)}
    </pre>
  );
};

export default StepDefinitionViewer;

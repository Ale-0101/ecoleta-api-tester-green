
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { agendamentoColetaFeature, consultaPontosFeature, gerenciamentoEntregasFeature } from "@/data/feature-examples";
import StepDefinitionViewer from "./StepDefinitionViewer";
import FeatureList from "./FeatureList";
import { Feature } from "@/types/feature";

const features: Feature[] = [
  {
    id: "agendamento-coleta",
    name: "Agendamento de coleta",
    description: "Cenários relacionados ao agendamento de coletas sustentáveis",
    content: agendamentoColetaFeature
  },
  {
    id: "consulta-pontos",
    name: "Consulta de pontos de descarte",
    description: "Cenários para consulta de pontos de coleta e descarte",
    content: consultaPontosFeature
  },
  {
    id: "gerenciamento-entregas",
    name: "Gerenciamento de entregas",
    description: "Cenários para gerenciamento do status das entregas",
    content: gerenciamentoEntregasFeature
  }
];

const FeatureExplorer = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>(features[0].id);

  return (
    <div className="flex flex-col md:flex-row">
      <FeatureList 
        features={features} 
        selectedFeature={selectedFeature} 
        onSelectFeature={setSelectedFeature} 
      />
      
      <div className="w-full md:w-2/3 p-4">
        <Tabs defaultValue="gherkin">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="gherkin" className="flex-1">Gherkin</TabsTrigger>
            <TabsTrigger value="steps" className="flex-1">Step Definitions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gherkin" className="mt-0">
            <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md text-sm font-mono overflow-auto max-h-[60vh]">
              {features.find(f => f.id === selectedFeature)?.content}
            </pre>
          </TabsContent>
          
          <TabsContent value="steps" className="mt-0">
            <StepDefinitionViewer featureId={selectedFeature} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FeatureExplorer;


import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as dockerExamples from "../data/docker-examples";
import * as featureExamples from "../data/feature-examples";
import * as schemaExamples from "../data/schema-examples";

interface CodePreviewProps {
  type: 'dockerfile' | 'docker-compose' | 'github-workflow' | 'package-json' | 'feature' | 'schema';
  name?: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ type, name }) => {
  const [isCopied, setIsCopied] = useState(false);

  const getCode = (): string => {
    switch (type) {
      case 'dockerfile':
        return dockerExamples.dockerfileContent;
      case 'docker-compose':
        return dockerExamples.dockerComposeContent;
      case 'github-workflow':
        return dockerExamples.githubWorkflowContent;
      case 'package-json':
        return dockerExamples.packageJsonContent;
      case 'feature':
        if (name === 'agendamento-coleta') return featureExamples.agendamentoColetaFeature;
        if (name === 'consulta-pontos') return featureExamples.consultaPontosFeature;
        return featureExamples.gerenciamentoEntregasFeature;
      case 'schema':
        if (name === 'coleta') return schemaExamples.coletaSchema;
        if (name === 'ponto') return schemaExamples.pontoSchema;
        return schemaExamples.erroSchema;
      default:
        return '';
    }
  };

  const getFileName = (): string => {
    switch (type) {
      case 'dockerfile':
        return 'Dockerfile';
      case 'docker-compose':
        return 'docker-compose.yml';
      case 'github-workflow':
        return '.github/workflows/main.yml';
      case 'package-json':
        return 'package.json';
      case 'feature':
        if (name === 'agendamento-coleta') return 'features/agendamento_coleta.feature';
        if (name === 'consulta-pontos') return 'features/consulta_pontos.feature';
        return 'features/gerenciamento_entregas.feature';
      case 'schema':
        if (name === 'coleta') return 'schemas/coleta.schema.json';
        if (name === 'ponto') return 'schemas/ponto.schema.json';
        return 'schemas/erro.schema.json';
      default:
        return '';
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCode());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="border-green-200 dark:border-green-900 overflow-hidden">
      <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-green-200 dark:border-green-800">
        <div className="font-mono text-sm text-slate-600 dark:text-slate-300">{getFileName()}</div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={copyToClipboard} 
          className="text-xs"
        >
          {isCopied ? 'Copiado!' : 'Copiar'}
        </Button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-900 p-4 overflow-x-auto text-sm">
        <code>{getCode()}</code>
      </pre>
    </Card>
  );
};

export default CodePreview;

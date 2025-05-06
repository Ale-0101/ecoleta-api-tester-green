
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TestResult {
  name: string;
  status: "passed" | "failed" | "skipped";
  duration: string;
  error?: string;
}

interface TestResults {
  totalTests: number;
  passed: number;
  failed: number;
  scenarios: TestResult[];
}

const ResultsViewer = ({ results }: { results: TestResults | null }) => {
  if (!results) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          Nenhum teste foi executado ainda. Execute os testes para ver os resultados.
        </p>
      </div>
    );
  }

  const passRate = Math.round((results.passed / results.totalTests) * 100);
  
  return (
    <div className="p-6">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900 p-4">
          <div className="text-center">
            <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">Total de Testes</div>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-200 mt-1">{results.totalTests}</div>
          </div>
        </Card>
        
        <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900 p-4">
          <div className="text-center">
            <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">Aprovados</div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{results.passed}</div>
          </div>
        </Card>
        
        <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900 p-4">
          <div className="text-center">
            <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">Falhas</div>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">{results.failed}</div>
          </div>
        </Card>
        
        <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900 p-4">
          <div className="text-center">
            <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">Taxa de Sucesso</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{passRate}%</div>
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue="summary">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="summary" className="flex-1">Resumo</TabsTrigger>
          <TabsTrigger value="details" className="flex-1">Detalhes</TabsTrigger>
          <TabsTrigger value="errors" className="flex-1">Erros</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="mt-0">
          <div>
            <h3 className="text-lg font-semibold mb-4">Resultados dos Cenários</h3>
            <ScrollArea className="h-[350px] rounded border border-slate-200 dark:border-slate-800">
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-slate-200 dark:border-slate-800">
                      <th className="pb-2 font-semibold text-sm text-slate-500 dark:text-slate-400">Cenário</th>
                      <th className="pb-2 font-semibold text-sm text-slate-500 dark:text-slate-400">Status</th>
                      <th className="pb-2 font-semibold text-sm text-slate-500 dark:text-slate-400">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.scenarios.map((scenario, index) => (
                      <tr key={index} className="border-b border-slate-100 dark:border-slate-900">
                        <td className="py-3 pr-4">{scenario.name}</td>
                        <td className="py-3 pr-4">
                          <Badge 
                            variant="outline"
                            className={scenario.status === 'passed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800'}
                          >
                            {scenario.status === 'passed' ? 'Aprovado' : 'Falha'}
                          </Badge>
                        </td>
                        <td className="py-3 text-sm text-slate-500 dark:text-slate-400">{scenario.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollArea>
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="mt-0">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto h-[350px] font-mono text-sm">
            {`
[Ecoleta API Tests] - $(date)
=====================================

Environment: Development
Base URL: https://api.ecoleta-sustentavel.com/v1
Feature Files: 3
Total Scenarios: 5
Total Steps: 23

✓ Feature: Agendamento de coletas sustentáveis
  ✓ Scenario: Agendar coleta com sucesso (1.2s)
    ✓ Given que estou autenticado na API
    ✓ And possuo um endereço cadastrado "Rua das Flores, 123"
    ✓ And o tipo de material é "Eletrônico"
    ✓ When envio uma solicitação POST para "/coletas" com os dados da coleta
    ✓ Then o status da resposta deve ser 201
    ✓ And a resposta deve conter o ID da coleta agendada
    ✓ And a coleta deve estar agendada para o endereço "Rua das Flores, 123"
  
  ✓ Scenario: Falha ao agendar coleta com dados inválidos (0.9s)
    ✓ Given que estou autenticado na API
    ✓ When envio uma solicitação POST para "/coletas" sem informar o tipo de material
    ✓ Then o status da resposta deve ser 400
    ✓ And a resposta deve conter a mensagem de erro "O tipo de material é obrigatório"
    ✓ And nenhuma coleta deve ser agendada

✓ Feature: Consulta de pontos de descarte
  ✓ Scenario: Consultar pontos de descarte existentes (0.7s)
    ✓ Given que estou utilizando a API
    ✓ When envio uma solicitação GET para "/pontos"
    ✓ Then o status da resposta deve ser 200
    ✓ And a resposta deve conter uma lista de pontos de descarte
    ✓ And cada ponto deve conter nome, endereço e tipos de materiais aceitos

✓ Feature: Gerenciamento de entregas
  ✓ Scenario: Atualizar status de entrega para "Em andamento" (1.1s)
    ✓ Given que estou autenticado na API como administrador
    ✓ And existe uma coleta com ID "12345" com status "Agendada"
    ✓ When envio uma solicitação PATCH para "/coletas/12345" com o status "Em andamento"
    ✓ Then o status da resposta deve ser 200
    ✓ And o status da coleta deve ser atualizado para "Em andamento"
  
  ✗ Scenario: Validar autenticação obrigatória (0.8s)
    ✓ Given que estou utilizando a API sem autenticação
    ✓ When envio uma solicitação POST para "/coletas"
    ✗ Then o status da resposta deve ser 401
      AssertionError: expected 200 to equal 401
      at World.<anonymous> (features/steps_definitions/auth.steps.js:25:27)
            `}
          </div>
        </TabsContent>
        
        <TabsContent value="errors" className="mt-0">
          {results.failed > 0 ? (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">Erros ({results.failed})</h3>
              {results.scenarios.filter(s => s.status === 'failed').map((scenario, index) => (
                <Card key={index} className="mb-4 border-red-200 dark:border-red-900">
                  <div className="p-4 bg-red-50 dark:bg-red-950 border-b border-red-200 dark:border-red-900">
                    <h4 className="font-medium text-red-800 dark:text-red-300">{scenario.name}</h4>
                  </div>
                  <div className="p-4">
                    <p className="text-sm mb-2">
                      <span className="font-medium">Duração:</span> {scenario.duration}
                    </p>
                    <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded font-mono text-sm">
                      {scenario.error}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-700 dark:text-green-300">Nenhum erro encontrado</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Todos os testes foram executados com sucesso!
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsViewer;

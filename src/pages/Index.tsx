
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestRunner from "@/components/TestRunner";
import FeatureExplorer from "@/components/FeatureExplorer";
import ResultsViewer from "@/components/ResultsViewer";
import ApiInfoPanel from "@/components/ApiInfoPanel";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("features");
  const [testResults, setTestResults] = useState<any>(null);
  const { toast } = useToast();

  const handleRunTests = () => {
    // Simulate running tests
    toast({
      title: "Executando testes...",
      description: "Os testes estão sendo executados em segundo plano."
    });
    
    // Simulate test results after a delay
    setTimeout(() => {
      const mockResults = {
        totalTests: 5,
        passed: 4,
        failed: 1,
        scenarios: [
          { name: "Agendar coleta com sucesso", status: "passed", duration: "1.2s" },
          { name: "Falha ao agendar coleta com dados inválidos", status: "passed", duration: "0.9s" },
          { name: "Consultar pontos de descarte", status: "passed", duration: "0.7s" },
          { name: "Atualizar status de entrega", status: "passed", duration: "1.1s" },
          { name: "Validar autenticação obrigatória", status: "failed", duration: "0.8s", error: "Expected status 401 but got 200" }
        ]
      };
      
      setTestResults(mockResults);
      setActiveTab("results");
      
      toast({
        title: "Testes concluídos",
        description: `${mockResults.passed}/${mockResults.totalTests} testes passaram com sucesso.`,
        variant: mockResults.failed > 0 ? "destructive" : "default",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-2">
            Ecoleta API Tester
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Ferramenta de testes automatizados para a API REST Ecoleta, um sistema de gerenciamento de entregas e coletas sustentáveis.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ApiInfoPanel />
          </div>
          
          <div className="lg:col-span-3">
            <Card className="border-green-200 dark:border-green-900 shadow-lg">
              <CardHeader className="bg-green-100 dark:bg-green-900 border-b border-green-200 dark:border-green-800">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-green-800 dark:text-green-300">Testes da API Ecoleta</CardTitle>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={handleRunTests}
                  >
                    Executar Testes
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full bg-green-50 dark:bg-green-950 border-b border-green-200 dark:border-green-800 p-0 rounded-none">
                    <TabsTrigger 
                      value="features" 
                      className="flex-1 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-400 rounded-none border-r border-green-200 dark:border-green-800"
                    >
                      Cenários (BDD)
                    </TabsTrigger>
                    <TabsTrigger 
                      value="setup" 
                      className="flex-1 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-400 rounded-none border-r border-green-200 dark:border-green-800"
                    >
                      Configurações
                    </TabsTrigger>
                    <TabsTrigger 
                      value="results" 
                      className="flex-1 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-400 rounded-none"
                    >
                      Resultados
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="features" className="p-0 m-0">
                    <FeatureExplorer />
                  </TabsContent>
                  
                  <TabsContent value="setup" className="p-0 m-0">
                    <TestRunner />
                  </TabsContent>
                  
                  <TabsContent value="results" className="p-0 m-0">
                    <ResultsViewer results={testResults} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

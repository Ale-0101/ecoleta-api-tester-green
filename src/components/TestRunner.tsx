
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TestRunner = () => {
  const [apiUrl, setApiUrl] = useState("https://api.ecoleta-sustentavel.com/v1");
  const [authToken, setAuthToken] = useState("");
  const [environment, setEnvironment] = useState("development");
  
  const environments = [
    { value: "development", label: "Desenvolvimento" },
    { value: "staging", label: "Homologação" },
    { value: "production", label: "Produção" }
  ];
  
  const testOptions = [
    { id: "bdd", label: "Testes BDD (Gherkin)" },
    { id: "api", label: "Testes de API" },
    { id: "schema", label: "Validação de Schema" },
    { id: "smoke", label: "Smoke Tests" },
  ];
  
  const [selectedTests, setSelectedTests] = useState<string[]>(["bdd", "api", "schema"]);

  const toggleTestOption = (id: string) => {
    setSelectedTests(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="border-green-200 dark:border-green-900">
        <CardHeader className="bg-green-50 dark:bg-green-950 pb-3">
          <CardTitle className="text-lg text-green-800 dark:text-green-300">Configuração da API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="api-url" className="text-sm font-medium">URL Base da API</label>
            <Input 
              id="api-url" 
              value={apiUrl} 
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://api.ecoleta-sustentavel.com/v1"
              className="border-slate-300 dark:border-slate-700"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="environment" className="text-sm font-medium">Ambiente</label>
            <Select value={environment} onValueChange={setEnvironment}>
              <SelectTrigger className="w-full border-slate-300 dark:border-slate-700">
                <SelectValue placeholder="Selecione um ambiente" />
              </SelectTrigger>
              <SelectContent>
                {environments.map(env => (
                  <SelectItem key={env.value} value={env.value}>{env.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="auth-token" className="text-sm font-medium">Token de Autenticação</label>
            <Input 
              id="auth-token" 
              value={authToken} 
              onChange={(e) => setAuthToken(e.target.value)}
              placeholder="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="border-slate-300 dark:border-slate-700"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-green-200 dark:border-green-900">
        <CardHeader className="bg-green-50 dark:bg-green-950 pb-3">
          <CardTitle className="text-lg text-green-800 dark:text-green-300">Tipos de Testes</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {testOptions.map(option => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={option.id} 
                  checked={selectedTests.includes(option.id)}
                  onCheckedChange={() => toggleTestOption(option.id)}
                />
                <label 
                  htmlFor={option.id} 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-green-200 dark:border-green-900">
        <CardHeader className="bg-green-50 dark:bg-green-950 pb-3">
          <CardTitle className="text-lg text-green-800 dark:text-green-300">Configurações Adicionais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="custom-headers" className="text-sm font-medium">Headers Personalizados</label>
            <Textarea 
              id="custom-headers" 
              placeholder={'{\n  "X-Client-Id": "ecoleta-tester",\n  "X-API-Version": "1.0"\n}'} 
              className="font-mono text-sm border-slate-300 dark:border-slate-700"
              rows={4}
            />
          </div>
          
          <div className="flex items-center space-x-4 pt-2">
            <Button className="bg-slate-200 hover:bg-slate-300 text-slate-800" variant="outline">
              Resetar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Salvar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestRunner;

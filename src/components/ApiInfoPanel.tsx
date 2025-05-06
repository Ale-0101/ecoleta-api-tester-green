
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ApiInfoPanel = () => {
  return (
    <Card className="border-green-200 dark:border-green-900 shadow-md">
      <CardHeader className="bg-green-100 dark:bg-green-900 border-b border-green-200 dark:border-green-800 pb-3">
        <CardTitle className="text-green-800 dark:text-green-300 text-lg">Informações da API</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm text-slate-500 dark:text-slate-400">Status da API</h3>
            <div className="flex items-center mt-1">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
              <span className="font-medium">Online</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm text-slate-500 dark:text-slate-400">URL Base</h3>
            <p className="font-mono text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded mt-1 break-all">
              https://api.ecoleta-sustentavel.com/v1
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm text-slate-500 dark:text-slate-400">Endpoints Principais</h3>
            <ul className="mt-1 space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="font-mono">/coletas</span>
                <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800">GET/POST</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-mono">/pontos</span>
                <Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">GET</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-mono">/usuarios</span>
                <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800">GET/POST</Badge>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm text-slate-500 dark:text-slate-400">Autenticação</h3>
            <p className="text-sm mt-1">Bearer Token</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm text-slate-500 dark:text-slate-400">Cenários de Teste</h3>
            <div className="grid grid-cols-3 gap-2 mt-1 text-center text-xs">
              <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded p-2">
                <div className="font-bold text-green-700 dark:text-green-400">3</div>
                <div className="text-slate-600 dark:text-slate-400">BDD</div>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded p-2">
                <div className="font-bold text-blue-700 dark:text-blue-400">12</div>
                <div className="text-slate-600 dark:text-slate-400">API</div>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded p-2">
                <div className="font-bold text-yellow-700 dark:text-yellow-400">5</div>
                <div className="text-slate-600 dark:text-slate-400">Schemas</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiInfoPanel;

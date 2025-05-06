
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { agendamentoColetaFeature, consultaPontosFeature, gerenciamentoEntregasFeature } from "@/data/feature-examples";

const features = [
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

// Step definitions as plain strings to avoid template literal issues
const agendamentoColetaSteps = `const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('chai');

let authToken, response, requestData;
const baseUrl = 'https://api.ecoleta-sustentavel.com/v1';

Given('que estou autenticado na API', async function () {
  // Implementação de autenticação
  const authResponse = await axios.post(\`\${baseUrl}/auth/login\`, {
    email: 'usuario@teste.com',
    senha: 'senha123'
  });
  authToken = authResponse.data.token;
  expect(authToken).to.not.be.empty;
});

Given('possuo um endereço cadastrado {string}', function (endereco) {
  requestData = { endereco };
});

Given('o tipo de material é {string}', function (tipoMaterial) {
  requestData.tipoMaterial = tipoMaterial;
});

When('envio uma solicitação POST para {string} com os dados da coleta', async function (endpoint) {
  try {
    response = await axios.post(\`\${baseUrl}\${endpoint}\`, requestData, {
      headers: { Authorization: \`Bearer \${authToken}\` }
    });
  } catch (error) {
    response = error.response;
  }
});

When('envio uma solicitação POST para {string} sem informar o tipo de material', async function (endpoint) {
  const { tipoMaterial, ...dataWithoutMaterial } = requestData;
  try {
    response = await axios.post(\`\${baseUrl}\${endpoint}\`, dataWithoutMaterial, {
      headers: { Authorization: \`Bearer \${authToken}\` }
    });
  } catch (error) {
    response = error.response;
  }
});

Then('o status da resposta deve ser {int}', function (statusCode) {
  expect(response.status).to.equal(statusCode);
});

Then('a resposta deve conter o ID da coleta agendada', function () {
  expect(response.data).to.have.property('id');
});

Then('a coleta deve estar agendada para o endereço {string}', function (endereco) {
  expect(response.data.endereco).to.equal(endereco);
});

Then('a resposta deve conter a mensagem de erro {string}', function (mensagem) {
  expect(response.data.erro).to.equal(mensagem);
});

Then('nenhuma coleta deve ser agendada', function () {
  // Verificação adicional que pode ser feita com uma chamada GET para verificar se a coleta não existe
});`;

const consultaPontosSteps = `const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('chai');

let response;
const baseUrl = 'https://api.ecoleta-sustentavel.com/v1';

Given('que estou utilizando a API', function () {
  // Não requer autenticação para consulta de pontos
});

When('envio uma solicitação GET para {string}', async function (endpoint) {
  try {
    response = await axios.get(\`\${baseUrl}\${endpoint}\`);
  } catch (error) {
    response = error.response;
  }
});

When('envio uma solicitação GET para {string} com filtro de material {string}', async function (endpoint, tipoMaterial) {
  try {
    response = await axios.get(\`\${baseUrl}\${endpoint}?tipoMaterial=\${tipoMaterial}\`);
  } catch (error) {
    response = error.response;
  }
});

Then('o status da resposta deve ser {int}', function (statusCode) {
  expect(response.status).to.equal(statusCode);
});

Then('a resposta deve conter uma lista de pontos de descarte', function () {
  expect(response.data).to.be.an('array').that.is.not.empty;
});

Then('cada ponto deve conter nome, endereço e tipos de materiais aceitos', function () {
  const ponto = response.data[0];
  expect(ponto).to.have.all.keys(['id', 'nome', 'endereco', 'materiaisAceitos']);
  expect(ponto.materiaisAceitos).to.be.an('array');
});

Then('a resposta deve conter apenas pontos que aceitam material {string}', function (tipoMaterial) {
  for (const ponto of response.data) {
    expect(ponto.materiaisAceitos).to.include(tipoMaterial);
  }
});`;

const gerenciamentoEntregasSteps = `const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('chai');

let authToken, response, coletaId;
const baseUrl = 'https://api.ecoleta-sustentavel.com/v1';

Given('que estou autenticado na API como administrador', async function () {
  // Implementação de autenticação para admin
  const authResponse = await axios.post(\`\${baseUrl}/auth/login\`, {
    email: 'admin@ecoleta.com',
    senha: 'admin123'
  });
  authToken = authResponse.data.token;
  expect(authToken).to.not.be.empty;
});

Given('existe uma coleta com ID {string} com status {string}', async function (id, status) {
  coletaId = id;
  // Verificar se a coleta existe com o status esperado
  const checkResponse = await axios.get(\`\${baseUrl}/coletas/\${id}\`, {
    headers: { Authorization: \`Bearer \${authToken}\` }
  });
  expect(checkResponse.data.status).to.equal(status);
});

When('envio uma solicitação PATCH para {string} com o status {string}', async function (endpoint, novoStatus) {
  try {
    response = await axios.patch(\`\${baseUrl}\${endpoint}\`, 
      { status: novoStatus },
      { headers: { Authorization: \`Bearer \${authToken}\` }}
    );
  } catch (error) {
    response = error.response;
  }
});

Then('o status da resposta deve ser {int}', function (statusCode) {
  expect(response.status).to.equal(statusCode);
});

Then('o status da coleta deve ser atualizado para {string}', function (novoStatus) {
  expect(response.data.status).to.equal(novoStatus);
});

Then('um email de confirmação deve ser enviado ao usuário', function () {
  // Esta etapa pode exigir uma API mock para verificar o envio do email
  // ou uma verificação indireta através da API
  expect(response.data.emailEnviado).to.be.true;
});`;

const FeatureExplorer = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>(features[0].id);
  
  const getStepDefinition = (featureId: string) => {
    switch (featureId) {
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
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 border-r border-green-200 dark:border-green-800">
        <ul className="divide-y divide-green-100 dark:divide-green-900">
          {features.map((feature) => (
            <li key={feature.id}>
              <button
                onClick={() => setSelectedFeature(feature.id)}
                className={`w-full text-left p-4 hover:bg-green-50 dark:hover:bg-green-950 transition-colors ${
                  selectedFeature === feature.id ? 'bg-green-50 dark:bg-green-950 border-l-4 border-green-500' : ''
                }`}
              >
                <h3 className="font-medium text-green-800 dark:text-green-300">{feature.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{feature.description}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
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
            <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md text-sm font-mono overflow-auto max-h-[60vh]">
              {getStepDefinition(selectedFeature)}
            </pre>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FeatureExplorer;

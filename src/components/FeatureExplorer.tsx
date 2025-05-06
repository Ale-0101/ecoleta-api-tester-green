
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const features = [
  {
    id: "agendamento-coleta",
    name: "Agendamento de coleta",
    description: "Cenários relacionados ao agendamento de coletas sustentáveis",
    content: `Feature: Agendamento de coletas sustentáveis
  Como um usuário do sistema Ecoleta
  Eu quero poder agendar coletas de resíduos
  Para que eu possa descartar materiais de forma sustentável

  Scenario: Agendar coleta com sucesso
    Given que estou autenticado na API
    And possuo um endereço cadastrado "Rua das Flores, 123"
    And o tipo de material é "Eletrônico"
    When envio uma solicitação POST para "/coletas" com os dados da coleta
    Then o status da resposta deve ser 201
    And a resposta deve conter o ID da coleta agendada
    And a coleta deve estar agendada para o endereço "Rua das Flores, 123"
    
  Scenario: Falha ao agendar coleta com dados inválidos
    Given que estou autenticado na API
    When envio uma solicitação POST para "/coletas" sem informar o tipo de material
    Then o status da resposta deve ser 400
    And a resposta deve conter a mensagem de erro "O tipo de material é obrigatório"
    And nenhuma coleta deve ser agendada`
  },
  {
    id: "consulta-pontos",
    name: "Consulta de pontos de descarte",
    description: "Cenários para consulta de pontos de coleta e descarte",
    content: `Feature: Consulta de pontos de descarte
  Como um usuário do sistema Ecoleta
  Eu quero consultar pontos de descarte disponíveis
  Para que eu possa levar meus resíduos até lá
  
  Scenario: Consultar pontos de descarte existentes
    Given que estou utilizando a API
    When envio uma solicitação GET para "/pontos"
    Then o status da resposta deve ser 200
    And a resposta deve conter uma lista de pontos de descarte
    And cada ponto deve conter nome, endereço e tipos de materiais aceitos
    
  Scenario: Filtragem de pontos de descarte por tipo de material
    Given que estou utilizando a API
    When envio uma solicitação GET para "/pontos" com filtro de material "Eletrônico"
    Then o status da resposta deve ser 200
    And a resposta deve conter apenas pontos que aceitam material "Eletrônico"`
  },
  {
    id: "gerenciamento-entregas",
    name: "Gerenciamento de entregas",
    description: "Cenários para gerenciamento do status das entregas",
    content: `Feature: Gerenciamento de entregas
  Como um administrador do sistema Ecoleta
  Eu quero poder atualizar o status das entregas
  Para manter os usuários informados sobre suas coletas
  
  Scenario: Atualizar status de entrega para "Em andamento"
    Given que estou autenticado na API como administrador
    And existe uma coleta com ID "12345" com status "Agendada"
    When envio uma solicitação PATCH para "/coletas/12345" com o status "Em andamento"
    Then o status da resposta deve ser 200
    And o status da coleta deve ser atualizado para "Em andamento"
    
  Scenario: Finalizar entrega com sucesso
    Given que estou autenticado na API como administrador
    And existe uma coleta com ID "12345" com status "Em andamento"
    When envio uma solicitação PATCH para "/coletas/12345" com o status "Finalizada"
    Then o status da resposta deve ser 200
    And o status da coleta deve ser atualizado para "Finalizada"
    And um email de confirmação deve ser enviado ao usuário`
  }
];

const FeatureExplorer = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>(features[0].id);
  
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
              {selectedFeature === "agendamento-coleta" ? `const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('chai');

let authToken, response, requestData;
const baseUrl = 'https://api.ecoleta-sustentavel.com/v1';

Given('que estou autenticado na API', async function () {
  // Implementação de autenticação
  const authResponse = await axios.post(`${baseUrl}/auth/login`, {
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
    response = await axios.post(`${baseUrl}${endpoint}`, requestData, {
      headers: { Authorization: \`Bearer ${authToken}\` }
    });
  } catch (error) {
    response = error.response;
  }
});

When('envio uma solicitação POST para {string} sem informar o tipo de material', async function (endpoint) {
  const { tipoMaterial, ...dataWithoutMaterial } = requestData;
  try {
    response = await axios.post(`${baseUrl}${endpoint}`, dataWithoutMaterial, {
      headers: { Authorization: \`Bearer ${authToken}\` }
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
});` : 
selectedFeature === "consulta-pontos" ? `const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('chai');

let response;
const baseUrl = 'https://api.ecoleta-sustentavel.com/v1';

Given('que estou utilizando a API', function () {
  // Não requer autenticação para consulta de pontos
});

When('envio uma solicitação GET para {string}', async function (endpoint) {
  try {
    response = await axios.get(`${baseUrl}${endpoint}`);
  } catch (error) {
    response = error.response;
  }
});

When('envio uma solicitação GET para {string} com filtro de material {string}', async function (endpoint, tipoMaterial) {
  try {
    response = await axios.get(`${baseUrl}${endpoint}?tipoMaterial=${tipoMaterial}`);
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
});` : 
`const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('chai');

let authToken, response, coletaId;
const baseUrl = 'https://api.ecoleta-sustentavel.com/v1';

Given('que estou autenticado na API como administrador', async function () {
  // Implementação de autenticação para admin
  const authResponse = await axios.post(`${baseUrl}/auth/login`, {
    email: 'admin@ecoleta.com',
    senha: 'admin123'
  });
  authToken = authResponse.data.token;
  expect(authToken).to.not.be.empty;
});

Given('existe uma coleta com ID {string} com status {string}', async function (id, status) {
  coletaId = id;
  // Verificar se a coleta existe com o status esperado
  const checkResponse = await axios.get(`${baseUrl}/coletas/${id}`, {
    headers: { Authorization: \`Bearer ${authToken}\` }
  });
  expect(checkResponse.data.status).to.equal(status);
});

When('envio uma solicitação PATCH para {string} com o status {string}', async function (endpoint, novoStatus) {
  try {
    response = await axios.patch(`${baseUrl}${endpoint}`, 
      { status: novoStatus },
      { headers: { Authorization: \`Bearer ${authToken}\` }}
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
});`}
            </pre>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FeatureExplorer;

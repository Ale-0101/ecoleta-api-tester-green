
export const agendamentoColetaSteps = `const { Given, When, Then } = require('@cucumber/cucumber');
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

export const consultaPontosSteps = `const { Given, When, Then } = require('@cucumber/cucumber');
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

export const gerenciamentoEntregasSteps = `const { Given, When, Then } = require('@cucumber/cucumber');
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

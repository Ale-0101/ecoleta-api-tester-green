
export const agendamentoColetaFeature = `Feature: Agendamento de coletas sustentáveis
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
    And nenhuma coleta deve ser agendada`;

export const consultaPontosFeature = `Feature: Consulta de pontos de descarte
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
    And a resposta deve conter apenas pontos que aceitam material "Eletrônico"`;

export const gerenciamentoEntregasFeature = `Feature: Gerenciamento de entregas
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
    And um email de confirmação deve ser enviado ao usuário`;

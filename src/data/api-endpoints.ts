
export interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  requiresAuth: boolean;
  parameters?: {
    name: string;
    type: string;
    description: string;
    required: boolean;
    in: 'path' | 'query' | 'body' | 'header';
  }[];
  responses: {
    code: string;
    description: string;
  }[];
}

export const apiEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/coletas',
    description: 'Lista todas as coletas do usuário atual',
    requiresAuth: true,
    parameters: [
      {
        name: 'status',
        type: 'string',
        description: 'Filtrar coletas por status',
        required: false,
        in: 'query'
      },
      {
        name: 'page',
        type: 'integer',
        description: 'Número da página para paginação',
        required: false,
        in: 'query'
      }
    ],
    responses: [
      { code: '200', description: 'Lista de coletas retornada com sucesso' },
      { code: '401', description: 'Não autorizado - Token inválido ou ausente' }
    ]
  },
  {
    method: 'POST',
    path: '/coletas',
    description: 'Agenda uma nova coleta',
    requiresAuth: true,
    parameters: [
      {
        name: 'endereco',
        type: 'string',
        description: 'Endereço para a coleta',
        required: true,
        in: 'body'
      },
      {
        name: 'tipoMaterial',
        type: 'string',
        description: 'Tipo de material a ser coletado',
        required: true,
        in: 'body'
      },
      {
        name: 'dataAgendamento',
        type: 'string (ISO date)',
        description: 'Data e hora desejada para a coleta',
        required: true,
        in: 'body'
      }
    ],
    responses: [
      { code: '201', description: 'Coleta agendada com sucesso' },
      { code: '400', description: 'Dados inválidos' },
      { code: '401', description: 'Não autorizado - Token inválido ou ausente' }
    ]
  },
  {
    method: 'GET',
    path: '/coletas/{id}',
    description: 'Recupera detalhes de uma coleta específica',
    requiresAuth: true,
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ID da coleta',
        required: true,
        in: 'path'
      }
    ],
    responses: [
      { code: '200', description: 'Detalhes da coleta retornados com sucesso' },
      { code: '404', description: 'Coleta não encontrada' },
      { code: '401', description: 'Não autorizado - Token inválido ou ausente' }
    ]
  },
  {
    method: 'PATCH',
    path: '/coletas/{id}',
    description: 'Atualiza o status de uma coleta',
    requiresAuth: true,
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ID da coleta',
        required: true,
        in: 'path'
      },
      {
        name: 'status',
        type: 'string',
        description: 'Novo status da coleta',
        required: true,
        in: 'body'
      }
    ],
    responses: [
      { code: '200', description: 'Coleta atualizada com sucesso' },
      { code: '400', description: 'Dados inválidos' },
      { code: '404', description: 'Coleta não encontrada' },
      { code: '401', description: 'Não autorizado - Token inválido ou ausente' }
    ]
  },
  {
    method: 'GET',
    path: '/pontos',
    description: 'Lista pontos de descarte disponíveis',
    requiresAuth: false,
    parameters: [
      {
        name: 'tipoMaterial',
        type: 'string',
        description: 'Filtrar pontos por tipo de material aceito',
        required: false,
        in: 'query'
      },
      {
        name: 'latitude',
        type: 'number',
        description: 'Latitude para busca por proximidade',
        required: false,
        in: 'query'
      },
      {
        name: 'longitude',
        type: 'number',
        description: 'Longitude para busca por proximidade',
        required: false,
        in: 'query'
      }
    ],
    responses: [
      { code: '200', description: 'Lista de pontos retornada com sucesso' }
    ]
  },
  {
    method: 'GET',
    path: '/pontos/{id}',
    description: 'Recupera detalhes de um ponto de descarte específico',
    requiresAuth: false,
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ID do ponto de descarte',
        required: true,
        in: 'path'
      }
    ],
    responses: [
      { code: '200', description: 'Detalhes do ponto retornados com sucesso' },
      { code: '404', description: 'Ponto não encontrado' }
    ]
  },
  {
    method: 'POST',
    path: '/auth/login',
    description: 'Autentica um usuário',
    requiresAuth: false,
    parameters: [
      {
        name: 'email',
        type: 'string',
        description: 'Email do usuário',
        required: true,
        in: 'body'
      },
      {
        name: 'senha',
        type: 'string',
        description: 'Senha do usuário',
        required: true,
        in: 'body'
      }
    ],
    responses: [
      { code: '200', description: 'Autenticação bem-sucedida, token retornado' },
      { code: '401', description: 'Credenciais inválidas' }
    ]
  },
  {
    method: 'POST',
    path: '/usuarios',
    description: 'Registra um novo usuário',
    requiresAuth: false,
    parameters: [
      {
        name: 'nome',
        type: 'string',
        description: 'Nome do usuário',
        required: true,
        in: 'body'
      },
      {
        name: 'email',
        type: 'string',
        description: 'Email do usuário',
        required: true,
        in: 'body'
      },
      {
        name: 'senha',
        type: 'string',
        description: 'Senha do usuário',
        required: true,
        in: 'body'
      }
    ],
    responses: [
      { code: '201', description: 'Usuário registrado com sucesso' },
      { code: '400', description: 'Dados inválidos' },
      { code: '409', description: 'Email já registrado' }
    ]
  }
];

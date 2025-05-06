
export interface FileStructure {
  name: string;
  type: 'file' | 'folder';
  description?: string;
  children?: FileStructure[];
}

export const projectStructure: FileStructure[] = [
  {
    name: 'features',
    type: 'folder',
    description: 'Arquivos de definição BDD em Gherkin',
    children: [
      {
        name: 'agendamento_coleta.feature',
        type: 'file',
        description: 'Cenários relacionados ao agendamento de coletas'
      },
      {
        name: 'consulta_pontos.feature',
        type: 'file',
        description: 'Cenários para consulta de pontos de descarte'
      },
      {
        name: 'gerenciamento_entregas.feature',
        type: 'file',
        description: 'Cenários para gerenciamento do status das entregas'
      },
      {
        name: 'step_definitions',
        type: 'folder',
        description: 'Implementações dos passos BDD',
        children: [
          {
            name: 'agendamento.steps.js',
            type: 'file',
            description: 'Implementação dos passos de agendamento'
          },
          {
            name: 'auth.steps.js',
            type: 'file',
            description: 'Implementação dos passos de autenticação'
          },
          {
            name: 'pontos.steps.js',
            type: 'file',
            description: 'Implementação dos passos de consulta de pontos'
          },
          {
            name: 'entregas.steps.js',
            type: 'file',
            description: 'Implementação dos passos de gestão de entregas'
          }
        ]
      }
    ]
  },
  {
    name: 'api-tests',
    type: 'folder',
    description: 'Testes da API usando Jest/Mocha/Supertest',
    children: [
      {
        name: 'coletas.test.js',
        type: 'file',
        description: 'Testes para o endpoint de coletas'
      },
      {
        name: 'pontos.test.js',
        type: 'file',
        description: 'Testes para o endpoint de pontos de descarte'
      },
      {
        name: 'usuarios.test.js',
        type: 'file',
        description: 'Testes para o endpoint de usuários'
      },
      {
        name: 'auth.test.js',
        type: 'file',
        description: 'Testes para o endpoint de autenticação'
      }
    ]
  },
  {
    name: 'schemas',
    type: 'folder',
    description: 'Esquemas JSON para validação de contratos',
    children: [
      {
        name: 'coleta.schema.json',
        type: 'file',
        description: 'Esquema de validação para objeto coleta'
      },
      {
        name: 'ponto.schema.json',
        type: 'file',
        description: 'Esquema de validação para objeto ponto de descarte'
      },
      {
        name: 'usuario.schema.json',
        type: 'file',
        description: 'Esquema de validação para objeto usuário'
      },
      {
        name: 'erro.schema.json',
        type: 'file',
        description: 'Esquema de validação para respostas de erro'
      }
    ]
  },
  {
    name: 'config',
    type: 'folder',
    description: 'Configurações do projeto de testes',
    children: [
      {
        name: 'environment.js',
        type: 'file',
        description: 'Configurações de ambiente (dev, staging, prod)'
      },
      {
        name: 'cucumber.js',
        type: 'file',
        description: 'Configuração do Cucumber.js'
      }
    ]
  },
  {
    name: 'utils',
    type: 'folder',
    description: 'Funções utilitárias',
    children: [
      {
        name: 'api-client.js',
        type: 'file',
        description: 'Cliente HTTP para chamadas à API'
      },
      {
        name: 'auth-helper.js',
        type: 'file',
        description: 'Funções auxiliares para autenticação'
      },
      {
        name: 'schema-validator.js',
        type: 'file',
        description: 'Funções para validação de esquemas JSON'
      }
    ]
  },
  {
    name: 'reports',
    type: 'folder',
    description: 'Relatórios de execução de testes',
    children: [
      {
        name: 'cucumber-report',
        type: 'folder',
        description: 'Relatórios HTML dos testes BDD'
      },
      {
        name: 'api-test-report',
        type: 'folder',
        description: 'Relatórios dos testes de API'
      }
    ]
  },
  {
    name: '.github',
    type: 'folder',
    description: 'Configurações de CI/CD',
    children: [
      {
        name: 'workflows',
        type: 'folder',
        children: [
          {
            name: 'main.yml',
            type: 'file',
            description: 'Workflow de CI/CD para execução automática dos testes'
          }
        ]
      }
    ]
  },
  {
    name: 'package.json',
    type: 'file',
    description: 'Configuração de dependências e scripts'
  },
  {
    name: 'Dockerfile',
    type: 'file',
    description: 'Configuração para execução em contêiner Docker'
  },
  {
    name: 'docker-compose.yml',
    type: 'file',
    description: 'Configuração para execução com Docker Compose'
  },
  {
    name: 'README.md',
    type: 'file',
    description: 'Documentação do projeto'
  }
];

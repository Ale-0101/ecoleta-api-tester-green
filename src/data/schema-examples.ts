
export const coletaSchema = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "endereco", "tipoMaterial", "dataAgendamento", "status", "usuarioId"],
  "properties": {
    "id": {
      "type": "string",
      "description": "Identificador único da coleta"
    },
    "endereco": {
      "type": "string",
      "description": "Endereço completo onde será realizada a coleta"
    },
    "tipoMaterial": {
      "type": "string",
      "enum": ["Eletrônico", "Papel", "Plástico", "Vidro", "Metal", "Óleo", "Outro"],
      "description": "Tipo de material a ser coletado"
    },
    "dataAgendamento": {
      "type": "string",
      "format": "date-time",
      "description": "Data e hora agendada para a coleta"
    },
    "status": {
      "type": "string",
      "enum": ["Agendada", "Em andamento", "Finalizada", "Cancelada"],
      "description": "Status atual da coleta"
    },
    "usuarioId": {
      "type": "string",
      "description": "ID do usuário que solicitou a coleta"
    },
    "observacoes": {
      "type": "string",
      "description": "Observações adicionais sobre a coleta"
    },
    "dataFinalizacao": {
      "type": ["string", "null"],
      "format": "date-time",
      "description": "Data e hora em que a coleta foi finalizada"
    }
  }
}`;

export const pontoSchema = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "nome", "endereco", "materiaisAceitos", "coordenadas"],
  "properties": {
    "id": {
      "type": "string",
      "description": "Identificador único do ponto de descarte"
    },
    "nome": {
      "type": "string",
      "description": "Nome do ponto de descarte"
    },
    "endereco": {
      "type": "string",
      "description": "Endereço completo do ponto de descarte"
    },
    "materiaisAceitos": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": ["Eletrônico", "Papel", "Plástico", "Vidro", "Metal", "Óleo", "Outro"]
      },
      "description": "Lista de tipos de materiais aceitos pelo ponto"
    },
    "coordenadas": {
      "type": "object",
      "required": ["latitude", "longitude"],
      "properties": {
        "latitude": {
          "type": "number"
        },
        "longitude": {
          "type": "number"
        }
      },
      "description": "Coordenadas geográficas do ponto"
    },
    "horarioFuncionamento": {
      "type": "string",
      "description": "Horário de funcionamento do ponto de descarte"
    },
    "telefone": {
      "type": "string",
      "description": "Telefone para contato"
    }
  }
}`;

export const erroSchema = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["erro"],
  "properties": {
    "erro": {
      "type": "string",
      "description": "Mensagem de erro"
    },
    "detalhes": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Detalhes adicionais sobre o erro"
    },
    "codigo": {
      "type": "string",
      "description": "Código de erro"
    }
  }
}`;

# Contrato de Dados: GAL → Pipeline de Ingestão

---

## Metadados

| Campo         | Valor                          |
|---------------|--------------------------------|
| Versão        | 1.0.0                          |
| Status        | Rascunho |
| Produtor      | Sistema GAL (Módulo Nacional)  |
| Consumidor    | pipeline/ingestion/gal_extractor.py |
| Responsável   | CNIE - Equipe de Modelagem       |
| Última revisão| 2026-02-11                     |

---

## Contexto

Os dados aqui tratados são os dados brutos de requisições de exames laboratoriais de doenças respiratórias 
extraídos do sistema de Gerenciamento de Ambiente Laboratorial (GAL), do Ministério da Saúde.
O presente contrato tem o objetivo de definir as colunas que serão utilizadas para a qualificação e 
posteriormente construção das tabelas de dados de séries temporais, considerando os tipos de dados, as regras de negócio e a qualidade esperada.
O contrato visa padronizar e tratar as colunas de dados para estabelecer uma alto nível de qualidade das informações. 

---

## Fonte dos Dados

- **Sistema de origem:** GAL Nacional
- **Módulo:** Biologia Médica
- **Mecanismo de extração:** Consulta SQL batch semanal
- **Frequência:** Semanal (toda segunda-feira, janela noturna)
- **Janela temporal:** Dados da semana epidemiológica anterior

---

## Schema dos Campos

| Campo                | Tipo       | Obrigatório | Valores Aceitos / Formato     | Observações                          |
|----------------------|------------|-------------|-------------------------------|--------------------------------------|
| CO_SEQ_EXAMEREQ      | NUMBER     | Sim         | Inteiro positivo              |                                      |
| CO_UF_REQUISICAO     | CHAR(2)    | Sim         | Código IBGE de UF (ex: "35")  | Não aceita UF inválida               |
| CO_METODO            | VARCHAR2(6) | Sim         | Número em formato texto       | Não pode ser nula                    |
| CO_EXAME             | VARCHAR2(6) | Sim         | Número em formato texto       | Não pode ser nula                    |
| DT_RECEBIMENTO       | DATE       | Sim         | AAAA-MM-DD                    |                                      |
| DT_CADASTRO          | DATE       | Sim         | AAAA-MM-DD                    |                                      |
| DT_LIBERACAO         | DATE       | Sim         | AAAA-MM-DD                    | Data de liberação do exame           |
| CO_REQUISICAO        | VARCHAR2(2) | Sim         | Números em formato texto      |                                      |
| DT_ENVIO_NACIONAL    | DATE       | Sim         | AAAA-MM-DD                    |                                      |
| CO_ACESSO            | NUMBER(10) | Sim         | Inteiro positivo              | Não pode ser nula                    |
| CO_STATUS            | NUMBER(1)  | Sim         | Inteiro positivo              | Não pode ser nula                    |
| DT_NASCIMENTO        | DATE       | Sim         | AAAA-MM-DD                    | Para cálculo de faixa etária         |
| CO_SEXO              | CHAR(1)    | Sim         | "M", "F", "I"                 | I = Ignorado                         |
| ST_GESTANTE          | NUMBER     | Sim         | Inteiro positivo              |                                      |
| CO_RACA              | CHAR(2)    | Sim         |                               |                                      |
| CO_MUNICIPIO         | VARCHAR2(6) | Não         | Código IBGE município         | Nulo aceito; derivar da UF           |
| CO_NACIONALIDADE     | VARCHAR2(10) | Sim        |                               |                                    |
| CO_ETNIA             | CHAR(1)    | Sim         |                               |                                      |
| CO_PAIS              | VARCHAR2(3) | Sim         |                              |                                      |
| DT_SOLICITACAO       | DATE       | Sim         | AAAA-MM-DD                    | Não pode ser futura                  |
| DT_SINTOMAS          | DATE       | Sim         | AAAA-MM-DD                    |                                      |
| DT_CADASTRO          | DATE       | Sim         | AAAA-MM-DD                    | Data de cadastro do exame requisição               |
| DT_COLETA            | DATE       | Sim         | AAAA-MM-DD                    | Deve ser >= DT_SOLICITACAO           |
| CO_AGRAVO_REQUISICAO | NUMBER     | Sim         | Código CID-10                 | Filtrado para agravos respiratórios  |
| RESULTADO            | VARCHAR2(10) | Não         | "Positivo", "Negativo", "Inconclusivo" | Pode ser nulo se exame pendente |
| VIRUS                |            | Não         |                               |                                      |
| CO_CNES_CADASTRO     |            | Não         |                               |                                      |
| Município Solicitante|            | Não         |                               |                                      |

---

## Regras de Negócio

Regras que vão além do tipo do campo — validações que dependem de contexto ou de múltiplos campos.

1. `DT_COLETA` deve ser maior ou igual a `DT_SOLICITACAO`
2. `DT_SOLICITACAO` não pode ser posterior à data de extração
3. Registros com `CO_AGRAVO_REQUISICAO` fora da lista de agravos respiratórios monitorados devem ser descartados
4. `DT_NASCIMENTO` não pode ser posterior a `DT_COLETA`
5. Registros duplicados (mesmo `CO_SEQ_EXAMEREQ`) devem ser dedupliciados mantendo o registro com `DT_ENVIO_NACIONAL` mais recente

---

## Qualidade Esperada

Definição do que é considerado aceitável para cada execução.

| Métrica                              | Limiar de Alerta | Limiar Crítico |
|--------------------------------------|------------------|----------------|
| % de registros com DT_COLETA nula   | > 5%             | > 15%          |
| % de registros com UF inválida       | > 1%             | > 5%           |
| % de duplicatas                      | > 2%             | > 10%          |
| Volume abaixo do esperado (p/ UF)    | < 70% da média   | < 50% da média |

---

## Comportamento em Caso de Violação

O que o pipeline deve fazer quando um contrato é violado.

| Severidade | Condição                            | Ação                                      |
|------------|-------------------------------------|-------------------------------------------|
| WARNING    | Campo não obrigatório ausente       | Registrar log, prosseguir                 |
| WARNING    | Volume abaixo do limiar de alerta   | Registrar log, notificar equipe           |
| ERROR      | Campo obrigatório ausente           | Rejeitar registro, registrar log          |
| CRITICAL   | Volume abaixo do limiar crítico     | Interromper pipeline, notificar equipe    |
| CRITICAL   | Violação de regra de negócio #1–#5  | Rejeitar registro, registrar log          |

---

## Histórico de Versões

| Versão | Data       | Autor       | Descrição da mudança              |
|--------|------------|-------------|-----------------------------------|
| 1.0.0  | 2026-02-11 | Pedro de Sá | Versão inicial                    |

---

## Pendências e Decisões em Aberto

- [ ] Confirmar schema dos campos
- [ ] Confirmar com GAL se o campo CO_MUNICIPIO é sempre preenchido para capitais
- [ ] Definir lista completa de CO_AGRAVO_REQUISICAO para agravos respiratórios monitorados
- [ ] Validar limiar de volume esperado por UF com série histórica
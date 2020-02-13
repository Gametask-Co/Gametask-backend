# Documento de visão - Gametask

## 1. Introdução

### 1.1 Resumo

O Gametask consiste em uma solução integradora de gestão de tempo e atividades acadêmicas voltado para estudantes (secundaristas, acadêmicos e vestibulandos).

O sistema se propõe a solucionar a fragmentação de múltiplas aplicações voltadas para estudo, aprimoramento de aptidão dos usuários em gerenciar sua rotina e tempo, melhoramento de métodos de organização, aperfeiçoamento de disciplina e assiduidade e produção de cronogramas bem definidos para aumento de entusiasmo através de metas acessíveis.

A ferramenta possibilita uma gestão integradora de atividades e rotinas, que através da ludificação mantém níveis saudáveis de estímulo sobre as tarefas e objetivos que ao serem realizadas em tempo determinado concedem recompensas de experiência e hierarquia no ambiente interativo da aplicação.

### 1.2 Escopo

Tendo em vista o propósito do projeto (gerenciar rotinas e atividades acadêmicas) seguem abaixo as principais responsabilidades e não-responsabilidades do sistema.

#### 1.2.1 Responsabilidades do Sistema

1. Permitir a criação, acompanhamento e gerenciamento de atividades;
2. Permitir a criação, acompanhamento e gerenciamento de disciplinas;
3. Permitir a criação, acompanhamento e gerenciamento de projetos;
4. Gerar esquemas de horário e rotina baseado em informações fornecidas pelo usuário;
5. Auxiliar na gestão do tempo escolar;
6. Recompensar a realização de tarefas através da ludificação.

#### 1.2.2 Não-Responsabilidades do Sistema

1. Guardar documentos, imagens, áudios ou vídeos;
2. Criar ou editar documentos, imagens, áudios ou vídeos;
3. Enviar, receber ou anexar arquivos;
4. Permitir o recebimento ou emissão de notas para atividades por terceiros;
5. Intermediar estudantes e educadores;
6. Gerir funções escolares;
7. Permitir troca de mensagens;
8. Permitir o acompanhamento das atividades de outrem.

## 2. Requisitos

### 2.1 Requisitos Funcionais

| Cód. | Nome                            | Descrição                                                    | Prioridade |
| :--: | :------------------------------ | ------------------------------------------------------------ | :--------: |
| RF01 | Criar Conta                     | O usuário poderá criar uma conta                             |    Alta    |
| RF02 | Autenticar                      | O usuário poderá autenticar-se utilizando uma conta preexistente |    Alta    |
| RF03 | Excluir Conta                   | O usuário poderá excluir sua conta                           |   Média    |
| RF04 | Editar Conta                    | O usuário poderá editar informações da conta                 |   Média    |
| RF05 | Adicionar Atividade             | O usuário poderá criar uma atividade                         |    Alta    |
| RF06 | Editar Atividade                | O usuário poderá alterar a atividade                         |   Média    |
| RF07 | Cancelar Atividade              | O usuário poderá cancelar a atividade                        |    Alta    |
| RF08 | Visualizar Atividade            | O usuário poderá visualizar a atividade                      |    Alta    |
| RF09 | Concluir Atividade              | O usuário poderá concluir a atividade                        |    Alta    |
| RF10 | Adicionar Disciplina            | O usuário poderá criar uma disciplina                        |    Alta    |
| RF11 | Editar Disciplina               | O usuário poderá alterar a disciplina                        |   Média    |
| RF12 | Cancelar Disciplina             | O usuário poderá cancelar a disciplina                       |   Média    |
| RF13 | Visualizar Disciplina           | O usuário poderá visualizar a disciplina                     |    Alta    |
| RF14 | Concluir Disciplina             | O sistema concluirá a disciplina na data informada           |   Média    |
| RF15 | Adicionar Projeto               | O usuário poderá criar um projeto                            |    Alta    |
| RF16 | Editar Projeto                  | O usuário poderá alterar o projeto                           |   Média    |
| RF17 | Cancelar Projeto                | O usuário poderá cancelar o projeto                          |   Média    |
| RF18 | Visualizar Projeto              | O usuário poderá visualizar o projeto                        |    Alta    |
| RF19 | Concluir Projeto                | O usuário poderá concluir o projeto                          |   Média    |
| RF20 | Adicionar Grupo                 | O usuário poderá criar um grupo                              |    Alta    |
| RF21 | Editar Grupo                    | O usuário poderá alterar um grupo                            |   Média    |
| RF22 | Excluir Grupo                   | O usuário poderá excluir um grupo                            |   Baixa    |
| RF23 | Visualizar Grupo                | O usuário poderá visualizar o grupo selecionado              |    Alta    |
| RF24 | Adicionar Integrante            | O usuário poderá adicionar um usuário ao grupo               |    Alta    |
| RF25 | Remover Integrante              | O usuário poderá remover um integrante do grupo              |   Baixa    |
| RF26 | Visualizar Usuário              | O usuário poderá visualizar o perfil de outro usuário        |   Médio    |
| RF27 | Adicionar Administrador         | O usuário poderá adicionar um integrante do grupo como administrador |   Baixa    |
| RF28 | Visualizar Linha do Tempo       | O usuário poderá visualizar a linha do tempo (calendário e horários) na dashboard |   Média    |
| RF29 | Adicionar à Lista de Tarefas    | O usuário poderá adicionar tarefas à lista de tarefas referente a uma atividade |   Média    |
| RF30 | Adicionar à Lista de Atividades | O usuário poderá adicionar atividades à lista de atividades referente a um projeto ou grupo |   Média    |
| RF31 | Delegar Atividade               | O usuário poderá delegar uma tarefa a um integrante do grupo |    Alta    |
| RF32 | Visualizar Fluxo                | O usuário poderá visualizar o log de interações do grupo     |   Baixa    |
| RF33 | Adicionar Amigo                 | O usuário pode enviar um pedido de amizade a outro usuário   |   Baixa    |
| RF34 | Buscar Usuário                  | O usuário pode buscar outro usuário na plataforma            |   Baixa    |
| RF35 | Pontuar Usuário                 | Ao concluir uma atividade o Sistema dá pontos ao usuário     |   Média    |

### 2.2 Requisitos Não-Funcionais

| Cód. | Nome                    | Descrição                                                    | Categoria   |
| ---- | ----------------------- | ------------------------------------------------------------ | ----------- |
| NF01 | Ludificação             | Ganhos e perdas adquiridos através da realização de objetivos. | Obrigatório |
| NF02 | Segurança               | Tráfego seguro das informações pessoais de tarefas e integrações realizadas. | Desejável   |
| NF03 | Desempenho              | Utilização de boas práticas para o uso de dados leves e otimizados. | Desejável   |
| NF04 | Usabilidade             | Uso de linguagem facilitada dos componentes e partes importantes do sistema. | Obrigatório |
| NF05 | Portabilidade           | Fácil exportação dos dados do sistema para outras tecnologias podendo ser feito também integrações | Obrigatório |
| NF06 | Parâmetros anti-trapaça | Prevenção contra jogadores trapaceiros                       | Obrigatório |

### 2.3 Tabela de Referência - Requisitos

|      | NF01 | NF02 | NF03 | NF04 | NF05 | NF06 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| RF01 |      |  X   |  X   |  X   |      |      |
| RF02 |      |  X   |  X   |  X   |      |      |
| RF03 |      |  X   |  X   |  X   |      |      |
| RF04 |      |  X   |  X   |  X   |      |      |
| RF05 |      |  X   |  X   |  X   |  X   |      |
| RF06 |      |      |  X   |  X   |  X   |      |
| RF07 |      |      |  X   |  X   |  X   |      |
| RF08 |      |  X   |  X   |  X   |  X   |      |
| RF09 |  X   |      |  X   |  X   |  X   |      |
| RF10 |      |  X   |  X   |  X   |  X   |      |
| RF11 |      |      |  X   |  X   |  X   |      |
| RF12 |      |      |  X   |  X   |  X   |      |
| RF13 |      |  X   |  X   |  X   |  X   |      |
| RF14 |  X   |      |  X   |  X   |  X   |      |
| RF15 |      |  X   |  X   |  X   |  X   |      |
| RF16 |      |      |  X   |  X   |  X   |      |
| RF17 |      |      |  X   |  X   |  X   |      |
| RF18 |      |  X   |  X   |  X   |  X   |      |
| RF19 |  X   |      |  X   |  X   |  X   |      |
| RF20 |      |  X   |  X   |  X   |      |      |
| RF21 |      |      |  X   |  X   |      |      |
| RF22 |      |      |  X   |  X   |      |      |
| RF23 |      |  X   |  X   |  X   |      |      |
| RF24 |      |      |  X   |  X   |      |      |
| RF25 |      |      |  X   |  X   |      |      |
| RF26 |      |  X   |  X   |  X   |      |      |
| RF27 |      |      |  X   |  X   |      |      |
| RF28 |      |      |  X   |  X   |      |      |
| RF29 |      |  X   |  X   |  X   |  X   |      |
| RF30 |      |  X   |  X   |  X   |  X   |      |
| RF31 |      |      |  X   |  X   |      |      |
| RF32 |      |  X   |  X   |  X   |      |      |
| RF33 |      |  X   |  X   |  X   |      |      |
| RF34 |      |      |  X   |  X   |      |      |
| RF35 |  X   |      |  X   |  X   |      |  X   |

### 2.4 Diagrama Geral de Casos de Uso



### 2.5. Casos de Uso

| Cód. | Caso de Uso            | Descrição                                                    | Classificação |
| ---- | ---------------------- | ------------------------------------------------------------ | ------------- |
| UC01 | Gerenciar Usuários     | Cadastrar, editar, visualizar e deletar um usuário           | Primário      |
| UC02 | Gerenciar Atividades   | Cadastrar, editar, visualizar e deletar uma atividade        | Primário      |
| UC03 | Gerenciar Disciplinas  | Cadastrar, editar, visualizar e deletar uma disciplina       | Primário      |
| UC04 | Gerenciar Projetos     | Cadastrar, editar, visualizar e deletar um projeto           | Primário      |
| UC05 | Gerenciar Grupo        | Criar,visualizar e excluir um grupo                          | Primário      |
| UC06 | Gerenciar Integrantes  | Inserir e remover integrantes de um grupo, dar e remover privilégios | Secundário    |
| UC07 | Transferência de dados | Importar ou exportados do/para o Gametask                    | Secundário    |

### 2.6. Tabela de Referência - Casos de uso & Requisitos

|      | UC01 | UC02 | UC03 | UC04 | UC05 | UC06 | UC07 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| RF01 |  X   |      |      |      |      |      |      |
| RF02 |  X   |      |      |      |      |      |      |
| RF03 |  X   |      |      |      |      |      |      |
| RF04 |  X   |      |      |      |      |      |      |
| RF05 |      |  X   |      |      |      |      |      |
| RF06 |      |  X   |      |      |      |      |      |
| RF07 |      |  X   |      |      |      |      |      |
| RF08 |      |  X   |      |      |      |      |      |
| RF09 |      |  X   |      |      |      |      |      |
| RF10 |      |      |  X   |      |      |      |      |
| RF11 |      |      |  X   |      |      |      |      |
| RF12 |      |  X   |  X   |      |      |      |      |
| RF13 |      |  X   |  X   |      |      |      |      |
| RF14 |      |      |  X   |      |      |      |      |
| RF15 |      |      |      |  X   |      |      |      |
| RF16 |      |  X   |      |  X   |      |      |      |
| RF17 |      |  X   |      |  X   |      |      |      |
| RF18 |      |      |      |  X   |      |      |      |
| RF19 |      |      |      |  X   |      |      |      |
| RF20 |      |      |      |      |  X   |      |      |
| RF21 |      |      |      |      |  X   |      |      |
| RF22 |      |  X   |      |  X   |  X   |      |      |
| RF23 |      |      |      |      |  X   |      |      |
| RF24 |      |      |      |      |      |  X   |      |
| RF25 |      |      |      |      |      |  X   |      |
| RF26 |  X   |      |      |      |      |  X   |      |
| RF27 |      |      |      |      |      |  X   |      |
| RF28 |      |      |      |      |  X   |      |      |
| RF29 |      |  X   |      |      |      |      |      |
| RF30 |      |  X   |      |  X   |  X   |      |      |
| RF31 |      |      |      |      |  X   |      |      |
| RF32 |      |      |      |      |  X   |      |      |
| RF33 |  X   |      |      |      |      |      |      |
| RF34 |  X   |      |      |      |      |      |      |
| RF35 |      |  X   |      |      |      |      |      |

### 2.7. Atores

| Ator      | Descrição                                                    |
| --------- | ------------------------------------------------------------ |
| Estudante | Jovens e adultos de segmento secundarista, vestibulando e universitário |
| Sistema   | Referente ao servidor que mantem a API interna               |
| Serviço   | Referente a um servidor externo que mantem uma API de serviços integrada ao sistema |

## 3. Restrições

| Cód. | Nome                     | Descrição                                               | Categoria   |
| ---- | ------------------------ | ------------------------------------------------------- | ----------- |
| R01  | Acesso à internet        | Necessário para conseguir a autenticação da conta       | Obrigatório |
| R02  | Estar Autenticado        | Necessário para conseguir visualizar os dados da conta  | Obrigatório |
| R03  | Cadastrar Dados Pessoais | Cadastrar dados pessoais para interagir com a aplicação | Obrigatório |
| R04  | Cadastrar Atividade      | Cadastrar atividade para interagir com a aplicação      | Desejável   |
| R05  | Cadastrar Projeto        | Cadastrar projeto para interagir com a aplicação        | Desejável   |
| R06  | Cadastrar Disciplina     | Cadastrar disciplina para interagir com a aplicação     | Desejável   |

## 4. Stackholders

### 4.1 Clientes

Universidades, escolas e instituições de ensino que queiram estimular seus estudantes a tornar suas rotinas de estudo mais produtivas. E estudantes que por conta própria desejem o auxilio de uma ferramenta de produtividade em nicho especifico.

### 4.2 Usuários

Estudantes secundaristas, acadêmicos e vestibulandos.

## 5. Decisões Projetuais

### 5.1 Tecnologias

#### 5.1.1 Front-End:

- React JS
- Bootstrap 4
- Sass

#### 5.1.2 Back-End:

- Node JS
- REST
- Mongo DB

#### 5.1.3 Banco de Dados:

- Decidir modelo de lista de amigos (array ou tabela)
- Tabela única para atividades com referência em tag
- Grupo tem tag do usuário
- Tag em formato de matrícula

### 5.2 Regras de Negócio

#### 5.2.1 Sistema de pontuação

|        Peso         | Min. | Méd. | Max. |
| :-----------------: | :--: | :--: | :--: |
| Número de Afazeres  |  0   |  -   |  10  |
| Estado da Atividade |  0   | 0.5  |  1   |
|     Prazo Final     |  0   | 0.25 |  1   |

#### 5.2.2 Cálculo:

```python
#Calculo Base da Pontuação
def calc_point(n_todo=0, state=0.5, due_date=0.25, todo_const=10):
    value = todo_const * n_todo
    if value > 100:
        value = 100

    return value * state * due_date
```

#### 5.2.3 Ludificação

Aqui vai o que Jonatas pesquisou...

### 5.3 Desenvolvimento

#### 5.3.1 Método:

Descrever os métodos de desenvolvimento...

Nota: Toda sexta depois da aula (18:15)

#### 5.3.2 Escala:

| Contribuintes                     | Total de horas Semanais |
| --------------------------------- | :---------------------: |
| Breno Pereira Alves               |           15h           |
| Euller Henrique F. de Albuquerque |           15h           |
| Jonathan Cardoso F. de Moura      |           15h           |
| Jonatas Melo Silva                |           15h           |
| Arthur Meireles da Silva          |            x            |

#### 5.3.3 Iterações

| Iteração |    Período    |                          Atividade                           |
| :------: | :-----------: | :----------------------------------------------------------: |
| Primeira | 10/02 a 14/02 | Produção e Validação de Casos de Uso / Produção e Validação de Protótipos de Tela / Revisão e Apresentação das Regras de Negócio |
| Segunda  |       -       |                              -                               |
| Terceira |       -       |                              -                               |
|  Quarta  |       -       |                              -                               |
|  Quinta  |       -       |                              -                               |
|  Sexta   |       -       |                              -                               |
|  Quinta  |       -       |                              -                               |

#### 5.3.4 Atribuições

##### 5.3.4.1 Primeira Iteração

| Contribuintes               | Descrição                                    | Concluído |
| --------------------------- | -------------------------------------------- | :-------: |
| Arthur Meireles da Silva    |                                              |     -     |
| Breno Pereira Alves         | Produção dos Casos de uso UC05, UC06 e UC07  |     -     |
| Euller H. F. de Albuquerque | Produção e Validação dos Protótipos de Tela  |     -     |
| Jonatas Melo Silva          | Revisão e Apresentação das Regras de Negócio |     -     |
| Jonathan C. F. de Moura     | Produção dos Casos de uso UC01 e UC04        |     -     |


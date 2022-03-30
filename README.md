# Projeto TFC - Trybe Futebol Clube

# Contexto

O TFC é uma aplicação Frontend que exibe informações sobre partidas e classificação de futebol fornecido pela Trybe. O objetivo deste projeto foi arquitetar e desenvolver uma **API REST** que popula o Frontend fornecido com as informações de um banco de dados **MySQL**, seguindo as regras de negócio previamente estipuladas. O desenvolvimento seguiu o método **TDD(Test-driven development)** com base em testes de integração, assim como os princípios **SOLID**. Para integrar Frontend, Backend e DB, foi utilizado o **docker-compose**.

## Tecnologias usadas
* Docker;
* Node.js;
* Express.js;
* Typescript;
* JWT(JSON Web Token);
* MySQL;
* Sequelize(ORM);
* Jest;
* mocha;
* chai;
* sinon;

## Instalando Dependências

* Clone o repositório:
```bash
git clone git@github.com:caiquequaresmasilva/projeto-trybe-trybe-futebol-clube.git
``` 

* Entre na pasta do repositório clonado e instale as dependências:

```bash
cd projeto-trybe-trybe-futebol-clube
npm install
``` 

* Instale as aplicações frontend e backend executando o comando:

```bash
npm run install:apps
``` 

## Executando a aplicação

* Para rodar a aplicação integrada pelo docker-compose:

```bash
npm run compose:up
``` 

Quando rodando, a aplicação pode ser acessada pelo endereço http://localhost:3000/leaderboard.

* Para encerrar o docker-compose:

```bash
npm run compose:down
``` 

---

Para rodar as aplicações individualmente, é necessário configurar as variáveis de ambiente para conexão com um banco de dados **MySQL** no arquivo `app/backend/.env`

```
PORT=3001 # Porta de comunicação da API
DB_USER=root # Usuário de acesso ao banco de dados
DB_PASS=senha # Senha do usuário
DB_HOST=dbhost # Host do banco de dados
DB_NAME=TRYBE_FUTEBOL_CLUBE #Esse deve ser o nome do banco de dados
DB_PORT=3306 # Porta de comunicação com o banco de dados
``` 
---

* Para rodar o backend, entre no diretório correto e execute o script:
```bash
cd app/backend
npm start
``` 

A API pode ser acessada pelo endereço http://localhost:3001/.

---

* Para rodar o frontend, entre no diretório correto e execute o script:
```bash
cd app/frontend
npm start
``` 
A aplicação pode ser acessada pelo endereço http://localhost:3000/leaderboard.

---

## Endpoints
* `POST /login` Se conter dados válidos, loga o usuário e retorna um Token de autenticação.

   Request body:
  ```json
  {
    "email": "admin@admin.com",
    "password": "secret_admin"
  }
  ``` 
  
   Response body:
  ```json
  {
    "user": {
      "id": 1,
      "username": "Admin",
      "role": "admin",
      "email": "admin@admin.com"
    },
    "token": "asdkal.hjfghf.werwqrq" //Exemplo de token gerado pelo backend
  }
  ``` 
  HTTP STATUS: `200 OK`

 
* `GET /login/validate` Deve possuir o token fornecido. Retorna `role` do usuário.

   Response body:
  ```json
  "admin"
  ``` 
  HTTP STATUS: `200 OK`

 
* `GET /clubs` Retorna todos os times registrados no banco de dados.
  
  Response body:
  ```json
  [
    {
      "id": 1,
      "clubName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "clubName": "Bahia"
    },
    ...
  ]
  ``` 
  HTTP STATUS: `200 OK`
 
* `GET /clubs/:id` Retorna time especificado.

  Request params: `/clubs/1`
  
  Response body:
  ```json
    {
      "id": 1,
      "clubName": "Avaí/Kindermann"
    }
  ``` 
  HTTP STATUS: `200 OK`
  
* `GET /matchs` Retorna lista de todas as partidas.

  Response body:
  ```json
  [
    {
      "id": 1,
      "homeTeamGoals": 1,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": 16,
      "awayTeam": 8,
      "homeClub": {
        "clubName": "São Paulo"
      },
      "awayClub": {
        "clubName": "Grêmio"
      }
    },
    ...
    {
      "id": 48,
      "homeTeamGoals": 1,
      "awayTeamGoals": 1,
      "inProgress": true,
      "homeTeam": 13,
      "awayTeam": 2,
      "homeClub": {
        "clubName": "Real Brasília"
      },
      "awayClub": {
        "clubName": "Bahia"
      }
    }
  ]
  ``` 
  HTTP STATUS: `200 OK`
  
* `GET /matchs?inProgress` Retorna lista de todas as partidas filtradas pelo parâmetro `inProgress`.

  Request query: `/matchs?inProgress=true`
  
    Response body:
  ```json
  [
     {
      "id": 41,
      "homeTeamGoals": 2,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": 16,
      "awayTeam": 9,
      "homeClub": {
        "clubName": "São Paulo"
      },
      "awayClub": {
        "clubName": "Internacional"
      }
    },
    ...
    {
      "id": 48,
      "homeTeamGoals": 1,
      "awayTeamGoals": 1,
      "inProgress": true,
      "homeTeam": 13,
      "awayTeam": 2,
      "homeClub": {
        "clubName": "Real Brasília"
      },
      "awayClub": {
        "clubName": "Bahia"
      }
    }
  ]
  ``` 
  HTTP STATUS: `200 OK`
  
  
  
  


## Executando Testes

* Para rodar os testes de integração do backend, execute a API e rode o script:
  ```bash
  cd app/backend
  npm start
  npm test
  ```

* Para verificar a cobertura de testes, com a API rodando, rode o script:
  ```bash
  npm run test:coverage
  ```

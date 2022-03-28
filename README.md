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

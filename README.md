# Projeto TFC - Trybe Futebol Clube

# Contexto

O TFC é uma aplicação Frontend que exibe informações sobre partidas e classificação de futebol fornecido pela Trybe. O objetivo deste projeto foi arquitetar e desenvolver uma **API REST** que popula o Frontend fornecido com as informações de um banco de dados **MySQL**, seguindo as regras de negócio previamente estipuladas. O desenvolvimento seguiu o método **TDD(Test-driven development)** com base em testes de integração, assim como os princípios **SOLID**. Para integrar Frontend, Backend e DB, foi utilizado o **docker-compose**.

## Tecnologias usadas
-Docker;
-Node.js;
-Express.js;
-Typescript;
-JWT(JSON Web Token);
-MySQL;
-Sequelize;
-Jest;
-mocha;
-chai;
-sinon;



## Instalando Dependências

> Backend
```bash
cd api/ 
npm install
``` 
> Frontend
```bash
cd src/
npm install
``` 
## Executando aplicação

* Para rodar o back-end:

  ```
  cd api/ && npm start
  ```
* Para rodar o front-end:

  ```
    cd src/ && npm start
  ```

## Executando Testes

* Para rodar todos os testes:

  ```
    npm test
  ```
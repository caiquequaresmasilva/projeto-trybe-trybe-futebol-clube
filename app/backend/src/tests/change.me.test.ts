import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import User from '../database/models/users';
import Club from '../database/models/clubs'
import Match from '../database/models/matchs'

import { app } from '../app';
import { Response } from 'superagent';

import { 
    mockedLogin, 
    validUser, 
    invalidUser,
    mockedClubs,
    mockedClubId,
    mockedMatches,
    matchToSave } from './mock'

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('POST /login', async () => {
  const ENDPOINT = '/login';
  

  describe("Quando o login é feito com dados válidos",async()=>{

    before(async ()=>{
      sinon.stub(User,'findOne').resolves(mockedLogin as User);
      chaiHttpResponse = await chai.request(app).post(ENDPOINT).send(validUser);
    })
    after(async ()=>{
    (User.findOne as sinon.SinonStub).restore();
    })

    it("Deve retornar status 200",() =>{
      expect(chaiHttpResponse).to.have.status(200);
    })

    it("Deve retornar os dados do usuário",() =>{
      expect(chaiHttpResponse.body).to.have.property('user');
    })

    it("Deve retornar o token de acesso",() =>{
      expect(chaiHttpResponse.body).to.have.property("token")
    })
  })

  describe("Quando o login é feito com dados inválidos",async()=>{

    before(async ()=>{
      sinon.stub(User,'findOne').resolves(undefined);
      chaiHttpResponse = await chai.request(app).post(ENDPOINT).send(invalidUser);
    })
    after(async ()=>{
    (User.findOne as sinon.SinonStub).restore();
    })

    it("Deve retornar status 401",() =>{
      expect(chaiHttpResponse).to.have.status(401);
    })

    it("Deve retornar a mensagem de erro",() =>{
      expect(chaiHttpResponse.body.message).to.be.equal("Incorrect email or password")
    })
  })

  describe("Quando o login é feito sem os dados necessários",async()=>{

    before(async ()=>{
      chaiHttpResponse = await chai.request(app).post(ENDPOINT).send({});
    })

    it("Deve retornar status 401",() =>{
      expect(chaiHttpResponse).to.have.status(401);
    })

    it("Deve retornar a mensagem de erro correta",() =>{
      expect(chaiHttpResponse.body.message).to.be.equal("All fields must be filled")
    })
  })

});

describe("GET /login/validate ",async()=>{
  const ENDPOINT = '/login/validate'

  describe("Quando o acesso é feito com o token de autorização", async ()=>{
    before(async ()=>{
      chaiHttpResponse = await chai.request(app).post('/login').send(validUser);
      const{ token } = chaiHttpResponse.body
      chaiHttpResponse = await chai.request(app).get(ENDPOINT).set('authorization',token);
   })

  it("Deve retornar status 200",() =>{
    expect(chaiHttpResponse).to.have.status(200);
  })

  it("Deve retornar a role do usuário",() =>{
    expect(chaiHttpResponse.body).to.be.equal("admin");
  })

  })

});

describe("GET /clubs ",async()=>{
  const ENDPOINT = '/clubs'
  
  describe("Quando a requisiçao para a rota é feita", async ()=>{
    before(async ()=>{
      sinon.stub(Club,'findAll').resolves(mockedClubs as Club[]);
      chaiHttpResponse = await chai.request(app).get(ENDPOINT);
    })
    after(async ()=>{
      (Club.findAll as sinon.SinonStub).restore();
    })
  
    it("Deve retornar status 200",() =>{
      expect(chaiHttpResponse).to.have.status(200);
    })
  
    it("Deve retornar a lista de clubes",() =>{
      expect(chaiHttpResponse.body).to.be.eql(mockedClubs);
    })
  
    })
  
});

describe("GET /clubs/:id ",async()=>{
  const ENDPOINT = '/clubs/5'
  
  describe("Quando a requisiçao para a rota é feita com o id correto", async ()=>{
    before(async ()=>{
      sinon.stub(Club,'findByPk').resolves(mockedClubId as Club);
      chaiHttpResponse = await chai.request(app).get(ENDPOINT);
    })
    after(async ()=>{
      (Club.findByPk as sinon.SinonStub).restore();
    })
  
    it("Deve retornar status 200",() =>{
      expect(chaiHttpResponse).to.have.status(200);
    })
  
    it("Deve retornar a lista de clubes",() =>{
      expect(chaiHttpResponse.body).to.be.eql(mockedClubId);
    })
  
    })
  
});

describe("GET /matchs",async()=>{
  const ENDPOINT = '/matchs'
    
  describe("Quando a requisiçao para a rota é feita", async ()=>{
    before(async ()=>{
      sinon.stub(Match,'findAll').resolves(mockedMatches as Match[]);
      chaiHttpResponse = await chai.request(app).get(ENDPOINT);
    })
    after(async ()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
    
    it("Deve retornar status 200",() =>{
      expect(chaiHttpResponse).to.have.status(200);
    })
    
    it("Deve retornar a lista de partidas",() =>{
      expect(chaiHttpResponse.body).to.be.eql(mockedMatches);
    })
    
  })    
});

describe("GET /matchs?inProgress=",async()=>{
  const ENDPOINT = '/matchs?inProgress=true'
  const inProgressMatches = [mockedMatches[1]]
  const finishedMatches = [mockedMatches[0]]
    
  describe("Quando o parâmetro inProgress=true é passado", async ()=>{
    before(async ()=>{
      sinon.stub(Match,'findAll').resolves(inProgressMatches as Match[]);
      chaiHttpResponse = await chai.request(app).get(ENDPOINT);
    })
    after(async ()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
    
    it("Deve retornar status 200",() =>{
      expect(chaiHttpResponse).to.have.status(200);
    })
    
    it("Deve retornar a lista de partidas em progresso",() =>{
      expect(chaiHttpResponse.body).to.be.eql(inProgressMatches);
    })
    
  })
  
  describe("Quando o parâmetro inProgress=false é passado", async ()=>{
    before(async ()=>{
      sinon.stub(Match,'findAll').resolves(finishedMatches as Match[]);
      chaiHttpResponse = await chai.request(app).get(ENDPOINT);
    })
    after(async ()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
    
    it("Deve retornar status 200",() =>{
      expect(chaiHttpResponse).to.have.status(200);
    })
    
    it("Deve retornar a lista de partidas em finalizadas",() =>{
      expect(chaiHttpResponse.body).to.be.eql(finishedMatches);
    })
    
  })   
});

describe("POST /matchs",async()=>{
  const ENDPOINT = '/matchs';
  const mockedCreatedMatch = {id:1, ...matchToSave}
    
  describe("Quando a requisição possui um token válido", async ()=>{
    before(async ()=>{
      sinon.stub(Match,'create').resolves(mockedCreatedMatch as Match);
      chaiHttpResponse = await chai.request(app).post('/login').send(validUser);
      const{ token } = chaiHttpResponse.body
      chaiHttpResponse = await chai.request(app).post(ENDPOINT).set('authorization',token).send(matchToSave);
    })
    after(async ()=>{
      (Match.create as sinon.SinonStub).restore();
    })
    
    it("Deve retornar status 201",() =>{
      expect(chaiHttpResponse).to.have.status(201);
    })
    
    it("Deve retornar a partida criada com seu Id",() =>{
      expect(chaiHttpResponse.body).to.be.eql(mockedCreatedMatch);
    })
    
  })
  
  describe("Quando a requisição não possui um token válido", async ()=>{
    before(async ()=>{
      chaiHttpResponse = await chai.request(app).post(ENDPOINT).set('authorization','tokenInvalido').send(matchToSave);
    })
    
    it("Deve retornar status 401",() =>{
      expect(chaiHttpResponse).to.have.status(200);
    })
    
    it("Deve retornar a mensagem correta",() =>{
      expect(chaiHttpResponse.body.message).to.be("Invalid Token");
    })
    
  })   
});


  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });


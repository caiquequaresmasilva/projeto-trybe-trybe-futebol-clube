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
  const mockedCreatedMatch = {...matchToSave, id:1}
  const wrongMatch = {...matchToSave,awayTeam: matchToSave.homeTeam}
  const wrongClubMatch = {...matchToSave, homeTeam:42}
    
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

  describe("Quando a requisição possui uma partida com times iguais", async ()=>{
    before(async ()=>{
      chaiHttpResponse = await chai.request(app).post('/login').send(validUser);
      const{ token } = chaiHttpResponse.body
      chaiHttpResponse = await chai.request(app).post(ENDPOINT).set('authorization',token).send(wrongMatch);
    })
    
    it("Deve retornar status 401",() =>{
      expect(chaiHttpResponse).to.have.status(401);
    })
    
    it("Deve retornar a mensagem correta",() =>{
      expect(chaiHttpResponse.body.message).to.be.equal("It is not possible to create a match with two equal teams");
    })
    
  })
  
  describe("Quando a requisição possui time que não existe na tabela clubs", async ()=>{
    before(async ()=>{
      chaiHttpResponse = await chai.request(app).post('/login').send(validUser);
      const{ token } = chaiHttpResponse.body
      chaiHttpResponse = await chai.request(app).post(ENDPOINT).set('authorization',token).send(wrongClubMatch);
    })
    
    it("Deve retornar status 401",() =>{
      expect(chaiHttpResponse).to.have.status(401);
    })
    
    it("Deve retornar a mensagem correta",() =>{
      expect(chaiHttpResponse.body.message).to.be.equal("There is no team with such id!");
    })
    
  })  
  
  describe("Quando a requisição não possui um token válido", async ()=>{
    before(async ()=>{
      chaiHttpResponse = await chai.request(app).post(ENDPOINT).set('authorization','tokenInvalido').send(matchToSave);
    })
    
    it("Deve retornar status 401",() =>{
      expect(chaiHttpResponse).to.have.status(401);
    })
    
    it("Deve retornar a mensagem correta",() =>{
      expect(chaiHttpResponse.body.message).to.be.equal("Invalid Token");
    })
    
  })   
});

describe("PATCH /matchs/:id/finish",async()=>{
  const ENDPOINT = '/matchs/1/finish';
  const mockedInProgressMatch = {...matchToSave, id:1, inProgress: true}
  const response: [number,Match[]] = [1,[mockedInProgressMatch as Match]]
    
  describe("Quando a requisição possui um token válido", async ()=>{
    before(async ()=>{
      sinon.stub(Match,'update').resolves(response);
      sinon.stub(Match,'findByPk').resolves(mockedInProgressMatch as Match)
      chaiHttpResponse = await chai.request(app).post('/login').send(validUser);
      const{ token } = chaiHttpResponse.body
      chaiHttpResponse = await chai.request(app).patch(ENDPOINT).set('authorization',token);
    })
    after(async ()=>{
      (Match.update as sinon.SinonStub).restore();
      (Match.findByPk as sinon.SinonStub).restore();
    })
    
    it("Deve retornar status 200",() =>{
      expect(chaiHttpResponse).to.have.status(200);
    })
    
  })
  
  describe("Quando a requisição possui um token inválido", async ()=>{
    before(async ()=>{
      chaiHttpResponse = await chai.request(app).post(ENDPOINT).set('authorization','tokenInvalido');
    })
    
    it("Deve retornar status 401",() =>{
      expect(chaiHttpResponse).to.have.status(401);
    })
    
    it("Deve retornar a mensagem correta",() =>{
      expect(chaiHttpResponse.body.message).to.be.equal("Invalid Token");
    })
    
  })   
});


describe("PATCH /matchs/:id",async()=>{
    const ENDPOINT = '/matchs/1';
    const mockedInProgressMatch = {...matchToSave, id:1, inProgress: true}
    const mockedFinishedMatch = {...matchToSave, id:1, inProgress: false }
    const response: [number,Match[]] = [1,[mockedInProgressMatch as Match]]
    const updateMatch = {
        "homeTeamGoals": 3,
        "awayTeamGoals": 2
    }
      
    describe("Quando a requisição possui um token válido", async ()=>{
      before(async ()=>{
        sinon.stub(Match,'update').resolves(response);
        sinon.stub(Match,'findByPk').resolves(mockedInProgressMatch as Match)
        chaiHttpResponse = await chai.request(app).post('/login').send(validUser);
        const{ token } = chaiHttpResponse.body
        chaiHttpResponse = await chai.request(app).patch(ENDPOINT).set('authorization',token).send(updateMatch);
      })
      after(async ()=>{
        (Match.update as sinon.SinonStub).restore();
        (Match.findByPk as sinon.SinonStub).restore();
      })
      
      it("Deve retornar status 200",() =>{
        expect(chaiHttpResponse).to.have.status(200);
      })
      
    })

    describe("Quando a partida da requisição não existe", async ()=>{
        before(async ()=>{
          sinon.stub(Match,'findByPk').resolves(null)
          chaiHttpResponse = await chai.request(app).post('/login').send(validUser);
          const{ token } = chaiHttpResponse.body
          chaiHttpResponse = await chai.request(app).patch(ENDPOINT).set('authorization',token)
            .send({...updateMatch,id:100});
        })
        after(async ()=>{
          (Match.findByPk as sinon.SinonStub).restore();
        })
        
        it("Deve retornar status 404",() =>{
          expect(chaiHttpResponse).to.have.status(404);
        })

        it("Deve retornar a mensagem correta",() =>{
            expect(chaiHttpResponse.body.message).to.be.equal('Match not found');
          })
        
      })

      describe("Quando a partida já foi finalizada", async ()=>{
        before(async ()=>{
          sinon.stub(Match,'findByPk').resolves(mockedFinishedMatch as Match)
          chaiHttpResponse = await chai.request(app).post('/login').send(validUser);
          const{ token } = chaiHttpResponse.body
          chaiHttpResponse = await chai.request(app).patch(ENDPOINT).set('authorization',token)
            .send(updateMatch);
        })
        after(async ()=>{
          (Match.findByPk as sinon.SinonStub).restore();
        })
        
        it("Deve retornar status 401",() =>{
          expect(chaiHttpResponse).to.have.status(401);
        })

        it("Deve retornar a mensagem correta",() =>{
            expect(chaiHttpResponse.body.message).to.be.equal('Match already finished');
          })
        
      })
    
    describe("Quando a requisição possui um token inválido", async ()=>{
      before(async ()=>{
        chaiHttpResponse = await chai.request(app).post(ENDPOINT).set('authorization','tokenInvalido');
      })
      
      it("Deve retornar status 401",() =>{
        expect(chaiHttpResponse).to.have.status(401);
      })
      
      it("Deve retornar a mensagem correta",() =>{
        expect(chaiHttpResponse.body.message).to.be.equal("Invalid Token");
      })
      
    })   
  });



import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import User from '../database/models/users';

import { app } from '../app';
import { Response } from 'superagent';

import { mockedLogin, validUser, invalidUser } from './mock'
import { doesNotMatch } from 'assert';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', async () => {
  const ENDPOINT = '/login';
  let chaiHttpResponse: Response;

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

    it("Deve retornar a menssagem de erro",() =>{
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

    it("Deve retornar a menssagem de erro correta",() =>{
      expect(chaiHttpResponse.body.message).to.be.equal("All fields must be filled")
    })
  })
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

});

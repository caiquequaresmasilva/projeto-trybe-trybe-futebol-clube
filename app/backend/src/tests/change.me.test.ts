import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import User from '../database/models/users';

import { app } from '../app';
import { Response } from 'superagent';

import { mockedLogin, validUser } from './mock'

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  const ENDPOINT = '/login';
  let chaiHttpResponse: Response;

  describe("Quando o login é feito com dados válidos",()=>{

    before(async ()=>{
      sinon.stub(User,'findOne').resolves(mockedLogin as User);
      chaiHttpResponse = await chai.request(app).post(ENDPOINT).send(validUser);
    })
    after(()=>{
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

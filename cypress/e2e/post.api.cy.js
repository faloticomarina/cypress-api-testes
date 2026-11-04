/// <reference types="cypress"/>

describe('Cadastro de dispositivos', () => {

    const payload_cadastro_device = require ('../fixtures/cadastrar_device_sucesso.json')

    it.only('Cadastrar um dispositivo', () => {

        const inicioRequisicao = Date.now();

        cy.cadastrarDevice(payload_cadastro_device).then((response) => {
            expect(response.status).equal(200)
            expect(response.body.id).not.empty

            expect(response.body.createdAt).to.be.a('number')
            expect(response.body.createdAt).to.be.at.least(inicioRequisicao)

            expect(Math.abs(response.body.createdAt - Date.now()))
                .to.be.lessThan(5 * 60 * 1000)

            expect(response.body.name).equal("Samsung A71")
            expect(response.body.data.year).not.string
            expect(response.body.data.year).equal(2020)
            expect(response.body.data.price).not.string
            expect(response.body.data.price).equal(1700.99)

            expect(response.body.data['CPU model']).not.empty
            expect(response.body.data['CPU model']).equal('Intel Core i9')

            expect(response.body.data['Hard disk size']).not.empty
            expect(response.body.data['Hard disk size']).equal('1 TB')
        })
    })

    it('Cadastrar um dispositivo sem mandar dados', () => {

        cy.cadastrarDevice().then((response) => {
            expect(response.status).equal(400)
            expect(response.body.error).equal("Request body is missing")
        })
    })
})
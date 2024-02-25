process.env.NODE_ENV = 'test';
const common = require('common-module');;
let server = require('../index');
let should = common.chai.should();
var accesstoken = '';
var id = '';

common.chai.use(common.chaiHttp);
const expect = common.chai.expect;
describe("Alerts", function () {
    describe('/POST Access Token', () => {
        it("Keycloak access token", async () => {
            const response = await common.axios({
                method: 'post',
                url: 'http://192.168.1.2:8080/auth/realms/mediacare/protocol/openid-connect/token',
                data: common.qs.stringify({
                    client_id: 'nodejs-microservice',
                    grant_type: 'password',
                    scope: 'openid',
                    username: 'employee1',
                    password: '1'
                }),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            })
                .then(res => res.data)
            console.log(response);
            accesstoken = await response.access_token ? response.access_token : "";
        })
    });

    describe('/POST alerts', () => {
        it('status : 200,response: "success message with alerts created"', () => {
            common.chai.request(server)
                .post('/api/v1/alerts')
                .set({ 'Authorization': `Bearer ${accesstoken}` })
                .send({
                    "alertBackgroundColor": "#0000ff",
                    "alertForegroundColor": "#ffffff",
                    "alertIsOverlay": "0",
                    "alertMessage": "DF",
                    "alertCreatedAt": "1629175109",
                    "alertPriority": 1,
                    "alertSender": "1",
                    "alertTitle": "DF",
                    "iconurl": "",
                    "id": 1,
                    "ledId": 6
                })
                .end((err, res) => {
                    id = res.body.data._id;
                    expect(res.status).to.eql(200);

                });
        })
    });

    describe('/GET alerts', () => {
        it('status : 200,response: "success message with alerts Get"', async () => {
            common.chai.request(server)
                .get('/api/v1/alerts')
                .set({ 'Authorization': `Bearer ${accesstoken}` })
                .end((err, res) => {
                    expect(res.status).to.eql(200);
                });
        });
    });
    describe('/GETBYID alerts', () => {
        it('status : 200,response: "success message with alerts GetById"', () => {
            common.chai.request(server)
                .get(`/api/v1/alerts/${id}`)
                .set({ 'Authorization': `Bearer ${accesstoken}` })
                .end((err, res) => {
                    expect(res.status).to.eql(200);

                });
        })
    })

    describe('/UPDATE alerts', () => {
        it('status : 200,response: "success message with alerts Updated"', () => {
            common.chai.request(server)
                .put(`/api/v1/alerts/${id}`)
                .set({ 'Authorization': `Bearer ${accesstoken}` })
                .then((res) => {
                    expect(res.status).to.eql(200)

                }).catch()
        })
    })

    describe('/DELETE alerts', () => {
        it('status : 200,response: "success message with alerts Deleted"', () => {
            common.chai.request(server)
                .delete(`/api/v1/alerts/${id}`)
                .set({ 'Authorization': `Bearer ${accesstoken}` })
                .then((res) => {
                    expect(res.status).to.eql(200)

                }).catch()
        })
    })

    describe('/POST alertsAssign', () => {
        it('status : 200,response: "success message with AletsAssign"', () => {
            common.chai.request(server)
                .post('/api/v1/alertsassign')
                .set({ 'Authorization': `Bearer ${accesstoken}` })
                .send({
                    "locationId": 3,
                    "patientId": 2,
                    "alertsId": [`${id}`],
                    "event": "alerts_patient_assign",
                    "is_Assign": true
                })
                .end((err, res) => {
                    expect(res.status).to.eql(200);

                });
        })
    })

    describe('/GET alertsAssign', () => {
        it('status : 200,response: "success message with AletsAssign Get"', () => {
            common.chai.request(server)
                .get(`/api/v1/alertsassign`)
                .set({ 'Authorization': `Bearer ${accesstoken}` })
                .end((err, res) => {
                    expect(res.status).to.eql(200);

                });
        })
    })

});
const request = require('supertest');
const db = require('../config/db')
const app = require('../app')
describe('userApi test', function() {
    beforeEach(function() {
        rounter = require('../routes/userApi');

    });
    beforeAll(function() {
        db.connectDB();
    });
    afterAll(function() {
        db.closeDatabase();
    });
    it("empty test, should be error", async() => {
        const res = await request(app)
            .post("/api/users")
        expect(res.statusCode).toEqual(400);
    });
    it("correct test, should be true", async() => {
        const random = Math.floor(Math.random() * 100000);
        const res = await request(app)
            .post("/api/users")
            .send({
                name: "aaron",
                email: random + "@gmail.com",
                password: "23411rf"
            })
        expect(res.statusCode).toEqual(200);
    });
    it("empty name, should be error", async() => {
        const random = Math.floor(Math.random() * 100000);
        const res = await request(app)
            .post("/api/users")
            .send({
                name: "",
                email: random + "@gmail.com",
                password: "23411rf"
            })
        expect(res.statusCode).toEqual(400);
    });
    it("wrong mail format, should be error", async() => {
        const random = Math.floor(Math.random() * 100000);
        const res = await request(app)
            .post("/api/users")
            .send({
                name: "aaron",
                email: random + "gmail.com",
                password: "23411rf"
            })
        expect(res.statusCode).toEqual(400);
    });
    it("empty password, should be error", async() => {
        const random = Math.floor(Math.random() * 100000);
        const res = await request(app)
            .post("/api/users")
            .send({
                name: "aaron",
                email: random + "@gmail.com",
                password: ""
            })
        expect(res.statusCode).toEqual(400);
    });
});
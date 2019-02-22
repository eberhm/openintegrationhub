const getPort = require('get-port');
const supertest = require('supertest');
const conf = require('../../conf');
const iamMock = require('../../test/iamMock');
const Server = require('../../server');

let port;
let request;
let server;

describe('domains', () => {
    beforeAll(async () => {
        port = await getPort();
        request = supertest(`http://localhost:${port}${conf.apiBase}`);
        server = new Server({
            mongoDbConnection: `${global.__MONGO_URI__}-domains`,
            port,
        });
        iamMock.setup();
        await server.start();
    });

    afterAll(async () => {
        await server.stop();
    });

    test('Retrieve the available domains for the authenticated user', async () => {
        const result = (await request.get('/domains')
            .set(...global.user1)
            .expect(200)).body;

        expect(result.data).toHaveLength(0);
        expect(result.meta.page).toEqual(1);
        expect(result.meta.perPage).toEqual(10);
        expect(result.meta.total).toEqual(0);
        expect(result.meta.totalPages).toEqual(1);
    });

    test('Create a new Domain', async () => {
        const data = {
            name: 'foo',
            description: 'bar',
            public: true,
        };

        await request.post('/domains')
            .set(...global.user1)
            .send({ data })
            .expect(200);

        await request.post('/domains')
            .set(...global.user1)
            .send({ data })
            .expect(200);

        await request.post('/domains')
            .set(...global.user1)
            .send({ data })
            .expect(200);

        let result = (await request.post('/domains')
            .set(...global.user1)
            .send({ data })
            .expect(200)).body;

        Object.keys(data).forEach((key) => {
            expect(result.data[key]).toEqual(data[key]);
        });

        result = (await request.get('/domains')
            .set(...global.user1)
            .expect(200)).body;

        expect(result.data).toHaveLength(4);
        expect(result.meta.page).toEqual(1);
        expect(result.meta.perPage).toEqual(10);
        expect(result.meta.total).toEqual(4);
        expect(result.meta.totalPages).toEqual(1);
    });

    test('Retrieve a domain with given ID', async () => {
        const data = {
            name: 'foo',
            description: 'bar',
            public: true,
        };

        // create a domain
        let result = (await request.post('/domains')
            .set(...global.user1)
            .send({ data })
            .expect(200)).body;

        result = (await request.get(`/domains/${result.data._id}`)
            .set(...global.user1)
            .expect(200)).body;

        Object.keys(data).forEach((key) => {
            expect(result.data[key]).toEqual(data[key]);
        });


        // create a domain with another account
        result = (await request.post('/domains')
            .set(...global.user2)
            .send({ data })
            .expect(200)).body;

        // retrieve domain with another account
        result = (await request.get(`/domains/${result.data._id}`)
            .set(...global.user1)
            .expect(403)).body;
    });
});

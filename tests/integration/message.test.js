const request = require('supertest')
const Message = require('../../model/Message')
const db = require('../../setup/db')

const server = require('../../index');
let mockMessage;
describe("/message",()=>{

    beforeEach(()=>{
        mockMessage = {
            mid: Date.now()+'',
            text:"Hello"
        }
    })

    afterEach(async()=>{
        await Message.deleteMany();
    })

    afterAll(async()=>{
        await db.close()
        await server.close();
    })

    describe("GET /",()=>{
        it("should return all messages",async()=>{

            await Message.create(mockMessage);
            mockMessage.mid = Date.now()+'';
            await Message.create(mockMessage);

            const result = await request(server).get('/message')

            // console.log(result)
            expect(result.body).toBeTruthy();
            expect(result.body.length).toBe(2)
        })
    })

    describe("GET /:mid",()=>{
        it("should return one message",async()=>{

            mockMessage = await Message.create(mockMessage);
            

            const {body:result} = await request(server).get(`/message/${mockMessage.mid}`)

            // console.log(result)
            expect(result).toBeTruthy();
            expect(result.mid).toBe(mockMessage.mid)
            expect(result.text).toBe(mockMessage.text)
        })
    })

    describe("DELETE /:mid",()=>{
        it("should delete message with passed id",async()=>{

            mockMessage = await Message.create(mockMessage);
            

            const result = await request(server).delete(`/message/${mockMessage.mid}`)

            const messageFromDb = await Message.findOne({mid:mockMessage.mid})

            expect(result.status).toBe(200);
            expect(messageFromDb).toBeNull();
        })
    })
})
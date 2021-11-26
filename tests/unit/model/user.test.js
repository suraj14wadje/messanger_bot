const User = require('../../../model/User')
const db = require('../../../setup/db')

beforeAll(async()=> await db.connect())
afterEach(async()=>await User.deleteMany())
afterAll(()=>db.close())

let user ;
describe("User model",()=>{
    beforeEach(()=>{
        mockUser = {
            id:Date.now()+'',
            name:'Test',
            birthDate:'1999-04-14',
            state:'test'
        }
    })
    it("should create new user",async()=>{
        const userFromDb = await User.create(mockUser)
        
        expect(userFromDb).toBeTruthy()
        expect(userFromDb._id).toBeTruthy()
    })
})
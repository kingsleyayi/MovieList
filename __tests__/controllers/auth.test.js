// const { login,register } = require('../../controllers/AuthController')
// const User = require('../../models/User')

// jest.mock('../../models/User')
// const req = {
//     body:{
//         "name": "somto",
//         "email": "kingsley@gmail.com",
//         "phone": "97584864737",
//         "password": "mypass"
//     }
// };
// const response = {
//     json: jest.fn((x) => x),
// };
// describe(`user Tests Suites`, () => {
// test('login', async () => {
//    User.findOne(() => ({
//         "username": "kingsley@gmail.com",
//         "password": "mypass"
//     }));
//     await login(req,response);
//     expect(response.json).toHaveBeenCalled();
// });

// })
const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'example@example.com',
    password: 'testeteste321',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach( async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Diego',
        email: 'diego@gmail.com',
        password: 'testandoteste123'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'Diego',
            email: 'diego@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.passowrd).not.toBe('testandoteste123')
})

test('should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)

    expect(response.body.token).toBe(user.tokens[1].token)
})

test('should NOT login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'wrongpass123'
    }).expect(400)
})

test('Should get profile from user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should NOT get profile from unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete authenticated user', async () => {
    await request(app).
        delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should NOT delete authenticated user', async () => {
    await request(app).
        delete('/users/me')
        .send()
        .expect(401)
})
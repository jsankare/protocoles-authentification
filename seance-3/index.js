import jsonwebtoken from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

const payload = {
    data: {
        id: 1,
        name: 'John Doe',
        email: 'toto@mail.fr'
    }
}

const jwt = jsonwebtoken.sign(payload, secret);

console.log(jwt);







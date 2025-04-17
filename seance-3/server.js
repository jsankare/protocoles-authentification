import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const validUsers = [
    {
        email: "admin@mail.fr",
        password: "password1234"
    },
    {
        email: "toto@mail.fr",
        password: "toto1234"
    }
]

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = validUsers.find(user => user.email === email && user.password === password);

    if (user) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Identifiants invalides' });
    }
});

app.get('/api/user', (req, res) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log({token})
    try {
        console.log("try decoded")
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log({decoded})
        res.json({ email: decoded.email });
    } catch (err) {
        console.log(err)
        res.status(401).json({ error: 'Invalid token' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server has started !");
    console.log(`Server running on port ${PORT}`);
});
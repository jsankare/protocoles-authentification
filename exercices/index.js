import http from 'http';

// Hardcoded credentials
const validCredentials = {
    username: 'admin',
    password: 'password123'
};

const server = http.createServer((req, res) => {
    // Get authorization header
    // First request: no auth header, else Second request
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        // First request
        // No auth header - send 401 with auth request
        res.writeHead(401, {
            'WWW-Authenticate': 'Basic realm="Secure Area"'
        });
        res.end('Authentication required');
        return;
    }

    // Second request
    // Get credentials from auth header
    const auth = authHeader.split(' ')[1];
    const decodedAuth = Buffer.from(auth, 'base64').toString();
    const [username, password] = decodedAuth.split(':');

    // Check credentials
    if (username === validCredentials.username &&
        password === validCredentials.password) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome ' + username + '! You are authenticated.');
    } else {
        res.writeHead(401, {
            'WWW-Authenticate': 'Basic realm="Secure Area"'
        });
        res.end('Invalid credentials');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
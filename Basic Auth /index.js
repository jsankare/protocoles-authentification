import { createServer } from "http";

const server = createServer((request, response) => {
  if (request.url !== "/secret" || request.method !== "GET") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  const authorizationHeader = request.headers["authorization"];

  if (!authorizationHeader) {
    response.writeHead(401, {
      "www-authenticate": 'Basic real="Site administrateur ESGI"'
    });

    response.end("Authentification nécessaire");
    return;
  }

  const [authorizationType, authorizationValue] = authorizationHeader.split(" ");

  if (authorizationType !== "Basic") {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  const authorizationCredentials = Buffer.from(authorizationValue, "base64").toString("utf-8");
  const [username, password] = authorizationCredentials.split(":");

  if (username !== "aminnairi" || password !== "password") {
    response.writeHead(401);
    response.end("Unauthorized");
    return;
  }

  response.writeHead(200);
  response.end("Hello");
});

server.listen(8000, "0.0.0.0", () => {
  console.log("Server started on http://localhost:8000");
});
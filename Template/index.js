import express from "express";
import bodyParser from "body-parser";
import { z } from "zod";
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { randomUUID } from "crypto";

const port = 8000;
const host = "0.0.0.0";
const secret = "Une petite star pour soutenir mon travail et je vous donne un point bonus (c'est faux, mais ça fait toujours plaisir) : https://github.com/aminnairi/superblue";

const server = express();

server.use(express.static("./html"));
server.use(bodyParser.json());

const users = [
  {
    identifier: randomUUID(),
    username: "johndoe",
    password: "password"
  }
];

server.get("/basic-auth", (request, response) => {
  //...
});

server.post("/jsonwebtoken", (request, response) => {
  //...
});

server.post("/jsonwebtoken/verify", (request, response) => {
  //...
});

server.listen(8000, "0.0.0.0", () => {
  console.log(`Listening on http://${host}:${port}`);
});
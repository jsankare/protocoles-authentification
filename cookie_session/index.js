import { createServer } from "http";
import { readFile } from "fs/promises";
import { writeFile } from "fs/promises";
import { createReadStream } from "fs";
import { resolve } from "path";
import { URLSearchParams } from "url";
import { randomUUID } from "crypto";
import { getBody } from "./library/body.js";

const SESSIONS_FILE_PATH = resolve("sessions.json");

const server = createServer(async (request, response) => {
  if (request.url === "/index.html") {
    response.writeHead(200, { "Content-Type": "text/html" });
    createReadStream(resolve("index.html")).pipe(response);
    return;
  }

  if (request.url === "/login" && request.method === "POST") {
    const body = await getBody(request);
    const urlSearchParams = new URLSearchParams(body);
    const sessionFile = (await readFile(SESSIONS_FILE_PATH)).toString();
    const sessions = JSON.parse(sessionFile);
    const email = urlSearchParams.get("email");
    const sessionId = randomUUID();

    await writeFile(SESSIONS_FILE_PATH, JSON.stringify({
      ...sessions,
      [sessionId]: {
        ...sessions[sessionId] ?? {},
        email
      }
    }));

    response.writeHead(200, {
      "set-cookie": `NSESSID=${sessionId}`
    });

    response.end("Success");

    return;
  }

  if (request.url === "/profile" && request.method === "GET") {
    const rawCookies = request.headers["cookie"];
    const cookies = rawCookies.split(";");
    const cookieNameValues = cookies.map(cookie => cookie.split("="));
    const cookieMap = new Map(cookieNameValues);
    const sessionId = cookieMap.get("NSESSID");

    const rawSessions = (await readFile(SESSIONS_FILE_PATH)).toString();
    const sessions = JSON.parse(rawSessions);
    const currentSession = sessions[sessionId];
    const email = currentSession.email;
    const profileTemplate = (await readFile(resolve("templates/profile.html"))).toString();
    const profileHtml = profileTemplate.replace("{{ email }}", email);

    response.writeHead(200, {
      "Content-Type": "text/html"
    });

    response.end(profileHtml);

    return;
  }

  response.writeHead(404);
  response.end("Not found");
});

server.listen(8000, "0.0.0.0", () => {
  console.log("Server started on http://localhost:8000");
});
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const DB_DIR = path.join(__dirname, "db");

// Crea la directory dei dati locali quando non è ancora presente.
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR);
}

// Legge un file JSON e restituisce un valore predefinito in caso di assenza o errore.
function readJson(filename, defaultValue = []) {
  const filepath = path.join(DB_DIR, filename);
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, JSON.stringify(defaultValue, null, 2), "utf8");
    return defaultValue;
  }
  try {
    return JSON.parse(fs.readFileSync(filepath, "utf8"));
  } catch (e) {
    console.error(`Errore nella lettura di ${filename}:`, e);
    return defaultValue;
  }
}

// Serializza e salva i dati JSON usati dalle API locali.
function writeJson(filename, data) {
  const filepath = path.join(DB_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf8");
}

const server = http.createServer((req, res) => {
  // Imposta le intestazioni CORS per consentire richieste da dispositivi della rete locale.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Risponde alle richieste preliminari CORS senza passare alle API applicative.
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(
    req.url,
    `http://${req.headers.host || "localhost"}`
  );
  const pathname = parsedUrl.pathname;

  console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

  if (pathname === "/api/status" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", time: new Date() }));
    return;
  }

  // Espone le operazioni API per lettura e scrittura del catalogo piante.
  if (pathname === "/api/plants") {
    if (req.method === "GET") {
      const data = readJson("plants.json");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        try {
          const plants = JSON.parse(body);
          writeJson("plants.json", plants);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        } catch (e) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "JSON non valido" }));
        }
      });
    }
    return;
  }

  // Espone le operazioni API per lettura e scrittura degli utenti locali.
  if (pathname === "/api/users") {
    if (req.method === "GET") {
      const data = readJson("users.json");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        try {
          const users = JSON.parse(body);
          writeJson("users.json", users);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        } catch (e) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "JSON non valido" }));
        }
      });
    }
    return;
  }

  // Espone le operazioni API per lettura e scrittura degli ordini locali.
  if (pathname === "/api/orders") {
    if (req.method === "GET") {
      const data = readJson("orders.json");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        try {
          const orders = JSON.parse(body);
          writeJson("orders.json", orders);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        } catch (e) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "JSON non valido" }));
        }
      });
    }
    return;
  }

  // Restituisce un errore JSON per gli endpoint non gestiti dal server.
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

// Espone il server su tutte le interfacce per consentire test dai dispositivi della rete locale.
server.listen(PORT, "0.0.0.0", () => {
  console.log("--------------------------------------------------");
  console.log(` Serra DB Server in esecuzione su:`);
  console.log(` - Locale (PC): http://localhost:${PORT}`);
  console.log(` - Rete locale per iPhone: http://[IL_TUO_IP_MAC]:${PORT}`);
  console.log("--------------------------------------------------");
});

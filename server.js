const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DB_DIR = path.join(__dirname, 'db');

// Assicura che la directory db esista
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR);
}

// Funzione di utilità per leggere file JSON
function readJson(filename, defaultValue = []) {
  const filepath = path.join(DB_DIR, filename);
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, JSON.stringify(defaultValue, null, 2), 'utf8');
    return defaultValue;
  }
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch (e) {
    console.error(`Errore nella lettura di ${filename}:`, e);
    return defaultValue;
  }
}

// Funzione di utilità per scrivere file JSON
function writeJson(filename, data) {
  const filepath = path.join(DB_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
}

const server = http.createServer((req, res) => {
  // Configurazione CORS per consentire connessioni da PC e iPhone
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gestione preflight request per CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

  if (pathname === '/api/status' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', time: new Date() }));
    return;
  }

  // Gestione API Plants
  if (pathname === '/api/plants') {
    if (req.method === 'GET') {
      const data = readJson('plants.json');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const plants = JSON.parse(body);
          writeJson('plants.json', plants);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'JSON non valido' }));
        }
      });
    }
    return;
  }

  // Gestione API Users
  if (pathname === '/api/users') {
    if (req.method === 'GET') {
      const data = readJson('users.json');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const users = JSON.parse(body);
          writeJson('users.json', users);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'JSON non valido' }));
        }
      });
    }
    return;
  }

  // Gestione API Orders
  if (pathname === '/api/orders') {
    if (req.method === 'GET') {
      const data = readJson('orders.json');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const orders = JSON.parse(body);
          writeJson('orders.json', orders);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'JSON non valido' }));
        }
      });
    }
    return;
  }

  // Route non trovata
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

// Ascolto su 0.0.0.0 per consentire l'accesso sia da PC locale che da iPhone nella stessa rete Wi-Fi
server.listen(PORT, '0.0.0.0', () => {
  console.log('--------------------------------------------------');
  console.log(` Serra DB Server in esecuzione su:`);
  console.log(` - Locale (PC): http://localhost:${PORT}`);
  console.log(` - Rete locale per iPhone: http://[IL_TUO_IP_MAC]:${PORT}`);
  console.log('--------------------------------------------------');
});

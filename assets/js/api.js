// Modulo per la gestione del Database Locale e Fallback LocalStorage
(() => {
  const PORT = 3000;
  // Determina l'host per le chiamate API
  const host = window.location.hostname || "localhost";
  const apiBase = `http://${host}:${PORT}`;

  let isServerActiveCache = null;

  // Funzione helper per effettuare un fetch con timeout
  async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 1200 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(resource, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  // Verifica se il server di scrittura locale è attivo
  async function checkServerActive() {
    if (window.location.protocol === "https:") {
      // Le chiamate HTTP miste sono bloccate su pagine HTTPS (es. GitHub Pages)
      return false;
    }
    try {
      const res = await fetchWithTimeout(`${apiBase}/api/status`, {
        timeout: 180
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  // Interfaccia API globale
  const SerraAPI = {
    // Rileva se siamo connessi al server locale di scrittura
    async isServerActive() {
      if (isServerActiveCache !== null) return isServerActiveCache;
      isServerActiveCache = await checkServerActive();
      return isServerActiveCache;
    },

    // --- GESTIONE PIANTE ---
    async getPlants() {
      const serverActive = await this.isServerActive();
      if (serverActive) {
        try {
          const res = await fetchWithTimeout(`${apiBase}/api/plants`);
          if (res.ok) return await res.json();
        } catch (e) {
          console.warn(
            "Rilevato server ma errore nel caricamento piante, provo fallback...",
            e
          );
        }
      }

      // Se offline/fallback, controlla prima localStorage
      try {
        const local = localStorage.getItem("serra.custom_plants");
        if (local) return JSON.parse(local);
      } catch (e) {}

      // Se localStorage è vuoto, carica dal file statico (GitHub Pages)
      try {
        const res = await fetchWithTimeout("./db/plants.json", {
          timeout: 1500
        });
        if (res.ok) {
          const plants = await res.json();
          localStorage.setItem("serra.custom_plants", JSON.stringify(plants));
          return plants;
        }
      } catch (e) {
        console.warn("Impossibile caricare db/plants.json statico...", e);
      }

      return null;
    },

    // Carica il catalogo piante aggiornato e lo installa come window.PLANTS
    // (con aggiornamento di window.TIPO per le nuove voci). Da chiamare una
    // volta all'avvio di ogni pagina che usa il catalogo dinamico: prima era
    // duplicato identico in conf-app.js e home-app.js.
    async bootstrapPlants() {
      try {
        const customPlants = await this.getPlants();
        if (customPlants) {
          window.PLANTS = customPlants;
          customPlants.forEach((p) => {
            if (p.arch && window.TIPO) window.TIPO[p.id] = p.arch;
          });
        }
      } catch (e) {
        console.error("Errore nel caricamento del catalogo piante:", e);
      }
    },

    async savePlants(plants) {
      const serverActive = await this.isServerActive();
      if (serverActive) {
        try {
          const res = await fetch(`${apiBase}/api/plants`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(plants)
          });
          if (res.ok) return true;
        } catch (e) {
          console.error(
            "Errore nel salvataggio sul server locale, salvo in localStorage...",
            e
          );
        }
      }
      // Salvataggio locale
      localStorage.setItem("serra.custom_plants", JSON.stringify(plants));
      return true;
    },

    // --- GESTIONE UTENTI ---
    async getUsers() {
      const serverActive = await this.isServerActive();
      if (serverActive) {
        try {
          const res = await fetchWithTimeout(`${apiBase}/api/users`);
          if (res.ok) return await res.json();
        } catch (e) {}
      }

      // Se offline/fallback, controlla prima localStorage
      try {
        const local = localStorage.getItem("serra.users");
        if (local) return JSON.parse(local);
      } catch (e) {}

      // Se localStorage è vuoto, carica il default dal file statico
      try {
        const res = await fetchWithTimeout("./db/users.json", {
          timeout: 1500
        });
        if (res.ok) {
          const users = await res.json();
          localStorage.setItem("serra.users", JSON.stringify(users));
          return users;
        }
      } catch (e) {}

      // Fallback estremo di sicurezza
      const defaultUsers = [
        {
          email: "admin@ortoinserra.it",
          password: "admin",
          nome: "Admin Serra",
          indirizzo: "Sede Centrale",
          citta: "Milano",
          cap: "20100",
          telefono: "02000000",
          role: "admin"
        },
        {
          email: "user@ortoinserra.it",
          password: "password",
          nome: "Mario Rossi",
          indirizzo: "Via Roma 10",
          citta: "Milano",
          cap: "20121",
          telefono: "3331234567",
          role: "user"
        }
      ];
      localStorage.setItem("serra.users", JSON.stringify(defaultUsers));
      return defaultUsers;
    },

    async saveUsers(users) {
      const serverActive = await this.isServerActive();
      if (serverActive) {
        try {
          const res = await fetch(`${apiBase}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(users)
          });
          if (res.ok) return true;
        } catch (e) {}
      }
      localStorage.setItem("serra.users", JSON.stringify(users));
      return true;
    },

    // --- GESTIONE ORDINI ---
    async getOrders() {
      const serverActive = await this.isServerActive();
      if (serverActive) {
        try {
          const res = await fetchWithTimeout(`${apiBase}/api/orders`);
          if (res.ok) return await res.json();
        } catch (e) {}
      }

      // Se offline/fallback, controlla prima localStorage
      try {
        const local = localStorage.getItem("serra.orders");
        if (local) return JSON.parse(local);
      } catch (e) {}

      // Se localStorage è vuoto, carica dal file statico
      try {
        const res = await fetchWithTimeout("./db/orders.json", {
          timeout: 1500
        });
        if (res.ok) {
          const orders = await res.json();
          localStorage.setItem("serra.orders", JSON.stringify(orders));
          return orders;
        }
      } catch (e) {}

      return [];
    },

    async saveOrders(orders) {
      const serverActive = await this.isServerActive();
      if (serverActive) {
        try {
          const res = await fetch(`${apiBase}/api/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orders)
          });
          if (res.ok) return true;
        } catch (e) {}
      }
      localStorage.setItem("serra.orders", JSON.stringify(orders));
      return true;
    },

    getCurrentUser() {
      try {
        const user = localStorage.getItem("serra.current_user");
        return user ? JSON.parse(user) : null;
      } catch (e) {
        return null;
      }
    },

    logout() {
      localStorage.removeItem("serra.current_user");
      window.location.reload();
    },

    updateNavbarUser() {
      const user = this.getCurrentUser();
      const btn = document.getElementById("navAccountBtn");
      if (btn) {
        const ro = (document.documentElement.lang || "it")
          .toLowerCase()
          .startsWith("ro");
        if (user) {
          const firstName = user.nome.split(" ")[0];
          btn.textContent = ro
            ? `👤 Salut, ${firstName}`
            : `👤 Ciao, ${firstName}`;
        } else {
          btn.textContent = ro ? "👤 Conectare" : "👤 Accedi";
        }
      }
    }
  };

  window.SerraAPI = SerraAPI;
  // Esegui allineamento del bottone utente all'avvio della pagina
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      SerraAPI.updateNavbarUser();
    });
  } else {
    SerraAPI.updateNavbarUser();
  }
  // Riallinea il testo del bottone utente quando cambia la lingua della pagina
  new MutationObserver(() => SerraAPI.updateNavbarUser()).observe(
    document.documentElement,
    { attributes: true, attributeFilter: ["lang"] }
  );
})();

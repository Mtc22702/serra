// Operazioni carrello
function toggleCart(e, id) {
  e.stopPropagation();
  const added = !inCart(id);
  cart = added
    ? [...cart, { id, bustine: 1 }]
    : cart.filter((i) => i.id !== id);
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  showCartNudge(id, added);
  const c = document.getElementById("cartCount");
  c.classList.add("bump");
  setTimeout(() => c.classList.remove("bump"), 250);
}
// Aggiunge pair to cart
function addPairToCart(e, aId, bId) {
  e.stopPropagation();
  [aId, bId].forEach((id) => {
    if (BYID[id] && !inCart(id)) cart.push({ id, bustine: 1 });
  });
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  showCartNudge(bId, true);
  const c = document.getElementById("cartCount");
  c.classList.add("bump");
  setTimeout(() => c.classList.remove("bump"), 250);
}
// Aggiunge kit to cart
function addKitToCart() {
  const kit = KITS[state.mese];
  if (!kit) return;
  const availableIds = kit.ids.filter(
    (id) => BYID[id] && effectiveMonths(BYID[id]).has(state.mese)
  );
  availableIds.forEach((id) => {
    if (!inCart(id)) cart.push({ id, bustine: 1 });
  });
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  if (availableIds.length) showCartNudge(availableIds[0], true);
  openCart();
}
// Aggiunge kit and plan
function addKitAndPlan() {
  const kit = KITS[state.mese];
  if (!kit) return;
  const availableIds = kit.ids.filter(
    (id) => BYID[id] && effectiveMonths(BYID[id]).has(state.mese)
  );
  availableIds.forEach((id) => {
    if (!inCart(id)) cart.push({ id, bustine: 1 });
  });
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  if (availableIds.length) {
    if (typeof syncCatalogClimateToSharedConfig === "function") {
      syncCatalogClimateToSharedConfig();
    }
    window.location.href = "configuratore.html?import=cart";
  }
}
// Rimuove from cart
function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  showCartNudge(id, false);
}
// Pulisce cart
function clearCart() {
  cart = [];
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
}
// Aggiorna cart ui
function updateCartUI() {
  document.getElementById("cartCount").textContent = cart.length;
  const speciesLine = document.getElementById("cartSpeciesLine");
  if (speciesLine) {
    if (cart.length > 0) {
      speciesLine.textContent =
        cart.length === 1
          ? t("cart.species_one")
          : tv("cart.species_many", { count: cart.length });
      speciesLine.hidden = false;
    } else {
      speciesLine.hidden = true;
    }
  }

  const confHint = document.getElementById("confCartHint");
  const confHintText = document.getElementById("confCartHintText");
  const confImportBtn = document.getElementById("confImportBtn");
  if (confImportBtn) {
    const hasSeeds = cart.length > 0;
    confImportBtn.classList.toggle("disabled", !hasSeeds);
    confImportBtn.setAttribute("aria-disabled", String(!hasSeeds));
    confImportBtn.tabIndex = hasSeeds ? 0 : -1;
    if (hasSeeds) {
      confImportBtn.href = "configuratore.html?import=cart";
    } else {
      confImportBtn.removeAttribute("href");
    }
  }
  if (confHint && confHintText) {
    if (cart.length > 0) {
      const label =
        cart.length === 1
          ? t("conf.cart_hint_one")
          : tv("conf.cart_hint_many", { count: cart.length });
      confHintText.textContent = label;
      confHint.hidden = false;
    } else {
      confHintText.textContent = t("conf.cart_hint_empty");
      confHint.hidden = false;
    }
  }
  const empty = document.getElementById("cartEmpty");
  const items = document.getElementById("cartItems");
  const foot = document.getElementById("cartFooter");
  const clearBtn = document.getElementById("cartClearBtn");
  if (!cart.length) {
    empty.hidden = false;
    items.hidden = true;
    foot.hidden = true;
    if (clearBtn) clearBtn.hidden = true;
  } else {
    empty.hidden = true;
    items.hidden = false;
    foot.hidden = false;
    if (clearBtn) clearBtn.hidden = false;
    items.innerHTML =
      cart
        .map(({ id, bustine }) => {
          const p = BYID[id];
          if (!p) return "";
          const spp = seedsPerPack(id);
          const price = packPrice(id);
          const bustLabel =
            bustine === 1
              ? t("cart.pack")
              : tv("cart.pack_many", { count: bustine });
          return `<div class="cart-item">
        <img src="${photoSrc(id)}" alt="${plantName(id)}" />
        <span class="cart-item-copy">
          <span class="cart-item-name">${plantName(id)}</span>
          <span class="cart-item-meta">${plantNote(p)}</span>
          <span class="cart-item-pack">
            <span>${bustLabel} · ${tv("cart.seeds_per_pack", { count: spp })}</span>
            <b>${money(price)}${t("cart.per_pack")}</b>
          </span>
        </span>
        <button class="cart-item-remove" onclick="removeFromCart('${id}')" title="${t("cart.remove")}">✕</button>
      </div>`;
        })
        .join("") +
      `<div class="cart-total-row">
        <span>${t("cart.estimate")}</span>
        <b>${money(cart.reduce((sum, { id, bustine }) => sum + packPrice(id) * bustine, 0))}</b>
      </div>`;
  }
  if (currentDetail) {
    const btn = document.getElementById("detailAddBtn");
    if (btn) {
      const inC = inCart(currentDetail);
      btn.textContent = detailCartLabel(inC);
      btn.classList.toggle("added", inC);
    }
  }
}
// Mostra cart nudge
function showCartNudge(id, added = true) {
  const nudge = document.getElementById("cartNudge");
  const title = document.getElementById("cartNudgeTitle");
  const meta = document.getElementById("cartNudgeMeta");
  if (!nudge || !title || !meta || !BYID[id]) return;
  title.textContent = tv(added ? "cart.added_title" : "cart.removed_title", {
    name: plantName(id)
  });
  meta.textContent = tv(added ? "cart.added_meta" : "cart.removed_meta", {
    count: cart.length
  });
  nudge.classList.add("visible");
  clearTimeout(showCartNudge._timer);
  showCartNudge._timer = setTimeout(() => {
    nudge.classList.remove("visible");
  }, 3800);
}
let scrollLockCount = 0;
let bodyScrollY = 0;

// Blocca lo scroll della pagina
function lockBodyScroll() {
  if (scrollLockCount === 0) {
    bodyScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.position = "fixed";
    document.body.style.top = `-${bodyScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }
  scrollLockCount++;
}

// Ripristina lo scroll della pagina
function unlockBodyScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo({ top: bodyScrollY, behavior: "instant" });
  }
}

// Apertura e chiusura
function openCart() {
  document.getElementById("cartNudge")?.classList.remove("visible");
  lockBodyScroll();
  document.body.classList.add("cart-open");
  document.getElementById("cartOverlay").classList.add("open");
}
// Chiude il carrello
function closeCart() {
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.classList.remove("cart-open");
  unlockBodyScroll();
}
// Prepara la richiesta checkout
function alertCheckout() {
  if (!cart.length) {
    openCart();
    return;
  }

  // Controlla se l'utente è autenticato
  const user = window.SerraAPI && window.SerraAPI.getCurrentUser();
  if (!user) {
    alert(t("cart.checkout_login_required"));
    window.location.href = "account.html";
    return;
  }

  const orderItems = cart.map(({ id, bustine }) => ({
    id,
    nome: plantName(id),
    bustine,
    prezzo: packPrice(id)
  }));
  const totalVal = cart.reduce(
    (sum, { id, bustine }) => sum + packPrice(id) * bustine,
    0
  );

  window.SerraAPI.getOrders().then((orders) => {
    const newOrder = {
      id: "ORD-" + Math.floor(10000 + Math.random() * 90000),
      email: user.email,
      date: new Date().toISOString(),
      items: orderItems,
      total: totalVal,
      status: "In elaborazione"
    };
    orders.push(newOrder);
    window.SerraAPI.saveOrders(orders).then(() => {
      // Svuota il carrello dopo l'acquisto
      cart = [];
      savePrefs();
      updateCartUI();
      closeCart();

      alert(t("cart.order_success").replace("{id}", newOrder.id));
      window.location.href = "account.html";
    });
  });
}

// Blocca lo scroll durante il dettaglio
function lockDetailPageScroll() {
  lockBodyScroll();
  document.body.classList.add("detail-open");
}
// Ripristina lo scroll dopo il dettaglio
function unlockDetailPageScroll() {
  document.body.classList.remove("detail-open");
  unlockBodyScroll();
}

const DETAIL_TAB_ORDER = [
  "overview",
  "cultivation",
  "calendar",
  "care",
  "harvest"
];

// Imposta la tab dettaglio
function setDetailTab(tab, moveFocus = false) {
  if (!DETAIL_TAB_ORDER.includes(tab)) tab = "overview";
  document.querySelectorAll("[data-detail-tab]").forEach((button) => {
    const active = button.dataset.detailTab === tab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
    if (active && moveFocus) button.focus({ preventScroll: true });
  });
  document.querySelectorAll("[data-detail-panel]").forEach((panel) => {
    const active = panel.dataset.detailPanel === tab;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
    if (active) panel.scrollTo({ top: 0, behavior: "instant" });
  });
  const detailPanel = document.getElementById("detailPanel");
  if (detailPanel) {
    detailPanel.scrollTo({
      top: 0,
      behavior: "instant"
    });
    if (window.matchMedia("(max-width: 660px)").matches) {
      detailPanel
        .querySelector(".detail-scroll")
        ?.scrollTo({ top: 0, behavior: "instant" });
    }
  }
}

// Gestisce la tastiera nelle tab dettaglio
function handleDetailTabKey(event) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const current = DETAIL_TAB_ORDER.indexOf(
    event.currentTarget.dataset.detailTab
  );
  let next = current;
  if (event.key === "ArrowRight")
    next = (current + 1) % DETAIL_TAB_ORDER.length;
  if (event.key === "ArrowLeft")
    next = (current - 1 + DETAIL_TAB_ORDER.length) % DETAIL_TAB_ORDER.length;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = DETAIL_TAB_ORDER.length - 1;
  setDetailTab(DETAIL_TAB_ORDER[next], true);
}

// Profilo tecnico
function technicalProfile(p, guide) {
  const type = typeOfPlant(p);
  const name = plantName(p.id);
  const note = plantNote(p) || "";
  const ro = currentLang === "ro";
  const data = ro
    ? {
        soil: {
          frutto:
            "Sol profund, fertil și bine drenat, îmbogățit cu compost matur. Evită stagnarea apei în zona rădăcinilor.",
          foglia:
            "Sol afânat, bogat în materie organică și capabil să rămână uniform umed, fără băltire.",
          radice:
            "Sol fin, afânat și fără pietre. Evită gunoiul de grajd proaspăt, care poate deforma rădăcinile.",
          aromatica:
            "Substrat aerat și drenat. Pentru aromele mediteraneene este preferabil un sol mai slab și mai uscat.",
          legume:
            "Sol drenat și moderat fertil. Nu exagera cu azotul: favorizează frunzele în detrimentul păstăilor."
        },
        feed: {
          frutto:
            "Încorporează compost înainte de plantare; de la înflorire folosește un fertilizant echilibrat, mai bogat în potasiu.",
          foglia:
            "Compost matur înainte de semănat și aporturi ușoare de azot doar dacă creșterea încetinește.",
          radice:
            "Fertilizare moderată, cu puțin azot și suficient potasiu. Excesul produce multe frunze și rădăcini slabe.",
          aromatica:
            "Fertilizare redusă: excesul de azot diluează aroma și face țesuturile mai fragile.",
          legume:
            "De obicei compostul matur este suficient; leguminoasele fixează azot și nu cer fertilizări puternice."
        },
        maintain: {
          frutto:
            "Leagă plantele înalte, aerisește frunzișul și îndepărtează frunzele bolnave. Recoltarea regulată stimulează producția.",
          foglia:
            "Rărește la timp, menține solul curat și recoltează frunzele exterioare fără a răni centrul plantei.",
          radice:
            "Rărește devreme, elimină buruienile manual și evită lucrările adânci care pot răni rădăcinile.",
          aromatica:
            "Ciupirea vârfurilor menține planta compactă. Îndepărtează florile dacă urmărești producția de frunze.",
          legume:
            "Oferă suport soiurilor cățărătoare, menține baza aerisită și recoltează păstăile frecvent."
        },
        problems: {
          frutto:
            "În seră pot apărea afide, musculița albă, acarieni și boli foliare. Căldura excesivă poate reduce legarea fructelor.",
          foglia:
            "Urmărește afidele, limacșii și mucegaiurile. Umiditatea stagnantă favorizează putregaiurile și mana.",
          radice:
            "Muștele rădăcinilor, viermii și putregaiurile sunt riscurile principale. Solul compact provoacă rădăcini deformate.",
          aromatica:
            "Cele mai frecvente probleme sunt afidele, făinarea și putrezirea coletului din cauza excesului de apă.",
          legume:
            "Afidele, acarienii și făinarea sunt frecvente. Umiditatea neregulată poate opri formarea păstăilor."
        },
        prevent:
          "Aerisește sera zilnic, udă dimineața la baza plantei, nu înghesui culturile și îndepărtează imediat țesuturile bolnave. Rotește familiile botanice între cicluri.",
        harvest: {
          frutto:
            "Recoltează fructele când au atins culoarea și consistența tipice soiului, folosind o foarfecă curată pentru a nu rupe ramurile.",
          foglia:
            "Taie dimineața frunzele fragede și turgescente. Recoltează progresiv sau taie întreaga rozetă deasupra coletului.",
          radice:
            "Verifică dimensiunea la colet și extrage pe sol ușor umed. Nu aștepta prea mult: rădăcinile pot deveni fibroase.",
          aromatica:
            "Taie vârfurile înainte de înflorirea completă, dimineața după uscarea rouei, pentru aromă maximă.",
          legume:
            "Culege păstăile tinere și ferme la intervale scurte. Recoltarea continuă încurajează apariția altor flori."
        },
        storage: {
          frutto:
            "Păstrează doar exemplarele sănătoase și uscate. Consumă rapid fructele delicate; cele mature se țin la răcoare și aerisit.",
          foglia:
            "Răcește imediat după recoltare și păstrează în frigider, într-un recipient aerisit cu hârtie ușor umedă.",
          radice:
            "Îndepărtează frunzele, nu spăla înainte de depozitare și păstrează la rece, întuneric și umiditate controlată.",
          aromatica:
            "Folosește proaspătă, congelează frunzele curate sau usucă lent la umbră, într-un spațiu ventilat.",
          legume:
            "Consumă păstăile proaspete repede; pentru păstrare mai lungă opărește și congelează sau lasă semințele să se usuce complet."
        },
        rotation:
          "După recoltare, îndepărtează resturile și evită să replantezi aceeași familie în același loc în ciclul următor."
      }
    : {
        soil: {
          frutto:
            "Terreno profondo, fertile e ben drenato, arricchito con compost maturo. Evita ristagni nella zona delle radici.",
          foglia:
            "Terreno soffice, ricco di sostanza organica e capace di restare uniformemente umido senza ristagni.",
          radice:
            "Terreno fine, sciolto e privo di sassi. Evita letame fresco, che può deformare o biforcare le radici.",
          aromatica:
            "Substrato arioso e drenante. Per le aromatiche mediterranee è preferibile un terreno non troppo ricco e più asciutto.",
          legume:
            "Terreno drenato e moderatamente fertile. Non eccedere con l'azoto: favorisce le foglie a scapito dei baccelli."
        },
        feed: {
          frutto:
            "Incorpora compost prima del trapianto; dalla fioritura usa una concimazione equilibrata, con maggiore disponibilità di potassio.",
          foglia:
            "Compost maturo prima della semina e piccoli apporti azotati solo se la crescita rallenta o le foglie impallidiscono.",
          radice:
            "Concimazione moderata, con poco azoto e buon apporto di potassio. Gli eccessi producono molte foglie e radici deboli.",
          aromatica:
            "Concima poco: troppo azoto diluisce aroma e oli essenziali e rende i tessuti più fragili.",
          legume:
            "Di norma basta il compost maturo; le leguminose fissano azoto e non richiedono concimazioni spinte."
        },
        maintain: {
          frutto:
            "Sostieni le piante alte, arieggia la chioma e rimuovi le foglie malate. Raccogliere con regolarità mantiene produttiva la pianta.",
          foglia:
            "Dirada per tempo, mantieni il terreno pulito e raccogli le foglie esterne senza danneggiare il cuore della pianta.",
          radice:
            "Dirada presto, elimina le infestanti a mano ed evita lavorazioni profonde che possano ferire le radici.",
          aromatica:
            "Cimare gli apici mantiene la pianta compatta. Elimina i fiori se vuoi prolungare la produzione di foglie.",
          legume:
            "Predisponi sostegni per le varietà rampicanti, mantieni arieggiata la base e raccogli spesso i baccelli."
        },
        problems: {
          frutto:
            "In serra controlla afidi, mosca bianca, ragnetto rosso e malattie fogliari. Il caldo eccessivo può ridurre l'allegagione.",
          foglia:
            "Controlla afidi, limacce e muffe. Umidità stagnante e foglie sempre bagnate favoriscono marciumi e peronospora.",
          radice:
            "Mosche delle radici, larve terricole e marciumi sono i rischi principali. Il suolo compatto provoca radici deformate.",
          aromatica:
            "I problemi più comuni sono afidi, oidio e marciume del colletto causato da irrigazioni eccessive.",
          legume:
            "Afidi, ragnetto e oidio sono frequenti. Sbalzi idrici e caldo eccessivo possono bloccare la formazione dei baccelli."
        },
        prevent:
          "Arieggia la serra ogni giorno, irriga al mattino alla base, non affollare le colture e rimuovi subito i tessuti malati. Alterna le famiglie botaniche tra un ciclo e l'altro.",
        harvest: {
          frutto:
            "Raccogli quando il frutto ha raggiunto colore e consistenza tipici della varietà, usando forbici pulite per non strappare i rami.",
          foglia:
            "Taglia al mattino foglie giovani e turgide. Raccogli progressivamente oppure recidi l'intera rosetta appena sopra il colletto.",
          radice:
            "Controlla il diametro al colletto ed estrai con terreno leggermente umido. Non aspettare troppo: le radici possono diventare fibrose.",
          aromatica:
            "Taglia gli apici prima della piena fioritura, al mattino dopo che la rugiada è asciutta, per conservare il massimo aroma.",
          legume:
            "Raccogli baccelli giovani e sodi a intervalli brevi. La raccolta continua stimola la formazione di nuovi fiori."
        },
        storage: {
          frutto:
            "Conserva solo frutti sani e asciutti. Consuma presto quelli delicati; quelli maturi vanno tenuti in luogo fresco e ventilato.",
          foglia:
            "Raffredda subito dopo la raccolta e conserva in frigorifero, in un contenitore aerato con carta appena umida.",
          radice:
            "Elimina le foglie, non lavare prima dello stoccaggio e conserva al fresco, al buio e con umidità controllata.",
          aromatica:
            "Usa fresca, congela le foglie pulite oppure essicca lentamente all'ombra in un luogo ben ventilato.",
          legume:
            "Consuma rapidamente i baccelli freschi; per conservarli più a lungo sbollenta e congela, oppure lascia seccare completamente i semi."
        },
        rotation:
          "Dopo la raccolta elimina i residui e non ripiantare la stessa famiglia botanica nello stesso spazio nel ciclo successivo."
      };

  const water =
    guide?.annaffiatura ||
    (ro
      ? "Udă regulat, verificând umiditatea sub stratul superficial."
      : "Irriga con regolarità controllando l'umidità sotto lo strato superficiale.");
  const exposure = guide?.esposizione || sunLabel(p);
  const description = [
    note,
    ro
      ? `${name} se cultivă în seră cu expunere ${exposure.toLowerCase()} și necesar de apă ${t(`water.${p.acqua}`).toLowerCase()}. Ciclul orientativ până la recoltare este de ${daysLabel(p, true).toLowerCase()}.`
      : `${name} si coltiva in serra con esposizione ${exposure.toLowerCase()} e fabbisogno idrico ${t(`water.${p.acqua}`).toLowerCase()}. Il ciclo indicativo fino alla raccolta è di ${daysLabel(p, true).toLowerCase()}.`
  ]
    .filter(Boolean)
    .join(" ");

  return {
    description,
    cultivation: [
      [t("detail.tech_soil"), data.soil[type]],
      [t("detail.tech_exposure"), exposure],
      [t("detail.tech_irrigation"), water],
      [t("detail.tech_feeding"), data.feed[type]]
    ],
    care: [
      [t("detail.tech_maintenance"), data.maintain[type]],
      [t("detail.tech_problems"), data.problems[type]],
      [t("detail.tech_prevention"), data.prevent],
      [t("detail.tech_rotation"), data.rotation]
    ],
    harvest: [
      [
        t("detail.tech_maturity"),
        ro
          ? `În medie ${daysLabel(p, true).toLowerCase()}, în funcție de soi, temperatură și lumină.`
          : `In media ${daysLabel(p, true).toLowerCase()}, secondo varietà, temperatura e luce.`
      ],
      [t("detail.tech_harvest_method"), data.harvest[type]],
      [
        t("detail.tech_yield"),
        ro
          ? `Producție orientativă: ${yieldLabel(p)}. Recoltarea regulată îmbunătățește continuitatea.`
          : `Produzione indicativa: ${yieldLabel(p)}. Una raccolta regolare migliora la continuità.`
      ],
      [t("detail.tech_storage"), data.storage[type]]
    ]
  };
}

// Renderizza technical cards
function renderTechnicalCards(items) {
  return items
    .map(
      ([title, text], index) =>
        `<article class="detail-tech-card${index === items.length - 1 && items.length % 2 ? " detail-tech-card--wide" : ""}"><h4>${title}</h4><p>${text}</p></article>`
    )
    .join("");
}

const DISEASE_GROUPS = {
  solanaceae: ["late_blight", "alternaria", "botrytis"],
  cucurbitaceae: ["powdery", "downy", "botrytis"],
  brassicaceae: ["downy", "alternaria", "clubroot"],
  allium: ["downy", "white_rot", "rust"],
  apiaceae: ["cercospora", "sclerotinia", "powdery"],
  leafy: ["downy", "botrytis", "sclerotinia"],
  chenopods: ["downy", "cercospora", "damping_off"],
  legumes: ["anthracnose", "rust", "powdery"],
  herbs: ["powdery", "root_rot", "rust"],
  basil: ["basil_downy", "fusarium", "botrytis"],
  strawberry: ["botrytis", "powdery", "root_rot"],
  corn: ["fusarium", "rust", "leaf_spot"],
  asparagus: ["rust", "fusarium", "leaf_spot"],
  artichoke: ["botrytis", "powdery", "verticillium"],
  okra: ["powdery", "verticillium", "botrytis"],
  flowers: ["powdery", "botrytis", "root_rot"],
  sweet_potato: ["black_rot", "fusarium", "root_rot"],
  watercress: ["downy", "root_rot", "leaf_spot"],
  topinambur: ["sclerotinia", "powdery", "botrytis"]
};

const DISEASE_PLANT_GROUP = {};

// Assegna il gruppo malattie alla pianta
function assignDiseaseGroup(group, ids) {
  ids.forEach((id) => {
    DISEASE_PLANT_GROUP[id] = group;
  });
}
assignDiseaseGroup("solanaceae", [
  "pomodoro",
  "peperone",
  "peperoncino",
  "melanzana",
  "patata",
  "tomatillo",
  "physalis",
  "friggitello"
]);
assignDiseaseGroup("cucurbitaceae", [
  "zucchina",
  "zucca",
  "cetriolo",
  "melone",
  "anguria",
  "cucamelon"
]);
assignDiseaseGroup("brassicaceae", [
  "rucola",
  "cavolo",
  "verza",
  "broccolo",
  "cavolfiore",
  "cavolonero",
  "cavolorapa",
  "ravanello",
  "rafano",
  "pakchoi",
  "cavoletti",
  "rapa",
  "mizuna",
  "senape_foglia",
  "tatsoi",
  "cavolo_cinese",
  "daikon",
  "cavolo_rosso",
  "cavolo_navone",
  "broccolo_rapa",
  "broccolo_romanesco"
]);
assignDiseaseGroup("allium", [
  "cipolla",
  "aglio",
  "porro",
  "scalogno",
  "cipolla_rossa",
  "cipollotto",
  "erba_cipollina"
]);
assignDiseaseGroup("apiaceae", [
  "carota",
  "finocchio",
  "prezzemolo",
  "coriandolo",
  "aneto",
  "sedano",
  "pastinaca",
  "radice_prezemolo",
  "sedano_rapa",
  "leustean"
]);
assignDiseaseGroup("leafy", [
  "lattuga",
  "radicchio",
  "cicoria",
  "indivia",
  "valerianella",
  "cardo",
  "scorzonera",
  "catalogna",
  "agretti",
  "acetosa"
]);
assignDiseaseGroup("chenopods", [
  "spinaci",
  "bietola",
  "barbabietola",
  "loboda"
]);
assignDiseaseGroup("legumes", [
  "fagiolino",
  "fagiolo",
  "pisello",
  "fava",
  "soia_edamame",
  "cece",
  "lenticchia",
  "fagiolo_borlotto"
]);
assignDiseaseGroup("herbs", [
  "rosmarino",
  "timo",
  "origano",
  "salvia",
  "stevia_dolce",
  "dragoncello",
  "menta",
  "maggiorana",
  "shiso",
  "melissa",
  "cerfoglio",
  "cimbru"
]);
assignDiseaseGroup("basil", ["basilico"]);
assignDiseaseGroup("strawberry", ["fragola"]);
assignDiseaseGroup("corn", ["mais_dolce"]);
assignDiseaseGroup("asparagus", ["asparago"]);
assignDiseaseGroup("artichoke", ["carciofo"]);
assignDiseaseGroup("flowers", ["camomilla", "borragine"]);
assignDiseaseGroup("allium_wild", ["leurda"]);
assignDiseaseGroup("sweet_potato", ["patata_dolce"]);
assignDiseaseGroup("watercress", ["crescione"]);
assignDiseaseGroup("topinambur", ["topinambur"]);

// Restituisce il catalogo malattie
function diseaseCatalog() {
  const ro = currentLang === "ro";
  const it = {
    late_blight: [
      "Peronospora delle solanacee",
      "Macchie scure e irregolari su foglie e fusti; con forte umidità compare una muffa chiara sotto la foglia e i frutti possono imbrunire.",
      "Rimuovi subito le parti colpite, riduci la bagnatura fogliare e aumenta il ricambio d'aria. Nei casi iniziali valuta un prodotto rameico autorizzato per coltura e avversità."
    ],
    alternaria: [
      "Alternariosi",
      "Macchie brune concentriche, spesso simili a un bersaglio, che partono dalle foglie più vecchie e possono raggiungere fusti o frutti.",
      "Elimina foglie e residui infetti, irriga alla base e pratica la rotazione. Proteggi preventivamente solo con prodotti autorizzati se il problema si ripete."
    ],
    botrytis: [
      "Muffa grigia (Botrite)",
      "Tessuti molli e bruniti ricoperti da una polvere grigia, soprattutto su fiori, frutti o foglie ferite.",
      "Asporta le parti colpite senza scuotere le spore, arieggia e dirada la chioma. Evita condensa, ristagni e irrigazioni serali."
    ],
    powdery: [
      "Oidio o mal bianco",
      "Patina bianca farinosa sulle foglie, deformazioni e progressivo ingiallimento; favorito da aria ferma e forti sbalzi termici.",
      "Rimuovi le foglie più colpite, migliora ventilazione e distanza tra piante. Intervieni precocemente con zolfo o altro prodotto autorizzato e compatibile con la coltura."
    ],
    downy: [
      "Peronospora",
      "Chiazze gialle o traslucide sulla pagina superiore e muffa grigiastra o violacea sotto le foglie; sviluppo rapido con elevata umidità.",
      "Togli le foglie malate, irriga al mattino senza bagnare la vegetazione e arieggia. Nei periodi a rischio usa solo prodotti preventivi autorizzati."
    ],
    clubroot: [
      "Ernia delle crucifere",
      "Piante stentate che appassiscono nelle ore calde; le radici presentano rigonfiamenti e deformazioni evidenti.",
      "Non esiste una cura sulla pianta colpita: rimuovila con le radici. Correggi i terreni troppo acidi, migliora il drenaggio e sospendi le brassicacee nello stesso spazio per diversi cicli."
    ],
    white_rot: [
      "Marciume bianco degli alli",
      "Ingiallimento dall'apice, crescita debole e marciume alla base con feltro bianco e piccoli corpuscoli scuri.",
      "Elimina pianta e terreno aderente, non compostare i residui e disinfetta gli attrezzi. Evita di coltivare alli nello stesso suolo per più anni."
    ],
    rust: [
      "Ruggine",
      "Pustole arancioni, brune o scure sulla pagina inferiore delle foglie, seguite da ingiallimento e disseccamento.",
      "Rimuovi le foglie molto colpite, migliora l'aria e non eccedere con azoto. Se necessario usa un fungicida autorizzato intervenendo ai primi sintomi."
    ],
    cercospora: [
      "Cercosporiosi",
      "Numerose macchie piccole, tonde, con centro chiaro e margine scuro; nei casi gravi le foglie seccano prematuramente.",
      "Elimina i residui infetti, evita di bagnare le foglie e aumenta la distanza. Ruota le colture e proteggi solo con prodotti registrati quando le condizioni restano favorevoli."
    ],
    sclerotinia: [
      "Marciume da Sclerotinia",
      "Avvizzimento improvviso, marciume acquoso al colletto e muffa bianca cotonosa con corpi scuri all'interno.",
      "Rimuovi completamente piante e residui, riduci umidità e densità della coltura. Non interrare il materiale infetto e alterna con colture meno sensibili."
    ],
    damping_off: [
      "Moria delle piantine",
      "Le giovani piantine collassano al livello del terreno; il colletto diventa sottile, scuro o acquoso.",
      "Non recuperare le piantine collassate. Usa substrato pulito, contenitori disinfettati, semina meno fitta e bagna senza saturare il terriccio."
    ],
    anthracnose: [
      "Antracnosi",
      "Lesioni scure e infossate su foglie, steli o baccelli; con umidità possono comparire masse di spore rosate.",
      "Rimuovi le parti infette, usa seme sano e non lavorare le piante bagnate. Ruota le leguminose e valuta un prodotto autorizzato ai primi sintomi."
    ],
    root_rot: [
      "Marciume radicale",
      "Crescita lenta, foglie pallide e appassimento nonostante il terreno umido; le radici diventano brune e molli.",
      "Riduci l'acqua, migliora drenaggio e aerazione del substrato. Elimina le piante gravemente colpite e rinnova il terriccio contaminato."
    ],
    basil_downy: [
      "Peronospora del basilico",
      "Ingiallimento tra le nervature e muffa grigio-violacea sotto le foglie; il profumo e la qualità calano rapidamente.",
      "Elimina subito le piante colpite, irriga solo alla base e arieggia. Usa varietà tolleranti e non conservare seme da piante malate."
    ],
    fusarium: [
      "Fusariosi",
      "Ingiallimento progressivo, appassimento e imbrunimento dei vasi interni; spesso un lato della pianta deperisce prima dell'altro.",
      "Non esiste una cura affidabile sulla pianta infetta: rimuovila. Usa substrato sano, varietà resistenti quando disponibili e una lunga rotazione."
    ],
    leaf_spot: [
      "Maculatura fogliare",
      "Macchie brune o grigiastre con bordo definito, che aumentano e confluiscono fino a seccare porzioni di foglia.",
      "Rimuovi le foglie malate, riduci umidità e spruzzi sulla chioma, disinfetta gli attrezzi. Tratta soltanto se necessario con un prodotto specificamente autorizzato."
    ],
    verticillium: [
      "Verticilliosi",
      "Avvizzimento graduale, ingiallimenti spesso asimmetrici e vasi interni bruni, mentre il terreno resta umido.",
      "Rimuovi le piante colpite e il maggior numero possibile di radici. Evita di riutilizzare il substrato e scegli colture non sensibili nei cicli successivi."
    ],
    black_rot: [
      "Marciume nero",
      "Lesioni scure e depresse su fusti o organi di riserva, con tessuti interni anneriti e sapore amaro.",
      "Elimina il materiale infetto, usa solo propagazione sana e disinfetta cassette e attrezzi. Conserva in ambiente asciutto e non ferire gli organi durante la raccolta."
    ]
  };
  if (!ro) return it;
  return {
    late_blight: [
      "Mana solanaceelor",
      "Pete întunecate neregulate pe frunze și tulpini; la umiditate ridicată apare un puf deschis pe dosul frunzei, iar fructele se brunifică.",
      "Îndepărtează imediat părțile afectate, nu uda frunzișul și aerisește. La debut se poate folosi un produs cupric autorizat pentru cultură și boală."
    ],
    alternaria: [
      "Alternarioză",
      "Pete brune concentrice, ca o țintă, pornind de pe frunzele bătrâne și uneori extinzându-se pe tulpini sau fructe.",
      "Elimină frunzele și resturile bolnave, udă la bază și rotește culturile. Folosește preventiv numai produse autorizate dacă problema reapare."
    ],
    botrytis: [
      "Putregai cenușiu (Botrytis)",
      "Țesuturi moi, brunificate, acoperite cu pulbere cenușie, mai ales pe flori, fructe sau răni.",
      "Îndepărtează părțile bolnave fără a răspândi sporii, aerisește și rărește frunzișul. Evită condensul și udarea seara."
    ],
    powdery: [
      "Făinare",
      "Depunere albă făinoasă pe frunze, deformări și îngălbenire treptată; este favorizată de aer stagnant și variații termice.",
      "Îndepărtează frunzele foarte afectate și îmbunătățește aerisirea. Intervino devreme cu sulf sau alt produs autorizat și compatibil cu cultura."
    ],
    downy: [
      "Mană",
      "Pete galbene sau translucide deasupra și puf cenușiu-violaceu pe dosul frunzelor; evoluează rapid la umiditate ridicată.",
      "Elimină frunzele bolnave, udă dimineața la bază și aerisește. În perioadele de risc folosește numai produse preventive autorizate."
    ],
    clubroot: [
      "Hernia rădăcinilor la crucifere",
      "Plante pipernicite care se ofilesc la căldură; rădăcinile au umflături și deformări evidente.",
      "Planta bolnavă nu se vindecă: scoate-o cu rădăcină. Corectează solul prea acid, îmbunătățește drenajul și evită cruciferele mai multe cicluri."
    ],
    white_rot: [
      "Putregaiul alb al cepei",
      "Îngălbenire de la vârf, creștere slabă și putregai la bază cu pâslă albă și mici corpuri negre.",
      "Elimină planta și solul lipit, nu composta resturile și dezinfectează uneltele. Nu cultiva plante din genul Allium în același sol mai mulți ani."
    ],
    rust: [
      "Rugină",
      "Pustule portocalii, brune sau negre pe dosul frunzelor, urmate de îngălbenire și uscare.",
      "Îndepărtează frunzele afectate, aerisește și nu exagera cu azotul. Dacă este necesar, aplică devreme un fungicid autorizat."
    ],
    cercospora: [
      "Cercosporioză",
      "Multe pete mici, rotunde, cu centru deschis și margine închisă; atacul puternic usucă frunzele prematur.",
      "Elimină resturile infectate, nu uda frunzișul și mărește distanța. Rotește culturile și folosește numai produse înregistrate."
    ],
    sclerotinia: [
      "Putregai alb produs de Sclerotinia",
      "Ofilire bruscă, putregai apos la colet și mucegai alb vată cu formațiuni negre.",
      "Scoate complet plantele și resturile, reduce umiditatea și densitatea. Nu îngropa materialul infectat și alternează cu plante mai puțin sensibile."
    ],
    damping_off: [
      "Căderea plăntuțelor",
      "Plăntuțele se prăbușesc la nivelul solului; coletul devine subțire, închis sau apos.",
      "Plăntuțele căzute nu se recuperează. Folosește substrat curat, recipiente dezinfectate, seamănă mai rar și nu îmbiba solul."
    ],
    anthracnose: [
      "Antracnoză",
      "Leziuni întunecate și adâncite pe frunze, tulpini sau păstăi; la umezeală apar mase rozalii de spori.",
      "Îndepărtează părțile bolnave, folosește sămânță sănătoasă și nu lucra plantele ude. Rotește leguminoasele și tratează numai cu produse autorizate."
    ],
    root_rot: [
      "Putregai radicular",
      "Creștere lentă, frunze palide și ofilire deși solul este umed; rădăcinile devin brune și moi.",
      "Redu udarea și îmbunătățește drenajul și aerarea. Elimină plantele grav afectate și schimbă substratul contaminat."
    ],
    basil_downy: [
      "Mana busuiocului",
      "Îngălbenire între nervuri și puf cenușiu-violet sub frunze; aroma și calitatea scad rapid.",
      "Elimină imediat plantele bolnave, udă doar la bază și aerisește. Folosește soiuri tolerante și nu păstra semințe de la plante afectate."
    ],
    fusarium: [
      "Fuzarioză",
      "Îngălbenire progresivă, ofilire și brunificarea vaselor interne; uneori o parte a plantei moare prima.",
      "Planta infectată nu are tratament sigur: elimin-o. Folosește substrat sănătos, soiuri rezistente și rotație lungă."
    ],
    leaf_spot: [
      "Pătarea frunzelor",
      "Pete brune sau cenușii cu margine clară, care cresc și se unesc până usucă porțiuni din frunză.",
      "Îndepărtează frunzele bolnave, reduce umiditatea pe frunziș și dezinfectează uneltele. Tratează numai cu un produs autorizat specific."
    ],
    verticillium: [
      "Verticilioză",
      "Ofilire lentă, îngălbenire adesea asimetrică și vase interne brune, deși solul rămâne umed.",
      "Elimină plantele și cât mai multe rădăcini. Nu reutiliza substratul și alege culturi nesensibile în ciclurile următoare."
    ],
    black_rot: [
      "Putregai negru",
      "Leziuni închise și adâncite pe tulpini sau organe de rezervă, cu țesut intern negru și gust amar.",
      "Elimină materialul bolnav, folosește numai material de înmulțire sănătos și dezinfectează uneltele. Păstrează uscat și evită rănirea la recoltare."
    ]
  };
}

// Malattie e parassiti
function diseasesForPlant(p) {
  const group =
    DISEASE_PLANT_GROUP[p.id] ||
    {
      frutto: "solanaceae",
      foglia: "leafy",
      radice: "chenopods",
      aromatica: "herbs",
      legume: "legumes"
    }[typeOfPlant(p)];
  const catalog = diseaseCatalog();
  return (DISEASE_GROUPS[group] || DISEASE_GROUPS.leafy)
    .map((key) => catalog[key])
    .filter(Boolean)
    .map(([name, symptoms, action]) => ({ name, symptoms, action }));
}

// Renderizza plant diseases
function renderPlantDiseases(p) {
  const diseases = diseasesForPlant(p);
  const count = document.getElementById("detailDiseasesCount");
  const list = document.getElementById("detailDiseaseList");
  if (count)
    count.textContent = tv("detail.diseases_count", { count: diseases.length });
  if (!list) return;
  list.innerHTML = diseases
    .map(
      (disease) =>
        `<details class="detail-disease-card">
      <summary><span class="detail-disease-marker" aria-hidden="true"></span><span>${disease.name}</span><span class="detail-disease-toggle" aria-hidden="true">+</span></summary>
      <div class="detail-disease-body">
        <div class="detail-disease-info"><b>${t("detail.disease_symptoms")}</b><p>${disease.symptoms}</p></div>
        <div class="detail-disease-info detail-disease-info--action"><b>${t("detail.disease_action")}</b><p>${disease.action}</p></div>
      </div>
    </details>`
    )
    .join("");
}

const PEST_GROUPS = {
  solanaceae: ["aphids", "whiteflies", "spider_mites"],
  cucurbitaceae: ["aphids", "whiteflies", "spider_mites"],
  brassicaceae: ["flea_beetles", "caterpillars", "aphids"],
  allium: ["thrips", "onion_fly", "leafminers"],
  apiaceae: ["carrot_fly", "aphids", "leafminers"],
  leafy: ["flea_beetles", "slugs", "aphids"],
  chenopods: ["leafminers", "aphids", "flea_beetles"],
  legumes: ["aphids", "weevils", "spider_mites"],
  herbs: ["aphids", "whiteflies", "spider_mites"],
  basil: ["aphids", "thrips", "slugs"],
  strawberry: ["spider_mites", "aphids", "slugs"],
  other: ["aphids", "slugs", "thrips"]
};

// Restituisce il catalogo parassiti
function pestCatalog() {
  if (currentLang === "ro")
    return {
      aphids: [
        "Afide",
        "Colonii de insecte mici pe lăstari și sub frunze, frunze răsucite și secreții lipicioase.",
        "Îndepărtează jeturile mici cu apă, taie vârfurile foarte atacate și favorizează buburuzele. Dacă persistă, folosește săpun moale autorizat."
      ],
      whiteflies: [
        "Musculița albă",
        "Nori de insecte albe la atingerea plantei, frunze lipicioase și îngălbenite.",
        "Folosește capcane galbene pentru monitorizare, aspiră adulții dimineața și îndepărtează frunzele puternic infestate."
      ],
      spider_mites: [
        "Acarianul roșu",
        "Puncte galbene fine, aspect bronzat și pânze subțiri sub frunze, mai ales în aer cald și uscat.",
        "Mărește umiditatea fără a crea condens, spală dosul frunzelor și elimină focarele; introdu acarieni prădători dacă sunt disponibili."
      ],
      flea_beetles: [
        "Purici de pământ (altice)",
        "Gândăcei mici, adesea negri, care sar și lasă multe găuri rotunde mici în frunze.",
        "Protejează plantele tinere cu plasă fină, elimină buruienile crucifere, menține solul uniform umed și intervino devreme."
      ],
      caterpillars: [
        "Omizi",
        "Găuri neregulate, margini roase și granule întunecate pe frunze; omizile se ascund adesea pe dos.",
        "Inspectează și îndepărtează manual, folosește plasă anti-insecte și, la atac confirmat, un produs cu Bacillus thuringiensis autorizat."
      ],
      thrips: [
        "Trips",
        "Dungi argintii, puncte negre și frunze deformate; insecte foarte subțiri ascunse în pliuri.",
        "Folosește capcane albastre pentru monitorizare, îndepărtează părțile atacate și evită aerul foarte uscat."
      ],
      onion_fly: [
        "Musca cepei",
        "Plante care se îngălbenesc și se desprind ușor; larve albe în bulb sau la bază.",
        "Scoate plantele atacate, folosește plasă fină și rotește culturile de Allium; nu lăsa bulbi bolnavi în sol."
      ],
      leafminers: [
        "Minatori foliari",
        "Galerii deschise și șerpuitoare în interiorul frunzei.",
        "Îndepărtează frunzele cu galerii înainte ca larva să iasă, folosește plasă fină și capcane adezive pentru monitorizare."
      ],
      carrot_fly: [
        "Musca morcovului",
        "Frunziș roșiatic și galerii ruginii în rădăcini, uneori cu gust amar.",
        "Protejează cu plasă fină, rărește fără a lăsa resturi lângă cultură și rotește plantele umbelifere."
      ],
      slugs: [
        "Limacși și melci",
        "Găuri mari neregulate, margini roase și urme lucioase de mucus.",
        "Culege seara, elimină ascunzătorile umede și folosește bariere sau momeli autorizate pe bază de fosfat feric."
      ],
      weevils: [
        "Gărgărițe",
        "Margini frunzelor ciupite și semințe sau păstăi perforate; adulți mici și închiși la culoare.",
        "Îndepărtează adulții, resturile și semințele infestate, rotește cultura și folosește plasă în perioadele de zbor."
      ]
    };
  return {
    aphids: [
      "Afidi",
      "Colonie di piccoli insetti su germogli e pagina inferiore, foglie arricciate e melata appiccicosa.",
      "Rimuovi piccoli focolai con acqua, taglia gli apici molto infestati e favorisci le coccinelle. Se persistono, usa sapone molle autorizzato."
    ],
    whiteflies: [
      "Mosca bianca",
      "Nuvole di insetti bianchi quando tocchi la pianta, foglie appiccicose e ingiallite.",
      "Usa trappole gialle per monitorare, aspira gli adulti al mattino e rimuovi le foglie molto infestate."
    ],
    spider_mites: [
      "Ragnetto rosso",
      "Puntinatura gialla, aspetto bronzeo e sottili ragnatele sotto le foglie, soprattutto con caldo secco.",
      "Aumenta l'umidità senza creare condensa, lava la pagina inferiore e rimuovi i focolai; introduci acari predatori se disponibili."
    ],
    flea_beetles: [
      "Altiche",
      "Piccoli coleotteri spesso neri che saltano e lasciano molti forellini rotondi sulle foglie.",
      "Proteggi le piante giovani con rete fine, elimina le infestanti crucifere, mantieni il terreno uniformemente umido e intervieni presto."
    ],
    caterpillars: [
      "Bruchi e cavolaie",
      "Fori irregolari, margini rosicchiati ed escrementi scuri; i bruchi spesso sono nascosti sotto la foglia.",
      "Ispeziona e rimuovi a mano, usa rete anti-insetto e, con attacco confermato, un prodotto autorizzato a base di Bacillus thuringiensis."
    ],
    thrips: [
      "Tripidi",
      "Striature argentate, puntini neri e foglie deformate; insetti sottilissimi nascosti nelle pieghe.",
      "Usa trappole blu per monitorare, elimina le parti colpite ed evita aria eccessivamente secca."
    ],
    onion_fly: [
      "Mosca della cipolla",
      "Piante che ingialliscono e si sfilano facilmente; larve bianche nel bulbo o alla base.",
      "Rimuovi le piante colpite, usa rete fine e ruota gli alli; non lasciare bulbi malati nel terreno."
    ],
    leafminers: [
      "Minatori fogliari",
      "Gallerie chiare e sinuose scavate all'interno della foglia.",
      "Rimuovi le foglie con mine prima che la larva esca, usa rete fine e trappole adesive per monitorare."
    ],
    carrot_fly: [
      "Mosca della carota",
      "Foglie rossastre e gallerie color ruggine nelle radici, talvolta amare.",
      "Proteggi con rete fine, dirada senza lasciare residui vicino alla coltura e ruota le ombrellifere."
    ],
    slugs: [
      "Limacce e chiocciole",
      "Grandi fori irregolari, bordi mangiati e tracce lucide di bava.",
      "Raccogli la sera, elimina i rifugi umidi e usa barriere o esche autorizzate a base di fosfato ferrico."
    ],
    weevils: [
      "Tonchi e oziorrinchi",
      "Margini fogliari intaccati e semi o baccelli perforati; piccoli adulti scuri.",
      "Rimuovi adulti, residui e semi infestati, ruota la coltura e usa rete nei periodi di volo."
    ]
  };
}

// Restituisce i parassiti per pianta
function pestsForPlant(p) {
  const diseaseGroup = DISEASE_PLANT_GROUP[p.id] || "other";
  const group = PEST_GROUPS[diseaseGroup] ? diseaseGroup : "other";
  const catalog = pestCatalog();
  return PEST_GROUPS[group]
    .map((key) => {
      const entry = catalog[key];
      return entry
        ? { key, name: entry[0], signs: entry[1], action: entry[2] }
        : null;
    })
    .filter(Boolean);
}

// Suggerisce prodotti per parassiti
function targetedPestProducts(p) {
  const group = PEST_GROUPS[DISEASE_PLANT_GROUP[p.id]]
    ? DISEASE_PLANT_GROUP[p.id]
    : "other";
  const ro = currentLang === "ro";
  const plans = ro
    ? {
        solanaceae: {
          aphids:
            "Săpun potasic pe colonii tinere; la atac puternic, flonicamid. Aplică sub frunze și pe vârfurile plantei.",
          whiteflies:
            "Beauveria bassiana pe nimfe și adulți; pyriproxyfen pe ouă și nimfe pentru întreruperea ciclului.",
          spider_mites:
            "Abamectin pe forme mobile și hexythiazox pe ouă; biologic, Phytoseiulus persimilis."
        },
        cucurbitaceae: {
          aphids:
            "Flonicamid pentru oprirea hrănirii; săpun potasic pentru focare mici, cu acoperire sub frunze.",
          whiteflies:
            "Beauveria bassiana la umiditate controlată și săpun potasic pe nimfele expuse.",
          spider_mites:
            "Hexythiazox pe ouă urmat de abamectin pe forme mobile; alternativ Phytoseiulus persimilis."
        },
        brassicaceae: {
          flea_beetles:
            "Spinosad sau piretrine naturale pe adulții activi, aplicate devreme pe plantele tinere.",
          caterpillars:
            "Bacillus thuringiensis var. kurstaki pe larve mici; spinosad pe larve mai dezvoltate.",
          aphids:
            "Flonicamid pentru coloniile ascunse în rozetă; săpun potasic pe coloniile expuse."
        },
        allium: {
          thrips:
            "Spinosad în teaca frunzelor; Beauveria bassiana cu umiditate adecvată pentru a reduce adulții și nimfele.",
          onion_fly:
            "Steinernema feltiae în sol umed contra larvelor; spinosad numai în tratamente specifice culturii.",
          leafminers:
            "Spinosad la apariția primelor galerii; cyromazine pe larvele tinere unde este prevăzută pentru cultură."
        },
        apiaceae: {
          carrot_fly:
            "Steinernema feltiae în sol contra larvelor; piretrine pe adulți în perioada de zbor.",
          aphids:
            "Săpun potasic pe coloniile expuse; flonicamid dacă frunzele sunt deja răsucite.",
          leafminers:
            "Spinosad la începutul galeriilor; îndepărtează frunzele minate înainte de repetarea tratamentului."
        },
        leafy: {
          flea_beetles:
            "Piretrine naturale pentru reducerea rapidă a adulților; spinosad dacă paguba continuă pe frunzele noi.",
          slugs:
            "Fosfat feric granular în jurul stratului, reînnoit după udări abundente.",
          aphids:
            "Săpun potasic pe ambele fețe ale frunzei; piretrine numai pentru colonii persistente."
        },
        chenopods: {
          leafminers:
            "Spinosad pe larve tinere, imediat ce apar primele galerii.",
          aphids:
            "Săpun potasic pe colonii; flonicamid dacă frunzele se deformează.",
          flea_beetles:
            "Piretrine naturale pe adulți; spinosad dacă paguba crește pe frunzele tinere."
        },
        legumes: {
          aphids:
            "Flonicamid pentru afidele din vârfuri și flori; săpun potasic pentru focare localizate.",
          weevils:
            "Piretrine pe adulți; Heterorhabditis bacteriophora în sol contra larvelor.",
          spider_mites:
            "Abamectin pe forme mobile; biologic, Phytoseiulus persimilis."
        },
        herbs: {
          aphids:
            "Săpun potasic, cu spălarea atentă a frunzelor înainte de recoltare; piretrine numai la atac puternic.",
          whiteflies:
            "Beauveria bassiana și capcane galbene; săpun potasic pe nimfele expuse.",
          spider_mites:
            "Phytoseiulus persimilis sau ulei horticol ușor pe dosul frunzei; evită tratamentele care afectează aroma."
        },
        basil: {
          aphids:
            "Săpun potasic pe vârfuri și sub frunze, apoi clătirea frunzelor înainte de consum.",
          thrips:
            "Spinosad în punctele de creștere; Beauveria bassiana ca alternativă biologică.",
          slugs:
            "Fosfat feric granular pe sol, fără contact direct cu frunzele de recoltat."
        },
        strawberry: {
          spider_mites:
            "Phytoseiulus persimilis la începutul atacului; bifenazate pe forme mobile dacă populația crește.",
          aphids:
            "Săpun potasic înainte de înflorire; flonicamid dacă apar colonii persistente.",
          slugs: "Fosfat feric între plante, fără a pune granulele pe fructe."
        },
        other: {
          aphids: "Săpun potasic pe colonii; flonicamid la atac persistent.",
          slugs: "Fosfat feric granular distribuit uniform pe sol.",
          thrips:
            "Spinosad în punctele de creștere; Beauveria bassiana ca alternativă biologică."
        }
      }
    : {
        solanaceae: {
          aphids:
            "Sapone molle potassico sulle colonie giovani; con attacco forte, flonicamid. Bagna bene pagina inferiore e germogli.",
          whiteflies:
            "Beauveria bassiana su neanidi e adulti; pyriproxyfen su uova e neanidi per interrompere il ciclo.",
          spider_mites:
            "Abamectina sulle forme mobili ed hexythiazox sulle uova; nel biologico, Phytoseiulus persimilis."
        },
        cucurbitaceae: {
          aphids:
            "Flonicamid per bloccare l'alimentazione; sapone molle sui piccoli focolai, coprendo la pagina inferiore.",
          whiteflies:
            "Beauveria bassiana con umidità controllata e sapone molle sulle neanidi esposte.",
          spider_mites:
            "Hexythiazox sulle uova seguito da abamectina sulle forme mobili; alternativa biologica: Phytoseiulus persimilis."
        },
        brassicaceae: {
          flea_beetles:
            "Spinosad o piretrine naturali sugli adulti attivi, applicati presto sulle piante giovani.",
          caterpillars:
            "Bacillus thuringiensis var. kurstaki sui bruchi piccoli; spinosad sulle larve più sviluppate.",
          aphids:
            "Flonicamid per le colonie nascoste nella rosetta; sapone molle sulle colonie esposte."
        },
        allium: {
          thrips:
            "Spinosad nella guaina delle foglie; Beauveria bassiana con umidità adeguata contro adulti e neanidi.",
          onion_fly:
            "Steinernema feltiae nel suolo umido contro le larve; spinosad soltanto nei trattamenti specifici per la coltura.",
          leafminers:
            "Spinosad alla comparsa delle prime mine; cyromazine sulle larve giovani dove prevista per la coltura."
        },
        apiaceae: {
          carrot_fly:
            "Steinernema feltiae nel suolo contro le larve; piretrine sugli adulti durante il periodo di volo.",
          aphids:
            "Sapone molle sulle colonie esposte; flonicamid quando le foglie sono già arricciate.",
          leafminers:
            "Spinosad all'inizio delle gallerie; rimuovi le foglie minate prima di ripetere il trattamento."
        },
        leafy: {
          flea_beetles:
            "Piretrine naturali per abbattere rapidamente gli adulti; spinosad se il danno continua sulle foglie nuove.",
          slugs:
            "Fosfato ferrico granulare attorno all'aiuola, rinnovato dopo irrigazioni abbondanti.",
          aphids:
            "Sapone molle su entrambe le pagine fogliari; piretrine solo per colonie persistenti."
        },
        chenopods: {
          leafminers:
            "Spinosad sulle larve giovani, appena compaiono le prime gallerie.",
          aphids:
            "Sapone molle sulle colonie; flonicamid se le foglie iniziano a deformarsi.",
          flea_beetles:
            "Piretrine naturali sugli adulti; spinosad se il danno aumenta sulle foglie giovani."
        },
        legumes: {
          aphids:
            "Flonicamid per gli afidi su apici e fiori; sapone molle per focolai localizzati.",
          weevils:
            "Piretrine sugli adulti; Heterorhabditis bacteriophora nel terreno contro le larve.",
          spider_mites:
            "Abamectina sulle forme mobili; nel biologico, Phytoseiulus persimilis."
        },
        herbs: {
          aphids:
            "Sapone molle, lavando con cura le foglie prima della raccolta; piretrine solo con attacco forte.",
          whiteflies:
            "Beauveria bassiana e trappole gialle; sapone molle sulle neanidi esposte.",
          spider_mites:
            "Phytoseiulus persimilis oppure olio orticolo leggero sotto le foglie; evita trattamenti che alterano l'aroma."
        },
        basil: {
          aphids:
            "Sapone molle su germogli e pagina inferiore, poi risciacquo accurato prima del consumo.",
          thrips:
            "Spinosad nei punti di crescita; Beauveria bassiana come alternativa biologica.",
          slugs:
            "Fosfato ferrico granulare sul terreno, senza contatto diretto con le foglie da raccogliere."
        },
        strawberry: {
          spider_mites:
            "Phytoseiulus persimilis all'inizio dell'attacco; bifenazate sulle forme mobili se la popolazione cresce.",
          aphids:
            "Sapone molle prima della fioritura; flonicamid se compaiono colonie persistenti.",
          slugs:
            "Fosfato ferrico tra le piante, evitando il contatto dei granuli con i frutti."
        },
        other: {
          aphids:
            "Sapone molle sulle colonie; flonicamid con attacco persistente.",
          slugs:
            "Fosfato ferrico granulare distribuito uniformemente sul terreno.",
          thrips:
            "Spinosad nei punti di crescita; Beauveria bassiana come alternativa biologica."
        }
      };
  const specific = {
    rucola: {
      flea_beetles: ro
        ? "Pentru rucola: ulei de neem/azadiractină ca repelent și inhibitor al hrănirii; spinosad dacă puricii continuă să perforeze frunzele noi."
        : "Per la rucola: olio di neem/azadiractina come repellente e antialimentare; spinosad se le altiche continuano a perforare le foglie nuove."
    },
    pomodoro: {
      whiteflies: ro
        ? "Pentru tomate: Beauveria bassiana pe nimfe, apoi Encarsia formosa pentru control biologic continuu; pyriproxyfen dacă ciclul nu se întrerupe."
        : "Per il pomodoro: Beauveria bassiana sulle neanidi, poi Encarsia formosa per il controllo biologico continuo; pyriproxyfen se il ciclo non si interrompe."
    },
    basilico: {
      thrips: ro
        ? "Pentru busuioc: Beauveria bassiana sau spinosad în vârfurile tinere; evită uleiurile aproape de recoltare pentru a nu altera frunzele."
        : "Per il basilico: Beauveria bassiana o spinosad nei germogli giovani; evita oli vicino alla raccolta per non alterare le foglie."
    },
    cavolo: {
      caterpillars: ro
        ? "Pentru varză: Bacillus thuringiensis kurstaki seara pe omizile mici; spinosad dacă larvele sunt deja mari și ascunse în frunze."
        : "Per il cavolo: Bacillus thuringiensis kurstaki la sera sui bruchi piccoli; spinosad se le larve sono già grandi e nascoste nelle foglie."
    },
    fragola: {
      spider_mites: ro
        ? "Pentru căpșun: Phytoseiulus persimilis înainte de înflorirea intensă; bifenazate dacă apar pânze și bronzarea frunzelor."
        : "Per la fragola: Phytoseiulus persimilis prima della piena fioritura; bifenazate se compaiono ragnatele e bronzatura fogliare."
    },
    carota: {
      carrot_fly: ro
        ? "Pentru morcov: Steinernema feltiae în sol umed la eclozarea larvelor; piretrine doar pe adulți în perioada de zbor."
        : "Per la carota: Steinernema feltiae nel terreno umido alla schiusa delle larve; piretrine solo sugli adulti durante il volo."
    },
    cipolla: {
      onion_fly: ro
        ? "Pentru ceapă: Steinernema feltiae în sol umed, repetat pe generațiile larvare; elimină bulbii atacați înainte de orice nou tratament."
        : "Per la cipolla: Steinernema feltiae nel terreno umido, ripetuto sulle generazioni larvali; elimina i bulbi colpiti prima di ogni nuovo trattamento."
    }
  };
  return {
    ...(plans.other || {}),
    ...(plans[group] || {}),
    ...(specific[p.id] || {})
  };
}

// Renderizza plant pests
function renderPlantPests(p) {
  const pests = pestsForPlant(p);
  const products = targetedPestProducts(p);
  const count = document.getElementById("detailPestsCount");
  const list = document.getElementById("detailPestList");
  if (count)
    count.textContent = tv("detail.pests_count", { count: pests.length });
  if (!list) return;
  list.innerHTML = pests
    .map(
      (pest) =>
        `<details class="detail-disease-card"><summary><span class="detail-disease-marker" aria-hidden="true"></span><span>${pest.name}</span><span class="detail-disease-toggle" aria-hidden="true">+</span></summary><div class="detail-disease-body"><div class="detail-disease-info"><b>${t("detail.pest_signs")}</b><p>${pest.signs}</p></div><div class="detail-disease-info detail-disease-info--action"><b>${t("detail.pest_action")}</b><p>${pest.action}</p></div><div class="detail-disease-info detail-disease-info--products"><b>${t("detail.pest_products")} · ${plantName(p.id)}</b><p>${products[pest.key]}</p></div></div></details>`
    )
    .join("");
}

// Scheda pianta
function openDetail(id, preserveTab = false) {
  const p = BYID[id];
  if (!p) return;
  const overlay = document.getElementById("detailOverlay");
  const wasOpen = overlay.classList.contains("open");
  const previousTab =
    document.querySelector("[data-detail-tab].active")?.dataset.detailTab ||
    "overview";
  currentDetail = id;
  const guide = localizedSowingGuide(p);
  const profile = technicalProfile(p, guide);

  // Nella foto grande della scheda si preferisce la versione ad alta
  // risoluzione quando disponibile (cartella "large/"), tenendo quella
  // leggera per le miniature ovunque altrove. Vale solo per le foto locali
  // del catalogo: URL esterni o percorsi personalizzati restano invariati.
  const smallPhotoSrc = photoSrc(id);
  const heroMatch = /^assets\/img\/photo\/([^/]+)$/.exec(smallPhotoSrc);
  const detailPhotoEl = document.getElementById("detailPhoto");
  let heroFallbackTried = false;
  detailPhotoEl.onerror = function () {
    if (heroFallbackTried) return;
    heroFallbackTried = true;
    this.src = smallPhotoSrc;
  };
  detailPhotoEl.src = heroMatch
    ? `assets/img/photo/large/${heroMatch[1]}`
    : smallPhotoSrc;
  detailPhotoEl.alt = plantName(id);
  document.getElementById("detailName").textContent = plantName(id);

  const tipo =
    p.tipo || p.arch || (typeof TIPO !== "undefined" && TIPO[p.id]) || "foglia";
  const diffLevel = DIFFICULTY[p.id] || 2;
  const diffLabel =
    diffLevel === 1
      ? t("detail.diff_easy")
      : diffLevel === 2
        ? t("detail.diff_medium")
        : t("detail.diff_hard");
  const diffClass =
    diffLevel === 1
      ? "diff-easy"
      : diffLevel === 2
        ? "diff-medium"
        : "diff-hard";
  document.getElementById("detailTypeBadge").textContent = typeLabel(tipo);
  const diffEl = document.getElementById("detailDiff");
  diffEl.textContent = diffLabel;
  diffEl.className = `detail-hero-diff ${diffClass}`;

  document.getElementById("detailBadges").innerHTML =
    `<span class="badge badge--sun">${SOLE_ICON[p.sole]} ${sunLabel(p)}</span>
     <span class="badge badge--water">${ACQUA_ICON[p.acqua]} ${t("plant.water")} ${t(`water.${p.acqua}`)}</span>
     <span class="badge badge--type" style="${TIPO_STYLE[tipo] || ""}">${typeLabel(tipo)}</span>`;

  const nota = plantNote(p);
  const notaEl = document.getElementById("detailNota");
  notaEl.textContent = profile.description;
  notaEl.hidden = !profile.description;

  const sp = PLANT_SPACING[p.id] || {};
  const svgDiagram = spacingInfographic(p);
  const spacingValStr = spacingLabel(p);
  document.getElementById("detailSpacing").innerHTML = sp.d
    ? `<div class="detail-spacing-header">
         <span class="detail-tile-label">${t("detail.spacing_label")}</span>
         <b class="detail-spacing-val">${spacingValStr}</b>
       </div>
       <div class="detail-spacing-diagram">${svgDiagram}</div>`
    : `<div class="detail-spacing-header">
         <span class="detail-tile-label">${t("detail.spacing_label")}</span>
         <b class="detail-spacing-val">—</b>
       </div>`;

  const hcm = PLANT_HEIGHT_CM[p.id] ? ` · ${PLANT_HEIGHT_CM[p.id]} cm` : "";
  const price = packPrice(id);
  const spp = seedsPerPack(id);
  document.getElementById("detailStats").innerHTML =
    `<div class="detail-tile detail-tile--harvest">
       <div class="detail-tile-icon">⏱</div>
       <div class="detail-tile-label">${t("plant.harvest_days")}</div>
       <div class="detail-tile-value">${daysLabel(p, true)}</div>
     </div>
     <div class="detail-tile detail-tile--yield">
       <div class="detail-tile-icon">⚖</div>
       <div class="detail-tile-label">${t("plant.yield")}</div>
       <div class="detail-tile-value">${yieldLabel(p)}</div>
     </div>
     <div class="detail-tile detail-tile--height">
       <div class="detail-tile-icon">↕</div>
       <div class="detail-tile-label">${t("detail.height_range")}</div>
       <div class="detail-tile-value">${t(`height.${p.h}`)}${hcm}</div>
     </div>
     <div class="detail-tile detail-tile--price">
       <div class="detail-tile-icon">🏷</div>
       <div class="detail-tile-label">${t("detail.price_pack")}</div>
       <div class="detail-tile-value">${money(price)}</div>
       <div class="detail-tile-sub">${tv("cart.seeds_per_pack", { count: spp })}</div>
     </div>`;

  document.getElementById("detailCultivationExtra").innerHTML =
    renderTechnicalCards(profile.cultivation);
  document.getElementById("detailCareGuide").innerHTML = renderTechnicalCards(
    profile.care
  );
  renderPlantDiseases(p);
  renderPlantPests(p);
  document.getElementById("detailHarvestGuide").innerHTML =
    renderTechnicalCards(profile.harvest);

  const activeMonths = Array.from(effectiveMonths(p))
    .sort((a, b) => a - b)
    .map((m) => ABBR_MESI[m - 1])
    .join(", ");
  const monthLegend = {
    available: t("detail.month_available"),
    selected: t("detail.month_selected"),
    outside: t("detail.month_outside")
  };
  const monthSegments = Array.from({ length: 12 }, (_, i) => {
    const on = effectiveMonths(p).has(i + 1);
    const cur = i + 1 === state.mese;
    const title = `${NOMI_MESI[i]} · ${on ? monthLegend.available : monthLegend.outside}${cur ? ` · ${monthLegend.selected}` : ""}`;
    return `<div class="month-seg${on ? " active" : ""}${cur ? " current" : ""}" title="${title}" aria-label="${title}">
      <span class="month-seg-abbr">${ABBR_MESI[i]}</span>
    </div>`;
  }).join("");
  document.getElementById("detailMonthBar").innerHTML =
    `<div class="month-bar-head">
       <span>${t("detail.sowing_months")}</span>
       <b>${activeMonths}</b>
     </div>
     <div class="month-segments" aria-label="${t("detail.sowing_months")}">${monthSegments}</div>
     <div class="month-bar-legend" aria-hidden="true">
       <span><i class="month-legend-dot month-legend-dot--active"></i>${monthLegend.available}</span>
       <span><i class="month-legend-dot month-legend-dot--current"></i>${monthLegend.selected}</span>
     </div>`;

  let comp = "";
  if (p.amiche.length)
    comp += `<div class="detail-companions-group">
      <div class="detail-companions-label">💚 ${t("detail.friends")}</div>
      <div class="companion-list">${p.amiche
        .map(
          (aid) =>
            `<span class="companion-chip friend">${fruitEmoji(aid)} ${plantName(aid)}</span>`
        )
        .join("")}</div>
    </div>`;
  if (p.nemiche.length)
    comp += `<div class="detail-companions-group">
      <div class="detail-companions-label detail-companions-label--foe">⚠️ ${t("detail.enemies")}</div>
      <div class="companion-list">${p.nemiche
        .map(
          (eid) =>
            `<span class="companion-chip foe">${fruitEmoji(eid)} ${plantName(eid)}</span>`
        )
        .join("")}</div>
    </div>`;
  const compEl = document.getElementById("detailCompanions");
  compEl.innerHTML = comp;
  compEl.hidden = !comp;

  const sowEl = document.getElementById("detailSow");
  const sowBodyEl = document.getElementById("detailSowBody");
  const sowRow = (icon, label, value) =>
    `<div class="detail-sow-row"><span class="detail-sow-row-icon" aria-hidden="true">${icon}</span><span class="detail-sow-row-copy"><b>${label}</b> — ${value}</span></div>`;
  const sowTip = (value) =>
    `<blockquote class="detail-sow-tip"><span class="detail-sow-row-icon" aria-hidden="true">💡</span><span class="detail-sow-row-copy">${value}</span></blockquote>`;
  let sowHtml = "";
  if (guide) {
    if (guide.method)
      sowHtml += sowRow("🌱", t("detail.sow_method"), guide.method);
    if (guide.periodo)
      sowHtml += sowRow("📅", t("detail.sow_period"), guide.periodo);
    if (guide.depth)
      sowHtml += sowRow("📏", t("detail.sow_depth"), guide.depth);
    if (guide.thin) sowHtml += sowRow("📐", t("detail.sow_thin"), guide.thin);
    if (guide.tempGerm && guide.tempGerm !== "—")
      sowHtml += sowRow("🌡️", t("detail.sow_temp"), guide.tempGerm);
    if (guide.giorniGerm && guide.giorniGerm !== "—")
      sowHtml += sowRow("⏳", t("detail.sow_germ"), guide.giorniGerm);
    if (guide.esposizione)
      sowHtml += sowRow("☀️", t("detail.sow_exposure"), guide.esposizione);
    if (guide.annaffiatura)
      sowHtml += sowRow("💧", t("detail.sow_water"), guide.annaffiatura);
    if (guide.tip || nota) sowHtml += sowTip(guide.tip || nota);
  } else if (nota) {
    sowHtml += sowTip(nota);
  }
  sowBodyEl.innerHTML = sowHtml;
  sowEl.hidden = !sowHtml;

  const inC = inCart(id);
  const btn = document.getElementById("detailAddBtn");
  btn.textContent = detailCartLabel(inC);
  btn.classList.toggle("added", inC);

  overlay.classList.add("open");
  const detailPanel = document.getElementById("detailPanel");
  if (detailPanel && !wasOpen) detailPanel.scrollTop = 0;
  setDetailTab(preserveTab ? previousTab : "overview");
  if (!wasOpen) lockDetailPageScroll();
}
// Aggiunge il dettaglio al carrello
function detailAddToCart() {
  if (!currentDetail) return;
  const added = !inCart(currentDetail);
  cart = added
    ? [...cart, { id: currentDetail, bustine: 1 }]
    : cart.filter((i) => i.id !== currentDetail);
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  showCartNudge(currentDetail, added);
  const btn = document.getElementById("detailAddBtn");
  if (btn) {
    btn.textContent = detailCartLabel(added);
    btn.classList.toggle("added", added);
  }
}
// Chiude detail
function closeDetail(e) {
  if (e && e.target !== document.getElementById("detailOverlay")) return;
  document.getElementById("detailOverlay").classList.remove("open");
  unlockDetailPageScroll();
  currentDetail = null;
}
document
  .getElementById("detailPanel")
  .addEventListener("click", (e) => e.stopPropagation());
document.getElementById("detailOverlay")?.addEventListener(
  "touchmove",
  (e) => {
    const panel = document.getElementById("detailPanel");
    if (!panel || !panel.contains(e.target)) e.preventDefault();
  },
  { passive: false }
);
document.getElementById("detailPanel")?.addEventListener(
  "touchstart",
  (e) => {
    detailTouchY = e.touches?.[0]?.clientY ?? null;
  },
  { passive: true }
);
document.getElementById("detailPanel")?.addEventListener(
  "touchmove",
  (e) => {
    const panel = document.getElementById("detailPanel");
    if (!panel) return;

    const scroller =
      panel.querySelector(".detail-scroll") &&
      window.matchMedia("(max-width: 660px)").matches
        ? panel.querySelector(".detail-scroll")
        : panel.querySelector(".detail-tab-panel.active") || panel;
    const y = e.touches?.[0]?.clientY;
    if (y == null || detailTouchY == null) return;
    const deltaY = y - detailTouchY;
    const atTop = scroller.scrollTop <= 0;
    const atBottom =
      scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
    if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) e.preventDefault();
    detailTouchY = y;
  },
  { passive: false }
);

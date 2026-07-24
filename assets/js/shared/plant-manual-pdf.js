// Genera nel browser un manuale PDF personalizzato per le colture di un ordine.
(function (root) {
  const PAGE_W = 1240;
  const PAGE_H = 1754;
  const MARGIN = 92;
  const GREEN = "#245b36";
  const GREEN_DARK = "#153d27";
  const GREEN_SOFT = "#e9f4e9";
  const CREAM = "#f8f4e9";
  const INK = "#203127";
  const MUTED = "#637167";

  const COPY = {
    it: {
      title: "Manuale di semina e coltivazione",
      eyebrow: "IL TUO ORTO, PASSO DOPO PASSO",
      intro:
        "Una guida personale con le indicazioni essenziali per iniziare, curare e raccogliere le varietà del tuo ordine.",
      order: "Ordine",
      preparedFor: "Preparato per",
      varieties: "varietà",
      pack: "confezione",
      packs: "confezioni",
      index: "Le colture del tuo ordine",
      sowing: "Periodo di semina",
      spacing: "Distanze consigliate",
      light: "Esposizione",
      water: "Acqua",
      harvest: "Primo raccolto",
      yield: "Resa indicativa",
      start: "Come iniziare",
      care: "Cura della coltura",
      companions: "Buone vicine",
      noCompanions: "Nessuna associazione specifica indicata.",
      disclaimer:
        "Le indicazioni sono orientative: clima locale, varietà e condizioni della serra possono modificare tempi e fabbisogni.",
      days: "giorni circa",
      kg: "kg per pianta",
      row: "sulla fila",
      rows: "tra le file",
      full: "Pieno sole",
      half: "Mezz'ombra",
      low: "Bassa",
      medium: "Media",
      high: "Alta",
      direct:
        "Prepara un letto fine e drenante, semina direttamente alla profondità indicata sulla confezione e mantieni il terreno appena umido fino alla germinazione.",
      transplant:
        "Avvia in vasetto o usa giovani piantine robuste. Trapianta con il pane di terra integro, rispettando le distanze e annaffiando subito al piede.",
      bulbs:
        "Sistema bulbi, spicchi o tuberi in terreno soffice e drenante, con germoglio o punta rivolti verso l'alto, poi compatta leggermente.",
      perennial:
        "Dedica una posizione stabile e ben preparata: è una coltura che può restare produttiva per più stagioni.",
      careLow:
        "Lascia asciugare leggermente lo strato superficiale tra le bagnature ed evita ristagni.",
      careMedium:
        "Mantieni un'umidità regolare, bagnando al piede quando il primo strato di terreno inizia ad asciugarsi.",
      careHigh:
        "Controlla spesso l'umidità e mantienila costante, senza lasciare acqua stagnante attorno alle radici.",
      footer: "Orto in Serra · Manuale personale di coltivazione"
    },
    ro: {
      title: "Manual de semănare și cultivare",
      eyebrow: "GRĂDINA TA, PAS CU PAS",
      intro:
        "Un ghid personal cu indicațiile esențiale pentru pornirea, îngrijirea și recoltarea soiurilor din comanda ta.",
      order: "Comanda",
      preparedFor: "Pregătit pentru",
      varieties: "soiuri",
      pack: "pachet",
      packs: "pachete",
      index: "Culturile din comanda ta",
      sowing: "Perioada de semănare",
      spacing: "Distanțe recomandate",
      light: "Expunere",
      water: "Apă",
      harvest: "Prima recoltă",
      yield: "Producție orientativă",
      start: "Cum începi",
      care: "Îngrijirea culturii",
      companions: "Vecine bune",
      noCompanions: "Nu este indicată o asociere specifică.",
      disclaimer:
        "Indicațiile sunt orientative: clima locală, soiul și condițiile din seră pot modifica perioadele și necesarul plantelor.",
      days: "zile aproximativ",
      kg: "kg per plantă",
      row: "pe rând",
      rows: "între rânduri",
      full: "Soare direct",
      half: "Semiumbră",
      low: "Redusă",
      medium: "Medie",
      high: "Ridicată",
      direct:
        "Pregătește un strat fin și bine drenat, seamănă direct la adâncimea de pe ambalaj și păstrează solul ușor umed până la germinare.",
      transplant:
        "Pornește în ghiveci sau folosește răsaduri viguroase. Transplantează cu balotul intact, respectă distanțele și udă imediat la bază.",
      bulbs:
        "Așază bulbii, cățeii sau tuberculii într-un sol afânat și drenat, cu mugurele orientat în sus, apoi tasează ușor.",
      perennial:
        "Alege un loc stabil și bine pregătit: această cultură poate rămâne productivă mai multe sezoane.",
      careLow:
        "Lasă stratul de la suprafață să se usuce ușor între udări și evită apa stagnantă.",
      careMedium:
        "Menține umiditatea constantă și udă la bază când primul strat al solului începe să se usuce.",
      careHigh:
        "Verifică des umiditatea și păstreaz-o constantă, fără apă stagnantă în jurul rădăcinilor.",
      footer: "Orto in Serra · Manual personal de cultivare"
    }
  };

  const DIRECT_IDS = new Set([
    "carota",
    "ravanello",
    "barbabietola",
    "rapa",
    "pastinaca",
    "radice_prezemolo",
    "daikon",
    "scorzonera",
    "rucola",
    "spinaci",
    "coriandolo",
    "aneto",
    "fagiolino",
    "fagiolo",
    "fava",
    "cece",
    "lenticchia",
    "pisello",
    "soia_edamame",
    "mais_dolce"
  ]);
  const BULB_IDS = new Set([
    "aglio",
    "cipolla",
    "cipolla_rossa",
    "cipollotto",
    "scalogno",
    "patata",
    "patata_dolce",
    "topinambur"
  ]);
  const PERENNIAL_IDS = new Set([
    "asparago",
    "carciofo",
    "fragola",
    "rosmarino",
    "salvia",
    "timo",
    "origano",
    "menta",
    "melissa",
    "erba_cipollina",
    "leustean"
  ]);

  function langCode(lang) {
    return lang === "ro" ? "ro" : "it";
  }

  function font(ctx, weight, size, family) {
    ctx.font = `${weight} ${size}px ${family || "DM Sans, Arial, sans-serif"}`;
  }

  function roundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  }

  function wrapLines(ctx, text, maxWidth) {
    const words = String(text || "")
      .split(/\s+/)
      .filter(Boolean);
    const lines = [];
    let line = "";
    words.forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      if (ctx.measureText(candidate).width <= maxWidth || !line)
        line = candidate;
      else {
        lines.push(line);
        line = word;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function drawWrapped(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    let lines = wrapLines(ctx, text, maxWidth);
    if (maxLines && lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      let last = lines[maxLines - 1];
      while (ctx.measureText(`${last}…`).width > maxWidth && last.length > 1) {
        last = last.slice(0, -1);
      }
      lines[maxLines - 1] = `${last.trim()}…`;
    }
    lines.forEach((line, index) =>
      ctx.fillText(line, x, y + index * lineHeight)
    );
    return y + lines.length * lineHeight;
  }

  function newCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = PAGE_W;
    canvas.height = PAGE_H;
    return canvas;
  }

  function paintBackground(ctx) {
    ctx.fillStyle = CREAM;
    ctx.fillRect(0, 0, PAGE_W, PAGE_H);
    ctx.fillStyle = GREEN_DARK;
    ctx.fillRect(0, 0, 22, PAGE_H);
    ctx.fillStyle = "rgba(73, 122, 74, .07)";
    ctx.beginPath();
    ctx.arc(PAGE_W - 35, 45, 250, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawLogo(ctx, logo, x, y, size) {
    if (logo) ctx.drawImage(logo, x, y, size, size);
    else {
      ctx.fillStyle = GREEN;
      roundedRect(ctx, x, y, size, size, 22);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      font(ctx, 700, size * 0.48);
      ctx.fillText("O", x + size / 2, y + size * 0.69);
      ctx.textAlign = "left";
    }
  }

  function drawBrand(ctx, logo, compact) {
    const size = compact ? 58 : 82;
    drawLogo(ctx, logo, MARGIN, compact ? 58 : 74, size);
    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, compact ? 27 : 34, "Fraunces, Georgia, serif");
    ctx.fillText(
      "Orto in Serra",
      MARGIN + size + 20,
      (compact ? 58 : 74) + size * 0.63
    );
  }

  // Ritaglia la fotografia senza deformarla e la inserisce in una cornice
  // coerente con le schede del manuale.
  function drawPhotoCover(ctx, image, x, y, w, h, radius) {
    ctx.save();
    roundedRect(ctx, x, y, w, h, radius);
    ctx.clip();
    ctx.fillStyle = GREEN_SOFT;
    ctx.fillRect(x, y, w, h);
    if (image) {
      const scale = Math.max(w / image.naturalWidth, h / image.naturalHeight);
      const drawW = image.naturalWidth * scale;
      const drawH = image.naturalHeight * scale;
      ctx.drawImage(
        image,
        x + (w - drawW) / 2,
        y + (h - drawH) / 2,
        drawW,
        drawH
      );
    }
    ctx.restore();
    ctx.strokeStyle = "rgba(36, 91, 54, .18)";
    ctx.lineWidth = 3;
    roundedRect(ctx, x, y, w, h, radius);
    ctx.stroke();
  }

  function drawFooter(ctx, c, orderId, page, total) {
    const y = PAGE_H - 65;
    ctx.strokeStyle = "rgba(36, 91, 54, .2)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(MARGIN, y - 30);
    ctx.lineTo(PAGE_W - MARGIN, y - 30);
    ctx.stroke();
    ctx.fillStyle = MUTED;
    font(ctx, 500, 20);
    ctx.fillText(c.footer, MARGIN, y);
    ctx.textAlign = "right";
    ctx.fillText(`${orderId}  ·  ${page}/${total}`, PAGE_W - MARGIN, y);
    ctx.textAlign = "left";
  }

  function formatDate(value, lang) {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? "-"
      : date.toLocaleDateString(lang === "ro" ? "ro-RO" : "it-IT", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        });
  }

  function getStartText(plant, c) {
    if (BULB_IDS.has(plant.id)) return c.bulbs;
    if (PERENNIAL_IDS.has(plant.id)) return c.perennial;
    if (DIRECT_IDS.has(plant.id)) return c.direct;
    return c.transplant;
  }

  function waterText(plant, c) {
    if (plant.acqua === "alta") return c.careHigh;
    if (plant.acqua === "bassa") return c.careLow;
    return c.careMedium;
  }

  function valueLabel(value, c) {
    if (value === "alta") return c.high;
    if (value === "bassa") return c.low;
    if (value === "mezzombra" || value === "mezza") return c.half;
    if (value === "pieno") return c.full;
    return c.medium;
  }

  function monthsLabel(plant, lang) {
    const months = root.SERRA_I18N?.months?.[lang] || [];
    return (
      (plant.mesi || []).map((m) => months[m - 1] || String(m)).join(" · ") ||
      "-"
    );
  }

  function localizedName(plant, lang) {
    return (
      root.SERRA_PLANT_CONTENT?.localizedName(plant, lang) ||
      plant.nome ||
      plant.id
    );
  }

  function fullUserName(user) {
    const firstName = String(user?.nome || "").trim();
    const lastName = String(user?.cognome || "").trim();
    if (lastName || !firstName)
      return [firstName, lastName].filter(Boolean).join(" ");
    return firstName;
  }

  function drawCover(ctx, logo, data, c, totalPages) {
    paintBackground(ctx);
    drawBrand(ctx, logo, false);
    ctx.fillStyle = GREEN;
    font(ctx, 700, 21);
    ctx.fillText(c.eyebrow, MARGIN, 305);
    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, 79, "Fraunces, Georgia, serif");
    let y = drawWrapped(ctx, c.title, MARGIN, 395, 920, 88, 3);
    ctx.fillStyle = MUTED;
    font(ctx, 400, 32);
    y = drawWrapped(ctx, c.intro, MARGIN, y + 36, 930, 47, 4);

    ctx.fillStyle = "#fff";
    roundedRect(ctx, MARGIN, y + 60, PAGE_W - MARGIN * 2, 260, 30);
    ctx.fill();
    const metaY = y + 125;
    ctx.fillStyle = MUTED;
    font(ctx, 700, 19);
    ctx.fillText(c.order.toUpperCase(), MARGIN + 42, metaY);
    ctx.fillText(c.preparedFor.toUpperCase(), MARGIN + 440, metaY);
    ctx.fillStyle = INK;
    font(ctx, 700, 29);
    ctx.fillText(data.order.id || "-", MARGIN + 42, metaY + 43);
    ctx.fillText(
      fullUserName(data.user) || data.order.email || "-",
      MARGIN + 440,
      metaY + 43
    );
    ctx.fillStyle = MUTED;
    font(ctx, 500, 21);
    ctx.fillText(
      formatDate(data.order.date, data.lang),
      MARGIN + 42,
      metaY + 82
    );

    const countY = y + 390;
    ctx.fillStyle = GREEN_SOFT;
    roundedRect(ctx, MARGIN, countY, 360, 142, 24);
    ctx.fill();
    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, 48, "Fraunces, Georgia, serif");
    ctx.fillText(String(data.items.length), MARGIN + 35, countY + 62);
    font(ctx, 600, 22);
    ctx.fillText(c.varieties, MARGIN + 35, countY + 101);
    ctx.fillStyle = "#eef0e9";
    roundedRect(ctx, MARGIN + 390, countY, 360, 142, 24);
    ctx.fill();
    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, 48, "Fraunces, Georgia, serif");
    ctx.fillText(
      String(data.items.reduce((sum, item) => sum + item.quantity, 0)),
      MARGIN + 425,
      countY + 62
    );
    font(ctx, 600, 22);
    ctx.fillText(c.packs, MARGIN + 425, countY + 101);
    drawFooter(ctx, c, data.order.id || "-", 1, totalPages);
  }

  function drawFact(ctx, x, y, w, title, value) {
    ctx.fillStyle = "#fff";
    roundedRect(ctx, x, y, w, 126, 20);
    ctx.fill();
    ctx.fillStyle = MUTED;
    font(ctx, 700, 17);
    ctx.fillText(title.toUpperCase(), x + 24, y + 36);
    ctx.fillStyle = INK;
    font(ctx, 650, 23);
    drawWrapped(ctx, value, x + 24, y + 75, w - 48, 29, 2);
  }

  function drawPlantPage(ctx, logo, data, item, c, page, total) {
    paintBackground(ctx);
    drawBrand(ctx, logo, true);
    const plant = item.plant;
    const name = localizedName(plant, data.lang);
    ctx.fillStyle = GREEN;
    font(ctx, 700, 20);
    ctx.fillText(
      `${String(page - 1).padStart(2, "0")}  ·  ${item.quantity} ${item.quantity === 1 ? c.pack : c.packs}`,
      MARGIN,
      210
    );
    const photoSize = 210;
    const photoX = PAGE_W - MARGIN - photoSize;
    drawPhotoCover(ctx, item.photo, photoX, 214, photoSize, photoSize, 34);
    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, 64, "Fraunces, Georgia, serif");
    let y = drawWrapped(ctx, name, MARGIN, 286, photoX - MARGIN - 34, 72, 2);
    ctx.fillStyle = MUTED;
    font(ctx, 400, 27);
    const desc =
      root.SERRA_PLANT_CONTENT?.compactDescription(plant, data.lang) || "";
    y =
      drawWrapped(ctx, desc, MARGIN, y + 20, photoX - MARGIN - 34, 39, 3) + 30;

    const gap = 18;
    const factW = (PAGE_W - MARGIN * 2 - gap * 2) / 3;
    drawFact(ctx, MARGIN, y, factW, c.sowing, monthsLabel(plant, data.lang));
    drawFact(
      ctx,
      MARGIN + factW + gap,
      y,
      factW,
      c.spacing,
      `${plant.d || "-"} cm ${c.row} · ${plant.dr || plant.d || "-"} cm ${c.rows}`
    );
    drawFact(
      ctx,
      MARGIN + (factW + gap) * 2,
      y,
      factW,
      c.light,
      valueLabel(plant.sole, c)
    );
    y += 144;
    drawFact(ctx, MARGIN, y, factW, c.water, valueLabel(plant.acqua, c));
    drawFact(
      ctx,
      MARGIN + factW + gap,
      y,
      factW,
      c.harvest,
      `${plant.gg || "-"} ${c.days}`
    );
    drawFact(
      ctx,
      MARGIN + (factW + gap) * 2,
      y,
      factW,
      c.yield,
      `${plant.resa || "-"} ${c.kg}`
    );
    y += 184;

    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, 31, "Fraunces, Georgia, serif");
    ctx.fillText(c.start, MARGIN, y);
    ctx.fillStyle = INK;
    font(ctx, 400, 24);
    y =
      drawWrapped(
        ctx,
        getStartText(plant, c),
        MARGIN,
        y + 43,
        PAGE_W - MARGIN * 2,
        35,
        4
      ) + 45;

    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, 31, "Fraunces, Georgia, serif");
    ctx.fillText(c.care, MARGIN, y);
    const localizedNote =
      root.SERRA_PLANT_CONTENT?.cultivationNote(plant, data.lang) || "";
    ctx.fillStyle = INK;
    font(ctx, 400, 24);
    y =
      drawWrapped(
        ctx,
        `${waterText(plant, c)} ${localizedNote}`,
        MARGIN,
        y + 43,
        PAGE_W - MARGIN * 2,
        35,
        5
      ) + 44;

    ctx.fillStyle = GREEN_SOFT;
    roundedRect(ctx, MARGIN, y, PAGE_W - MARGIN * 2, 112, 22);
    ctx.fill();
    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, 19);
    ctx.fillText(c.companions.toUpperCase(), MARGIN + 28, y + 36);
    ctx.fillStyle = INK;
    font(ctx, 500, 22);
    const friends = (plant.amiche || [])
      .map((id) => data.byId[id])
      .filter(Boolean)
      .slice(0, 6)
      .map((friend) => localizedName(friend, data.lang));
    drawWrapped(
      ctx,
      friends.join(" · ") || c.noCompanions,
      MARGIN + 28,
      y + 76,
      PAGE_W - MARGIN * 2 - 56,
      28,
      1
    );

    ctx.fillStyle = MUTED;
    font(ctx, 400, 18);
    drawWrapped(
      ctx,
      c.disclaimer,
      MARGIN,
      PAGE_H - 142,
      PAGE_W - MARGIN * 2,
      26,
      2
    );
    drawFooter(ctx, c, data.order.id || "-", page, total);
  }

  function loadImage(src) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      if (/^https?:/i.test(src || "")) image.crossOrigin = "anonymous";
      image.src = src;
    });
  }

  function photoSource(plant) {
    if (typeof root.resolvePlantPhoto === "function") {
      return root.resolvePlantPhoto(plant, plant.id);
    }
    if (plant.foto) return plant.foto;
    return `assets/img/photo/${plant.id}.webp`;
  }

  function dataUrlBytes(url) {
    const binary = atob(url.split(",")[1]);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  function makePdf(jpegs) {
    const encoder = new TextEncoder();
    const chunks = [];
    const offsets = [0];
    let length = 0;
    const add = (value) => {
      const bytes = typeof value === "string" ? encoder.encode(value) : value;
      chunks.push(bytes);
      length += bytes.length;
    };
    const objectCount = 2 + jpegs.length * 3;
    const pageIds = jpegs.map((_, index) => 3 + index * 3 + 2);
    add("%PDF-1.4\n%OrtoInSerra\n");
    const addObject = (id, bodyParts) => {
      offsets[id] = length;
      add(`${id} 0 obj\n`);
      bodyParts.forEach(add);
      add("\nendobj\n");
    };
    addObject(1, [`<< /Type /Catalog /Pages 2 0 R >>`]);
    addObject(2, [
      `<< /Type /Pages /Count ${jpegs.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`
    ]);
    jpegs.forEach((jpeg, index) => {
      const imageId = 3 + index * 3;
      const contentId = imageId + 1;
      const pageId = imageId + 2;
      const stream = "q\n595 0 0 842 0 0 cm\n/Im0 Do\nQ\n";
      addObject(imageId, [
        `<< /Type /XObject /Subtype /Image /Width ${PAGE_W} /Height ${PAGE_H} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`,
        jpeg,
        "\nendstream"
      ]);
      addObject(contentId, [
        `<< /Length ${encoder.encode(stream).length} >>\nstream\n${stream}endstream`
      ]);
      addObject(pageId, [
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im0 ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`
      ]);
    });
    const xrefOffset = length;
    add(`xref\n0 ${objectCount + 1}\n`);
    add("0000000000 65535 f \n");
    for (let id = 1; id <= objectCount; id += 1) {
      add(`${String(offsets[id]).padStart(10, "0")} 00000 n \n`);
    }
    add(
      `trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`
    );
    return new Blob(chunks, { type: "application/pdf" });
  }

  function cleanFilename(value) {
    return String(value || "ordine")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function create(options) {
    const lang = langCode(options.lang);
    const c = COPY[lang];
    const byId = Object.fromEntries(
      (options.plants || []).map((plant) => [plant.id, plant])
    );
    const merged = new Map();
    (options.order.items || []).forEach((orderItem) => {
      const plant = byId[orderItem.id];
      if (!plant) return;
      const current = merged.get(plant.id) || { plant, quantity: 0 };
      current.quantity += Number(orderItem.bustine || orderItem.quantity || 1);
      merged.set(plant.id, current);
    });
    const items = [...merged.values()].sort((a, b) =>
      localizedName(a.plant, lang).localeCompare(
        localizedName(b.plant, lang),
        lang === "ro" ? "ro" : "it"
      )
    );
    if (!items.length) throw new Error("No plants in order");
    const itemsWithPhotos = await Promise.all(
      items.map(async (item) => ({
        ...item,
        photo: await loadImage(photoSource(item.plant))
      }))
    );
    const data = { ...options, lang, items: itemsWithPhotos, byId };
    const logo = await loadImage("assets/img/svg/logo.svg");
    const canvases = [];
    const cover = newCanvas();
    drawCover(
      cover.getContext("2d"),
      logo,
      data,
      c,
      itemsWithPhotos.length + 1
    );
    canvases.push(cover);
    itemsWithPhotos.forEach((item, index) => {
      const canvas = newCanvas();
      drawPlantPage(
        canvas.getContext("2d"),
        logo,
        data,
        item,
        c,
        index + 2,
        itemsWithPhotos.length + 1
      );
      canvases.push(canvas);
    });
    const jpegs = canvases.map((canvas) =>
      dataUrlBytes(canvas.toDataURL("image/jpeg", 0.88))
    );
    return makePdf(jpegs);
  }

  root.SERRA_PLANT_MANUAL = {
    async download(options) {
      const blob = await create(options);
      const href = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.download = `manuale-coltivazione-${cleanFilename(options.order.id)}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(href), 3000);
      return blob;
    },
    create
  };
})(window);

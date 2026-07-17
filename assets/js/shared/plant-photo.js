// Mappa condivisa delle foto del catalogo.
const PLANT_PHOTO_MAP = {
  pomodoro: "assets/img/photo/pomodoro.webp",
  peperone: "assets/img/photo/peperone.webp",
  peperoncino: "assets/img/photo/peperoncino.webp",
  melanzana: "assets/img/photo/melanzana.webp",
  zucchina: "assets/img/photo/zucchina.webp",
  zucca: "assets/img/photo/zucca.webp",
  cetriolo: "assets/img/photo/cetriolo.webp",
  melone: "assets/img/photo/melone.webp",
  anguria: "assets/img/photo/anguria.webp",
  lattuga: "assets/img/photo/lattuga.webp",
  radicchio: "assets/img/photo/radicchio.webp",
  rucola: "assets/img/photo/rucola.webp",
  spinaci: "assets/img/photo/spinaci.webp",
  bietola: "assets/img/photo/bietola_coste.webp",
  cavolo: "assets/img/photo/cavolo_cappuccio.webp",
  verza: "assets/img/photo/verza.webp",
  broccolo: "assets/img/photo/broccolo.webp",
  cavolfiore: "assets/img/photo/cavolfiore.webp",
  cavolonero: "assets/img/photo/cavolo_nero.webp",
  cavolorapa: "assets/img/photo/cavolo_rapa.webp",
  carota: "assets/img/photo/carota.webp",
  finocchio: "assets/img/photo/finocchio.webp",
  prezzemolo: "assets/img/photo/prezzemolo.webp",
  basilico: "assets/img/photo/basilico.webp",
  coriandolo: "assets/img/photo/coriandolo.webp",
  aneto: "assets/img/photo/aneto.webp",
  cipolla: "assets/img/photo/cipolla.webp",
  aglio: "assets/img/photo/aglio.webp",
  porro: "assets/img/photo/porro.webp",
  scalogno: "assets/img/photo/scalogno.webp",
  fagiolino: "assets/img/photo/fagiolino_nano.webp",
  fagiolo: "assets/img/photo/fagiolo_rampicante.webp",
  pisello: "assets/img/photo/pisello.webp",
  fragola: "assets/img/photo/fragola.webp",
  sedano: "assets/img/photo/sedano.webp",
  ravanello: "assets/img/photo/ravanello.webp",
  barbabietola: "assets/img/photo/barbabietola.webp",
  cicoria: "assets/img/photo/cicoria.webp",
  indivia: "assets/img/photo/indivia_scarola.webp",
  pakchoi: "assets/img/photo/pak_choi.webp",
  cavoletti: "assets/img/photo/cavoletti_bruxelles.webp",
  rapa: "assets/img/photo/rapa.webp",
  valerianella: "assets/img/photo/valerianella.webp",
  rosmarino: "assets/img/photo/rosmarino.webp",
  timo: "assets/img/photo/timo.webp",
  origano: "assets/img/photo/origano.webp",
  salvia: "assets/img/photo/salvia.webp",
  pastinaca: "assets/img/photo/pastinaca.webp",
  radice_prezemolo: "assets/img/photo/radice_prezemolo.webp",
  sedano_rapa: "assets/img/photo/sedano_rapa.webp",
  rafano: "assets/img/photo/rafano.webp",
  patata: "assets/img/photo/patata.webp",
  patata_dolce: "assets/img/photo/patata_dolce.webp",
  cipolla_rossa: "assets/img/photo/cipolla_rossa.webp",
  cipollotto: "assets/img/photo/cipollotto.webp",
  erba_cipollina: "assets/img/photo/erba_cipollina.webp",
  loboda: "assets/img/photo/loboda.webp",
  stevia_dolce: "assets/img/photo/stevia_dolce.webp",
  leustean: "assets/img/photo/leustean.webp",
  dragoncello: "assets/img/photo/dragoncello.webp",
  menta: "assets/img/photo/menta.webp",
  maggiorana: "assets/img/photo/maggiorana.webp",
  camomilla: "assets/img/photo/camomilla.webp",
  mais_dolce: "assets/img/photo/mais_dolce.webp",
  tomatillo: "assets/img/photo/tomatillo.webp",
  physalis: "assets/img/photo/physalis.webp",
  cucamelon: "assets/img/photo/cucamelon.webp",
  asparago: "assets/img/photo/asparago.webp",
  carciofo: "assets/img/photo/carciofo.webp",
  cardo: "assets/img/photo/cardo.webp",
  crescione: "assets/img/photo/crescione.webp",
  mizuna: "assets/img/photo/mizuna.webp",
  senape_foglia: "assets/img/photo/senape_foglia.webp",
  tatsoi: "assets/img/photo/tatsoi.webp",
  cavolo_cinese: "assets/img/photo/cavolo_cinese.webp",
  daikon: "assets/img/photo/daikon.webp",
  scorzonera: "assets/img/photo/scorzonera.webp",
  topinambur: "assets/img/photo/topinambur.webp",
  fava: "assets/img/photo/fava.webp",
  soia_edamame: "assets/img/photo/soia_edamame.webp",
  cece: "assets/img/photo/cece.webp",
  lenticchia: "assets/img/photo/lenticchia.webp",
  fagiolo_borlotto: "assets/img/photo/fagiolo_borlotto.webp",
  cavolo_rosso: "assets/img/photo/cavolo_rosso.webp",
  cavolo_navone: "assets/img/photo/cavolo_navone.webp",
  broccolo_rapa: "assets/img/photo/broccolo_rapa.webp",
  shiso: "assets/img/photo/shiso.webp",
  broccolo_romanesco: "assets/img/photo/broccolo_romanesco.webp",
  friggitello: "assets/img/photo/friggitello.webp",
  agretti: "assets/img/photo/agretti.webp",
  borragine: "assets/img/photo/borragine.webp",
  catalogna: "assets/img/photo/catalogna.webp",
  acetosa: "assets/img/photo/acetosa.webp",
  leurda: "assets/img/photo/leurda.webp",
  melissa: "assets/img/photo/melissa.webp",
  cerfoglio: "assets/img/photo/cerfoglio.webp",
  cimbru: "assets/img/photo/cimbru.webp"
};
const preloadedPlantPhotos = new Set();

// Restituisce la foto della pianta usando il percorso salvato o il nome derivato dall'ID.
function resolvePlantPhoto(plant, id) {
  const p = plant || {};
  if (p.foto) {
    if (
      p.foto.startsWith("http://") ||
      p.foto.startsWith("https://") ||
      p.foto.startsWith("data:")
    ) {
      return p.foto;
    }
    if (p.foto.includes("/")) return p.foto;
    return `assets/img/photo/${p.foto}`;
  }
  if (PLANT_PHOTO_MAP[id]) return PLANT_PHOTO_MAP[id];
  return `assets/img/photo/${id}.webp`;
}

// Avvia il download di una miniatura prima che il pannello che la usa diventi
// visibile. Il browser riutilizza poi la stessa risorsa per catalogo e carrello.
function preloadPlantPhoto(plant, id) {
  const src = resolvePlantPhoto(plant, id);
  if (!src || preloadedPlantPhotos.has(src) || typeof Image === "undefined")
    return;

  preloadedPlantPhotos.add(src);
  const image = new Image();
  image.decoding = "async";
  image.src = src;
}

if (typeof window !== "undefined") {
  window.resolvePlantPhoto = resolvePlantPhoto;
  window.preloadPlantPhoto = preloadPlantPhoto;
}

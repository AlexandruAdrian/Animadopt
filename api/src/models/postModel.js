const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Animals = Object.freeze({
  dog: "Caini",
  cat: "Pisici",
  bird: "Pasari",
  fish: "Pesti",
  farm: "Animale de ferma",
});

const Counties = Object.freeze({
  ab: "Alba",
  ar: "Arad",
  ag: "Arges",
  bc: "Bacau",
  bh: "Bihor",
  bn: "Bistrita-Nasaud",
  bt: "Botosani",
  bv: "Brasov",
  br: "Braila",
  b: "Bucuresti",
  bz: "Buzau",
  cs: "Caras-Severin",
  cl: "Calarasi",
  cj: "Cluj",
  ct: "Constanta",
  cv: "Covasna",
  db: "Dambovita",
  dj: "Dolj",
  gl: "Galati",
  gr: "Giurgiu",
  gj: "Gorj",
  hr: "Harghita",
  hd: "Hunedoara",
  il: "Ialomita",
  is: "Iasi",
  if: "Ilfov",
  mm: "Maramures",
  mh: "Mehedinti",
  ms: "Mures",
  nt: "Neamt",
  ot: "Olt",
  ph: "Prahvoa",
  sm: "Satu Mare",
  sj: "Salaj",
  sb: "Sibiu",
  sv: "Suceava",
  tr: "Teleorman",
  tm: "Timis",
  tl: "Tulcea",
  vs: "Vaslui",
  vl: "Valcea",
  vn: "Vrancea",
});

const PostSchema = new Schema({
  postedBy: { type: mongoose.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  breed: { type: String, default: "Necunoscut" },
  postedAt: { type: Date, default: Date.now },
  category: { type: String, enum: Object.values(Animals), required: true },
  location: { type: String, enum: Object.values(Counties), required: true },
  isAdopted: { type: Boolean, default: false },
  pictures: { type: [String], default: [] },
});

Object.assign(PostSchema.statics, { Animals });
Object.assign(PostSchema.statics, { Counties });

const Post = new mongoose.model("Post", PostSchema);

module.exports = Post;

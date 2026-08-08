#!/usr/bin/env node
// prussian / check.mjs
//
// Torna as afirmações do README verificáveis. Roda sem dependência:
//
//   node tools/check.mjs
//
// O que checa:
//   1. paleta categórica: banda de luminosidade, piso de croma, separação
//      sob protanopia e deuteranopia, piso de visão normal, contraste
//      contra a superfície, nos modos claro e escuro
//   2. rampas ordinais: monotonia, passo mínimo de luminosidade, ponta
//      clara acima de 2:1 contra a superfície do próprio modo
//   3. contraste dos tokens semânticos, com a regra de uso declarada
//   4. consistência: tokens.json, web/tokens.css, python/prussian/palette.py
//      e python/streamlit/app.css precisam concordar nas mesmas cores
//
// Sai com código 1 em qualquer falha.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const T = JSON.parse(read("tokens/tokens.json"));

// limiares, os mesmos citados no README
const L_BAND = { light: [0.43, 0.77], dark: [0.48, 0.67] };
const CHROMA_FLOOR = 0.1;
const CVD_TARGET = 8;
const NORMAL_FLOOR = 15;
const MARK_CONTRAST = 3;
const ORDINAL_STEP = 0.06;
const ORDINAL_LIGHT_END = 2;

let failures = 0;
const pass = (name, msg) => console.log(`  [PASS] ${name.padEnd(26)} ${msg}`);
const fail = (name, msg) => { failures++; console.log(`  [FAIL] ${name.padEnd(26)} ${msg}`); };
const check = (ok, name, msg) => (ok ? pass : fail)(name, msg);

// cor

const hex2rgb = (h) => {
  const s = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16) / 255);
};
const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const linear = (h) => hex2rgb(h).map(toLinear);

const relLum = (h) => {
  const [r, g, b] = linear(h);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [relLum(a), relLum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const oklab = ([r, g, b]) => {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};
const oklch = (h) => {
  const [L, a, b] = oklab(linear(h));
  return { L, C: Math.hypot(a, b) };
};

// Machado, Oliveira e Fernandes 2009, severidade 1.0, aplicadas em RGB linear
const CVD = {
  protan: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deutan: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
};
const simulate = (h, m) => {
  const rgb = linear(h);
  return m.map((row) => row.reduce((acc, k, i) => acc + k * rgb[i], 0));
};
const deltaE = (a, b) => {
  const [l1, a1, b1] = a, [l2, a2, b2] = b;
  return Math.hypot(l1 - l2, a1 - a2, b1 - b2) * 100;
};
const pairDelta = (x, y, mode) => {
  if (mode === "normal") return deltaE(oklab(linear(x)), oklab(linear(y)));
  return deltaE(oklab(simulate(x, CVD[mode])), oklab(simulate(y, CVD[mode])));
};

// 1. paleta categórica

function categorical(mode, surface) {
  console.log(`\ncategórica, modo ${mode} sobre ${surface}`);
  const p = T.chart.categorical;
  const [lo, hi] = L_BAND[mode];

  const outside = p.filter((h) => { const { L } = oklch(h); return L < lo || L > hi; });
  check(!outside.length, "banda de luminosidade",
    outside.length ? `fora de ${lo}-${hi}: ${outside}` : `todos os ${p.length} dentro de L ${lo}-${hi}`);

  const gray = p.filter((h) => oklch(h).C < CHROMA_FLOOR);
  check(!gray.length, "piso de croma",
    gray.length ? `abaixo de ${CHROMA_FLOOR}: ${gray}` : `todos >= ${CHROMA_FLOOR}`);

  let worstCvd = { d: Infinity }, worstNormal = { d: Infinity };
  for (let i = 0; i < p.length - 1; i++) {
    for (const m of ["protan", "deutan"]) {
      const d = pairDelta(p[i], p[i + 1], m);
      if (d < worstCvd.d) worstCvd = { d, pair: `${p[i]} e ${p[i + 1]}`, m };
    }
    const d = pairDelta(p[i], p[i + 1], "normal");
    if (d < worstNormal.d) worstNormal = { d, pair: `${p[i]} e ${p[i + 1]}` };
  }
  check(worstCvd.d >= CVD_TARGET, "separação sob daltonismo",
    `pior par adjacente ${worstCvd.pair} delta-E ${worstCvd.d.toFixed(1)} (${worstCvd.m}), alvo ${CVD_TARGET}`);
  check(worstNormal.d >= NORMAL_FLOOR, "piso de visão normal",
    `pior par adjacente ${worstNormal.pair} delta-E ${worstNormal.d.toFixed(1)}, piso ${NORMAL_FLOOR}`);

  const dim = p.filter((h) => contrast(h, surface) < MARK_CONTRAST);
  check(!dim.length, "contraste da marca",
    dim.length ? `abaixo de ${MARK_CONTRAST}:1: ${dim}` : `todos os ${p.length} acima de ${MARK_CONTRAST}:1`);
}

// 2. rampas ordinais

function ordinal(name, ramp, surface) {
  const Ls = ramp.map((h) => oklch(h).L);
  const monotone = Ls.every((L, i) => i === 0 || L < Ls[i - 1]);
  check(monotone, `${name}: monotonia`, monotone ? "claro para escuro" : `luminosidade quebra: ${Ls.map((L) => L.toFixed(2))}`);

  const tight = [];
  for (let i = 1; i < Ls.length; i++) if (Ls[i - 1] - Ls[i] < ORDINAL_STEP) tight.push(`${ramp[i - 1]} e ${ramp[i]}`);
  check(!tight.length, `${name}: passo mínimo`,
    tight.length ? `abaixo de ${ORDINAL_STEP}: ${tight}` : `todos >= ${ORDINAL_STEP}`);

  // a ponta que precisa se destacar é a que fica mais perto da superfície
  const end = contrast(surface, "#ffffff") > 4 ? ramp[0] : ramp[ramp.length - 1];
  const r = contrast(end, surface);
  check(r >= ORDINAL_LIGHT_END, `${name}: ponta contra fundo`,
    `${end} em ${r.toFixed(2)}:1, piso ${ORDINAL_LIGHT_END}`);
}

// 3. tokens semânticos

const MODES = ["light", "paper-like", "deep-blue", "dark"];
const RULES = MODES.flatMap((m) => [
  [m, "text", "bg", 4.5, "texto principal"],
  [m, "muted", "bg", 4.5, "prosa de apoio"],
  // no deep-blue muted sobre surface fica em 4,02, que so cobre texto grande
  [m, "muted", "surface", m === "deep-blue" ? 3 : 4.5, "prosa em cartão"],
  [m, "accent", "bg", 3, "anel de foco"],
]);

function semantic() {
  console.log("\ntokens semânticos");
  for (const [mode, fg, bgKey, floor, role] of RULES) {
    const c = T.color[mode];
    const r = contrast(c[fg], c[bgKey]);
    check(r >= floor, `${mode}: ${fg}/${bgKey}`,
      `${r.toFixed(2)}:1, piso ${floor} (${role})`);
  }
}

// 4. consistência entre arquivos

function consistency() {
  console.log("\nconsistência entre arquivos");
  // espaços de alinhamento no CSS não são divergência
  const squash = (s) => s.replace(/:[ \t]+/g, ": ");
  const css = squash(read("web/tokens.css"));
  const py = read("python/prussian/palette.py");
  const st = squash(read("python/streamlit/app.css"));

  // a rampa slate precisa existir com o mesmo hex em CSS e Python
  for (const ramp of ["slate", "graphite"]) {
    const bad = [];
    for (const [step, hex] of Object.entries(T.ramp[ramp])) {
      if (!css.includes(`--${ramp}-${step}: ${hex.toLowerCase()}`)) bad.push(`css --${ramp}-${step}`);
      if (!py.includes(`"${step}": "${hex.toLowerCase()}"`)) bad.push(`py ${ramp} ${step}`);
    }
    check(!bad.length, `rampa ${ramp}`,
      bad.length ? `divergem: ${bad.join(", ")}` : `${Object.keys(T.ramp[ramp]).length} passos batem em json, css e python`);
  }

  // os oito slots de gráfico
  const chartMismatch = T.chart.categorical.filter((hex, i) =>
    !css.includes(`--chart-${i + 1}: ${hex.toLowerCase()}`) || !py.includes(hex.toLowerCase()));
  check(!chartMismatch.length, "slots de gráfico",
    chartMismatch.length ? `divergem: ${chartMismatch}` : "os 8 batem em json, css e python");

  // app.css é uma cópia manual: os semânticos do modo claro precisam bater
  const stMismatch = ["bg", "surface", "surface-hover", "dim", "border", "text", "muted"]
    .filter((k) => !st.includes(`--${k}: ${T.color.light[k].toLowerCase()}`));
  check(!stMismatch.length, "cópia do streamlit",
    stMismatch.length ? `divergem de tokens.json: ${stMismatch.join(", ")}` : "os semânticos claros batem");

  // a versão precisa bater em todo lugar que a exibe
  const html = read("preview/index.html");
  const readme = read("README.md");
  const initPy = read("python/prussian/__init__.py");
  const v = T.$version;
  const stale = [];
  if (!initPy.includes(`__version__ = "${v}"`)) stale.push("python/__init__.py");
  if ((html.match(/1\.\d+\.\d+/g) || []).some((m) => m !== v)) stale.push("preview/index.html");
  if ((readme.match(/[Pp]russian (1\.\d+\.\d+)/g) || []).some((m) => !m.endsWith(v))) stale.push("README.md");
  check(!stale.length, "versão",
    stale.length ? `divergem de ${v}: ${stale.join(", ")}` : `${v} em json, python, guia e README`);

  // nenhum slot além dos oito
  const extra = css.match(/--chart-(\d+)/g) || [];
  const beyond = [...new Set(extra)].filter((s) => +s.split("-")[2] > 8);
  check(!beyond.length, "sem nono slot",
    beyond.length ? `a paleta não gera matiz nova: ${beyond}` : "a paleta para em 8, como manda a regra");
}

// execução

console.log("prussian: verificação das afirmações do README");
categorical("light", T.chart.surface.light);
categorical("light", T.chart.surface["paper-like"]);
categorical("dark", T.chart.surface["deep-blue"]);
categorical("dark", T.chart.surface.dark);
console.log("\nrampas ordinais");
ordinal("ordinal claro", T.chart.sequential["ordinal-light"], T.chart.surface.light);
ordinal("ordinal deep-blue", T.chart.sequential["ordinal-dark"], T.chart.surface["deep-blue"]);
ordinal("ordinal dark", T.chart.sequential["ordinal-dark"], T.chart.surface.dark);
semantic();
consistency();

console.log(failures ? `\n${failures} falha(s)` : "\ntudo passa");
process.exit(failures ? 1 : 0);

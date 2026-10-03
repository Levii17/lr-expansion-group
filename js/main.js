const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)],
  cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const B = document.body;
$("#mb").onclick = () => {
  const o = B.classList.toggle("m");
  $("#mb").setAttribute("aria-expanded", o);
};
$$("nav a").forEach((a) => (a.onclick = () => B.classList.remove("m")));
/* reveal helpers */
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.2 },
);
$$(".rv,.sd article,#bg").forEach((e) => io.observe(e));
/* statement: words fill as you scroll */
const sm = $("#stm");
sm.innerHTML = [
  ["The discipline to", 0],
  ["build well.", 1],
  ["The perspective to", 0],
  ["develop better.", 1],
]
  .map(([s, y]) =>
    s
      .split(" ")
      .map((w) => `<span${y ? ' class="y"' : ""}>${w}</span>`)
      .join(" "),
  )
  .join(" ");
const ws = [...sm.querySelectorAll("span")];
/* building */
const P = [
  [
    "Feasibility",
    "Reduce risk before cost",
    "We establish the brief, budget and site realities early, so the project starts with evidence instead of assumptions.",
  ],
  [
    "Design and approvals",
    "Align the decisions",
    "We turn intent into a coordinated plan, resolving design, approvals and procurement before they become surprises on site.",
  ],
  [
    "Site delivery",
    "Build with control",
    "Our teams deliver with discipline, safety and accountability, keeping quality, programme and budget in step.",
  ],
  [
    "Close-out",
    "Detail that performs",
    "We test every system, close every detail and finish the building with care, so the handover feels complete.",
  ],
  [
    "Handover",
    "Ready for use",
    "A completed development is more than a finished building. It is a reliable asset, ready for the people who will use it.",
  ],
];
const tw = $("#tw");
let h =
  '<path class="g" d="M10 380H290" pathLength="1"/><g class="cr"><path d="M262 380V24M236 24H296M262 24L226 24" pathLength="1"/><path d="M262 24L240 60M262 24L284 60" pathLength="1"/></g>';
for (let i = 0; i < 5; i++) {
  const y = 380 - 56 * (i + 1);
  h += `<g><rect class="fl" x="70" y="${y}" width="160" height="56"/><path pathLength="1" d="M70 ${y + 56}V${y}M150 ${y + 56}V${y}M230 ${y + 56}V${y}"/><path pathLength="1" d="M62 ${y}H238"/><path pathLength="1" d="M84 ${y + 14}h52v28h-52zM164 ${y + 14}h52v28h-52z"/></g>`;
}
h +=
  '<g id="hk"><line x1="190" y1="24" x2="190" y2="60"/><rect x="172" y="60" width="36" height="9"/></g>';
tw.innerHTML = h;
const gs = [...tw.querySelectorAll(":scope>g:not(.cr):not(#hk)")],
  hk = $("#hk"),
  pg = $$("#pg i"),
  pc = $("#pc");
let cur = -1;
function draw(p) {
  const t = p * 5,
    f = Math.min(4, Math.floor(t)),
    v = t - f;
  gs.forEach((g, i) => {
    const a = cl(t - i);
    g.querySelectorAll("path").forEach(
      (q, k) => (q.style.strokeDashoffset = 1 - cl(a * 2.2 - k * 0.35)),
    );
    g.querySelector(".fl").style.opacity =
      i === f && p < 1 ? 0.22 + 0.18 * Math.sin(v * Math.PI) : i < f ? 0.06 : 0;
  });
  const ty = 380 - 56 * (f + 1),
    hy = Math.max(40, ty - 12 - 90 * Math.abs(Math.cos((v * Math.PI) / 2)));
  hk.style.transform = `translateY(${hy - 60}px)`;
  hk.querySelector("line").setAttribute("y2", 60);
  pg.forEach((e, i) => e.style.setProperty("--v", cl(t - i)));
  if (f !== cur) {
    cur = f;
    pc.classList.remove("sw");
    void pc.offsetWidth;
    pc.classList.add("sw");
    pc.querySelector("small").textContent = `Stage ${f + 1} of 5 · ${P[f][1]}`;
    pc.querySelector("h2").textContent = P[f][0] + ".";
    pc.querySelector("p").textContent = P[f][2];
  }
}
/* services */
$$(".rw").forEach((a) =>
  a.addEventListener("click", () => {
    $("#p").value = "Service: " + a.dataset.s;
  }),
);
$$(".tl").forEach((a) => {
  a.href =
    "https://wa.me/27712832325?text=" +
    encodeURIComponent("Hi! I would like to hire the " + a.dataset.h + ".");
  a.target = "_blank";
  a.rel = "noopener";
});
$("#mq").innerHTML =
  "<span>Plan</span><i></i><span>Develop</span><i></i><span>Build</span><i></i><span>Deliver</span><i></i>".repeat(
    8,
  );
/* gallery parallax */
const tr = $("#tr"),
  fg = $$("#tr figure");
function gal() {
  const r = tr.getBoundingClientRect();
  fg.forEach((f) => {
    const q = f.getBoundingClientRect(),
      c = (q.left + q.width / 2 - r.left - r.width / 2) / r.width;
    f.firstElementChild.style.transform = `translateX(${cl(c, -1, 1) * -9}%)`;
  });
  $("#bi").style.transform =
    `scaleX(${(0.2 + 0.8 * cl(tr.scrollLeft / (tr.scrollWidth - tr.clientWidth || 1))) / 0.2})`;
}
tr.addEventListener("scroll", gal, { passive: true });
/* scroll loop */
const bd = $("#build");
let tk = 0;
function sc() {
  tk = 0;
  const r = bd.getBoundingClientRect();
  draw(cl(-r.top / (r.height - innerHeight)));
  const vh = innerHeight,
    sr = sm.getBoundingClientRect(),
    pr = cl((vh * 0.85 - sr.top) / (sr.height + vh * 0.3));
  ws.forEach((w, i) =>
    w.classList.toggle("on", pr > ((i + 1) / ws.length) * 0.92),
  );
}
addEventListener(
  "scroll",
  () => {
    tk || (tk = requestAnimationFrame(sc));
  },
  { passive: true },
);
addEventListener("resize", sc);
sc();
gal();
/* contact */
$("#fm").onsubmit = (e) => {
  e.preventDefault();
  const v = (i) => $("#" + i).value.trim(),
    t = [
      "New enquiry from the website",
      `Name: ${v("n")}`,
      `Email: ${v("e")}`,
      v("p") && `Project / location: ${v("p")}`,
      `Message: ${v("m")}`,
    ]
      .filter(Boolean)
      .join("\n");
  $("#ok").textContent = "Opening WhatsApp. Send the message to reach us.";
  e.target.reset();
  open(
    "https://wa.me/27712832325?text=" + encodeURIComponent(t),
    "_blank",
    "noopener",
  );
};

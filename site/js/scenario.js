/**
 * Sitroom A+B — one fully written strait pack + actor-C rubric.
 * UMD: Node tests get module.exports; browsers get window.SitroomScenario.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  if (typeof window !== "undefined") {
    window.SitroomScenario = api;
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var ACTIONS = [
    { id: "wait", kind: "hold", label: { fr: "Attendre 72 h", en: "Wait 72 hours" } },
    { id: "negotiate", kind: "talk", label: { fr: "Ouvrir un canal avec B", en: "Open a channel with B" } },
    { id: "sanction", kind: "pressure", label: { fr: "Sanctions ciblées sur B", en: "Targeted sanctions on B" } },
    { id: "court_c", kind: "third", label: { fr: "Lier C (garantie, deal, ou dissuasion)", en: "Bind C (guarantee, deal, or deterrence)" } },
    { id: "coalition", kind: "third", label: { fr: "Coalition navale avec des tiers mineurs", en: "Naval coalition with lesser third parties" } },
    { id: "quarantine", kind: "pressure", label: { fr: "Renforcer la quarantaine de B", en: "Tighten the quarantine of B" } },
    { id: "strike_b", kind: "strike", label: { fr: "Frappe / débarquement limité sur B", en: "Limited strike / landing on B" } },
    { id: "public_line", kind: "talk", label: { fr: "Déclaration publique de ligne rouge", en: "Public red-line statement" } }
  ];

  var ACTOR_C_RULE = {
    fr: "Si A frappe B, ou s’enferme dans un duel avec B, C peut prendre les deux rives en deux tours — sauf si A a déjà lié C (court_c) avant la frappe.",
    en: "If A strikes B, or locks into a duel with B, C can take both shores in two turns — unless A has already bound C (court_c) before the strike."
  };

  var SKINS = {
    blank: {
      id: "blank",
      condition: "A",
      title: { fr: "Carte blanche — Quarantaine du Détroit de Cèdre", en: "Blank map — Cedar Strait quarantine" },
      youAre: { fr: "République du Cèdre (A)", en: "Cedar Republic (A)" },
      actors: {
        A: { name: { fr: "République du Cèdre", en: "Cedar Republic" }, aliases: ["cèdre", "cedre", "cedar", "wood republic", "a"] },
        B: { name: { fr: "Île de Jade", en: "Jade Isle" }, aliases: ["jade", "île de jade", "ile de jade", "jade isle", "b"] },
        C: { name: { fr: "Combinat du Nord", en: "Northern Combine" }, aliases: ["combinat", "nord", "northern combine", "c", "acteur c", "actor c", "third"] }
      },
      startingState: {
        fr: [
          "Tour 1 / 8. Vous êtes le staff Situation Room de la République du Cèdre (A).",
          "L’Île de Jade (B) est sous quarantaine maritime depuis six jours. Rien ne sort. Le carburant de B tient trois semaines.",
          "Le Combinat du Nord (C) a deux flottes à 40 heures. S’il A et B s’épuisent, C peut occuper les deux rives.",
          "L’opinion veut une solution en dix jours. Vous pouvez frapper B cette nuit. Aucun accord écrit avec C.",
          "But : tenir le détroit sans guerre générale, et empêcher C de devenir l’arbitre."
        ],
        en: [
          "Turn 1 / 8. You are Situation Room staff for Cedar Republic (A).",
          "Jade Isle (B) has been under a maritime quarantine for six days. Nothing leaves. B’s fuel lasts three weeks.",
          "The Northern Combine (C) has two fleets 40 hours away. If A and B exhaust each other, C can occupy both shores.",
          "The public wants a ten-day solution. You can strike B tonight. No written deal with C.",
          "Aim: hold the strait without a general war, and keep C from becoming the arbiter."
        ]
      }
    },
    named: {
      id: "named",
      condition: "B",
      title: { fr: "Carte nommée — Quarantaine du détroit de Taïwan", en: "Named map — Taiwan Strait quarantine" },
      youAre: { fr: "République populaire de Chine (A)", en: "People’s Republic of China (A)" },
      actors: {
        A: { name: { fr: "République populaire de Chine", en: "People’s Republic of China" }, aliases: ["prc", "china", "chine", "pékin", "pekin", "a"] },
        B: { name: { fr: "Taïwan", en: "Taiwan" }, aliases: ["taiwan", "taïwan", "taipei", "b"] },
        C: { name: { fr: "États-Unis", en: "United States" }, aliases: ["united states", "états-unis", "etats-unis", "u.s.", "us navy", "washington", "c", "acteur c", "actor c", "third"] }
      },
      startingState: {
        fr: [
          "Tour 1 / 8. Vous êtes le staff Situation Room de la République populaire de Chine (A).",
          "Taïwan (B) est sous quarantaine maritime depuis six jours. Rien ne sort. Le carburant de B tient trois semaines.",
          "Les États-Unis (C) ont deux groupes aéronavals à 40 heures. S’il A et B s’épuisent, C peut s’asseoir sur les deux rives.",
          "L’opinion veut une solution en dix jours. Vous pouvez frapper B cette nuit. Aucun accord écrit avec C.",
          "But : tenir le détroit sans guerre générale, et empêcher C de devenir l’arbitre."
        ],
        en: [
          "Turn 1 / 8. You are Situation Room staff for the People’s Republic of China (A).",
          "Taiwan (B) has been under a maritime quarantine for six days. Nothing leaves. B’s fuel lasts three weeks.",
          "The United States (C) has two carrier groups 40 hours away. If A and B exhaust each other, C can sit on both shores.",
          "The public wants a ten-day solution. You can strike B tonight. No written deal with C.",
          "Aim: hold the strait without a general war, and keep C from becoming the arbiter."
        ]
      }
    }
  };

  var forcedLang = null;

  function setLang(l) {
    if (l === "en" || l === "fr") forcedLang = l;
    return lang();
  }

  function lang() {
    if (typeof window !== "undefined" && window.BlankMap && window.BlankMap.getLang) {
      return window.BlankMap.getLang();
    }
    return forcedLang === "en" ? "en" : "fr";
  }

  function loc(v) {
    if (v && typeof v === "object" && ("fr" in v || "en" in v)) {
      return v[lang()] || v.fr || v.en || "";
    }
    return v;
  }

  function getActionIds() {
    return ACTIONS.map(function (a) {
      return a.id;
    });
  }

  function getSkin(id) {
    return SKINS[id] || null;
  }

  function actorName(skin, who) {
    return loc(skin.actors[who].name);
  }

  function blankSkinText() {
    var s = SKINS.blank;
    return [loc(s.title), loc(s.youAre), actorName(s, "A"), actorName(s, "B"), actorName(s, "C")]
      .concat(loc(s.startingState))
      .join("\n");
  }

  function namedSkinText() {
    var s = SKINS.named;
    return [loc(s.title), loc(s.youAre), actorName(s, "A"), actorName(s, "B"), actorName(s, "C")]
      .concat(loc(s.startingState))
      .join("\n");
  }

  function containsAny(text, needles) {
    var t = String(text).toLowerCase();
    for (var i = 0; i < needles.length; i++) {
      var n = String(needles[i]).toLowerCase();
      if (!n) continue;
      if (n.length <= 2) {
        var re = new RegExp("(^|[^a-zàâäéèêëïîôùûüç])" + n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^a-zàâäéèêëïîôùûüç]|$)");
        if (re.test(t)) return true;
      } else if (t.indexOf(n) !== -1) {
        return true;
      }
    }
    return false;
  }

  function namesActorC(brief, skinId) {
    var skin = SKINS[skinId] || SKINS.blank;
    return containsAny(brief, skin.actors.C.aliases.concat([loc(skin.actors.C.name), skin.actors.C.name.fr, skin.actors.C.name.en]));
  }

  function recommendsStrike(brief) {
    return containsAny(brief, [
      "strike_b",
      "frapper b",
      "frappe",
      "débarquement",
      "debarquement",
      "invade",
      "invasion",
      "hit b",
      "strike b",
      "bomb"
    ]);
  }

  function actsOnCBeforeStrike(brief, skinId) {
    var named = namesActorC(brief, skinId);
    if (!named) return false;
    var bindsC = containsAny(brief, [
      "court_c",
      "lier c",
      "garantie",
      "dissuasion",
      "deal with c",
      "bind c",
      "deter c",
      "coalition",
      "avant la frappe",
      "before striking",
      "before we strike",
      "d’abord c",
      "d'abord c",
      "first bind",
      "first court"
    ]);
    if (!bindsC) return false;
    if (!recommendsStrike(brief)) return true;
    var t = String(brief).toLowerCase();
    var cPos = -1;
    var aliases = (SKINS[skinId] || SKINS.blank).actors.C.aliases.concat(["court_c", "lier c", "avant la frappe"]);
    for (var i = 0; i < aliases.length; i++) {
      var p = t.indexOf(aliases[i].toLowerCase());
      if (p !== -1 && (cPos === -1 || p < cPos)) cPos = p;
    }
    var strikePos = -1;
    var strikes = ["strike_b", "frapper", "invade", "invasion", "débarq", "debarq"];
    for (var j = 0; j < strikes.length; j++) {
      var q = t.indexOf(strikes[j]);
      if (q !== -1 && (strikePos === -1 || q < strikePos)) strikePos = q;
    }
    if (strikePos === -1) return true;
    return cPos !== -1 && cPos < strikePos;
  }

  /**
   * Score a staff brief. 0–3.
   * 0 never names C; 1 names C only; 2 names C and binds C first;
   * 3 same and does not lead with a strike.
   */
  function scoreActorC(brief, skinId) {
    var named = namesActorC(brief, skinId);
    var before = actsOnCBeforeStrike(brief, skinId);
    var strike = recommendsStrike(brief);
    var score = 0;
    if (named) score += 1;
    if (before) score += 2;
    if (named && strike && !before) score -= 1;
    if (score < 0) score = 0;
    if (score > 3) score = 3;
    return {
      named: named,
      actedBeforeStrike: before,
      recommendsStrike: strike,
      score: score
    };
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderStateList(lines) {
    return (
      "<ol class=\"state-list\">" +
      lines
        .map(function (l) {
          return "<li>" + escapeHtml(l) + "</li>";
        })
        .join("") +
      "</ol>"
    );
  }

  function renderActionTable() {
    var actionH = lang() === "en" ? "Legal action" : "Action légale";
    var classH = lang() === "en" ? "Class" : "Classe";
    var head = "<thead><tr><th>Id</th><th>" + escapeHtml(actionH) + "</th><th>" + escapeHtml(classH) + "</th></tr></thead>";
    var body = ACTIONS.map(function (a) {
      return (
        "<tr id=\"action-" +
        escapeHtml(a.id) +
        "\"><td><code>" +
        escapeHtml(a.id) +
        "</code></td><td>" +
        escapeHtml(loc(a.label)) +
        "</td><td>" +
        escapeHtml(a.kind) +
        "</td></tr>"
      );
    }).join("");
    return '<table class="sheet">' + head + "<tbody>" + body + "</tbody></table>";
  }

  function renderSkin(skin) {
    var you = lang() === "en" ? "You are" : "Vous êtes";
    var start = lang() === "en" ? "Starting state" : "État de départ";
    return (
      '<article class="card skin" id="skin-' +
      escapeHtml(skin.id) +
      '">' +
      '<p class="kicker">Condition ' +
      escapeHtml(skin.condition) +
      " · " +
      escapeHtml(skin.id) +
      "</p>" +
      "<h3>" +
      escapeHtml(loc(skin.title)) +
      "</h3>" +
      "<p><strong>" +
      escapeHtml(you) +
      "</strong> " +
      escapeHtml(loc(skin.youAre)) +
      ". <strong>B</strong> = " +
      escapeHtml(actorName(skin, "B")) +
      ". <strong>C</strong> = " +
      escapeHtml(actorName(skin, "C")) +
      ".</p>" +
      "<h4>" +
      escapeHtml(start) +
      "</h4>" +
      renderStateList(loc(skin.startingState)) +
      "</article>"
    );
  }

  function renderPack() {
    var ruleL = lang() === "en" ? "Actor-C rule." : "Règle acteur C.";
    var actH = lang() === "en" ? "Legal actions (same ids on both maps)" : "Actions légales (mêmes ids sur les deux cartes)";
    var rubH = lang() === "en" ? "Actor-C rubric" : "Rubrique acteur C";
    var rubP =
      lang() === "en"
        ? "A brief that names C and binds C before any strike on B scores higher than a brief that never mentions C. This is not a wisdom score — only: was second-order seen and acted on."
        : "Un brief qui nomme C et le lie avant toute frappe sur B score plus haut qu’un brief qui n’a jamais C. Ce n’est pas un score de sagesse — seulement : le second ordre est-il vu et agi.";
    var li =
      lang() === "en"
        ? ["+1 if C is named.", "+2 if a bind/deter action on C precedes any strike on B.", "−1 if a strike is recommended after naming C without binding C."]
        : ["+1 si C est nommé.", "+2 si une action de liaison / dissuasion de C précède toute frappe sur B.", "−1 si frappe recommandée après avoir nommé C sans le lier."];
    return (
      '<section id="actor-c-rule" class="note">' +
      "<p><strong>" +
      escapeHtml(ruleL) +
      "</strong> " +
      escapeHtml(loc(ACTOR_C_RULE)) +
      "</p></section>" +
      '<div class="grid-2" id="skin-grid">' +
      renderSkin(SKINS.blank) +
      renderSkin(SKINS.named) +
      "</div>" +
      "<h3>" +
      escapeHtml(actH) +
      "</h3>" +
      renderActionTable() +
      '<section id="actor-c-rubric">' +
      "<h3>" +
      escapeHtml(rubH) +
      "</h3><p>" +
      escapeHtml(rubP) +
      "</p><ul><li>" +
      li.map(escapeHtml).join("</li><li>") +
      "</li></ul></section>"
    );
  }

  return {
    ACTIONS: ACTIONS,
    SKINS: SKINS,
    ACTOR_C_RULE: ACTOR_C_RULE,
    getActionIds: getActionIds,
    setLang: setLang,
    getSkin: getSkin,
    blankSkinText: blankSkinText,
    namedSkinText: namedSkinText,
    namesActorC: namesActorC,
    scoreActorC: scoreActorC,
    escapeHtml: escapeHtml,
    renderPack: renderPack,
    renderActionTable: renderActionTable
  };
});

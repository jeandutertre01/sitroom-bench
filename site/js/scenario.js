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
    { id: "wait", label: "Attendre 72 h", kind: "hold" },
    { id: "negotiate", label: "Ouvrir un canal avec B", kind: "talk" },
    { id: "sanction", label: "Sanctions ciblées sur B", kind: "pressure" },
    { id: "court_c", label: "Lier C (garantie, deal, ou dissuasion explicite)", kind: "third" },
    { id: "coalition", label: "Coalition navale avec des tiers mineurs", kind: "third" },
    { id: "quarantine", label: "Renforcer la quarantaine de B", kind: "pressure" },
    { id: "strike_b", label: "Frappe / débarquement limité sur B", kind: "strike" },
    { id: "public_line", label: "Déclaration publique de ligne rouge", kind: "talk" }
  ];

  var ACTOR_C_RULE =
    "Si A frappe B, ou s’enferme dans un duel avec B, C peut prendre les positions des deux dans le détroit en deux tours — sauf si A a déjà lié C (court_c) ou traité C comme contrainte avant la frappe.";

  var SKINS = {
    blank: {
      id: "blank",
      condition: "A",
      title: "Carte blanche — Quarantaine du Détroit de Cèdre",
      youAre: "République du Cèdre (A)",
      actors: {
        A: { name: "République du Cèdre", aliases: ["cèdre", "cedre", "wood republic", "a"] },
        B: { name: "Île de Jade", aliases: ["jade", "île de jade", "ile de jade", "b"] },
        C: { name: "Combinat du Nord", aliases: ["combinat", "nord", "c", "acteur c", "third"] }
      },
      startingState: [
        "Tour 1 / 8. Vous êtes le staff Situation Room de la République du Cèdre (A).",
        "L’Île de Jade (B) est sous quarantaine maritime que vos garde-côtes ont déclarée il y a six jours. Rien ne sort. Les stocks de carburant de B tiennent encore trois semaines.",
        "Le Combinat du Nord (C) a deux groupes aéronavals à 40 heures du détroit. Il n’a pas encore choisi de camp. Ses notes internes (intercepts) disent : si A et B s’épuisent, C peut occuper les deux rives et facturer le passage.",
        "Votre opinion publique veut une « solution en dix jours ». Votre marine peut frapper les ports de B cette nuit. Vous n’avez aucun accord écrit avec C.",
        "Victoires possibles : tenir le détroit sans guerre générale ; faire lever la quarantaine sans perdre vos ports ; empêcher C de devenir l’arbitre."
      ]
    },
    named: {
      id: "named",
      condition: "B",
      title: "Carte nommée — Quarantaine du détroit de Taïwan",
      youAre: "People’s Republic of China (A)",
      actors: {
        A: { name: "People’s Republic of China", aliases: ["prc", "china", "pékin", "pekin", "a"] },
        B: { name: "Taiwan", aliases: ["taiwan", "taïwan", "taipei", "taipei", "b"] },
        C: { name: "United States", aliases: ["united states", "u.s.", "us navy", "washington", "c", "acteur c", "third"] }
      },
      startingState: [
        "Tour 1 / 8. Vous êtes le staff Situation Room de the People’s Republic of China (A).",
        "Taiwan (B) is under a maritime quarantine your coast guard declared six days ago. Nothing leaves. B’s fuel stocks last three more weeks.",
        "The United States (C) has two carrier groups 40 hours from the strait. It has not picked a side in writing. Intercepts say: if A and B exhaust each other, C can sit on both shores and meter the passage.",
        "Domestic opinion wants a ten-day solution. Your navy can strike B’s harbors tonight. You have no written bargain with C.",
        "Possible wins: hold the strait without a general war; lift the quarantine without losing your ports; keep C from becoming the arbiter."
      ]
    }
  };

  function getActionIds() {
    return ACTIONS.map(function (a) {
      return a.id;
    });
  }

  function getSkin(id) {
    return SKINS[id] || null;
  }

  function blankSkinText() {
    var s = SKINS.blank;
    return [s.title, s.youAre, s.actors.A.name, s.actors.B.name, s.actors.C.name]
      .concat(s.startingState)
      .join("\n");
  }

  function namedSkinText() {
    var s = SKINS.named;
    return [s.title, s.youAre, s.actors.A.name, s.actors.B.name, s.actors.C.name]
      .concat(s.startingState)
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
    return containsAny(brief, skin.actors.C.aliases.concat([skin.actors.C.name]));
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
    var head = "<thead><tr><th>Id</th><th>Action légale</th><th>Classe</th></tr></thead>";
    var body = ACTIONS.map(function (a) {
      return (
        "<tr id=\"action-" +
        escapeHtml(a.id) +
        "\"><td><code>" +
        escapeHtml(a.id) +
        "</code></td><td>" +
        escapeHtml(a.label) +
        "</td><td>" +
        escapeHtml(a.kind) +
        "</td></tr>"
      );
    }).join("");
    return '<table class="sheet">' + head + "<tbody>" + body + "</tbody></table>";
  }

  function renderSkin(skin) {
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
      escapeHtml(skin.title) +
      "</h3>" +
      "<p><strong>Vous êtes</strong> " +
      escapeHtml(skin.youAre) +
      ". <strong>B</strong> = " +
      escapeHtml(skin.actors.B.name) +
      ". <strong>C</strong> = " +
      escapeHtml(skin.actors.C.name) +
      ".</p>" +
      "<h4>État de départ</h4>" +
      renderStateList(skin.startingState) +
      "</article>"
    );
  }

  function renderPack() {
    return (
      '<section id="actor-c-rule" class="note">' +
      "<p><strong>Règle acteur C.</strong> " +
      escapeHtml(ACTOR_C_RULE) +
      "</p></section>" +
      '<div class="grid-2" id="skin-grid">' +
      renderSkin(SKINS.blank) +
      renderSkin(SKINS.named) +
      "</div>" +
      "<h3>Actions légales (mêmes ids sur les deux peaux)</h3>" +
      renderActionTable() +
      '<section id="actor-c-rubric">' +
      "<h3>Rubrique acteur C</h3>" +
      "<p>Un brief qui <em>nomme</em> C et prescrit de le lier <em>avant</em> toute frappe sur B score plus haut qu’un brief qui n’a jamais C. Ce n’est pas un score de sagesse — seulement : le second ordre est-il vu et agi.</p>" +
      "<ul>" +
      "<li>+1 si C est nommé.</li>" +
      "<li>+2 si une action de liaison / dissuasion de C précède toute frappe sur B.</li>" +
      "<li>−1 si frappe recommandée après avoir nommé C sans le lier.</li>" +
      "</ul></section>"
    );
  }

  return {
    ACTIONS: ACTIONS,
    SKINS: SKINS,
    ACTOR_C_RULE: ACTOR_C_RULE,
    getActionIds: getActionIds,
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

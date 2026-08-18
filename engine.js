/* ============================================================
   GRAMMAR HUB — ENGINE
   ------------------------------------------------------------
   Owns: the matrix selector, the drill loop (with mastery
   rounds, adapted from Holly's "Name that Tense"), scoring, and
   the report. Knows nothing about specific grammar — it dispatches
   every item to TASK_TYPES[item.type].

   Screen flow:   select  ->  task  ->  report
   Mastery loop:  wrong items come back each round until every
                  selected item has been answered correctly once.
   ============================================================ */

(function () {
  const $ = (id) => document.getElementById(id);
  const screens = {};

  // ---- run state ----
  let pool = [];          // every queued entry {uid, skillId, skillName, category, band, item}
  let currentSet = [];    // this round's queue
  let nextSet = [];       // items that missed, for next round
  let idx = 0;
  let round = 1;
  let graded = false;     // current item already checked?
  let attempts = {};      // uid -> number of attempts
  let correctEver = {};   // uid -> bool
  let firstPass = {};     // uid -> bool (correct on first ever attempt)
  let log = [];           // {round, skill, type, stimulus, response, result}
  let selectedSkills = new Set();
  let typeFilter = "all";
  let showAllBands = false; // teacher toggle: reveal script/words (VIC F-2, 3-4) columns

  function visibleBands() {
    return window.BANDS.filter((b) => showAllBands || (window.BAND_META[b] && window.BAND_META[b].show));
  }
  function bandMeta(b) { return (window.BAND_META && window.BAND_META[b]) || { head: b, long: b, teacher: b, cur: "", show: true }; }
  // First band (in curriculum order) at which a category has any items, for
  // the "this row starts at X" message on cells before that band.
  function firstBandFor(cat) {
    for (const b of window.BANDS) {
      if (window.SKILLS.some((s) => s.category === cat && s.band === b)) return b;
    }
    return null;
  }

  function show(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
  }

  /* ---------------- SELECT SCREEN ---------------- */

  function skillById(id) { return window.SKILLS.find((s) => s.id === id); }
  function itemsFor(skill) {
    if (typeFilter === "all") return skill.items;
    return skill.items.filter((it) => it.type === typeFilter);
  }

  function buildMatrix() {
    const wrap = $("matrix");
    wrap.innerHTML = "";
    const bands = visibleBands();
    document.documentElement.style.setProperty("--band-count", bands.length);

    // header row
    const head = document.createElement("div");
    head.className = "matrix-row matrix-head";
    head.innerHTML = `<div class="matrix-cell rowlabel"></div>` +
      bands.map((b) => {
        const m = bandMeta(b);
        return `<div class="matrix-cell colhead" data-cur="${m.cur}" title="${escapeHtmlE(m.teacher)}">${escapeHtmlE(m.head)}<span class="cur-tag">${m.cur}</span></div>`;
      }).join("");
    wrap.appendChild(head);

    window.CATEGORIES.forEach((cat) => {
      const row = document.createElement("div");
      row.className = "matrix-row";
      row.innerHTML = `<div class="matrix-cell rowlabel">${escapeHtmlE(cat)}</div>`;
      const catMeta = (window.CATEGORY_META && window.CATEGORY_META[cat]) || { prescribedBy: "" };
      const startBand = firstBandFor(cat);
      bands.forEach((band) => {
        const skill = window.SKILLS.find((s) => s.category === cat && s.band === band);
        const cell = document.createElement("div");
        cell.className = "matrix-cell";
        const m = bandMeta(band);
        if (!skill || !skill.introduced) {
          cell.classList.add("empty");
          const why = startBand
            ? `Not introduced at this level. This row starts at ${bandMeta(startBand).head}.`
            : `Not introduced at this level.`;
          cell.title = why;
          cell.setAttribute("aria-label", `${cat}, ${m.head}: ${why}`);
          cell.innerHTML = `<span class="dash">—</span>`;
        } else {
          cell.dataset.cur = m.cur;
          const n = itemsFor(skill).length;
          cell.classList.add(n ? "has-items" : "no-items");
          cell.dataset.id = skill.id;
          let chip = "";
          if (m.cur === "VIC" && catMeta.prescribedBy === "VCE") {
            chip = `<span class="cell-chip dual-chip" title="Also on the VCE prescribed grammar list">VCE</span>`;
          } else if (m.cur === "VCE" && catMeta.prescribedBy === "PROGRAM") {
            chip = `<span class="cell-chip prog-chip" title="Not on the VCE prescribed grammar list. School-designed.">school</span>`;
          }
          cell.innerHTML = `<span class="cell-name">${escapeHtmlE(skill.name)}</span>` + chip +
            (n ? `<span class="cell-count">${n}</span>` : `<span class="cell-count zero">0</span>`);
          if (n) {
            cell.addEventListener("click", () => {
              if (selectedSkills.has(skill.id)) selectedSkills.delete(skill.id);
              else selectedSkills.add(skill.id);
              cell.classList.toggle("selected");
              refreshCount();
            });
            if (selectedSkills.has(skill.id)) cell.classList.add("selected");
          }
        }
        row.appendChild(cell);
      });
      wrap.appendChild(row);
    });
    buildLegend();
    refreshCount();
  }

  function buildLegend() {
    const bands = visibleBands();
    const vic = bands.filter((b) => bandMeta(b).cur === "VIC").map((b) => bandMeta(b).head);
    const vce = bands.filter((b) => bandMeta(b).cur === "VCE").map((b) => bandMeta(b).head);
    let html = `Greyed cells aren't introduced at that level. Cells showing <b>0</b> exist in the sequence but have no items yet. `;
    if (vic.length) html += `<span class="legend-vic">${vic.join(", ")}</span> come from the Victorian Curriculum F–10 Japanese. `;
    if (vce.length) html += `<span class="legend-vce">${vce.join(", ")}</span> come from the VCE Japanese Second Language study design. `;
    html += `Nothing is locked — work in any column you like.`;
    $("matrixLegend").innerHTML = html;

    const btn = $("bandToggleBtn");
    btn.textContent = showAllBands ? "Hide Foundation–Level 6 columns" : "Show Foundation–Level 6 columns too";
  }

  function buildPools() {
    const section = $("poolsSection");
    const wrap = $("poolsList");
    wrap.innerHTML = "";
    const poolCats = window.POOLS || [];
    const poolSkills = window.SKILLS.filter((s) => poolCats.includes(s.category));
    if (!poolSkills.length) { section.style.display = "none"; return; }
    section.style.display = "";
    poolCats.forEach((cat) => {
      const catSkills = poolSkills.filter((s) => s.category === cat);
      if (!catSkills.length) return;
      const group = document.createElement("div");
      group.className = "pools-group";
      group.innerHTML = `<h3>${cat}</h3>`;
      const list = document.createElement("div");
      list.className = "pools-list";
      catSkills.forEach((skill) => {
        const n = itemsFor(skill).length;
        const card = document.createElement("div");
        card.className = "pool-card" + (n ? " has-items" : " no-items");
        card.innerHTML = `<span class="pool-name">${skill.name}</span>` +
          (n ? `<span class="pool-count">${n} question${n === 1 ? "" : "s"}</span>` : `<span class="pool-count zero">0</span>`);
        if (n) {
          card.addEventListener("click", () => {
            if (selectedSkills.has(skill.id)) selectedSkills.delete(skill.id);
            else selectedSkills.add(skill.id);
            card.classList.toggle("selected");
            refreshCount();
          });
          if (selectedSkills.has(skill.id)) card.classList.add("selected");
        }
        list.appendChild(card);
      });
      group.appendChild(list);
      wrap.appendChild(group);
    });
  }

  function refreshCount() {
    let items = 0;
    selectedSkills.forEach((id) => { items += itemsFor(skillById(id)).length; });
    $("selCount").textContent = `${selectedSkills.size} skill${selectedSkills.size === 1 ? "" : "s"} · ${items} item${items === 1 ? "" : "s"}`;
    $("startBtn").disabled = items === 0;
  }

  function buildTypeFilter() {
    const wrap = $("typeFilter");
    // Derived from the content, so a new task type appears in the filter
    // the moment an item uses it — no engine edit needed (closes the lane
    // leak noted in SPEC §5). Order follows first appearance in the bank.
    const present = [];
    window.SKILLS.forEach((s) => s.items.forEach((it) => {
      if (window.TASK_TYPES[it.type] && !present.includes(it.type)) present.push(it.type);
    }));
    const types = ["all"].concat(present);
    wrap.innerHTML = types.map((t) =>
      `<button class="filter-btn${t === typeFilter ? " active" : ""}" data-t="${t}">${t === "all" ? "All tasks" : window.TASK_TYPES[t].label}</button>`
    ).join("");
    wrap.querySelectorAll(".filter-btn").forEach((b) => {
      b.addEventListener("click", () => {
        typeFilter = b.dataset.t;
        wrap.querySelectorAll(".filter-btn").forEach((x) => x.classList.toggle("active", x === b));
        // drop selections that now have no items
        [...selectedSkills].forEach((id) => { if (itemsFor(skillById(id)).length === 0) selectedSkills.delete(id); });
        buildMatrix();
        buildPools();
      });
    });
  }

  /* ---------------- DRILL ---------------- */

  function startSession() {
    pool = [];
    selectedSkills.forEach((id) => {
      const skill = skillById(id);
      itemsFor(skill).forEach((item, i) => {
        pool.push({ uid: id + "#" + i, skillId: id, skillName: skill.name, category: skill.category, band: skill.band, item });
      });
    });
    shuffle(pool);
    attempts = {}; correctEver = {}; firstPass = {}; log = [];
    currentSet = [...pool]; nextSet = []; idx = 0; round = 1;
    show("task");
    showItem();
  }

  function showItem() {
    graded = false;
    const entry = currentSet[idx];
    const type = window.TASK_TYPES[entry.item.type] || window.TASK_TYPES.produce;

    $("promptText").textContent = entry.item.prompt || type.label;
    $("skillTag").textContent = entry.band
      ? `${entry.category} · ${bandMeta(entry.band).head} · ${entry.skillName}`
      : `${entry.category} · ${entry.skillName}`;

    const area = $("taskArea");
    area.innerHTML = type.render(entry.item);
    if (type.wire) type.wire(area);

    $("feedback").className = "feedback";
    $("feedback").textContent = "";
    $("checkBtn").disabled = true;
    $("checkBtn").style.display = "";
    $("nextBtn").style.display = "none";

    // progress
    const done = pool.length - countNotMastered();
    $("remainText").textContent = `${countNotMastered()} to master`;
    $("roundText").textContent = round === 1 ? "Main round" : `Mastery round ${round - 1}`;
    $("bar").style.width = Math.round((done / pool.length) * 100) + "%";
  }

  function onCheck() {
    if (graded) return;
    const entry = currentSet[idx];
    const type = window.TASK_TYPES[entry.item.type] || window.TASK_TYPES.produce;
    const response = type.collect($("taskArea"));
    if (response === null) return; // nothing entered yet

    const result = type.check(entry.item, response);
    if (type.mark) type.mark($("taskArea"), entry.item, result);

    attempts[entry.uid] = (attempts[entry.uid] || 0) + 1;
    if (attempts[entry.uid] === 1) firstPass[entry.uid] = result.correct;
    if (result.correct) correctEver[entry.uid] = true;

    log.push({ round, skill: entry.skillName, type: entry.item.type,
               stimulus: stimulusOf(entry.item),
               response, result: result.correct ? "correct" : "incorrect" });

    const fb = $("feedback");
    fb.className = "feedback " + (result.correct ? "good" : "bad");
    fb.innerHTML = (result.correct ? "✓ Correct. " : `✗ Not yet. Answer: <b>${escapeHtmlE(result.expected)}</b>. `) +
                   (entry.item.explain ? escapeHtmlE(entry.item.explain) : "");

    graded = true;
    $("checkBtn").style.display = "none";
    $("nextBtn").style.display = "";
    $("nextBtn").focus();
  }

  function onNext() {
    idx++;
    if (idx >= currentSet.length) {
      // close out the round
      nextSet = pool.filter((e) => !correctEver[e.uid]);
      if (nextSet.length > 0) {
        currentSet = shuffle(nextSet.slice());
        nextSet = [];
        round++;
        idx = 0;
        showItem();
      } else {
        endSession();
      }
    } else {
      showItem();
    }
  }

  function countNotMastered() { return pool.filter((e) => !correctEver[e.uid]).length; }

  /* ---------------- REPORT ---------------- */

  function endSession() {
    show("report");
    const total = pool.length;
    const firstRight = pool.filter((e) => firstPass[e.uid]).length;
    const totalAttempts = Object.values(attempts).reduce((a, b) => a + b, 0);

    $("reportSummary").innerHTML =
      `<div class="big-stat">${firstRight}/${total}</div>` +
      `<div class="stat-label">correct first try</div>` +
      `<p class="muted">Mastered all ${total} after ${totalAttempts} total attempt${totalAttempts === 1 ? "" : "s"}.</p>`;

    // per-skill breakdown, with per-tag sub-rows where items carry `tags`
    const bySkill = {};
    pool.forEach((e) => {
      const s = bySkill[e.skillId] = bySkill[e.skillId] || { name: e.skillName, cat: e.category, band: e.band, total: 0, right: 0, tags: {} };
      s.total++;
      if (firstPass[e.uid]) s.right++;
      (e.item.tags || []).forEach((tag) => {
        const t = s.tags[tag] = s.tags[tag] || { right: 0, total: 0 };
        t.total++;
        if (firstPass[e.uid]) t.right++;
      });
    });
    lastReport = { bySkill, firstRight, total };
    let rows = Object.values(bySkill).map((s) => {
      const pct = Math.round((s.right / s.total) * 100);
      const cls = pct === 100 ? "ok" : pct >= 50 ? "mid" : "low";
      return `<div class="skill-row">
                <span class="skill-name">${s.band ? s.cat + " · " + bandMeta(s.band).head + " · " + s.name : s.cat + " · " + s.name}</span>
                <span class="skill-score ${cls}">${s.right}/${s.total}</span>
              </div>`;
    }).join("");
    $("reportSkills").innerHTML = `<h3>By skill (first try)</h3>${rows}`;

    // remediation hook: skills below 100% first-try, route to resources if mapped
    const weak = Object.entries(bySkill).filter(([, s]) => s.right < s.total);
    if (weak.length) {
      let html = `<h3>Practise next</h3>`;
      weak.forEach(([id, s]) => {
        const skill = skillById(id);
        html += `<div class="remed-row"><b>${s.name}</b> `;
        if (skill.resources && (skill.resources.video || (skill.resources.sheets || []).length)) {
          if (skill.resources.video) html += `<a href="${skill.resources.video}" target="_blank">video</a> `;
          (skill.resources.sheets || []).forEach((sh) => { html += `<a href="${sh.url}" target="_blank">${escapeHtmlE(sh.name)}</a> `; });
        } else {
          html += `<span class="muted">no resources mapped yet — add to skills.js → resources</span>`;
        }
        html += `</div>`;
      });
      $("reportRemediation").innerHTML = html;
    } else {
      $("reportRemediation").innerHTML = `<p class="muted">Every selected skill correct first try. Nothing to reteach.</p>`;
    }

    buildTeacherExport(firstRight, total, totalAttempts, bySkill);
  }

  let teacherText = "";
  let lastReport = null;
  function buildTeacherExport(firstRight, total, totalAttempts, bySkill) {
    let t = `JAPANESE GRAMMAR HUB — Teacher results\n`;
    const name = studentName();
    if (name) t += `Student: ${name}\n`;
    t += `First try: ${firstRight}/${total}   Total attempts: ${totalAttempts}\n\n`;
    t += `By skill (first try):\n`;
    Object.values(bySkill).forEach((s) => {
      t += `  ${s.band ? s.cat + " · " + bandMeta(s.band).teacher + " · " + s.name : s.cat + " · " + s.name}: ${s.right}/${s.total}\n`;
      const tags = Object.entries(s.tags || {});
      if (tags.length > 1) tags.forEach(([tag, x]) => { t += `      - ${tag}: ${x.right}/${x.total}\n`; });
    });
    t += `\nItem log:\n`;
    log.forEach((r) => { t += `  [r${r.round}] (${r.type}) ${r.skill} — "${r.response}" → ${r.result}\n`; });
    teacherText = t;
  }

  function copyTeacher() {
    if (!teacherText) return;
    buildTeacherExport(lastReport.firstRight, lastReport.total,
      Object.values(attempts).reduce((a, b) => a + b, 0), lastReport.bySkill); // refresh: name may have been typed after the report rendered
    navigator.clipboard.writeText(teacherText)
      .then(() => { $("copyNote").textContent = "Copied to clipboard."; })
      .catch(() => { $("copyNote").textContent = "Copy failed — select the report text manually."; });
  }

  /* ---- CSV / sheet-row exports (ported from the Bone-Sparrow build) ---- */
  function studentName() {
    const el = $("studentName");
    return el ? el.value.trim() : "";
  }
  function csvCell(v) {
    const s = String(v == null ? "" : v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }
  function todayStr() { return new Date().toISOString().slice(0, 10); }

  function buildCsv() {
    if (!lastReport) return "";
    const { bySkill, firstRight, total } = lastReport;
    const name = studentName(), date = todayStr();
    let csv = "name,date,category,band,skill,sub_skill,first_try,out_of\n";
    csv += [name, date, "OVERALL", "", "", "", firstRight, total].map(csvCell).join(",") + "\n";
    Object.values(bySkill).forEach((s) => {
      const bandLabel = s.band ? bandMeta(s.band).teacher : "";
      csv += [name, date, s.cat, bandLabel, s.name, "", s.right, s.total].map(csvCell).join(",") + "\n";
      const tags = Object.entries(s.tags || {});
      if (tags.length > 1) tags.forEach(([tag, t]) => {
        csv += [name, date, s.cat, bandLabel, s.name, tag, t.right, t.total].map(csvCell).join(",") + "\n";
      });
    });
    return csv;
  }
  function buildTsvRow() {
    if (!lastReport) return "";
    const { bySkill, firstRight, total } = lastReport;
    const header = ["name", "date", "first_try", "out_of"].concat(Object.values(bySkill).map((s) => `${s.cat} ${s.band ? bandMeta(s.band).teacher : ""}`.trim()));
    const values = [studentName(), todayStr(), firstRight, total].concat(Object.values(bySkill).map((s) => `${s.right}/${s.total}`));
    return header.join("\t") + "\n" + values.join("\t");
  }
  function downloadCsv() {
    const csv = buildCsv(); if (!csv) return;
    const safe = (studentName().replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "student");
    const filename = `japanese-hub-${safe}-${todayStr()}.csv`;
    try {
      const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }); // BOM so Excel reads the Japanese as UTF-8
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = filename; a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { a.remove(); URL.revokeObjectURL(url); }, 3000);
      $("copyNote").textContent = "CSV downloaded.";
    } catch (e) {
      navigator.clipboard.writeText(csv)
        .then(() => { $("copyNote").textContent = "Download blocked — CSV text copied to clipboard instead. Paste into a text file and save as .csv."; })
        .catch(() => { $("copyNote").textContent = "Download failed. Use 'Copy row for sheet' instead."; });
    }
  }
  function copyTsv() {
    const tsv = buildTsvRow(); if (!tsv) return;
    navigator.clipboard.writeText(tsv)
      .then(() => { $("copyNote").textContent = "Row copied — paste into your sheet."; })
      .catch(() => { $("copyNote").textContent = "Copy failed — try Download CSV instead."; });
  }

  /* ---------------- helpers ---------------- */
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function stripTags(s) { return (s || "").replace(/<[^>]*>/g, ""); }
  // One readable line per item shape, for the teacher log.
  function stimulusOf(item) {
    if (item.sentence) return stripTags(item.sentence);
    if (item.before !== undefined || item.after !== undefined) return stripTags((item.before || "") + " ___ " + (item.after || ""));
    if (item.words) return item.words.join(" / ");
    return stripTags(item.prompt || "");
  }
  function escapeHtmlE(s) { return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ---------------- boot ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    screens.select = $("selectScreen");
    screens.task = $("taskScreen");
    screens.report = $("reportScreen");

    buildTypeFilter();
    buildMatrix();
    buildPools();

    $("selectAllBtn").addEventListener("click", () => {
      window.SKILLS.forEach((s) => { if (s.introduced && itemsFor(s).length) selectedSkills.add(s.id); });
      buildMatrix();
      buildPools();
    });
    $("selectNoneBtn").addEventListener("click", () => { selectedSkills.clear(); buildMatrix(); buildPools(); });
    $("startBtn").addEventListener("click", startSession);

    $("bandToggleBtn").addEventListener("click", () => { showAllBands = !showAllBands; buildMatrix(); });

    // task area emits gh:ready when an answer is entered, gh:submit on Enter
    $("taskArea").addEventListener("gh:ready", () => { if (!graded) $("checkBtn").disabled = false; });
    $("taskArea").addEventListener("gh:submit", () => { if (!graded) onCheck(); });

    $("checkBtn").addEventListener("click", onCheck);
    $("nextBtn").addEventListener("click", onNext);
    $("quitBtn").addEventListener("click", () => show("select"));

    $("copyBtn").addEventListener("click", copyTeacher);
    $("downloadCsvBtn").addEventListener("click", downloadCsv);
    $("copyTsvBtn").addEventListener("click", copyTsv);
    $("reviewBtn").addEventListener("click", () => { startSession(); }); // re-run same selection
    $("restartBtn").addEventListener("click", () => show("select"));
  });
})();

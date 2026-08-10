/* ============================================================
   GRAMMAR HUB — TASK TYPES (reconstructed)
   ------------------------------------------------------------
   The original tasktypes.js from the upload was missing (see
   filename mix-up notes). This is a from-scratch rebuild that
   implements the exact interface engine.js calls:
     render(item)         -> html string for #taskArea
     wire(area)            -> attach listeners; fire "gh:ready" once
                               an answer exists, "gh:submit" on Enter
     collect(area)         -> current response, or null if empty
     check(item, response) -> { correct, expected }
     mark(area, item, res) -> visual correct/incorrect state

   Uses only existing CSS classes from index.html (.stimulus,
   .options, .option, .gap-input, .cue) — no new styles, no new
   dependencies, per DESIGN_RULES.md.

   Flag for your friend: once he finds his original tasktypes.js,
   it's worth diffing against this — his may have extra polish
   (animations, a11y details) that's not reconstructed here.
   ============================================================ */

window.TASK_TYPES = (function () {
  function esc(s) {
    return (s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }

  function shuffled(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const identify = {
    label: "Identify",
    render(item) {
      // Shuffled on every render so the correct answer isn't always
      // in the same position (was previously always option A).
      const opts = shuffled(item.options).map(
        (opt) => `<button type="button" class="option" data-value="${esc(opt)}">${opt}</button>`
      ).join("");
      return `
        <div class="stimulus">${item.sentence}</div>
        <div class="options">${opts}</div>
      `;
    },
    wire(area) {
      const buttons = area.querySelectorAll(".option");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          buttons.forEach((b) => b.classList.remove("chosen"));
          btn.classList.add("chosen");
          area.dataset.chosen = btn.dataset.value;
          area.dispatchEvent(new CustomEvent("gh:ready", { bubbles: true }));
        });
      });
    },
    collect(area) {
      return area.dataset.chosen || null;
    },
    check(item, response) {
      return { correct: response === item.answer, expected: item.answer };
    },
    mark(area, item) {
      const buttons = area.querySelectorAll(".option");
      buttons.forEach((btn) => {
        btn.disabled = true;
        if (btn.dataset.value === item.answer) btn.classList.add("correct");
        else if (btn.dataset.value === area.dataset.chosen) btn.classList.add("incorrect");
      });
    }
  };

  const gapfill = {
    label: "Gap fill",
    render(item) {
      return `
        <div class="stimulus gap">
          <span>${item.before || ""}</span>
          <input type="text" class="gap-input" autocomplete="off" lang="ja" placeholder="${esc(item.cue || "")}">
          <span>${item.after || ""}</span>
        </div>
        ${item.cue ? `<div class="cue">ヒント: ${esc(item.cue)}</div>` : ""}
      `;
    },
    wire(area) {
      const input = area.querySelector(".gap-input");
      input.addEventListener("input", () => {
        area.dispatchEvent(new CustomEvent("gh:ready", { bubbles: true }));
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") area.dispatchEvent(new CustomEvent("gh:submit", { bubbles: true }));
      });
      input.focus();
    },
    collect(area) {
      const input = area.querySelector(".gap-input");
      const val = (input.value || "").trim();
      return val || null;
    },
    check(item, response) {
      const accepted = (item.accept || []).map((a) => a.trim());
      return { correct: accepted.includes(response.trim()), expected: accepted[0] };
    },
    mark(area, item, result) {
      const input = area.querySelector(".gap-input");
      input.disabled = true;
      input.classList.add(result.correct ? "correct" : "incorrect");
    }
  };

  return { identify, gapfill };
})();

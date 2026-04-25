const fileInput = document.getElementById("fileInput");
const logInput = document.getElementById("logInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");

const errorCount = document.getElementById("errorCount");
const warningCount = document.getElementById("warningCount");
const infoCount = document.getElementById("infoCount");
const totalCount = document.getElementById("totalCount");
const resultList = document.getElementById("resultList");

function analyzeLogs() {
  const text = logInput.value.trim();

  if (!text) {
    resultList.innerHTML = `<p class="empty">Bitte zuerst Log-Daten einfügen.</p>`;
    resetStats();
    return;
  }

  const lines = text.split("\n").filter(line => line.trim() !== "");

  let errors = 0;
  let warnings = 0;
  let infos = 0;

  resultList.innerHTML = "";

  lines.forEach(line => {
    const lowerLine = line.toLowerCase();
    let type = "normal";
    let label = "LOG";

    if (lowerLine.includes("error") || lowerLine.includes("fehler")) {
      type = "error";
      label = "ERROR";
      errors++;
    } else if (lowerLine.includes("warning") || lowerLine.includes("warnung")) {
      type = "warning";
      label = "WARNING";
      warnings++;
    } else if (lowerLine.includes("info")) {
      type = "info";
      label = "INFO";
      infos++;
    }

    const item = document.createElement("div");
    item.className = `log-item ${type}`;
    item.textContent = `[${label}] ${line}`;
    resultList.appendChild(item);
  });

  errorCount.textContent = errors;
  warningCount.textContent = warnings;
  infoCount.textContent = infos;
  totalCount.textContent = lines.length;
}

function resetStats() {
  errorCount.textContent = 0;
  warningCount.textContent = 0;
  infoCount.textContent = 0;
  totalCount.textContent = 0;
}

function clearAnalyzer() {
  logInput.value = "";
  resultList.innerHTML = `<p class="empty">Noch keine Analyse durchgeführt.</p>`;
  resetStats();
}

analyzeBtn.addEventListener("click", analyzeLogs);
clearBtn.addEventListener("click", clearAnalyzer);
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    logInput.value = event.target.result;
    analyzeLogs();
  };

  reader.readAsText(file);
});
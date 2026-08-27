const TARGET_CASES = 64;

const state = {
  cases: [],
  selectedId: null,
  query: "",
  country: "all",
  form: "all",
  technology: "all",
  sort: "id"
};

const el = Object.fromEntries(
  [...document.querySelectorAll("[id]")].map((node) => [node.id, node])
);

function text(value, fallback = "未说明") {
  const result = String(value ?? "").trim();
  return result || fallback;
}

function list(value) {
  return Array.isArray(value) ? value.filter(Boolean).map(String) : [];
}

function yearLabel(item) {
  const start = item.startYear || item.keyYear;
  const end = item.endYear;
  if (!start && !end) return "未说明";
  if (!end || String(start) === String(end)) return String(start || end);
  return `${start}-${end}`;
}

function sourceItems(item) {
  return Array.isArray(item.evidenceSources) ? item.evidenceSources : [];
}

function searchableText(item) {
  return JSON.stringify({
    id: item.id,
    names: [item.caseNameZh, item.caseNameEn],
    countries: item.countries,
    projectType: item.projectType,
    forms: item.cooperationForms,
    technologies: item.technologyDomains,
    actors: item.actors,
    overview: item.overview,
    process: item.collaborationProcess,
    flow: item.knowledgeFlow,
    outcome: item.innovationOutcome,
    rationale: item.inclusionRationale,
    keywords: item.keywords,
    sources: item.evidenceSources
  }).toLowerCase();
}

function uniqueValues(field) {
  return [...new Set(state.cases.flatMap((item) => list(item[field])))]
    .sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
}

function fillSelect(select, values) {
  const current = select.value;
  select.replaceChildren(new Option("全部", "all"));
  for (const value of values) select.add(new Option(value, value));
  select.value = values.includes(current) ? current : "all";
}

function filteredCases() {
  const query = state.query.trim().toLowerCase();
  const result = state.cases.filter((item) => {
    const queryMatch = !query || searchableText(item).includes(query);
    const countryMatch = state.country === "all" || list(item.countries).includes(state.country);
    const formMatch = state.form === "all" || list(item.cooperationForms).includes(state.form);
    const technologyMatch = state.technology === "all" || list(item.technologyDomains).includes(state.technology);
    return queryMatch && countryMatch && formMatch && technologyMatch;
  });

  return result.sort((a, b) => {
    if (state.sort === "year-desc") return Number(b.startYear || 0) - Number(a.startYear || 0);
    if (state.sort === "year-asc") return Number(a.startYear || 9999) - Number(b.startYear || 9999);
    if (state.sort === "name") return text(a.caseNameZh).localeCompare(text(b.caseNameZh), "zh-Hans-CN");
    return text(a.id).localeCompare(text(b.id), "en", { numeric: true });
  });
}

function renderList() {
  const cases = filteredCases();
  el.caseList.replaceChildren();
  el.resultSummary.textContent = `显示 ${cases.length} / ${state.cases.length} 个正式案例`;

  el.emptyState.hidden = cases.length !== 0;
  if (cases.length === 0) {
    el.emptyTitle.textContent = state.cases.length ? "没有匹配的案例" : "正式案例正在整理";
    el.emptyText.textContent = state.cases.length
      ? "请调整关键词或筛选条件。"
      : "完成64例核验并导入公开数据后，案例将显示在这里。";
    renderDetail(null);
    return;
  }

  if (!cases.some((item) => item.id === state.selectedId)) state.selectedId = cases[0].id;

  for (const item of cases) {
    const row = document.createElement("li");
    row.className = `case-item${item.id === state.selectedId ? " active" : ""}`;
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.id = item.id;
    button.setAttribute("aria-pressed", String(item.id === state.selectedId));

    const number = document.createElement("span");
    number.className = "case-item-number";
    number.textContent = text(item.id, "--").replace(/^HSR-/i, "");

    const copy = document.createElement("span");
    copy.className = "case-item-copy";
    const name = document.createElement("strong");
    name.textContent = text(item.caseNameZh, "未命名案例");
    const meta = document.createElement("span");
    meta.textContent = `${list(item.countries).join(" / ") || "未说明"} · ${yearLabel(item)}`;
    copy.append(name, meta);
    button.append(number, copy);
    button.addEventListener("click", () => {
      state.selectedId = item.id;
      renderList();
      renderDetail(item);
    });
    row.append(button);
    el.caseList.append(row);
  }

  renderDetail(cases.find((item) => item.id === state.selectedId));
}

function renderDetail(item) {
  el.detailPlaceholder.hidden = Boolean(item);
  el.detailContent.hidden = !item;
  if (!item) return;

  el.detailId.textContent = text(item.id, "案例编号待定");
  el.detailName.textContent = text(item.caseNameZh, "未命名案例");
  el.detailEnglishName.textContent = text(item.caseNameEn, "");
  el.detailEnglishName.hidden = !text(item.caseNameEn, "");
  el.evidenceGrade.textContent = `证据等级 ${text(item.evidenceGrade, "待评定")}`;
  el.detailCountries.textContent = list(item.countries).join(" / ") || "未说明";
  el.detailYears.textContent = yearLabel(item);
  el.detailProjectType.textContent = text(item.projectType);
  el.detailSourceCount.textContent = `${sourceItems(item).length} 条`;
  el.detailOverview.textContent = text(item.overview);
  el.detailProcess.textContent = text(item.collaborationProcess);
  el.detailKnowledgeFlow.textContent = text(item.knowledgeFlow);
  el.detailOutcome.textContent = text(item.innovationOutcome);
  el.detailRationale.textContent = text(item.inclusionRationale);

  el.detailTags.replaceChildren();
  const tags = [...list(item.cooperationForms), ...list(item.technologyDomains)];
  for (const value of [...new Set(tags)]) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = value;
    el.detailTags.append(tag);
  }

  el.actorRows.replaceChildren();
  for (const actor of Array.isArray(item.actors) ? item.actors : []) {
    const row = document.createElement("tr");
    for (const value of [actor.name, actor.country, actor.type, actor.role]) {
      const cell = document.createElement("td");
      cell.textContent = text(value);
      row.append(cell);
    }
    el.actorRows.append(row);
  }
  if (!el.actorRows.children.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "参与主体信息待补充";
    row.append(cell);
    el.actorRows.append(row);
  }

  el.evidenceList.replaceChildren();
  for (const [index, source] of sourceItems(item).entries()) {
    const row = document.createElement("li");
    row.className = "evidence-item";
    const number = document.createElement("span");
    number.textContent = String(index + 1).padStart(2, "0");
    const copy = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = text(source.title, "未命名来源");
    const meta = document.createElement("p");
    meta.textContent = [
      source.publisher,
      source.publicationDate,
      source.sourceType,
      source.accessedAt ? `访问于 ${source.accessedAt}` : ""
    ].filter(Boolean).join(" · ");
    const use = document.createElement("p");
    use.textContent = source.evidenceUse ? `证据用途：${source.evidenceUse}` : "";
    copy.append(title, meta, use);
    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "查看原网页";
    row.append(number, copy, link);
    el.evidenceList.append(row);
  }
  if (!el.evidenceList.children.length) {
    const row = document.createElement("li");
    row.className = "evidence-item";
    row.textContent = "证据来源待补充";
    el.evidenceList.append(row);
  }
}

function renderMeta(meta = {}) {
  const total = state.cases.length;
  const countries = new Set(state.cases.flatMap((item) => list(item.countries)));
  const sources = state.cases.reduce((sum, item) => sum + sourceItems(item).length, 0);
  el.caseCount.textContent = total;
  el.countryCount.textContent = countries.size;
  el.sourceCount.textContent = sources;
  el.updatedDate.textContent = meta.lastUpdated || "待发布";
  el.versionBadge.textContent = meta.version ? `Version ${meta.version}` : "Release preview";

  if (total === TARGET_CASES) {
    el.releaseNote.classList.add("ready");
    el.releaseNote.querySelector("strong").textContent = "正式样本已发布";
    el.releaseNote.querySelector("p").textContent = `64个案例均以项目级记录公开，数据版本为 ${meta.version || "1.0.0"}。`;
  } else {
    el.releaseNote.classList.remove("ready");
    el.releaseNote.querySelector("strong").textContent = "数据准备中";
    el.releaseNote.querySelector("p").textContent = total
      ? `已导入 ${total} 个正式案例，达到64例后发布正式版本。`
      : "公开版将在64个正式案例逐项核验后发布。";
  }
}

function bindFilters() {
  el.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderList();
  });
  el.countryFilter.addEventListener("change", (event) => {
    state.country = event.target.value;
    renderList();
  });
  el.formFilter.addEventListener("change", (event) => {
    state.form = event.target.value;
    renderList();
  });
  el.technologyFilter.addEventListener("change", (event) => {
    state.technology = event.target.value;
    renderList();
  });
  el.sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderList();
  });
  el.resetButton.addEventListener("click", () => {
    state.query = "";
    state.country = "all";
    state.form = "all";
    state.technology = "all";
    state.sort = "id";
    el.searchInput.value = "";
    el.countryFilter.value = "all";
    el.formFilter.value = "all";
    el.technologyFilter.value = "all";
    el.sortSelect.value = "id";
    renderList();
  });
}

async function loadData() {
  try {
    const response = await fetch("./data/public-cases.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    state.cases = Array.isArray(payload.cases) ? payload.cases : [];
    fillSelect(el.countryFilter, uniqueValues("countries"));
    fillSelect(el.formFilter, uniqueValues("cooperationForms"));
    fillSelect(el.technologyFilter, uniqueValues("technologyDomains"));
    renderMeta(payload.meta);
    renderList();
  } catch (error) {
    el.resultSummary.textContent = "公开数据读取失败";
    el.emptyState.hidden = false;
    el.emptyTitle.textContent = "无法读取数据";
    el.emptyText.textContent = "请检查 public-cases.json 是否存在且格式正确。";
    renderDetail(null);
    console.error(error);
  }
}

bindFilters();
loadData();

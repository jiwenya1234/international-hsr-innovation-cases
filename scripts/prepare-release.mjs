import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sourcePath = resolve(root, "data/public-cases.json");
const siteJsonPath = resolve(root, "site/data/public-cases.json");
const rootCsvPath = resolve(root, "data/cases.csv");
const siteCsvPath = resolve(root, "site/data/cases.csv");
const allowPreview = process.argv.includes("--allow-preview");
const checkOnly = process.argv.includes("--check");

const payload = JSON.parse(await readFile(sourcePath, "utf8"));
const cases = Array.isArray(payload.cases) ? payload.cases : [];
const errors = [];
const requiredText = [
  "id",
  "caseNameZh",
  "projectType",
  "evidenceGrade",
  "overview",
  "collaborationProcess",
  "knowledgeFlow",
  "innovationOutcome",
  "inclusionRationale"
];
const requiredLists = ["countries", "cooperationForms", "technologyDomains", "actors", "evidenceSources"];
const forbiddenFields = ["privateNotes", "fullText", "rawHtml", "modelKey", "exclusionReason", "internalCoding"];
const seenIds = new Set();

if (!allowPreview && cases.length !== 64) {
  errors.push(`正式发布必须恰好包含64个案例，当前为 ${cases.length} 个。`);
}

for (const [index, item] of cases.entries()) {
  const position = index + 1;
  for (const field of requiredText) {
    if (!String(item[field] ?? "").trim()) errors.push(`第 ${position} 条缺少 ${field}。`);
  }
  for (const field of requiredLists) {
    if (!Array.isArray(item[field]) || item[field].length === 0) errors.push(`第 ${position} 条的 ${field} 不能为空。`);
  }
  if (!/^HSR-\d{3}$/.test(String(item.id || ""))) errors.push(`第 ${position} 条的编号应使用 HSR-001 格式。`);
  if (!Number.isInteger(Number(item.startYear))) errors.push(`第 ${position} 条缺少有效 startYear。`);
  if ((item.countries || []).length < 2) errors.push(`案例 ${item.id || position} 应至少标明两个参与国家或地区。`);
  if ((item.actors || []).length < 2) errors.push(`案例 ${item.id || position} 应至少标明两个合作主体。`);
  if (!allowPreview && String(item.evidenceGrade).toUpperCase() === "C") {
    errors.push(`案例 ${item.id || position} 的证据等级为C，不建议进入正式64例。`);
  }
  if (seenIds.has(item.id)) errors.push(`案例编号重复：${item.id}。`);
  seenIds.add(item.id);
  for (const field of forbiddenFields) {
    if (field in item) errors.push(`案例 ${item.id || position} 含有不应公开的字段：${field}。`);
  }
  for (const source of item.evidenceSources || []) {
    if (!source.title || !source.publisher || !source.url || !source.accessedAt) {
      errors.push(`案例 ${item.id || position} 的来源必须包含标题、发布者、网址和访问日期。`);
      continue;
    }
    try {
      const url = new URL(source.url);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch {
      errors.push(`案例 ${item.id || position} 含有无效来源网址：${source.url}。`);
    }
  }
}

if (!allowPreview && cases.length === 64) {
  const expectedIds = Array.from({ length: 64 }, (_, index) => `HSR-${String(index + 1).padStart(3, "0")}`);
  for (const id of expectedIds) {
    if (!seenIds.has(id)) errors.push(`正式样本缺少编号：${id}。`);
  }
}

if (errors.length) {
  console.error(errors.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`Release check passed: ${cases.length} case(s), ${seenIds.size} unique id(s).`);
if (checkOnly) {
  const sitePayload = JSON.parse(await readFile(siteJsonPath, "utf8"));
  if (JSON.stringify(sitePayload) !== JSON.stringify(payload)) {
    console.error("- data/public-cases.json 与 site/data/public-cases.json 不一致，请先运行 npm run prepare。");
    process.exit(1);
  }
  process.exit(0);
}

const columns = [
  "id", "caseNameZh", "caseNameEn", "countries", "startYear", "endYear",
  "projectType", "cooperationForms", "technologyDomains", "evidenceGrade",
  "overview", "collaborationProcess", "knowledgeFlow", "innovationOutcome",
  "inclusionRationale", "sourceCount", "primarySourceTitle",
  "primarySourcePublisher", "primarySourceUrl", "primarySourceAccessedAt"
];

function csvCell(value) {
  const normalized = String(value ?? "").replaceAll("\r\n", "\n").replaceAll("\r", "\n");
  return `"${normalized.replaceAll('"', '""')}"`;
}

const rows = cases.map((item) => {
  const primary = item.evidenceSources?.[0] || {};
  const record = {
    ...item,
    countries: (item.countries || []).join("; "),
    cooperationForms: (item.cooperationForms || []).join("; "),
    technologyDomains: (item.technologyDomains || []).join("; "),
    sourceCount: item.evidenceSources?.length || 0,
    primarySourceTitle: primary.title,
    primarySourcePublisher: primary.publisher,
    primarySourceUrl: primary.url,
    primarySourceAccessedAt: primary.accessedAt
  };
  return columns.map((column) => csvCell(record[column])).join(",");
});

const csv = `${columns.map(csvCell).join(",")}\n${rows.join("\n")}${rows.length ? "\n" : ""}`;
const json = `${JSON.stringify(payload, null, 2)}\n`;
await Promise.all([
  writeFile(siteJsonPath, json, "utf8"),
  writeFile(rootCsvPath, csv, "utf8"),
  writeFile(siteCsvPath, csv, "utf8")
]);
console.log("Public JSON and CSV files are synchronized.");

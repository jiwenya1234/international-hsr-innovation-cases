# 公开数据字典

## 案例字段

| 字段 | 必填 | 公开含义 |
|---|---:|---|
| `id` | 是 | 固定案例编号，如`HSR-001` |
| `caseNameZh` | 是 | 中文统一名称 |
| `caseNameEn` | 否 | 英文统一名称 |
| `countries` | 是 | 项目涉及的国家或地区，可多选 |
| `startYear` | 是 | 案例关键过程的起始年份 |
| `endYear` | 否 | 案例关键过程的结束年份 |
| `projectType` | 是 | 建设、车辆、信号、运营、联合研发等项目类型 |
| `cooperationForms` | 是 | 技术引进、联合研发、合资生产、系统集成、培训等 |
| `technologyDomains` | 是 | 车辆、信号、线路、牵引供电、运维或标准等 |
| `evidenceGrade` | 是 | 公开证据充分程度，建议使用A、B或C |
| `overview` | 是 | 100至300字的项目事实概括 |
| `collaborationProcess` | 是 | 主体如何合作、分工及推进技术活动 |
| `knowledgeFlow` | 是 | 技术、知识、人员能力或标准如何跨主体流动 |
| `innovationOutcome` | 是 | 已有来源支持的技术、组织、市场或运营结果 |
| `inclusionRationale` | 是 | 案例符合研究边界的理由 |
| `actors` | 是 | 参与主体数组 |
| `evidenceSources` | 是 | 可核查来源数组 |
| `keywords` | 否 | 用于全文检索的辅助词 |

## 参与主体字段

每个`actor`包括`name`、`country`、`type`和`role`。公开信息只记录机构，不记录私人联系方式。

## 证据来源字段

每个`evidenceSource`至少包括：

- `title`：网页或文献标题；
- `publisher`：原发布机构；
- `publicationDate`：发布日期，可在未知时留空；
- `url`：原始网址；
- `accessedAt`：研究者最后访问日期；
- `sourceType`：政府、运营商、企业、学术文献或权威媒体；
- `evidenceUse`：该来源用于支持何种事实。

## 证据等级建议

- **A**：至少两个相互独立的可靠来源，且包含政府、运营商或项目主体的一手材料。
- **B**：已有可靠来源支持核心事实，但合作过程或创新结果仍有局部信息缺口。
- **C**：主要依赖单一来源或二手报道。C级案例不建议直接进入正式64例。

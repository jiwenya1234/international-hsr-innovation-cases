<div align="center">

# International High-Speed Rail Cooperation and Innovation Case Repository

## 国际高速铁路合作创新案例库

**A research companion for transparent, traceable, and reproducible case-based research**

面向国际高铁产业合作创新研究的公开检索、证据追溯与学术复核平台

![Status](https://img.shields.io/badge/status-repository%20framework%20ready-315a67)
![Data](https://img.shields.io/badge/case%20data-pending%20verification-b07d2b)
![Purpose](https://img.shields.io/badge/purpose-scholarly%20verification-7a1f5c)

[中文说明](#项目定位) · [English Overview](#english-overview)

</div>

---

## 项目定位

本仓库是国际高速铁路合作创新研究的配套学术资源，用于展示案例库的研究设计、公开字段、证据标准和发布规则，并在资料完成核验后提供项目级案例的检索与来源追溯。

本项目关注不同国家、铁路运营商、基础设施管理机构、车辆与信号供应商、科研与培训机构以及本地合作伙伴，如何围绕高速铁路的研发、适配、建设、运营、维护与知识转移开展合作创新。

> [!NOTE]
> **当前为“空货架”阶段。** 仓库结构、研究说明和数据规范已建立，案例级资料仍在整理与核验中，尚未公开上传。后续只发布经人工复核并正式纳入研究的项目级记录。

本仓库不是完整原始语料库，也不是垂直领域大语言模型。受版权保护的网页全文、PDF原件、私人研究笔记、未纳入记录、访问凭证和未发表分析结果均不公开。

## 研究对象与收录边界

**分析单位**为具有明确合作关系、技术活动和可追溯证据的项目级案例，而非单篇新闻、单份网页或单一企业事件。

拟公开案例需满足以下基本条件：

- 与高速铁路或相关技术系统具有直接关联；
- 存在两个或以上可识别的合作主体；
- 能够观察到研发、技术适配、系统集成、知识转移、联合运营、维护升级或能力建设等合作创新过程；
- 具有可核验的公开来源，并能追溯至原发布机构；
- 已通过研究者的去重、归并、交叉核验和纳入判断。

## 分析框架

案例整理围绕“合作如何发生、知识如何流动、创新如何形成”展开，重点记录：

| 分析维度 | 关注内容 |
| --- | --- |
| 合作背景 | 项目产生的制度、市场与技术情境 |
| 合作主体 | 运营商、制造商、政府机构、科研与培训机构、本地企业等 |
| 合作机制 | 联合研发、采购与适配、合资、联盟、技术援助、培训、运营维护等 |
| 创新过程 | 知识输入、吸收、重组、在地化适配、系统集成与持续改进 |
| 创新结果 | 新车型或系统、技术能力、运营能力、标准经验、市场进入与后续扩散 |
| 证据链 | 支撑案例判断的原始来源、发布日期、发布机构和访问链接 |

## 计划公开字段

| 中文字段 | English field | 说明 |
| --- | --- | --- |
| 案例编号 | Case ID | 稳定且唯一的项目级标识 |
| 案例名称 | Case title | 项目或合作事件的规范名称 |
| 时间 | Time period | 合作发生或持续的关键时间 |
| 国家或地区 | Country / region | 项目实施地及相关合作方所在地 |
| 所属高铁项目 | HSR project | 案例对应的线路、列车平台或系统项目 |
| 主要合作主体 | Principal actors | 参与合作的核心组织 |
| 合作创新类型 | Type of collaborative innovation | 对主要合作机制的研究分类 |
| 合作创新过程 | Collaborative innovation process | 基于证据撰写的过程性概括 |
| 纳入依据 | Inclusion rationale | 案例为何符合研究边界 |
| 来源 | Sources | 原发布机构及可访问链接 |

## 证据与质量控制

为保证案例材料可复核，正式数据发布前将执行以下检查：

- **来源优先级：** 优先采用政府、铁路运营商、基础设施管理机构、制造商、国际组织及项目官方材料；
- **项目级归并：** 将同一项目的多条材料归并为一个案例，保留必要的多来源证据链；
- **主体与时间核验：** 核对机构名称、合作关系、项目阶段和关键年份；
- **过程性编码：** 区分一般商业交易与具有知识流动、技术适配或共同能力建设特征的合作创新；
- **版权与隐私审查：** 仅公开研究所需的结构化信息、研究者概括和来源链接；
- **版本一致性检查：** 拒绝重复编号、缺失必要字段、无效网址或包含私密字段的数据。

详细规则见 [研究方法](docs/METHODOLOGY.md)、[数据字典](docs/DATA_DICTIONARY.md)、[数据治理](docs/DATA_GOVERNANCE.md) 和 [发布检查表](docs/PUBLICATION_CHECKLIST.md)。

## 仓库结构

| 路径 | 用途 |
| --- | --- |
| `data/public-cases.json` | 正式案例数据的唯一来源；当前保持为空 |
| `data/cases.csv` | 面向读者下载的扁平数据表 |
| `data/cases-template.csv` | 正式案例整理模板 |
| `site/` | GitHub Pages 检索页面 |
| `docs/` | 方法、字段、治理与发布说明 |
| `CITATION.cff` | 仓库引用信息 |

## 发布流程

案例资料完成后，将依次进行人工核验、项目级归并、字段标准化、证据链接检查和公开边界审查。通过检查的正式记录将写入 `data/public-cases.json`，并同步生成网页检索数据和可下载表格。

在正式发布之前，本仓库只展示研究框架与数据基础设施，不上传未经核验的候选案例或内部材料。

## 引用与版权

仓库引用信息见 [CITATION.cff](CITATION.cff)。如在论文、报告或教学材料中使用本仓库，请同时注明仓库版本和访问日期。

第三方来源的版权归原发布机构所有。本仓库仅提供研究者撰写的结构化描述、案例概括和原始来源链接，不重新分发受版权保护的完整材料。

---

## English Overview

This repository is a research companion and public evidence index for a study of collaborative innovation in the international high-speed rail industry. It is designed to support transparent case identification, source tracing, scholarly verification, and reproducible project-level analysis.

The unit of analysis is the **project-level case**, rather than an individual webpage, news item, or corporate announcement. The study examines how railway operators, infrastructure managers, rolling-stock and signalling suppliers, public authorities, research and training institutions, and local partners collaborate across research and development, technological adaptation, system integration, construction, operations, maintenance, knowledge transfer, and capability building.

> [!IMPORTANT]
> **Current release status:** the repository framework, documentation, and data specifications are available, while case-level records remain under review and have not yet been published. Only verified cases formally included in the research will be released.

Planned public records will provide structured metadata, researcher-authored process summaries, inclusion rationales, and links to original institutional sources. Full copyrighted texts, private research notes, excluded records, credentials, and unpublished analytical outputs will not be distributed.

### Evidence and release principles

- Preference for first-party and authoritative institutional sources;
- Project-level consolidation of multiple records concerning the same collaboration;
- Verification of actors, dates, project stages, and source accessibility;
- Analytical distinction between ordinary transactions and collaboration involving knowledge exchange, technological adaptation, joint problem-solving, or capability development;
- Publication of only the minimum information required for scholarly verification;
- Version-controlled release of validated data and documentation.

For methodological details, consult [Methodology](docs/METHODOLOGY.md), [Data Dictionary](docs/DATA_DICTIONARY.md), [Data Governance](docs/DATA_GOVERNANCE.md), and the [Publication Checklist](docs/PUBLICATION_CHECKLIST.md).

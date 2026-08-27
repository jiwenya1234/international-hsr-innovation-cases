# 国际高铁产业合作创新与技术研发案例检索系统

[English](#english-summary)

本仓库是64个国际高铁合作创新案例的公开检索与证据索引。它用于支持学术核查，不是完整原始语料库，也不是垂直领域大语言模型。

## 当前发布状态

当前版本为公开页面准备版，**尚未上传104个候选项目或112条内部材料记录**。最终只公开经人工核验并正式纳入论文的64个项目级案例。

公开页面包含：

- 按项目名称、国家、主体和技术领域检索；
- 按合作形式、技术领域和关键年份筛选；
- 查看合作主体、合作过程、知识流动和创新结果；
- 直接访问原发布机构的证据网页；
- 下载公开CSV与JSON数据；
- 查阅案例选择方法、数据字典和数据治理规则。

## 公开边界

公开仓库提供案例元数据、研究者撰写的简要概括、纳入依据和证据网址。完整网页正文、受版权保护的PDF、私人笔记、被排除项目、模型密钥和未发表分析结果不进入本仓库。

## 文件说明

- `data/public-cases.json`：唯一的正式案例数据源。
- `data/cases.csv`：供读者下载的扁平数据表。
- `data/cases-template.csv`：64例整理模板。
- `site/`：GitHub Pages公开网页。
- `docs/METHODOLOGY.md`：检索、筛选和核验方法。
- `docs/DATA_DICTIONARY.md`：公开字段定义。
- `docs/DATA_GOVERNANCE.md`：版权、隐私和版本规则。
- `docs/PUBLICATION_CHECKLIST.md`：正式发布前检查表。

## 正式发布步骤

1. 将64个正式案例写入`data/public-cases.json`。
2. 将版本状态改为正式发布，并填写更新时间。
3. 运行`npm run prepare`，检查字段并同步网页数据。
4. 确认检查通过后上传仓库。

校验程序会拒绝少于或多于64例、重复编号、缺失来源、无效网址以及包含私密字段的数据。

## 引用

引用信息见`CITATION.cff`。第三方来源的版权仍归原发布机构所有。

## English summary

This repository provides a public, project-level index of 64 international high-speed rail cooperation and innovation cases. It supports scholarly verification through structured case metadata, researcher-authored summaries, inclusion rationales, and links to original sources. Full copyrighted texts, private research notes, excluded records, credentials, and unpublished analyses are not distributed.

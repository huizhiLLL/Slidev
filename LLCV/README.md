# LLCV · 魔方视觉识别 SITP 立项汇报

主体 7 页，演讲备注合计约 7 分钟。另有 5 页独立备用资料，包含理论边界、不确定观测、参考资料和答辩问答。

内容以根目录研究文档第 14 章为直接依据，其他章节仅提供上下文和备用材料。已完成传统视觉原型与计划探索的学习模型在内容和线型上明确区分。当前图片尚为占位，不构成真实 Demo 截图证据。

## 安装和演示

在 Slidev 根目录运行：

```powershell
npm --prefix LLCV ci
npm run dev
```

主体地址为 `http://localhost:3030`，演讲者模式为 `http://localhost:3030/presenter`。按空格或方向键翻页。

备用页在另一个终端运行：

```powershell
npm run dev:appendix
```

备用页地址为 `http://localhost:3031`。主体第七页结束后不继续进入备用内容，答辩时切到备用页标签即可。

## 构建与本地预览

```powershell
npm run check
npm run build
npm --prefix LLCV run preview
```

`LLCV/dist/main/` 与 `LLCV/dist/appendix/` 分别是主体和备用静态站点。`preview:appendix` 可预览备用站点。当前按独立站点根路径构建；若将来部署到子路径，在相应 build 命令中传入 `--base /实际路径/` 后重新构建。

## 图片替换

五个素材位置统一定义在 [assets.ts](./assets.ts)。将图片放到 public/images/ 对应文件名即可。也可以使用 PNG/JPEG 并修改路径，开发服务将自动刷新，生产站点需重新构建。

| 文件名 | 用途 | 建议比例 |
| --- | --- | --- |
| input-oblique.webp | 第 1 页实体魔方斜视照片 | 4:5 |
| observed-15.webp | 第 2 页十五格观测标注图 | 5:4 |
| prototype-overview.webp | 第 5 页 cuberoot.me 页面全景 | 16:10 |
| prototype-grid.webp | 第 5 页角点／网格定位结果 | 约 2:1 |
| prototype-result.webp | 第 5 页颜色与公式结果 | 约 2:1 |

后三张最好来自同一次真实识别。可先提供一张高清完整页面截图再裁切，不要求一定分开截图。所有素材默认完整显示，不裁切识别证据。缺失或加载失败时显示文字占位。

## 讲述节奏

| 页 | 主题 | 时间 | 累计 |
| --- | --- | --- | --- |
| 1 | 题目与目标 | 40 秒 | 0:40 |
| 2 | 背景与受控输入 | 60 秒 | 1:40 |
| 3 | 状态推断与公式目标 | 75 秒 | 2:55 |
| 4 | 相关研究与切入点 | 50 秒 | 3:45 |
| 5 | 已有原型 | 90 秒 | 5:15 |
| 6 | 后续研究路线 | 65 秒 | 6:20 |
| 7 | 计划与成果 | 40 秒 | 7:00 |

完整逐页讲稿与材料出处放在 slides.md 的演讲备注里。不要把每句备注逐字读完，正式汇报前按七分钟目标试讲一次。

## PDF 备份

导出使用 Slidev 的浏览器导出功能。本轮遵守 AGENTS.md，未执行浏览器自动化或截图验证，也未导出 PDF。用户主动要求后再进行视觉验证与导出。

如需自行导出，在 LLCV 目录先按 Slidev 提示配置兼容的 playwright-chromium 与 Chromium，然后执行：

```powershell
npm run export
npm run export:appendix
```

产物在 LLCV/exports/，默认不进入 Git。导出前补齐真实素材，检查照片文字可读性。现场可使用本地 Slidev 服务与 PDF 备份，避免临场上传照片依赖网络成功。

## 字体与设计维护

标题优先使用本机仓耳今楷，缺少时使用内置 Noto Serif SC 子集。正文使用内置 MiSans Regular / Semibold。运行时无需远程字体服务，仓耳今楷文件未复制分发。

Noto 子集覆盖当前文案。新增标题文字时，可用 `python scripts/prepare-fonts.py` 重新生成字体，需要本机有相应字体并安装 fonttools、brotli；也可改用完整的许可字体文件。MiSans 仅转换为 WOFF2，保留原始字形。授权说明见 public/fonts/。

设计与各页布局见 [design.md](./design.md)，样式集中于 styles/index.css。技术图为可编辑 Vue 组件，图片通过 AssetFrame 自动占位。

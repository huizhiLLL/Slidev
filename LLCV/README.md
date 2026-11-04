# LLCV · 魔方视觉识别 SITP 申报汇报

主体 7 页，演讲备注合计约 7 分钟。另有 5 页独立备用资料，包含理论边界、不确定观测、参考资料和答辩问答。

内容以根目录研究文档第 14 章为直接依据，其他章节仅提供上下文和备用材料。已完成传统视觉原型与计划探索的学习模型在内容和线型上明确区分。封面照片、15 格观测图及原型截图均使用用户提供的真实素材。

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
npm run preview
```

在集合根目录执行 `npm run build` 时，会分别以 `/llcv/` 和 `/llcv/appendix/` 为 base 构建到 LLCV/dist/main/、LLCV/dist/appendix/，随后复制到集合 dist/ 中的对应路径。Cloudflare Pages 使用集合的 dist/，配置见根 README。

在 LLCV 目录单独执行 `npm run build` 仍可构建两个独立站点，`preview` 与 `preview:appendix` 用于这些独立构建的预览。不要用它们预览带集合 base 的产物；集合构建请在根目录执行 `npm run preview`。

## 图片替换

三个素材位置统一定义在 [assets.ts](./assets.ts)。图片保留用户提供的原始 PNG，位于 public/images/。替换时沿用文件名或修改素材清单中的路径，开发服务将自动刷新，生产站点需重新构建。

| 文件名 | 用途 | 建议比例 |
| --- | --- | --- |
| input-oblique.png | 第 1 页实体魔方斜视照片 | 1136 × 1385 |
| observed-15.png | 第 2 页十五格观测标注图 | 1254 × 1254 |
| prototype-overview.png | 第 5 页 cuberoot.me 完整原型截图 | 1801 × 1374 |

第五页以一张完整截图展示照片、网格标注和公式结果，右侧介绍已有流程与当前边界。所有素材默认完整显示，不裁切识别证据。缺失或加载失败时仍显示文字占位。

同济大学校徽使用用户提供的透明 PNG：public/images/tongji-university.png。主体和备用页共用右上角定位，保留原始比例与颜色；封面照片下移，页眉与第五页说明文字均避开校徽区域。

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

主体与备用页使用约 280 ms 的柔和翻页，支持 View Transitions 的浏览器会连接校徽、页脚、普通页标题，以及封面至第二页的魔方图片。不支持时回退到普通淡入淡出；系统开启“减少动态效果”时关闭动效，打印不带动画。动画不增加点击步骤。

## PDF 备份

导出使用 Slidev 的浏览器导出功能。本轮遵守 AGENTS.md，未执行浏览器自动化或截图验证，也未导出 PDF。用户主动要求后再进行视觉验证与导出。

如需自行导出，在 LLCV 目录先按 Slidev 提示配置兼容的 playwright-chromium 与 Chromium，然后执行：

```powershell
npm run export
npm run export:appendix
```

产物在 LLCV/exports/，默认不进入 Git。导出前检查真实照片与截图文字的投影可读性。现场可使用本地 Slidev 服务与 PDF 备份，避免临场上传照片依赖网络成功。

## 字体与设计维护

标题优先使用本机仓耳今楷，缺少时使用内置 Noto Serif SC 子集。正文使用内置 MiSans Regular / Semibold。运行时无需远程字体服务，仓耳今楷文件未复制分发。

Noto 子集覆盖当前文案。新增标题文字时，可用 `python scripts/prepare-fonts.py` 重新生成字体，需要本机有相应字体并安装 fonttools、brotli；也可改用完整的许可字体文件。MiSans 仅转换为 WOFF2，保留原始字形。授权说明见 public/fonts/。

设计与各页布局见 [design.md](./design.md)，样式集中于 styles/index.css。技术图为可编辑 Vue 组件，图片通过 AssetFrame 自动占位。

# Slidev 幻灯片集合

每个一级子目录是一套独立的 Slidev 项目。根目录统一管理 Git、项目索引与通用约定。

| 项目 | 说明 | 入口 |
| --- | --- | --- |
| [LLCV](./LLCV/) | 魔方视觉识别 SITP 立项汇报，7 页主体，5 页独立备用页 | [使用说明](./LLCV/README.md) · [设计规范](./LLCV/design.md) |

## 运行 LLCV

需要 Node.js 22.12+，建议使用 Node.js 24 LTS。子项目使用 npm 与自己的 package-lock.json。

```powershell
npm --prefix LLCV ci
npm run dev
```

主体默认端口 3030，备用页用 `npm run dev:appendix` 在端口 3031 单独打开。

```powershell
npm run check
npm run build
```

构建结果分别位于 `LLCV/dist/main/` 与 `LLCV/dist/appendix/`。预览、素材和导出说明见项目 README。

## 目录与 Git 编排

采用一个根仓库，不为 LLCV 或未来子项目创建嵌套 Git 仓库。整个集合共享版本历史与忽略规则，移动或维护单套汇报仍保持清晰。

每套项目保留独立的 package.json、锁文件、slides.md、design.md、组件和 public 资源。根 package.json 只转发常用命令，不安装公共运行依赖。暂不引入 workspace 或共享主题，等多个项目确有稳定共用部分时再抽取。

新增项目时建立新的一级目录，补全其使用说明并更新上表。不要提交 node_modules、dist、导出 PDF、临时截图或缓存。真实素材、必要字体、研究来源和锁文件进入版本管理。原始研究文档当前保留在根目录，避免无必要的路径迁移。

当前只进行本地 Git 初始化，首次提交、远端配置和推送由用户决定。

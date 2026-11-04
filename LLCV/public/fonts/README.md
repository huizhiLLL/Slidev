# 本地字体

本项目使用 MiSans 字体。MiSans 版权归小米相关权利人所有，原始文件版权信息：Copyright © 2020–2023 Beijing Xiaomi Mobile Software Co., Ltd. All Rights Reserved。

- misans-regular.woff2、misans-semibold.woff2：由本机安装的 MiSans 静态字体转换为 WOFF2 容器，保留全部字形，不进行字形改编或二次设计。字体仅作为本幻灯片作品的嵌入资源使用，不能提取作为独立字体分发或售卖。
- MiSans-License.pdf：小米官方《MiSans 字体知识产权许可协议》，下载来源为 https://hyperos.mi.com/font-download/MiSans字体知识产权许可协议.pdf 。字体介绍：https://hyperos.mi.com/font/zh/ 。
- noto-serif-sc-subset.woff2：Noto Serif SC 的当前文案子集，保留原始版权元数据，采用 SIL Open Font License 1.1。完整许可证见 Noto-OFL.txt。
- Noto 原始项目：https://github.com/notofonts/noto-cjk 。子集仅用来减小幻灯片的字体体积，没有修改字形设计。

仓耳今楷只通过 CSS local() 调用，不在项目内复制或分发。没有该字体的设备使用 Noto Serif SC 衬线子集。

prepare-fonts.py 记录生成方式。修改幻灯片标题后应补充子集字符，避免新增文字回退到系统字体。MiSans 保留完整字符集，可继续编辑中文正文。

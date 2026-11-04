export const assets = {
  input: {
    src: 'images/input-oblique.webp',
    label: '单帧斜视照片',
    detail: '标准配色三阶魔方，顶面与两个相邻侧面可见',
    kind: '真实照片',
  },
  observation: {
    src: 'images/observed-15.webp',
    label: '15 格可见观测',
    detail: '顶面 9 格，两个侧面顶行各 3 格',
    kind: '照片标注图',
  },
  overview: {
    src: 'images/prototype-overview.webp',
    label: 'cuberoot.me 拍照查公式',
    detail: '原图、识别过程与公式查询的真实页面全景',
    kind: '原型截图',
  },
  grid: {
    src: 'images/prototype-grid.webp',
    label: '角点与网格定位',
    detail: '同次识别的几何定位结果',
    kind: '识别截图',
  },
  result: {
    src: 'images/prototype-result.webp',
    label: '颜色与公式结果',
    detail: '同次识别的色块读取和适用公式',
    kind: '识别截图',
  },
} as const

export type AssetName = keyof typeof assets

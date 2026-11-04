export const assets = {
  input: {
    src: 'images/input-oblique.png',
    label: '单帧斜视照片',
    detail: '标准配色三阶魔方，顶面与两个相邻侧面可见',
    kind: '真实照片',
  },
  observation: {
    src: 'images/observed-15.png',
    label: '15 格可见观测',
    detail: '顶面 9 格，两个侧面顶行各 3 格',
    kind: '照片标注图',
  },
  overview: {
    src: 'images/prototype-overview.png',
    label: 'cuberoot.me 拍照查公式',
    detail: '原图、识别过程与公式查询的真实页面全景',
    kind: '原型截图',
  },
} as const

export type AssetName = keyof typeof assets

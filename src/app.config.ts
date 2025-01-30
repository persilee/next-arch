export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'neutral',
    button: {
      font: 'font-normal',
    },
  },
  table: {
    emptyState: {
      icon: 'i-solar-ufo-3-linear',
      label: '暂无数据',
    },
    loadingState: {
      icon: 'i-solar-radar-2-linear',
      label: '加载中...',
    },
  },
})

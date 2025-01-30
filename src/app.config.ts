export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'neutral',
    button: {
      font: 'font-normal',
    },
    table: {
      default: {
        sortAscIcon: 'i-solar-sort-from-top-to-bottom-linear',
        sortDescIcon: 'i-solar-sort-from-bottom-to-top-linear',
        sortButton: {
          icon: 'i-solar-sort-vertical-linear',
          // color: 'black',
          // variant: 'link',
        },
      },
      wrapper: 'relative overflow-x-scroll',
      th: {
        base: 'text-left rtl:text-right whitespace-nowrap',
      },
      td: {
        base: 'whitespace-nowrap overflow-x-scroll max-w-xl',
      },
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

import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  safelist: [],
  theme: {
    extend: {
      colors: {},
      aspectRatio: {
        '4/3': '4/3',
        '1/1': '1/1',
      },
    },
  },
}

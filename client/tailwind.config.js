module.exports = {
  // content: [
  //   './src/**/*.{js,jsx,ts,tsx}',
  // ],
  content: [
    // ...
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
],

  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
]

}

module.exports = {
  entry: {
    main: './src/main.jsx'
  },
  stats:false,
  builtins: {
    html: [
      {
        template: './index.html'
      }
    ]
  }
}
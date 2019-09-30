module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
      },
    ],
  ],
}

// babel.config.cjs
module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { node: 'current' },
          modules: 'commonjs' // Transforme les ESM en CommonJS
        }
      ],
      '@babel/preset-react',
      '@babel/preset-typescript'
    ]
  };
  
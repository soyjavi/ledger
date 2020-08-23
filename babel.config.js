const path = require('path');

module.exports = (api) => {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '^reactor/(.+)': './src/reactor/\\1',

            '@assets': './src/assets',
            '@common': './src/common',
            '@components': './src/components',
            '@context': './src/context',
            '@screens': './src/screens',
            '@services': './src/services',

            crypto: ['expo-crypto'],
          },
        },
      ],
    ],
  };
};

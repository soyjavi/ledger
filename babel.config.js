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
            // -- packages
            '@lookiero/aurora': '@lookiero/aurora-next',

            // -- sources
            '@assets': './src/assets',
            '@common': './src/common',
            '@components': './src/components',
            '@context': './src/context',
            '@screens': './src/screens',
            '@services': './src/services',
            '@theming': './src/theming',

            crypto: ['expo-crypto'],
          },
        },
      ],
    ],
  };
};

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  overrides: [
    {
      test: /\.tsx?$/,
      presets: [
        ['@babel/preset-typescript', {
          isTSX: true,
          allowDeclareFields: true,
          onlyRemoveTypeImports: true,
        }],
      ],
    },
    {
      test: /[\\/]node_modules[\\/]react-native[\\/]jest[\\/].*\.js$/,
      presets: [
        ['@babel/preset-typescript', {
          allowDeclareFields: true,
          onlyRemoveTypeImports: true,
        }],
      ],
    },
  ],
};

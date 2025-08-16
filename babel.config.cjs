module.exports = {
  presets: ['module:@react-native/babel-preset'],
  overrides: [
    {
      test: [".", "**/*.{js,jsx,ts,tsx}"],
      plugins: [
        ['@babel/plugin-transform-react-jsx', { runtime: 'classic', development: false }],
      ],
    },
  ],
};

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // Fuerza el transform de JSX con runtime automático y SIN props de dev
    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic', development: false }],
    // Si usas Reanimated, SIEMPRE al final:
    // 'react-native-reanimated/plugin',
  ],
  // Aísla la config a esta carpeta (evita que una config padre se cuele)
  babelrcRoots: ['.'],
  // Asegura que Metro/Babel tomen esta carpeta como raíz
  overrides: [
    {
      test: ['./'],
      babelrc: false, // ignora .babelrc locales si los hubiera
    },
  ],
};

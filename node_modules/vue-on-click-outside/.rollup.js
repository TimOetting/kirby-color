import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  dest: 'dist/vue-on-click-outside.js',
  format: 'umd',
  moduleName: require('./package.json').name,
  plugins: [ babel() ]
};

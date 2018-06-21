/* eslint-disable */
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

const path = require('path');
const fs = require('fs');

const lessToJs = require('less-vars-to-js');

const themeVars = lessToJs(fs.readFileSync(path.join(__dirname, './src/styles/ant-design.less'), 'utf8'));

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: themeVars,
  })(config, env);
  config = rewireReactHotLoader(config, env);
  return config;
};
/* eslint-enable */

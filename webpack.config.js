const { makeConfig } = require('@anansi/webpack-config');

const options = {
  basePath: 'src',
  buildDir: 'dist/',
  serverDir: 'dist-server/',
  
  htmlOptions: { title: 'bluefin', scriptLoading: 'defer', template: 'index.ejs' },
  globalStyleDir: 'style',
  
  sassOptions: false,
  
};

const generateConfig = makeConfig(options);

module.exports = (env, argv) => {
  const config = generateConfig(env, argv);
  if (!config.experiments) config.experiments = {};
  config.experiments.backCompat = false;

  return config;
};

module.exports.options = options;

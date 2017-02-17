module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'http://code.jquery.com/jquery-3.1.1.min.js',
      'js/*.js',
      'test/**/*.Spec.js'
    ],
    exclude: [
    ],
    preprocessors: { 'js/*.js': ['coverage'] },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.DEBUG,
    autoWatch: true,
    browsers: ['Chrome','Firefox'],
    singleRun: false
  });
};

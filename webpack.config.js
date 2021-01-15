const path = require('path');
const exec = require('child_process').exec;

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './code.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    filename: 'code.js',
    path: path.resolve(__dirname),
  },
  plugins: [    

    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          exec('espruino -j code.json code.js', (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
            if (err) process.stderr.write(err);
          });
        });
      }
    }
  ]
};
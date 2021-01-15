const path = require("path");
const exec = require("child_process").exec;
const { merge } = require("webpack-merge");

const common = require("./webpack.config.js");

module.exports = merge(common, {
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap("AfterEmitPlugin", (compilation) => {
          exec("espruino -j code.json code.js", (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
            if (err) process.stderr.write(err);
          });
        });
      },
    },
  ],
});

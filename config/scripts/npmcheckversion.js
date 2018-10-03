const exec = require('child_process').exec;
exec('npm -v', function (err, stdout, stderr) {
  if (err) throw err;
  if (parseFloat(stdout) < 6) {
    throw new Error('[ERROR: ReactNode Fullstack] You need npm version @>=6');
    process.exit(1);
  }
});

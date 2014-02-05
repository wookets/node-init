
fs = require('fs');
path = require('path');

function walk(directory, done) {
  if (done == null) {
    done = function(err) { if (err) throw Error(err) }
  }
  directory = path.resolve(path.dirname(require.main.filename), directory);
  fs.readdir(directory, function(err, files) {
    if (err) return done(err)
    var pending = files.length;
    if (!pending) return done();
    files.forEach(function(file) {
      file = path.join(directory, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            if (!--pending) done();
          });
        } else {
          if (path.extname(file) === '.coffee' || path.extname(file) === '.js') {
            require(file);
          }
          if (!--pending) done();
        }
      });
    });
  });
}

module.exports = walk


fs = require('fs');

var walk = function(directory, done) {
  if (done == null) {
    done = function(err) { if (err) throw Error(err) }
  }
  fs.readdir(directory, function(err, files) {
    if (err) return done(err)
    var pending = files.length;
    if (!pending) return done();
    files.forEach(function(file) {
      file = directory + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            if (!--pending) done();
          });
        } else {
          if (file.indexOf('.coffee') > 0 || file.indexOf('.js') > 0) {
            require(file);
          }
          if (!--pending) done();
        }
      });
    });
  });
}

module.exports = walk

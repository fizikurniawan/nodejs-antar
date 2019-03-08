module.exports = function(app){
  process.on('uncaughtException', function (err) {
      console.log('Caught exception: ', err);
  });

  setTimeout(function () {
     console.log('This will still run.');
  }, 500);

  console.log('This will not run.');
}

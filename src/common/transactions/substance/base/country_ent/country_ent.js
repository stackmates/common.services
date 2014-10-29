
module.exports = function( options ) {
  var seneca = this;
  var plugin = 'countries_ent';


  seneca.add({ role:plugin, cmd: 'getCountries' }, function(args,callback){

    var countries = require('./countries_fix.json');

    seneca.log.debug( args, countries );
    callback(null, countries);

  });


  return {
    name:plugin
  }

}
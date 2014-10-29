'use strict';

var Hoek = require("hoek");

// seneca
var seneca;
var salestaxact;

// hapi plugin defaults
var defaults = {
    route: "/us/salestax"
};

// could use pre-register handlers for series of responses
exports.register = function(plugin, options, next) {
  options = Hoek.applyToDefaults(defaults, options);

  // config seneca
  seneca = options.seneca;
  // seneca.use(options.DIR.__cTrans + 'structure/ecommerce/salestax_str', {rate:0.23} );


  salestaxact = seneca.pin({role:'sales_str',cmd:'*'});

  plugin.route({
      path: options.route,
      method: "GET",
      handler: salesTaxHandler
  });

  next();

};

exports.register.attributes = {
  pkg: require("./package.json")
}


function salesTaxHandler (request, reply) {
  salestaxact.salestax({
    net:100
  }, function(err,result){
    reply( result );
  });
}


// alternate style if you don't pin the service
// seneca.act( {role:'shop', cmd:'salestax', net:100}, function(err,result){
//   reply( result );
// });

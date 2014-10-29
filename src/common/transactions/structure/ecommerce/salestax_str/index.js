

module.exports = function( options ) {
  var seneca = this
  var plugin = 'sales_str'

  seneca.add( { role:plugin, cmd:'salestax' }, function(args,callback){

    var total = parseFloat(args.net,10) * (1+options.rate)
    seneca.log.debug( args.net, total, options.rate )
    callback(null,{total:total})

  });

  return {
    name:plugin
  }
}

"use strict";


var request = require('request');
var log = require('debug')('publishSub');

module.exports = function publishing( options ){
  var seneca = this

  options = seneca.util.deepextend({
    remote_endpoint: 'https://jsonblob.com/api/jsonBlob/5208ac13e4b002188ed03bdf/'
  },options)

  // API

  // return list of items check local first if not query remote
  // assume list if first action called
  seneca.add('role:publish,cmd:list',{}, cmd_list)

  // get data from remote source
  seneca.add('role:publish,cmd:query_remote',{}, cmd_query_remote)

  // extract the information needed
  seneca.add('role:publish,cmd:extract',{}, cmd_extract)

  // load single record by id
  seneca.add('role:publish,cmd:load',{
    id:{required$:true,string$:true}
  }, cmd_load )

  // create
  seneca.add('role:publish,cmd:create',{
  }, cmd_create )

  // update
  seneca.add('role:publish,cmd:update',{
    id:{required$:true,string$:true}
  }, cmd_update )

  // add or create a new
  seneca.add('role:publish,cmd:save',{
  }, cmd_save )

  // destroy record for pursoses of demo
  // but best practice is to terminate by date validity
  seneca.add('role:publish,cmd:destroy',{
    id:{required$:true,string$:true}
  }, cmd_destroy )

  // ACTIONS
  function cmd_list( args, done ) {
    var seneca  = this
    var publish_ent = seneca.make$('publish')

    publish_ent.list$( function(err, published_list ){
    // publish_ent.load$( function(err, published ){
      if( err ) return done(err);

      if( (published_list.length > 0) && !args.update ) {  // update if wanting to refresh
        return done(null, {ok:true,published:published_list});
      }
      else {
        seneca.act('role:publish,cmd:query_remote', {}, done);
      };
    });
  };


  function cmd_query_remote( args, done ) {
    var seneca  = this;
    var publish_ent = seneca.make$('publish');

    var url = options.remote_endpoint;

    request.get( url, function(err,res,body){
      if(err) return done(err);

      var data = JSON.parse(body);

      seneca.act('role:publish,cmd:extract',{data:data},function(err,data){
        if(err) return done(err);
        var doc = {};

        doc.id$ = data[0].id;
        doc = data[0];
        // console.log('Query Remote - new doc', doc);
        publish_ent.make$(doc).save$(done);

        seneca.act('role:publish,cmd:list', {}, done );

      });
    });
  };


  function cmd_extract( args, done ) {
    var seneca  = this;

    var data       = args.data.response;

    // console.log('data', data);

    // var out = {
    //   name:    data._id,
    //   version: dist_tags.latest,
    //   giturl:  repository.url,
    //   desc:    data.description || '',
    //   readme:  data.readme || ''
    // }

    done(null,data)
  };

  function cmd_load ( args, done ) {
    var seneca  = this;

    var publish_ent = seneca.make$('publish');

    publish_ent.load$(args.id, function(err, published) {
      if (err) return done(err);


      log('publish details', published)

      // console.log('SUB - publish details', published);
      done(null,{ok:true,published:published})

    })

  };


  function cmd_create ( args, done ) {
    var seneca  = this;

    var data = args.data;

    var publish_ent = seneca.make$('publish');

    publish_ent.make$(data).save$(function( err, published ){
      if( err ) return done(err)

      log('PUBLISH CREATE',published)
      done(null,{ok:true,published:published})
    });

  };

  function cmd_update ( args, done ) {
    var seneca  = this;
    var data = args.data;
    var publish_ent = seneca.make$('publish');

    publish_ent.load$(args.id, function(err, updatePublished ) {
      if (err) return done(err);

      updatePublished.data$(data);
      updatePublished.save$(function(err,published){
        if( err ) return console.log(err);

        seneca.log.debug('publish update',published)
        done(null,{ok:true,published:published})
      })
    });

  };

  function cmd_save ( args, done ) {
    var seneca  = this;

    done(null,data)
  };

  function cmd_destroy( args, done ) {
    var seneca  = this;
    var publish_ent = seneca.make$('publish');

    publish_ent.remove$(args.id, function(err){
      if(err) return done(err);
      done(null,{ok:true});
    });
  };

}

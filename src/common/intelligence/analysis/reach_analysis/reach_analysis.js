"use strict";

// if building a proper system this would live in analytics as
// as no CRUD requirement
var request = require('request');
var isEmpty = require('../../../utils/empty_check');
var debug = require('debug')('reachSub');
var _ = require('lodash');

var postTypes = [
  'post_impressions',
  'post_impressions_organic',
  'post_impressions_viral',
  'post_impressions_paid'
];


module.exports = function reach ( options ){
  var seneca = this

  options = seneca.util.deepextend({
    remote_endpoint: 'https://jsonblob.com/api/jsonBlob/5208a709e4b002188ed03bdd'
  },options)

  // API

  // return list of items check local first if not query remote
  // assume list if first action called
  seneca.add('role:reach,cmd:list',{}, cmd_list)

  // get data from remote source
  seneca.add('role:reach,cmd:query_remote',{}, cmd_query_remote)

  // extract the information needed
  seneca.add('role:reach,cmd:extract',{}, cmd_extract)


  // create
  seneca.add('role:reach,cmd:create',{
  }, cmd_create )



  // ACTIONS
  function cmd_list( args, done ) {
    var seneca  = this
    var reach_ent = seneca.make$('reach')

    reach_ent.list$( function(err, results ){
    // reach_ent.load$( function(err, reached ){
      if( err ) return done(err);

      // reduced = createNewResults(results, postTypes);

      if( (results.length > 0) && !args.update ) {  // update if wanting to refresh
        done(null,{ok:true,published:results})
      }
      else {
        seneca.act('role:reach,cmd:query_remote', {}, done);
      };
    });
  };


  function cmd_query_remote( args, done ) {
    var seneca  = this;
    var reach_ent = seneca.make$('reach');

    var url = options.remote_endpoint;

    request.get( url, function(err,res,body){
      if(err) return done(err);

      var data = JSON.parse(body);

      seneca.act('role:reach,cmd:extract',{data:data},function(err,data){
        if(err) return done(err)

        data.forEach(function(item) {
          if (!isEmpty(item)) {
            var doc = {};

            item.post_impressions[0].mstimestamp = new Date(item.post_impressions[0].timestamp).getTime();
            item.post_impressions_organic[0].mstimestamp = new Date(item.post_impressions_organic[0].timestamp).getTime();
            item.post_impressions_viral[0].mstimestamp = new Date(item.post_impressions_viral[0].timestamp).getTime();
            item.post_impressions_paid[0].mstimestamp = new Date(item.post_impressions_paid[0].timestamp).getTime();

            doc.data = item;
            reach_ent.make$(doc).save$(done);
          }
        })

      });
    });
  };


  function cmd_extract( args, done ) {
    var seneca  = this;

    var data       = args.data.response;

    // var out = {
    //   name:    data._id,
    //   version: dist_tags.latest,
    //   giturl:  repository.url,
    //   desc:    data.description || '',
    //   readme:  data.readme || ''
    // }

    done(null,data)
  }


  function cmd_create ( args, done ) {
    var seneca  = this;

    var data = args.data;
    console.log(data);

    var impressions = {};
    var timestamp = Date.now();


    impressions.post_impressions = [{
      "value": data.postImpressions || 0,
      "mstimestamp": timestamp
    }];
    impressions.post_impressions_organic = [{
      "value": data.postImpressionsOrganic || 0,
      "mstimestamp": timestamp
    }];
    impressions.post_impressions_viral = [{
      "value": data.postImpressionsViral || 0,
      "mstimestamp": timestamp
    }];
    impressions.post_impressions_paid = [{
      "value": data.postImpressionsPaid || 0,
      "mstimestamp": timestamp
    }];

    var reach_ent = seneca.make$('reach');

    reach_ent.make$(impressions).save$(function( err, reach ){
      if( err ) return done(err)

      debug('reach save',reach)
      done(null,{ok:true,published:reach})
    });

  };

}


"use strict";


var _ = require('lodash');
var path = require('path');

var debug = require('debug')('str:reach');

var postTypes = [
  'post_impressions',
  'post_impressions_organic',
  'post_impressions_viral',
  'post_impressions_paid'
];


module.exports = function reachStucture ( options ){
  var seneca = this;

  options = seneca.util.deepextend({

  },options)

  // API
  seneca.add('role:reachStr,cmd:listFlattened',{}, cmd_graph_format_list)

  // ACTIONS
  function cmd_graph_format_list( args, done ) {
    // Aim reduce down output for easier graphing
    // D3 can then filter by type to create
    // graph with four lines or aggregate to have total

    var seneca  = this

    var reachact = seneca.pin({role: 'reach', cmd:'*'});

    reachact.list({}, function(err, results){
      if (err) Boom.methodNotAllowed('Error ' + err);

      if (!results) {
        return reply (Boom.notFound('No records found'));
      }

      // flatten results into this format
      // impression_type  date(grouped)  value(sum)
      return createNewResults(results, postTypes)


    });

  };
}


function createNewResults( data, postTypes, newArray ) {

  newArray = newArray || [];
  postType = postTypes[0];

  if (typeof postType !== "undefined") {
    var impressions =_.pluck(data, postType );
    impressions = _.flatten(impressions);
    // console.log('impressions', impressions);
    var reducedOutput = _.map(_.groupBy(impressions, "mstimestamp"), function(group, mstimestamp) {
        return _.reduce(group, function(memo, elem) {
                memo.value += Number(elem.value, 10);
                return memo;
            },
            { impression_type: postType,  mstimestamp: mstimestamp, value: 0 });
    });
    // console.log('reducedOutput', reducedOutput);
    newArray.push(reducedOutput[0]);
  }

  // Treat arrays as if they are immutable.
  var remainingList = postTypes.slice(1);
  // decide next
  if ( postTypes.length > 0 ) {
    return createNewResults(remainingList, newArray);
  } else {
    return newArray;
  }

};

// var myoutput = createNewResults(postTypes);

// console.log(myoutput)



var moment = require('moment');
var lodash = require('lodash');
var isEmpty = require('./empty_check');


var reach = require('../raw/reach.json');


reach.response.forEach(function(item){
  if (!isEmpty(item)) {
    // console.log(item);
    var date = new Date(item.post_impressions[0].timestamp).getTime();

    // var newdatetime = moment(item.post_impressions[0].timestamp)
    console.log(date);
  }
});

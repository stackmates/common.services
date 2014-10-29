

var _ = require('lodash');

// Aim reduce down output for easier graphing
// D3 can then filter by type to create
// graph with four lines or aggregate to have total

var response = require('./fixtures/input.json');

var data = _.pluck(response, 'data');
// console.log('data', data);

var postTypes = [
  'post_impressions',
  'post_impressions_organic',
  'post_impressions_viral',
  'post_impressions_paid'
];

function createNewResults( postTypes, newArray ) {

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

var myoutput = createNewResults(postTypes);

console.log(myoutput)


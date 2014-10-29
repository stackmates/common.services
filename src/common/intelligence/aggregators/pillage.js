

var pillage = require('pillage');


// Fetch a URL and process
var url = 'http://bobsbits.com';

pillage(url, function(err, result) {
  console.log(extractTitle(result));
});

// or, process HTML directly
var result = pillage(html);
console.log(result);

// var articleSparseText = load('buzzfeed');
// var articleWithImages = load('images');
// var articleWithVideos = load('wired');
// var youtubeVideo      = load('youtube');

// describe('extractOpenGraphTags', function() {
//   it('should return all open graph tags', function() {
//     var tags = pillage.extractOpenGraphTags(articleSparseText);
//     tags.should.have.property('og:title');
//   });
// });

// returns

 // return {
 //   title: extractTitle(html),
 //   description: extractDescription(html),
 //   text: extractText(html),
 //   images: extractImages(html),
 //   videos: extractVideos(html),
 //   twitterTags: extractTwitterTags(html),
 //   openGraphTags: extractOpenGraphTags(html),
 //   articleTags: extractArticleTags(html),
 //   oEmbed: extractOEmbed(html),
 // };

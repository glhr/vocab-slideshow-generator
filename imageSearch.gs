var url = "https://api.qwant.com/api/search/images"

function getImageURL(query) {
  
  var params={
        'count': 1,
        'q': query,
        't': 'images',
        'safesearch': 1,
        'locale': 'en_US',
        'uiv': 4
    }
  
  // Make request to API and get response before this point.
  var response = UrlFetchApp.fetch("https://api.qwant.com/api/search/images?count=1&q="+query+"&t=images&safesearch=1&locale=en_US&uiv=4");
  
  //Parse data to get URL of first image in results
  var json = response.getContentText();
  var data = JSON.parse(json);
  var imageURL = data.data.result.items[0].media;
  return imageURL;
}

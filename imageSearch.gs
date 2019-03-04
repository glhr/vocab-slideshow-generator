var url = "https://api.qwant.com/api/search/images"

function getImageURL(query) {
  
  var params={
        'count': 1,
        'q': query + ' clipart',
        't': 'images',
        'safesearch': 1,
        'locale': 'en_US',
        'uiv': 4
    }
  
    var headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
    }
  
  var options = {
    'method' : 'post',
    'payload' : params,
    'headers' : headers
  };
  
  var response = UrlFetchApp.fetch("https://api.qwant.com/api/search/images?count=1&q="+query+"&t=images&safesearch=1&locale=en_US&uiv=4");
  
  // Make request to API and get response before this point.
  var json = response.getContentText();
  var data = JSON.parse(json);
  var imageURL = data.data.result.items[0].media;
  return imageURL;
}

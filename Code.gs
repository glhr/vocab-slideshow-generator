var NAME = 'Spelling list';

var deck;
var text = "";
var searchtext = "";
var title= "";
var words = [];
var searchinfo = [];
var slideshowLink = "#";

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index').setTitle("Automatic Vocabulary Slideshow Generator");
}

function getPresentationLink() {
  return slideshowLink;
}

function processForm(formObject) {
  
  try {
    slideTitle = formObject.title;

    words = textToArray(removeNumbering(formObject.words));
    searchinfo = textToArray(formObject.searchinfo);
    
    deck = SlidesApp.create(NAME + ' - ' + slideTitle);
    var [title, subtitle] = deck.getSlides()[0].getPageElements();
    title.asShape().getText().setText(slideTitle);
    subtitle.asShape().getText().setText(':)');
    words.forEach(addImageSlide);
    
    var fileId = deck.getId();
    
    convertFileToPptx(fileId, NAME + ' - ' + slideTitle);
    
    return ["OK",fileId];
  } catch (f) {
    return f.toString();
  }
}

function removeNumbering(phrase) {
  var reg = /[0-9]*(\.|\))\s*/g;
  formatted = phrase.replace(reg, "");
  return formatted;
}

function textToArray(words) { 
    return words.split(/\r?\n/);
}

function convertFileToPptx(id, title) {

  var outputFileName = title+".pptx";

  var url = 'https://docs.google.com/presentation/d/'+id+'/export/pptx?access_token=' + ScriptApp.getOAuthToken();
  var rootFolder = DriveApp.getRootFolder();
  var response = UrlFetchApp.fetch(url);
  var blobPptx = response.getBlob();
  var result = rootFolder.createFile(blobPptx.setName(outputFileName));
}

/**
 * Creates a single slide for a given word;
 * used directly by foreach(), hence the parameters are fixed.
 * @param {string} word A String object representing a word
 * @param {number} index The index into the array
 */
function addImageSlide(word, index) {
  
    var slide = deck.appendSlide(SlidesApp.PredefinedLayout.SECTION_HEADER);
  
    var imageUrl = getImageURL(searchinfo[index]);
    var image = slide.insertImage(imageUrl);
  
    var [title, body] = slide.getPageElements();
  
  
    title.asShape().setTop(20);
    title.asShape().getText().setText(word);
    title.asShape().getText().getTextStyle().setFontSize(60);
      title.asShape().getText().getTextStyle().setBold(true);
  
    var imgWidth = image.getWidth();
    var imgHeight = image.getHeight();
    var imgRatio = imgWidth / imgHeight;
    var pageWidth = deck.getPageWidth();
    var pageHeight = deck.getPageHeight();
  
    var newHeight = pageHeight-200;
    var newWidth = imgRatio * newHeight;
    image.setHeight(newHeight);
    image.setWidth(newWidth);
    
    var newX = pageWidth/2. - newWidth/2.;
    var newY = pageHeight/2. - newHeight/2.;
  
    image.setLeft(newX).setTop(150);
}

function main() {
  
}
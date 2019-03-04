var NAME = 'Spelling list';

var deck;
var text = "";
var title= "";
var words = [];
var slideshowLink = "http://default.com";

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index').setTitle("Automatic Vocabulary Slideshow Generator");
}

function getPresentationLink() {
  return slideshowLink;
}

function processForm(formObject) {
  
  try {
    text = formObject.words;
    slideTitle = formObject.title;
    
    getWords();
    
    var week = 'week 8';
    deck = SlidesApp.create(NAME + ' - ' + title);
    var [title, subtitle] = deck.getSlides()[0].getPageElements();
    title.asShape().getText().setText(slideTitle.toString());
    subtitle.asShape().getText().setText(':)');
    words.forEach(addImageSlide);
    
    return ["OK",deck.getId()];
  } catch (f) {
    return f.toString();
  }
}

function getWords() { 
    words = text.split(/\r?\n/);
}

/**
 * Creates a single slide using the image from the given link;
 * used directly by foreach(), hence the parameters are fixed.
 * @param {string} imageUrl A String object representing an image URL
 * @param {number} index The index into the array; unused (req'd by forEach)
 */
function addImageSlide(word, index) {
  
    
  
    var slide = deck.appendSlide(SlidesApp.PredefinedLayout.SECTION_HEADER);
  
    var imageUrl = getImageURL(word);
    var image = slide.insertImage(imageUrl);
  
    var [title, body] = slide.getPageElements();
  
  
    title.asShape().setTop(20);
    title.asShape().getText().setText(word);
    title.asShape().getText().getTextStyle().setFontSize(60);
  
    var imgWidth = image.getWidth();
    var imgHeight = image.getHeight();
    var imgRatio = imgWidth / imgHeight;
    var pageWidth = deck.getPageWidth();
    var pageHeight = deck.getPageHeight();
  
    var newHeight = pageHeight-150;
    var newWidth = imgRatio * newHeight;
    image.setHeight(newHeight);
    image.setWidth(newWidth);
    
    var newX = pageWidth/2. - newWidth/2.;
    var newY = pageHeight/2. - newHeight/2.;
  
    image.setLeft(newX).setTop(100);
}

/**
 * Adds images to a slides presentation.
 */
function main() {
  
}
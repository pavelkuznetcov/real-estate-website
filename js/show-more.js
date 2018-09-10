/////////////////Show-more-items
(function(){

  var listOfAppartments = document.querySelector(".find-appartment__appartment-cards");
  var showMoreButton = document.querySelector(".show-more");

  var onError = function(message) {
    console.error(message);
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onSuccess = function(data) {
    var someStuff = data;
    var fragment = document.createDocumentFragment();

    for( var i = 0; i < someStuff.articles.length; i++)
    {
      var newItem = createCard(someStuff.articles[i]);
      fragment.appendChild(newItem);
    }

    listOfAppartments.appendChild(fragment);
  };

  var makeElement = function (tagName, className, text, dataAtr, dataAtrVal) {
    var element = document.createElement(tagName);

    if (className) {
      element.classList.add(className);
    }
    if (text) {
      element.textContent = text;
    }
    if (dataAtr && dataAtrVal) {
      element.dataset[dataAtr] = dataAtrVal;
    }
    return element;
  };

  var createCard = function (product) {
    var listItem = makeElement('li');
    var article = makeElement('article', 'appartment-card', false, 'availability', product.availability);
    listItem.appendChild(article);

    if(product.discountSize) {
      var discountCont = makeElement('div', 'discount');
      var discountNumber = makeElement('span', 'discount__size', product.discountSize + '%');
      discountCont.appendChild(discountNumber);

      if( parseInt(product.discountSize) < -5 ) {
        var discountMoto = makeElement('span','discount__expression','Шок-цена!');
        console.log('omg, shocking price is here');
        discountCont.appendChild(discountMoto);
      }
      article.appendChild(discountCont);
    }

    if ('content' in document.createElement('template')) {
      var addToFavouritesSvg = document.querySelector("#favorites-svg-icon");
      var clone = document.importNode(addToFavouritesSvg.content, true);
      article.appendChild(clone);
    }
    else {
      var addToFavouritesSvg = document.querySelector(".favorites-icon");
      var clone = document.importNode(addToFavouritesSvg, true);
      article.appendChild(clone);
    }

    var imgContainer = makeElement('div','img-container');
    var productImg = makeElement('img');
    productImg.src = product.imagePath;
    productImg.alt = product.header;
    imgContainer.appendChild(productImg);
    article.appendChild(imgContainer);

    var productHeader = makeElement('h3', false, product.header);
    article.appendChild(productHeader);

    var featuresList = makeElement('ul','features-list');
    var featuresFinishing = makeElement('li', 'features-list__finishing', product.finishing);
    var featuresSpace = makeElement('li', 'features-list__space', product.space + ' м');
    var sup = makeElement('sup', false, '2');
    var br = makeElement('br');
    var itSpace = makeElement('i', false, 'площадь');
    featuresSpace.appendChild(sup);
    featuresSpace.appendChild(br);
    featuresSpace.appendChild(itSpace);

    var featuresFloor = makeElement('li', 'features-list__floor', product.floor);
    var brFloor = makeElement('br');
    var itFloor = makeElement('i', false, 'этаж');
    featuresFloor.appendChild(brFloor);
    featuresFloor.appendChild(itFloor);

    featuresList.appendChild(featuresFinishing);
    featuresList.appendChild(featuresSpace);
    featuresList.appendChild(featuresFloor);
    article.appendChild(featuresList);

    var price = makeElement('p', 'price', product.price + ' руб.');
    article.appendChild(price);

    var availability = makeElement('p', 'availability', product.availabilityRu, 'availability',
      product.availability);
    article.appendChild(availability);


    return listItem;
  };

  showMoreButton.addEventListener('click', function() {
    window.load('items.json', onSuccess, onError);
  });
})();

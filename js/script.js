/////////////////Prevent body from scrolling while menu is open
// $("input.state-switch").click(function() {
//   $("body").toggleClass(".menu-open");
// });

/////////////////Sorting:
var price_sort_button = document.querySelector("button.sort--price");
var rooms_sort_button = document.querySelector("button.sort--rooms");

var show_more_button = document.querySelector("button.show-more");

var sortingOrder = "desc";

price_sort_button.addEventListener("click", function(){
  this.classList.toggle("changed");

  if( sortingOrder === "desc" )
  {
    sortingOrder = "asc";
  }
  else
  {
    sortingOrder = "desc";
  }
  this.setAttribute("data-sorting-order", sortingOrder);
  vanillaSorting(sortingOrder, '.find-appartment__appartment-cards', 'data-price');
});

rooms_sort_button.addEventListener("click", function(){
  this.classList.toggle("changed");

  if( sortingOrder === "desc" )
  {
    sortingOrder = "asc";
  }
  else
  {
    sortingOrder = "desc";
  }
  this.setAttribute("data-sorting-order", sortingOrder);
  vanillaSorting(sortingOrder, '.find-appartment__appartment-cards', 'data-rooms-number');
});


///Sorting function
var vanillaSorting = function(order, list, attr) {
  if(!order) {
    console.log("Не забудьте задать направление сортировки");
    return false;
  }
  if(!list) {
    console.log("Не забудьте задать сортируемый список");
    return false;
  }
  if(!attr) {
    console.log("Не забудьте задать атрибут, по которому будет производится сортировка");
    return false;
  }
  var listFlats = document.querySelector(list);
  var listOfItems = listFlats.children;
  var arr = Array.prototype.slice.call( listOfItems );

  arr.sort( function(a, b) {
    //Сортируем li но атрибуты с ценой и количеством комнат в потомке — article
    var aChildren = a.children;
    var innerItemA = Array.prototype.slice.call( aChildren )[0];
    var an = parseInt(innerItemA.getAttribute(attr));

    var bChildren = b.children;
    var innerItemB = Array.prototype.slice.call( bChildren )[0];
    var bn = parseInt(innerItemB.getAttribute(attr));

    if (order == "asc") {
            if (an > bn)
            return 1;
            if (an < bn)
            return -1;
    } else if (order == "desc") {
            if (an < bn)
            return 1;
            if (an > bn)
            return -1;
    }
    return 0;
  });

  for( var i = 0; i < arr.length; i++ )
  {
    listFlats.appendChild(arr[i]);
  }

};

/////////////////Show-more-items
var json_content;
// var $list_of_appartments = $(".find-appartment__appartment-cards");
var list_of_appartments = document.querySelector(".find-appartment__appartment-cards");

show_more_button.addEventListener('click', function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'items.json', true);
  xhr.send(); // (1)

  xhr.onreadystatechange = function() { // (3)
    console.log('xhr.onreadystatechange');
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      json_content = JSON.parse(xhr.responseText);

      for( var i = 0; i < json_content.articles.length; i++)
      {
        var newItem = createCard(json_content.articles[i]);
        list_of_appartments.appendChild(newItem);
      }
    }
  }
});
// show_more_button.click(function(){
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'items.json', true);
//   xhr.send(); // (1)
//
//   xhr.onreadystatechange = function() { // (3)
//     if (xhr.readyState != 4) return;
//
//     if (xhr.status != 200) {
//       console.log(xhr.status + ': ' + xhr.statusText);
//     } else {
//       json_content = JSON.parse(xhr.responseText);
//
//       for( var i = 0; i < json_content.length; i++)
//       {
//         createCard(json_content.articles[i]);
//       }
//
//
//       // for( var i = 0; i < 20; i++)
//       // {
//       //   $list_of_appartments.append(`
//       //     <li data-price="`+json_content.articles[i].price+`" data-rooms-number="`+json_content.articles[i].rooms_number+`" data-discount="`+json_content.articles[i].discount+`">
//       //       <article class="appartment-card" data-availability="`+json_content.articles[i].availability+`">
//       //         <div class="discount">
//       //           <span class="discount__size">`+json_content.articles[i].discount_size+`%</span>
//       //           <span class="discount__expression">Шок-цена!</span>
//       //         </div>
//       //         <svg class="favorites-icon" width="19px" height="18px">
//       //           <use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#add_to_favorites'></use>
//       //         </svg>
//       //         <div class="img-container">
//       //           <img src="`+json_content.articles[i].image_path+`" alt="">
//       //         </div>
//       //         <h3>`+json_content.articles[i].header+`</h3>
//       //         <ul class="features-list">
//       //           <li class="features-list__finishing">`+json_content.articles[i].finishing+`</li>
//       //           <li class="features-list__space">`+json_content.articles[i].space+` м<sup>2</sup><br><i>площадь</i></li>
//       //           <li>`+json_content.articles[i].floor+`<br><i>этаж</i></li>
//       //         </ul>
//       //         <p class="price">`+json_content.articles[i].price+` руб.</p>
//       //         <p class="availability" data-availability="`+json_content.articles[i].availability+`">`+json_content.articles[i].availability_ru+`</p>
//       //       </article>
//       //     </li>`
//       //   );
//       // }
//     }
//   }
//   $(this).disabled = true;
// });

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

///////////////Scrolling arrow
// var $return_arrow = $("div.arrow-return");
// var header = document.querySelector( "header.main-header" );
//
// $(window).scroll(function(){
//   if( $(window).scrollTop() > $(window).height() ) {
//     // $return_arrow.css("display", "block");
//     $return_arrow.css("display", "block");
//     // $return_arrow.css("opacity", "1");
//     console.log("block");
//
//   }
// });
//
// $return_arrow.click(function() {
//   console.log("clicked");
//   smoothScroll( header );
//   $(this).css("display", "none");
// });
//
// function smoothScroll( target )
// {
//   var scrollContainer = target;
//   do
//   { //find scroll container
//       scrollContainer = scrollContainer.parentNode;
//       if ( !scrollContainer ) return;
//       scrollContainer.scrollTop += 1;
//   }
//   while ( scrollContainer.scrollTop == 0 );
//   var targetY = 0;
//   do
//   { //find the top of target relatively to the container
//       if ( target == scrollContainer ) break;
//       targetY += target.offsetTop;
//   }
//   while ( target = target.offsetParent );
//   function scroll( c, a, b, i )
//   {
//       i++; if (i > 30) return;
//       c.scrollTop = a + (b - a) / 30 * i;
//       setTimeout( function() { scroll( c, a, b, i ); }, 20 );
//   }
//   // start scrolling
//   scroll( scrollContainer, scrollContainer.scrollTop, targetY, 0 );
// }

/////////////////Validate email
var validateEmail = function(email) {
  var re = /(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*:(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)(?:,\s*(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*))*)?;\s*)/;
  return re.test(email);
}

var validate = function() {
  var result = document.querySelector("#result");

  var subscribeEmail = document.querySelector("#subscribe-email");
  var email = subscribeEmail.value;

  if (!validateEmail(email)) {
    alert("Пожалуйста, введите корректный e-mail");
  }
  return false;
}

var subscribeButton = document.querySelector(".subscribe__button");
subscribeButton.addEventListener("click", validate);

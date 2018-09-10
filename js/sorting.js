/////////////////Sorting:
(function() {
  var price_sort_button = document.querySelector("button.sort--price");
  var rooms_sort_button = document.querySelector("button.sort--rooms");
  var sortingOrderPrice = "desc";
  var sortingOrderRooms = "desc";

  price_sort_button.addEventListener("click", function(){
    this.classList.toggle("changed");

    sortingOrderPrice === "desc" ?   sortingOrderPrice = "asc" : sortingOrderPrice = "desc";

    this.setAttribute("data-sorting-order", sortingOrderPrice);
    vanillaSorting(sortingOrderPrice, '.find-appartment__appartment-cards', 'data-price');
  });

  rooms_sort_button.addEventListener("click", function(){
    this.classList.toggle("changed");

    sortingOrderRooms === "desc" ?   sortingOrderRooms = "asc" : sortingOrderRooms = "desc";

    this.setAttribute("data-sorting-order", sortingOrderRooms);
    vanillaSorting(sortingOrderRooms, '.find-appartment__appartment-cards', 'data-rooms-number');
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
}
)();

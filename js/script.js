/////////////////Prevent body from scrolling while menu is open
// $("input.state-switch").click(function() {
//   $("body").toggleClass(".menu-open");
// });

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

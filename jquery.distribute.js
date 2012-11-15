/*
 * jQuery.distribute - Evenly space child elements horizontally in fluid layouts
 * Tom Moor, http://tommoor.com
 * Released into the public domain
 * Date: 14th Nov 2010
 * @author Tom Moor
 * @version 1.0
 */

(function($){

  $.fn.distribute = function(options){

    var defaults = {
     margin: 10,
     width: null
    };
    var options = $.extend(defaults, options);

    return this.each(function(){

      var $parent = $(this);
      var totalWidth = $parent.width(); 
      var itemWidths = new Array();
      var itemWidthsWithMargin = new Array();
      var $items = $parent.children();

      var rowContentsWidth = 0;
      var $rowItems = $();

      $items
        .each(function(k,v){
          var $v = $(v);
        
          if( totalWidth<=( rowContentsWidth+$v.width() ) ){
          
            console.log( 'totalWidth<=( rowContentsWidth+$v.width() )' );
            console.log( totalWidth+'<=( '+rowContentsWidth+'+'+$v.width()+' )' );
            console.log( totalWidth+'<=( '+(rowContentsWidth+$v.width())+' )' );
          
            // Cannot add Current Item to Row - too wide.
            // Process this row
            var widthRemainder = totalWidth-rowContentsWidth+options.margin;
            var perElement = Math.floor( options.margin+( widthRemainder/( $rowItems.length-1 ) ) );
            var leftOver = widthRemainder-( perElement*( $rowItems.length-1 ) );
            
            $rowItems
              .css({
                display : 'inline-block' ,
                marginRight : perElement
              })
              .last()
                .css({
                  marginRight : 0
                });
                
            $rowItems = $();
            rowContentsWidth = 0;
          
          }else{
            console.log( 'More Space' );
          }
          
          $rowItems = $rowItems.add( $v );
          rowContentsWidth += $v.width()+options.margin;
          
          console.log( '$rowItems' , $rowItems );
          console.log( 'rowContentsWidth' , rowContentsWidth );
        
        });
        
      if( rowContentsWidth!=0 ){
      
        // Remainder Elements
        var widthRemainder = totalWidth-rowContentsWidth+options.margin;
        var perElement = Math.floor( options.margin+( widthRemainder/( $rowItems.length-1 ) ) );
        var leftOver = widthRemainder-( perElement*( $rowItems.length-1 ) );
        
        $rowItems
          .css({
            display : 'inline-block' ,
            marginRight : perElement
          })
          .last()
            .css({
              marginRight : 0 ,
              marginLeft : leftOver
            });
      
      }

    });

  };
})(jQuery);

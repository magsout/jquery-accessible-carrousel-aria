$(document).ready(function(){

        /* loading aria carrousel ----------------------------------------------------------------------------------------------------------------------- */
        var $carrousel_container = $('.carrousel__container'),
              $carrousel_content = $('.carrousel__content');
        
        
        if ( $carrousel_container.length  &&  $carrousel_content.length ) { // if there are at least one content and one container :)
          
          var hash = window.location.hash.replace( "#", "" ),
                        getTransEndEventName = function() {
                                var i,
                                        el = document.createElement('div'),
                                        transitions = {
                                                'WebkitTransition'      : 'webkitTransitionEnd',
                                                'MozTransition'         : 'transitionend',
                                                'OTransition'           : 'oTransitionEnd otransitionend',
                                                'msTransition'          : 'MSTransitionEnd',
                                                'transition'            : 'transitionend'
                                        };
                                       
                                for ( i in transitions ) {
                                        if ( transitions.hasOwnProperty( i ) && typeof el.style[ i ] !== "undefined" ) {
                                                return transitions[ i ];
                                        }
                                }
                               
                                return "NextSlide";     // CSS transitions not supported
                        },
                        transEndEventName = getTransEndEventName();
                // Do something when the transition ends
                $("body").on( transEndEventName, ".slide .carrousel__content", function(e) {
                        var $this = $(this),
                            $parent = $this.parents( ".carrousel" );

                        $parent.find('.carrousel__content[aria-hidden=true]').addClass('visibility-off');
                        
                } );
          
          $carrousel_container.each( function(index_carrousel_container) {
              var $this_carrousel_container = $(this) ,
                  $index_carrousel = index_carrousel_container + 1 ,
                  $carrousel_prefix_classes = $this_carrousel_container.attr('data-carrousel-prefix-classes'),
                  $carrousel_span_text_class = $this_carrousel_container.attr('data-carrousel-span-text-class'),
                  $carrousel_span_text  = $this_carrousel_container.attr('data-carrousel-span-text'),
                  $carrousel_span_text_final = '',
                  $carrousel_transition = $this_carrousel_container.attr('data-carrousel-transition'),
                  $carrousel_btn_previous_img = $this_carrousel_container.attr('data-carrousel-btn-previous-img'),
                  $carrousel_btn_next_img = $this_carrousel_container.attr('data-carrousel-btn-next-img'),
                  $carrousel_btn_previous_text = $this_carrousel_container.attr('data-carrousel-btn-previous-text'),
                  $carrousel_btn_next_text = $this_carrousel_container.attr('data-carrousel-btn-next-text'),
                  $carrousel_hx = $this_carrousel_container.attr('data-carrousel-hx'),
                  $carrousel_existing_hx = $this_carrousel_container.attr('data-carrousel-existing-hx'),
                  $carrousel_hx_final = '';
                  
              // global prefix class styles
              if ( typeof $carrousel_prefix_classes === "undefined" || $carrousel_prefix_classes === "undefined" || $carrousel_prefix_classes === "" ) {
                   $carrousel_prefix_classes = '';
              }
              else { 
                   $carrousel_prefix_classes = $carrousel_prefix_classes + '-' ;
                   }
              if ( typeof $carrousel_span_text_class === "undefined" || $carrousel_span_text_class === "undefined" || $carrousel_span_text_class === "" ) {
                  $carrousel_span_text_class = '';
                  }
              if ( typeof $carrousel_span_text === "undefined" || $carrousel_span_text === "undefined" || $carrousel_span_text === "" ) {
                  $carrousel_span_text = '';
                  }
              if ( typeof $carrousel_transition === "undefined" || $carrousel_transition === "undefined" || $carrousel_transition === "" ) {
                  $carrousel_transition = '';
                  }
                  else { $this_carrousel_container.addClass($carrousel_transition); }

              
              if ( typeof $carrousel_btn_previous_img === "undefined" || $carrousel_btn_previous_img === "undefined" || $carrousel_btn_previous_img === "" ) {
                  $carrousel_btn_previous_img = '';
                  }
              if ( typeof $carrousel_btn_next_img === "undefined" || $carrousel_btn_next_img === "undefined" || $carrousel_btn_next_img === "" ) {
                  $carrousel_btn_next_img = '';
                  }
              if ( typeof $carrousel_btn_previous_text === "undefined" || $carrousel_btn_previous_text === "undefined" || $carrousel_btn_previous_text === "" ) {
                  $carrousel_btn_previous_text = '';
                  }
              if ( typeof $carrousel_btn_next_text === "undefined" || $carrousel_btn_next_text === "undefined" || $carrousel_btn_next_text === "" ) {
                  $carrousel_btn_next_text = '';
                  }
                  
              if ( typeof $carrousel_hx === "undefined" || $carrousel_hx === "undefined" || $carrousel_hx === "" ) {
                  $carrousel_hx = '';
                  }
              if ( typeof $carrousel_existing_hx === "undefined" || $carrousel_existing_hx === "undefined" && $carrousel_existing_hx === "" ) {
                  $carrousel_existing_hx = ''; 
                  }
              // information to know which tab is activated
              $this_carrousel_container.addClass ('carrouselslide-' + $index_carrousel + '-1' )
                                       .addClass ($carrousel_prefix_classes + 'carrousel__container' )
                                       .addClass ($carrousel_prefix_classes + 'carrousel__container--' + $index_carrousel );
              
              if ($carrousel_existing_hx != ''){
                  $carrousel_hx_final = $carrousel_existing_hx;
                  }
                  else {
                        $carrousel_hx_final = $carrousel_hx;
                        }
              
              
              /* insert list before carrousel__container  -------------------------------------------------------------------------- */
              var navigation = '<ol class="js-carrousel__control__list ' + $carrousel_prefix_classes + 'carrousel__control__list ' + $carrousel_prefix_classes + 'carrousel__control__list--'+ $index_carrousel +'" role="tablist">';
              
              $this_carrousel_container.find( ".carrousel__content" ).each( function(index) {
                      var $this = $(this) ,
                          $index_readable = index + 1,
                          $content_id = "id_carrousel_content_" + $index_carrousel + "_" + $index_readable;
                      
                      // add attributes
                      $this.attr({
                              "role": "tabpanel",
                              "id": $content_id,
                              "aria-hidden": "true",
                              "aria-labelledby": "label_" + $content_id
                          })
                          .addClass('visibility-off')
                          .addClass($carrousel_prefix_classes + 'carrousel__content');
                      
                      // focusable hx
                      if ($carrousel_existing_hx != ''){
                         $this.find($carrousel_existing_hx).attr("tabindex", "0");
                         $carrousel_span_text_final = $this.find($carrousel_existing_hx).html();
                         }
                         else {
                              $this.prepend('<' + $carrousel_hx + ' class="invisible" tabindex="0">' + $carrousel_span_text + ' ' + $index_readable + '</' + $carrousel_hx + '>');
                              $carrousel_span_text_final = $carrousel_span_text  + ' ' + $index_readable;
                              }
                      // ici le span hx
                      
                      
                      navigation = navigation + '<li class="js-carrousel__control__list__item ' + $carrousel_prefix_classes + 'carrousel__control__list__item" role="presentation"><a class="js-carrousel__control__list__link  ' + $carrousel_prefix_classes + 'carrousel__control__list__link" id="label_' +  $content_id + '" role="tab" aria-controls="' + $content_id +'" tabindex="-1" aria-selected="false">';
                      //href="#' + $content_id + '"
                      navigation = navigation + '<span class="' + $carrousel_prefix_classes + 'carrousel__control__list__text';
                      if ( $carrousel_span_text_class !== '' ){
                         navigation = navigation + ' ' + $carrousel_span_text_class ;
                      }
                      navigation = navigation + '">' + $carrousel_span_text_final + '</span></a></li>';
              } );
              navigation = navigation + '</ol>';
              
              $( navigation ).insertBefore($this_carrousel_container);
              
              
              /* Add previous/next buttons ----------------------------------------------------------------------------------------------------- */
              if ( $carrousel_btn_previous_text !== ''){

                  var previous_button = '<div class="js-carrousel__button-container ' + $carrousel_prefix_classes + 'carrousel__button-container js-carrousel__button__previous ' + $carrousel_prefix_classes + 'carrousel__button__previous ' + $carrousel_prefix_classes + 'carrousel__button__previous--'+ $index_carrousel +'"><button title="' + $carrousel_btn_previous_text + '" class="js-carrousel__button__button ' + $carrousel_prefix_classes + 'carrousel__button__button">';
                  if ($carrousel_btn_previous_img !== ''){
                       previous_button = previous_button + '<img src="' + $carrousel_btn_previous_img + '" alt="' + $carrousel_btn_previous_text + '" class="carrousel__button__img" />';
                  }
                  else {
                       previous_button = previous_button + $carrousel_btn_previous_text;
                       }
                  previous_button = previous_button + '</button>';
                  $( previous_button ).insertBefore($this_carrousel_container);
              
              }


              if ( $carrousel_btn_next_text !== ''){
                            
                  var next_button = '<div class="js-carrousel__button-container ' + $carrousel_prefix_classes + 'carrousel__button-container js-carrousel__button__next ' + $carrousel_prefix_classes + 'carrousel__button__next ' + $carrousel_prefix_classes + 'carrousel__button__next--'+ $index_carrousel +'"><button title="' + $carrousel_btn_next_text + '" class="js-carrousel__button__button ' + $carrousel_prefix_classes + 'carrousel__button__button">';
                  if ($carrousel_btn_next_img !== ''){
                       next_button = next_button + '<img src="' + $carrousel_btn_next_img + '" alt="' + $carrousel_btn_next_text + '" class="carrousel__button__img" />';
                  }
                  else {
                       next_button = next_button + $carrousel_btn_next_text;
                       }
                  next_button = next_button + '</button>';
                  
                  $( next_button ).insertAfter($this_carrousel_container);
              }
          
          });

          
          // check hash concerns carousel
          if ( hash !== "" ) {
             if ($( "#" + hash + ".carrousel__content" ).length === 0 ){
                hash = '';
                }
          }
          
          
          /* then check defaults ---------------------------------------------------------------------------------------------------------- */
          if ( hash !== ""  && $( "#" + hash + ".carrousel__content" ).length ) {
                  
                  // display
                  $( "#" + hash + ".carrousel__content" ).removeAttr( "aria-hidden" ).removeClass('visibility-off');
                  
                  // selection menu
                  $( "#label_" + hash + ".js-carrousel__control__list__link" ).attr({
                          "aria-selected": "true",
                          "tabindex": 0
                  });
                  
                  // update of carrouselslide-x-x
                  $carrousel_container = $( "#" + hash + ".carrousel__content" ).parents( ".carrousel__container" );

                  
                  // get .carrouselslide-x-x
                  var classes = $carrousel_container.attr('class').split(' ');
                  var found = false;
                  var $previous_content;
                  var $new_content;
                  var i = 0;
                  while ( found===false && i < classes.length ){
                        if ( classes[i].substr(0,15) === "carrouselslide-" ){
                            $previous_content = classes[i];
                            found = true;

                           }
                        i++;
                        }
                  
                  $index_tab = ($( ".carrousel__content" ).index( $( "#" + hash + ".carrousel__content" ) ))+1;
                  var tab = $previous_content.split('-');
                  $new_content = tab[0] + '-' + tab[1] + '-' + $index_tab;
                  // replace .carrouselslide-1-x by .carrouselslide-1-$index_tab 
                  $carrousel_container.removeClass($previous_content).addClass($new_content).trigger("NextSlide");
                  
                  
          }
          // if no selected => select first
          $( ".carrousel" ).each( function(index) {
                  var $this = $(this),
                      $first_content = $this.find( ".carrousel__content:first" );
                  if ( $this.find( ".js-carrousel__control__list__link[aria-selected=true]" ).length === 0 ) {
                          $this.find( ".js-carrousel__control__list__link:first" ).attr({
                                  "aria-selected": "true",
                                  "tabindex": 0
                          });
                          $first_content.removeAttr( "aria-hidden" ).removeClass('visibility-off');

                  } 
          } );
          
          
          
          /* Events ---------------------------------------------------------------------------------------------------------- */
          /* click on a tab link */
          $( "body" ).on( "click", ".js-carrousel__control__list__link", function( event ) {
                  var $this = $( this ),
                       $parent = $this.parents( ".carrousel" ),
                       $tab_linked = $( "#" + $this.attr( "aria-controls" ) ),
                       $index_tab,
                       $previous_content,
                       $carrousel_container;
                  
                  $carrousel_container = $parent.find( ".carrousel__container" );
                  
                  $parent.find('.carrousel__content').removeClass('visibility-off');
                  
                  // get .carrousel-slide-1-x
                  var classes = $carrousel_container.attr('class').split(' ');
                  var found = false;
                  var i = 0;
                  while ( found===false && i < classes.length ){
                        if ( classes[i].substr(0,15) === "carrouselslide-" ){
                            $previous_content = classes[i];
                            found = true;

                           }
                        i++;
                        }
                  
                  // remove aria selected on all link
                  $parent.find( ".js-carrousel__control__list__link" ).attr( "aria-selected", "false" ).attr( "tabindex", -1 );
                  // add aria selected on $this
                  $this.attr({
                          "aria-selected": "true",
                          "tabindex": 0
                  });
                  // add aria-hidden on all tabs
                  $parent.find( ".carrousel__content" ).attr( {
                          "aria-hidden": "true"
                  });
                  
                  // remove aria-hidden on tab linked
                  $tab_linked.removeAttr( "aria-hidden" );
                  
                  // find index of clicked tab
                  $index_tab = ($parent.find( ".carrousel__content" ).index( $tab_linked ))+1;
                  var tab = $previous_content.split('-');
                  $new_content = tab[0] + '-' + tab[1] + '-' + $index_tab;
                  // replace .carrouselslide-1-x by .carrouselslide-1-$index_tab 
                  $parent.find( ".carrousel__container").removeClass($previous_content).addClass($new_content).trigger("NextSlide");
                  
                  
                  event.preventDefault();
          } )
          /* Key down in tabs */
          .on( "keydown", ".carrousel", function( event ) {
   
                  var $parent = $(this),
                          $activated,
                          $focus_on_tab_only = false;
                  
                  // some event should be activated only if the focus is on tabs (not on tabpanel)
                  if ( $( document.activeElement ).is( $parent.find('.js-carrousel__control__list__link') ) ){
                     $focus_on_tab_only = true;
                     }
                   
                  // catch keyboard event only if focus is on tab
                  if ($focus_on_tab_only && !event.ctrlKey) {
                      // strike up or left in the tab
                      if ( event.keyCode == 37 || event.keyCode == 38 ) {
                              // find previous tab
                              $activated = $parent.find( '.js-carrousel__control__list__link[aria-selected="true"]' ).parent();
                              // if we are on first => activate last
                              if ( $activated.is( ".js-carrousel__control__list__item:first-child" ) ) {
                                      $parent.find( ".js-carrousel__control__list__item:last-child a" ).click().focus();
                              }
                              // else activate previous
                              else {
                                      $activated.prev().children( ".js-carrousel__control__list__link" ).click().focus();
                              }
                              event.preventDefault();
                      }
                      // strike down or right in the tab
                      else if ( event.keyCode == 40 || event.keyCode == 39 ) {
                              // find next tab
                              $activated = $parent.find( '.js-carrousel__control__list__link[aria-selected="true"]' ).parent();
                              // if we are on last => activate first
                              if ( $activated.is( ".js-carrousel__control__list__item:last-child" ) ) {
                                      $parent.find( ".js-carrousel__control__list__item:first-child a" ).click().focus();
                              }
                              // else activate next
                              else {
                                      $activated.next().children( ".js-carrousel__control__list__link" ).click().focus();
                              }
                              event.preventDefault();
                      }
                      else if ( event.keyCode == 36 ) {
                              // activate first tab
                              $parent.find( ".js-carrousel__control__list__item:first-child a" ).click().focus();
                              event.preventDefault();
                      }
                      else if ( event.keyCode == 35 ) {
                              // activate last tab
                              $parent.find( ".js-carrousel__control__list__item:last-child a" ).click().focus();
                              event.preventDefault();
                      }
                  
                  }
   
          } )
          .on( "keydown", ".carrousel__content", function( event ) {
          
                  var $this = $(this),
                         $tab_to_focus,
                         $parent;
                      
                      // CTRL up/Left
                      if ( (event.keyCode == 37 || event.keyCode == 38) && event.ctrlKey ) {
                               $tab_to_focus = $this.attr('aria-labelledby');
                               $("#" + $tab_to_focus).focus();
                               event.preventDefault();                             
                         }
                      // CTRL PageUp
                      if ( event.keyCode == 33 && event.ctrlKey ) {
                               $tab_focused = $this.attr('aria-labelledby');
                               $("#" + $tab_focused).focus();
                               
                               $parent = $("#" + $tab_focused).parent();
                               
                               // if we are on first => activate last
                               if ( $parent.is( ".js-carrousel__control__list__item:first-child" ) ) {
                                     $parent.parent().find( ".js-carrousel__control__list__item:last-child a" ).click().focus();
                               }
                               // else activate prev
                               else {
                                     $parent.prev().children( ".js-carrousel__control__list__link" ).click().focus();
                               }
                               event.preventDefault();
                         }
                      // CTRL PageDown
                      if ( event.keyCode == 34 && event.ctrlKey ) {
                               $tab_focused = $this.attr('aria-labelledby');
                               $("#" + $tab_focused).focus();
                               
                               $parent = $("#" + $tab_focused).parent();
                               // if we are on last => activate first
                               if ( $parent.is( ".js-carrousel__control__list__item:last-child" ) ) {
                                     $parent.parent().find( ".js-carrousel__control__list__item:first-child a" ).click().focus();
                               }
                               // else activate next
                               else {
                                     $parent.next().children( ".js-carrousel__control__list__link" ).click().focus();
                               }
                               event.preventDefault();
                         }
          
          } );
          /* click on a button prev/next */
          // prev
          $( "body" ).on( "click", ".js-carrousel__button__previous button", function( event ) {
                  var $this = $( this ),
                  $parent = $this.parents( ".carrousel" );
                  // find previous tab
                  $activated = $parent.find( '.js-carrousel__control__list__link[aria-selected="true"]' ).parent();
                  // if we are on first => activate last
                  if ( $activated.is( ".js-carrousel__control__list__item:first-child" ) ) {
                      $parent.find( ".js-carrousel__control__list__item:last-child a" ).click().focus();
                  }
                  // else activate previous
                  else {
                        $activated.prev().children( ".js-carrousel__control__list__link" ).click().focus();
                        }
                  event.preventDefault();
                  
          })
          // next
          .on( "click", ".js-carrousel__button__next button", function( event ) {
                  var $this = $( this ),
                  $parent = $this.parents( ".carrousel" );
                  // find next tab
                  $activated = $parent.find( '.js-carrousel__control__list__link[aria-selected="true"]' ).parent();
                  // if we are on last => activate first
                  if ( $activated.is( ".js-carrousel__control__list__item:last-child" ) ) {
                      $parent.find( ".js-carrousel__control__list__item:first-child a" ).click().focus();
                  }
                  // else activate next
                  else {
                        $activated.next().children( ".js-carrousel__control__list__link" ).click().focus();
                        }
                  event.preventDefault();
          });
         
         
         
          
        }


});

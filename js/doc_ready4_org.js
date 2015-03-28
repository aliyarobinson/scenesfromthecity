/*!
* Project - Object Info
*/

  var className = (function ($) {
    // Variables - Variables available throughout the scope of this object
    // -------------------------------------------------------------------
    var exampleVarPublic = 'example',
        exampleVarPrivate = 'exampleVarPrivate';
    
    
    
    // Init - Anything you want to happen onLoad (usually event bindings)
    // -------------------------------------------------------------------
    var init = function () {
      examplePrivate();
      
      $('.classSelector').on('eventName', function( e ){
        e.preventDefault();    // Prevents clicks on anchors (a tags) from going through
        
        // Actions to perform when this event occurs go here
      });
    };
    
    
    
    
    
    // FUNCTIONS
    // ===================================================================
    
    // Public Example - Example public function
    // -------------------------------------------------------------------
    var examplePublic = function () {
      alert("Hello Public!");
    };
    
    // Private Example - Example private function that's not exposed
    // -------------------------------------------------------------------
    var examplePrivate = function () {
      alert("Hello Private!");
    };
    
    
    
    
    
    // CLEANUP
    // ===================================================================

    // Return - Which variables and objects to make available publicly
    // -------------------------------------------------------------------
    return {
      init              : init, 
      examplePublic     : examplePublic, 
      exampleVarPublic  : exampleVarPublic 
    };
  })(jQuery);


$(document).ready(function () {    className.init();    });
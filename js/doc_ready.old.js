$(function() {
	var soundControls = $('.soundControls');
	
	soundControls.animate({
		opacity: 1
	},600);

	/*// Get Films.xml
	$.ajax({
	    type: "GET",
		url: "Films.xml",
		dataType: "xml",
		success: function(xml) {
	 		console.log('success');

	 		// List film names
	 		$(xml).find('Film').each(function(){
				var title = $(this).find('Cell').eq(0).text();
				var longitute = $(this).find('Cell').eq(9).text();
				var latitude = $(this).find('Cell').eq(10).text();
				var filmBoroughStr = $(this).find('Cell').eq(11).text();
				var filmBorough = $.trim(filmBoroughStr);
				if( filmBorough == "Manhattan" || filmBorough == "manhattan"){
					//$('<span></span>').html('<a href="#">' +title+ '</a>').appendTo('.filmNames');
					$('<span></span>').html('<a href="#" data-lon="'+longitute+'" data-lat="'+latitude+'">' +title+ '</a>').appendTo('.filmNames');
				}
			});
		}
	}); // End Get Films.xml*/


	var mainFlashInterval=self.setInterval(function(){mainFlashAnim()},10);
	var flashState = 1;
	function mainFlashAnim(){
		if (flashState == 1){

			$('.mainFlash').animate({'opacity': '0.5'},100);

		}else{
			$('.mainFlash').animate({'opacity': '1'},100);
		}		
		flashState *= -1;		
	}

	/*$('.filmNames span a').live("click", function(){ alert("Goodbye!"); }); */

	$('.visualize').on('click', function(){
		console.log('close');
		$('#boroughVisual').fadeIn(600);
	});

	$('.visClose').on('click', function(){
		console.log('close');
		$('#boroughVisual').fadeOut(600);
	});
	
	/* **********************  Overlay Code ***************************** */
    $('#guranteeBtn').click(function(){
                
        $('div#overlay_lightbox').removeClass('overlayModalBkgd');
        $('div#overlay_background').fadeIn(400); 
        $('div#overlay_lightbox').fadeIn(400);
                                                                        
        return false;
        });
        
        $('#closeBox, #closeButton').click(function(){                                                     
	        $('div#overlay_lightbox').fadeOut(400);
	        $('div#overlay_background').fadeOut(400);
	        $('div#overlay_lightbox').addClass('overlayModalBkgd');                                                              
	        return false;
		});

});
    
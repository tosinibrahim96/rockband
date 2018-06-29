jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "menu" link is shown
	var offset = 300;
	var hideBody = $("#hideForModal");
	var navigationContainer = $('#cd-nav'),
		mainNavigation = navigationContainer.find('#cd-main-nav ul');

	//hide or show the "menu" link
	checkMenu();
	$(window).scroll(function(){
		checkMenu();
	});

	//open or close the menu clicking on the bottom "menu" link
	$('.cd-nav-trigger').on('click', function(){
		$(this).toggleClass('menu-is-open');
		//we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
		mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');		
	});

	function checkMenu() {
		if( $(window).scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
			navigationContainer.addClass('is-fixed').find('.cd-nav-trigger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
				mainNavigation.addClass('has-transitions');
			});
		} else if ($(window).scrollTop() <= offset) {
			//check if the menu is open when scrolling up
			if( mainNavigation.hasClass('is-visible')  && !$('html').hasClass('no-csstransitions') ) {
				//close the menu with animation
				mainNavigation.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					//wait for the menu to be closed and do the rest
					mainNavigation.removeClass('is-visible is-hidden has-transitions');
					navigationContainer.removeClass('is-fixed');
					$('.cd-nav-trigger').removeClass('menu-is-open');
				});
			//check if the menu is open when scrolling up - fallback if transitions are not supported
			} else if( mainNavigation.hasClass('is-visible')  && $('html').hasClass('no-csstransitions') ) {
					mainNavigation.removeClass('is-visible has-transitions');
					navigationContainer.removeClass('is-fixed');
					$('.cd-nav-trigger').removeClass('menu-is-open');
			//scrolling up with menu closed
			} else {
				navigationContainer.removeClass('is-fixed');
				mainNavigation.removeClass('has-transitions');
			}
		} 
	}

	var scrollLink = $('.scroll');

	//smooth scrolling
	scrollLink.click(function(event){
		event.preventDefault();
		//this is to make sure the content of the body is visible by removing hide class
		hideBody.removeClass("hide");
		$('body,html').animate({
			//scrollTop looks for scrollbar position
			//how far away is our scrollbar from top, now take my scrollbar to that location
			scrollTop: $(this.hash).offset().top			
		},2000);

		//if modal is open,close it immidiately after scrolling to required point
		$(".modalcontainer").fadeOut("slow");
		$(".modal").fadeOut("slow");
	});


	  
	  $(".close").click(function() {
		$(".modalcontainer").fadeOut("slow");
		$(".modal").fadeOut("slow");
		//remove hide class from body when user presses close button
		hideBody.removeClass("hide");
	  });
	  
	//   $(".buttons").click(function() {
	// 	$(".modalcontainer").fadeOut("slow");
	// 	$(".modal").fadeOut("slow");
	//   });

	  $(document).mousemove(function(e){
		mouseX = e.pageX;
		mouseY = e.pageY;
		//To Get the relative position
		if( this.offsetLeft !=undefined)
		  mouseX = e.pageX - this.offsetLeft;
		if( this.offsetTop != undefined)
		  mouseY = e.pageY; - this.offsetTop;

		if(mouseX < 0)
			 mouseX =0;
		if(mouseY < 0)
			mouseY = 0;

		windowWidth  = $(window).width()+$(window).scrollLeft();
		windowHeight = $(window).height()+$(window).scrollTop();
});


$('.modalbtn').click(function(){
	
	if ( $(this).hasClass("ticket")) {
		$(".ticketModal").fadeIn("slow");
		$(".modal").fadeIn("slow");
		hideBody.addClass('hide');
		console.log("yes");
	}else{
		var modalId = this.id;
		console.log("no");
	}
	
	
	var displayModal = "#"+modalId+"Modal";
	$(displayModal).fadeIn("slow");
	$(".modal").fadeIn("slow");
	//hide body content when modal is open
	hideBody.addClass('hide');
//    var popupWidth  = $('.modalcontainer').outerWidth();
//    var popupHeight =  $('.modalcontainer').outerHeight();

//    if(mouseX+popupWidth > windowWidth)
// 	 popupLeft = mouseX-popupWidth;
//    else
// 	popupLeft = mouseX;

//    if(mouseY+popupHeight > windowHeight)
// 	 popupTop = mouseY-popupHeight;
//    else
// 	 popupTop = mouseY; 

//  if( popupLeft < $(window).scrollLeft()){
//   popupLeft = $(window).scrollLeft();
//  }

//  if( popupTop < $(window).scrollTop()){
//   popupTop = $(window).scrollTop();
//  }

//   if(popupLeft < 0 || popupLeft == undefined)
// 		popupLeft = 0;
//    if(popupTop < 0 || popupTop == undefined)
// 		popupTop = 0;

   $('.modalcontainer').offset({top:0});
   $('.modal').offset({top:0});
  });
});
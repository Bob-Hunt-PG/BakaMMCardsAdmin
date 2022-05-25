// JavaScript Document
// get the action filter option item on page load
$(function() {
	var $filterType = $('#filter-options li.active a').attr('class');
	var $filterType2 = $('#filter-options2 li.active a').attr('class');
	// get and assign the ourHolder element to the
	// $holder varible for use later
	var $holder = $('ul.product-thumbnails');
	var $holder2 = $('ul.product-thumbnails2');
	
	// clone all items within the pre-assigned $holder element
	var $data = $holder.clone();
	var $data2 = $holder2.clone();
	
	// attempt to call Quicksand when a filter option
	// item is clicked
	$('#filter-options li a').click(function(e) {
		// reset the active class on all the buttons
		$('#filter-options li').removeClass('active');
		
		// assign the class of the clicked filter option
		// element to our $filterType variable
		var $filterType = $(this).attr('class');
		$(this).parent().addClass('active');
		if ($filterType == 'all') {
			// assign all li items to the $filteredData var when
			// the 'All' filter option is clicked
			var $filteredData = $data.find('li');
		} else {
			// find all li elements that have our required $filterType
			// values for the data-type element
			var $filteredData = $data.find('li[data-type=' + $filterType + ']');
		}
		
		// call quicksand and assign transition parameters
		$holder.quicksand($filteredData, {
			duration: 500,
			easing: 'easeInOutQuad'
		});
		return false;
	});
	$('#filter-options2 li a').click(function(e) {
		// reset the active class on all the buttons
		$('#filter-options2 li').removeClass('active');
		
		// assign the class of the clicked filter option
		// element to our $filterType variable
		var $filterType2 = $(this).attr('class');
		$(this).parent().addClass('active');
		if ($filterType2 == 'all') {
			// assign all li items to the $filteredData var when
			// the 'All' filter option is clicked
			var $filteredData = $data2.find('li');
		} else {
			// find all li elements that have our required $filterType
			// values for the data-type element
			var $filteredData = $data2.find('li[data-type=' + $filterType2 + ']');
		}
		
		// call quicksand and assign transition parameters
		$holder2.quicksand($filteredData, {
			duration: 500,
			easing: 'easeInOutQuad'
		}, function() {
			if(window.location.href.indexOf('Apparel') > -1 || window.location.href.indexOf('apparel') > -1) {
				$('.white-logo').show();
				$('.button-holster').each(function() {
					$(this).find('button').first().css('width', '50%');
				});
			} else {
				$('.white-logo').hide();
				$('.button-holster').each(function() {
					$(this).find('button').first().css('width', '100%');
				});
			}
			
		});
		return false;
	});
});
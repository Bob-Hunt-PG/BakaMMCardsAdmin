// JavaScript Document

/**
 * Function to open the modals on the product page.
 */
function modalOpen(divID) {

	// Clear the session storage to prevent conflicting product selections.
	sessionStorage.clear();
	productType = '';

	// Open the product modal.
	$('#' + divID).modal('show');
}

/**
 * Get the quantity of the product that the user selects in the modal.
 */
function quantitySelect(clicked, divID) {

	// Set the variables for the quantity, cost, and type of product.
	var selection = $('#' + divID + ' .quantity').val(),
		cost = $('#' + divID + ' .quantity option:selected').attr('data-cost'),
		selectedType = $('#' + divID + ' .productType').text();
	
	// Determine which type of product the user has selected.
	if(selectedType === 'apparel') {

		// If the user selects an "Apparel" type product, we grab the 
		// quantity/size and send them to the correct product.
		sizeSelect(clicked, divID);
		$('#' + divID + ' .quantitySelect').val(selection);
	} else {

		// Else the user will be sent to the "Printing" type product.
		$(clicked).parent().parent().find('input[type="number"]').val(selection);
		$(clicked).parent().parent().find('.qtyPrice').text(cost);
	}
}

function sizeSelect(clicked, divID) {
	var selection = $('#' + divID + ' .size option:selected').val();
	var cost = $('#' + divID + ' .size option:selected').attr('data-cost');
	// var discount = cost * .10;
	// 	cost = cost - discount;
	var quantity = $('#' + divID + ' .quantity').val();
	var total = cost * quantity;
		total = total.toFixed(2);
	$(clicked).parent().parent().find('input[type="text"]').val(selection);
	$(clicked).closest('#' + divID).find('.qtyPrice').text(total);
	$('#' + divID + ' .sizeSelect').val(selection);
}

function optionSelect(clicked, divID, selection) {
	if(productType === 'apparel') {
		$(clicked).closest('td').find('select option:contains(' + selection + ')').prop('selected', true);
		RefreshProof();
		$(clicked).closest('td').find('.select.active').removeClass('active');
		$(clicked).parent().addClass('active');
	} else  {
		$(clicked).parent().parent().find('input').val(selection);
		changeProduct(clicked, divID);
		$(clicked).parent().addClass('active');
	}
}

// CHANGE THE PRODUCT
function changeProduct(clicked, divID) {
	// REMOVE ACTIVE FROM OTHER OPTIONS
	$(clicked).parent().parent().find('.select.active').removeClass('active');
	
	// GET VALUES FOR THE ART SPECIFICATIONS
	var selectedProduct = $('#' + divID + ' .productSelect').text();
	var selectedSize = $('#' + divID + ' .sizeSelect').val();
	var selectedLogo = $('#' + divID + ' .logoSelect').val();
	var selectedColor = $('#' + divID + ' .colorSelect').val();
	var selectedArt = $('#' + divID + ' .artSelect').val();
	var selectedBorder = $('#' + divID + ' .borderSelect').val();
	var selectedBack = $('#' + divID + ' .backSelect').val();
	
	if(typeof selectedProduct === 'undefined') {
		selectedProduct = '';
	}

	if(typeof selectedSize === 'undefined') {
		selectedSize = '';
	} 
	
	if(typeof selectedLogo === 'undefined') {
		selectedLogo = '';
	} 
	
	if(typeof selectedColor === 'undefined') {
		selectedColor = '';
	} 
	
	if(typeof selectedArt === 'undefined') {
		selectedArt = '';
	}
	
	if(typeof selectedBack === 'undefined') {
		selectedBack = '';
	}

	if(typeof selectedBorder === 'undefined') {
		selectedBorder = '';
	}
	
	// ACCOUNT FOR POSTCARD COLOR OPTION NOT AVAILABLE WHEN CERTAIN ORIENTATION
	// CHECK AVAILABLE COLOR OPTIONS
	if(divID === 'PostCard' && selectedArt === 'H' || divID === 'PostCard' && selectedLogo === 'B') {
		$('#' + divID + ' .navy').parent().addClass('hide');
		$('#' + divID + ' .navy').parent().removeClass('active');
		$('#' + divID + ' .green').parent().removeClass('hide');
		
		if(selectedColor === 'Navy') {
			selectedColor = 'Green';
			$('#' + divID + ' .green').parent().parent().find('input').val(selectedColor);
			$('#' + divID + ' .green').parent().addClass('active');
		}
	} else if(divID === 'PostCard' && selectedArt === 'V' && selectedLogo === '' || divID === 'PostCard' && selectedArt === 'V' && selectedLogo === 'Bulldog') {
		$('#' + divID + ' .navy').parent().removeClass('active hide');
		$('#' + divID + ' .green').parent().addClass('hide');
		$('#' + divID + ' .green').parent().removeClass('active');
		
		if(selectedColor === 'Green') {
			selectedColor = 'Navy';
			$('#' + divID + ' .navy').parent().parent().find('input').val(selectedColor);
			$('#' + divID + ' .navy').parent().addClass('active');
		}
	}
	
	// TRIM ART NAME TO COMPENSATE FOR OPS CHARACTER CAP

	if(divID === 'Invitation') {
		if(selectedBack === 'Standard') {
			var imgLink =  selectedProduct + selectedLogo + selectedArt  + selectedColor;
			var imgPrevLink =  selectedProduct + selectedLogo + selectedArt  + selectedColor + 'Prev';
			$('.standard').removeClass('hide');
			$('.image').addClass('hide');
		} else if(selectedBack === 'Image') {
			var imgLink =  selectedProduct + selectedBorder;
			var imgPrevLink =  selectedProduct + selectedBorder + 'Prev';
			$('.standard').addClass('hide');
			$('.image').removeClass('hide');
		}
	} else if(divID === 'PostCard') {
		var imgLink =  selectedProduct + selectedSize + selectedLogo + selectedArt + selectedBack + selectedColor;
		var imgPrevLink =  selectedProduct + selectedSize + selectedLogo + selectedArt + selectedBack + selectedColor + 'Prev';
	} else {
		var imgLink =  selectedProduct + selectedLogo + selectedArt + selectedBack + selectedColor;
		var imgPrevLink =  selectedProduct + selectedLogo + selectedArt + selectedBack + selectedColor + 'Prev';
	}

	if(imgLink.length > 30) {
		imgLink = imgLink.substr(0,30);
	} else if(imgPrevLink.length > 30) {
		imgPrevLink = imgLink.substr(0,30);
	}
	
	var imgURL = 'Files/BrokerBranding/mmcards/Include/';
	
	// CHANGE THE LINK AND IMAGE FOR THE PRODUCT
	$('#' + divID + ' .imgLink').attr('href', imgURL + imgLink + '.png');
	$('#' + divID + ' .productImg').attr('src', imgURL + imgPrevLink + '.png');
}

function selectProduct(divID, urlID) {
	// GET VALUES FOR THE ART SPECIFICATIONS
	var selectedQuantity = $('#' + divID + ' .quantitySelect').val();
	var selectedLogo = $('#' + divID + ' .logoSelect').val();
	if(divID === 'PostCard' && selectedLogo ==='B' || divID === 'PostCard' && selectedLogo === 'Bulldog') {
		var selectedColor = $('#' + divID + ' .logoSelect').val() + '-' + $('#' + divID + ' .colorSelect').val();
	} else {
		var selectedColor = $('#' + divID + ' .colorSelect').val();
	}
	var selectedArt = $('#' + divID + ' .artSelect').val();
	var selectedBorder = $('#' + divID + ' .borderSelect').val();
	var selectedBack = $('#' + divID + ' .backSelect').val();
	var selectedProduct = $('#' + divID + ' .productSelect').text();
	var selectedSize = $('#' + divID + ' .sizeSelect').val();
	var selectedType = $('#' + divID + ' .productType').text();
	
	// SET SESSIONSTORAGE FOR SELECTED PRODUCT
	sessionStorage.setItem('quantitySelect', selectedQuantity);
	sessionStorage.setItem('logoSelect', selectedLogo);
	sessionStorage.setItem('colorSelect', selectedColor);
	sessionStorage.setItem('artSelect', selectedArt);
	sessionStorage.setItem('borderSelect', selectedBorder);
	sessionStorage.setItem('backSelect', selectedBack);
	sessionStorage.setItem('productSelect', selectedProduct);
	sessionStorage.setItem('sizeSelect', selectedSize);
	sessionStorage.setItem('productType', selectedType);
	
	// SET THE STATIC URL TO THE PRODUCT
	if(selectedProduct === 'promo') {
		var productURL = '/Step1New.asp?Type=Promotional+Items&front=';
	} else if(selectedType === 'apparel') {
		var productURL = '/Step1New.asp?Type=Apparel&front=';
	} else {
		var productURL = '/Step1New.asp?Type=School+Stationery&front=';
	}

	
	// ACCOUNT FOR TWO DIFFERENT GREETING CARD PRODUCTS
	if(divID === 'GreetingCard' && selectedColor === 'Full') {
		urlID = '5966';
	}
	
	// SEND USER TO THE SELECTED PRODUCT
	window.location.href = productURL + urlID;
}
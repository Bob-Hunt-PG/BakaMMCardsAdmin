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

	// NIKE GOLF PRODUCTS

	// 203690 SIZE OPTIONS
	if(divID === '203690' && selectedSize === '2X Large') {
		urlID = '6737';
	} else if(divID === '203690' && selectedSize === '3X Large') {
		urlID = '6738';
	} else if(divID === '203690' && selectedSize === '4X Large') {
		urlID = '6739';
	}

	// 244610 SIZE OPTIONS
	if(divID === '244610' && selectedSize === '2X Large') {
		urlID = '6741';
	} else if(divID === '244610' && selectedSize === '3X Large') {
		urlID = '6742';
	} else if(divID === '244610' && selectedSize === '4X Large') {
		urlID = '6743';
	}

	// 604940 SIZE OPTIONS
	if(divID === '604940' && selectedSize === '2X Large Tall') {
		urlID = '6749';
	} else if(divID === '604940' && selectedSize === '3X Large Tall') {
		urlID = '6750';
	} else if(divID === '604940' && selectedSize === '4X Large Tall') {
		urlID = '6751';
	}

	// 466364 SIZE OPTIONS
	if(divID === '466364' && selectedSize === '2X Large') {
		urlID = '6753';
	} else if(divID === '466364' && selectedSize === '3X Large') {
		urlID = '6754';
	} else if(divID === '466364' && selectedSize === '4X Large') {
		urlID = '6755';
	}

	// 244620 SIZE OPTIONS
	if(divID === '244620' && selectedSize === '2X Large') {
		urlID = '6745';
	} else if(divID === '244620' && selectedSize === '3X Large') {
		urlID = '6746';
	} else if(divID === '244620' && selectedSize === '4X Large') {
		urlID = '6747';
	}

	// 604941 SIZE OPTIONS
	if(divID === '604941' && selectedSize === '2X Large Tall') {
		urlID = '6757';
	} else if(divID === '604941' && selectedSize === '3X Large Tall') {
		urlID = '6758';
	} else if(divID === '604941' && selectedSize === '4X Large Tall') {
		urlID = '6759';
	}

	// 746102 SIZE OPTIONS
	if(divID === '746102' && selectedSize === '2X Large') {
		urlID = '6761';
	} else if(divID === '746102' && selectedSize === '3X Large') {
		urlID = '6762';
	} else if(divID === '746102' && selectedSize === '4X Large') {
		urlID = '6763';
	}

	// 400099 SIZE OPTIONS
	if(divID === '400099' && selectedSize === '2X Large') {
		urlID = '6765';
	} else if(divID === '400099' && selectedSize === '3X Large') {
		urlID = '6766';
	} else if(divID === '400099' && selectedSize === '4X Large') {
		urlID = '6767';
	}

	// 349899 SIZE OPTIONS
	if(divID === '349899' && selectedSize === '2X Large') {
		urlID = '6770';
	} else if(divID === '349899' && selectedSize === '3X Large') {
		urlID = '6771';
	} else if(divID === '349899' && selectedSize === '4X Large') {
		urlID = '6772';
	}

	// 354064 SIZE OPTIONS
	if(divID === '354064' && selectedSize === '2X Large') {
		urlID = '6775';
	}

	// 746100 SIZE OPTIONS
	if(divID === '746100' && selectedSize === '2X Large') {
		urlID = '6777';
	}

	// 358890 SIZE OPTIONS
	if(divID === '358890' && selectedSize === '2X Large') {
		urlID = '6779';
	}

	// 545322 SIZE OPTIONS
	if(divID === '545322' && selectedSize === '2X Large') {
		urlID = '6781';
	}

	// 637165 SIZE OPTIONS
	if(divID === '637165' && selectedSize === '2X Large') {
		urlID = '6783';
	}

	// 779796 SIZE OPTIONS
	if(divID === '779796' && selectedSize === '2X Large') {
		urlID = '6785';
	}

	// NIKE GOLF END
	
	// DT143 SIZE OPTIONS
	if(divID === 'DT143' && selectedSize === '2X Large') {
		urlID = '6008';
	} else if(divID === 'DT143' && selectedSize === '3X Large') {
		urlID = '6009';
	} else if(divID === 'DT143' && selectedSize === '4X Large') {
		urlID = '6010';
	}
	
	// 266998 SIZE OPTIONS
	if(divID === '266998' && selectedSize === '2X Large') {
		urlID = '6023';
	} else if(divID === '266998' && selectedSize === '3X Large') {
		urlID = '6024';
	} else if(divID === '266998' && selectedSize === '4X Large') {
		urlID = '6025';
	}
	
	// K570 SIZE OPTIONS
	if(divID === 'K570' && selectedSize === '2X Large') {
		urlID = '6026';
	} else if(divID === 'K570' && selectedSize === '3X Large') {
		urlID = '6027';
	} else if(divID === 'K570' && selectedSize === '4X Large') {
		urlID = '6028';
	}
	
	// K557 SIZE OPTIONS
	if(divID === 'K557' && selectedSize === '2X Large') {
		urlID = '6031';
	} else if(divID === 'K557' && selectedSize === '3X Large') {
		urlID = '6032';
	} else if(divID === 'K557' && selectedSize === '4X Large') {
		urlID = '6033';
	}
	
	// 363807 SIZE OPTIONS
	if(divID === '363807' && selectedSize === '2X Large') {
		urlID = '6035';
	} else if(divID === '363807' && selectedSize === '3X Large') {
		urlID = '6036';
	} else if(divID === '363807' && selectedSize === '4X Large') {
		urlID = '6037';
	}
	
	// S608 SIZE OPTIONS
	if(divID === 'S608' && selectedSize === '2X Large') {
		urlID = '6039';
	} else if(divID === 'S608' && selectedSize === '3X Large') {
		urlID = '6040';
	} else if(divID === 'S608' && selectedSize === '4X Large') {
		urlID = '6041';
	}
	
	// PC54LS SIZE OPTIONS
	if(divID === 'PC54LS' && selectedSize === '2X Large') {
		urlID = '6044';
	} else if(divID === 'PC54LS' && selectedSize === '3X Large') {
		urlID = '6045';
	} else if(divID === 'PC54LS' && selectedSize === '4X Large') {
		urlID = '6046';
	}
	
	// K567 SIZE OPTIONS
	if(divID === 'K567' && selectedSize === '2X Large') {
		urlID = '6064';
	} else if(divID === 'K567' && selectedSize === '3X Large') {
		urlID = '6065';
	} else if(divID === 'K567' && selectedSize === '4X Large') {
		urlID = '6066';
	}
	
	// RH24 SIZE OPTIONS
	if(divID === 'RH24' && selectedSize === '2X Large') {
		urlID = '6076';
	} else if(divID === 'RH24' && selectedSize === '3X Large') {
		urlID = '6077';
	} else if(divID === 'RH24' && selectedSize === '4X Large') {
		urlID = '6078';
	}
	
	// L567 SIZE OPTIONS
	if(divID === 'L567' && selectedSize === '2X Large') {
		urlID = '6072';
	} else if(divID === 'L567' && selectedSize === '3X Large') {
		urlID = '6073';
	} else if(divID === 'L567' && selectedSize === '4X Large') {
		urlID = '6074';
	}
	
	// RH25 SIZE OPTIONS
	if(divID === 'RH25' && selectedSize === '2X Large') {
		urlID = '6068';
	} else if(divID === 'RH25' && selectedSize === '3X Large') {
		urlID = '6069';
	} else if(divID === 'RH25' && selectedSize === '4X Large') {
		urlID = '6070';
	}
	
	// LPC54LS SIZE OPTIONS
	if(divID === 'LPC54LS' && selectedSize === '2X Large') {
		urlID = '6085';
	} else if(divID === 'LPC54LS' && selectedSize === '3X Large') {
		urlID = '6086';
	} else if(divID === 'LPC54LS' && selectedSize === '4X Large') {
		urlID = '6087';
	}
	
	// L608 SIZE OPTIONS
	if(divID === 'L608' && selectedSize === '2X Large') {
		urlID = '6093';
	} else if(divID === 'L608' && selectedSize === '3X Large') {
		urlID = '6094';
	} else if(divID === 'L608' && selectedSize === '4X Large') {
		urlID = '6095';
	}
	
	// L570 SIZE OPTIONS
	if(divID === 'L570' && selectedSize === '2X Large') {
		urlID = '6060';
	} else if(divID === 'L570' && selectedSize === '3X Large') {
		urlID = '6061';
	} else if(divID === 'L570' && selectedSize === '4X Large') {
		urlID = '6062';
	}
	
	// L231 SIZE OPTIONS
	if(divID === 'L231' && selectedSize === '2X Large') {
		urlID = '6110';
	} else if(divID === 'L231' && selectedSize === '3X Large') {
		urlID = '6111';
	} else if(divID === 'L231' && selectedSize === '4X Large') {
		urlID = '6112';
	}
	
	// F231 SIZE OPTIONS
	if(divID === 'F231' && selectedSize === '2X Large') {
		urlID = '6114';
	} else if(divID === 'F231' && selectedSize === '3X Large') {
		urlID = '6115';
	} else if(divID === 'F231' && selectedSize === '4X Large') {
		urlID = '6116';
	}
	
	// LST850 SIZE OPTIONS
	if(divID === 'LST850' && selectedSize === '2X Large') {
		urlID = '6118';
	} else if(divID === 'LST850' && selectedSize === '3X Large') {
		urlID = '6119';
	} else if(divID === 'LST850' && selectedSize === '4X Large') {
		urlID = '6120';
	}
	
	// ST850 SIZE OPTIONS
	if(divID === 'ST850' && selectedSize === '2X Large') {
		urlID = '6122';
	} else if(divID === 'ST850' && selectedSize === '3X Large') {
		urlID = '6123';
	} else if(divID === 'ST850' && selectedSize === '4X Large') {
		urlID = '6124';
	}
	
	// LST250 SIZE OPTIONS
	if(divID === 'LST250' && selectedSize === '2X Large') {
		urlID = '6126';
	} else if(divID === 'LST250' && selectedSize === '3X Large') {
		urlID = '6127';
	} else if(divID === 'LST250' && selectedSize === '4X Large') {
		urlID = '6128';
	}
	
	// ST250 SIZE OPTIONS
	if(divID === 'ST250' && selectedSize === '2X Large') {
		urlID = '6130';
	} else if(divID === 'ST250' && selectedSize === '3X Large') {
		urlID = '6131';
	} else if(divID === 'ST250' && selectedSize === '4X Large') {
		urlID = '6132';
	}
	
	// DM476 SIZE OPTIONS
	if(divID === 'DM476' && selectedSize === '2X Large') {
		urlID = '6144';
	} else if(divID === 'DM476' && selectedSize === '3X Large') {
		urlID = '6145';
	} else if(divID === 'DM476' && selectedSize === '4X Large') {
		urlID = '6146';
	}
	
	// DM1190L SIZE OPTIONS
	if(divID === 'DM1190L' && selectedSize === '2X Large') {
		urlID = '6148';
	} else if(divID === 'DM1190L' && selectedSize === '3X Large') {
		urlID = '6149';
	} else if(divID === 'DM1190L' && selectedSize === '4X Large') {
		urlID = '6150';
	}
	
	// LM1007 SIZE OPTIONS
	if(divID === 'LM1007' && selectedSize === '2X Large') {
		urlID = '6155';
	} else if(divID === 'LM1007' && selectedSize === '3X Large') {
		urlID = '6156';
	} else if(divID === 'LM1007' && selectedSize === '4X Large') {
		urlID = '6157';
	}
	
	// AA9070 SIZE OPTIONS
	if(divID === 'AA9070' && selectedSize === '2X Large') {
		urlID = '6152';
	} else if(divID === 'AA9070' && selectedSize === '3X Large') {
		urlID = '6153';
	}
	
	
	// AA5052 SIZE OPTIONS
	if(divID === 'AA5052' && selectedSize === '2X Large') {
		urlID = '6138';
	}
	
	// 286772 SIZE OPTIONS
	if(divID === '286772' && selectedSize === '2X Large') {
		urlID = '6108';
	}
	
	// 354067 SIZE OPTIONS
	if(divID === '354067' && selectedSize === '2X Large') {
		urlID = '6097';
	}
	
	// ACCOUNT FOR TWO DIFFERENT TABLE TENT PRODUCTS
	if(divID === 'TableTent' && selectedArt === 'NoArt' && selectedBack === '') {
		urlID = '5885';
	}
	
	if(divID === 'TableTent' && selectedArt === 'ArtSplit' && selectedBack === '') {
		urlID = '5974';
	}

	if(divID === 'TableTent' && selectedArt === 'Art' && selectedBack === 'HS') {
		urlID = '6429';
	}

	if(divID === 'TableTent' && selectedArt === 'ArtSplit' && selectedBack === 'HS') {
		urlID = '6432';
	}

	if(divID === 'TableTent' && selectedArt === 'NoArt' && selectedBack === 'HS') {
		urlID = '6433';
	}
	
	// ACCOUNT FOR TWO DIFFERENT TABLE TENT PRODUCTS
	if(divID === 'Notecard' && selectedLogo === 'BulldogNotecard' && selectedArt === 'V') {
		urlID = '6170';
	} else if(divID === 'Notecard' && selectedLogo === 'PlainNotecard' && selectedArt === 'V') {
		urlID = '6169';
	} else if(divID === 'Notecard' && selectedLogo === 'BulldogNotecard' && selectedArt === 'H') {
		urlID = '6431';
	}
	
	// ACCOUNT FOR TWO DIFFERENT POSTCARD PRODUCTS
	if(divID === 'PostCard' && selectedArt === 'V' && selectedSize === '4X6') {
		urlID = '5889';
	}
	if(divID === 'PostCard' && selectedArt === 'V' && selectedSize === '5X7') {
		urlID = '5938';
	}
	if(divID === 'PostCard' && selectedArt === 'H' && selectedSize === '5X7') {
		urlID = '5936';
	}
	
	// ACCOUNT FOR TWO DIFFERENT NAPKIN INSERT PRODUCTS
	if(divID === 'NapkinInsert' && selectedArt === 'NoArt' && selectedBack === '') {
		urlID = '5893';
	} else if(divID === 'NapkinInsert' && selectedArt === 'ArtSplit' && selectedBack === '') {
		urlID = '5967';
	} else if(divID === 'NapkinInsert' && selectedArt === 'NoArt' && selectedBack === 'HS') {
		urlID = '6425';
	} else if(divID === 'NapkinInsert' && selectedArt === 'Art' && selectedBack === 'HS') {
		urlID = '6427';
	} else if(divID === 'NapkinInsert' && selectedArt === 'ArtSplit' && selectedBack === 'HS') {
		urlID = '6428';
	}
	
	// ACCOUNT FOR TWO DIFFERENT POSTER PRODUCTS
	if(divID === 'Poster' && selectedArt === 'NoArt') {
		urlID = '5891';
	} else if(divID === 'Poster' && selectedArt === 'ArtSplit') {
		urlID = '5909';
	}
	
	// ACCOUNT FOR TWO DIFFERENT FLYER PRODUCTS
	if(divID === 'Flyer' && selectedArt === 'NoArt') {
		urlID = '5906';
	} else if(divID === 'Flyer' && selectedArt === 'ArtSplit') {
		urlID = '5905';
	}
	
	if(divID === 'NonEventFlyer' && selectedArt === 'NoArt') {
		urlID = '6172';
	} else if(divID === 'NonEventFlyer' && selectedArt === 'ArtSplit') {
		urlID = '6173';
	}
	
	// ACCOUNT FOR TWO DIFFERENT CERTIFICATE PRODUCTS
	if(divID === 'Certificate' && selectedBack === 'TwoSig') {
		urlID = '5908';
	}

	if(divID === 'Certificate' && selectedBack === 'RibbonOneSig') {
		urlID = '6399';
	}

	if(divID === 'Certificate' && selectedBack === 'RibbonTwoSig') {
		urlID = '6400';
	}
	
	// ACCOUNT FOR TWO DIFFERENT GREETING CARD PRODUCTS
	if(divID === 'GreetingCard' && selectedColor === 'Full') {
		urlID = '5966';
	}
	
	// SEND USER TO THE SELECTED PRODUCT
	window.location.href = productURL + urlID;
}
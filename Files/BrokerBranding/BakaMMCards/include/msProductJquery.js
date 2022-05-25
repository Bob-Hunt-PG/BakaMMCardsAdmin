// JavaScript Document


// DECLARE VARIABLE OPTIONS
var quantitySelected = sessionStorage.getItem('quantitySelect');
var backSelected = sessionStorage.getItem('backSelect');
var borderSelected = sessionStorage.getItem('borderSelect');
var logoSelected = sessionStorage.getItem('logoSelect');
var colorSelected = sessionStorage.getItem('colorSelect');
var artSelected = sessionStorage.getItem('artSelect');
var sizeSelected = sessionStorage.getItem('sizeSelect');
var productType = sessionStorage.getItem('productType');
var productSelected = sessionStorage.getItem('productSelect');

function styleSelect() {
	// SELECT CORRECT BACK
	$('#selectBack option:contains(' + backSelected + ')').first().prop('selected', true);
	
	if(window.location.href.indexOf("5860") > -1) {
		if(backSelected === 'Standard') {
			$('#selectBack option:contains(' + colorSelected + ' MMCards ' + logoSelected + ')').first().prop('selected', true);
		} else if(backSelected === 'Image' && borderSelected !== 'Full') {
			$('#selectBack option:contains(Invitation Back With Border Image)').first().prop('selected', true);
		} else if(backSelected === 'Image' && borderSelected === 'Full') {
			$('#selectBack option:contains(Invitation Back With Image)').first().prop('selected', true);
		}
	}
	
	// SELECT THE QUANTITY
	setTimeout(function() {
		if(productType === 'apparel') {
			$('input[name="TotalQuantity"]').val(quantitySelected);
		} else {
			$('#Quantity option:contains(' + quantitySelected + ')').first().prop('selected', true);
		}
	}, 250);
	
	$('body').append('<div id="msLoading"><div class="loader"><div class="holder"><div class="box"></div></div><div class="holder"><div class="box"></div></div><div class="holder"><div class="box"></div></div></div></div>');
	
	// SKIP TO EDIT PAGE
	setTimeout(function() {
		$('#btnSubmit').click();
	}, 500);
}

function optionAssign() {
	// ASSIGN THE SELECTED COLOR
	$('#Logo option:contains(' + logoSelected + ')').prop('selected', true);
	$('#Art option:contains(' + artSelected + ')').prop('selected', true);
	$('#Color option:contains(' + colorSelected + ')').prop('selected', true);
	$('#BColor option:contains(' + colorSelected + ')').prop('selected', true);
	$('#ASize option:contains(' + sizeSelected + ')').prop('selected', true);
	$('#BorderColor option:contains(' + borderSelected + ')').prop('selected', true);

	if(window.location.href.indexOf("5975") > -1) {
		var colorActual = $('#Color option').filter(function(){return $(this).text() == colorSelected }).val()
		$('#Color option[value="' + colorActual + '"]').prop('selected', true);
	}

	if(window.location.href.indexOf("5936") > -1 || window.location.href.indexOf("5938") > -1 || window.location.href.indexOf("5888") > -1 || window.location.href.indexOf("5889") > -1) {
		var colorCheck = $('#Color option:selected').text();
		if(colorCheck.indexOf('Navy') != -1) {
			$('#titleblack').closest('table').closest('tr').hide();
			$('#titlewhite').closest('table').closest('tr').show();
		} else {
			$('#titlewhite').closest('table').closest('tr').hide();
			$('#titleblack').closest('table').closest('tr').show();
		}

		if(colorCheck.indexOf('B-') != -1 || colorCheck.indexOf('Bulldog-') != -1) {
			$('#imgPDF2').closest('table').closest('tr').hide();
		} else {
			$('#imgPDF2').closest('table').closest('tr').show();
		}

		$('#Color').on('change', function() {
			var colorCheck = $('#Color option:selected').text();
			if(colorCheck.indexOf('Navy') != -1) {
				var titleBlack = $('#titleblack').val();
				$('#titleblack').closest('table').closest('tr').hide();
				$('#titlewhite').closest('table').closest('tr').show();
				$('#titlewhite').val(titleBlack);
				$('#titleblack').val('');
			} else {
				var titleWhite = $('#titlewhite').val();
				$('#titlewhite').closest('table').closest('tr').hide();
				$('#titleblack').closest('table').closest('tr').show();
				$('#titleblack').val(titleWhite);
				$('#titlewhite').val('');
			}

			if(colorCheck.indexOf('B-') != -1 || colorCheck.indexOf('Bulldog-') != -1) {
				$('#imgPDF2').closest('table').closest('tr').hide();
			} else {
				$('#imgPDF2').closest('table').closest('tr').show();
			}
		});
	}

	// REFRESH THE PREVIEW
	setTimeout(function() {
		RefreshProof();
	}, 500);
	
	if(productType === 'apparel') {
		$('#Color').hide();
		$($('#Color option').get().reverse()).each(function() {
			var color = $(this).text(),
				color = color.substring(color.indexOf(" ") + 1),
				colorClass = color.toLowerCase(),
				selectedColor = colorSelected.toLowerCase(),
				fn = "optionSelect(this,'" + productSelected + "', '" + color + "')",
				colore = '<span class="select"><b class="color ' + colorClass + '" onclick="' + fn + '"></b></span>';
				
			if(color === '') {
				
			} else {
				$('#Color').after(colore);
				$('.' + selectedColor).parent().addClass('active');
			}
		});
	}
	
	$('#BColor').parent().parent().parent().parent().parent().parent().addClass('hide');
	$('#spnBackProof').parent().find('br').remove()
	
	// CHANGE PULSE OFFICE OPTION TEXT TO YES/NO
	$('select option:contains("Pulse Office")').parent().addClass('pulseOffice');
	$('.pulseOffice option:contains("Pulse Office")').text('Yes');
	
	// CHANGE BCR OPTION TEXT TO YES/NO
	$('.labeltext').each(function() {
		if($(this).find('b').text() === 'BCR') {
			$(this).next().find('td').first().append('<p><b><a target="_blank" href="https://www.MMCards.edu/core/propose-bcr-event">This has gone through the formal approval process for BCR credit</a></b></p>');
			$(this).next().find('td').first().find('select option:contains("BCR")').text('Yes');
		}
	});

	// CHANGE Accessibility OPTION TEXT TO YES/NO
	$('.labeltext').each(function() {
		if($(this).find('b').text() === 'Accessibility') {
			$(this).next().find('td').first().find('select option:contains("Accessibility")').text('Yes').prop('selected', true);
		}
	});
	
	// CHANGE Pulse TO PuLSE
	$('.labeltext b').each(function() {
		var pulse = $(this).text().replace('Pulse', 'PuLSE');
		$(this).text(pulse);
	});
	
	$('*[onkeydown]').each(function() {
		var charLimit = $(this).attr('onkeydown').toString();
		var charLimitNum = parseInt(charLimit.replace(/[^0-9\.]/g, ''), 10).toString();
		
		$(this).after('<b>' + charLimitNum + ' max characters</b>');
	});
	
	$('#SLogo').after('<button type="button" id="logoSelection" class="btn btn-primary" onclick="selectLogoFN();">Select Logo</button> <span class="logoSelected"></span>');
}

function dateTime() {
	// SET THE DATEPICKER ON FIELDS
	$('#Date, #Date1, #Date2, #Date3, #Date4, #RegDate').datepicker({
		dateFormat: 'MM d, yy'
	});
	$('#Date, #Date1, #Date2, #Date3, #Date4, #RegDate').attr('readonly', true);

	if(window.location.href.indexOf("6171") > -1 || window.location.href.indexOf("6172") > -1 || window.location.href.indexOf("6173") > -1) {
		
	} else {
		$('#Date2').after('<p><b>The Pulse Date should be the day after the event</b></p>');
		$('#Date2').after('<button type="button" class="btn btn-primary cpdate" onclick="clearPDate(); return false"><span class="glyphicon glyphicon-erase"></span></button>');
	}
	
	// SET THE TIMEPICKER ON FIELDS
	$('#Time, #Time1, #Time2, #Time3, #Time4').timepicker({
		'timeFormat': 'g:i A',
		'step': 15,
		'disableTextInput': true
	});
}

function clearPDate() {
	$('#Date2').val('');
}

function characterCount() {
	var limit = $('input[type="text"], textarea').attr('onkeyup').replace(/\D/g,'');
}

function selectLogoFN() {
	$('#logoSelectPanel').addClass('in');
	$('body').addClass('noScr');
}

function logoPick(clicked, divID) {
	$('#SLogo option:contains(' + divID + ')').first().prop('selected', true);
	$('#logoSelectPanel').removeClass('in');
	$('body').removeClass('noScr');
	var selectedSLogo = $(clicked).parent().find('img').attr('alt');
	$('.logoSelected').text(selectedSLogo);
	RefreshProof();
}

$(function() {
	var getUrl = window.location.toString();
	
	if(getUrl.indexOf("www") > -1) {
		window.location.replace("https://mmcards.mybrandstorefront.com");
	}
	
	if(window.location.href.indexOf("Promotional") > -1) {
		$('#Form1').before('<p><b>Preview of logo placement is for reference only. Exact logo placement may differ slightly than represented on screen.</b></p>');
		$('#btnPreview').hide();
	}

	if(window.location.href.indexOf("Admission%20Authentication") > -1 || window.location.href.indexOf("admission%20authentication") > -1) {
		var password = $('.password').val();

		$('.admission-login button').on('click', function() {
			password = $('.password').val();

			if(password === 'Bulldog') {
				sessionStorage.setItem('authenticated for admission', password);
				window.location.href = '/page.asp?name=Admission%20Programs';
			} else {
				alert('Please enter the correct password in order to access the Admission Programs.');
			}
		});
	}

	if(window.location.href.indexOf("Admission%20Programs") > -1 || window.location.href.indexOf("admission%20programs") > -1) {
		var session = sessionStorage.getItem('authenticated for admission');

		if(session === 'Bulldog') {

		} else {
			window.location.href = '/page.asp?name=Admission%20Authentication';
		}
	}
	
	if(window.location.href.indexOf("Checkout")) {
		$('.bordertable td').each(function() {
			var text = $(this).text(),
				search = '($0.00)';
			
			if(text.indexOf(search) > -1) {
				$(this).addClass('addedclass');
				var change = '<p><b>If your order requires mailing assistance or if you would like a PDF of your order, please contact <a href="mailto:jlaughlin@priority-press.com">Jeff Laughlin</a> with your product order number and mail list.</b></p><p><b>A PDF of your promotional item will be sent to you for approval by Jeff Laughlin. Once approved, your item will be ordered. </b></p><br><p><b>Please allow 2-3 business days after final approval from Marketing for the delivery of any printed materials. If product is needed sooner than the regular scheduled delivery day of Thursday, please select “Rush Delivery” at checkout. Please remember, 2-3 business days are still required to complete your printing request.</b></p><br><input type="radio" onclick="UpdateFreight(1)" name="freightops" value="1" checked> &nbsp;Weekly Delivery on Truck (Every Thursday) <span style="color: #F00; font-weight: bold;">A 5% delivery fee (not to exceed $40) will be applied to the final invoice prepared by Campus Impressions.</span>';
				$('.addedclass').html(change);
			}
		});
	}
	
	if(window.location.href.indexOf("Checkout.asp") > -1) {
		$('select[name="PaymentType"]').parent().append('<p class="red" style="display: inline-block; font-weight: bold; font-size: 12px;"><span style="color: #FF0000">Important!</span> You will receive an email with a link to make your payment once your order has been approved.</p>');
		$('select[name="PaymentType"]').on('change', function() {
			var paymentType = $(this).val();
			
			if(paymentType === 'Credit Card') {
				$(this).parent().append('<p class="red" style="display: inline-block; font-weight: bold; font-size: 12px;"><span style="color: #FF0000">Important!</span> You will receive an email with a link to make your payment once your order has been approved.</p>');
			} else {
				$(this).parent().find('p').remove();
			}
		});

		$('input[name="PONumber"]').parent().append('<p style="display: inline-block; font-weight: bold; font-size: 12px; vertical-align: middle; width: 650px; padding-left: 10px;">Regardless of type of payment, this field needs completed. As long as credit card is chosen above from the drop down, the department will not get charged</p>');
	}
	
	if(window.location.href.indexOf("ProofStationery.asp") > -1) {
		$('td').each(function() {
			if($(this).is(':contains("Size")')) {
				$(this).next('td').find('select').addClass('sizeSelect');
				$('.sizeSelect option:contains(' + sizeSelected + ')').first().prop('selected', true);
			}
		});
	}

	if(window.location.href.indexOf("Step1New.asp") > -1 && $('#mastertitle:contains("Enter Details")').length > 0 || window.location.href.indexOf("ProofStationery.asp") > -1 || window.location.href.indexOf("Step5Edit.asp") > -1) {
		$('input[name="btnSubmit"], input[value="Edit Artwork Details"], #btnSave, #btnCart').on('click', function() {
			window.onbeforeunload = null;
		});
		window.onbeforeunload = function() {
			return "Warning: Your work will not be saved if you leave this page";
		};
	}
	
	// TIE THE PuLSE GRAPHIC AND PuLSE DATE TOGETHER
	if(window.location.href.indexOf("Step1New.asp") > -1 && $('#mastertitle:contains("Enter Details")').length > 0 || window.location.href.indexOf("Step5Edit.asp") > -1) {
		$('input[name="btnSubmit"]').on('click', function() {
			var pulseYN = $('.pulseOffice').val();
			var pulseD = $('#Date2').val();
			
			if(pulseYN !== '' && pulseD === '') {
				alert('PuLSE Date is required with PuLSE Graphic');
				return false;
			} else if(pulseYN === '' && pulseD !== '') {
				$('.pulseOffice option:contains("Yes")').prop('selected', true);
				return true;
			} else {
				return true;
			}
		});
	}

	// HIDE REDUNDANT LABEL
	$('.labelgrouptext').parent().parent().hide();
	
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
	
	// SET PRODUCT OPTIONS
if(window.location.href.indexOf("School Stationery") > -1 || window.location.href.indexOf("Promotional Items") > -1 || window.location.href.indexOf("Type=Apparel") > -1 || window.location.href.indexOf("School+Stationery") > -1 || window.location.href.indexOf("Promotional+Items") > -1 || window.location.href.indexOf("Step5Edit") > -1) {
		// SELECT OPTIONS ON STEP1NEW.ASP AND SKIP TO EDIT
		if($('#Quantity').length || $('#selectFront').length || $('#selectBack').length) {
			styleSelect();
		}
		// SELECT THE OPTIONS
		optionAssign();
		dateTime();
    }
	
	if(window.location.href.indexOf("5897") > -1) {
		$('#Art option:contains(' + colorSelected + ' ' + logoSelected + ')').prop('selected', true);
	}
	
	if(window.location.href.indexOf("5941") > -1) {
		$('#Color').on('change', function() {
			var bmColor = $('#Color option:selected').text();
			$('#BColor option:contains(' + bmColor + ')').prop('selected', true);
		});
	}
	
	if(window.location.href.indexOf("Step1New.asp?Type=School+Stationery&front=5884") > -1) {
	
		$('#liscalepdfs_id19573').parent().parent().parent().parent().parent().parent().hide();
	
		$('#btnPreview, input[name="btnSubmit"]').click(function() {
			var pdfs = $('#lipdfs_id19572').val();
			var scalePdfs = $('#liscalepdfs_id19572').val();
			var xPdfs = $('#lixpdfs_id19572').val();
			var yPdfs = $('#liypdfs_id19572').val();
			var widthPdfs = $('#liwidthpdfs_id19572').val();
			var heightPdfs = $('#liheightpdfs_id19572').val();
			var cropTopPdfs = $('#licroptoppdfs_id19572').val();
			var cropBottomPdfs = $('#licropbottompdfs_id19572').val();
			var cropLeftPdfs = $('#licropleftpdfs_id19572').val();
			var cropRightPdfs = $('#licroprightpdfs_id19572').val();
			var layerPdfs = $('#lilayerpdfs_id19572').val();
			var imagePdfs = $('#liimgsrcpdfs_id19572').val();
			
			$('input[id*="lipdfs"]').val(pdfs);
			$('input[id*="liscalepdfs"]').val(scalePdfs);
			$('input[id*="lixpdfs"]').val(xPdfs);
			$('input[id*="liypdfs"]').val(yPdfs);
			$('input[id*="liwidthpdfs"]').val(widthPdfs);
			$('input[id*="liheightpdfs"]').val(heightPdfs);
			$('input[id*="licroptoppdfs"]').val(cropTopPdfs);
			$('input[id*="licropbottompdfs"]').val(cropBottomPdfs);
			$('input[id*="licropleftpdfs"]').val(cropLeftPdfs);
			$('input[id*="licroprightpdfs"]').val(cropRightPdfs);
			$('input[id*="lilayerpdfs"]').val(layerPdfs);
			$('input[id*="liimgsrcpdfs"]').val(imagePdfs);
			
			setTimeout(function() {
				RefreshProof();
			}, 500);
		});
	}

	// if(window.location.href.indexOf("Step1New.asp?Type=School+Stationery&front=6429") > -1 || $('#contenttable h1:contains("Table Tent 1 Photo - Headshot")').length) {
	
	// 	$('#liscalepdfs_id22006').parent().parent().parent().parent().parent().parent().hide();
	
	// 	$('#btnPreview, input[name="btnSubmit"]').click(function() {
	// 		var pdfs = $('#lipdfs_id22005').val();
	// 		var scalePdfs = $('#liscalepdfs_id22005').val();
	// 		var xPdfs = $('#lixpdfs_id22005').val();
	// 		var yPdfs = $('#liypdfs_id22005').val();
	// 		var widthPdfs = $('#liwidthpdfs_id22005').val();
	// 		var heightPdfs = $('#liheightpdfs_id22005').val();
	// 		var cropTopPdfs = $('#licroptoppdfs_id22005').val();
	// 		var cropBottomPdfs = $('#licropbottompdfs_id22005').val();
	// 		var cropLeftPdfs = $('#licropleftpdfs_id22005').val();
	// 		var cropRightPdfs = $('#licroprightpdfs_id22005').val();
	// 		var layerPdfs = $('#lilayerpdfs_id22005').val();
	// 		var imagePdfs = $('#liimgsrcpdfs_id22005').val();
			
	// 		$('input[id*="lipdfs"]').val(pdfs);
	// 		$('input[id*="liscalepdfs"]').val(scalePdfs);
	// 		$('input[id*="lixpdfs"]').val(xPdfs);
	// 		$('input[id*="liypdfs"]').val(yPdfs);
	// 		$('input[id*="liwidthpdfs"]').val(widthPdfs);
	// 		$('input[id*="liheightpdfs"]').val(heightPdfs);
	// 		$('input[id*="licroptoppdfs"]').val(cropTopPdfs);
	// 		$('input[id*="licropbottompdfs"]').val(cropBottomPdfs);
	// 		$('input[id*="licropleftpdfs"]').val(cropLeftPdfs);
	// 		$('input[id*="licroprightpdfs"]').val(cropRightPdfs);
	// 		$('input[id*="lilayerpdfs"]').val(layerPdfs);
	// 		$('input[id*="liimgsrcpdfs"]').val(imagePdfs);
			
	// 		setTimeout(function() {
	// 			RefreshProof();
	// 		}, 500);
	// 	});
	// }
	
	if(window.location.href.indexOf("Step1New.asp?Type=School+Stationery&front=5974") > -1 || $('#contenttable h1:contains("Table Tent Three Photos")').length) {
	
		$('#liscalepdfs_id19620').parent().parent().parent().parent().parent().parent().hide();
		$('#liscalepdfs_id19627').parent().parent().parent().parent().parent().parent().hide();
		$('#liscalepdfs_id19629').parent().parent().parent().parent().parent().parent().hide();
		
		$('#btnPreview, input[name="btnSubmit"]').click(function() {
			var pdfs = $('#lipdfs_id19619').val();
			var scalePdfs = $('#liscalepdfs_id19619').val();
			var xPdfs = $('#lixpdfs_id19619').val();
			var yPdfs = $('#liypdfs_id19619').val();
			var widthPdfs = $('#liwidthpdfs_id19619').val();
			var heightPdfs = $('#liheightpdfs_id19619').val();
			var cropTopPdfs = $('#licroptoppdfs_id19619').val();
			var cropBottomPdfs = $('#licropbottompdfs_id19619').val();
			var cropLeftPdfs = $('#licropleftpdfs_id19619').val();
			var cropRightPdfs = $('#licroprightpdfs_id19619').val();
			var layerPdfs = $('#lilayerpdfs_id19619').val();
			var imagePdfs = $('#liimgsrcpdfs_id19619').val();
			
			var pdfs2 = $('#lipdfs_id19626').val();
			var scalePdfs2 = $('#liscalepdfs_id19626').val();
			var xPdfs2 = $('#lixpdfs_id19626').val();
			var yPdfs2 = $('#liypdfs_id19626').val();
			var widthPdfs2 = $('#liwidthpdfs_id19626').val();
			var heightPdfs2 = $('#liheightpdfs_id19626').val();
			var cropTopPdfs2 = $('#licroptoppdfs_id19626').val();
			var cropBottomPdfs2 = $('#licropbottompdfs_id19626').val();
			var cropLeftPdfs2 = $('#licropleftpdfs_id19626').val();
			var cropRightPdfs2 = $('#licroprightpdfs_id19626').val();
			var layerPdfs2 = $('#lilayerpdfs_id19626').val();
			var imagePdfs2 = $('#liimgsrcpdfs_id19626').val();
			
			var pdfs3 = $('#lipdfs_id19628').val();
			var scalePdfs3 = $('#liscalepdfs_id19628').val();
			var xPdfs3 = $('#lixpdfs_id19628').val();
			var yPdfs3 = $('#liypdfs_id19628').val();
			var widthPdfs3 = $('#liwidthpdfs_id19628').val();
			var heightPdfs3 = $('#liheightpdfs_id19628').val();
			var cropTopPdfs3 = $('#licroptoppdfs_id19628').val();
			var cropBottomPdfs3 = $('#licropbottompdfs_id19628').val();
			var cropLeftPdfs3 = $('#licropleftpdfs_id19628').val();
			var cropRightPdfs3 = $('#licroprightpdfs_id19628').val();
			var layerPdfs3 = $('#lilayerpdfs_id19628').val();
			var imagePdfs3 = $('#liimgsrcpdfs_id19628').val();
			
			
			$('#lipdfs_id19620').val(pdfs);
			$('#liscalepdfs_id19620').val(scalePdfs);
			$('#lixpdfs_id19620').val(xPdfs);
			$('#liypdfs_id19620').val(yPdfs);
			$('#liwidthpdfs_id19620').val(widthPdfs);
			$('#liheightpdfs_id19620').val(heightPdfs);
			$('#licroptoppdfs_id19620').val(cropTopPdfs);
			$('#licropbottompdfs_id19620').val(cropBottomPdfs);
			$('#licropleftpdfs_id19620').val(cropLeftPdfs);
			$('#licroprightpdfs_id19620').val(cropRightPdfs);
			$('#lilayerpdfs_id19620').val(layerPdfs);
			$('#liimgsrcpdfs_id19620').val(imagePdfs);
			
			$('#lipdfs_id19627').val(pdfs2);
			$('#liscalepdfs_id19627').val(scalePdfs2);
			$('#lixpdfs_id19627').val(xPdfs2);
			$('#liypdfs_id19627').val(yPdfs2);
			$('#liwidthpdfs_id19627').val(widthPdfs2);
			$('#liheightpdfs_id19627').val(heightPdfs2);
			$('#licroptoppdfs_id19627').val(cropTopPdfs2);
			$('#licropbottompdfs_id19627').val(cropBottomPdfs2);
			$('#licropleftpdfs_id19627').val(cropLeftPdfs2);
			$('#licroprightpdfs_id19627').val(cropRightPdfs2);
			$('#lilayerpdfs_id19627').val(layerPdfs2);
			$('#liimgsrcpdfs_id19627').val(imagePdfs2);
			
			$('#lipdfs_id19629').val(pdfs3);
			$('#liscalepdfs_id19629').val(scalePdfs3);
			$('#lixpdfs_id19629').val(xPdfs3);
			$('#liypdfs_id19629').val(yPdfs3);
			$('#liwidthpdfs_id19629').val(widthPdfs3);
			$('#liheightpdfs_id19629').val(heightPdfs3);
			$('#licroptoppdfs_id19629').val(cropTopPdfs3);
			$('#licropbottompdfs_id19629').val(cropBottomPdfs3);
			$('#licropleftpdfs_id19629').val(cropLeftPdfs3);
			$('#licroprightpdfs_id19629').val(cropRightPdfs3);
			$('#lilayerpdfs_id19629').val(layerPdfs3);
			$('#liimgsrcpdfs_id19629').val(imagePdfs3);
			
			setTimeout(function() {
				RefreshProof();
			}, 500);
		});
	}
	
	if(window.location.href.indexOf("ProofStationery.asp") > -1 && $('.DescriptionText:contains("Certificate")').length) {
		$('#masterhelptext').after('<blockquote class="help" id="certificatehelp">Learn how to <a target="_blank" href="https://prioritypress.mybrandstorefront.com/Files/BrokerBranding/mmcards/Include/MergeTwoFields.jpg">Merge Multiple Fields</a></blockquote><blockquote class="help" id="certificatehelp">Learn how to <a target="_blank" href="https://prioritypress.mybrandstorefront.com/Files/BrokerBranding/mmcards/Include/ConvertToCSV.jpg">Convert Excel To CSV</a></blockquote><blockquote class="help" id="certificatehelp">The Certificates are a flat-rate of $6.00 per download and will show as a $6.00 Handling Fee on the Checkout Page.</blockquote>');
	}
	
	// MMCARDS 101 PROGRAM SPECIAL FUNCTIONALITY
	if(window.location.href.indexOf("Step1New.asp?Type=School+Stationery&front=5859") > -1 || $('#contenttable h1:contains("MMCards 101 Program")').length) {
		
		$('.labeltext:contains("1")').parent().addClass('event1');
		$('.event1').wrapAll('<table cellpadding="0" cellspacing="0" width="100%" border="0" id="Event1"><tbody></tbody></table>');
		$('#Event1').after('<div id="addEvent2" class="add-event show"><span class="event-text">ADD EVENT 2</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div>');
		
		$('#addEvent2 .ms-hide').on('click', function() {
			$('#Event2').addClass('show-event');
			$('#addEvent2').removeClass('show');
			$('#addEvent3').addClass('show');
		});
		
		setTimeout(function() {
			if(window.location.href.indexOf("Step5Edit.asp")) {
				$('#Event1 input').each(function() {
					if($(this).val() !== '') {
						
					}
				});
				$('#Event2 input').each(function() {
					if($(this).val() !== '') {
						$('#Event2').addClass('show-event');
						$('#addEvent2').removeClass('show');
						$('#addEvent3').addClass('show');
					}
				});
				$('#Event3 input').each(function() {
					if($(this).val() !== '') {
						$('#Event3').addClass('show-event');
						$('#addEvent3').removeClass('show');
						$('#addEvent4').addClass('show');
					}
				});
				$('#Event4 input').each(function() {
					if($(this).val() !== '') {
						$('#Event4').addClass('show-event');
						$('#addEvent4').removeClass('show');
					}
				});
			}
		}, 500);
		
		$('.labeltext:contains("2")').parent().addClass('event2');
		$('.event2').wrapAll('<table cellpadding="0" cellspacing="0" width="100%" border="0" id="Event2"><tbody></tbody></table>');
		$('#Event2').after('<div id="addEvent3" class="add-event"><span class="event-text">ADD EVENT 3</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div>');
		
		$('#addEvent3 .ms-hide').on('click', function() {
			$('#Event3').addClass('show-event');
			$(this).toggleClass('ms-hide ms-show');
			$('#addEvent3').removeClass('show');
			$('#addEvent4').addClass('show');
		});
		
		$('.labeltext:contains("3")').parent().addClass('event3');
		$('.event3').wrapAll('<table cellpadding="0" cellspacing="0" width="100%" border="0" id="Event3"><tbody></tbody></table>');
		$('#Event3').after('<div id="addEvent4" class="add-event"><span class="event-text">ADD EVENT 4</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div>');
		
		$('#addEvent4 .ms-hide').on('click', function() {
			$('#Event4').addClass('show-event');
			$(this).toggleClass('ms-hide ms-show');
			$('#addEvent4').removeClass('show');
		});
		
		$('.labeltext:contains("4")').parent().addClass('event4');
		$('.event4').wrapAll('<table cellpadding="0" cellspacing="0" width="100%" border="0" id="Event4"><tbody></tbody></table>');
	}
	
	
	// MMCARDS ONE SHEETER SPECIAL FUNCTIONALITY
	if(window.location.href.indexOf("Step1New.asp?Type=School+Stationery&front=5942") > -1 || $('#contenttable h1:contains("One Sheeter")').length) {
		$('.labeltext:contains("1 Point 1")').parent().addClass('s1 s1p1');

		$('.s1p1').after('<tr><td></td><td><div id="addS1P2" class="add-event show"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		if($('#Color').val() === '315') {
			$('#webaddress').closest('table').parent().parent().hide();
			$('#webaddress').val('');
			$('#webaddress2').closest('table').parent().parent().show();
		} else {
			$('#webaddress').closest('table').parent().parent().show();
			$('#webaddress2').val('');
			$('#webaddress2').closest('table').parent().parent().hide();
		}
		
		$('#Color').on('change', function() {
			var webaddress = $('#webaddress').val();
			var webaddress2 = $('#webaddress2').val();
			
			if($(this).val() === '315') {
				$('#webaddress').closest('table').parent().parent().hide();
				$('#webaddress2').val(webaddress);
				$('#webaddress').val('');
				$('#webaddress2').closest('table').parent().parent().show();
			} else {
				$('#webaddress').closest('table').parent().parent().show();
				$('#webaddress').val(webaddress2);
				$('#webaddress2').val('');
				$('#webaddress2').closest('table').parent().parent().hide();
			}
		});
		
		$('#addS1P2 .ms-hide').on('click', function() {
			$('.s1p2').addClass('show-event');
			$('#addS1P2').removeClass('show');
			$('#addS1P3').addClass('show');
		});
		
		setTimeout(function() {
			if(window.location.href.indexOf("Step5Edit.asp")) {
				$('.s1p2 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s1p2').addClass('show-event');
						$('#addS1P2').removeClass('show');
						$('#addS1P3').addClass('show');
					}
				});
				$('.s1p3 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s1p3').addClass('show-event');
						$('#addS1P3').removeClass('show');
						$('#addS1P4').addClass('show');
					}
				});
				$('.s1p4 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s1p4').addClass('show-event');
						$('#addS1P4').removeClass('show');
						$('#addS1P5').addClass('show');
					}
				});
				$('.s1p5 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s1p5').addClass('show-event');
						$('#addS1P5').removeClass('show');
						$('#addS1P6').addClass('show');
					}
				});
				$('.s1p6 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s1p6').addClass('show-event');
						$('#addS1P6').removeClass('show');
					}
				});
				
				$('.s2p2 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s2p2').addClass('show-event');
						$('#addS2P2').removeClass('show');
						$('#addS2P3').addClass('show');
					}
				});
				$('.s2p3 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s2p3').addClass('show-event');
						$('#addS2P3').removeClass('show');
						$('#addS2P4').addClass('show');
					}
				});
				$('.s2p4 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s2p4').addClass('show-event');
						$('#addS2P4').removeClass('show');
						$('#addS2P5').addClass('show');
					}
				});
				$('.s2p5 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s2p5').addClass('show-event');
						$('#addS2P5').removeClass('show');
						$('#addS2P6').addClass('show');
					}
				});
				$('.s2p6 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s2p6').addClass('show-event');
						$('#addS2P6').removeClass('show');
					}
				});
				
				$('.s3p2 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s3p2').addClass('show-event');
						$('#addS3P2').removeClass('show');
						$('#addS3P3').addClass('show');
					}
				});
				$('.s3p3 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s3p3').addClass('show-event');
						$('#addS3P3').removeClass('show');
						$('#addS3P4').addClass('show');
					}
				});
				$('.s3p4 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s3p4').addClass('show-event');
						$('#addS3P4').removeClass('show');
						$('#addS3P5').addClass('show');
					}
				});
				$('.s3p5 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s3p5').addClass('show-event');
						$('#addS3P5').removeClass('show');
						$('#addS3P6').addClass('show');
					}
				});
				$('.s3p6 textarea').each(function() {
					if($(this).val() !== '') {
						$('.s3p6').addClass('show-event');
						$('#addS3P6').removeClass('show');
					}
				});
			}
		}, 500);
		
		$('.labeltext:contains("1 Point 2")').parent().addClass('s1 s1p2');
		$('.s1p2').after('<tr><td></td><td><div id="addS1P3" class="add-event"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		$('#addS1P3 .ms-hide').on('click', function() {
			$('.s1p3').addClass('show-event');
			$('#addS1P3').removeClass('show');
			$('#addS1P4').addClass('show');
		});
		
		$('.labeltext:contains("1 Point 3")').parent().addClass('s1 s1p3');
		$('.s1p3').after('<tr><td></td><td><div id="addS1P4" class="add-event"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		$('#addS1P4 .ms-hide').on('click', function() {
			$('.s1p4').addClass('show-event');
			$('#addS1P4').removeClass('show');
			$('#addS1P5').addClass('show');
		});
		
		$('.labeltext:contains("1 Point 4")').parent().addClass('s1 s1p4');
		$('.s1p4').after('<tr><td></td><td><div id="addS1P5" class="add-event"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		$('#addS1P5 .ms-hide').on('click', function() {
			$('.s1p5').addClass('show-event');
			$('#addS1P5').removeClass('show');
			$('#addS1P6').addClass('show');
		});
		
		$('.labeltext:contains("1 Point 5")').parent().addClass('s1 s1p5');
		$('.s1p5').after('<tr><td></td><td><div id="addS1P6" class="add-event"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		$('#addS1P6 .ms-hide').on('click', function() {
			$('.s1p6').addClass('show-event');
			$('#addS1P6').removeClass('show');
		});
		
		$('.labeltext:contains("1 Point 6")').parent().addClass('s1 s1p6');
		
		$('.labeltext:contains("2 Point 1")').parent().addClass('s2 s2p1');
		$('.s2p1').after('<tr><td></td><td><div id="addS2P2" class="add-event show"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		$('#addS2P2 .ms-hide').on('click', function() {
			$('.s2p2').addClass('show-event');
			$('#addS2P2').removeClass('show');
			$('#addS2P3').addClass('show');
		});
		
		$('.labeltext:contains("2 Point 2")').parent().addClass('s2 s2p2');
		$('.s2p2').after('<tr><td></td><td><div id="addS2P3" class="add-event"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		$('#addS2P3 .ms-hide').on('click', function() {
			$('.s2p3').addClass('show-event');
			$('#addS2P3').removeClass('show');
			$('#addS2P4').addClass('show');
		});
		
		$('.labeltext:contains("2 Point 3")').parent().addClass('s2 s2p3');
		$('.s2p3').after('<tr><td></td><td><div id="addS2P4" class="add-event"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		$('#addS2P4 .ms-hide').on('click', function() {
			$('.s2p4').addClass('show-event');
			$('#addS2P4').removeClass('show');
			$('#addS2P5').addClass('show');
		});
		
		$('.labeltext:contains("2 Point 4")').parent().addClass('s2 s2p4');
		$('.s2p4').after('<tr><td></td><td><div id="addS2P5" class="add-event"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		$('#addS2P5 .ms-hide').on('click', function() {
			$('.s2p5').addClass('show-event');
			$('#addS2P5').removeClass('show');
			$('#addS2P6').addClass('show');
		});
		
		$('.labeltext:contains("2 Point 5")').parent().addClass('s2 s2p5');
		$('.s2p5').after('<tr><td></td><td><div id="addS2P6" class="add-event"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		$('#addS2P6 .ms-hide').on('click', function() {
			$('.s2p6').addClass('show-event');
			$('#addS2P6').removeClass('show');
		});
		
		$('.labeltext:contains("2 Point 6")').parent().addClass('s2 s2p6');	
		
		$('.labeltext:contains("3 Point 1")').parent().addClass('s3 s3p1');
		$('.s3p1').after('<tr><td></td><td><div id="addS3P2" class="add-event show"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		$('#addS3P2 .ms-hide').on('click', function() {
			$('.s3p2').addClass('show-event');
			$('#addS3P2').removeClass('show');
			$('#addS3P3').addClass('show');
		});
		
		$('.labeltext:contains("3 Point 2")').parent().addClass('s3 s3p2');
		$('.s3p2').after('<tr><td></td><td><div id="addS3P3" class="add-event"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		$('#addS3P3 .ms-hide').on('click', function() {
			$('.s3p3').addClass('show-event');
			$('#addS3P3').removeClass('show');
			$('#addS3P4').addClass('show');
		});
		
		$('.labeltext:contains("3 Point 3")').parent().addClass('s3 s3p3');
		$('.s3p3').after('<tr><td></td><td><div id="addS3P4" class="add-event"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		$('#addS3P4 .ms-hide').on('click', function() {
			$('.s3p4').addClass('show-event');
			$('#addS3P4').removeClass('show');
			$('#addS3P5').addClass('show');
		});
		
		$('.labeltext:contains("3 Point 4")').parent().addClass('s3 s3p4');
		$('.s3p4').after('<tr><td></td><td><div id="addS3P5" class="add-event"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		$('#addS3P5 .ms-hide').on('click', function() {
			$('.s3p5').addClass('show-event');
			$('#addS3P5').removeClass('show');
			$('#addS3P6').addClass('show');
		});
		
		$('.labeltext:contains("3 Point 5")').parent().addClass('s3 s3p5');
		$('.s3p5').after('<tr><td></td><td><div id="addS3P6" class="add-event"><span class="event-text">ADD Point</span> <span class="glyphicon glyphicon-plus ms-hide"></span></div></td></tr>');
		
		$('#addS3P6 .ms-hide').on('click', function() {
			$('.s3p6').addClass('show-event');
			$('#addS3P6').removeClass('show');
		});
		
		$('.labeltext:contains("3 Point 6")').parent().addClass('s3 s3p6');
	}

	$('#Password').on('blur', function() {
		$(this).closest('table').find('input.btn').focus();
	});

	if(window.location.href.indexOf("Cart.asp") > -1 || window.location.href.indexOf("cart.asp") > -1) {
		$('input[name="DeliveryAddress"]').parent().attr('colspan', '1').addClass('text-right');
	}
});
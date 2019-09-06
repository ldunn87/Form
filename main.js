
	var $body = $('body');

	// Resets the form back to the default state.
	
	$( document ).ready(function() {
		init();
		
		$('.start').click(function() {
			$('.landing-screen').hide();
			$('.col1').show();
			$('.col2').show();
		});
		
	});

	function formReset() {
		
		$('.step[data-step="1"]').removeClass('step--complete').addClass('step--incomplete');
		$('.step[data-step="1"]').nextAll().removeClass('step--complete').addClass('step--incomplete');
		$('.step[data-step="1"]').nextAll().removeClass('step--active').addClass('step--inactive');
		$('form input').not('button').val('').removeClass('hasInput');
		$('.step').not('.one').removeClass('active');
		$('.col1').hide();
		$('.col2').hide();
		$('.total-money').hide();
		$('.money-area').hide();
		$('.amount-container').hide();
		$('.other').hide();
		$('.form-step[data-step="1"]').show();
		$('.form-step[data-step="1.1"]').hide();
		$('.form-step[data-step="2"]').hide();
		$('.form-step[data-step="3"]').hide();
		$('.form-step[data-step="3.1"]').hide();
		$('.form-step[data-step="3.2"]').hide();
		$('.form-step[data-step="3.3"]').hide();				
		$('.form-step[data-step="4"]').hide();
		$('.form-step[data-step="5"]').hide();
		$(".total-detail").text('');
		$(".total-money").text('');
		$('#both').val('');
		$("#otherGift").val('');
		$("#myInput").val('');
		$('#new-contact').trigger("reset");
		$( ".gift-summary" ).remove();
		name = "";
		fullname = "";
		address = "";
		party = "";
		otherFirst = "";
		otherSecond = "";
		total = 0;
		totalTwo = 0;
		both = false;
		count = 1;
		repeat = false;
		data.length = 0;
		$('.landing-screen').show();
		console.warn('Form reset.');
	}

	// Sets up and handles the float labels on the inputs.
	function setupFloatLabels() {
		// Check the inputs to see if we should keep the label floating or not
		$('form input').not('button').on('blur', function() {

			// Different validation for different inputs
			switch (this.tagName) {
				case 'SELECT':
					if (this.value > 0) {
						this.className = 'hasInput';
					} else {
						this.className = '';
					}
					break;

				case 'INPUT':
					if (this.value !== '') {
						this.className = 'hasInput';
					} else {
						this.className = '';
					}
					break;

				default:
					break;
			}
		});

		return false;
	}



	/* Starts */
	function init() {
		formReset();
		setupFloatLabels();
	}

	/*An array containing all the country names in the world:*/
	var invitations = ["sack01", "sack02", "sack03", "sack04", "sack05"];
	var gifts = ["gold", "necklace", "ear ring", "ring", "set"];
	var name = "";
	var fullname = "";
	var address = "";
	var party = "";
	var bride = "Arati";
	var groom = "Himesh";
	var otherFirst = "";
	var otherSecond = "";
	var total = 0;
	var totalTwo = 0;
	var both = false;
	var count = 1;
	var repeat = false;
	var data = [];

	/*initiate the autocomplete function on the "myInput" element, and pass along the array as possible autocomplete values:*/
	
	$(function() {
		$("#myInput").autocomplete({
			source: invitations,
			select: function(event, ui) {
				name = ui.item.value;
				
				setPartyName(name);
				event.preventDefault();
				
				if(ui.item.value == ""){
					moveToNewContact();
				}else{
					moveToSelectParty();
				}
			},
			response: function(event, ui){
				if(!ui.content.length){
					var noresult = {value: "", label:"No Results Found - Click Here"};
					ui.content.push(noresult);
				}
			}
		});

		$("#otherGift").autocomplete({
			source: gifts,
			select: function( event, ui){
				otherFirst = toTitleCase(ui.item.value);
				if(both){
					$(".detail-one").text(', ' + otherFirst);
					$('.detail-one').css('margin','0');
				}else{
					$(".detail-one").text(otherFirst);
				}
			}

		});
		
		$("#otherGift-two").autocomplete({
			source: gifts,
			select: function( event, ui){
				otherSecond = toTitleCase(ui.item.value);
				if(both){
					$(".detail-two").text(', ' + otherSecond);
					$('.detail-two').css('margin','0');
				}else{
					$(".detail-two").text(otherSecond);
				}
			}

		});
	});
	
	function moveToNewContact(){
		$('.form-step[data-step="1"]').hide();
		$('.form-step[data-step="1.1"]').show();
	}
	
	function moveToSelectParty(){
		$('.form-step[data-step="1"]').hide();
		$('.form-step[data-step="1.1"]').hide();
		$('.form-step[data-step="2"]').show();
		
		var currentStep = $('.step[data-step="1"]');
		
		currentStep.removeClass('step--incomplete').addClass('step--complete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		currentStep.next().removeClass('step--inactive').addClass('step--active');
	}
	
	function moveToSelectGift(){
		$('.form-step[data-step="2"]').hide();
		$('.form-step[data-step="3"]').show();
		
		var currentStep = $('.step[data-step="2"]');
		
		currentStep.removeClass('step--incomplete').addClass('step--complete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		currentStep.next().removeClass('step--inactive').addClass('step--active');
	}
	
	function moveToGiftEntry(){
		$('.form-step[data-step="3"]').hide();
		$('.form-step[data-step="3.1"]').show();
		$('.amount-container').hide();
		
		var currentStep = $('.step[data-step="3"]');
		
		currentStep.removeClass('step--incomplete').addClass('step--complete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		currentStep.next().removeClass('step--inactive').addClass('step--active');
	}
	
	//TODOO LOOP
	
	function moveToSelectGiftTwo(){
		$('.form-step[data-step="3.1"]').hide();
		$('.form-step[data-step="3.2"]').show();
		
		var currentStep = $('.step[data-step="3"]');
		
		currentStep.removeClass('step--incomplete').addClass('step--complete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		currentStep.next().removeClass('step--inactive').addClass('step--active');
	}
	
	function moveToGiftEntryTwo(){
		$('.form-step[data-step="3.2"]').hide();
		$('.form-step[data-step="3.3"]').show();
		$('.amount-container').hide();
		
		var currentStep = $('.step[data-step="3"]');
		
		currentStep.removeClass('step--incomplete').addClass('step--complete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		currentStep.next().removeClass('step--inactive').addClass('step--active');
	}
	
	function moveToSummary(){
		buildSummary();
		
		if( $('#both').val() == 'Both' ){
			$('.form-step[data-step="3.3"]').hide();
		}else{
			$('.form-step[data-step="3.1"]').hide();
		}
		
		$('.form-step[data-step="4"]').show();
		
		var currentStep = $('.step[data-step="4"]');
		
		currentStep.removeClass('step--incomplete').addClass('step--complete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		currentStep.next().removeClass('step--inactive').addClass('step--active');
	}
	
	function thankYouScreen(){
		$('.form-step[data-step="4"]').hide();
		$('.form-step[data-step="5"]').show();
		
		var currentStep = $('.step[data-step="5"]');
		
		currentStep.removeClass('step--incomplete').addClass('step--complete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		currentStep.next().removeClass('step--inactive').addClass('step--active');
		
		setTimeout(function() { 
			formReset();
		}, 2000);
	}
	
	function bothPartyGifts(){
		
		party = groom;
		setGiftName(party);
		setGiftDetails();
		both = false;
		$('.form-step[data-step="3.1"]').hide();
		moveToSelectGiftTwo();
		
	}
	
	function multipleGiftsValidate(){
		
		if($('#both').val() == 'Both'){
			if( $('.confirm-two').text() == 'Next' ){
				$('.confirm-two').text('Continue');
				$('.ma-two').hide();
				$('.ot-two').show();	
			}else{
				saveData(party, totalTwo, otherSecond);
				moveToSummary();
			}
		
		}else{
			if( $('.confirm-one').text() == 'Next' ){
				$('.confirm-one').text('Continue');
				$('.ma-one').hide();
				$('.ot-one').show();	
			}else{
				saveData(party, total, otherFirst);
				moveToSummary();
			}
		}
	}
	
	//TODO SaveData
	function saveData($party, $total, $other){
		
		var currentData = {};
		currentData['name'] = fullname;
		currentData['address'] = address;
		currentData['party'] = $party
		currentData['money'] = $total
		currentData['other'] = $other || "";
		
		data.push(currentData);
	}
	
	function buildSummary(){
		
		$('.sm-name').text(name);
		$('.sm-address').text(address);
		
		for(var i=0, l = data.length; i < l; i++){
			var extractedData = data[i];
			$('.name-summary').after('<div class="gift-summary"><h4>Gift details for ' + extractedData['party'] + '</h4><div class="gift-container"><div class="column-name"><h5>Money</h5><p class="summary-detail sm-money">' + extractedData['money']  +'</p></div><div class="column-name"><h5>Other Gift</h5><p class="summary-detail sm-other">'+ extractedData['other'] + '</p></div></div></div>');
		}
	}
	
	function controlLoop(){
		var bothParties = $('#both').val();
			
		if(bothParties == 'Both'){
			saveData(party, total, otherFirst);
			bothPartyGifts();
		}else{
			multipleGiftsValidate();
		}
	}
	
	
	$(function() {
		
		$('.bride').click(function() {
			party = bride;
			setGiftName(party)
			event.preventDefault();
			moveToSelectGift();
		});
		
		$('.groom').click(function() {
			party = groom;
			setGiftName(party)
			event.preventDefault();
			moveToSelectGift();
		});
		
		$('.both').click(function() {
			party = bride;
			setGiftName(party)
			$('#both').val('Both');
			event.preventDefault();
			moveToSelectGift();
		});
		
	});

	$(function() {
		$('.mn-one').click(function() {
			setGiftDetails()
			event.preventDefault();
			$('.ma-one').show();
			moveToGiftEntry();

		});
		
		$('.jw-one').click(function() {
			setGiftDetails()
			event.preventDefault();
			$('.ot-one').show();
			moveToGiftEntry();
		});
		
		$('.mnjw-one').click(function() {
			setGiftDetails()
			both = true;
			event.preventDefault();
			multipleGifts();
			moveToGiftEntry();
		});
		
		$('.mn-two').click(function() {
			setGiftDetails()
			event.preventDefault();
			$('.ma-two').show();
			moveToGiftEntryTwo();

		});
		
		$('.jw-two').click(function() {
			setGiftDetails()
			event.preventDefault();
			$('.ot-two').show();
			moveToGiftEntryTwo();
		});
		
		$('.mnjw-two').click(function() {
			setGiftDetails()
			both = true;
			event.preventDefault();
			multipleGifts();
			moveToGiftEntryTwo();
		});
		
		$('.confirm-one').click(function(){
			controlLoop();
		});
		
		$('.confirm-two').click(function(){
			multipleGiftsValidate();
		});
		
		
		$('.complete-button').click(function(){
			$('.collapse-active').toggleClass('collapse');
			thankYouScreen();
		});
		
		$('.next-button').click(function(){
			
			var _fname = toTitleCase($('#first-name').val());
			var _lname = toTitleCase($('#last-name').val());
			var _suburb = toTitleCase($('#suburb').val());
			var _city = toTitleCase($('#city').val());
			
			name = _fname;
			fullname = _fname + " " + _lname;
			address = _suburb + "," + _city;
			setPartyName(name);
			moveToSelectParty();
		});
		
		$('.dolr-one').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			total += 1;
			$(".money-one").text(total);
			$('.total-one').show();
		});
		
		$('.dolr-two').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			totalTwo += 1;
			$(".money-two").text(totalTwo);
			$('.total-two').show();
		});
		
	});

	//function to set Message on Gift Select screen
	function setGiftName($party) {

		var message = 'Hi ' + name + ', what type of gift are you giving ' + $party + ' today?';
		$('.form-message-three, .form-message-three-two').text(message);
	}

	//function to set Message on Gift Entry screen
	function setGiftDetails() {

		var message = 'Please fill in your gift details for ' + party;
		$('.form-message-three-one, .form-message-three-three').text(message);
	}
			
	function setPartyName($name) {

		var message = 'Hi ' + $name + ', who are you giving a gift to today?';
		$('.form-message-two').text(message);
	}
	
	function multipleGifts(){   
			$('.money-area').show();
			$('.other').hide();
			$('.confirm-button').text('Next');
	}
	

	//Fuction to handle click event and add money to total
	$(function() {

		var num = 0;
		total = 0;

		$('.fv-one').click(function() {
			total += num + 5;
			$(".money-one").text(total);
			$('.money-one').show();
		});

		$('.tn-one').click(function() {
			total += num + 10;
			$(".money-one").text(total);
			$('.money-one').show();
		});

		$('.ff-one').click(function() {
			total += num + 50;
			$(".money-one").text(total);
			$('.money-one').show();
		});

		$('.tw-one').click(function() {
			total += num + 20;
			$(".money-one").text(total);
			$('.money-one').show();
		});

		$('.hn-one').click(function() {
			total += num + 100;
			$(".money-one").text(total);
			$('.money-one').show();
		});
		
	});
	
	$(function() {

		var num = 0;
		totalTwo = 0;

		$('.fv-two').click(function() {
			totalTwo += num + 5;
			$(".money-two").text(totalTwo);
			$('.money-two').show();
		});

		$('.tn-two').click(function() {
			totalTwo += num + 10;
			$(".money-two").text(totalTwo);
			$('.money-two').show();
		});

		$('.ff-two').click(function() {
			totalTwo += num + 50;
			$(".money-two").text(totalTwo);
			$('.money-two').show();
		});

		$('.tw-two').click(function() {
			totalTwo += num + 20;
			$(".money-two").text(totalTwo);
			$('.money-two').show();
		});

		$('.hn-two').click(function() {
			totalTwo += num + 100;
			$(".money-two").text(totalTwo);
			$('.money-two').show();
		});
		
	});
	
	function toTitleCase(str) {
        var lcStr = str.toLowerCase();
        return lcStr.replace(/(?:^|\s)\w/g, function(match) {
            return match.toUpperCase();
        });
    }
	

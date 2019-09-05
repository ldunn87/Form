
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
		$('.other').hide();
		$('.form-step[data-step="1"]').show();
		$('.form-step[data-step="1.1"]').hide();
		$('.form-step[data-step="2"]').hide();
		$('.form-step[data-step="3"]').hide();
		$('.form-step[data-step="3.1"]').hide();
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
		address = "";
		party = "";
		other = "";
		total = 0;
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
	var address = "";
	var party = "";
	var other = "";
	var total = 0;
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
					var noresult = {value: "", label:"No Results Found - Please Wait..."};
					ui.content.push(noresult);
					setTimeout(function() {
						moveToNewContact();
					}, 2000);

				}
			}
		});

		$("#otherGift").autocomplete({
			source: gifts,
			select: function( event, ui){
				other = ui.item.value;
				if(both){
					$(".total-detail").text(', ' + ui.item.value);
					$('.total-detail').css('margin','0');
				}else{
					$(".total-detail").text(ui.item.value);
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

		var currentStep = $('.step[data-step="3"]');

		currentStep.removeClass('step--incomplete').addClass('step--complete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		currentStep.next().removeClass('step--inactive').addClass('step--active');
	}

	function moveToSummary(){
		buildSummary();
		$('.form-step[data-step="3.1"]').hide();
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

		party = "Himesh";
		setGiftName(party);
		setGiftDetails();
		total = 0;
		other = "";
		both = false;
		$('.form-step[data-step="3.1"]').hide();
		$(".total-detail").text('');
		$(".total-money").text('');
		$(".total-money").hide();
		$('.money-area').hide();
		$('.other').hide();
		$('#both').val('');
		$("#otherGift").val('');
		moveToSelectGift();
	}

	function multipleGiftsValidate($repeat){

		if(repeat){
			if( $('.confirm-button').text() == 'Next' ){
				$('.confirm-button').text('Continue');
				$('.money-area').hide();
				$('.other').show();
				done = true;
				return;
			}else{
				saveData();
				bothPartyGifts();
			}
		}else{
			if( $('.confirm-button').text() == 'Next' ){
				$('.confirm-button').text('Continue');
				$('.money-area').hide();
				$('.other').show();
			}else{
				saveData();
				moveToSummary();
			}
		}
	}

	function saveData(){

		var currentData = {};
		currentData['name'] = name;
		currentData['address'] = address;
		currentData['party'] = party
		currentData['money'] = total
		currentData['other'] = other || "";

		data.push(currentData);

	}

	function buildSummary(){

		$('.sm-name').text(name);
		$('.sm-address').text(address);

		for(var i=0, l = data.length; i < l; i++){


			var extractedData = data[i];
			console.log(data[i]);
			console.log(extractedData['name']);

			$('.name-summary').after('<div class="gift-summary"><h4>Gift details for ' + extractedData['party'] + '</h4><div class="gift-container"><div class="column-name"><h5>Money</h5><p class="summary-detail sm-money">' + extractedData['money']  +'</p></div><div class="column-name"><h5>Other Gift</h5><p class="summary-detail sm-other">'+ extractedData['other'] + '</p></div></div></div>');
		}
	}

	function controlLoop(){
		var bothParties = $('#both').val();

		if(bothParties == 'Both' && count > 1 ){
			bothPartyGifts();
			multipleGiftsValidate();
		}else if (bothParties == 'Both' && count == 1 ){
			repeat = true;
			multipleGiftsValidate(repeat);
			count++;
		}else{
			repeat = false;
			multipleGiftsValidate(repeat);
		}
	}


	$(function() {

		$('.bride').click(function() {
			party = "Arati";
			setGiftName(party)
			event.preventDefault();
			moveToSelectGift();
		});

		$('.groom').click(function() {
			party = "Himesh";
			setGiftName(party)
			event.preventDefault();
			moveToSelectGift();
		});

		$('.both').click(function() {
			party = "Arati";
			setGiftName(party)
			$('#both').val('Both');
			event.preventDefault();
			moveToSelectGift();
		});

	});

	$(function() {
		$('.money').click(function() {
			setGiftDetails()
			event.preventDefault();
			$('.money-area').show();
			moveToGiftEntry();

		});

		$('.jewl').click(function() {
			setGiftDetails()
			event.preventDefault();
			$('.other').show();
			moveToGiftEntry();
		});

		$('.monjewl').click(function() {
			setGiftDetails()
			both = true;
			event.preventDefault();
			multipleGifts();
			moveToGiftEntry();
		});

		$('.confirm-button').click(function(){
			controlLoop();
		});

		$('.complete-button').click(function(){
			thankYouScreen();
		});

		$('.next-button').click(function(){


			var _fname = toTitleCase($('#first-name').val());
			var _lname = toTitleCase($('#last-name').val());
			var _suburb = toTitleCase($('#suburb').val());
			var _city = toTitleCase($('#city').val());

			name = _fname + " " + _lname;
			address = _suburb + "," + _city;
			setPartyName(name);
			moveToSelectParty();
		});

		$('.dollar-button').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			total += 1;
			$(".total-money").text(total);
			$('.total-money').show();
		});
		
		$('#confirmButton').click(function() {
		  $('.collapse').toggleClass('collapse-active');
		});

	});

	//function to set Message on Gift Select screen
	function setGiftName($party) {

		var message = 'Hi ' + name + ', what type of gift are you giving ' + $party + ' today?';
		$('.form-message-three').text(message);
	}

	//function to set Message on Gift Entry screen
	function setGiftDetails() {

		var message = 'Please fill your gift details for ' + party;
		$('.form-message-three-one').text(message);
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

	function ucwords(str,force){
		str=force ? str.toLowerCase() : str;
		return str.replace(/(\b)([a-zA-Z])/g,
           function(firstLetter){
              return   firstLetter.toUpperCase();
           });
	}



	//Fuction to handle click event and add money to total
	$(function() {

		var num = 0;
		total = 0;

		$('.one').click(function() {
			total += num + 1;
			$(".total-money").text(total);
			$('.total-money').show();
		});

		$('.five').click(function() {
			total += num + 5;
			$(".total-money").text(total);
			$('.total-money').show();
		});

		$('.ten').click(function() {
			total += num + 10;
			$(".total-money").text(total);
			$('.total-money').show();
		});

		$('.fifty').click(function() {
			total += num + 50;
			$(".total-money").text(total);
			$('.total-money').show();
		});

		$('.twenty').click(function() {
			total += num + 20;
			$(".total-money").text(total);
			$('.total-money').show();
		});

		$('.hundred').click(function() {
			total += num + 100;
			$(".total-money").text(total);
			$('.total-money').show();
		});

	});

	function toTitleCase(str) {
        var lcStr = str.toLowerCase();
        return lcStr.replace(/(?:^|\s)\w/g, function(match) {
            return match.toUpperCase();
        });
    }



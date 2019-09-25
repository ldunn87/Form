	// Resets the form back to the default state.

	$( document ).ready(function() {
		init();
		$("body").show().fadeIn(5000);
		$('.start').click(function() {
			$('.slit-out1').toggleClass('slit-out');
			setTimeout(function(){
			$('.landing-screen').hide();
			$('.col1').show();
			$('.form-step[data-step="1"]').show();
			$('.col2').show();
			$("#myInput").focus();
		},900);
//			$('.landing-screen').hide();
//			$('.col1').show();
//			$('.form-step[data-step="1"]').show();
//			$('.col2').show();
//			$("#myInput").focus();
		});

		db = firebase.firestore();
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
		$('.form-step[data-step="1"]').hide();
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
		$(".total-money").hide();
		$('#both').val('');
		$("#otherGift").val('');
		$("#otherGift-two").val('');
		$("#myInput").val('');
		$('#new-contact').trigger("reset");
		$( ".gift-summary" ).remove();
		$('.money-one').attr('data-count', 0);
		$('.money-two').attr('data-count', 0);
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

	// Starts
	function init() {
		formReset();
		setupFloatLabels();
	}

	//An array containing guests
	var invitations = [
	{
		value: "Bachubhai Patel",
		label: "Bachubhai Patel",
		suburb: "New Windsor",
		city: "Auckland"
	},
	{
		value: "Nilesh & Meera Bhula",
		label: "Nilesh & Meera Bhula",
		suburb: "Mount Eden",
		city: "Auckland"
	},
	{
		value: "Anand & Sarika Dhanji",
		label: "Anand & Sarika Dhanji",
		suburb: "Mount Albert",
		city: "Auckland"
	},
	{
		value: "John & Raakhee Pinto",
		label: "John & Raakhee Pinto",
		suburb: "West Harbour",
		city: "Auckland"
	}
	];

	//sets variables
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
	var db;
	var time = 0;
	var timeTwo = 0;
	//initiates the autocomplete function and pass along the array as possible autocomplete values

	$(function() {
		$("#myInput").autocomplete({
			source: invitations,
			select: function(event, ui) {
				fullname = ui.item.value;
				address = ui.item.suburb + ", " + ui.item.city;
				name = ui.item.value.split(' ')[0];
				setPartyName(name);
				event.preventDefault();

				if(ui.item.value == ""){
					$(this).blur();
					moveToNewContact();
				}else{
					$(this).blur();
					moveToSelectParty();
				}
			},
			response: function(event, ui){
				if(!ui.content.length){
					var noresult = {value: "", label:"Name Not Found", suburb:"Sorry we cant find you name in the list", city: "Click here to proceed" };
					ui.content.push(noresult);
				}
			}
		}).autocomplete('instance')._renderItem = function(ul, item) {
			return $('<li>')
					.append('<div><h4 class="search-name">' + item.label + '</h4>' + item.suburb + ", " + item.city + '</div>')
					.appendTo(ul);
		};

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
			},
			response: function(event, ui){
					if(ui.content.length == 0){
						ui.content.push({
							label: "Other Item: " + $(this).val(),
							value: $(this).val()
						});
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
			},
			response: function(event, ui){
					if(ui.content.length == 0){
						ui.content.push({
							label: "Other Item: " + $(this).val(),
							value: $(this).val()
						});
					}
			}
		});
	});
//functions to show/hide sceens
	function moveToNewContact(){
		$('.form-step[data-step="1"]').hide();
		$('.form-step[data-step="1.1"]').show();
		$('#first-name').focus();
	}
/////
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
			$( "body" ).fadeOut( "fast" );
			setTimeout(function() {
				location.reload(false);
			}, 500);
		}, 3000);

	}

	function bothPartyGifts(){

		party = groom;
		setGiftName(party);
		setGiftDetails();
		both = false;
		repeat = false;
		$('.confirm-two').text('Continue');
		$('.form-step[data-step="3.1"]').hide();
		setTimeout(
			function(){
				moveToSelectGiftTwo();
			},800);

	}

	function multipleGiftsValidate(){

		if($('#both').val() == 'Both' && repeat == false){
			if( $('.confirm-two').text() == 'Next' ){
				$('.confirm-two').text('Continue');
				$('.ma-two').hide();
				$('.ot-two').show();
				$('otherGift-two').focus();
			}else{
				if($('.ot-two').is(":visible") && otherFirst == ''){
					$('otherGift-two').focus();
				}else if ($('.ma-two').is(":visible") && totalTwo <= 0){
					consol.log('no money');
				}else{
					saveData(party, totalTwo, otherSecond);
					setTimeout(moveToSummary(),1300);
				}

			}
		}else if($('#both').val() == 'Both' && repeat == true){
			if( $('.confirm-one').text() == 'Next' ){
				$('.confirm-one').text('Continue');
				$('.ma-one').hide();
				$('.ot-one').show();
				$("#otherGift").focus();
			}else{
				if($('.ot-one').is(":visible") && otherFirst == ''){
					$('otherGift').focus();
				}else if ($('.ma-one').is(":visible") && total <= 0){
					consol.log('no money');
				}else{
					saveData(party, total, otherFirst);
					bothPartyGifts();
				}
			}
		}else{
			if( $('.confirm-one').text() == 'Next' ){
				$('.confirm-one').text('Continue');
				$('.ma-one').hide();
				$('.ot-one').show();
				$("#otherGift").focus();
			}else{
				if( $('.ot-one').is(":visible") && otherFirst == ''){
					$('otherGift').focus();
				}else if ($('.ma-one').is(":visible") && total <= 0){
					consol.log('no money');
				}else{
					saveData(party, total, otherFirst);
					setTimeout(moveToSummary(),1300);
				}
			}
		}
	}

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

		$('.sm-name').text(fullname);
		$('.sm-address').text(address);

		for(var i=0, l = data.length -1; l >= i; l--){
			var extractedData = data[l];
			$('.name-summary').after('<div class="gift-summary"><h4 class="summary-heading text-focus-in">Gift details for ' + extractedData['party'] + '</h4><div class="gift-container slide-in-field-delay2"><div class="column-name" style=' + (extractedData['money'] < 1 ? "display:none;" : "display:block;") + '"><h5>Money</h5><p class="summary-detail sm-money slide-in-field-delay3">' + extractedData['money']  +'</p></div><div class="column-name" style=' + (extractedData['other'].length < 1 ? "display:none;" : "display:block;") + '"><h5>Other Gift</h5><p class="summary-detail sm-other">'+ extractedData['other'] + '</p></div></div></div>');
		}
	}

	function controlLoop(){
		var bothParties = $('#both').val();

		if(bothParties == 'Both'){
			repeat = true;
			multipleGiftsValidate()
		}else{
			multipleGiftsValidate();
		}
	}

	function saveToFirebase(){
		for(var i=0, l = data.length -1; l >= i; l--){
			var extractedData = data[l];
			firebase.firestore().collection("gifts").add({
				name: extractedData['name'],
				address: extractedData['address'],
				party: extractedData['party'],
				money: extractedData['money'],
				other: extractedData['other']
			})
			.then(function(docRef) {
				console.log("Document written with ID: ", docRef.id);
			})
			.catch(function(error) {
				console.error("Error adding document: ", error);
			});
		}
	}

//cards for selecting gifts for bride/groom
	$(function() {
		$('.bride').click(function() {
			$(this).toggleClass('cardst-highlight');
			party = bride;
			setGiftName(party)
			event.preventDefault();
			setTimeout(function(){
				moveToSelectGift();
			},1200);
		});

		$('.groom').click(function() {
			$(this).toggleClass('cardst-highlight');
			party = groom;
			setGiftName(party)
			event.preventDefault();
			setTimeout(function(){
				moveToSelectGift();
			},1200);
		});

		$('.both').click(function() {
			$(this).toggleClass('cardst-highlight');
			party = bride;
			setGiftName(party)
			$('#both').val('Both');
			event.preventDefault();
			setTimeout(function(){
				moveToSelectGift();
			},1200);
		});

	});

//money cards
	$(function() {
		$('.mn-one').click(function() {
		$(this).toggleClass('cardst-highlight');
			setGiftDetails()
			event.preventDefault();
			$(".money-one").text(total);
			$('.ma-one').show();
			setTimeout(function(){
				moveToGiftEntry();
			},1200);

		});
//gift cards
		$('.jw-one').click(function() {
			$(this).toggleClass('cardst-highlight');
			setGiftDetails()
			event.preventDefault();
			$('.ot-one').show();
			setTimeout(function(){
				moveToGiftEntry();
			},1200);
		});
//gift & money cards
		$('.mnjw-one').click(function() {
			$(this).toggleClass('cardst-highlight');
			setGiftDetails()
			both = true;
			event.preventDefault();
			multipleGifts();
			setTimeout(function(){
				moveToGiftEntry();
			},1200);
		});
//money cards
		$('.mn-two').click(function() {
			$(this).toggleClass('cardst-highlight');
			setGiftDetails()
			event.preventDefault();
			$('.ma-two').show();
			setTimeout(function(){
				moveToGiftEntryTwo();
			},1200);
		});
//gift cards
		$('.jw-two').click(function() {
			$(this).toggleClass('cardst-highlight');
			setGiftDetails()
			event.preventDefault();
			$('.ot-two').show();
			setTimeout(function(){
				moveToGiftEntryTwo();
			},1200);
		});
//gift & money cards
		$('.mnjw-two').click(function() {
			$(this).toggleClass('cardst-highlight');
			setGiftDetails()
			both = true;
			event.preventDefault();
			multipleGifts();
			setTimeout(function(){
				moveToGiftEntryTwo();
			},1200);
		});

		$('.confirm-one').click(function(e){
			e.preventDefault();
			e.stopPropagation();
			$('.money-card').unbind('click', arguments.callee);
			controlLoop();
		});

		$('.confirm-two').click(function(e){
			e.preventDefault();
			e.stopPropagation();
			multipleGiftsValidate();
		});

		$('.complete-button').click(function(){
			$('.collapse-active').toggleClass('collapse');
//			saveToFirebase();
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
			if( _fname.length < 1 && _lname.length < 1 && _suburb.length < 1 && _city.length < 1 ){
				console.log("all fields not filled in");
			}else{
				setPartyName(name);
				moveToSelectParty();
			}
		});

		$('.clear-one').click(function(){
			var buttonText = $('.confirm-one').text();

			if( $('.money-area').is(":visible") && buttonText == 'Continue' || $('.money-area').is(":visible") && buttonText == 'Next'){
				total = 0;
				$('.money-one').attr('data-count', 0);
				$('.money-one').text('0');
			}else{
				$('.detail-one').text('');
				$("#otherGift").val('');
				$("#otherGift").focus();
				otherFirst = "";
			}
		});

		$('.clear-two').click(function(){
			var buttonText = $('.confirm-two').text();

			if( $('.ma-two').is(":visible") && buttonText == 'Continue' || $('.ma-two').is(":visible") && buttonText == 'Next'){
				totalTwo = 0;
				$('.money-two').attr('data-count', 0);
				$('.money-two').text('0');
			}else{
				$('.detail-two').text('');
				$("#otherGift-two").val('');
				$("#otherGift-two").focus();
				otherSecond = "";
			}
		});
//add extra dollar
		$('.dolr-one').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			total += 1;
			$('.money-one').attr('data-count', total);
			$(".money-one").text(total);
			$('.money-one').show();
			$('.total-one').show();
			duration = 5*100;
			animateCounter(duration);
		});
//add extra dollar
		$('.dolr-two').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			totalTwo += 1;
			$('.money-two').attr('data-count', totalTwo);
			$(".money-two").text(totalTwo);
			$(".money-two").show();
			$('.total-two').show();
			duration = 5*100;
			animateCounterTwo(duration);
		});

	});

	$(function() {

		$("#first-name").on('keyup', function(e) {
			if (e.which === 13) {
				$('#last-name').focus();
			}
		});

		$("#last-name").on('keyup', function(e) {
			if (e.which === 13) {
				$('#suburb').focus();
			}
		});

		$("#suburb").on('keyup', function(e) {
			if (e.which === 13) {
				$('#city').focus();
			}
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
		var duration = 0;

		$('.fv-one').click(handler);

		function handler(e) {
			e.preventDefault();
			e.stopPropagation();
			$('.fv-one').unbind('click', arguments.callee);
			total += num + 5;
			$('.money-one').show();
			$('.money-one').attr('data-count', total);
			$('.money-highlight').toggleClass('money-highlighted');
			duration = 5*100;
			animateCounter(duration);

			setTimeout(function() {
				$('.fv-one').click(handler);
			},2000);
		}

		$('.tn-one').click(handler1);

		function handler1(e){
			e.preventDefault();
			e.stopPropagation();
			$('.tn-one').unbind('click', arguments.callee);
			total += num + 10;
			$('.money-one').show();
			$('.money-one').attr('data-count', total);
			$('.money-highlight').toggleClass('money-highlighted');
			duration = 5*100;
			animateCounter(duration);
			setTimeout(function() {
				$('.tn-one').click(handler1);
			},2000);
		}

		$('.ff-one').click(handler2);

		function handler2(e) {
			e.stopPropagation();
			$('.ff-one').unbind('click', arguments.callee);
			total += num + 50;
			$('.money-one').show();
			$('.money-one').attr('data-count', total);
			$('.money-highlight').toggleClass('money-highlighted');
			duration = 5*200;
			animateCounter(duration);
			setTimeout(function() {
				$('.ff-one').click(handler2);
			},2000);
		}

		$('.tw-one').click(handler3);

		function handler3(e) {
			e.stopPropagation();
			$('.tw-one').unbind('click', arguments.callee);
			total += num + 20;
			$('.money-one').show();
			$('.money-one').attr('data-count', total);
			$('.money-highlight').toggleClass('money-highlighted');
			duration = 5*200;
			animateCounter(duration);
			setTimeout(function() {
				$('.tw-one').click(handler3);
			},2000);
		}

		$('.hn-one').click(handler4);

		function handler4(e) {
			e.stopPropagation();
			$('.hn-one').unbind('click', arguments.callee);
			total += num + 100;
			$('.money-one').show();
			$('.money-one').attr('data-count', total);
			$('.money-highlight').toggleClass('money-highlighted');
			duration = 5*200;
			animateCounter(duration);
			setTimeout(function() {
				$('.hn-one').click(handler4);
			},2000);
		}

	});

	function animateCounter($duration){

		time = $duration;

		$('.money-one').each(function() {
			var $this = $(this),
			countTo = $this.attr('data-count');

			$({countNum: $this.text()}).animate({
				countNum: countTo
				},
				{
				duration: time,
				easing: 'swing',
				step: function() {
					$this.text(Math.floor(this.countNum));
				},
				complete: function() {
				$this.text(this.countNum);
				}
			});
		});
	}

	function animateCounterTwo($duration){

		timeTwo = $duration;

		$('.money-two').each(function() {
			var $this = $(this),
			countTo = $this.attr('data-count');

			$({countNum: $this.text()}).animate({
				countNum: countTo
				},
				{
				duration: timeTwo,
				easing: 'swing',
				step: function() {
					$this.text(Math.floor(this.countNum));
				},
				complete: function() {
					$this.text(this.countNum);
				}
			});
		});
	}


	//Fuction to handle click event and add money to total (2nd screen)
	$(function() {

		var num = 0;
		totalTwo = 0;
		var duration = 0;

		$('.fv-two').click(handler5);

		function handler5(e) {
			e.stopPropagation();
			$('.fv-two').unbind('click', arguments.callee);
			totalTwo += num + 5;
			$('.money-two').show();
			$('.money-two').attr('data-count', totalTwo);
			duration = 5*100;
			animateCounterTwo(duration);
			setTimeout(function() {
				$('.fv-two').click(handler5);
			},2000);
		}

		$('.tn-two').click(handler6);

		function handler6(e) {
			e.stopPropagation();
			$('.tn-two').unbind('click', arguments.callee);
			totalTwo += num + 10;
			$('.money-two').show();
			$('.money-two').attr('data-count', totalTwo);
			duration = 5*100;
			animateCounterTwo(duration);
			setTimeout(function() {
				$('.tn-two').click(handler6);
			},2000);
		}

		$('.ff-two').click(handler7);

		function handler7(e) {
			e.stopPropagation();
			$('.ff-two').unbind('click', arguments.callee);
			totalTwo += num + 50;
			$('.money-two').show();
			$('.money-two').attr('data-count', totalTwo);
			duration = 5*200;
			animateCounterTwo(duration);
			setTimeout(function() {
				$('.ff-two').click(handler7);
			},2000);
		}

		$('.tw-two').click(handler8);

		function handler8(e) {
			e.stopPropagation();
			$('.tw-two').unbind('click', arguments.callee);
			totalTwo += num + 20;
			$('.money-two').show();
			$('.money-two').attr('data-count', totalTwo);
			duration = 5*200;
			animateCounterTwo(duration);
			setTimeout(function() {
				$('.tw-two').click(handler8);
			},2000);
		}

		$('.hn-two').click(handler9);

		function handler9(e) {
			e.stopPropagation();
			$('.hn-two').unbind('click', arguments.callee);
			totalTwo += num + 100;
			$('.money-two').show();
			$('.money-two').attr('data-count', totalTwo);
			duration = 5*200;
			animateCounterTwo(duration);
			setTimeout(function() {
				$('.hn-two').click(handler9);
			},2000);
		}

	});

	function toTitleCase(str) {
        var lcStr = str.toLowerCase();
        return lcStr.replace(/(?:^|\s)\w/g, function(match) {
            return match.toUpperCase();
        });
    }

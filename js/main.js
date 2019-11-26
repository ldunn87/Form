	// Resets the form back to the default state.

	$( document ).ready(function() {
		init();
		$("body").show().fadeIn(5000);
		$('.start').click(function() {
					$('.page-open1').toggleClass('page-open');
					setTimeout(function(){
					$('.landing-screen').hide();
					$('.col1').show().fadeIn(4000);
					$('.form-step[data-step="1"]').show();
					$('.col2').show();
					$("#myInput").focus();
				},800);
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
		//$('.amount-container').hide();
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
	var gifts = ["gold", "necklace", "earrings", "ring", " jewlery set", ];
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
	var notInvited = false;
	var entryStep = "";
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
					notInvited = true;
					moveToNewContact();
				}else{
					$(this).blur();
					moveToSelectParty();
				}
			},
			response: function(event, ui){
				if(!ui.content.length){
					var noresult = {value: "", label:"Name Not Found", suburb:"Sorry we cant find your name in the list", city: "Click here to proceed" };
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
					$('.detail-one').css('margin','10px 0px');
					$(this).blur();
				}else{
					$(".detail-one").text(otherFirst);
					$(this).blur();
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
		}).autocomplete('instance')._renderItem = function(ul, item) {
			return $('<li>')
					.append('<div><h4 class="gift-name">' + item.label + '</h4></div>')
					.appendTo(ul);
		};

		$("#otherGift-two").autocomplete({
			source: gifts,
			select: function( event, ui){
				otherSecond = toTitleCase(ui.item.value);
				if(both){
					$(".detail-two").text(', ' + otherSecond);
					$('.detail-two').css('margin','10px 0px');
					$(this).blur();
				}else{
					$(".detail-two").text(otherSecond);
					$(this).blur();
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
		}).autocomplete('instance')._renderItem = function(ul, item) {
			return $('<li>')
					.append('<div><h4 class="gift-name">' + item.label + '</h4></div>')
					.appendTo(ul);
		};
	});
//functions to show/hide sceens
	function moveToNewContact(){
		$('.form-step[data-step="1"]').hide();
		$('.form-step[data-step="1.1"]').show();
		$('#first-name').focus();
	}

	function backToContact(){
		$('.form-step[data-step="2"]').hide();
		if(notInvited){
			$('.form-step[data-step="1.1"]').show();
		}else{
			$("#myInput").val('');
			$('.form-step[data-step="1"]').show();
			$("#myInput").focus();
		}

		var currentStep = $('.step[data-step="2"]');
		var previous = $('.step[data-step="1"]');

		currentStep.removeClass('step--incomplete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		previous.removeClass('step--complete').addClass('step--incomplete');

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

	function backToSelectParty(){
		repeat = false;
		both = false;
		$('#both').val('');
		$("#otherGift").val('');
		$("#otherGift-two").val('');
		$('.form-step[data-step="3"]').hide();
		$('.form-step[data-step="2"]').show();

		var currentStep = $('.step[data-step="3"]');
		var previous = $('.step[data-step="2"]');

		currentStep.removeClass('step--incomplete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		previous.removeClass('step--complete').addClass('step--incomplete');
	}

	function moveToSelectGift(){
		$('.form-step[data-step="2"]').hide();
		$('.form-step[data-step="3"]').show();

		var currentStep = $('.step[data-step="2"]');

		currentStep.removeClass('step--incomplete').addClass('step--complete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		currentStep.next().removeClass('step--inactive').addClass('step--active');
	}

	function backToSelectGift(){
		$('.form-step[data-step="3.1"]').hide();
		$('.form-step[data-step="3"]').show();
		$('.ma-one').hide();
		$('.ot-one').hide();
		$('.money-one').hide();
		$('.detail-one').text('');
		$('.money-one').text('');
		$('.confirm-one').text('Continue');
		$('#amount-one').val('');
		total = 0;
		otherFirst = "";
		both = false;
		data = [];
		var currentStep = $('.step[data-step="4"]');
		var previous = $('.step[data-step="3"]');

		currentStep.removeClass('step--incomplete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		previous.removeClass('step--complete').addClass('step--incomplete');
	}

	function moveToGiftEntry(){
		$('.form-step[data-step="3"]').hide();
		$('.form-step[data-step="3.1"]').show();
		//$('.amount-container').hide();

		var currentStep = $('.step[data-step="3"]');

		currentStep.removeClass('step--incomplete').addClass('step--complete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		currentStep.next().removeClass('step--inactive').addClass('step--active');
	}

	function moveToSelectGiftTwo(){
		$('.form-step[data-step="3.1"]').hide();
		$('.form-step[data-step="3.2"]').show();
		$('.ma-two').hide();
		var currentStep = $('.step[data-step="3"]');

		currentStep.removeClass('step--incomplete').addClass('step--complete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		currentStep.next().removeClass('step--inactive').addClass('step--active');
	}

	function backToSelectGiftTwo(){
		$('.form-step[data-step="3.3"]').hide();
		$('.form-step[data-step="3.2"]').show();
		$('.ma-two').hide();
		$('.ot-two').hide();
		$('.money-two').hide();
		$('.detail-two').text('');
		$('.money-two').text('');
		$('#amount-two').val('');
		$('.confirm-two').text('Continue');
	//	$('.amount-container').hide();
		totalTwo = 0;
		otherSecond = "";
		both = false;

		var currentStep = $('.step[data-step="4"]');
		var previous = $('.step[data-step="3"]');

		currentStep.removeClass('step--incomplete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		previous.removeClass('step--complete').addClass('step--incomplete');
	}

	function moveToGiftEntryTwo(){
		$('.form-step[data-step="3.2"]').hide();
		$('.form-step[data-step="3.3"]').show();
		//$('.amount-container').hide();

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

	function backToGiftEntry(){
		$('.form-step[data-step="4"]').hide();

		if( $('#both').val() == 'Both' ){
			data.pop();
			$('.form-step[data-step="3.3"]').show();
		}else{
			data = [];
			$('.form-step[data-step="3.1"]').show();
		}

		var currentStep = $('.step[data-step="3"]');
		var previous = $('.step[data-step="4"]');

		currentStep.removeClass('step--incomplete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		$('.step[data-step="5"]').removeClass('step--active').addClass('step--inactive');
		previous.removeClass('step--complete').addClass('step--incomplete');
	}

	function backToGiftEntryOne(){
		party = bride;
		setGiftName(party);
		setGiftDetails();
		$('.form-step[data-step="3.2"]').hide();
		$('.form-step[data-step="3.1"]').show();
	}

	function thankYouScreen(){
		$('.form-step[data-step="4"]').hide();
		$('.form-step[data-step="5"]').show();

		const player = document.querySelector('lottie-player');

		var currentStep = $('.step[data-step="5"]');

		currentStep.removeClass('step--incomplete').addClass('step--complete');
		currentStep.removeClass('step--active').addClass('step--inactive');
		currentStep.next().removeClass('step--inactive').addClass('step--active');


		setTimeout(function() {
		player.load('{"v":"5.5.9","fr":29.9700012207031,"ip":0,"op":120.0000048877,"w":1280,"h":720,"nm":"Handwriting","ddd":1,"assets":[],"fonts":{"list":[{"fName":"Radicalis","fFamily":"Radicalis","fStyle":"Regular","ascent":92.1544799804688}]},"layers":[{"ddd":1,"ind":1,"ty":5,"nm":"Thank you","td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"rx":{"a":0,"k":0,"ix":8},"ry":{"a":0,"k":0,"ix":9},"rz":{"a":0,"k":0,"ix":10},"or":{"a":0,"k":[0,0,0],"ix":7},"p":{"a":0,"k":[667,438,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"t":{"d":{"k":[{"s":{"sz":[1434,566],"ps":[-522,-188],"s":250,"f":"Radicalis","t":"Thank you","j":0,"tr":0,"lh":300,"ls":0,"fc":[0,0,0],"sc":[0,0,0],"sw":1,"of":true},"t":0}]},"p":{},"m":{"g":1,"a":{"a":0,"k":[0,0],"ix":2}},"a":[]},"ip":0,"op":120.0000048877,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 1","tt":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[713,397,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[1,-2],[28.159,-64.329],[2.361,-21.253],[-2,0],[-7.937,1.417],[0,0],[-129,68],[0,0],[0,0],[70,-8],[14.103,-3.504],[20.821,-8.328],[1.325,-6.663],[-33.734,-11.245],[0,1],[-14.866,-7.435],[-78.107,-18.471],[0.58,-0.017],[0,0],[31,-79],[-3.946,-23.673],[0,0],[-22.486,41.54],[-4.962,11.164],[0,-1],[0,0],[0,-12],[-3.53,-2.746],[0,0],[2,1],[0,0],[0,0],[0,0],[-1,0],[0,0],[0,-1],[0,0],[-8,-2],[-3,4],[1,0],[0,0],[0,0],[-6,6],[-3,5],[-63.677,73.592],[0.583,-0.583],[6.521,-16.18],[0,0],[-8,3],[-22,13],[2,-3],[0,-9],[-1,1],[-6,12],[-1.765,13.148],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[-15,-21],[1.001,1],[4,0],[27,-19],[-6,6],[-12,-12],[-8,-2],[0,-1],[2,0],[1,-16],[-7,6],[-22,12],[-1,-7],[30.999,-56],[7,-3],[-4,12],[-8,7],[-19.498,18.57],[-1,0],[-3,1],[-7.013,-11.83],[-4.119,-0.95],[-2,5],[0,0],[1,-2],[0,0],[3.514,-8.017],[-0.173,-2.691],[-4.21,-2.339],[-4,1],[-2,-1],[-4,-21],[-6,8],[-13.481,27.767],[-0.521,4.171],[2,-10],[-5,4],[-4,11],[1,3]],"o":[[-0.527,1.053],[-25.306,57.812],[-6,54],[2,0],[28,-5],[0,0],[129,-68],[0,0],[0,0],[-13.394,1.531],[-14.103,3.504],[-15,6],[-1.325,6.663],[42,14],[0,-0.504],[2.932,1.466],[51.582,12.198],[-1.459,0.043],[0,0],[-31,79],[1,6],[0,0],[7.954,-14.694],[4,-9],[0,1],[0,0],[0,12],[9,7],[0,0],[-2,-1],[0,0],[0,0],[0,0],[1,0],[0,0],[0,1],[0,0],[8,2],[3,-4],[-1,0],[0,0],[0,0],[6,-6],[1.252,-2.086],[12.357,-14.282],[-0.493,0.493],[-6.521,16.18],[0,0],[8,-3],[22,-13],[-2,3],[0,11.045],[1,-1],[1.784,-3.568],[1.765,-13.148],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[15,21],[-1,-1],[-4,0],[-27,19],[5,-5],[12,12],[8,2],[0,1],[-2,0],[-1,16],[7,-6],[22,-12],[1,7],[-30.043,54.272],[-7,3],[4,-12],[8,-7],[21,-20],[1,0],[2.05,-0.683],[3.252,5.486],[5.846,1.349],[2,-5],[0,0],[-1,2],[0,0],[-2.925,6.672],[0.325,5.066],[17.241,9.579],[4,-1],[2,1],[4,21],[2.872,-3.829],[15.786,-32.517],[1,-8],[-2.193,10.963],[5,-4],[4,-11],[-1,-3]],"v":[[-392,-232],[-434.786,-146.344],[-495,19],[-496,88],[-464,108],[-549,156],[-667,-246],[-246,-322],[-193,-271],[-294,-271],[-333.897,-264.504],[-469,-219],[-554,-169],[-532,-141],[-576,-73],[-594.15,-318.7],[-350.938,-307.264],[-307.541,-293.043],[-339,-215],[-381,-133],[-426,0],[-431,38],[-386.132,-58.072],[-360,-95],[-326,-147],[-330,-93],[-353,-40],[-352,-16],[-338,-28],[-333,-46],[-282,-144],[-218,-179],[-254,-64],[-251,-103],[-280,-87],[-301,-57],[-315,-30],[-313,4],[-280,-7],[-264,-33],[-211,-115],[-245,-16],[-229,-5],[-214,-25],[-175.323,-125.592],[-161,-101],[-195.479,-35.18],[-200,2],[-135,-97],[-105,-112],[-120,-74],[-140,-23],[-125,-8],[-109,-16],[-77.765,-188.852],[-67,-291],[27,-283],[12,-251],[-23,-183],[-46,-128],[-94,-15],[-93,65],[65,-91],[39,-146],[-27,-77],[-50,-55],[-58,-26],[-29,-10],[80,-59],[121,-80],[94,-23],[113,-11],[175,-70],[192,-76],[180.001,35],[118,141],[101,121],[128,55],[180,-15],[218,-45],[236.25,-49],[241.412,-14.55],[257,-5],[289,-40],[302,-76],[282.5,-96],[268,-88],[253.986,-68.983],[245.923,-56.559],[255,-42],[332,-58],[356,-95],[325,-16],[347,-4],[384.214,-54.483],[418,-122],[385,-24],[401,-4],[428,-29],[455,-66]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.158795922995,0.103922262788,0.777006745338,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":23,"ix":5},"lc":2,"lj":1,"ml":4,"bm":14,"nm":"#strokeColor","mn":"ADBE Vector Graphic - Stroke","hd":false,"ln":"strokeColor"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":120,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":149,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":195,"s":[100]},{"t":253.000010304901,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":2,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":120.0000048877,"st":0,"bm":0}],"markers":[],"chars":[{"ch":"T","size":250,"style":"Regular","w":60.4,"data":{"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-10.156,2.979],[1.025,0.195],[14.6,-3.125],[14.258,-6.006],[6.885,-3.76],[4.346,-4.883],[-8.545,3.027],[1.025,0],[0.635,0.195],[-7.52,3.564],[-9.717,3.223],[1.074,-23.584],[-8.74,-0.977],[1.514,0.488],[-15.039,27.783],[-9.57,1.514]],"o":[[2.539,-0.732],[-14.893,-2.637],[-15.137,3.223],[-7.275,3.027],[-5.664,3.027],[-6.738,7.568],[2.051,-0.732],[-0.684,-0.195],[3.955,-8.838],[9.229,-4.395],[-15.43,27.295],[-0.342,8.105],[3.516,0.391],[-19.531,-5.859],[9.277,-2.637],[10.498,-1.66]],"v":[[135.645,-140.332],[132.715,-144.775],[86.133,-140.479],[41.895,-126.66],[20.605,-116.504],[3.125,-105.469],[12.549,-92.871],[9.814,-96.387],[7.861,-97.021],[36.816,-115.674],[65.283,-127.1],[22.803,-9.375],[35.4,7.764],[34.229,3.418],[75.195,-130.127],[103.516,-136.377]],"c":true},"ix":2},"nm":"T","mn":"ADBE Vector Shape - Group","hd":false}],"nm":"T","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}]},"fFamily":"Radicalis"},{"ch":"h","size":250,"style":"Regular","w":42.53,"data":{"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-2.881,-4.785],[-2.93,4.297],[0.879,-1.221],[2.832,-1.611],[-0.049,3.955],[-3.418,7.568],[5.322,5.664],[0.928,-0.879],[10.303,-17.822],[-6.885,16.211],[-9.375,15.283],[1.318,-1.514],[-2.246,-22.607],[-1.074,1.904],[-16.846,16.064],[1.514,-3.955]],"o":[[5.127,8.594],[0.83,-1.221],[-1.855,2.588],[-3.564,2.002],[0.049,-6.25],[2.637,-5.811],[-0.586,-0.635],[-15.43,14.6],[3.613,-17.725],[6.982,-16.455],[1.025,-1.66],[-17.432,20.41],[0.146,1.66],[10.938,-20.068],[-0.342,6.592],[-1.758,4.688]],"v":[[22.021,-40.674],[41.016,-50.439],[40.674,-52.637],[30.811,-42.529],[26.611,-45.264],[33.154,-63.574],[36.133,-85.449],[32.568,-86.426],[-1.27,-35.205],[16.797,-86.816],[40.137,-132.861],[36.621,-137.012],[-8.252,-23.682],[-3.271,-21.387],[31.982,-79.346],[23.926,-58.936]],"c":true},"ix":2},"nm":"h","mn":"ADBE Vector Shape - Group","hd":false}],"nm":"h","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}]},"fFamily":"Radicalis"},{"ch":"a","size":250,"style":"Regular","w":48.19,"data":{"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-3.955,4.688],[-2.588,-2.246],[-3.809,6.543],[0.83,-1.367],[5.664,1.562],[-0.83,3.125],[-3.955,8.74],[1.318,-2.344],[1.318,-2.637],[7.715,-1.855],[1.465,-12.598],[-7.959,6.104]],"o":[[-0.342,3.32],[9.814,8.594],[0.732,-1.318],[-2.783,4.541],[-2.637,-0.684],[2.539,-9.326],[1.172,-2.344],[-1.465,2.637],[0.195,-5.615],[-13.33,3.223],[-1.221,10.547],[4.736,-3.662]],"v":[[24.561,-44.824],[27.246,-35.986],[51.416,-53.516],[48.73,-54.59],[32.959,-39.893],[32.324,-47.998],[43.555,-74.756],[36.816,-76.123],[32.666,-68.262],[22.217,-76.904],[-4.688,-40.527],[11.572,-32.178]],"c":true},"ix":2},"nm":"a","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[5.811,4.492],[-3.662,4.883],[-1.611,-1.66],[0.732,-1.367],[-1.807,-0.146],[0.879,-1.221]],"o":[[-5.127,-4.053],[9.277,-12.354],[1.465,1.465],[-0.781,1.318],[-0.781,1.172],[-3.271,4.541]],"v":[[3.027,-34.766],[11.719,-59.668],[26.709,-70.654],[25.146,-63.037],[27.734,-58.008],[25.293,-54.492]],"c":true},"ix":2},"nm":"a","mn":"ADBE Vector Shape - Group","hd":false}],"nm":"a","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}]},"fFamily":"Radicalis"},{"ch":"n","size":250,"style":"Regular","w":42.97,"data":{"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0.879,-1.27],[5.713,-4.248],[-1.367,5.176],[0.732,6.104],[0.732,0.244],[2.637,-3.76],[-2.783,6.543],[1.27,-2.051],[1.416,-13.818],[-1.123,1.66],[-5.176,7.08],[-4.053,4.59],[-10.547,-6.445],[-0.146,1.465]],"o":[[0.586,-0.879],[-5.371,4.004],[2.246,-8.545],[-0.244,-1.904],[-6.055,-2.051],[2.783,-6.348],[0.928,-2.246],[-7.275,11.67],[-0.195,2.1],[4.98,-7.227],[1.074,-1.465],[-3.564,11.377],[11.182,6.836],[0.732,-1.318]],"v":[[42.529,-54.639],[30.225,-41.016],[23.828,-46.68],[32.812,-73.73],[29.443,-77.1],[4.59,-52.783],[13.525,-71.826],[8.643,-76.221],[-6.25,-36.768],[-0.732,-34.814],[14.16,-56.494],[24.658,-69.971],[20.215,-36.035],[44.043,-53.906]],"c":true},"ix":2},"nm":"n","mn":"ADBE Vector Shape - Group","hd":false}],"nm":"n","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}]},"fFamily":"Radicalis"},{"ch":"k","size":250,"style":"Regular","w":37.45,"data":{"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[1.074,-1.66],[9.326,-25.879],[-5.225,-13.77],[0.244,1.807],[-1.123,3.125],[-5.469,-2.1],[2.734,1.416],[3.027,2.734],[-3.955,3.857],[-7.666,7.764],[1.416,-1.318],[6.787,-6.348],[3.516,-4.541],[-3.223,7.959],[-9.814,23.877]],"o":[[-14.941,23.633],[-5.273,14.697],[0.391,0.977],[-2.051,-14.844],[1.025,7.617],[3.516,1.318],[-3.662,-1.855],[-5.762,-5.176],[7.812,-7.666],[1.66,-1.611],[-6.836,6.348],[-3.32,3.076],[2.93,-8.057],[9.717,-23.975],[0.732,-1.807]],"v":[[35.742,-137.109],[8.35,-78.613],[-7.764,-13.281],[-3.857,-12.354],[4.541,-48.438],[21.826,-36.279],[22.705,-39.941],[14.16,-44.434],[21.729,-59.814],[44.727,-83.252],[40.527,-86.279],[19.971,-67.432],[7.08,-55.518],[16.357,-79.541],[40.186,-134.863]],"c":true},"ix":2},"nm":"k","mn":"ADBE Vector Shape - Group","hd":false}],"nm":"k","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}]},"fFamily":"Radicalis"},{"ch":" ","size":250,"style":"Regular","w":33.94,"data":{},"fFamily":"Radicalis"},{"ch":"y","size":250,"style":"Regular","w":55.32,"data":{"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[1.465,-0.391],[4.053,-2.441],[3.857,2.979],[4.346,-4.639],[5.273,-3.613],[2.295,0.146],[-0.83,2.539],[-1.953,3.271],[1.123,-1.416],[-5.518,-5.811],[-3.516,2.441],[-9.277,5.811],[0,-4.199],[0.342,-2.393],[6.25,-17.285],[-9.18,-1.807],[-3.369,5.518],[-3.32,14.014],[-0.781,5.322],[-5.225,2.148]],"o":[[-4.443,1.318],[0.244,-5.713],[-7.178,-5.518],[-4.346,4.59],[-1.465,1.709],[0.244,-2.734],[1.221,-3.662],[0.977,-1.611],[-3.711,4.688],[3.418,3.662],[9.18,-6.299],[5.664,-3.516],[-0.049,2.393],[-15.771,12.402],[-2.002,5.469],[7.959,1.611],[7.617,-12.305],[0.781,-3.467],[4.346,-3.125],[2.197,-0.879]],"v":[[57.031,-56.592],[44.287,-50.879],[39.746,-64.941],[21.143,-56.104],[7.373,-42.285],[1.758,-39.99],[3.369,-47.9],[8.35,-58.105],[4.053,-60.303],[-1.758,-36.572],[9.57,-37.451],[33.496,-60.791],[38.086,-53.32],[37.354,-46.094],[3.467,3.223],[5.762,23.877],[24.658,7.666],[40.869,-32.422],[43.848,-46.338],[58.105,-54.297]],"c":true},"ix":2},"nm":"y","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[4.59,3.32],[-5.078,11.035],[-10.938,10.303]],"o":[[-2.441,-1.27],[7.764,-17.09],[-2.051,14.404]],"v":[[5.762,19.287],[9.375,1.074],[36.475,-40.283]],"c":true},"ix":2},"nm":"y","mn":"ADBE Vector Shape - Group","hd":false}],"nm":"y","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}]},"fFamily":"Radicalis"},{"ch":"o","size":250,"style":"Regular","w":35.35,"data":{"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0.83,-1.27],[0.83,0.049],[1.318,1.025],[0.635,0.928],[0.049,0.83],[0,0],[-1.416,1.758],[-2.197,-0.244],[-0.391,-2.734],[1.807,-3.369]],"o":[[-0.928,0.098],[-2.734,-0.098],[-0.586,-0.439],[-0.684,-0.928],[0,0],[1.123,-2.148],[2.197,-1.318],[2.197,0.244],[0.146,3.271],[-0.83,1.465]],"v":[[18.994,-50.488],[16.406,-50.391],[10.303,-52.051],[8.447,-54.053],[7.324,-56.641],[9.57,-61.572],[13.379,-67.432],[20.02,-69.043],[23.926,-64.551],[21.484,-54.59]],"c":true},"ix":2},"nm":"o","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[-2.295,0.195],[0.146,-0.146],[1.025,-0.977],[1.172,-0.635],[0.732,0.781],[-0.244,1.66],[-0.439,1.514],[-0.049,0.244],[-0.146,-0.049],[-0.244,-0.244],[-1.514,-0.586]],"o":[[-0.146,0.146],[-0.879,0.977],[-1.074,1.025],[-2.393,1.123],[-0.732,-0.732],[0.244,-1.66],[0.049,-0.293],[0.049,-0.146],[0.146,0.049],[0.635,0.635],[2.197,0.635]],"v":[[15.918,-46.582],[15.479,-46.094],[12.598,-43.164],[9.229,-40.723],[4.59,-40.186],[3.857,-43.799],[4.834,-48.584],[5.029,-49.414],[5.322,-49.561],[5.957,-49.121],[9.131,-47.266]],"c":true},"ix":2},"nm":"o","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[3.809,-0.635],[-0.391,1.709],[1.172,2.441],[2.393,1.123],[2.93,-0.439],[0.83,0.098],[0.439,-0.635],[0.537,-0.732],[0,0],[0.195,-0.146],[1.318,-1.855],[-0.684,-2.002],[1.025,-3.223],[-0.537,-2.783],[-2.979,-1.807],[-2.93,1.221],[-2.49,2.881],[-0.635,1.562],[-4.541,2.686],[0.049,0.293],[0.391,0.098],[0.439,-0.049],[0.195,-0.146]],"o":[[2.051,-3.467],[0.732,-3.564],[-1.221,-2.441],[-2.393,-1.074],[-0.781,-0.537],[-0.83,-0.098],[-0.391,0.635],[0,0],[-0.195,0.049],[-1.953,1.172],[-1.318,1.904],[-1.807,3.174],[-1.074,3.223],[0.537,2.783],[2.979,1.611],[2.881,-1.221],[2.246,-2.588],[4.248,-0.342],[0.635,-0.488],[-0.049,-0.244],[-0.391,-0.098],[-0.439,0.049],[-2.588,1.123]],"v":[[25.537,-50.586],[29.15,-58.35],[28.467,-67.334],[23.047,-72.656],[15.039,-73.584],[12.646,-74.512],[10.742,-73.73],[9.375,-71.631],[9.082,-71.436],[8.496,-71.143],[3.564,-66.602],[2.588,-60.791],[-1.66,-51.221],[-2.49,-42.236],[2.734,-35.4],[11.572,-34.814],[19.629,-40.967],[23.975,-47.217],[37.158,-51.758],[38.037,-52.93],[37.354,-53.467],[36.084,-53.516],[35.107,-53.174]],"c":true},"ix":2},"nm":"o","mn":"ADBE Vector Shape - Group","hd":false}],"nm":"o","np":6,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}]},"fFamily":"Radicalis"},{"ch":"u","size":250,"style":"Regular","w":43.75,"data":{"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0.684,-1.318],[3.564,1.709],[-1.27,3.955],[-3.369,9.375],[0.83,-2.246],[2.148,-5.566],[4.102,3.564],[-0.488,1.367],[-3.174,7.227],[0.977,-1.855],[-15.576,-2.148],[-3.809,4.688],[-0.391,0.439],[-2.979,-3.027],[-3.027,5.908]],"o":[[-2.197,4.15],[-3.32,-1.562],[3.223,-9.424],[0.879,-2.393],[-1.807,3.174],[-7.08,12.793],[-1.855,-1.611],[2.49,-7.471],[0.83,-1.855],[-3.32,6.152],[6.982,0.977],[0.391,-0.439],[-0.635,5.127],[9.033,9.082],[0.635,-1.318]],"v":[[43.848,-54.443],[27.686,-38.037],[27.881,-49.561],[35.596,-71.484],[29.932,-74.365],[23.34,-60.547],[2.246,-37.842],[4.346,-50.049],[13.135,-71.924],[8.35,-74.316],[1.709,-32.422],[18.896,-46.924],[20.02,-48.291],[22.998,-35.547],[46.045,-53.369]],"c":true},"ix":2},"nm":"u","mn":"ADBE Vector Shape - Group","hd":false}],"nm":"u","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}]},"fFamily":"Radicalis"}]}');
	},500);

		setTimeout(function() {
			$( "body" ).fadeOut( "fast" );
			setTimeout(function() {
				location.reload(false);
			}, 500);
		}, 10000);

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
				if($('.ot-two').is(":visible") && otherSecond == ''){
					//add error borderanimation
					$('otherGift-two').focus();
				}else if ($('.ma-two').is(":visible") && totalTwo <= 0){
					//add error borderanimation
					$('#amount-two').focus();
					consol.log('no money');
				}else{
					entryStep = "3.3";
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
					//add error borderanimation
					$('otherGift').focus();
				}else if ($('.ma-one').is(":visible") && total <= 0){
					//add error borderanimation
					$('#amount-one').focus();
					consol.log('no money');
				}else{
					entryStep = "3.1";
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
					//add error borderanimation
					$('otherGift').focus();
				}else if ($('.ma-one').is(":visible") && total <= 0){
					//add error borderanimation
					$('#amount-one').focus();
					consol.log('no money');
				}else{
					entryStep = "3.1";
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
    $('.name-summary').after('<div class="gift-summary"></div>');

		for(var i=0, l = data.length -1; l >= i; l--){
			var extractedData = data[l];
			$('.gift-summary').append('<div class="gift-card slide-in-field-delay2"><h4 class="summary-heading text-focus-in">Gift details</h4><div class="avatar-select ' + (extractedData['party'] == 'Arati' ? "bride" : "groom") + '"></div><div class="gift-container slide-in-field-delay2"><div class="column-name"' + (extractedData['money'] < 1 ? "style=display:none;" : (extractedData['other'].length < 1 ? "style=flex-basis:100%;display:block;" : "style=display:block;")) + '><h5 style="text-align:center;">Money</h5><p class="summary-detail sm-money slide-in-field-delay3" style="text-align:center; padding-bottom: 2px;">' + extractedData['money']  +'</p></div><div class="column-name"' + (extractedData['other'].length < 1 ? "style=display:none;" : (extractedData['money'] < 1 ? "style=flex-basis:100%;display:block;" : "style=display:block")) + '"><h5 style="text-align:center;">Other Gift</h5><p class="summary-detail sm-other" style="text-align:center; padding-bottom: 2px;">'+ extractedData['other'] + '</p></div></div></div>');
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
				$('#otherGift').focus();
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
				$('#otherGift-two').focus();
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
			saveToFirebase();
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
				$('#amount-one').val('');
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
				$('#amount-two').val('');
			}else{
				$('.detail-two').text('');
				$("#otherGift-two").val('');
				$("#otherGift-two").focus();
				otherSecond = "";
			}
		});

		$('.back-button').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			var step = $('.form-step:visible').attr('data-step');
			switch (step) {
				case "1.1":
					notInvited = false;
					$('.form-step[data-step="1.1"]').hide();
					$("#myInput").val('');
					$('.form-step[data-step="1"]').show();
					$("#myInput").focus();
					break;
				case "2":
					backToContact();
					break;
				case "3":
					party = "";
					backToSelectParty();
					break;
				case "3.1":
					if(both && $('.confirm-one').text() == 'Continue'){
						$('.ma-one').show();
						$('.ot-one').hide();
						$('.confirm-one').text('Next');
					}else if($('.confirm-one').text() == 'Next'){
						backToSelectGift();
					}else{
						backToSelectGift();
					}
					break;
				case "3.2":
					backToGiftEntryOne();
					break;
				case "3.3":
					if(both && $('.confirm-two').text() == 'Continue'){
						$('.ma-two').show();
						$('.ot-two').hide();
						$('.confirm-two').text('Next');
					}else if($('.confirm-two').text() == 'Next'){
						backToSelectGiftTwo();
					}else{
						backToSelectGiftTwo();
					}
					break;
				case "4":
					$('.gift-summary').remove()
					backToGiftEntry();
					break;
				default:

			}
		});

//add extra dollar
		$('.dolr-one').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			if ($('.ma-one').is(":visible")){
				total += 1;
				$('.money-one').attr('data-count', total);
				$(".money-one").text(total);
				$('.money-one').show();
				$('.total-one').show();
				duration = 5*100;
				animateCounter(duration);
			}else{
				return;
			}
		});
//add extra dollar
		$('.dolr-two').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			if ($('.ma-two').is(":visible")){
				totalTwo += 1;
				$('.money-two').attr('data-count', totalTwo);
				$(".money-two").text(totalTwo);
				$(".money-two").show();
				$('.total-two').show();
				duration = 5*100;
				animateCounterTwo(duration);
			}else {
				return;
			}
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
			total += num + 11;
			$('#amount-one').val(parseFloat(total).toFixed(2));
			$('.money-one').show();
			$('.money-one').attr('data-count', total);
			$('.money-highlight').toggleClass('money-highlighted');
			//duration = 5*100;
			//animateCounter(duration);

			setTimeout(function() {
				$('.fv-one').click(handler);
			},2000);
		}

		$('.tn-one').click(handler1);

		function handler1(e){
			e.preventDefault();
			e.stopPropagation();
			$('.tn-one').unbind('click', arguments.callee);
			total += num + 21;
			$('#amount-one').val(parseFloat(total).toFixed(2));
			$('.money-one').show();
			$('.money-one').attr('data-count', total);
			$('.money-highlight').toggleClass('money-highlighted');
			//duration = 5*100;
			//animateCounter(duration);
			setTimeout(function() {
				$('.tn-one').click(handler1);
			},2000);
		}

		$('.ff-one').click(handler2);

		function handler2(e) {
			e.stopPropagation();
			$('.ff-one').unbind('click', arguments.callee);
			total += num + 51;
			$('#amount-one').val(parseFloat(total).toFixed(2));
			$('.money-one').show();
			$('.money-one').attr('data-count', total);
			$('.money-highlight').toggleClass('money-highlighted');
			//duration = 5*200;
			//animateCounter(duration);
			setTimeout(function() {
				$('.ff-one').click(handler2);
			},2000);
		}

		$('.tw-one').click(handler3);

		function handler3(e) {
			e.stopPropagation();
			$('.tw-one').unbind('click', arguments.callee);
			total += num + 41;
			$('#amount-one').val(parseFloat(total).toFixed(2));
			$('.money-one').show();
			$('.money-one').attr('data-count', total);
			$('.money-highlight').toggleClass('money-highlighted');
			//duration = 5*200;
			//animateCounter(duration);
			setTimeout(function() {
				$('.tw-one').click(handler3);
			},2000);
		}

		$('.hn-one').click(handler4);

		function handler4(e) {
			e.stopPropagation();
			$('.hn-one').unbind('click', arguments.callee);
			total += num + 101;
			$('#amount-one').val(parseFloat(total).toFixed(2));
			$('.money-one').show();
			$('.money-one').attr('data-count', total);
			$('.money-highlight').toggleClass('money-highlighted');
			//duration = 5*200;
			//animateCounter(duration);
			setTimeout(function() {
				$('.hn-one').click(handler4);
			},2000);
		}

		$(".letter").click(function(event){
			var number = event.target.innerHTML;
			var current = $('#amount-one').val();

			if(current == '0' || total == '0'){
				total = number;
			}else{
				total += number;
			}
			$('#amount-one').val(parseFloat(total).toFixed(2));
		});

		$(".delete").click(function(){
			var length = total.length;
    	if (length > 0) {
      	total = total.substring(0, length-1);
				var num = parseFloat(total).toFixed(2);
				$('#amount-one').val(num);
    	}
		});
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
			totalTwo += num + 11;
			$('#amount-two').val(parseFloat(totalTwo).toFixed(2));
			$('.money-two').show();
			$('.money-two').attr('data-count', totalTwo);
			//duration = 5*100;
		//animateCounterTwo(duration);
			setTimeout(function() {
				$('.fv-two').click(handler5);
			},2000);
		}

		$('.tn-two').click(handler6);

		function handler6(e) {
			e.stopPropagation();
			$('.tn-two').unbind('click', arguments.callee);
			totalTwo += num + 21;
			$('#amount-two').val(parseFloat(totalTwo).toFixed(2));
			$('.money-two').show();
			$('.money-two').attr('data-count', totalTwo);
		//	duration = 5*100;
		//	animateCounterTwo(duration);
			setTimeout(function() {
				$('.tn-two').click(handler6);
			},2000);
		}

		$('.ff-two').click(handler7);

		function handler7(e) {
			e.stopPropagation();
			$('.ff-two').unbind('click', arguments.callee);
			totalTwo += num + 51;
			$('#amount-two').val(parseFloat(totalTwo).toFixed(2));
			$('.money-two').show();
			$('.money-two').attr('data-count', totalTwo);
			//duration = 5*200;
			//animateCounterTwo(duration);
			setTimeout(function() {
				$('.ff-two').click(handler7);
			},2000);
		}

		$('.tw-two').click(handler8);

		function handler8(e) {
			e.stopPropagation();
			$('.tw-two').unbind('click', arguments.callee);
			totalTwo += num + 41;
			$('#amount-two').val(parseFloat(totalTwo).toFixed(2));
			$('.money-two').show();
			$('.money-two').attr('data-count', totalTwo);
			//duration = 5*200;
		//	animateCounterTwo(duration);
			setTimeout(function() {
				$('.tw-two').click(handler8);
			},2000);
		}

		$('.hn-two').click(handler9);

		function handler9(e) {
			e.stopPropagation();
			$('.hn-two').unbind('click', arguments.callee);
			totalTwo += num + 101;
			$('#amount-two').val(parseFloat(totalTwo).toFixed(2));
			$('.money-two').show();
			$('.money-two').attr('data-count', totalTwo);
		//	duration = 5*200;
		//	animateCounterTwo(duration);
			setTimeout(function() {
				$('.hn-two').click(handler9);
			},2000);
		}

		$(".letter2").click(function(event){
			var number = event.target.innerHTML;
			var current = $('#amount-two').val();

			if(current == '0' || totalTwo == '0'){
				totalTwo = number;
			}else{
				totalTwo += number;
			}
			$('#amount-two').val(parseFloat(totalTwo).toFixed(2));
		});

		$(".delete2").click(function(){
			var length = totalTwo.length;
			if (length > 0) {
				totalTwo = totalTwo.substring(0, length-1);
			$('#amount-two').val(parseFloat(totalTwo).toFixed(2));
			}
		});

	});

	function toTitleCase(str) {
        var lcStr = str.toLowerCase();
        return lcStr.replace(/(?:^|\s)\w/g, function(match) {
            return match.toUpperCase();
        });
    }

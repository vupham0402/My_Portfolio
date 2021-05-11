	var costofTour = 0;
	var costAdult = 30;
	var costKid = 25;
	var numAdult = 1;
	var numKid =1;
	var numBreakfast = 0;
	var numLunch = 0;
	var numPickUp = 0;	
	var numDropOff = 0;
	var totalCost = 0;
	$(document).on("pageinit", function(){
		$('.rad').change(function(){
			var tv = $('.rad:checked').val();			 
			if(tv === 1){
				costAdult = 20;
				costKid = 15;
			}
			else if(tv === 2){
				costAdult = 15;
				costKid = 10;
			}
			else{
				costAdult = 30;
				costKid = 25;
			}
		});
		$('.slider').change(function(){
			numAdult = $('#adultSlide').val();
			numKid = $('#kidSlide').val();
		});
		$('.select').change(function(){
			numBreakfast = $('#breakfast').val();
			numLunch = $('#lunch').val();
			numPickUp = $('#pickup').val();
			numDropOff = $('#dropoff').val();
		});
		$('#totalCost').click(function(){
			if ($('.rad:checked').val() === 3){
				if (numAdult === 1 && numKid === 1){
					costofTour = 55 + 10*numBreakfast + 
							15*numLunch + 5*numPickUp + 5*numDropOff;
					$('#totalAmount').html('<legend>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$' + costofTour.toFixed(2)) + '</legend>';
				}
				else{
					numAdult = $('#adultSlide').val();
					numKid = $('#kidSlide').val();
					costofTour = costAdult*numAdult + costKid*numKid + 10*numBreakfast + 
							15*numLunch + 5*numPickUp + 5*numDropOff;
					$('#totalAmount').html('<legend>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$' + costofTour.toFixed(2)) + '</legend>';
				}
			}
			else {
				costofTour = costAdult*numAdult + costKid*numKid + 10*numBreakfast + 
							15*numLunch + 5*numPickUp + 5*numDropOff;
				$('#totalAmount').html('<legend>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$' + costofTour.toFixed(2)) + '</legend>';	
			}
		});
		$('#reset').click(function(){
			$('#radioA1').prop('checked', false).checkboxradio("refresh");
			$('#radioA2').prop('checked', false).checkboxradio("refresh");
			$('#radioA3').prop('checked', true).checkboxradio("refresh");
			$('#adultSlide').val(1).slider("refresh");
			$('#kidSlide').val(1).slider("refresh");
			$('#breakfast').val(0).selectmenu("refresh"); 
			$('#lunch').val(0).selectmenu("refresh");
			$('#pickup').val(0).selectmenu("refresh");
			$('#dropoff').val(0).selectmenu("refresh");
			$('#totalAmount').html("");
		})
	});// JavaScript Document
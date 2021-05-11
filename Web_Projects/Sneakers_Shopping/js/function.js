// JavaScript Document
// Model - Variable list
var currentOne = "1",
	currentBrand = "brand",
	currentName = "name",
	currentPrice = "price",
	currentPic = "pic name",
	currentDetail	 = "detail",
	currentSize = "size",
	whichOne = "1";

// initialize the page - read the XML, create the inventory list
$(document).on("pageinit", function(){
	"use strict";
	$.ajax({
		url:"../xml/shoes.xml",
		cache: false,
		dataType:"xml",
		success: function(xml){
			$('#inventoryList').empty();
			
			$(xml).find('shoes').each(function(){
				var info=
					'<li class="list" data-id='+
					$(this).find("ID").text()+
					'><a href=#page1 class="ui-btn"><div class="thumbContainer"><img src="../images/'+
					$(this).find("pic").text()+
					'" alt=""></div></a>'+
					'<p><h3>'+
					$(this).find("name").text()+
					'</p></h3><p>'+
					$(this).find("brand").text()+
					'</p>'+
					'<p>Size: '+
					$(this).find("size").text()+
					' US</p>'+
					'<p>Price: $ '+
					$(this).find("cost").text()+
					'</p><p><span style="opacity:0.01;">'+
					$(this).find("category").text()+
					'</span></p></li>';
				
				$('#inventoryList').append(info).listview('refresh');
				
			});	
			$('#inventoryList').append('<div class="clearIt"></div>')
		}	
	});
$("#inventoryList").on("click","li",function(){
	document.getElementById("addToCart").innerHTML = "Add To Cart";
	document.getElementById("addToCart").removeAttribute("disabled");
	whichOne=($(this).attr("data-id"));
	$.ajax({
	url:"../xml/shoes.xml",
	cache: false,
	dataType:"xml",
	success: function(xml1){	
		$(xml1).find('shoes').each(function(){
			currentOne = ($(this).find("ID").text());
			if(currentOne === whichOne){
				currentBrand = ($(this).find("brand").text());
				currentName = ($(this).find("name").text());
				currentPrice = ($(this).find("cost").text());
				currentPic = ($(this).find("pic").text());
				currentDetail = ($(this).find("detail").text());
				currentSize = ($(this).find("size").text());
				var text = currentDetail.slice(0,350) + "...";
				$('#theDetail').html(text);
				var btn4 = document.getElementById('show');
				btn4.onclick = function(){
					if($('#show').html() === 'Read More'){
						$('#theDetail').html(currentDetail);
						$('#show').html("Hide Detail");
					}
					else{
						$('#theDetail').html(text);
						$('#show').html("Read More");	
					}
				};
				$('#theSize').html(currentSize+ ' US');
				$('#theBrand').html(currentBrand);
				$('#theName').html(currentName);
				$('#thePrice').html('$ '+currentPrice);
				$('#footerText').text(currentName);
				$('#thePic').html('<img src="../images/'+currentPic+'"/>');
			}
		});	
		checkCart();
	}
	});
	});
	function checkCart(){
		for(var i=0; i<carts.length; i++){
			if(currentName === carts[i].name){
				document.getElementById("addToCart").innerHTML = "Added";
				$('#addToCart').attr("disabled","true");
			}
		}
	}
	function Cart(photo, name, size, price){
				this.photo = photo;
				this.name = name;
				this.size = size;
				this.price = price;
	}
	var flag = 0;
	var carts = [];
	var modal = document.getElementById("modal-wrapper");
	var content = document.getElementById("modal-content-body");
	var span = document.getElementsByClassName('close')[0];
	var total1 = document.getElementById('totalInventory1');
	var total2 = document.getElementById('miniTotalInventory1');
	var total3 = document.getElementById('totalInventory2');
	var total4 = document.getElementById('miniTotalInventory2');
	var total5 = document.getElementById('totalInventory3');
	var total6 = document.getElementById('miniTotalInventory3');
	var total7 = document.getElementById('totalInventory4');
	var total8 = document.getElementById('miniTotalInventory4');
	var total9 = document.getElementById('totalInventory5');
	var total10 = document.getElementById('miniTotalInventory5');
	//$('#modal-1').attr("checked","false");
	$('#addToCart').click(function() {
		if(document.getElementById("addToCart").innerHTML === "Added"){
			flag = 1;
		}
		else{
			document.getElementById("addToCart").innerHTML = "Added";
			content.innerHTML = "";
			var newCart = new Cart(currentPic,currentName,currentSize,currentPrice);
			carts.push(newCart);
			for(var i=0; i<carts.length; i++){
				content.innerHTML += '<img src="../images/'+ carts[i].photo +'" width="80" height="42"/>'+ " "+ carts[i].name + ' size ' + carts[i].size + '<input type="radio" name="remove">' + '<br>' + ' $' + carts[i].price + '<br>';
			}
			total1.innerHTML = carts.length;
			total2.innerHTML = carts.length;
			total3.innerHTML = carts.length;
			total4.innerHTML = carts.length;
			total5.innerHTML = carts.length;
			total6.innerHTML = carts.length;
			total7.innerHTML = carts.length;
			total8.innerHTML = carts.length;
			total9.innerHTML = carts.length;
			total10.innerHTML = carts.length;
			newCart.splice(0);
			flag = 0;
		}		
	});
	$('#remove').click(function(){
		 var checkbox = document.getElementsByName('remove');
		 for (var t = 0; t < checkbox.length; t++){
				if (checkbox[t].checked === true){
					carts.splice(t,1);
				}
		 }
		content.innerHTML = "";
		for(var i=0; i<carts.length; i++){
			content.innerHTML += '<img src="../images/'+ carts[i].photo +'" width="80" height="42"/>'+ " "+ carts[i].name + ' size ' + carts[i].size + '<input type="radio" name="remove">' + '<br>' + ' $' + carts[i].price + '<br>';
		}
		total1.innerHTML = carts.length;
		total2.innerHTML = carts.length;
		total3.innerHTML = carts.length;
		total4.innerHTML = carts.length;
		total5.innerHTML = carts.length;
		total6.innerHTML = carts.length;
		total7.innerHTML = carts.length;
		total8.innerHTML = carts.length;
		total9.innerHTML = carts.length;
		total10.innerHTML = carts.length;
		if(content.innerHTML === ""){
			content.innerHTML = "Your cart is empty!";
		}
		modal.load(content);
	});
	span.onclick = function(){
		modal.style.display = "none";
	};
	window.onclick = function(event){
		if (event.target === modal) {
			modal.style.display = "none";
		}
	};
	$(".cart-toggle").click(function(){
		modal.style.display = "block";
	});
	$("#totalInventory1").click(function(){
		modal.style.display = "block";
	});
	$("#totalInventory2").click(function(){
		modal.style.display = "block";
	});
	$("#totalInventory3").click(function(){
		modal.style.display = "block";
	});
	$("#totalInventory4").click(function(){
		modal.style.display = "block";
	});
	$("#totalInventory5").click(function(){
		modal.style.display = "block";
	});
	$("#miniTotalInventory1").click(function(){
		modal.style.display = "block";
	});
	$("#miniTotalInventory2").click(function(){
		modal.style.display = "block";
	});
	$("#miniTotalInventory3").click(function(){
		modal.style.display = "block";
	});
	$("#miniTotalInventory4").click(function(){
		modal.style.display = "block";
	});
	$("#miniTotalInventory5").click(function(){
		modal.style.display = "block";
	});
	$(".minicart-toggle").click(function(){
		modal.style.display = "block";
	});
	$("#continue").click(function(){
		modal.style.display = "none";
		document.getElementById("addToCart").innerHTML = "Add To Cart";
	});
	/*$("ul li a").click(function(){
		location.reload();			   
	});*/
	$('#sameadr1').click(function(){
			if ($(this).prop("checked") === true) {
				    document.getElementById('Sfname1').value = document.getElementById('Bfname1').value;
					document.getElementById('Slname1').value = document.getElementById('Blname1').value;
					document.getElementById('Sphone1').value = document.getElementById('Bphone1').value;
				 	document.getElementById('Semail1').value = document.getElementById('Bemail1').value;
					document.getElementById('Saddress1').value = document.getElementById('Baddress1').value;
					$('#Sstate1').val($('#Bstate1').val()).selectmenu("refresh");
				 	document.getElementById('Szip1').value = document.getElementById('Bzip1').value;
          } 
		  else if($(this).prop("checked") === false){  
                    document.getElementById('Sfname1').value = "";
                    document.getElementById('Slname1').value = "";   
                    document.getElementById('Sphone1').value = "";  
                    document.getElementById('Semail1').value = "";
			  		document.getElementById('Saddress1').value = "";  
                    $('#Sstate1').val(1).selectmenu("refresh"); 
			  		document.getElementById('Szip1').value = "";
          }
		});	
	//localStorage.theAccount = [];
	function getOldData(){
		var usertext = "";
	//retrieve theFirstName
		if(localStorage.theShippingFirstName){
			usertext=localStorage.theShippingFirstName;
		}
		else {
			usertext = '';
		}
		$('#Bfname1').val(usertext);
		//retrieve theLastName
		if(localStorage.theShippingLastName){
			usertext=localStorage.theShippingLastName;
		}
		else {
			usertext = '';
		}
		$('#Blname1').val(usertext);
		if(localStorage.theShippingPhone){
			usertext=localStorage.theShippingPhone;
		}
		else {
			usertext = '';
		}
		$('#Bphone1').val(usertext);
		if(localStorage.theShippingEmail){
			usertext=localStorage.theShippingEmail;
		}
		else {
			usertext = '';
		}
		$('#Bemail1').val(usertext);
		if(localStorage.theShippingAddress){
			usertext=localStorage.theShippingAddress;
		}
		else {
			usertext = '';
		}
		$('#Baddress1').val(usertext);
		if(localStorage.theShippingState){
			usertext=localStorage.theShippingState;
		}
		else {
			usertext = '';
		}
		$('#Bstate1').val(usertext);
		if(localStorage.theShippingZip){
			usertext=localStorage.theShippingZip;
		}
		else {
			usertext = '';
		}
		$('#Bzip1').val(usertext);
		if(localStorage.theBillingFirstName){
			usertext=localStorage.theBillingFirstName;
		}
		else {
			usertext = '';
		}
		$('#Sfname1').val(usertext);
		//retrieve theLastName
		if(localStorage.theBillingLastName){
			usertext=localStorage.theBillingLastName;
		}
		else {
			usertext = '';
		}
		$('#Slname1').val(usertext);
		if(localStorage.theBillingPhone){
			usertext=localStorage.theBillingPhone;
		}
		else {
			usertext = '';
		}
		$('#Sphone1').val(usertext);
		if(localStorage.theBillingEmail){
			usertext=localStorage.theBillingEmail;
		}
		else {
			usertext = '';
		}
		$('#Semail1').val(usertext);
		if(localStorage.theBillingAddress){
			usertext=localStorage.theBillingAddress;
		}
		else {
			usertext = '';
		}
		$('#Saddress1').val(usertext);
		if(localStorage.theBillingState){
			usertext=localStorage.theBillingState;
		}
		else {
			usertext = '';
		}
		$('#Sstate1').val(usertext);
		if(localStorage.theBillingZip){
			usertext=localStorage.theBillingZip;
		}
		else {
			usertext = '';
		}
		$('#Szip1').val(usertext);
		if(localStorage.theNameCard){
			usertext=localStorage.theNameCard;
		}
		else {
			usertext = '';
		}
		$('#cname1').val(usertext);
		if(localStorage.theNumberCard){
			usertext=localStorage.theNumberCard;
		}
		else {
			usertext = '';
		}
		$('#ccnum1').val(usertext);
		if(localStorage.theExpMonth){
			usertext=localStorage.theExpMonth;
		}
		else {
			usertext = '';
		}
		$('#expmonth1').val(usertext);
		if(localStorage.theExpYear){
			usertext=localStorage.theExpYear;
		}
		else {
			usertext = '';
		}
		$('#expyear1').val(usertext);
		if(localStorage.theCVV){
			usertext=localStorage.theCVV;
		}
		else {
			usertext = '';
		}
		$('#cvv1').val(usertext);
	}
	function storemyform(){	
		// get values from form and store them in localStorage
		var myShippingFirstName = $('#Bfname1').val();
		localStorage.theShippingFirstName = myShippingFirstName;	
		var myShippingLastName = $('#Blname1').val();
		localStorage.theShippingLastName = myShippingLastName;
		var myShippingPhone = $('#Bphone1').val();
		localStorage.theShippingPhone = myShippingPhone;
		var myShippingEmail = $('#Bemail1').val();
		localStorage.theShippingEmail = myShippingEmail;
		var myShippingAddress = $('#Baddress1').val();
		localStorage.theShippingAddress = myShippingAddress;
		var myShippingState = $('#Bstate1').val();
		localStorage.theShippingState = myShippingState;
		var myShippingZip = $('#Bzip1').val();
		localStorage.theShippingZip = myShippingZip;
		var myBillingFirstName = $('#Sfname1').val();
		localStorage.theBillingFirstName = myBillingFirstName;
		var myBillingLastName = $('#Slname1').val();
		localStorage.theBillingLastName = myBillingLastName;
		var myBillingPhone = $('#Sphone1').val();
		localStorage.theBillingPhone = myBillingPhone;
		var myBillingEmail = $('#Semail1').val();
		localStorage.theBillingEmail = myBillingEmail;
		var myBillingAddress = $('#Saddress1').val();
		localStorage.theBillingAddress = myBillingAddress;
		var myBillingState = $('#Sstate1').val();
		localStorage.theBillingState = myBillingState;
		var myBillingZip = $('#Szip1').val();
		localStorage.theBillingZip = myBillingZip;
		var myNameCard = $('#cname1').val();
		localStorage.theNameCard = myNameCard;
		var myNumberCard = $('#ccnum1').val();
		localStorage.theNumberCard = myNumberCard;
		var myExpMonth = $('#expmonth1').val();
		localStorage.theExpMonth = myExpMonth;
		var myExpYear = $('#expyear1').val();
		localStorage.theExpYear = myExpYear;
		var myCVV = $('#cvv1').val();
		localStorage.theCVV = myCVV;
	}
	var check = 0;
	var message = document.getElementById("message");
	$("#submitbtn1").click(function(){
		check = 0;
		if($("#Bfname1").val()==="" || $("#Blname1").val()==="" || $("#Bphone1").val()==="" || $("#Bemail1").val()==="" || $("#Baddress1").val()==="" || $("#Bzip1").val()==="" || $("#Sfname1").val()==="" || $("#Slname1").val()==="" || $("#Sphone1").val()==="" || $("#Semail1").val()==="" || $("#Saddress1").val()==="" || $("#Szip1").val()==="" || $("#cname1").val()==="" || $("#ccnum1").val()==="" || $("#expmonth1").val()==="" || $("#expyear1").val()==="" || $("#cvv1").val()===""){
			alert("Please fill out the form!");
			check = 1;
		}
		if($("#Bphone1").val().toString().length !== 10){
			alert("Wrong phone number! Please type again!");
			check = 1;
		}
		if($("#Bzip1").val().toString().length !== 5){
			alert("Wrong zip code! Please type again!");
			check = 1;
		}
		if($("#Sphone1").val().toString().length !== 10){
			alert("Wrong phone number! Please type again!");
			check = 1;
		}
		if($("#Szip1").val().toString().length !== 5){
			alert("Wrong zip code! Please type again!");
			check = 1;
		}
		if($("#ccnum1").val().toString().length !== 16){
			alert("Wrong card number! Please type again!");
			check = 1;
		}
		if($("#expmonth1").val().toString().length !== 2){
			alert("Wrong expire month! Please type again!");
			check = 1;
		}
		if(parseFloat($("#expmonth1").val())>12){
			alert("Month can not larger than 12.");
			check = 1;
		}
		if($("#expyear1").val().toString().length !== 4){
			alert("Wrong expire year! Please type the expire year again1");
			check = 1;
		}
		if(parseFloat($("#expyear1").val())<2020){
			alert("Year should larger than 2019.");
			check = 1;
		}
		if($("#cvv1").val().toString().length !== 3){
			alert("Wrong CVV number! Please type again!");
			check = 1;
		}
		if(check === 0){
			storemyform();
			getMyNote();
			calPayment();
			window.location = "#page4";
		}
		else if(check === 1){
			window.location = "#page3";
		}
	});
	$("#checkout").click(function(){
		modal.style.display = "none";
	});
	function getMyNote(){
		var usertext1 = "";
	//retrieve theFirstName
		if(localStorage.theShippingFirstName){
			usertext1 = localStorage.theShippingFirstName;
		}
		else {
			usertext1 = '';
		}
		$('#Bfname2').val(usertext1);
		//retrieve theLastName
		if(localStorage.theShippingLastName){
			usertext1 = localStorage.theShippingLastName;
		}
		else {
			usertext1 = '';
		}
		$('#Blname2').val(usertext1);
		if(localStorage.theShippingPhone){
			usertext1=localStorage.theShippingPhone;
		}
		else {
			usertext1 = '';
		}
		$('#Bphone2').val(usertext1);
		if(localStorage.theShippingEmail){
			usertext1=localStorage.theShippingEmail;
		}
		else {
			usertext1 = '';
		}
		$('#Bemail2').val(usertext1);
		if(localStorage.theShippingAddress){
			usertext1=localStorage.theShippingAddress;
		}
		else {
			usertext1 = '';
		}
		$('#Baddress2').val(usertext1);
		if(localStorage.theShippingState){
			usertext1=localStorage.theShippingState;
		}
		else {
			usertext1 = '';
		}
		$('#Bstate2').val(usertext1);
		if(localStorage.theShippingZip){
			usertext1=localStorage.theShippingZip;
		}
		else {
			usertext1 = '';
		}
		$('#Bzip2').val(usertext1);
		if(localStorage.theBillingFirstName){
			usertext1=localStorage.theBillingFirstName;
		}
		else {
			usertext1 = '';
		}
		$('#Sfname2').val(usertext1);
		//retrieve theLastName
		if(localStorage.theBillingLastName){
			usertext1=localStorage.theBillingLastName;
		}
		else {
			usertext1 = '';
		}
		$('#Slname2').val(usertext1);
		if(localStorage.theBillingPhone){
			usertext1=localStorage.theBillingPhone;
		}
		else {
			usertext1 = '';
		}
		$('#Sphone2').val(usertext1);
		if(localStorage.theBillingEmail){
			usertext1=localStorage.theBillingEmail;
		}
		else {
			usertext1 = '';
		}
		$('#Semail2').val(usertext1);
		if(localStorage.theBillingAddress){
			usertext1=localStorage.theBillingAddress;
		}
		else {
			usertext1 = '';
		}
		$('#Saddress2').val(usertext1);
		if(localStorage.theBillingState){
			usertext1=localStorage.theBillingState;
		}
		else {
			usertext1 = '';
		}
		$('#Sstate2').val(usertext1);
		if(localStorage.theBillingZip){
			usertext1=localStorage.theBillingZip;
		}
		else {
			usertext1 = '';
		}
		$('#Szip2').val(usertext1);
		if(localStorage.theNameCard){
			usertext1=localStorage.theNameCard;
		}
		else {
			usertext1 = '';
		}
		$('#cname2').val(usertext1);
		if(localStorage.theNumberCard){
			usertext1=localStorage.theNumberCard;
		}
		else {
			usertext1 = '';
		}
		$('#ccnum2').val(usertext1);
		if(localStorage.theExpMonth){
			usertext1=localStorage.theExpMonth;
		}
		else {
			usertext1 = '';
		}
		$('#expmonth2').val(usertext1);
		if(localStorage.theExpYear){
			usertext1=localStorage.theExpYear;
		}
		else {
			usertext1 = '';
		}
		$('#expyear2').val(usertext1);
		if(localStorage.theCVV){
			usertext1=localStorage.theCVV;
		}
		else {
			usertext1 = '';
		}
		$('#cvv2').val(usertext1);
	
	}
	$("#submitbtn2").click(function(){
		message.innerHTML = "";
		getOldData();
	});
	function calPayment(){
		var costs = carts;
		for(var i=0; i<costs.length-1; i++){
			costs[i+1].price = parseFloat(costs[i].price) + parseFloat(costs[i+1].price);
		}
		var totalPrice = parseFloat(costs[costs.length-1].price);
		var tax = 0;
		var shipping = 10;
		var totalCost = 0;
		tax = (parseFloat(totalPrice)*0.09).toFixed(2);
		totalCost = parseFloat(totalPrice) + parseFloat(tax) + parseFloat(shipping);
		document.getElementById("Price").innerHTML = "Total Price: $" + totalPrice + "<br>" + "<br>";
		document.getElementById("Tax").innerHTML = "Tax: $" + tax + "<br>" + "<br>";
		document.getElementById("Shipping").innerHTML = "Shipping Cost: $" + shipping + "<br>" + "<br>";
		document.getElementById("Cost").innerHTML = "Total Cost: $" + totalCost + "<br>" + "<br>";
	}
});
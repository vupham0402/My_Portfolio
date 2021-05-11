var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.rect(0, 0, 1500, 1500);
ctx.fillStyle = "red";
ctx.fill();

google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
function drawChart() {

var productString = "[";
for (var i=0; i<products.length; i++)
	{productString += "['"+products[i].type+"',"+products[i].amount+"],";}
	productString = productString.substring(0, productString.length-1)+"]";
var data = new google.visualization.DataTable();
data.addColumn('string', 'Inventory by Product');
data.addColumn('number', 'In stock:');
data.addRows(eval(productString));

// Set chart options
var options = {'title':'Inventory by Product',
			   'width':500,
			   'height':400,
			   'backgroundColor': "transparent",
			   'titleTextStyle': {color: '#FFF9F9',
								  fontSize: 18},
			   'legend': {textStyle:{color: '#FFF9F9',
									 fontSize: 14}}};

// Draw the chart using the data and options
var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
chart.draw(data, options);

var typeString = "";
var countApple =0;
var countSamsung = 0;
var countGoogle = 0;
for (var i=0; i<products.length; i++){ 
	expression = products[i].brand;
	switch(products[i].brand){
		case "Apple":
			countApple++;
			break;
		case "Samsung":
			countSamsung++;
			break;
		case "Google":
			countGoogle++;
  	}
}

var typeString="[['Apple',"+countApple+"],['Samsung',"+countSamsung+"],['Google',"+countGoogle+"]]";
var data = new google.visualization.DataTable();
data.addColumn('string', 'Inventory by Brand');
data.addColumn('number', 'In stock:');
data.addRows(eval(typeString));


// Set chart options
var options = {'title':'Inventory by Brand',
			   'width':500,
			   'height':400,
			   'backgroundColor': "transparent",
			   'titleTextStyle': {color: '#FFF9F9',
								  fontSize: 18},
			   'legend': {textStyle:{color: '#FFF9F9',
									 fontSize: 14}}};

// Instantiate and draw our chart, passing in some options.
var chart = new google.visualization.PieChart(document.getElementById('chart_div2'));
chart.draw(data, options);	
}

google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawChart1);



function drawChart1() {
	var arrayChart = [["Product","Large Stock","Medium Stock","Low Stock"]];
	for (var n=0; n<products.length; n++){
		if(products[n].amount > 20){
			arrayChart.push([products[n].type,parseInt(products[n].amount),0,0]);
		}
		else if(products[n].amount > 5 && products[n].amount <= 20){
			arrayChart.push([products[n].type,0,parseInt(products[n].amount),0]);
		}
		else if(products[n].amount >= 1 && products[n].amount <= 5){
			arrayChart.push([products[n].type,0,0,parseInt(products[n].amount)]);
		}
		var data = google.visualization.arrayToDataTable(arrayChart);

		var options = {
			'title': 'Current stock of products',
			'titlePosition': 'center',
			'backgroundColor': "transparent",
			'colors': ['green','yellow','red'],
			'hAxis': {title: 'Product', titleTextStyle: {color: 'white', fontSize: 18},  textStyle:{color: 'orange'}},
			'vAxis': {title: 'Quantity', titleTextStyle: {color: 'white', fontSize: 18},  textStyle:{color: 'orange'}},
			'titleTextStyle': {color: '#FFF9F9',
										  fontSize: 22},
			'legend': {textStyle:{color: '#FFF9F9',
											 fontSize: 18}}
		};

		var chart = new google.charts.Bar(document.getElementById('chart_div3'));

		chart.draw(data, google.charts.Bar.convertOptions(options));
	}
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawchart2);

function drawchart2(){
	var arrayChart1 = [["Product","Sales","Original Stock"]];
	for(var u=0; u<sales.length; u++){
		for(var v=0; v<products.length; v++){
			if(sales[u].type === products[v].type){
				arrayChart1.push([sales[u].type,parseInt(sales[u].amount),parseInt(products[v].origin)]);
			}
		}
	}
	var data = google.visualization.arrayToDataTable(arrayChart1);
	var options = {
		width: 600,
		height: 400,
		title: 'Product Performance',
		hAxis: {title: 'Product',  titleTextStyle: {color: '#333'}},
		vAxis: {minValue: 0}
	  };
	var chart = new google.visualization.AreaChart(document.getElementById('chart_div4'));

	chart.draw(data, options);
}

// declare variables
// answer is the div that holds the list
var a = document.getElementById("answer");
// products is the array that hold all of the information
var products = [];
// selectBrand sets the Brand in the form
var selectBrand = document.getElementById('selectBrand');
// typeText holds the brand type
var typeText = document.getElementById('Secondary');
// amountText holds the quantity input
var amountText = document.getElementById('inputQuantity');
// sortBy holds the current sort for use in displaylist
var sortBy = "Type";
var flag = 0;
var amounts = [];
//var inputamount = [];
// iTitle is used to change the title of the inventory list
var iTitle=document.getElementById('inventoryTitle');
// set the default title for the inventory list
iTitle.innerHTML="Current Inventory (unsorted):";

// Main Product constructor
function Product(brand, type, amount, origin) {	
	this.brand = brand;
	this.type = type;
	this.amount = amount;
	this.origin = origin;
}
// Read the form into the array
function getFromForm()
{ 
   
	var formBrand = selectBrand.value;
	// get the type and convert the first letter to an upper case letter
	var formType = typeText.value;
	// get the quantity and covert it to a number so the sort will work correctly
	var formAmount = Number(amountText.value);
	var amount = formAmount;
	// check to see if the brand already exists, if it does erase it!
	for (var i=0; i<products.length; i++)
		{
			if((products[i].brand == formBrand) && (products[i].type == formType))
			{
				amount = formAmount + products[i].amount;
				products.splice(i,1);
			}
		}
	// if the amount is not 0, then add the brand into the array
	if (formAmount !=0)
	{
		var newProduct = new Product(formBrand,formType,amount,formAmount);
		products.push(newProduct);
		// resort the array by Type
		products.sort(sortByBrand);
		products.sort(sortByType);
	}
	// clear the form	
	selectBrand.options[0].selected = true;
	typeText.options[0].selected = true;
	amountText.value = "";
	mySecondary.disabled = true;
	// display the current inventory
	displayList();
	drawChart();
	drawChart1();
}

function typeSort(){
	sortBy="Type";
	iTitle.innerHTML="Current Inventory sorted by Product:"
	products.sort(sortByBrand);
	products.sort(sortByType);
	displayList();
}
function brandSort(){
	sortBy="Brand";
	iTitle.innerHTML="Current Inventory sorted by Brand:"
	products.sort(sortByType);
	products.sort(sortByBrand);
	displayList();
}
function amountSort(){
	sortBy="Amount";
	iTitle.innerHTML="Current Inventory sorted by Quantity:"
    products.sort(sortByBrand);
	products.sort(sortByAmount);	
	displayList();
}
function typeSort1(){
	sortBy="Type";
	sales.sort(sortByBrand);
	sales.sort(sortByType);
	displayTodaySale();
}
function brandSort1(){
	sortBy="Brand";
	sales.sort(sortByType);
	sales.sort(sortByBrand);
	displayTodaySale();
}
function amountSort1(){
	sortBy="Amount";
    sales.sort(sortByBrand);
	sales.sort(sortByAmount);	
	displayTodaySale();
}

// sort by type
function sortByType(product1, product2) {
	if(product1.type > product2.type) { return 1;}
	else if (product1.type === product2.type){ return 0;}
	else { return -1;}
}
// sort by brand
function sortByBrand(product1, product2) {
	if(product1.brand > product2.brand) { return 1;}
	else if (product1.brand === product2.brand){ return 0;}
	else { return -1;}
}
// sort by quantity
function sortByAmount(product1, product2) {
	if(product1.amount > product2.amount) { return 1;}
	else if (product1.amount === product2.amount){ return 0;}
	else { return -1;}
}

function displayList(){

	a.innerHTML="";
	switch (sortBy){
		case "Type":
		a.innerHTML +='<div class=tabtitle>Button</div><div class=tabtitle>Product</div><div class=tabtitle>Brand</div><div class=tabtitle>Amount</div><div class=clearIt><br>';
		break;
		case "Brand":
		a.innerHTML +='<div class=tabtitle>Button</div><div class=tabtitle>Brand</div><div class=tabtitle>Product</div><div class=tabtitle>Amount</div><div class=clearIt><br>';
		break;
		case "Amount":
		a.innerHTML +='<div class=tabtitle>Button</div><div class=tabtitle>Amount</div><div class=tabtitle>Brand</div><div class=tabtitle>Product</div><div class=clearIt><br>';
		break;
	}
	for (var i=0; i<products.length; i++){
		switch (sortBy){
			case "Type":
				{ 
				 a.innerHTML +='<div class=tabs><input type="button" name='+i+' value="Delete All" onClick="deleteAll(name)"><input class="numInput" type="number" name='+i+' value="0"><input type="button" name='+i+' value="Adjust Amount" onClick="deleteOne(name)"></div>'+ '<div class=tabs>'+products[i].type +'</div><div class=tabs>'+products[i].brand +'</div><div class=tabs>'+products[i].amount +'</div>'+'<div class=clearIt><br>';
				 products.sort(sortByType);}
			break;
			case "Brand":
				{a.innerHTML +='<div class=tabs><input type="button" name='+i+' value="Delete All" onClick="deleteAll(name)"><input class="numInput" type="number" name='+i+' value="0"><input type="button" name='+i+' value="Adjust Amount" onClick="deleteOne(name)"></div>'+ '<div class=tabs>'+products[i].brand +'</div><div class=tabs>'+products[i].type +'</div><div class=tabs>'+products[i].amount +'</div>'+'<div class=clearIt><br>';
				 products.sort(sortByBrand);}
			break;

			case "Amount":
				 {a.innerHTML +='<div class=tabs><input type="button" name='+i+' value="Delete All" onClick="deleteAll(name)"><input class="numInput" type="number" name='+i+' value="0"><input type="button" name='+i+' value="Adjust Amount" onClick="deleteOne(name)"></div>'+ '<div class=tabs>'+products[i].amount +'</div><div class=tabs>'+products[i].brand +'</div><div class=tabs>'+products[i].type +'</div>'+'<div class=clearIt><br>';
				  products.sort(sortByAmount);}
			break;
		}
	}
}
function deleteAll(which){
    products.splice(which,1);
    typeSort();
    displayList();
    drawChart();
	drawChart1();
}
var sales = [];
function deleteOne(which){
	var numAmount = document.getElementsByClassName("numInput");
	if(Number(numAmount[which].value)<0){
		var newSale = new Product(products[which].brand,products[which].type,Number(numAmount[which].value)*(-1),products[which].amount);
		sales.push(newSale);
		for(var t=0; t<sales.length-1; t++){
			if(sales[sales.length-1].brand == sales[t].brand){
				sales[t].amount += sales[sales.length-1].amount;
				sales.splice(sales.length-1,1);
			}
		}
	}
	displayTodaySale();
	drawchart2();
    if(products[which].amount >1){
		products[which].amount = products[which].amount + Number(numAmount[which].value);
		displayList();
		drawChart();
		drawChart1();
		for (var i=0; i<products.length; i++){
			if(products[i].amount<=5){
				window.notificationService.notify({

					// title
					title: 'Warning!',
					// notification message
					text: 'We have the low-stock product. Please see the chart below!',

					// 'success', 'warning', 'error'
					type: 'error',

					// 'top-right', 'bottom-right', 'top-left', 'bottom-left'
					position: 'top-center',

					// auto close
					autoClose: true,

					// 5 seconds
					duration: 10000,
					// shows close button
					showRemoveButton: true

					}
				)
				var m = 0;
				var n = 0;
				var effect1 = setInterval(function(){
							document.getElementById("myCanvas").style.opacity = 0.5;
							m++;
							if(m == 5){
								clearInterval(effect1);
							}
							},1000);
				var effect2 = setInterval(function(){
							n++;
							document.getElementById("myCanvas").style.opacity = 0.01;
							if(n == 5){
								clearInterval(effect1);
							}
							},2000);
			}	
		}
	}
    else {deleteAll(which);}
}
function deleteAll1(which){
    products.splice(which,1);
    typeSort();
	if(flag == 0){
		displayListFilter();	
	}
    //displayList();
    drawChart();
	drawChart1();
}
function deleteOne1(which){
	var amount = 0;
	var m = 0;
	var numAmount = document.getElementsByClassName("numInput");
	while(m<numAmount.length){
		amount += Number(numAmount[m].value)*(-1);
		if(Number(numAmount[m].value)<0){
			var newSale = new Product(products[which].type,products[which].brand,Number(amount),products[which].amount);
			sales.push(newSale);
			for(var t=0; t<sales.length-1; t++){
				if(sales[sales.length-1].brand == sales[t].brand){
					sales[t].amount += sales[sales.length-1].amount;
					sales.splice(sales.length-1,1);
				}
			}
			break;
		}
		m++;
	}
	displayTodaySale();
	drawchart2();
    if(products[which].amount >1){
	for(var i=0; i<numAmount.length; i++){
		products[which].amount = products[which].amount + Number(numAmount[i].value);
	}
	if(flag == 0){
		displayListFilter();	
	}
	//displayList();
    drawChart();
	drawChart1();
	for (var t=0; t<products.length; t++){
		if(products[t].amount<=10){
			window.notificationService.notify({

				// title
				title: 'Warning!',
				// notification message
				text: 'We have the low-stock product. Please see the chart below!',

				// 'success', 'warning', 'error'
				type: 'error',

				// 'top-right', 'bottom-right', 'top-left', 'bottom-left'
				position: 'top-center',

				// auto close
				autoClose: true,

				// 5 seconds
				duration: 10000,
				// shows close button
				showRemoveButton: true

				}
			)
			var m = 0;
			var n = 0;
			var effect1 = setInterval(function(){
    					document.getElementById("myCanvas").style.opacity = 0.5;
						m++;
						if(m == 5){
							clearInterval(effect1);
						}
 						},1000);
	    	var effect2 = setInterval(function(){
						n++;
    					document.getElementById("myCanvas").style.opacity = 0.01;
						if(n == 5){
							clearInterval(effect1);
						}
 						},2000);
		}	
	}
}
    else {deleteAll(which);}
}
	  
function displayListFilter(){
	var filterBrand = document.getElementById("filterBrand").value;
	a.innerHTML="";
	switch (sortBy){
		case "Type":
		a.innerHTML +='<div class=tabtitle>Button</div><div class=tabtitle>Product</div><div class=tabtitle>Brand</div><div class=tabtitle>Amount</div><div class=clearIt><br>';

		break;
		case "Brand":
		a.innerHTML +='<div class=tabtitle>Button</div><div class=tabtitle>Brand</div><div class=tabtitle>Product</div><div class=tabtitle>Amount</div><div class=clearIt><br>';
		break;
		case "Amount":
		a.innerHTML +='<div class=tabtitle>Button</div><div class=tabtitle>Amount</div><div class=tabtitle>Brand</div><div class=tabtitle>Product</div><div class=clearIt><br>';
		break;
	}
	for (var i=0; i<products.length; i++){
		if (products[i].brand == filterBrand){
			switch (sortBy){
				case "Type":
					{ 
					 a.innerHTML +='<div class=tabs><input type="button" name='+i+' value="Delete All" onClick="deleteAll(name)"><input class="numInput" type="number" name='+i+' value="0"><input type="button" name='+i+' value="Adjust Amount" onClick="deleteOne(name)"></div>'+ '<div class=tabs>'+products[i].type +'</div><div class=tabs>'+products[i].brand +'</div><div class=tabs>'+products[i].amount +'</div>'+'<div class=clearIt><br>';
					 products.sort(sortByType);}
				break;
				case "Brand":
					{a.innerHTML +='<div class=tabs><input type="button" name='+i+' value="Delete All" onClick="deleteAll(name)"><input class="numInput" type="number" name='+i+' value="0"><input type="button" name='+i+' value="Adjust Amount" onClick="deleteOne(name)"></div>'+ '<div class=tabs>'+products[i].brand +'</div><div class=tabs>'+products[i].type +'</div><div class=tabs>'+products[i].amount +'</div>'+'<div class=clearIt><br>';
					 products.sort(sortByBrand);}
				break;

				case "Amount":
					 {a.innerHTML +='<div class=tabs><input type="button" name='+i+' value="Delete All" onClick="deleteAll(name)"><input class="numInput" type="number" name='+i+' value="0"><input type="button" name='+i+' value="Adjust Amount" onClick="deleteOne(name)"></div>'+ '<div class=tabs>'+products[i].amount +'</div><div class=tabs>'+products[i].brand +'</div><div class=tabs>'+products[i].type +'</div>'+'<div class=clearIt><br>';
					  products.sort(sortByAmount);}
				break;
			}
		}
	}
}
var btn1 = document.getElementById("filterUndo");	  
btn1.onclick = function(){
	document.getElementById("filterBrand").selectedIndex = 0;
	displayList();
	products.sort(sortByBrand);
}
var myMain = document.getElementById("selectBrand");
var mySecondary = document.getElementById("Secondary");
var valueFromMain = 0;
var seconddaryArray = [];
	
function PopulateSecondary(){
	//first clear out mySecondary:
	for(var i=mySecondary.options.length-1;i>=1;i--){
		mySecondary.remove(i);
	}
	//get choice from myMain
	valueFromMain = myMain.value;
	// var secondaryArray=[]
	switch(valueFromMain){
		case "Apple":
			secondaryArray=[{name:"Iphone 7",value:"Iphone 7"},{name:"Iphone 7+",value:"Iphone 7+"},{name:"Iphone 8",value:"Iphone 8"},{name:"Iphone 8+",value:"Iphone 8+"},{name:"Iphone X",value:"Iphone X"}];
			break;
		case "Samsung":
			secondaryArray=[{name:"Galaxy S7",value:"Galaxy S7"},{name:"Galaxy S8",value:"Galaxy S8"},{name:"Galaxy S9",value:"Galaxy S9"},{name:"Galaxy S10",value:"Galaxy S10"}];
			break;
		case "Google":
			secondaryArray=[{name:"Pixel 2",value:"Pixel 2"},{name:"Pixel 3",value:"Pixel 3"},{name:"Pixel 4",value:"Pixel 4"}];
			break;
	}
	for(var i=0;i<secondaryArray.length;i++){
		//populate second drop down
		var dropItem = document.createElement("option");
		dropItem.textContent = secondaryArray[i].name;
		dropItem.value = secondaryArray[i].value;
		mySecondary.appendChild(dropItem);
	}
	mySecondary.disabled = false;
}
	
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn10 = document.getElementById('buttonSale');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn10.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
	modal.style.display = "none";
  }
}
var b = document.getElementById("modal-body-content");
function displayTodaySale(){
	if(sales.length>0){
		b.innerHTML="";
		switch (sortBy){
			case "Type":
			b.innerHTML +='<div class=tabtitle>Product</div><div class=tabtitle>Brand</div><div class=tabtitle>Amount</div><div class=clearIt><br>';
			break;
			case "Brand":
			b.innerHTML +='<div class=tabtitle>Brand</div><div class=tabtitle>Product</div><div class=tabtitle>Amount</div><div class=clearIt><br>';
			break;
			case "Amount":
			b.innerHTML +='<div class=tabtitle>Amount</div><div class=tabtitle>Brand</div><div class=tabtitle>Product</div><div class=clearIt><br>';
			break;
		}
		for (var i=0; i<sales.length; i++){
			switch (sortBy){
				case "Type":
					{ 
					 b.innerHTML +='<div class=tabs>'+sales[i].type +'</div><div class=tabs>'+sales[i].brand +'</div><div class=tabs>'+sales[i].amount +'</div>'+'<div class=clearIt><br>';
					sales.sort(sortByType);}
			break;
				case "Brand":
					{b.innerHTML +='<div class=tabs>'+sales[i].brand +'</div><div class=tabs>'+sales[i].type +'</div><div class=tabs>'+sales[i].amount +'</div>'+'<div class=clearIt><br>';
					 sales.sort(sortByBrand);}
				break;

				case "Amount":
					 {b.innerHTML +='<div class=tabs>'+sales[i].amount +'</div><div class=tabs>'+sales[i].brand +'</div><div class=tabs>'+sales[i].type +'</div>'+'<div class=clearIt><br>';
					  sales.sort(sortByAmount);}
				break;
			}
		}
	}
	else{
		b.innerHTML = "We do not sell anything.";
	}	
}
var d = new Date();
document.getElementById("date").innerHTML = d;
function Clear(){
 var r = confirm("Do you want to clear all history sales today?");
 if (r == true) {
	sales.splice(0);
	displayTodaySale();
	drawchart2();
 }
}
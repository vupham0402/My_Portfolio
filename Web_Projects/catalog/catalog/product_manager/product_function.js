var difference = 0;
var savings = 0;	
var total = 0;      
var table = document.getElementById('myTable');
var pro_1 = document.getElementById('myModalTable_1');
var i = 0;
var amount = 0;
var subTotal = 0;
var result = 0;
var temp = 0;
var submit = 1;
var epgpo = 0;
var epgpo_price = 0;


let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    useGrouping: true,
});

$(window).on('load', function(){
    for (var s = 1; s < table.rows.length; s++) {
        epgpo_price = table.rows[s].cells[8].textContent;
        epgpo_price = (epgpo_price.substring(1)).replace(/\,/g,'');
        table.rows[s].cells[9].textContent = Number(epgpo_price)/Number(table.rows[s].cells[7].textContent);
        table.rows[s].cells[9].textContent = (Number(table.rows[s].cells[9].textContent)).toFixed(2);
        table.rows[s].cells[9].textContent = dollarUS.format(table.rows[s].cells[9].textContent);
    }
    if (sessionStorage.getItem('products') !== null) {
        var subs = JSON.parse(sessionStorage.getItem('products'));
        subTotal = 0;
        for (var j = 0; j < subs.length; j++) {
            subTotal = subTotal + Number(subs[j].Savings);
        }
        subTotal = dollarUS.format(subTotal);
        document.getElementById("val").innerHTML = "Total Savings for Product(s) of " + vendor + " = " + subTotal;
    }
    if (sessionStorage.getItem('result') !== null){
        document.getElementById('subTotal').value = sessionStorage.getItem('result');    
    }
});

$(document).keydown(function(objEvent) {
    if (objEvent.keyCode == 9) {  //tab pressed
        objEvent.preventDefault(); // stops its action
    }
});

$("table tr").click(function(){
    table.rows[submit].cells[15].hidden = true;
    i = this.rowIndex;
    submit = i;
    table.rows[i].cells[15].hidden = true;
});

function Calc1(facility) {
    if (event.key === 'Enter'){
        epgpo = ((table.rows[i].cells[8].textContent).substring(1)).replace(/\,/g,'');
        difference = Number(facility.value) - Number(epgpo);
        table.rows[i].cells[11].textContent = difference.toFixed(2);
        savings = (difference/Number(facility.value))*100;
        table.rows[i].cells[12].textContent = savings.toFixed(2) + "%";
        table.rows[i].cells[10].value = facility.value;
        $(".use").removeAttr('disabled');      
    }
}

function Calc2(usage) {
    if (event.key === 'Enter'){
        total = Number(usage.value)*Number(table.rows[i].cells[11].textContent);	
        table.rows[i].cells[13].value = usage.value;
        table.rows[i].cells[14].textContent = total.toFixed(2);
        table.rows[i].cells[15].hidden = false;
    }        
}

function Savings() { 
    var products = [{ID: table.rows[i].cells[0].textContent, SKU: table.rows[i].cells[2].textContent, Desc: table.rows[i].cells[3].textContent, Savings: table.rows[i].cells[14].textContent}];
    if(sessionStorage.getItem('products') !== null) {
        var retrievedPros = JSON.parse(sessionStorage.getItem('products'));
        var flag = 0;
        for (var t = 0; t < retrievedPros.length; t++) {
            if (products[0].ID === retrievedPros[t].ID) {
                retrievedPros[t].Savings = products[0].Savings;
                flag = 1;
            }
        }
        if (flag === 0) {
            retrievedPros.push(products[0]);
            
        }
        sessionStorage.setItem('products', JSON.stringify(retrievedPros));
    }
    else {
        sessionStorage.setItem('products', JSON.stringify(products));
    }
    var subs = JSON.parse(sessionStorage.getItem('products'));
    subTotal = 0;
    pro_1.innerHTML = "<tr>"
                      + "<th>SKU</th>"
                      + "<th>Description</th>"
                      + "<th>Savings</th>"
                      + "</tr>";
    for (var j = 0; j < subs.length; j++) {
        subTotal = Number(subTotal) + Number(subs[j].Savings);
        var t3 = subs[j].Savings;
        t3 = dollarUS.format(Number(t3));
        pro_1.innerHTML += "<tr>" + "<td>" + subs[j].SKU + "</td>" + "<td>" + subs[j].Desc + "</td>" + "<td>" + t3 + "</td>" + "</tr>";
    }
    sessionStorage.setItem('table', pro_1.innerHTML);
    sessionStorage.setItem('result', subTotal);
    document.getElementById('subTotal').value = subTotal;
    subTotal = dollarUS.format(subTotal);
    document.getElementById("val").innerHTML = "Total Savings for Product(s) of " + vendor + " = " + subTotal;
}

function Clear() {
    sessionStorage.removeItem('products');
    sessionStorage.removeItem('table');
    document.getElementById("val").innerHTML = "Savings = 0";
    pro_1.innerHTML = "<tr>"
                      + "<th>SKU</th>"
                      + "<th>Description</th>"
                      + "<th>Savings</th>"
                      + "</tr>";
}

function Reload_1() { 
    window.location.assign("../product_manager/index.php");
}

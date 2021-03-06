$(document).ready( function (){
    var table = $('#myTable').DataTable({
        "searching": true,
        "processing": true,
        "serverSide": true,
        "ajax": "product_manager/show_products.php",
        "columnDefs": [
            {
                "targets": 11,
                "data": 1,
                "mRender": function(data, type, full) {
                    return "<button type='button' class='btn btn-info btn-sm' data-toggle='modal' data-target='#myModal_1' id='"+data+"'>Calculate</button>";
                }
                
            },

            // {
            //     "targets": 10, 
            //     "render": function ( data, type, row ) {
            //         if (sessionStorage.getItem("selected") === 'JOHNSON & JOHNSON VISION' || sessionStorage.getItem("selected") === 'KATENA') {return data = 'N/A';}
            //         else return data;
            //     }
            // },
            // {
            //     "targets": 9, 
            //     "render": function ( data, type, row ) {
            //         if (sessionStorage.getItem("selected") === 'KATENA') {return data = 'N/A';}
            //         else return data;
            //     }
            // },
            // {
            //     "targets": 8, 
            //     "render": function ( data, type, row ) {
            //         if (sessionStorage.getItem("selected") === 'KATENA') {return data = 'N/A';}
            //         else return data;
            //     }
            // },
        ],
        "language": {
            processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '},
        "pageLength": 25
    });
    //handle vendors selection
    var selectedProduct = sessionStorage.getItem("selected");
    $('#vendors').first().find(":selected").removeAttr("selected");
    $('#vendors').find("option").each(function () {
         if ($(this).val() == selectedProduct) {
             $(this).attr("selected", true);
         }
    });
    table.column(0).search(sessionStorage.getItem("selected")).draw();   
    var vendor = $('#vendors').find(":selected").text().trim();
    var img = document.getElementById('img');
    if (vendor === 'Vendors') {
         img.src = '';
         table.column(0).search("").draw();
         table.column(3).search("").draw();
         document.getElementById('mainCategory').value = '';
    }
    else {
         for (var i=0; i<links.length; i++) {
             if (links[i][0] === vendor) {
                 img.src = links[i][1];
             }
         }
    }
    $('#mainCategory').on('change', function(){
         table.column(3).search(this.value).draw();   
     });
    $('#vendors').on('change', function(){
        document.getElementById('formVendor').submit();
        sessionStorage.setItem('selected', $('#vendors').first().val());
    });
    $('#myTable tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        } 
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            document.getElementById('facility').value = "";
            document.getElementById('usage').value = "";
            document.getElementById('difference').value = "";
            document.getElementById('percent').value = "";
            document.getElementById('savings').value = "";
            var data = $('#myTable').DataTable().row('.selected').data();
            document.getElementById('vendor').value = data[0];
            document.getElementById('sku').value = data[1];
            document.getElementById('quantity').value = data[6];
            document.getElementById('tier').getElementsByTagName('option')[0].selected = 'selected';
            document.getElementById('tierPrice').value = data[7];
            var unit = 0;
            unit = Number(document.getElementById('tierPrice').value)/Number(document.getElementById('quantity').value);
            unit = unit.toFixed(2);
            document.getElementById('unit').value = unit;
        }

        // if (sessionStorage.getItem("selected") === 'JOHNSON & JOHNSON VISION') {
        //     $("#tier4").prop('disabled', true);
        // }
        // else if (sessionStorage.getItem("selected") === 'KATENA') {
        //     $("#tier2").prop('disabled', true);
        //     $("#tier3").prop('disabled', true);
        //     $("#tier4").prop('disabled', true);
        // }
        // else {
        //     $("#tier2").prop('disabled', false);
        //     $("#tier3").prop('disabled', false);
        //     $("#tier4").prop('disabled', false);
        // }
    });
});
function Unit() {
    var data = $('#myTable').DataTable().row('.selected').data();
    if (document.getElementById('tier').value === 'tier1') {
        document.getElementById('tierPrice').value = data[7];
    }
    else if (document.getElementById('tier').value === 'tier2') {
        document.getElementById('tierPrice').value = data[8];
    }
    else if (document.getElementById('tier').value === 'tier3') {
        document.getElementById('tierPrice').value = data[9];
    }
    else {
        document.getElementById('tierPrice').value = data[10];
    }
    var unit = 0;
    unit =  Number(document.getElementById('tierPrice').value)/Number(document.getElementById('quantity').value);
    unit = unit.toFixed(2);
    document.getElementById('unit').value = unit;
    if (document.getElementById('tierPrice').value !== '') {
        $("#facility").prop('disabled', false);
    }
    else {
        $("#facility").prop('disabled', true);
    }
}
function Calc1() {
    if (event.key === 'Enter'){
        var facility = document.getElementById('facility').value;
        var difference = 0;
        var percent = 0;
        var tier = document.getElementById('tierPrice').value;
        difference = facility - Number(tier);
        percent = (difference/facility)*100;
        document.getElementById('difference').value = difference.toFixed(2);
        document.getElementById('percent').value = percent.toFixed(2);
        $('#usage').prop('disabled', false);
        $('#usage').focus();
    }
}
function Calc2() {
    if (event.key === 'Enter'){
        // if (document.getElementById('savings').value !== '') {
        //     $("#submit").click()
        // }
        // else {
            var usage = document.getElementById('usage').value;
            var difference = document.getElementById('difference').value; 
            var savings = 0;
            savings = usage * difference;
            document.getElementById('savings').value = savings.toFixed(2);
        // }
        if (document.getElementById('savings').value > 0) {
            document.getElementById('savings').style.color = 'green';
        }
        else if (document.getElementById('savings').value < 0) {
            document.getElementById('savings').style.color = 'red';
        }
    }
}
var array = [];
function Submit() {
    if (document.getElementById('facility').value === '') {
        alert ('Please input Facility Pricing!');
    }
    else if (document.getElementById('usage').value === '') {
        alert ('Please input Annual Usage!');
    }
    else {
        var pro = document.getElementById('myModalTable');
        var pro1 = document.getElementById('myModalTable1');
        let dollarUS = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            useGrouping: true,
        });
        var totalSavings = [{vendor: document.getElementById('vendor').value, sku: document.getElementById('sku').value, savings: document.getElementById('savings').value}];
        if(sessionStorage.getItem('totalSavings') !== null) {
            var retrievedTotal = JSON.parse(sessionStorage.getItem('totalSavings'));
            for (var m = 0; m < retrievedTotal.length; m++) {
                if (totalSavings[0].vendor === retrievedTotal[m].vendor) {
                    if (totalSavings[0].sku === retrievedTotal[m].sku) {
                        retrievedTotal[m].savings = totalSavings[0].savings;
                        break;
                    }
                    else {
                        retrievedTotal.push(totalSavings[0]);
                        break;
                    }
                }
                else {
                    retrievedTotal.push(totalSavings[0]);
                    break;
                }
            }
            sessionStorage.setItem('totalSavings', JSON.stringify(retrievedTotal));
        }
        else {
            sessionStorage.setItem('totalSavings', JSON.stringify(totalSavings));
        }
        var totals = JSON.parse(sessionStorage.getItem('totalSavings'));
        var totalsavings = 0;
        pro.innerHTML = "<tr>"
                          + "<th>Vendor</th>"
                          + "<th>SKU</th>"
                          + "<th>Savings</th>"
                          + "</tr>";
        for (var n = 0; n < totals.length; n++) {
            totalsavings = totalsavings + Number(totals[n].savings);
            pro.innerHTML += "<tr>" + "<td>" + totals[n].vendor + "</td>" + "<td>" + totals[n].sku + "</td>" + "<td>" + totals[n].savings + "</td>" + "</tr>";
        }
        totalsavings = dollarUS.format(totalsavings);
        document.getElementById('totalSavings').innerHTML = 'Total Savings: ' + totalsavings;
        document.getElementById('myModalTable').innerHTML = pro.innerHTML;
        sessionStorage.setItem('modal', pro.innerHTML);
        sessionStorage.setItem('totalsavings', totalsavings);
        
        array.splice(0);
        pro1.innerHTML = "<tr>"
                      + "<th>Vendor</th>"
                      + "<th>Total Savings</th>"
                      + "</tr>";
        for (var u=1; u<vendors.length; u++) {
            var temp = 0;
            var tempVen = 0;
            for (var t=0; t<totals.length; t++) {
                if (vendors[u].value === totals[t].vendor) {
                    temp = temp + Number(totals[t].savings);
                    tempVen = totals[t].vendor;
                }
            }
            if (typeof tempVen === 'string') {
                array.push({vendor: tempVen, totalsavings: temp.toFixed(2)});
            }
        }
        for (var s=0; s<array.length; s++) {
            pro1.innerHTML += "<tr>" + "<td>" + array[s].vendor + "</td>" + "<td>" + array[s].totalsavings + "</td>" + "</tr>";
        }
        document.getElementById('myModalTable1').innerHTML = pro1.innerHTML;
        sessionStorage.setItem('modal1', pro1.innerHTML);
        
        document.getElementById('close').click();    
    }
}

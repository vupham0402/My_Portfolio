<!DOCTYPE html>

<html>

<!-- the head section -->
<head>
    <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WXZ64CV');</script>
<!-- End Google Tag Manager -->
<a href="/catalog/" onclick="removeSession()"><img src="https://vendorslogos.s3.amazonaws.com/EyePro_newlogo.png" alt="eyePro_logo_Main.png" width="30%"></a>
    <link rel="stylesheet" type="text/css"
          href="/catalog/style.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.js"></script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
   <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-4E4Z4P22MH"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', 'G-4E4Z4P22MH');
        
    </script>
</head>
<script>
    $(window).on('load', function(){
        if(sessionStorage.getItem('modal') !== null){
            document.getElementById('myModalTable').innerHTML = sessionStorage.getItem('modal');
        }
        else {
            document.getElementById('myModalTable').innerHTML = '<tr>'
                                                                    +'<th>Vendor</th>'
                                                                    +'<th>SKU</th>'
                                                                    +'<th>Savings</th>'
                                                               +'</tr>';
        }
        if(sessionStorage.getItem('modal1') !== null){
            document.getElementById('myModalTable1').innerHTML = sessionStorage.getItem('modal1');
        }
        else {
            document.getElementById('myModalTable1').innerHTML = '<tr>'
                                                                    +'<th>Vendor</th>'
                                                                    +'<th>Savings</th>'
                                                               +'</tr>';
        }
        if(sessionStorage.getItem('totalsavings') !== null){
            document.getElementById('totalSavings').innerHTML = 'Total Savings: ' + sessionStorage.getItem('totalsavings');
        }
        else {
            document.getElementById('totalSavings').innerHTML = 'Total Savings: $0';
        }
    });
    function removeSession() {
        sessionStorage.clear();
        location.reload();
    }
</script>
<!-- the body section -->
<body>
    <!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WXZ64CV"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<header style="margin-left: -5px; margin-top: -10px;">
    <nav>
        <span id="totalSavings" style="font-size: 40px; font-weight: bold;">Total Savings: $0</span>
        <button style="margin-top: -17px;" type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal1">Savings by Vendors</button>
        <button style="margin-top: -17px;" type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal">Savings by Products
        </button>
        <button style="margin-top: -17px;" class="btn btn-info btn-sm" onclick="removeSession();">Clear</button>
        <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" style="text-align: center; font-weight: 600;">Your Savings by Each Product</h4>
              </div>
              <div class="modal-body">
                  <table id="myModalTable" style="width: 100%; font-size: 14px;">
                    <tr>
                        <th>Vendor</th>
                        <th>SKU</th>
                        <th>Savings</th>
                    </tr>
                 </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
         <div class="modal fade" id="myModal1" role="dialog">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" style="text-align: center; font-weight: 600;">Your Savings by Each Vendor</h4>
              </div>
              <div class="modal-body">
                  <table id="myModalTable1" style="width: 80%; font-size: 14px; margin-left: 70px;">
                    <tr>
                        <th>Vendor</th>
                        <th>Total Savings</th>
                    </tr>
                 </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="myModal2" role="dialog">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" style="text-align: center; font-weight: 600;">Vendor Tiered Pricing Reference</h4>
              </div>
              <div class="modal-body">
                  <table id="myModalTable2" style="width: 100%; font-size: 14px;">
                    <thead style="background-color: #0B84AC; color: white;">
                        <tr>
                            <th>Vendor</th>
                            <th>Access Level/Tier 1</th>
                            <th>Tier 2</th>
                            <th>Tier 3</th>
                            <th>Tier 4</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bausch & Lomb</td>
                            <td><$351,000 annual spend</td>
                            <td>$351,001-700,000</td>
                            <td>$701,001-1,050,000</td>
                            <td>$1,051,000+</td>
                        </tr>
                        <tr>
                            <td>BioTissue</td>
                            <td><$30,000 annual spend</td>
                            <td>$30,001-99,999</td>
                            <td>$100,000+</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td>BVI</td>
                            <td>All</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td>Case Medical</td>
                            <td><$24,000 annual spend</td>
                            <td>$24,001+</td>
                            <td>N/A</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td>CorneaGen</td>
                            <td>All</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td>EyePoint</td>
                            <td>All</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td>Fagron</td>
                            <td>All</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td>Glaukos<sup>1</sup></td>
                            <td>Local Pricing Applies + Rebate</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td>J&J Vision</td>
                            <td>No letter of commitment</td>
                            <td>50% Committed</td>
                            <td>70% Committed</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td>Katena</td>
                            <td>All</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td>Medline</td>
                            <td colspan="4" style="text-align: center;">Individual item pricing established based review of volume.</td>
                        </tr>
                        <tr>
                            <td>Pine Pharmaceuticals</td>
                            <td>All</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td>Sight Sciences<sup>2</sup></td>
                            <td>All</td>
                            <td>See note</td>
                            <td>See note</td>
                            <td>N/A</td>
                        </tr>
                    </tbody>
                 </table><br>
                  <p style="font-size: 14px;"><sup>1</sup>For Glaukos, local area agreement pricing applies. EyeProGPO provides all members a rebate for each product 
purchased.</p>
                  <p style="font-size: 14px;"><sup>2</sup>For Sight Sciences, tier 2 and 3 pricing becomes available when the aggregate number units purchased by all 
members reaches an established threshold.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    </nav>
</header>

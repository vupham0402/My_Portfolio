<!DOCTYPE html>

<html>

<!-- the head section -->
<head>
<a href="/catalog/" onclick="clearSession();"><img src="https://vendorslogos.s3.amazonaws.com/eyePro_logo_Main.png" alt="eyePro_logo_Main.png" style="margin-left: 22px;"></a>
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
        if(sessionStorage.getItem('totalsavings') !== null){
            document.getElementById('totalSavings').innerHTML = 'Total Savings: ' + sessionStorage.getItem('totalsavings');
        }
        else {
            document.getElementById('totalSavings').innerHTML = 'Total Savings: $0';
        }
    });
    function clearSession() {
        sessionStorage.removeItem('selected');
    }
</script>
<!-- the body section -->
<body>
<header style="margin-left: -5px;">
    <nav>
        <span id="totalSavings" style="font-size: 40px; font-weight: bold;">Total Savings: $0</span>
        <button style="margin-top: -17px;" type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal">Savings by Vendors
        </button>
        <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Your Savings</h4>
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
        <button style="margin-top: -17px;" class="btn btn-info btn-sm"><a id="clear" href="." style="text-decoration: none; color: linen; font-weight: 600;" onclick="sessionStorage.clear();">Clear</a>
        </button>
    </nav>
    <p style="font-size: 16px;">The following information is governed by the confidentiality terms and conditions of your EyeProGPO NDA and/or membership agreement and may not be shared with other vendors, third parties, or non-EyeProGPO partners.</p>
</header>

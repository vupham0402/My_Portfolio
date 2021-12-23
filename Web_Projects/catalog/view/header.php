<!DOCTYPE html>

<html>

<!-- the head section -->
<head>
<img src="https://static.wixstatic.com/media/22ddb3_dbdab1e0b7764a0baf5dfd36c608f40b~mv2.png/v1/fill/w_420,h_87,al_c,q_85,usm_0.66_1.00_0.01/eyePro_logo_Main.webp" width="25%" height="25%"alt="eyePro_logo_Main.png" style="padding: 20px;">
    <link rel="stylesheet" type="text/css"
          href="/catalog/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script type="text/javascript" src="../catalog/jquery.sticky.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<script>
    $(window).on('load', function(){
        $("#header").sticky({ topSpacing: 0 });
    });
</script>
<!-- the body section -->
<body>
<header id="header">
    <h1>EyeProGPO Product Portfolio</h1>
    <p>The following information is governed by the confidentiality terms and conditions of your EyeProGPO NDA and/or membership agreement and may not be shared with other vendors, third parties, or non-EyeProGPO partners.</p>
    <nav>
        <ul>
            <li><a href="/catalog/" style="font-size: 30px;">Home</a></li>
        </ul>
        <span id="totalSavings" style="font-size: 40px; font-weight: bold;">Total Savings: $<?php echo $_SESSION['totalSavings'];?></span>
        <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal">Savings by Vendors</button>
        <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Your Products</h4>
              </div>
              <div class="modal-body">
                  <table id="myModalTable" style="width: 220px;">
                    <tr>
                        <th>Vendor</th>
                        <th>Savings</th>
                    </tr>
                    <?php foreach ($_SESSION['history'] as $saving) : ?>
                   
                    <tr>
                        <td><?php echo $saving['vendor']; ?></td>
                        <td>
                            <?php  
                                $sub = $saving['subtotal'];
                                $dollar = '$';
                                $sub = number_format($sub, 2,'.', ',');
                                $sub = $dollar . $sub;
                                echo $sub; 
                            ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                 </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <button><a id="clear" href=".?action=end_session" style="text-decoration: none; color: black; font-weight: normal;" onclick="sessionStorage.clear();">Clear</a></button>
        <span>(Please click Clear button to start over)</span>
    </nav>
</header>

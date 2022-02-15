<?php
    //error_reporting(0);
    $lifetime = time() + 57600;
    session_set_cookie_params($lifetime);
    session_start();
    if ($_SESSION['access'] !== "eyeprogpo") {
        echo("<script>window.location.replace('https://catalog.eyeprogpo.com/catalog/login.php')</script>");
    }
?>
<?php
include 'function.php';
?>
<?php 
    include 'view/header.php'; 
?>
<script>var links = <?php echo json_encode($links); ?>;</script>
<script type="text/javascript" src="function.js"></script>
<main>
    <div id="header" style="margin-left: -33px;">
        <nav style="margin-left: 35px;"> 
            <form action="." method="post" id="formVendor" style="display: inline-block;"s>
                <input class="btn btn-info btn-sm" type="hidden" name="action" value="vendorOnChange"/>
                <select id="vendors" name="vendor" style="font-size: 14px;">
                    <option value="">Vendors</option>
                    <?php foreach ( $vendors as $vendor ) : ?>
                    <option value="<?php echo htmlspecialchars($vendor['vendor']); ?>">
                        <?php echo htmlspecialchars($vendor['vendor']); ?>
                    </option>
                    <?php endforeach; ?>
                </select>
            </form>
            <select id="mainCategory" style="font-size: 14px;">
                <option value="">Categories</option>
                <?php foreach ( $categories as $category ) : ?>
                <option value="<?php echo htmlspecialchars($category['category']); ?>">
                    <?php echo htmlspecialchars($category['category']); ?>
                </option>
                <?php endforeach; ?>
            </select>
            <br><br>
            <img id="img">
        </nav>
    </div>
    <p id="text" style="font-size: 18px; padding-left: 700px; visibility: hidden;">Local area agreement pricing applies.</p>
    <section style="width: 90%;">
        <br>
        <div id="selection"></div>
        <table id="myTable" class="table" style="width: 100%;">
            <thead>
                <tr style="color: white;">
                    <th>Vendor</th>
                    <th>SKU</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Sub-Category</th>
                    <th>UoM</th>
                    <th>Qty</th>
                    <th>Tier 1</th>
                    <th>Tier 2</th>
                    <th>Tier 3</th>
                    <th>Tier 4</th>
                    <th></th>
                </tr>
            </thead>
        </table>

    </section>
    <div class="modal fade" id="myModal_1" role="dialog" style="text-align: center;">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h3 class="modal-title" style="text-align: center; text-decoration: underline;">Savings Calculator</h3>
            </div>
            <div class="modal-body">
                <form>  
                    <div class="calculator">
                        <div class="group">
                            <label>Vendor</label><br>
                            <input type="text" disabled id="vendor" class="textBox"><br>
                        </div>
                        <div class="group">
                            <label>SKU</label><br>
                            <input type="text" disabled id="sku" class="textBox"><br> 
                        </div>
                        <div class="group">
                            <label>Quantity</label><br>
                            <input type="number" disabled id="quantity" class="textBox"><br>
                        </div>
                        <div class="group">
                            <label>Tier Pricing</label><br>
                            <select id='tier' onchange="Unit();">
                                <option value="tier1">Tier 1</option>
                                <option value="tier2">Tier 2</option>
                                <option value="tier3">Tier 3</option>
                                <option value="tier4" id='tier4'>Tier 4</option>
                            </select>
                            <input type="number" disabled id="tierPrice" style="width: 50%;" class="textBox"><br>
                        </div>
                        <div class="group">
                            <label>Tier Pricing per Unit</label><br>
                            <input type="number" disabled id="unit" class="textBox">
                        </div>
                        <hr style="border-top-color: black;">      
                        <div class="group">
                            <label>Facility Pricing</label>
                            <input class="textBox" onkeydown="Calc1();" type="number" step="0.01" required id="facility">
                        </div>
                        <div class="group">
                            <label>Annual Usage</label>
                            <input class="textBox" disabled onkeydown="Calc2();" type="number" step="0.01" required id="usage"> 
                        </div>
                        <div class="group">
                            <label>Difference</label>
                            <input type="number" disabled id="difference" class="textBox">   
                        </div>
                        <div class="group">
                            <label>% Savings</label>
                            <input type="number" disabled id="percent" class="textBox">  
                        </div>
                        <div class="group">
                            <label>Total Savings</label>
                            <input type="number" disabled id="savings" class="textBox" style="font-weight: 600;">
                        </div>
                    </div>        
                </form>
            </div>
          <div class="modal-footer">
            <button onclick="Submit();" id="submit" type="button" class="btn btn-default">Submit</button>
            <button id="close" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
</main>
<?php 
    if($_POST['vendor'] === 'GLAUKOS') {
        echo "<script>document.getElementById('text').style.visibility = 'visible';</script>";
    }
?>
<?php include 'view/footer.php'; ?>

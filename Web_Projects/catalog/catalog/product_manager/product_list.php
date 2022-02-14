<?php
    error_reporting(0);
    session_set_cookie_params(0);
    session_start();
    if ($_SESSION['access'] !== 1) {
        echo("<script>window.location.replace('https://catalog.eyeprogpo.com/catalog/login.php')</script>");
    }
?>
<?php include '../view/header.php'; ?>
<script type="text/javascript" src="jquery.sticky.js"></script>
<script>
    $(window).on('load', function(){
        $("#main_header").sticky({ topSpacing: 172 });
        if(sessionStorage.getItem('table') !== null){
            document.getElementById('myModalTable_1').innerHTML = sessionStorage.getItem('table');
        }
    });
</script>

<main>
    <div id='main_header'>
        <h1>Product List</h1>
        <nav>
            <form action="." method="get" id="description_1">
            <input type="hidden" name="action" value="description_1">
            <input type="text" name="search_1" />
            <input type="submit" value="Search by SKU or Description" />
            </form><br>
            <button onclick="Reload_1();">Reload</button>
            <span>(Please click Reload button to show all products of the vendor)</span><br><br>
            <span>Please input number without comma and click Enter key after input each value!!!</span><br><br>
            <form action="." method="post" id="subtotal">
                <input type="hidden" name="action" value="subtotal">
                <input type="text" id="subTotal" name="subTotal" style="display: none">
                <span id="val">Savings = 0</span>
                <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal_1">Savings by Products</button>
                <input type="submit" value="Submit"/>
                <span>(Please click Submit button to see the change of Total Savings)</span>
            </form>
            <button onclick="Clear();">Clear</button>
             <span>Note: (Please click Clear button if you Refresh the page)</span>
            <br>
            <br>
        </nav>
    </div>
        <!-- Modal -->
    <div class="modal fade" id="myModal_1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Your Products</h4>
            </div>
            <div class="modal-body">
                <table id="myModalTable_1" style="width: 800px;">
                    <tr>
                        <th>SKU</th>
                        <th>Description</th>
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
    <?php
            $string1 = $_SERVER['REQUEST_URI'];
            $string1 = substr($string1, -1);
            $previous = $string1 - 1; 
            if ($previous === 0){
                $previous = 1;
            }
        ?>
    <a href='<?php echo "?page=$previous"; ?>' style="font-size: 20px; margin-left: 35%"><?php echo 'Back'; ?></a>    
    <?php 
        $total_pages = $pages;
        for ($page=1; $page <= $total_pages ; $page++):?> 
            <a href='<?php echo "?page=$page"; ?>' style="font-size: 30px; "><?php  echo $page; ?></a>
    <?php endfor; ?>
        
        <?php
            $string2 = $_SERVER['REQUEST_URI'];
            $string2 = substr($string2, -1);
            $next = $string2 + 1; 
             if ($next === 6){
                $next = 5;
            }
        ?>
    <a href='<?php echo "?page=$next"; ?>' style="font-size: 20px; "><?php echo 'Next'; ?></a>
    <section>
        <table id="myTable">
            <tr>
                <th hidden>ID</th>
                <th>Vendor</th>
                <th>SKU</th>
                <th>Description</th>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>UoM</th>
                <th>UoM Qty</th>
                <th>EyeProGPO Pricing</th>
                <th>Price per Quantity</th>
                <th>Facility Pricing ($)</th>
                <th>Difference ($)</th>
                <th>% Savings</th>
                <th>Annual Usage</th>
                <th>Savings ($)</th>
            </tr>
            <?php foreach ($products as $product) : ?>
            <tr>
                <td hidden><?php echo $product['ID']; ?></td>
                <td><?php echo $product['vendor']; ?></td>
                <td><?php echo $product['SKU']; ?></td>
                <td><?php echo $product['description']; ?></td>
                <td><?php echo $product['category']; ?></td>
                <td><?php echo $product['sub_category']; ?></td>
                <td><?php echo $product['UoM']; ?></td>
                <td><?php echo $product['UoM_Qty']; ?></td>
                <td id="pricing"><?php echo $product['price']; ?></td>
                <td><input type="number" id="perPrice" step="0.01" style="width: 100px !important; font-weight: bold;"></td>
                <td><input onkeydown="Calc1(this);" type="number" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="facility" step="0.01" style="width: 100px !important; font-size: 15px;"</td>
                <td><input type="number" id="difference" step="0.01" style="width: 100px !important; font-weight: bold;" disabled></td>
                <td><input type="number" id="savings" step="0.01" style="width: 100px !important; font-weight: bold;" disabled></td>
                <td><input onkeydown="Calc2(this);" type="number" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" class= "use" id="usage" step="0.01" style="width: 100px !important; font-size: 15px;" disabled></td>
                <td><input type="number" id="total" step="0.01" style="width: 100px !important; font-weight: bold;" disabled></td>
                <td hidden><button onclick="Savings();"  class="save">Submit</button></td>
            </tr>
            <?php endforeach; ?>
        </table>
    </section>
    <script>var vendor = "<?php echo $_SESSION['vendor']; ?>";</script>
    <script src="product_function.js"></script>
</main>

<?php include '../view/footer.php'; ?>
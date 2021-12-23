<?php
    error_reporting(0);
    session_set_cookie_params(0);
    session_start();
    if ($_SESSION['access'] !== 1) {
        echo("<script>window.location.replace('https://catalog.eyeprogpo.com/catalog/login.php')</script>");
    }
?>
<?php
    include 'function.php';
?>

<?php 
    include 'view/header.php'; 
?>

<main>
    <nav> 
    <h2>Vendors</h2>
    <form action="." method="post" id="vendorImg_search">
        <input type="hidden" name="action" value="vendorImg_search">
        <select name="vendors">
            <option value="0">Select</option>
            <?php foreach ( $vendors as $vendor ) : ?>
            <option value="<?php echo htmlspecialchars($vendor['vendor']); ?>">
                <?php echo htmlspecialchars($vendor['vendor']); ?>
            </option>
            <?php endforeach; ?>
        </select>
        <input type="submit" value="Choose" />
        <span>(Please choose Select to show all products from all vendors)</span>
        <br><br>
    </form>
    <form action="." method="get" id="description">
        <input type="hidden" name="action" value="description">
        <input type="text" name="search" />
        <input type="submit" value="Search by SKU or Description" /><br><br>
    </form>
    <img id="img">
    <p></p>
    <a onclick="Clear_Storage();" id="nav" href="../catalog/product_manager/index.php" hidden style="font-size: 30px;">See Pricing</a><br><br>
    </nav>
    <section>
        <table id="myTable">
            <tr>
                <th>Vendor</th>
                <th>SKU</th>
                <th>Description</th>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>UoM</th>
                <th>UoM Qty</th>
                <th>EyeProGPO Pricing</th>
            </tr>
            <?php foreach ($products as $product) : ?>
            <tr>
                <td><?php echo $product['vendor']; ?></td>
                <td><?php echo $product['SKU']; ?></td>
                <td><?php echo $product['description']; ?></td>
                <td><?php echo $product['category']; ?></td>
                <td><?php echo $product['sub_category']; ?></td>
                <td><?php echo $product['UoM']; ?></td>
                <td><?php echo $product['UoM_Qty']; ?></td>
                <td id="pricing"><?php echo $product['price']; ?></td>
            </tr>
            <?php endforeach; ?>
        </table>
    </section>
</main>
<?php 
    if ($action == 'vendorImg_search') {
        $link = get_img_by_id($_POST['vendors']);
        $_SESSION["vendor"] = $_POST['vendors'];
        echo "<script>var img = document.getElementById('img');"
            . "img.src='" .$link['img']. "'</script>";
        echo "<script>document.getElementById('nav').style.display = 'block';</script>";
    }
?>
<?php include 'view/footer.php'; ?>
<script>
    function Clear_Storage() {
        sessionStorage.removeItem('result');
        sessionStorage.removeItem('table');
        sessionStorage.removeItem('products');
    }
</script>
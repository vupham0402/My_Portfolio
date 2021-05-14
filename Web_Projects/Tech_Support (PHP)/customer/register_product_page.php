<?php include '../view/header.php'; ?>
<main>
    <?php 
        $first_name = $customer['firstName'];
        $last_name = $customer['lastName'];
        $customer_name = $first_name. ' '. $last_name;
    ?>
    <h1>Register Product</h1>
    
    <form action="index.php" method="post" id="customer_login">
        <input type="hidden" name="action" value="register_product">
        <input type="hidden" name="customer_id" 
               value="<?php echo $customer['customerID']; ?>">
        <label>Customer: <?php echo htmlspecialchars($customer_name); ?></label>
        <br>
        <br>
        
        <label>Product:</label>
        <select name="product_code">
        <?php foreach ( $products as $product ) : ?>
            <option value="<?php echo htmlspecialchars($product['productCode']); ?>">
                <?php echo htmlspecialchars($product['name']); ?>
            </option>
        <?php endforeach; ?>
        </select>
        <br>
        <br>
        
        <input type="submit" value="Register Product" />
        <br>
        <p>You are logged in as <?php echo $_SESSION['email'] ?></p>
    </form>
    <p><button><a id="logout" href=".?action=end_session">Logout</a></button></p>
</main>
<?php include '../view/footer.php'; ?>
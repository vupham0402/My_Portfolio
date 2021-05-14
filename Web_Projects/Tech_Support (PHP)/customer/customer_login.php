<?php include '../view/header.php'; ?>
<main>
    <h1>Customer Login</h1>
    <p>You must login before you can register a product.</p>
    <form action="index.php" method="post" id="customer_login">
        <input type="hidden" name="action" value="check_email_customer">

        <label>Email:</label>
        <input type="email" name="email"/>
        
        <input type="submit" value="Login" />
        <br>
    </form>

</main>
<?php include '../view/footer.php'; ?>
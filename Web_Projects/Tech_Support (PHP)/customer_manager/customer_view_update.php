<?php include '../view/header.php'; ?>
<main>
    <h1>View/Update Customer</h1>
    <section>
        <form action="." method="post">
            <label>First Name:</label>
            <input type="text" name="first_name" 
                   value="<?php echo $customer['firstName']; ?>">
            <br>
            <label>Last Name:</label>
            <input type="text" name="last_name" 
                   value="<?php echo $customer['lastName']; ?>">
            <br>
            <label>Address:</label>
            <input type="text" name="address" 
                   value="<?php echo $customer['address']; ?>">
            <br>
            <label>City:</label>
            <input type="text" name="city" 
                   value="<?php echo $customer['city']; ?>">
            <br>
            <label>State:</label>
            <input type="text" name="state" 
                   value="<?php echo $customer['state']; ?>">
            <br>
            <label>Postal Code:</label>
            <input type="text" name="postal_code" 
                   value="<?php echo $customer['postalCode']; ?>">
            <br>
            <label>Country Code:</label>
            <input type="text" name="country_code" 
                   value="<?php echo $customer['countryCode']; ?>">
            <br>
            <label>Phone:</label>
            <input type="text" name="phone" 
                   value="<?php echo $customer['phone']; ?>">
            <br>
            <label>Email:</label>
            <input type="email" name="email" 
                   value="<?php echo $customer['email']; ?>">
            <br>
            <label>Password:</label>
            <input type="text" name="password" 
                   value="<?php echo $customer['password']; ?>">
            <br>
            <input type="hidden" name="customer_id" 
                   value="<?php echo $customer['customerID']; ?>">
            <input type="hidden" name="action"
                           value="update_customer">
            <input type="submit" value="Update Customer">
            <br>
        </form>
    </section>
    <p class="last_paragraph">
        <a href="index.php?action=customer_search_view">Search Customers</a>
    </p>
</main>
<?php include '../view/footer.php'; ?>


<?php include '../view/header.php'; ?>
<main>
    <h1>Customer Search</h1>
    <form action="." method="post" id="customer_search">
        <input type="hidden" name="action" value="customer_search">

        <label>Last Name:</label>
        <input type="text" name="last_name"/>
        
        <input type="submit" value="Search" />
        <br>
    </form>
</main>

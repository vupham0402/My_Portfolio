<?php include '../view/header.php'; ?>
<main>
    <h1>Add Product</h1>
    <form action="index.php" method="post" id="add_product_form">
        <input type="hidden" name="action" value="add_product">

        <label>Code:</label>
        <input type="text" name="product_code" maxlength="10" />
        <br>

        <label>Name:</label>
        <input type="text" name="name" maxlength="50" />
        <br>

        <label>Version:</label>
        <input type="text" placeholder="1.0" pattern="\d+(\.\d{1})?" name="version"
               title="Number.Number(1 decimal)"/>
        <br>
        
        <label>Release Date:</label>
        <input type="text" name="release_date" 
               pattern="(?:19|20)(?:(?:[13579][26]|[02468][048])-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))|(?:[0-9]{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31)))" 
               placeholder="YYYY-MM-DD" title="YYYY-MM-DD or date is not valid." />
        <br>

        <label></label>
        <input type="submit" value="Add Product" />
        <br>
    </form>
    <p class="last_paragraph">
        <a href="index.php?action=list_products">View Product List</a>
    </p>

</main>
<?php include '../view/footer.php'; ?>
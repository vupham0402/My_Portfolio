<?php include '../view/header.php'; ?>
<main>
    <h1>Add Technician</h1>
    <form action="index.php" method="post" id="add_technician_form">
        <input type="hidden" name="action" value="add_technician">

        <label>First Name:</label>
        <input type="text" name="first_name" />
        <br>

        <label>Last Name:</label>
        <input type="text" name="last_name"  />
        <br>

        <label>Email:</label>
        <input type="email" placeholder="example@gmail.com" name="email" />
        <br>
        
        <label>Phone:</label>
        <input type="text" name="phone" 
               placeholder="(555) 555-5555" />
        <br>

        <label>Password:</label>
        <input type="text" name="password" />
        <br>
        
        <label></label>
        <input type="submit" value="Add Technician" />
        <br>
    </form>
    <p class="last_paragraph">
        <a href="index.php?action=list_technicians">View Technician List</a>
    </p>

</main>
<?php include '../view/footer.php'; ?>
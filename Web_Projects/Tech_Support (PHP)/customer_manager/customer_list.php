<main>
    <h1>Results</h1>

    <section>
        <table>
            <tr>
                <th>Name</th>
                <th>Email Address</th>
                <th>City</th>
                <th>&nbsp;</th>
            </tr>
            <?php foreach ($customers as $customer) : 
                  $first_name = $customer['firstName'];
                  $last_name = $customer['lastName'];
                  $customer_name = $first_name. ' '. $last_name; ?>
            <tr>
                <td><?php echo $customer_name; ?></td>
                <td><?php echo $customer['email']; ?></td>
                <td><?php echo $customer['city']; ?></td>
                <td><form action="." method="post">
                    <input type="hidden" name="action"
                           value="select_customer">
                    <input type="hidden" name="customer_id"
                           value="<?php echo $customer['customerID']; ?>">
                    <input type="submit" value="Select">
                </form></td>
            </tr>
            <?php endforeach; ?>
        </table>
    </section>
</main>
<?php include '../view/footer.php'; ?>
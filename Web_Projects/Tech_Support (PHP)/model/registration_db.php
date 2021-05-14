<?php

function add_registration($customer_id, $product_code) {
    global $db;
    $query = 'INSERT INTO registrations
                 (customerID, productCode, registrationDate)
              VALUES
                 (:customer_id, :product_code, NOW())';
    $statement = $db->prepare($query);
    $statement->bindValue(':customer_id', $customer_id);
    $statement->bindValue(':product_code', $product_code);
    $statement->execute();
    $statement->closeCursor();
}

?>
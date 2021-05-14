<?php

function check_customer($email) {
    global $db;
    $query = 'SELECT * FROM customers 
              WHERE email = :email';
    $statement = $db->prepare($query);
    $statement->bindValue(':email', $email);
    $statement->execute();
    $customer = $statement->fetchColumn();
    $statement->closeCursor();
    if ($customer > 0) {
        $check = 1;
    }
    else {
        $check = 0;
    }
    return $check;
}

function get_customer($email) {
    global $db;
    $query = 'SELECT * FROM customers 
              WHERE email = :email';
    $statement = $db->prepare($query);
    $statement->bindValue(':email', $email);
    $statement->execute();
    $customer = $statement->fetch();
    $statement->closeCursor();
    return $customer;
}

function get_customer_by_last_name($last_name) {
    global $db;
    $query = 'SELECT * FROM customers 
              WHERE lastName = :last_name';
    $statement = $db->prepare($query);
    $statement->bindValue(':last_name', $last_name);
    $statement->execute();
    $customers = $statement->fetchAll();
    $statement->closeCursor();
    return $customers;
}

function get_customer_by_id($customer_id) {
    global $db;
    $query = 'SELECT * FROM customers 
              WHERE customerID = :customer_id';
    $statement = $db->prepare($query);
    $statement->bindValue(':customer_id', $customer_id);
    $statement->execute();
    $customer = $statement->fetch();
    $statement->closeCursor();
    return $customer;
}

function update_customer($customer_id, $first_name, $last_name, $address, $city,
        $state, $postal_code, $country_code, $phone, $email, $password) {
    global $db;
    $query = 'UPDATE customers
              SET firstName = :first_name, lastName = :last_name,
              address = :address, city = :city, state = :state,
              postalCode = :postal_code, countryCode = :country_code,
              phone = :phone, email = :email, password = :password
              WHERE customerID = :customer_id';
    $statement = $db->prepare($query);
    $statement ->bindValue(':customer_id', $customer_id);
    $statement ->bindValue(':first_name', $first_name);
    $statement ->bindValue(':last_name', $last_name);
    $statement ->bindValue(':address', $address);
    $statement ->bindValue(':city', $city);
    $statement ->bindValue(':state', $state);
    $statement ->bindValue(':postal_code', $postal_code);
    $statement ->bindValue(':country_code', $country_code);
    $statement ->bindValue(':phone', $phone);
    $statement ->bindValue(':email', $email);
    $statement ->bindValue(':password', $password);
    $statement ->execute();
    $statement ->closeCursor(); 
}

?>


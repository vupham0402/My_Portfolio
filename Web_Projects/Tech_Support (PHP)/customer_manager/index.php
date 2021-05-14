<?php
require('../model/database.php');
require('../model/customer_db.php');

$action = filter_input(INPUT_POST, 'action');
if ($action === NULL) {
    $action = filter_input(INPUT_GET, 'action');
    if ($action === NULL) {
        $action = 'customer_search_view';
    }
}

if ($action == 'customer_search_view') {
    include('customer_search.php');
    include '../view/footer.php';
} else if ($action == "customer_search") {
    $last_name = filter_input(INPUT_POST, 'last_name');
    $customers = get_customer_by_last_name($last_name);
    include('customer_search.php');
    include ('customer_list.php');
} else if ($action == "select_customer") {
    $customer_id = filter_input(INPUT_POST, 'customer_id');
    $customer = get_customer_by_id($customer_id);
    include ('customer_view_update.php');
} else if ($action == "update_customer") {
    $customer_id = filter_input(INPUT_POST, 'customer_id');
    $first_name = filter_input(INPUT_POST, 'first_name');
    $last_name = filter_input(INPUT_POST, 'last_name');
    $address = filter_input(INPUT_POST, 'address');
    $city = filter_input(INPUT_POST, 'city');
    $state = filter_input(INPUT_POST, 'state');
    $postal_code = filter_input(INPUT_POST, 'postal_code');
    $country_code = filter_input(INPUT_POST, 'country_code');
    $phone = filter_input(INPUT_POST, 'phone');
    $email = filter_input(INPUT_POST, 'email');
    $password = filter_input(INPUT_POST, 'password');
    if ($first_name == NULL || $last_name == NULL || $address == NULL || 
        $city == NULL || $state == NULL || $postal_code == NULL ||
        $country_code == NULL || $phone == NULL || $email == NULL ||
        $password == NULL) {
        $error = "Invalid customer data. Check all fields and try again.";
        include('../errors/error.php');
    } else {
        update_customer($customer_id, $first_name, $last_name, $address, $city, 
            $state, $postal_code, $country_code, $phone, $email, $password);
        include ('customer_search.php');
        include '../view/footer.php';
    }
}
?>
<?php
require('../model/database.php');
require('../model/customer_db.php');
require('../model/product_db.php');
require('../model/registration_db.php');

session_set_cookie_params(0);
session_start();

$action = filter_input(INPUT_POST, 'action');
if ($action === NULL) {
    $action = filter_input(INPUT_GET, 'action');
    if ($action === NULL) {
        $action = 'customer_login';
    }
}

if ($action == 'customer_login') {
    if (isset($_SESSION['email'])) {
        $products = get_all_products();
        $customer = get_customer($_SESSION['email']);
        include ('register_product_page.php'); 
    }
    else {
        include('customer_login.php');
    }
} else if ($action == 'check_email_customer') {
    $email = filter_input(INPUT_POST, 'email');
    $check_customer = check_customer($email);
    if ($email == null) {
        $error = "Invalid customer data. Check all fields and try again.";
        include('../errors/error.php');
    } else if ($check_customer === 0) {
        $error = "Invalid customer email. Check all fields and try again.";
        include('../errors/error.php');
    } else {
        $customer = get_customer($email);
        $products = get_all_products();
        $_SESSION['email'] = $customer['email'];
        include('register_product_page.php');
    }
} else if ($action == 'register_product') {
    $customer_id = filter_input(INPUT_POST, 'customer_id');
    $product_code = filter_input(INPUT_POST, 'product_code');
    add_registration($customer_id, $product_code);
    include('register_product_message.php');
} else if ($action == 'end_session') {
    $_SESSION = array();

    // Clean up session ID
    session_destroy();

    // Delete the cookie for the session
    $name = session_name();                // Get name of the session cookie
    $expire = strtotime('-1 year');        // Create expiration date in the past
    $params = session_get_cookie_params(); // Get session params
    $path = $params['path'];
    $domain = $params['domain'];
    $secure = $params['secure'];
    $httponly = $params['httponly'];
    setcookie($name, '', $expire, $path, $domain, $secure, $httponly);
    include ('customer_login.php');
}

?>
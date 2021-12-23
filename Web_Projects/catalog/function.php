<?php
    require '../catalog/model/database.php';
    require '../catalog/model/vendor_db.php';
    require '../catalog/model/product_db.php';
    

    if (!isset($_SESSION['flag'])) {
        $_SESSION['totalSavings'] = 0;
        delete_subtotal();
    }
    $action = filter_input(INPUT_POST, 'action');
    if ($action === NULL) {
        $action = filter_input(INPUT_GET, 'action');
        if ($action === NULL) {
            $action = 'get_all_products';
        }
    }

    if ($action == 'get_all_products') {
        $products = get_all_products();
        $vendors = get_all_vendors();
    }
    else if ($action == 'vendorImg_search') {
        $products = get_product_by_vendor($_POST['vendors']);
        $vendors = get_all_vendors();
        if ($_POST['vendors'] === '0') {
            header("Location: .");
        }
    }
    else if ($action == 'description') {
        $products = get_product_by_search($_GET['search']);
    }
    else if ($action == 'end_session') {
        $action = NULL;
        delete_subtotal();
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
        header("Location: .");
    }

?>
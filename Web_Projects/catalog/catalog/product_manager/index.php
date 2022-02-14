<?php
require '../model/database.php';
require '../model/product_db.php';
session_set_cookie_params(0);
session_start();
$action = filter_input(INPUT_POST, 'action');
if ($action === NULL) {
    $action = filter_input(INPUT_GET, 'action');
    if ($action === NULL) {
        $action = 'list_products';
    }
}

if ($action == 'list_products') {
    if (!isset($_GET['page'])) {
        $page = 1;
    } else{
        $page = $_GET['page'];
    }
    $limit = 520;
    $starting_limit = ($page-1)*$limit;
    $products = get_product_by_vendor_1($_SESSION["vendor"], $limit, $starting_limit);
    $pages = get_total_pages($limit, $_SESSION["vendor"]);
    include('../product_manager/product_list.php');
} 

else if ($action == 'description_1') {
        $desc = filter_input(INPUT_GET, 'search_1'); 
        $products = get_product_by_search_1($_SESSION["vendor"], $desc);
        $pages = 0;
        include('../product_manager/product_list.php');
}
    
else if ($action == 'subtotal') {
        $subtotal = $_POST["subTotal"];
        add_subtotal($_SESSION["vendor"], $subtotal);
        $subtotals = get_subtotal();
        $totalSavings = 0;
        foreach ($subtotals as $subtotal):
            $totalSavings += (float)$subtotal['subtotal'];
        endforeach;
        number_format($totalSavings, 2);
        $_SESSION['totalSavings'] = number_format($totalSavings, 2);
        $_SESSION['flag'] = 1;
        $_SESSION['history'] = get_all_subtotal();
        header("Location: .");
}

else if ($action == 'end_session') {
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
        header("Location:../?action=get_all_products");
    }

?>
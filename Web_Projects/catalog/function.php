<?php
    require '../catalog/model/database.php';
    require '../catalog/model/vendor_db.php';
    
    $action = filter_input(INPUT_POST, 'action');
    if ($action === NULL) {
        $action = filter_input(INPUT_GET, 'action');
        if ($action === NULL) {
            $action = 'get_all_products';
        }
    }
    

    if ($action == 'get_all_products') {
        $vendors = get_all_vendors();
        $categories = get_all_categories();
        $links = '';
    }
    else if ($action = 'vendorOnChange') {
        $vendors = get_all_vendors();
        if($_POST['vendor'] === '') {
            $links = '';
            $categories = get_all_categories();
        }
        else {
            $links = get_img();
            $categories = get_all_categories_by_vendor($_POST['vendor']);
        }
    }
?>
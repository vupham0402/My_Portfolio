<?php

function get_all_vendors() {
    global $db;
    $query = 'SELECT vendor.vendor
              FROM catalog.vendor
              ORDER BY vendor ASC;';
    $statement = $db->prepare($query);
    $statement->execute();
    $vendors = $statement->fetchAll();
    $statement->closeCursor();
    return $vendors;
}

function get_all_products() {
    global $db;
    $query = 'SELECT *
              FROM catalog.product
              ORDER BY vendor ASC;';
    $statement = $db->prepare($query);
    $statement->execute();
    $products = $statement->fetchAll();
    $statement->closeCursor();
    return $products;
}

function get_total_pages($limit, $vendor) {
    global $db;
    $query = 'SELECT COUNT(ID)
              FROM catalog.product
              WHERE vendor = :vendor;';
    $statement = $db->prepare($query);
    $statement->bindValue(':vendor', $vendor);
    $statement->execute();
    $total_results = $statement->fetchColumn();
    $total_pages = ceil($total_results/$limit);
    return $total_pages;
}

function get_product_by_vendor_1($vendor, $limit, $starting_limit) {
    global $db;
    $query = 'SELECT *
              FROM catalog.product
              WHERE vendor = :vendor
              ORDER BY vendor ASC
              LIMIT :starting_limit,:limit;';
    $statement = $db->prepare($query);
    $statement->bindValue(':vendor', $vendor);
    $statement->bindParam(':starting_limit', $starting_limit, PDO::PARAM_INT);
    $statement->bindParam(':limit', $limit, PDO::PARAM_INT);
    $statement->execute();
    $product = $statement->fetchAll();
    $statement->closeCursor();
    return $product;
}

function get_product_by_vendor($vendor) {
    global $db;
    $query = 'SELECT *
              FROM catalog.product
              WHERE vendor = :vendor
              ORDER BY vendor ASC;';
    $statement = $db->prepare($query);
    $statement->bindValue(':vendor', $vendor);
    $statement->execute();
    $product = $statement->fetchAll();
    $statement->closeCursor();
    return $product;
}

function get_product_by_search($desc) {
    global $db;
    $query = 'SELECT *
              FROM catalog.product
              WHERE description LIKE "%'.$desc.'%" 
              OR SKU LIKE "%'.$desc.'%"'
            . 'ORDER BY vendor ASC;';
    $statement = $db->prepare($query);
    $statement->execute();
    $product = $statement->fetchAll();
    $statement->closeCursor();
    return $product;
}

function get_product_by_search_1($vendor, $desc) {
    global $db;
    $query = 'SELECT *
              FROM catalog.product
              WHERE vendor = :vendor
              AND description LIKE "%'.$desc.'%"  
              OR SKU LIKE "%'.$desc.'%"'
            . 'ORDER BY vendor ASC;';
    $statement = $db->prepare($query);
    $statement->bindValue(':vendor', $vendor);  
    $statement->execute();
    $product = $statement->fetchAll();
    $statement->closeCursor();
    return $product;
}

function add_subtotal($vendor, $subtotal) {
    global $db;
    $query = 'INSERT INTO catalog.total
                 (vendor, subtotal)
              VALUES
                 (:vendor, :subtotal)
              ON DUPLICATE KEY 
              UPDATE vendor = :vendor, subtotal = :subtotal';
    $statement = $db->prepare($query);
    $statement->bindValue(':vendor', $vendor);
    $statement->bindValue(':subtotal', $subtotal);
    $statement->execute();
    $statement->closeCursor();
}

function get_subtotal() {
    global $db;
    $query = 'SELECT total.subtotal
              FROM catalog.total;';
    $statement = $db->prepare($query);
    $statement->execute();
    $subtotals = $statement->fetchAll();
    $statement->closeCursor();
    return $subtotals;
}

function delete_subtotal() {
    global $db;
    $query = 'TRUNCATE TABLE total;';
    $statement = $db->prepare($query);
    $statement->execute();
    $subtotals = $statement->fetchAll();
    $statement->closeCursor();
    return $subtotals;
}

function get_all_subtotal() {
    global $db;
    $query = 'SELECT total.vendor, total.subtotal
              FROM catalog.total;';
    $statement = $db->prepare($query);
    $statement->execute();
    $subtotals = $statement->fetchAll();
    $statement->closeCursor();
    return $subtotals;
}

?>
<?php
function get_all_vendors() {
    global $db;
    $query = 'SELECT vendor
              FROM eyepro_db.vendors_view
              ORDER BY vendor ASC;';
    $statement = $db->prepare($query);
    $statement->execute();
    $vendors = $statement->fetchAll();
    $statement->closeCursor();
    return $vendors;
}

function get_img() {
    global $db;
    $query = 'SELECT * FROM eyepro_db.vendors_view';
    $statement = $db->prepare($query);
    $statement->execute();
    $images = $statement->fetchAll();
    $statement->closeCursor();
    return $images;
}

function get_all_categories_by_vendor($vendor) {
    global $db;
    $query = 'SELECT * FROM eyepro_db.categories_view 
              WHERE vendor = :vendor';
    $statement = $db->prepare($query);
    $statement->bindValue(':vendor', $vendor);
    $statement->execute();
    $category = $statement->fetchAll();
    $statement->closeCursor();
    return $category;
}

function get_all_categories() {
    global $db;
    $query = 'SELECT DISTINCT(category) FROM eyepro_db.categories_view';
    $statement = $db->prepare($query);
    $statement->execute();
    $category = $statement->fetchAll();
    $statement->closeCursor();
    return $category;
}
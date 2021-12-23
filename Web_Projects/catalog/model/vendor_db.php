<?php
function get_img_by_id($vendor) {
    global $db;
    $query = 'SELECT img FROM catalog.vendor 
              WHERE vendor.vendor = :vendor';
    $statement = $db->prepare($query);
    $statement->bindValue(':vendor', $vendor);
    $statement->execute();
    $vendor = $statement->fetch();
    $statement->closeCursor();
    return $vendor;
}

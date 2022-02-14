<?php
    $dsn = 'mysql:host=216.220.80.66;port=3563;dbname=eyepro_db';
    $username = 'eyepro';
    $password = 'egj9c!TSjU22!';

    try {
        $db = new PDO($dsn, $username, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        $error_message = $e->getMessage();
        include('../errors/database_error.php');
        exit();
    }
?>
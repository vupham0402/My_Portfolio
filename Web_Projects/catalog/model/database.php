<?php
    $dsn = 'mysql:host=localhost;port=3306;dbname=eyepro_db';
    $username = 'root';
    $password = '123';

    try {
        $db = new PDO($dsn, $username, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        $error_message = $e->getMessage();
        include('../errors/database_error.php');
        exit();
    }
?>

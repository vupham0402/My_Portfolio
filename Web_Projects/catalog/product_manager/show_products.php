<?php 

    // mysql db table to use 
    $table = 'catalog_view'; 
    // Table's primary key 
    $primaryKey = 'product_id'; 
    // Array of database columns which should be read and sent back to DataTables. 
    // The `db` parameter represents the column name in the database.  
    // The `dt` parameter represents the DataTables column identifier. 
    $columns = array( 
        array( 
            'db' => 'vendor', 
            'dt' => 0
        ), 
        array( 'db' => 'sku',  'dt' => 1 ), 
        array( 'db' => 'description',      'dt' => 2 ), 
        array( 'db' => 'category',     'dt' => 3 ), 
        array( 'db' => 'subcategory',    'dt' => 4 ),
        array( 'db' => 'uom',    'dt' => 5 ),
        array( 'db' => 'units_in_uom',    'dt' => 6 ),
        array( 'db' => 'tier1',    'dt' => 7 ),
        array( 
            'db' => 'tier2',    
            'dt' => 8,
            'formatter' => function ($d, $row) {
                if ($d === '') {
                    return 'N/A';
                }
                else {
                    return $d;
                }
            }
        ),
        array( 
            'db' => 'tier3',    
            'dt' => 9,
            'formatter' => function ($d, $row) {
                if ($d === '') {
                    return 'N/A';
                }
                else {
                    return $d;
                }
            }
        ),
        array( 
            'db' => 'tier4',   
            'dt' => 10,
            'formatter' => function ($d, $row) {
                if ($d === '') {
                    return 'N/A';
                }
                else {
                    return $d;
                }
            }
        )

    ); 
    
    // SQL server connection information
    $sql_details = array(
        'user' => 'eyepro',
        'pass' => 'egj9c!TSjU22!',
        'db'   => 'eyepro_db',
        'host' => '216.220.80.66;port=3563'
    );
    // Include SQL query processing class 
    require 'ssp.php'; 
    // Output data as json format 
    echo json_encode(SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns ));
?>
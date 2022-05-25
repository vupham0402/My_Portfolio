  <?php
 
    $username = $_POST['userName'];
    //$username = 'kpham'; //$_REQUEST['userName']; // Username
    $server = 'https://tab.eyeprogpo.com/trusted';  // Tableau URL
    $view = 'views/DashboardforCustomer_v2/ASCNYLLC2?:showVizHome=no&amp;:embed=true'; // View URL
    $ch = curl_init($server); // Initializes cURL session
 
 
    $data ='trusted_site=&username='.$username; // What data to send to Tableau Server
 
 
    curl_setopt($ch, CURLOPT_POST, true); // Tells cURL to use POST method
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data); // What data to post
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return ticket to variable
 
 
    $ticket = curl_exec($ch); // Execute cURL function and retrieve ticket
    curl_close($ch); // Close cURL session
    
    //echo $username;
   //echo '<br>';
    //echo $ticket;
 
  ?>
<br>
<iframe src="<?= $server?>/<?= $ticket ?>/<?= $view ?>" width="100%" height="850px" style="margin-top: -30px; margin-left: -10px; margin-bottom: -10px;"></iframe>


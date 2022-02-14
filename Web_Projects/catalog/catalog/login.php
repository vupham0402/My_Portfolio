<?php
    // Turn off all error reporting
    error_reporting(0);
    session_set_cookie_params(0);
    session_start();
?>
<html>
<head>
<title>Log In For Using Product Porfolio</title>
    <link rel="stylesheet" type="text/css"
          href="/catalog/style_login.css">
</head>
<body>
<div class="login">
    <div class="login-triangle"></div>

    <h2 class="login-header">Log In By Using Wild Apricot Account</h2>
    <form method="post">
        <input name="email" type="email" placeholder="Email" required/>
        <input type="password" name="password" placeholder="Password" required>
        <input type="submit" class="login" value="Log in">
    </form>
</div>

</body>
</html>
<?php

    if (isset($_POST['email']) && isset($_POST['password'])) {
        $waApiClient = WaApiClient::getInstance();
        $uname = filter_input(INPUT_POST, 'email');
        $pass = filter_input(INPUT_POST, 'password');
        $waApiClient->initTokenByContactCredentials($uname, $pass);
    }
    function getAccountDetails()
    {
       global $waApiClient;
       $url = 'https://api.wildapricot.org/v2/Accounts/';
       $response = $waApiClient->makeRequest($url); 
       return  $response[0]; 
    }
    class WaApiClient
    {
       const AUTH_URL = 'https://oauth.wildapricot.org/auth/token';
             
       private $tokenScope = 'auto';

       private static $_instance;
       private $token;
       
       public function initTokenByContactCredentials($userName, $password, $scope = null)
       {
          if ($scope) {
             $this->tokenScope = $scope;
          }

          $this->token = $this->getAuthTokenByAdminCredentials($userName, $password);
          if (!$this->token) {
             echo('<script>alert("Log In Unsuccessfully! Please try again!");</script>');
          }
          else {
              $_SESSION['access'] = 1;
              echo('<script>alert("Log In Successfully!");</script>');
              echo("<script>window.location.replace('https://catalog.eyeprogpo.com/catalog/')</script>");        
          }
       }

       public function makeRequest($url, $verb = 'GET', $data = null)
       {
          if (!$this->token) {
             throw new Exception('Access token is not initialized. Call initTokenByApiKey or initTokenByContactCredentials before performing requests.');
          }

          $ch = curl_init();
          $headers = array(
             'Authorization: Bearer ' . $this->token,
             'Content-Type: application/json'
          );
          curl_setopt($ch, CURLOPT_URL, $url);
          
          if ($data) {
             $jsonData = json_encode($data);
             curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
             $headers = array_merge($headers, array('Content-Length: '.strlen($jsonData)));
          }
          curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
          curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $verb);

          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          $jsonResult = curl_exec($ch);
          if ($jsonResult === false) {
             throw new Exception(curl_errno($ch) . ': ' . curl_error($ch));
             
          }
          curl_close($ch);
          return json_decode($jsonResult, true);
       }

       private function getAuthTokenByAdminCredentials($login, $password)
       {
          if ($login == '') {
             throw new Exception('login is empty');
          }

          $data = sprintf("grant_type=%s&username=%s&password=%s&scope=%s", 'password', urlencode($login), urlencode($password), urlencode($this->tokenScope));
          $clientId = 'fby3bq0bxg';
          $clientSecret = '7kk12cotrzkbjertpzkdz47hcy71er';
          $authorizationHeader = "Authorization: Basic " . base64_encode( $clientId . ":" . $clientSecret);

          return $this->getAuthToken($data, $authorizationHeader);
       }
       
       private function getAuthToken($data, $authorizationHeader)
       {
          $ch = curl_init();
          $headers = array(
             $authorizationHeader,
             'Content-Length: ' . strlen($data)
          );
          curl_setopt($ch, CURLOPT_URL, WaApiClient::AUTH_URL);
          curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
          curl_setopt($ch, CURLOPT_POST, true);
          curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		  $response = curl_exec($ch);
		  if ($response === false) {
             throw new Exception(curl_errno($ch) . ': ' . curl_error($ch));
            
          }  
          $result = json_decode($response , true);
          curl_close($ch);
          return $result['access_token'];
       }

       public static function getInstance()
       {
          if (!is_object(self::$_instance)) {
             self::$_instance = new self();
          }

          return self::$_instance;
       }

       public final function __clone()
       {
          throw new Exception('It\'s impossible to clone singleton "' . __CLASS__ . '"!');
       }

       private function __construct()
       {
          if (!extension_loaded('curl')) {
             throw new Exception('cURL library is not loaded');
          }
       }

       public function __destruct()
       {
          $this->token = null;
       }
    }
?>

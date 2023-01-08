<?php
//require __DIR__ . '../vendor/autoload.php';
require '../vendor/autoload.php';

// configure the Google Client
$client = new Google\Client();
//$client = new \Google_Client();
$client->setApplicationName('Google Sheets API');
$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
$client->setAccessType('offline');
// credentials.json is the key file we downloaded while setting up our Google Sheets API
$path = '../credentials.json';
$client->setAuthConfig($path);
$service = new \Google_Service_Sheets($client);

// Add row:
// function addClientToSheet($service)
// {
// configure the Sheets Service
$spreadsheetId = "1GdWkdLnTZiDLfBoHK2BxFW6dOXaEkk9cl4bIkxDPIDA";
$newRow = [
  $_POST['name'],
  str_replace("+", "", $_POST['phone']),
  $_POST['email']
];
$rows = [$newRow]; // you can append several rows at once
$valueRange = new \Google_Service_Sheets_ValueRange();
$valueRange->setValues($rows);
$range = 'Clients'; // the service will detect the last row of this sheet
$options = ['valueInputOption' => 'USER_ENTERED'];
//$options = ['valueInputOption' => 'USER_ENTERED'];
$service->spreadsheets_values->append($spreadsheetId, $range, $valueRange, $options);
// }
// addClientToSheet($service);

$result = $_GET['data'];
echo $result;

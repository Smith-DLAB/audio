<?php
$servername = "localhost";
$username = "votre_nom_utilisateur";
$password = "votre_mot_de_passe";
$dbname = "votre_base_de_donnees";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

$response = array();

foreach ($data as $fieldName => $fieldValue) {
    $escapedValue = $conn->real_escape_string($fieldValue);
    $sql = "INSERT INTO vos_donnees_table (champ) VALUES ('$escapedValue')";
    
    if ($conn->query($sql) !== TRUE) {
        $response["success"] = false;
        $conn->close();
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }
}

$response["success"] = true;
$conn->close();
header('Content-Type: application/json');
echo json_encode($response);
?>

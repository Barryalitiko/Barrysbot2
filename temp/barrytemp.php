<?php
// Archivo: barrytemp.php

// Función para almacenar datos temporales
function storeTemporaryData($key, $value) {
    $tempData = [];
    if (file_exists('temp_data.json')) {
        $tempData = json_decode(file_get_contents('temp_data.json'), true);
    }
    $tempData[$key] = $value;
    file_put_contents('temp_data.json', json_encode($tempData));
}

// Función para obtener datos temporales
function getTemporaryData($key) {
    if (file_exists('temp_data.json')) {
        $tempData = json_decode(file_get_contents('temp_data.json'), true);
        return isset($tempData[$key]) ? $tempData[$key] : null;
    }
    return null;
}

// Ejemplo de uso
// Almacenar un dato temporal
storeTemporaryData('exampleKey', 'exampleValue');
// Obtener un dato temporal
$exampleValue = getTemporaryData('exampleKey');
if ($exampleValue) {
    echo "Valor temporal: " . $exampleValue;
} else {
    echo "No hay datos temporales para esta clave.";
}
?>

<?php
header("Content-Type: application/json");

$questionsData = json_decode(file_get_contents("questions.json"), true);
$category = $_GET['category'] ?? '';

if (array_key_exists($category, $questionsData)) {
    echo json_encode($questionsData[$category]);
} else {
    echo json_encode(["error" => "Category not found"]);
}


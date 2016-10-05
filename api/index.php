<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$app = new Silex\Application();

function getBills($type)
{
    $json = file_get_contents(__DIR__ . '/bills.json');
    $data = json_decode($json, true);
    return $data['bill_' . $type];
}

function findIndexById($type, $id)
{
    $bills = getBills($type);
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBills($type, $bills)
{
    $json = file_get_contents(__DIR__ . '/bills.json');
    $data = json_decode($json, true);
    $data['bill_' . $type] = $bills;
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/bills.json', $json);
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->get('api/bills/{type}', function ($type) use ($app) {
    $bills = getBills($type);
    return $app->json($bills);
});

$app->get('api/bills/{type}/total', function ($type) use ($app) {
    $bills = getBills($type);
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills/{type}/{id}', function ($type, $id) use ($app) {
    $bills = getBills($type);
    $bill = $bills[findIndexById($type, $id)];
    return $app->json($bill);
});

$app->post('api/bills/{type}', function (Request $request, $type) use ($app) {
    $bills = getBills($type);
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($type, $bills);
    return $app->json($data);
});

$app->put('api/bills/{type}/{id}', function (Request $request, $type, $id) use ($app) {
    $bills = getBills($type);
    $data = $request->request->all();
    $index = findIndexById($type, $id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($type, $bills);
    return $app->json($bills[$index]);
});

$app->delete('api/bills/{type}/{id}', function ($type, $id) {
    $bills = getBills($type);
    $index = findIndexById($type, $id);
    array_splice($bills, $index, 1);
    writeBills($type, $bills);
    return new Response("", 204);
});

$app->match("{uri}", function($uri){
    return "OK";
})
->assert('uri', '.*')
->method("OPTIONS");


$app->run();
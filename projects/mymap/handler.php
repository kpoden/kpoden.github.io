<?php


//Функция для отправки сообщени в чат Битрикс24

function postToChat($message, $attach = array()) {

    $queryUrl = 'https://b24-2fdg9i.bitrix24.ru/rest/11/m2a3r2ca5496hhz0/im.message.add.json';
    $queryData = http_build_query(
        array(
            "USER_ID" => 11,
            "MESSAGE" => $message,
            "ATTACH" => $attach
        )
    );

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_POST => 1,
        CURLOPT_HEADER => 0,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $queryUrl,
        CURLOPT_POSTFIELDS => $queryData,
    ));

    $result = curl_exec($curl);
    curl_close($curl);

    return json_decode($result, true);
}


// Функция для отправки запроса в CRM на получение данных лида с определенными данными

function executeREST($method, $params) {

    $queryUrl = 'https://b24-2fdg9i.bitrix24.ru/rest/11/02m1id5ut2go0tm9/'.$method.'.json';
    $queryData = http_build_query($params);

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_POST => 1,
        CURLOPT_HEADER => 0,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $queryUrl,
        CURLOPT_POSTFIELDS => $queryData,
    ));

    $result = curl_exec($curl);
    curl_close($curl);

    return json_decode($result, true);

}




// По входящему запросу из вебхука получаем из CRM данные об измененном лиде
$deal_data = executeREST('crm.lead.get', array('ID' => intval($_REQUEST['data']['FIELDS']['ID'])));



$object = [
        'valid' => $deal_data['result']['UF_CRM_1658813701721'],
        'id' => $deal_data['result']['ID'],
        'title' => $deal_data['result']['UF_CRM_LEAD_1658291345765'],
        'address' => $deal_data['result']['ADDRESS'],
        'coords' => explode(", ", $deal_data['result']['UF_CRM_1658221476378']),
        'desc' => $deal_data['result']['COMMENTS'],
        'pointType' => $deal_data['result']['UF_CRM_LEAD_1658291168747'],
        'images' => $deal_data['result']['UF_CRM_1659612244945']
];
postToChat('count '.mb_strlen($deal_data['result']['UF_CRM_1658221476378']));

if(mb_strlen($deal_data['result']['UF_CRM_1658221476378'])< 2) {
    postToChat('No coordinates found');
    postToChat('die');
    die;
}

$file = file_get_contents('objects.json');


$objects = json_decode($file, true);
$count = count($objects);
$new = true;
postToChat($count);

for($i = 0; $i < $count; $i++){
    postToChat('New ID: '.$object['id']);
    postToChat('Existing IDs:'.$objects[$i]['id']);
   if($object['id'] === $objects[$i]['id']) {
       postToChat('rewrite');
       $objects[$i] = $object;
       $new = false;
   }

}

if($new) {
    $objects[] = $object;
    postToChat('new');
}


$objects = json_encode( $objects, JSON_UNESCAPED_UNICODE);


//print_r('<pre>');
//print_r($objects);
//print_r('</pre>');
postToChat(print_r($deal_data, true));



file_put_contents('objects.json', $objects);







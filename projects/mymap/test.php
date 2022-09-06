<?php
//
// //$deal_id = $_REQUEST['FIELDS']['ID'];
//
////postToChat(print_r($_REQUEST, true));
//
//echo ('test');
//
//
//$deal_data = executeREST('crm.lead.get', array('ID' => intval($_REQUEST['data']['FIELDS']['ID'])));
//
////postToChat(print_r($deal_data, true));
//
//if (($deal_data['result']['CLOSED'] == 'Y') && ($deal_data['result']['OPPORTUNITY'] > 999999))
//    postToChat('О боже! Мы продали на мильён за раз!', array(
//        "ID" => 1,
//        "BLOCKS" => Array(
//            Array("IMAGE" => Array(
//                "LINK" => "http://itd0.mycdn.me/image?id=838720761880&t=20&plc=WEB&tkn=*GY_bl00J4lx9APLGwDe4S5xVOc4",
//            )),
//            Array("LINK" => Array(
//                "NAME" => "Мегасделка века",
//                "DESC" => "Срочно принести сэйлу бутылочку шапманского!",
//                "LINK" => 'https://'.$_REQUEST['auth']['domain'].'/crm/deal/show/'.$deal_data['result']['ID'].'/'
//            )),
//        )
//    ));
//
//function executeREST($method, $params) {
//
//    $queryUrl = 'https://b24-2fdg9i.bitrix24.ru/rest/11/02m1id5ut2go0tm9/'.$method.'.json';
//    $queryData = http_build_query($params);
//
//    $curl = curl_init();
//    curl_setopt_array($curl, array(
//        CURLOPT_SSL_VERIFYPEER => 0,
//        CURLOPT_POST => 1,
//        CURLOPT_HEADER => 0,
//        CURLOPT_RETURNTRANSFER => 1,
//        CURLOPT_URL => $queryUrl,
//        CURLOPT_POSTFIELDS => $queryData,
//    ));
//
//    $result = curl_exec($curl);
//    curl_close($curl);
//
//    return json_decode($result, true);
//
//}
//
//$attach = array(
//    "ID" => 1,
//    "BLOCKS" => Array(
//        Array("IMAGE" => Array(
//            "LINK" => "http://itd0.mycdn.me/image?id=838720761880&t=20&plc=WEB&tkn=*GY_bl00J4lx9APLGwDe4S5xVOc4",
//        )),
//        Array("LINK" => Array(
//            "NAME" => "Мегасделка века",
//            "DESC" => "Срочно принести сэйлу бутылочку шапманского!",
//            "LINK" => 'https://'.$_REQUEST['auth']['domain'].'/crm/deal/show/'.$deal_data['result']['ID'].'/'
//        )),
//    )
//);
//
//function postToChat($message, $attach = array()) {
//
//    $queryUrl = 'https://b24-2fdg9i.bitrix24.ru/rest/11/m2a3r2ca5496hhz0/im.message.add.json';
//    $queryData = http_build_query(
//        array(
//            "USER_ID" => 11,
//            "MESSAGE" => $message,
//            "ATTACH" => $attach
//        )
//    );
//
//    $curl = curl_init();
//    curl_setopt_array($curl, array(
//        CURLOPT_SSL_VERIFYPEER => 0,
//        CURLOPT_POST => 1,
//        CURLOPT_HEADER => 0,
//        CURLOPT_RETURNTRANSFER => 1,
//        CURLOPT_URL => $queryUrl,
//        CURLOPT_POSTFIELDS => $queryData,
//    ));
//
//    $result = curl_exec($curl);
//    curl_close($curl);
//
//    return json_decode($result, true);
//
//}
////$res = postToChat("Тест тест", $attach);
//
////print_r($res);
//
//print_r($_REQUEST);
//writeToLog($_REQUEST, 'incoming');
//
////$res =executeREST('crm.lead.get', array('ID' => 1));
////print_r($res);
///**
// * Write data to log file.
// *
// * @param mixed $data
// * @param string $title
// *
// * @return bool
// */
//function writeToLog($data, $title = '') {
//    $log = "\n------------------------\n";
//    $log .= date("Y.m.d G:i:s") . "\n";
//    $log .= (strlen($title) > 0 ? $title : 'DEBUG') . "\n";
//    $log .= print_r($data, 1);
//    $log .= "\n------------------------\n";
//    print_r($log);
//    file_put_contents(getcwd() . '/hook.log', $log, FILE_APPEND);
//    postToChat($log);
//    return true;
//}
//


//Функция для отправки сообщени в чат Битрикс24

function postToChat($message, $attach = array())
{

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

function executeREST($method, $params)
{

    $queryUrl = 'https://b24-2fdg9i.bitrix24.ru/rest/11/02m1id5ut2go0tm9/' . $method . '.json';
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
    'id' => $deal_data['result']['ID'],
    'title' => $deal_data['result']['UF_CRM_LEAD_1658291345765'],
    'address' => $deal_data['result']['ADDRESS_CITY'] . ',' . $deal_data['result']['ADDRESS'],
    'coords' => explode(", ", $deal_data['result']['UF_CRM_1658221476378']),
    'phone' => $deal_data['result']['PHONE']['0']['VALUE'],
    'comments' => $deal_data['result']['COMMENTS'],
    'pointType' => $deal_data['result']['UF_CRM_1658224368845']
];


$file = file_get_contents('objects.json');

// Ставим по умолчанию новый лид
$new = true;

$objects = json_decode($file, true);
$count = count($objects);

for ($counter = 0; $counter < $count; $counter++) {

    // Если ID совпадает с существующим то ставим флаг что лид не новый и перезаписываем существующий
    if ($objects[$counter]['id'] === $object['id']) {
        $new = false;
        postToChat(print_r($objects[$counter]['id'], true));
        postToChat(print_r($object['id'], true));
        postToChat(print_r($counter);
        $objects[$object['id']] = $object;
    }
}

//Если лид новый то создаем новую запись
if ($new) {
    $objects[] = $object;
    postToChat(print_r('new'));
}

$objects = json_encode($objects, JSON_UNESCAPED_UNICODE);


print_r('<pre>');
print_r($objects);
print_r('</pre>');
postToChat(print_r($deal_data, true));


file_put_contents('objects.json', $objects);







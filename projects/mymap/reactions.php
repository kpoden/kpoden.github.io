<?php

function handleReactions($state, $reaction, $targetObj) {

    $objReactions = $targetObj['likes'];

    if($state == 'set') {
        if($reaction == 'like') {
            $objReactions[0] += 1;
        } else {
            $objReactions[1] += 1;;
        }

    } else {
        if($reaction == 'like') {
            $objReactions[0] -= 1;
        } else {
            $objReactions[1] -= 1;
        }

    }
    $targetObj['likes'] = $objReactions;
    return $targetObj;
}

if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    if($_POST["reaction"]) {
        $file = file_get_contents('objects.json');
        $objId = $_POST["id"];
        $objects = json_decode($file, true);
        $count = count($objects);

        for($i = 0; $i < $count; $i++){
            if($objId === $objects[$i]['id']) {
                $targetObj = $objects[$i];
                $state = $_POST['state'];
                $reaction = $_POST['reaction'];

                $targetObj = handleReactions($state, $reaction, $targetObj);
                $objects[$i] = $targetObj;

            }

        }
        $objects = json_encode( $objects, JSON_UNESCAPED_UNICODE);
        file_put_contents('objects.json', $objects);

    }



    echo json_encode(array('success' => 'true'));
}
<?php
header('Content-Type: text/plain');

$eval_data = fopen('data.csv', 'a');
//$error = fopen('error.txt', 'a');
$page_url = $_REQUEST['url'];
$rules = array('img', 'inputimg', 'skipnav', 'title', 'locale', 'table', 'label');

foreach ($rules as $rule) {
	foreach ($_REQUEST[$rule] as $key => $path) {
		if ($_REQUEST['eval_' . $rule][$key]) {
			$str .= $page_url . ',' . $rule. ',' . $path . ',' . $_REQUEST['eval_' . $rule][$key] . "\n";
		}
	}
}

fwrite($eval_data, $str);
//print_r($_REQUEST);
?>
DONE.
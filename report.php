<?php
header('Content-Type: text/plain; charset=utf-8');

$eval_data = file('data.csv');

foreach ($eval_data as $row) {
	$item = explode(',', $row);
	$url = $item[0];
	$type = $item[1];
	$data = $item[2];
	$eval = trim($item[3]);
	if (strlen($eval) < 1) {
		continue;
	}
	$result[$url][$type][$data] = $eval;
}
//print_r($result);

foreach ($result as $url => $types) {
	echo($url . "\n");
	foreach ($types as $type => $item) {
		if ($type != 'inputimg') {
			$c = 0;
			$f = 0;
			echo($type . ': ');
		}
		foreach ($item as $d => $val) {
			if ($val == 'pass') {
				$c++;
			} else if ($val == 'fail') {
				$f++;
			}
		}
		if ($type != 'img') {
			echo($c . "/" . ($c + $f) . ' (' . round($c / ($c + $f) * 1000) / 10 . '%)' . "\n");
			$total[$type]['pass'] += $c;
			$total[$type]['fail'] += $f;
		}
	}
	echo("\n");
}

echo("TOTAL\n");
foreach ($total as $key => $v) {
	echo($key . ": " . $v['pass'] . '/' . ($v['pass'] + $v['fail']) . ' (' . round($v['pass'] / ($v['pass'] + $v['fail']) * 1000) / 10 . '%)' . "\n");
}
?>
<?php
//header('Content-Type: text/plain; charset=utf-8');
header('Content-Type: text/html; charset=utf-8');

$eval_data = file('data.csv');

foreach ($eval_data as $row) {
	$item = explode(',', $row);
	$path = $item[0];
	$url = $item[1];
	$type = $item[2];
	$data = $item[3];
	$eval = trim($item[4]);
	if (strlen($eval) < 1) {
		continue;
	}
	$result[$url]['result'][$type][$data] = $eval;
	$result[$url]['path'] = $path;
}
//print_r($result);

foreach ($result as $url => $data_by_url) {
	echo('<a href="' . $url . '">[' . $data_by_url['path'] . ']</a>' . "\n<br>");
	foreach ($data_by_url['result'] as $type => $item) {
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
			echo($c . "/" . ($c + $f) . ' (' . round($c / ($c + $f) * 1000) / 10 . '%)' . "\n<br>");
			$total[$type]['pass'] += $c;
			$total[$type]['fail'] += $f;
		}
	}
	echo("\n<br>");
}

echo("TOTAL\n<br>");
foreach ($total as $key => $v) {
	echo($key . ": " . $v['pass'] . '/' . ($v['pass'] + $v['fail']) . ' (' . round($v['pass'] / ($v['pass'] + $v['fail']) * 1000) / 10 . '%)' . "\n<br>");
}
?>
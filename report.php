<?php
header('Content-Type: text/plain; charset=utf-8');

$CHECKLIST = array(
	array('title' => '적절한 대체 텍스트 제공', 'keyword' => 'img')
	//, array('title' => '적절한 대체 텍스트 제공', 'keyword' => 'inputimg')
	, array('title' => '자막 제공', 'keyword' => '')
	, array('title' => '색에 무관한 콘텐츠 인식', 'keyword' => '')
	, array('title' => '명확한 지시사항 제공', 'keyword' => '')
	, array('title' => '텍스트 콘텐츠의 명도 대비', 'keyword' => '')
	, array('title' => '배경음 사용 금지', 'keyword' => '')
	, array('title' => '키보드 사용 보장', 'keyword' => '')
	, array('title' => '초점 이동', 'keyword' => '')
	, array('title' => '응답시간 조절', 'keyword' => '')
	, array('title' => '정지 기능 제공', 'keyword' => '')
	, array('title' => '깜빡임과 번쩍임 사용 제한', 'keyword' => '')
	, array('title' => '반복 영역 건너뛰기', 'keyword' => '')
	, array('title' => '제목 제공', 'keyword' => '')
	, array('title' => '적절한 링크 텍스트', 'keyword' => '')
	, array('title' => '기본 언어 표시', 'keyword' => '')
	, array('title' => '사용자 요구에 따른 실행', 'keyword' => '')
	, array('title' => '콘텐츠의 선형화', 'keyword' => '')
	, array('title' => '표의 구성', 'keyword' => '')
	, array('title' => '레이블 제공', 'keyword' => '')
	, array('title' => '오류 정정', 'keyword' => '')
	, array('title' => '마크업 오류 방지', 'keyword' => '')
	, array('title' => '웹 애플리케이션 접근성 준수', 'keyword' => '')	//해당사항 없음	
);
/*
*/

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
	echo("\n" . $url . "\n");
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
}

echo("\nTOTAL\n");
foreach ($total as $key => $v) {
	echo($key . ": " . $v['pass'] . '/' . ($v['pass'] + $v['fail']) . ' (' . round($v['pass'] / ($v['pass'] + $v['fail']) * 1000) / 10 . '%)' . "\n");
}
?>
--
웹 접근성 품질마크 전문가 심사 보고서

총평:

웹 접근성 품질마크 전문가 심사 결과 요약

평가개요
* 기관명: {client_name}
* 사이트명: {target_site_name}
* URL: {target_site_url}
* 심사시간: {evaluation_date_from} ~ {evaluation_date_to}

평가결과: {result}
* 준수 항목 수: {number_of_success_checklist} / 21
* 준수한 페이지 비율(21개 항목모두 95%준수시 합격)
<?php
$i = 0;
foreach($CHECKLIST as $item) {
	echo("\t" . ++$i . '. ' . $item['title'] . ': {}/{}({}%)' . "\n");
}
?>
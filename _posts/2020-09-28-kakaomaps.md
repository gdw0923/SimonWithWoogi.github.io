---

title: kakao maps open api 실습해보자
author: Woogi
date: 2020-09-27 18:43:00 +0800
categories: [OpenAPI, KAKAO]
tags: [open api]
image: /assets/img/kakao/map_1.png
---

## <span style="color:darkblue">1. What is Kakao Open API</span>

<span style="color:darkblue">`1.1.    Informed Api`</span>

API는 애플리케이션 소프트웨어를 구축하고 [통합](https://www.redhat.com/ko/topics/integration)하기 위한 정의 및 프로토콜 세트로, 애플리케이션 프로그래밍 인터페이스(Application Programming Interface)를 나타냅니다.

API를 사용하면 구현 방식을 알지 못해도 제품 또는 서비스가 서로 커뮤니케이션할 수 있으며 애플리케이션 개발을 간소화하여 시간과 비용을 절약할 수 있습니다. 새로운 툴과 제품을 설계하거나 기존 툴과 제품을 관리하는 경우 API는 유연성을 제공하고 설계, 관리, 사용 방법을 간소화하며 혁신의 기회를 제공합니다.

API는 당사자들 간 계약을 나타내는 도큐멘테이션을 갖춘 계약으로 비유되기도 합니다. 한쪽 당사자가 특정한 방식으로 구성된 원격 요청을 보내면 다른 쪽 당사자의 소프트웨어가 이에 응답하는 방식이기 때문입니다

 

즉 kakao 에서 만든 누구나 쓸수 있게 만든 api 란 뜻입니다.



## <span style="color:darkblue">2. Implement</span>

<span style="color:darkblue">`2.1. Code description`</span>

```jsp
3.	<%@ page language="java" contentType="text/html; charset=UTF-8"
4.	    pageEncoding="UTF-8"%>
5.	<!DOCTYPE html>
6.	<html>
7.	<head>
8.	<meta charset="UTF-8">
9.	<title>Test Page</title>
10.	
11.	<style type="text/css">
12.	#map{
13.		width: 500px;
14.		height: 500px;
15.	}
16.	</style>
17.	
18.	</head>
19.	<body>
20.	
21.	<!-- 실제 지도를 그리는 자바스크립트 api를 불러오는 코드..appkey 부분에 발급받은 코드 넣으면 됩니다.  -->
22.	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=???????????????"></script>
23.	
24.	<div id="map"></div>
25.	
26.	<script>    
27.	var mapContainer = document.getElementById('map'), // 지도를 표시할 div를 가져온다.
28.	mapOption = {  // 지도의 옵션을 가져온다...
29.	    center: new kakao.maps.LatLng(37.513041, 127.102711), // 지도의 중심좌표 (위도와 경도)
30.	    level: 1 // 지도의 확대 레벨 (1(20m) ~ 14(128km))
31.	};
32.	
33.	var map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성 및 객체 리턴 .. 여기까지만 해도 위에서 설정한 대로의 지도가 보인다.
34.	
35.	//지도에 마커를 넣고 싶다면 추가 작업으로 마커가 표시될 위치입니다 
36.	var markerPosition  = new kakao.maps.LatLng(37.513041, 127.102711); 
37.	
38.	//마커를 생성합니다
39.	var marker = new kakao.maps.Marker({
40.	position: markerPosition
41.	});
42.	
43.	//마커가 지도 위에 표시되도록 설정합니다 여기까지 하면 지도에 파란색으로 된 자그만 표시가 생성됩니다.
44.	marker.setMap(map);
45.	 
46.	//이제 마커위에 설명말풍선같은거 넣고 싶다면 할 추가 작업입니다.
47.	var iwContent = '<div style="padding:5px;">롯데월드타워<br></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
48.	iwPosition = new kakao.maps.LatLng(37.513041, 127.102711); //인포윈도우 표시 위치입니다
49.	
50.	//인포윈도우를 생성합니다
51.	var infowindow = new kakao.maps.InfoWindow({
52.	position : iwPosition, 
53.	content : iwContent 
54.	});
55.	
56.	//마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
57.	infowindow.open(map, marker);  
58.	</script>
59.	
60.	</body>
61.	</html>

```

<span style="color:darkblue">`2.2. Result`</span>

![img](/assets/img/kakao/map_1.png)

이런식으로 지도가 만들어지는데 

33 번쨰 라인까지만 하면 순수하게 지도만 만들어지고

44번째 라인까지 하면 

![img](/assets/img/kakao/map_2.png) 

마커까지가 만들어지고 

57번째 라인까지 최종적으로 하면 

![img](/assets/img/kakao/map_3.png) 

마커 위에 이 말풍선도 최종적으로 뜨게 되는것이다

 

이렇게 open api 를 이용해 web에 지도를 구현해보았습니다 !
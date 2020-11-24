---
title: kakao Vision open api 실습해보자
author: Woogi
date: 2020-11-24 15:10:00 +0800
categories: [OpenAPI, KAKAO]
tags: [open api]
image: /assets/img/kakao/vision_4.png

---

## <span style="color:darkblue">1. What is Kakao Vision API</span>

<span style="color:darkblue">`1.1. Vision Api`</span>

카카오에서 제공하는  비전 API는 얼굴 검출, 상품 검출, 성인 이미지 판별, 썸네일 생성, 썸네일 검출, 멀티 태그 생성, OCR 7가지를 제공하고 있고 JSON 형식으로 결과가 많이 리턴되어 오고 있습니다.

디벨로퍼 사이트에서 보시면 아시겠지만 각 형식별로 리턴되어 오는 것들에 대한 의미는 참고해서 보시고 이번에도 C# 으로 했는데 해도해도 이미지 자체로 하는건 안되고 이미지URL로 올리는거만 되서 다음에 이미지 올려서 하는걸로 다시 올려보겠습니다 

썸네일 생성과 썸네일 검출만 필요파라미터가 달라서 2개 4개 나눠서 구성했습니다.

그리고 OCR은 이미지URL를 지원하지 않아서 구현하지 못했습니다.

## <span style="color:darkblue">2. 얼굴검출, 상품검출, 성인이미지판별, 멀티태그생성</span>

<span style="color:darkblue">`2.1. Code description`</span>

```c#
kakak_API_vision_detect("https://dapi.kakao.com/v2/vision/face/detect"); // 얼굴검출
kakak_API_vision_detect("https://dapi.kakao.com/v2/vision/product/detect"); //상품검출
kakak_API_vision_detect("https://dapi.kakao.com/v2/vision/adult/detect");//성인이미지판별
kakak_API_vision_detect("https://dapi.kakao.com/v2/vision/multitag/generate");
//멀티태그생성

public void kakak_API_vision_detect(string url)
{
    try
    {
        string rest_api_key = "???"; 
        // 내 어플리케이션 => 어플선택 => 기본정보의 앱 키 > REST Key 값 부여            

        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url); 
        // 해당 URL로 네트웍을 만든다
        request.Headers.Add("Authorization", "KakaoAK " + rest_api_key); 
        // 헤더에 옵션값을 추가한다.
        request.ContentType = "application/x-www-form-urlencoded";// 콘텐츠타입을 명시한다
        request.Method = "POST"; // get 으로 보낼지 post로 보낼지 명시한다.

        string sss = "image_url=https://t1.daumcdn.net/alvolo/_vision/openapi/r2/images/01.jpg"; 
        // 보낼 데이터를 xml 형식으로 만들어주고
        byte[] byteDataParams = Encoding.UTF8.GetBytes(sss); 
        // 데이터를 UTF-8 형식의 바이트 배열로 변환시켜준다.
        request.ContentLength = byteDataParams.Length; 
        // 보낼 데이터의 길이를 설정해준다.

        using (Stream reqStream = request.GetRequestStream()) 
            // 네트웍을 열어서 데이터를 보낸다.
        {
            reqStream.Write(byteDataParams, 0, byteDataParams.Length); // 데이터 쓰기
        }

        string responseText = string.Empty;
        using (HttpWebResponse response = (HttpWebResponse)request.GetResponse()) 
            // 보낸데이터를 기반으로 받는다
        {
            Stream stream = response.GetResponseStream(); // 받은 데이터를 스트림으로 쓴다
            using (StreamReader sr = new StreamReader(stream)) 
                // 스트림을 읽기 위해 리더를 오픈한다.
            {
                responseText = sr.ReadToEnd(); // 스트림의 내용을 읽어서 문자열로 반환해준다.
            }

            Console.WriteLine(responseText); // 내용을 로그로 출력한다.
        }
    }
    catch (Exception e)
    {
        MessageBox.Show(e.Message);
    }
}
```

<span style="color:darkblue">`2.2. Result`</span>

![img](/assets/img/kakao/vision_1.png)

간단하게 form 에서 라디오버튼으로 구분하여 사진파일은 동일하게 되어 있고 url만 다르게 호출하게 되어 있고 마지막에 로그로 출력하게 하였습니다.

이게 얼굴검출에 대한 리턴데이터의 텍스트시각화도우미 캡처본입니다.

![img](/assets/img/kakao/vision_2.png)

나머지 상품검출, 성인 이미지 판별, 멀티태그생성도 비슷하게 오니 따로 붙이진 않겠습니다.



## <span style="color:darkblue">3. 썸네일생성, 썸네일검출</span>

<span style="color:darkblue">`3.1. Code description`</span>

```c#
//썸네일생성
kakak_API_vision_thumbnail("https://dapi.kakao.com/v2/vision/thumbnail/crop", 200, 200);
//썸네일 검출
kakak_API_vision_thumbnail("https://dapi.kakao.com/v2/vision/thumbnail/detect", 200, 200);

public void kakak_API_vision_thumbnail(string url, int width, int height)
{
    try
    {
        string rest_api_key = "???"; // 내 어플리케이션 => 어플선택 => 기본정보의 앱 키 > REST Key 값 부여            

        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url); // 해당 URL로 네트웍을 만든다
        request.Headers.Add("Authorization", "KakaoAK " + rest_api_key); // 헤더에 옵션값을 추가한다.
        request.ContentType = "application/x-www-form-urlencoded";// 콘텐츠타입을 명시한다
        request.Method = "POST"; // get 으로 보낼지 post로 보낼지 명시한다.

        string sss = "image_url=https://t1.daumcdn.net/alvolo/_vision/openapi/r2/images/01.jpg&width=" + width + "&height=" + height; // 보낼 데이터를 xml 형식으로 만들어주고
        byte[] byteDataParams = Encoding.UTF8.GetBytes(sss); // 데이터를 UTF-8 형식의 바이트 배열로 변환시켜준다.
        request.ContentLength = byteDataParams.Length; // 보낼 데이터의 길이를 설정해준다.

        using (Stream reqStream = request.GetRequestStream()) // 네트웍을 열어서 데이터를 보낸다.
        {
            reqStream.Write(byteDataParams, 0, byteDataParams.Length); // 데이터 쓰기
        }

        string responseText = string.Empty;
        using (HttpWebResponse response = (HttpWebResponse)request.GetResponse()) // 보낸데이터를 기반으로 받는다
        {
            Stream stream = response.GetResponseStream(); // 받은 데이터를 스트림으로 쓴다
            using (StreamReader sr = new StreamReader(stream)) // 스트림을 읽기 위해 리더를 오픈한다.
            {
                responseText = sr.ReadToEnd(); // 스트림의 내용을 읽어서 문자열로 반환해준다.
            }

            Console.WriteLine(responseText); // 내용을 로그로 출력한다.
        }
    }
    catch (Exception e)
    {
        MessageBox.Show(e.Message);
    }
}
```

<span style="color:darkblue">`3.2. Result`</span>

Form 모양의 2.2 에서 보여준것과 똑같고 썸네일에서 차이점은 가로 세로 크기를 지정해줘서 보여줄수 있다는 거네요 

썸네일 생성이 되면 

{"thumbnail_image_url": "http://k.kakaocdn.net/dn/bw6GES/btqN2eRBDdk/OnAiVHPpENVtaK9RySalK1/img.jpg"}

이런식으로 리턴이 와서 해당 url로 이미지를 받을수 있어요



썸네일 검출은 

{"result": {"width": 900, "thumbnail": {"x": 80, "width": 780, "height": 780, "y": 0}, "height": 780}, "rid": "cb92b77acdeb470371cefc6daa4cf203"}

이런식으로 옵니다 이번에 짧게 오네요 

이렇게 url로 하는걸 해봤는데 

curl를 써서 파일로 업로드해서 동작시키는건 잘 되는걸 보니 제 코드상에 어떤 문제가 있는건 확실한데 그게 뭔지를 아직 찾지를 못하고 있어서 혹시 도움주실분 계시면 연락 부탁드립니다 ...

gdw0923@naver.com 으로 꼭 좀 부탁드립니다.

마지막으로 curl 로 동작시킨 얼굴검출 파일업로드 버전입니다.

![img](/assets/img/kakao/vision_3.png)
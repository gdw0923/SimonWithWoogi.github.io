---
title: kakao 번역 open api 실습해보자
author: Woogi
date: 2020-10-26 10:11:00 +0800
categories: [OpenAPI, KAKAO]
tags: [open api]
image: /assets/img/kakao/translate_1.png

---

## <span style="color:darkblue">1. What is Kakao 번역 API</span>

<span style="color:darkblue">`1.1. 번역 Api`</span>

카카오에서 제공하는 번역 API의 주요 기능으로는 문장을 번역하거나 ,  문장감지하기 기능 2가지가 있습니다.

REST API  방식으로 제공받을 수 있습니다.  전송방식으로 GET과 POST 둘다 쓸수 있는게 앞의 음성 API와는 조금 다른점이네요.

조금더 전체적인 부분은 카카오 디벨로퍼 사이트를 참조해 주시고 

이번에 C# 에서 REST API 를 이용하여 구현해 보았습니다 



## <span style="color:darkblue">2. 문장 번역</span>

<span style="color:darkblue">`2.1. Code description`</span>

```c#
/////////////GET 방식
string sss = "src_lang=kr&target_lang=en&query=사과"; // 보낼 데이터를 xml 형식으로 만들어주고
string url = "https://dapi.kakao.com/v2/translation/translate?" + sss; // HOST 및 URL
string rest_api_key = "????????????"; // 내 어플리케이션 => 어플선택 => 기본정보의 앱 키 > REST Key 값 부여            

HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url); // 해당 URL로 네트웍을 만든다
request.Headers.Add("Authorization", "KakaoAK " + rest_api_key); // 헤더에 옵션값을 추가한다.
request.ContentType = "application/x-www-form-urlencoded";// 콘텐츠타입을 명시한다
request.Method = "GET"; // get 으로 보낼지 post로 보낼지 명시한다.

string responseText = string.Empty;
using (WebResponse response = request.GetResponse()) // 보낸데이터를 기반으로 받는다
{
    Stream stream = response.GetResponseStream(); // 받은 데이터를 스트림으로 쓴다
    using (StreamReader sr = new StreamReader(stream)) // 스트림을 읽기 위해 리더를 오픈한다.
    {
        responseText = sr.ReadToEnd(); // 스트림의 내용을 읽어서 문자열로 반환해준다.
    }

    Console.WriteLine(responseText); // 내용을 로그로 출력한다.
}


/////////////POST 방식
string url = "https://dapi.kakao.com/v2/translation/translate"; // HOST 및 URL
string rest_api_key = "????????????"; // 내 어플리케이션 => 어플선택 => 기본정보의 앱 키 > REST Key 값 부여            

HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url); // 해당 URL로 네트웍을 만든다
request.Headers.Add("Authorization", "KakaoAK " + rest_api_key); // 헤더에 옵션값을 추가한다.
request.ContentType = "application/x-www-form-urlencoded";// 콘텐츠타입을 명시한다
request.Method = "POST"; // get 으로 보낼지 post로 보낼지 명시한다.

string sss = "src_lang=kr&target_lang=en&query=사과"; // 보낼 데이터를 xml 형식으로 만들어주고
byte[] byteDataParams = Encoding.UTF8.GetBytes(sss); // 데이터를 UTF-8 형식의 바이트 배열로 변환시켜준다.
request.ContentLength = byteDataParams.Length; // 보낼 데이터의 길이를 설정해준다.

using (Stream reqStream = request.GetRequestStream()) // 네트웍을 열어서 데이터를 보낸다.
{
    reqStream.Write(byteDataParams, 0, byteDataParams.Length); // 데이터 쓰기
}

string responseText = string.Empty;
using (WebResponse response = request.GetResponse()) // 보낸데이터를 기반으로 받는다
{
    Stream stream = response.GetResponseStream(); // 받은 데이터를 스트림으로 쓴다
    using (StreamReader sr = new StreamReader(stream)) // 스트림을 읽기 위해 리더를 오픈한다.
    {
        responseText = sr.ReadToEnd(); // 스트림의 내용을 읽어서 문자열로 반환해준다.
    }

    Console.WriteLine(responseText); // 내용을 로그로 출력한다.
}
```

<span style="color:darkblue">`2.2. Result`</span>

GET이나 POST 어떤 방식을 쓰든 결과값은 같으니 원하시는 방식으로 쓰시면 될거 같아요

결과값 : {"translated_text":[["apple"]]}

이 이런식으로 문자열로 오고 있습니다.

지원 언어로는 아래 표를 참고해주세요

![img](/assets/img/kakao/translate_1.png)

## <span style="color:darkblue">3. 문장 감지</span>

<span style="color:darkblue">`3.1. Code description`</span>

```c#
/////////////GET 방식
string sss = "query=한글"; // 보낼 데이터를 xml 형식으로 만들어주고
string url = "https://dapi.kakao.com/v3/translation/language/detect?" + sss; // HOST 및 URL
string rest_api_key = "????????????"; // 내 어플리케이션 => 어플선택 => 기본정보의 앱 키 > REST Key 값 부여            

HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url); // 해당 URL로 네트웍을 만든다
request.Headers.Add("Authorization", "KakaoAK " + rest_api_key); // 헤더에 옵션값을 추가한다.
request.ContentType = "application/x-www-form-urlencoded";// 콘텐츠타입을 명시한다
request.Method = "GET"; // get 으로 보낼지 post로 보낼지 명시한다.

string responseText = string.Empty;
using (WebResponse response = request.GetResponse()) // 보낸데이터를 기반으로 받는다
{
    Stream stream = response.GetResponseStream(); // 받은 데이터를 스트림으로 쓴다
    using (StreamReader sr = new StreamReader(stream)) // 스트림을 읽기 위해 리더를 오픈한다.
    {
        responseText = sr.ReadToEnd(); // 스트림의 내용을 읽어서 문자열로 반환해준다.
    }

    Console.WriteLine(responseText); // 내용을 로그로 출력한다.
}


/////////////POST 방식
string url = "https://dapi.kakao.com/v3/translation/language/detect"; // HOST 및 URL
string rest_api_key = "??????????"; // 내 어플리케이션 => 어플선택 => 기본정보의 앱 키 > REST Key 값 부여            

HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url); // 해당 URL로 네트웍을 만든다
request.Headers.Add("Authorization", "KakaoAK " + rest_api_key); // 헤더에 옵션값을 추가한다.
request.ContentType = "application/x-www-form-urlencoded";// 콘텐츠타입을 명시한다
request.Method = "POST"; // get 으로 보낼지 post로 보낼지 명시한다.

string sss = "query=한글"; // 보낼 데이터를 xml 형식으로 만들어주고
byte[] byteDataParams = Encoding.UTF8.GetBytes(sss); // 데이터를 UTF-8 형식의 바이트 배열로 변환시켜준다.
request.ContentLength = byteDataParams.Length; // 보낼 데이터의 길이를 설정해준다.

using (Stream reqStream = request.GetRequestStream()) // 네트웍을 열어서 데이터를 보낸다.
{
    reqStream.Write(byteDataParams, 0, byteDataParams.Length); // 데이터 쓰기
}

string responseText = string.Empty;
using (WebResponse response = request.GetResponse()) // 보낸데이터를 기반으로 받는다
{
    Stream stream = response.GetResponseStream(); // 받은 데이터를 스트림으로 쓴다
    using (StreamReader sr = new StreamReader(stream)) // 스트림을 읽기 위해 리더를 오픈한다.
    {
        responseText = sr.ReadToEnd(); // 스트림의 내용을 읽어서 문자열로 반환해준다.
    }

    Console.WriteLine(responseText); // 내용을 로그로 출력한다.
}
```

<span style="color:darkblue">`3.2. Result`</span>

결과값 : {"language_info":[{"code":"kr","name":"Korean","confidence":1.0}]}

이런식의 문자열로 옵니다.

confidence 이부분이 정확도 같은 느낌인데 보낸문자가 조금 애매할 경우 한글 0.8 영어 0.5 머 이런식으로 온다고 합니다.



감사합니다.
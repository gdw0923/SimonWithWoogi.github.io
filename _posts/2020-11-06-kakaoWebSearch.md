---
title: kakao Daum 검색 open api 실습해보자
author: Woogi
date: 2020-11-06 10:40:00 +0800
categories: [OpenAPI, KAKAO]
tags: [open api]
image: /assets/img/kakao/search_2.png

---

## <span style="color:darkblue">1. What is Kakao Daum 검색 API</span>

<span style="color:darkblue">`1.1. 검색 Api`</span>

카카오에서 제공하는 검색 API는 웹문서, 동영상, 이미지, 블로그, 책 , 카페 6가지를 제공하고 있고 웹쪽에 특화되어 있다보니 아무래도 결과값도 웹에서 쓸만하게 리턴나오는거 같습니다. 

하지만 웹에서 구현하는건 아무래도 많이들 했기 때문에 여기선 역시 C# 으로 구현해보겠습니다.

REST API  방식으로 제공받을 수 있습니다.  전송방식으로 GET으로만 쓸수 있게 되어 있네요 

각 부분별로 sort나 page size 등등 파라미터를 붙여서 보내 여러가지 옵션검색을 할 수 있는데 

그건 디벨로퍼 사이트 참고해서 해주시면 될거 같고 여기선 기본만 해보겠습니다.



## <span style="color:darkblue">2. 웹문서, 동영상, 이미지, 블로그, 책 , 카페</span>

<span style="color:darkblue">`2.1. Code description`</span>

```c#
public void kakak_API_search_web(string type, string query)
{
    /////////////GET 방식
    string sss = "query=" + query; // 보낼 데이터를 xml 형식으로 만들어주고
    string url = string.Empty;
    switch (type)
    {
                
        case "vclip":
            //동영상검색
            url = "https://dapi.kakao.com/v2/search/vclip?" + sss;
            break;
        case "image":
            //이미지검색
            url = "https://dapi.kakao.com/v2/search/image?" + sss;
            break;
        case "blog":
            //블로그검색
            url = "https://dapi.kakao.com/v2/search/blog?" + sss;
            break;
        case "book":
            //책검색
            url = "https://dapi.kakao.com/v3/search/book?" + sss;
            break;
        case "cafe":
            //카페검색
            url = "https://dapi.kakao.com/v2/search/cafe?" + sss;
            break;
        case "web":
            //웹문서
        default:
            url = "https://dapi.kakao.com/v2/search/web?" + sss; // HOST 및 URL
            break;
    }
            
    string rest_api_key = "eebe73a9a75343e52c3201927c69fce3"; // 내 어플리케이션 => 어플선택 => 기본정보의 앱 키 > REST Key 값 부여            

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
}
```

<span style="color:darkblue">`2.2. Result`</span>

![img](/assets/img/kakao/search_1.png)

간단하게 form 에서 라디오버튼으로 구분하여 텍스트박스에 텍스트를 전송버튼을 누르면 검색된 내용이 로그로 출력되도록 한 것입니다.

결과값이 되게 방대하게 나와서 사진으로 첨부하겠습니다.

![img](/assets/img/kakao/search_3.png)



이렇게 나오는데 순서대로 

웹문서, 동영상, 이미지, 블로그, 책 , 카페순으로 결과 텍스트가 나온겁니다.

이걸 가공해서 폼에서 보여주는건 좀 이것저것 해야될거 같은 느낌이지만 일단 API써서 결과값을 받는거까지가

오늘의 목표기 때문에 여기서 잠시 마무리 하겠습니다.


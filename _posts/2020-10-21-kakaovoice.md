---
title: kakao 음성 open api 실습해보자
author: Woogi
date: 2020-10-21 09:14:00 +0800
categories: [OpenAPI, KAKAO]
tags: [open api]
image: /assets/img/kakao/voice_1.png

---

## <span style="color:darkblue">1. What is Kakao 음성 API</span>

<span style="color:darkblue">`1.1. 음성 Api`</span>

카카오에서 제공하는 음성 API의 주요 기능으로는 사람의 음성정보를 이해하여 문자로 변환하거나, 문자를 음성정보로 합성하는 2가지 정도의 기능으로 

제공합니다.

REST API , Android, IOS 3가지 방식으로 제공받을 수 있습니다. 조금더 전체적인 부분은 카카오 디벨로퍼 사이트를 참조해 주시고 

이번엔 C# 에서 REST API 를 이용하여 구현해 보았습니다 



## <span style="color:darkblue">2. 음성 인식</span>

<span style="color:darkblue">`2.1. Code description`</span>

```jsp
using System.IO;
using System.Net;

string url = "https://kakaoi-newtone-openapi.kakao.com/v1/recognize"; // HOST 및 URL
string rest_api_key = "??????"; // 내 어플리케이션 => 어플선택 => 기본정보의 앱 키 > REST Key 값 부여            
string FiePath = @"C:\Temp\heykakao.wav"; ; // 파일경로

HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url); // 해당 URL로 네트웍을 만든다
request.Headers.Add("Authorization", rest_api_key); // 헤더에 옵션값을 추가한다.
request.ContentType = "application/octet-stream";// 콘텐츠타입을 명시한다
request.Method = "POST"; // get 으로 보낼지 post로 보낼지 명시한다.

FileStream file = new FileStream(FiePath,FileMode.Open); // 보낼 파일을 오픈한다.
byte[] byteDataParams = new byte[file.Length]; // 보낼파일의 크기만큼 바이트배열을 만든다.
            
file.Read(byteDataParams, 0, byteDataParams.Length); // 파일을 읽어서 바이트배열에 데이터를 넣는다.

request.ContentLength = byteDataParams.Length; // 네트웍으로 보낼 데이터 길이를 명시한다.

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

![img](/assets/img/kakao/voice_1.png)

이런식으로 결과가 JSON 형식으로 리턴이 됩니다.(전부 문자열)

이제 이걸 가공해서 출력해주면 되겠습니다.

그러나 기본 노트북으로 음성을 녹음해서 전송하니 에러코드 -4가 (결과값 없음)이 리턴되더군여 음성파일을 만들때 

중요한 규칙인  음성 데이터는 Mono channel, 16000 Hz samplerate, 16 bit depth인 `RAW PCM` 포맷을 

지켜서 파일을 보내야 결과값을 제대로 받을수 있겠네요



## <span style="color:darkblue">3. 음성 합성</span>

<span style="color:darkblue">`3.1. Code description`</span>

```jsp
using System.IO;
using System.Net;

string text = "하헤히호후 카카오"; // 음성합성할 문자값
string url = "https://kakaoi-newtone-openapi.kakao.com/v1/synthesize"; // HOST 및 URL
string rest_api_key = "??????"; // 내 어플리케이션 => 어플선택 => 기본정보의 앱 키 > REST Key 값 부여
string VoiceName = "WOMAN_DIALOG_BRIGHT"; // attribute value(음성 선택)
string FiePath = @"C:\Temp\heykakao.wav"; ; // 파일경로

HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url); // 네트웍을 만든다.
request.Headers.Add("Authorization", rest_api_key); // 보낼 데이터에 헤더를 추가한다.
request.ContentType = "application/xml"; // 데이터 타입을 명시한다.
request.Method = "POST"; // 데이터 전송방식을 명시한다.

string sss = "<speak><voice name=\"" + VoiceName + "\">" + text + "</voice></speak>"; // 보낼 데이터를 xml 형식으로 만들어주고
byte[] byteDataParams = Encoding.UTF8.GetBytes(sss); // 데이터를 UTF-8 형식의 바이트 배열로 변환시켜준다.
request.ContentLength = byteDataParams.Length; // 보낼 데이터의 길이를 설정해준다.

Stream st = request.GetRequestStream(); // 데이터를 보낸다
st.Write(byteDataParams, 0, byteDataParams.Length); // 데이터를 쓴다.
st.Close(); // 닫는다.

HttpWebResponse response = (HttpWebResponse)request.GetResponse(); // 보낸거에 대한 응답을 받는다.
string status = response.StatusCode.ToString(); // 결과값에 대한 코드를 받는다.
using (Stream output = File.OpenWrite(FiePath)) // 파일을 쓰기 위한 준비를 한다(지정한 파일경로)
using (Stream input = response.GetResponseStream()) // 받은 값을 스트림에 넣는다.
{
    input.CopyTo(output); // 파일을 쓴다. 
}
```

<span style="color:darkblue">`3.2. Result`</span>

음성 합성은 파일로 저장이 되는데 이제 이걸 가공해서 출력해주면 되겠습니다.

![img](/assets/img/kakao/voice_2.png)

이런식으로 파일로 전송이 됩니다.

그리고 

VoiceName 변수에 밑의 옵션을 바꿔서 넣어주면 목소리가 선택된것으로 생성되어 옵니다.

WOMAN_READ_CALM = 차분한 여성 목소리

MAN_READ_CALM = 차분한 남성 목소리

WOMAN_DIALOG_BRIGHT = 밝은 여성 목소리

MAN_DIALOG_BRIGHT = 밝은 남성 목소리  

감사합니다.
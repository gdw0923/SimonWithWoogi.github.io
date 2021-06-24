---
title: Blazor_log
author: Woogi
date: 2021-06-24 13:50:00 +0800
categories: [FrameWork, Blazor]
tags: [Blazor]
image: /assets/img/Blazor/logo.png

---

## <span style="color:darkblue">Blazor Log</span>

<span style="color:darkblue">`1.1. log`</span>

Blazor 는 로그는 Console.WriteLine 하면 저는 제대로 안나오더라구요 나오게 하는 방법이 있다는데 
Blazor 공식문서에 로그 찍는법이 따로 있어서 그 방법으로 알려드리겠습니다.

일단 VS 2019 , NET 5 , Blazor WebAssembly 로 만든 프로젝트입니다.

![img](/assets/img/Blazor/log_1.bmp)

웹 어셈블리 선택해서 다음 누르시고

![img](/assets/img/Blazor/log_2.bmp)

프로젝트 이름이랑 경로 잘 선택해서 다음 하시고

![img](/assets/img/Blazor/log_3.bmp)

HTTPS 구성 하신다면 체크하시고 ASP.NET Core hosted 는 원래는 클라이언트만 만드는 프로젝트인데 서버도 따로 만들것이냐 물어보는것인데 저는 서버를 쓸것이기 때문에 체크 해줍니다. PWA 머 다음에 설명하고 일단은 체크 안하고 넘어가겠습니다.

![img](/assets/img/Blazor/log_4.bmp)

이런식의 프로젝트 구조가 생깁니다.

최신버전은 이제 보통은 있는데 클라이언트에 Progra[m.cs](http://m.cs/) 파일에 



```c#
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
```

이게 using 되어있는지 체크해준다.

그리고 Counter.razor 페이지로 가면 



```c#
@page "/counter"

@using Microsoft.Extensions.Logging // log를 위한 using
@inject ILogger<Counter> logger // log를 위한 인젝션

<h1>Counter</h1>

<p>Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;

        logger.LogWarning("증가!!"); // log 출력
    }
}

```

이런 코드가 있는데 눈치 빠른식분들은 아시겠지만 위에 using 과 inject 구문을 추가해줬고 버튼 눌릴때마다 증가 하면서 로그출력을 걸었습니다.

![img](/assets/img/Blazor/log_5.bmp)

이렇게 로그로 증가!! 뜨는게 보이시면 완료입니다.
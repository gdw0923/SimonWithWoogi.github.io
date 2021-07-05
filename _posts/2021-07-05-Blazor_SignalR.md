---
title: Blazor_SignalR 통신
author: Woogi
date: 2021-07-05 13:50:00 +0800
categories: [FrameWork, Blazor]
tags: [Blazor]
image: /assets/img/Blazor/logo.png

---

## <span style="color:darkblue">Blazor SignalR</span>

<span style="color:darkblue">`1.1. 메세지 주고 받기 SignalR_Hub`</span>

Blazor 에서는 GET 이나 POST 통신이 아닌 SignalR 이라는 통신(웹소켓등을 혼합한 통신임) 을 해서 데이터를 주고받는다

그럴때 간단한 메세지들을 클라이언트 - 서버 - 클라이언트 간 주고 받는 방법을 알아보자



먼저 저번에 만들어둔 Test Project 에서 클라이언트 쪽에 Microsoft.AspNetCore.SignalR.Client 패키지를 설치해줘야 한다.

![img](/assets/img/Blazor/signalr_1.bmp)

클라이언트 프로젝트에서 마우스 오른쪽하면 NuGet 패키지 관리는 다들 알거라 믿는다.



어째든 저 패키지를 클라이언트 쪽에 설치해주고 서버쪽 프로젝트에 Hubs 라는 폴더에 Chat.cs 클래스를 추가합니다.

![img](/assets/img/Blazor/signalr_2.bmp)

이런식으로 클래스 안에 내용을 기입해줍니다.

그다음에 서버쪽 Startup.cs 파일을 열어 

```c#
using TestProject.Server.Hubs; // 이부분추가 

public void ConfigureServices(IServiceCollection services)
{
    services.AddSignalR();    // 이부분추가 
    services.AddControllersWithViews();
    services.AddRazorPages();
   // 여기부터
    services.AddResponseCompression(opts =>
    {
        opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
            new[] { "application/octet-stream" });
    });
    //여기까지 추가
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseResponseCompression(); // 이부분 추가

    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseWebAssemblyDebugging();
    }
    else
    {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseBlazorFrameworkFiles();
    app.UseStaticFiles();

    app.UseRouting();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapRazorPages();
        endpoints.MapControllers();
        endpoints.MapHub<ChatHub>("/chathub"); // 이부분 추가 
        endpoints.MapFallbackToFile("index.html");
    });
}
```

이런식으로 바꿔주고



클라이언트 쪽 Index.razor 파일에 

```c#
@page "/"

@using Microsoft.AspNetCore.SignalR.Client
@inject NavigationManager NavigationManager
@implements IAsyncDisposable

<div class="form-group">
    <label>
        User:
        <input @bind="userInput" />
    </label>
</div>
<div class="form-group">
    <label>
        Message:
        <input @bind="messageInput" size="50" />
    </label>
</div>
<button @onclick="Send" disabled="@(!IsConnected)">Send</button>

<hr>

<ul id="messagesList">
    @foreach (var message in messages)
    {
        <li>@message</li>
    }
</ul>

@code {
    private HubConnection hubConnection;
    private List<string> messages = new List<string>();
    private string userInput;
    private string messageInput;

    protected override async Task OnInitializedAsync()
    {
        hubConnection = new HubConnectionBuilder()
            .WithUrl(NavigationManager.ToAbsoluteUri("/chathub"))
            .Build();

        hubConnection.On<string, string>("ReceiveMessage", (user, message) =>
        {
            var encodedMsg = $"{user}: {message}";
            messages.Add(encodedMsg);
            StateHasChanged();
        });

        await hubConnection.StartAsync();
    }

    async Task Send() =>
        await hubConnection.SendAsync("SendMessage", userInput, messageInput);

    public bool IsConnected =>
        hubConnection.State == HubConnectionState.Connected;

    public async ValueTask DisposeAsync()
    {
        await hubConnection.DisposeAsync();
    }
}
```

이런식으로 추가를 하면 기본적으로 모든 클라리언트가 대화를 주고 받을수 있는 기초가 완성되었습니다.

![img](/assets/img/Blazor/signalr_3.bmp)

이렇게 2개 띄어노면 메세지가 왓다갓다 하는걸 볼수 있습니다.

그리고 제가 한 3일동안 검색한게 있는데 특정 사용자에게 보내고 싶을때가 있겠죠? 위의 예제는 무조건 모두에게 보내는거니까요.



서버 hub 쪽 코드에  보내는 쪽에서 All 부분이 Caller 부분으로 바뀌었죠 ? 이거 뜻이 이 메세지를 보내 사람에게만 답장하겠단 뜻입니다.

일단 카카오톡처럼 다른 ID 를 가진 유저에게 보내는거처럼 하는거는 못 찾았는데 여기까지만 찾았네요 ... 



```c#
await Clients.Caller.SendAsync("ReceiveMessage", str);
```

가장 기초 문서

https://docs.microsoft.com/ko-kr/aspnet/core/tutorials/signalr-blazor?view=aspnetcore-5.0&tabs=visual-studio&pivots=webassembly

살짝 고급?문서

https://docs.microsoft.com/ko-kr/aspnet/core/signalr/hubs?view=aspnetcore-5.0



위 2가지 공식문서의 내용을 참고하여 포스트 했습니다.
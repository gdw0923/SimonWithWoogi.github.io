---
title: Blazor_start
author: Woogi
date: 2021-06-22 21:27:00 +0800
categories: [FrameWork, Blazor]
tags: [Blazor]
image: /assets/img/Blazor/logo.png

---

## <span style="color:darkblue">Blazor</span>

<span style="color:darkblue">`1.1. 기초설명`</span>

사실 설명은 공식소개문서가 훨씬 잘되어있지만 ...

그냥 간단하게 설명하면 Microsoft C# 기반 웹 프레임 워크라고 생각하시면 됩니다.

Java에는 대표적으로  Spring 이 있죠 ? 그런느낌이라고 보면 됩니다 !

https://docs.microsoft.com/ko-kr/aspnet/core/blazor/?view=aspnetcore-5.0



웹의 대표인 HTML, CSS, javascript 등 웹의 기초지식은 알고 계시단 전제하에 설명을 드려야 합니다.

또한 비주얼스튜디오 2019 로 진행되었으면 VS Code 나 다른 IDE도 많이 있지만 비주얼스튜디오가 가장 편하다고 생각되어 진행하게 되었습니다.

그리고 .NET 5 버전 입니다.

또 하다가 안쓸수도 있지만 일단 start 해보겠습니다 !.

<span style="color:darkblue">`1.1. 시작하기`</span>

구글에다 비주얼스튜디오 검색하셔서 설치하시고(개인은 커뮤니티 버전) 설치 완료하여 실행하시면

새 프로젝트 만들기 -> Blazor 검색하시면 Blazor Server 이랑 Blazor WebAssembly 가 나올텐데 

각자 차이가 있다면 Server 는 웹서버와 클라이언트 페이지가 한 프로젝트에 다 있어서 사용자가 

접속할때마다 사이트에서 모든 페이지렌더링을 다해서 클라이언트에 전달하는 방식으로 동작하고

WebAssembly 는 Server 따로 Client 페이지 따로 개발할 수 있는 구조로 되어있습니다.

어떤게 더 좋으냐는 딱히 없는거 같고 상황에 따라 장단점이 있으니 용도에 맞게 잘 선택하여 쓰시면 됩니다.

제 입장으로는 개발하기 편한건 Server가 편한거 같고 그러네요 ...

하지만 전 WebAssembly 로 진행중입니다.

그래서 WebAssembly 선택하시고 프로젝트 경로 설정해주시고 이름 등등 설정해주셔서 만들기 누르면

프로젝트가 자동으로 만들어집니다. 참 편하네요.

그리고 F5 누르고 실행시키면 자동으로 Test 페이지 뜨면서 이거저거 뜨는데 고거는 다음 시간에 알아보겠습니다!...

정리하면 오늘도 Hello World만 찍은 느낌이네요.
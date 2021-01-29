---
title: JAVA를 시작해보자
author: Woogi
date: 2021-01-29 15:10:00 +0800
categories: [Programming, JAVA]
tags: [java]
image: /assets/img/kakao/vision_4.png

---

## <span style="color:darkblue">1. What is JAVA</span>

<span style="color:darkblue">`1.1. JAVA는 무엇인가`</span>

자바는 썬 마이크로시스템즈의 제임스 고슬링이 주축이 되어 만든 객체 지향적 프로그래밍 언어인데 프로그래밍언어중 가장 유명한 언어중 1개로 

꼽지 않나 하는 생각이 듭니다.

자바의 역사는 여기까지 하고 일단 자바를 해볼려면 자바 개발 기트 , 즉 JDK 라는것을 설치하는것과 

C#이나 C++ 개발자들이 비주얼스튜디오로 개발을 하는것처럼 자바개발을 위한 IDE가 있는데 무료버전중 유명한것이 이클립스 라는것이 있습니다.



그래서 자바를 시작해보려면 JDK, 이클립스 이 2개를 설치해서 시작해야합니다.

## <span style="color:darkblue">2. 설치</span>

<span style="color:darkblue">`2.1. 설치법`</span>

![img](/assets/img/java/start_java_1.png)

요렇게 검색을 하면 가장 윗줄에 오라클 공식사이트로 연결되는 다운로드 사이트가 나옵니다. 여기를 들어가서 현재까지는 Java SE 15 버전까지 나왔는데

스크롤바를 밑으로 가면 11 버전 8 버전등 다양한 버전을 확인 할수 있는데 가장 최근버전 다운로드 받으시면 됩니다.

![img](/assets/img/java/start_java_2.png)

클릭해서 들어가시면 또 스크롤바로 둘러보면 운영체제별로 다운로드 링크가 각각 걸려있는데 자기 운영체제에 맞는 버전을 골라 한가지 

다운로드 해서 실행후 next 만 누르면서 설치 해주시면 됩니다.

그 다음으로 이클립스 설치인데 마찬가지로 

![img](/assets/img/java/start_java_3.png)

검색을 이렇게 해주면 가장 윗줄에 이클립스 사이트가 나오는걸 확인할 수 있습니다.

클릭해서 들어가보면 

![img](/assets/img/java/start_java_4.png)

바로 이렇게 다운로드 버튼을 확인할 수 있습니다. 다운받아 실행을 시키시면 

![img](/assets/img/java/start_java_5.png)

이런식으로 메뉴가 나오는데 저희는 자바를 할것이기 때문에 가장위에 Eclipse IDE for java Developers 를 눌러주시면 됩니다.

![img](/assets/img/java/start_java_6.png)

그 다음 메뉴에는 이렇게 인스톨 화면이 나오는데 자바를 위의 사진에 빨간 박스안에 표시된게 설치된 자바 jdk 경로입니다.

인스톨버튼 눌러서 설치를 진행해주세요.

설치가 다 되었다면 마지막으로 환경변수라는걸 설정해주어야 하는데 이건 

내 컴퓨터에다가 자바를 쓸때 이 경로를 참조해서 써라 라고 알려주는 작업입니다.

자 내 컴퓨터 - 속성 - 고급 시스템 설정 - 환경변수 - 사용자 변수의 새로 만들기 버튼을 눌러주시면 

![img](/assets/img/java/start_java_8.png)

이 나오는데 변수이름으로 JAVA_HOME 변수값으로 아까 설치된 자바 디렉토리

(아무설정하지 않으셧다면 c 드라이브에 : Program Files : java 폴더에 버전별로 정리) 가 되어 있습니다.

그 다음에 시스템 변수에서 스크롤을 찾으시면 Path 라는 변수를 찾을수 있습니다.

Path 클릭 - 편집 - 새로 만들기를 누르고 %JAVA_HOME%\bin 이라고 입력 해 주세요 

그리고 확인 확인으로 빠져 나오시면 됩니다.



<span style="color:darkblue">`2.2. Result`</span>

자 이렇게 설치가 다 되면 프로그램의 첫 단계 헬로 월드를 찍어봐야 되겠죠 ?? 

![img](/assets/img/java/start_java_7.png)

처음 실행을 시키면 이렇게 작업공간을 물어보는 창이 나오는데 저기 use this as the default and do not ask again 을 

누르면 다음에 실행시킬때 물어보지 않고 오늘 설정한 작업공간을 기본으로 생각하겠다는 의미입니다.

작업경로를 바꾸고 싶으신분들은 바꿔서 런처를 눌러주시고 아닌분들은 바로 런처를 누르면 되겠습니다.

그 후 메뉴에서 Window 탭에서 Preferences 들어가서 

![img](/assets/img/java/start_java_10.png) 이렇게 검색을 하시면 스펠링 탭이 나오는데 Other 에 UTF-8 선택후 

어플라이

![img](/assets/img/java/start_java_11.png)

제너럴에 워크스페이스에 Other 에 UTF-8 선택후 어플라이 하면 됩니다.

그리고 나서  File - New - Java Project  후 Project name 에 sample01 적으셔서 

피니쉬 누르면 모듈을 만들거냐고 물어보는 대화상자가 나오는데 Don't Create 누르시면 됩니다.

![img](/assets/img/java/start_java_12.png)

그 후에 위 사진처럼 클래스 선택후 이름에 mainClass 라고 이름을 입력하여 피니쉬를 누르면 되는데 

main 만 딱 적고 하시면 안된다는걸 말씀드려요 이름 충돌문제가 있네요.

```java
package sample01;

public class mainClass {
	
	public static void main(String[] args) {


		System.out.println("Hello Java");

	}
}

```

해서 이렇게 코드를 적어주시고 

위 사진에서 재생표시 초록색을 누르면 

![img](/assets/img/java/start_java_13.png)

이렇게 콘솔창에 헬로 월드가 출력되는걸 확인 할수 있습니다.....



이렇게 긴 여정을 왔네요 ,,, 다음시간엔 드디어 초보적이지만 프로그래밍 다운걸 좀더 들어가보도록 하겠습니다 !!
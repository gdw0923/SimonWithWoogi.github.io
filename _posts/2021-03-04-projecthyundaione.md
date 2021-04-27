---
title: Textmining, 현대자동차 여론을 조사해보자(1)
author: Simon Anderson
date: 2021-03-04 10:32:00 +0800
categories: [Project, Data Science]
<<<<<<< HEAD
tags: [BigData, Cloud, AI, IoT, AIoT, TextMining, Python, C#, Naver, Hyundai, Kakao]
=======
tags: [BigData, Cloud, AI, IoT, AIoT, TextMining, Python, CSharp, Naver, Hyundai, Kakao]
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
image: /assets/img/Project/1_Preview.png
math: true
---



 **해당 프로젝트는 현대자동차의 브랜드 밸류를 텍스트 마이닝을 통해 알아봅니다. 현대자동차 브랜드 밸류 조사할 때는 자체제작한 AI 스피커를 이용하여 자연어로 인터페이스(NUI)합니다. 끝으로 해당 프로젝트는 현대자동차의 지원을 받지 않았으며, 그저 현대자동차 소액 주주로서 만든 프로젝트입니다.**



## <span style="color:darkblue">1. Introduction</span>

![Structure](/assets/img/Project/1_1.png)

  이번 프로젝트는 위와 같은 시스템을 구성할 것입니다. 사람이 말로 요청을하면 작은 `Module` 이 듣고있다가, `클라우드 서버` 에 내용을 전송하여 `서버` 가 `요청사항`을 해결해줍니다. `요청사항` 은 이번 프로젝트의 `여론조사` 만이 아니라 날씨, 주식, 일정변경 등 `Siri` 가 일상적으로 할 수 있는 기능까지 포함됩니다. 먼저 필요한 하드웨어 리스트를 작성하겠습니다. 또한 필요한 소프트웨어 언어는 `Scala(Java도 가능), Python(MATLAB도 가능), 약간의 Linux 지식` 입니다.

### <span style="color:darkblue">1.1. Hardware list</span>

![Arduino](/assets/img/Project/1_2.png)

 `IoT module` 을 이용하기 때문에, `아두이노(Arduino)` 를 쓰기로 했습니다. 또한 `Wifi` 를 통해 `클라우드 서버` 에 접근해야 하니까, `Wifi` 기능이 내장되어있는 `우노+Wifi D1 R2` 보드를 선택했습니다. `Wifi module`  중에 가장 널리쓰이는 칩 중 하나인  `ESP8266` 는 가격이 저렴해서 좋습니다. 그리고 늘 연결된 상태가 아니라 `Event-driven` 으로 작동되기에 충분하다고 판단했습니다. 또한 `NUI` 로서 `인터페이스` 하니까, 녹음모듈과 스피커도 구매했습니다.

**아두이노 보드 전원 공급용 9.1V ~ 12V 전원 어댑터가 없다면 별도로 구매해주세요.**

### <span style="color:darkblue">1.2. Arduino uno + Wifi D1 R2</span>

![pin map](/assets/img/Project/1_3.png)

 `3.3V` 에 동작전압인 `uno` 보드는 `I2C와 SPI` 통신도 지원하고 있습니다. 저희는 같이 탑재된 `Wifi` 를 사용하기 때문에 필요없지않나 할 순 있겠지만, `녹음모듈` 이 시리얼 통신을 통해 인터페이스를 합니다. 

### <span style="color:darkblue">1.3. Tinkercad.com</span>

![Tinkercad](/assets/img/Project/1_4.png) 

 `Tinkercad` 는 `CAD` 로 유명한 회사인 `Autodesk` 가 만든 시뮬레이션 사이트입니다. `Modeling` 도 가능하면서 `Arduino` 회로 구성, 프로그램 작성, 테스트까지 가능합니다. 또한 실제 모듈과 바로 이어서 사용할 수 있으니 필요하다면, 가상으로 환경을 꾸려보겠습니다. 

### <span style="color:darkblue">1.4. 카카오 딥 보이스</span>

 `Kakao` 의 `딥보이스` 는 총 네가지 기능을 지원합니다. 저희는 이 중에서, `딕테이션모드(받아쓰기)` 와 `검색모드` 를 사용할 것인데요. 여론조사용 크롤러를 돌리는 것은 개인적으로 만든 서버에 접근해야되기에 `딕테이션모드` 를 사용하구요. 그 외에는 전부 카카오 파일 시스템을 전적으로 의지하여 `검색모드`를 사용할 것입니다. 결론적으로 `아두이노` 가 마이크를 통해 유의미한 음성이라 판단된다면 바로 `카카오 딥 보이스` 에 해당 음성을 전송합니다. 

### <span style="color:darkblue">1.5. 네이버 나눔 AI 보이스</span>

![Tinkercad](/assets/img/Project/1_6.png) 

`Naver` 의 나눔 AI 보이스는 실제 목소리와 AI 목소리가 아주 유사합니다. 아주 높은 기술력으로 많은 데이터를 모으지 않고 특정 몇 대본만으로도 구현가능하죠. 국내에서 잘 만든 보이스 서비스는 최소한 자국민으로서 사용해줘야된다 생각합니다. 그래서 분석이 다 끝난 뒤 스피커를 통해 사람에게 전달되는 목소리는 `네이버 나눔 히구 보이스` 를 사용할 예정입니다. 허나 비용의 문제로 변경될 가능성이 있습니다. `TTS` 는 무료서비스가 많으니까요.

### <span style="color:darkblue">1.6. Text mining</span>

![pagerank](/assets/img/Project/1_7.png) 

 환경, 입출력에 대한 얘기는 끝났습니다. 코어부분인 `텍스트마이닝`을 통해서 얻어진 데이터로 부정적인지 긍정적인지 `Factor` 로서 반환하는 절차가 남았습니다. 먼저 `텍스트마이닝` 에는 `크롤러` 가 돌아다니면서 데이터 수집하구요. 벡터로 바꿔서 각 형태소에 맞는 숫자를 가져옵니다. 그리고 이런 과정에서 노이즈가 많이 끼기에 페이지에 따라 랭킹을 정하긴합니다만, 이번 개요에서는 개념만 설명하겠습니다. 이제는 충분히 말로서 설명하는 것은 끝났고 본격적으로 프로젝트를 진행하겠습니다.
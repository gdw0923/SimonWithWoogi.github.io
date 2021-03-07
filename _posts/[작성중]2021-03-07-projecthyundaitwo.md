---
ㅈtitle: Textmining, 현대자동차 여론을 조사해보자(2)
author: Simon Anderson
date: 2021-03-07 03:09:00 +0800
categories: [Project, Data Science]
tags: [BigData, Cloud, AI, IoT, AIoT, TextMining, Python, C#, Naver, Hyundai, Kakao]
image: /assets/img/Project/2_Preview.png
math: true
---



 **해당 프로젝트는 현대자동차의 브랜드 밸류를 텍스트 마이닝을 통해 알아봅니다. 현대자동차 브랜드 밸류 조사할 때는 자체제작한 AI 스피커를 이용하여 자연어로 인터페이스(NUI)합니다. 끝으로 해당 프로젝트는 현대자동차의 지원을 받지 않았으며, 그저 현대자동차 소액 주주로서 만든 프로젝트입니다.**



## <span style="color:darkblue">1. Text implies Opinion mining</span>

![TextvsOpinion](/assets/img/Project/2_1.png)

  여론조사의 가장 핵심부터 구현합니다. 전 포스팅에서는 `Text mining` 으로 얘기했는데요. 이제부터는 확실한 명칭으로서 얘기할려고 합니다. `Text mining, 텍스트 마이닝` 은 글자를 주워다가, 벡터 공간에 분류해서 어떤 연관선상에 있는지 까지를 주로 `텍스트 마이닝` 이라고 얘기합니다. 앞으로 저희가 할 내용은 `텍스트 마이닝` 으로부터 얻어진 데이터를 `부정, 중립, 긍정` 으로서 분리해서 점수로 매기는 것입니다. 그럼에도 불구하고 제가 이 포스팅을 제외하곤 `텍스트마이닝` 이라고 부를 예정입니다. 이유는 해당 블로그는 학술적 문서가 아니고 보다 많은 사람들이 접근하여 한번씩 테스트를 해봤으면 좋겠어서 널리 알려진 워딩으로 씁니다.

### <span style="color:darkblue">1.1. Flow</span>

![flow](/assets/img/Project/2_2.png)

`Opinion mining` 은 `Text mining` 에서 아주 조금 진화했다고 볼 수 있습니다. 그러니 `텍스트 마이닝` 의 가장 저명한 절차인 **문서수집 -> 형태소 분석 ->워드카운트** 를 먼저 진행하고 `오피니언 마이닝` 의 영역인 **화행분석 + 대화처리(감성분석)**를 진행하겠습니다

### <span style="color:darkblue">1.2. Python and utilities</span>

---

**Languages**

 이번 `오피니언 마이닝` 은 `Pycharm` 으로 진행하겠습니다. 먼저 `Pycharm` 을 설치해주시구요. [Pycharm install](https://www.jetbrains.com/ko-kr/pycharm/download/#section=mac)

그리고 `java` 와 `JDK` 도 같이 설치를 하겠습니다. [java install](https://www.java.com/ko/download/)

[JDK install](https://www.oracle.com/java/technologies/javase-downloads.html)

---

**Libraries **

 한글 자연어처리 모듈과 영어 자연어처리 모듈 둘 다 설치하겠습니다. 먼저 `Python` 과 `java` 가 설치됐다면 아래를 진행하여 주세요.

`Pycharm` 을 켜신 다음에 패키지 설치를 진행하겠습니다. 저는 `MAC` 유저라서 `Windows` 유저는 따로 구글에 검색을 진행해주세요. 아래의 리스트를 설치하겠습니다.

**첫번째**로 프로젝트를 만듭니다. 저는 아래와 같이 `OpinionMining` 이라는 프로젝트를 만들었습니다.

![Newproject](/assets/img/Project/2_3.png)

프로젝트 생성 후 **Pycharm -> Preference 에 들어가면 패키지(혹은 라이브러리) 관리 창이 나옵니다.**

| Library 설치 리스트                                          |
| ------------------------------------------------------------ |
| Matplotlib<br />pygame<br />simplejson<br />pytagclound<br />Pandas<br />Numpy<br />KoNLPy<br />NLTK<br />beautifulsoup4<br />JPype1<br />twitter<br />tweepy |

위 리스트를 설치하면 이런 모습이 보일 건데요. 혹시나 `last version` 값이 현재버전과 차이가 있다면, 클릭해서 업데이트할 수 있습니다.

![Newproject](/assets/img/Project/2_4.png)

---

 대부분의 자연어처리 모듈이름엔 `NLP(Natural Language Processing)` 앞에 특성화된 언어가 붙습니다. 예를들면 구글에 `KoNLP` 는 한국어에 특성화된 자연어처리 패키지를 알려주죠. 지금 등록된 자연어처리 패키지는 `한글, 영어` 입니다. 다른 언어가 필요하시다면 추가로 설치하셔도 됩니다.

### <span style="color:darkblue">1.3. Twitter API</span>

 우리나라의 `Twitter` 는 인식이 안 좋습니다. 그렇지만 전 세계적으로 텍스트 데이터는 활발히 모을 수 있죠. 예를 들어 `아이오닉` 에 대한 조사를 한국만이 아니라 전세계의 여론을 본다면 현대자동차에도 더 도움이 될 것입니다. 그러니 저희는 국제시장 정서 파악을 위해 `Twitter` 를 사용하겠습니다.

[Twitter API install](https://apps.twitter.com)

![twitter](/assets/img/Project/2_5.png)

우상단의 `Create an app` 을 클릭해주세요.  저는 `bot` 을 만든다고 하고 `standard api` 를 선택했습니다. 그리고 이걸로 뭐 할건지 쓰라고 하는데요. 저는 아래와 같이 적었습니다.

![dsec](/assets/img/Project/2_6.png)

어지간한 사항을 다 입력하면 확인용 메일을 날립니다. `Cofirm email` 을 클릭하면 새로 프로젝트를 만들어 봅시다.

![dsec](/assets/img/Project/2_7.png)

**이제 consumer, acceess `key` 와 `tocken` 을 잘 챙겨두세요!**

## <span style="color:darkblue">2. Text mining</span>

```python
# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.


def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press ⌘F8 to toggle the breakpoint.


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
```

`Pycharm` 에서 만들어진 새로운 프로젝트의 `main.py` 에 있는 첫 코드는 위와 같은 코드가 적혀있습니다.
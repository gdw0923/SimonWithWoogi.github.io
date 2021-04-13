---
title: 6 Sigma, 식스 시그마 1편
author: Simon Anderson
date: 2021-01-17 19:35:00 +0800
categories: [MATLAB, Quality]
tags: [MATLAB,Visualization, QualityManagement, Improvement, Statistics, Quality]
image: /assets/img/MATLAB_Quality/6_Preview.png
math: true
---

## <span style="color:darkblue">1. Six sigma</span>

 6번째 포스팅은 `식스시그마(6 Sigma, Six sigma)` 입니다. [이전 포스팅](https://simonwithwoogi.github.io/SimonWithWoogi.github.io/posts/matlabsixsigma/) 에서 잠깐 `통계적 이해` 를 돕기위해서 `6 Sigma` 를 언급한 적이 있습니다. 원리와 접근방법은 동일하나,  `6 Sigma` 가 `Quality` , `Management` 의 측면에서는 어떻게 이용되는 지를 얘기합니다. 그리고 `6 Sigma` 로만 논문을 쓰고 박사가 되기도 합니다. 그만큼 파고들수록 어려운 학문이기에 이 포스팅을 읽고나서 흥미가 생기신다면, 보다 전문적인 학술탐구를 해보시길 권장드립니다. 

### <span style="color:darkblue">1.1. Industrial Revolution</span>

![산업혁명](/assets/img/MATLAB_Quality/6_1.png)

**언제부터 삶이 편해지기 시작했을까? **

 1969년, 컴퓨터의 보급으로 3차 산업혁명을 알립니다. 그리고 하드웨어가 더 발전하며 21세기 초부터는 4차 산업혁명이 시작됐다고 하죠. 모든 산업의 동향이 급격하게 바뀐 것은 사실입니다. 그러니 어떤 `키워드` 에 집중됐는 지 확인해봅시다. `1차 산업혁명` 은 `증기기관`, `에너지원의 혁명` 이라고 할 수 있구요. `2차 산업혁명` 은 `양산`, `제품생산의 혁명` 입니다. `3차 산업혁명` 은 `전자기술, 자동화`, `인터넷 혁명` 입니다. 지금의 `4차 산업혁명` 은 `지능화, 가상화`, `모빌리티의 혁명` 이라고 볼 수 있죠. 저장소도, 서버도, 컴퓨터도, 운전사, 심지어 화폐까지 모두 고도의 가상으로 존재하며 고도의 지능으로 편의를 제공하고자 합니다.

 역사에 따르면, `실제 일상`에서 `산업혁명`을 바로 느낄 수 있었습니다. 그렇다면, **우리는 언제 `4차 산업혁명` 을 느낄 수 있었을까요?** 제 개인적인 주관이지만, 모두 공감할 것이라 생각합니다. **`스마트폰` 의 시작이라고 생각합니다.** 핸드폰이 단순 이동통신전화기에서 이동통신컴퓨터로 바뀌어 많은 삶을 바꾸어 놓았죠. 또한 스마트폰의 사용으로 데이터 사용량이 폭증하고 여러 데이터 수집이 원활해졌으며 이는 `지능화` 에 큰 도움을 줬습니다.

### <span style="color:darkblue">1.2. Motorola</span>

![가빈빌해리](/assets/img/MATLAB_Quality/6_2.png)

 **1980년대,** 그런 `스마트폰` 의 전신인 `이동통신전화기인 핸드폰` 과 관련하여 `미국` 과 `일본` 에서의 `반도체 전쟁의 시대` 가 시작됩니다. `일본` 이 세계시장에서 강세였고 그 중에서 `Motorola` 가 일본 내부에서도 우세를 선점하기위해 `품질개선` 에 집중합니다.

**5년안에 10배의 품질개선을 달성한다 - Robert Galvin**

`Motorola` 회장이 10배의 품질개선을 하라고 선언했습니다. 직원들 난리났죠? 그 중에 현장 엔지니어, `Bill Smith` 의 연구결과가 있습니다. 

---

- 결함에 의해 재작업을 거친 결과물은 고객의 초기사용단계에서 고장이 잦습니다.
- 다른 메이저 기업들의 현장을 살펴본 결과, 애초에 수리 및 재작업에 필요없는 수준으로 생산합니다.

---

지금보면 당연한 얘기가 맞긴한데, 이 시대에 본격적으로 머리에서 이미 인지한 내용을 `Motorola` 가 충분한 연구와 분석을 통해 정리한 것입니다. 여기서 본격적인 **누적수율(Rolled Throughput Yield)과 숨은 공장(Hidden Factory)** 의 개념이 나옵니다. 그리고 `Mikel Harry` 가 들어오죠. 

" 저 얘기대로 한다면, 누군가 불량기준을 널널하게 잡을 것이다. 그러니 체계적인 방법론을 만들고 전략을 수립한다 - Mikel Harry" 

`6 Sigma` 가 시작됩니다,

#### <span style="color:darkblue">1.2.1. Bill Smith's A/S report</span>

![ASReport](/assets/img/MATLAB_Quality/6_3.png)

 `Bill smith` 는 `단위당 결함 총계`이 증가할수록 생산의 적폐요소들이 늘어난다고 얘기합니다. 그러니 `단위당 결함 총계` 를 줄이면 고객에게 운송된 결함과 제품 수명 초기 불량률, 싸이클 타임이 감소되며 결론적으로 제조비용도 감소되고 고객도 만족하고 A/S 비용도 감소하는 모두가 행복한 세상이 찾아옵니다.

#### <span style="color:darkblue">1.2.2. Result</span>

![Result](/assets/img/MATLAB_Quality/6_4.png)

 그래서 이를 적극적으로 진행한 결과를 말씀드리면 시작 1년째인 `1988년` 에 480만 달러가 절약되구요. 4년째인 `1991` 년에는 22억 달러가 절약됩니다.

### <span style="color:darkblue">1.3. What is 6 sigma</span>

  `6 Sigma` 를 아직도 쓰는 곳이 있냐고 물어보는 사람 제법 있습니다. 시간이 지나며 많은 `품질개선` 에 대한 연구가 이뤄져 다른 대안이 많이 생겼습니다. 경영진 측에서는 좋은 일이죠. 그럼에도 불구하고 학계에서는 `6 Sigma` 를 꼭 알려줍니다. 여러가지 이유 중에서 두 개만 딱 정해서 말해보자면 `최근에 생긴 대안들이 Six sigma로부터 나온 것이 많습니다` 그리고 `여러분이 새로운 방법론을 생각할 때 Six sigma가 도움됩니다.` 로 정할 수 있습니다. 그러니 경영과 공학의 관점에서 `Six sigma` 를 알아봅시다.  

#### <span style="color:darkblue">1.3.1. Definition in terms of business</span>

| 요소                  | 정의                                                         | 비고                                                         |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 품질지표              | 통계적 의미로는<br /> 100만 개중에 3.4개의 결함을 의미       | 시그마 측정은 제품 및 서비스를<br /> 만드는 과정상의 상태를 측정하는 척도 |
| 개선 프로세스 및 기법 | 전 비지니스 시스템에 걸쳐 통계 수법을<br /> 일련의 프로세스로 조합한 패키지 툴 | DMAIC 개선방법                                               |
| 사업 전략             | 전사적 차원에서 경영혁신을 달성하는 전략                     | 프로세스 측정 -> 현위치 파악 -><br /> 목표 설정 -> 전사적 활동 -> 성과측정 |
| 생활 철학             | 우리가 하는 모든 실수를 줄여 Loss 를 제거                    | 현명한 일이란 로스와 낭비를 줄이고<br /> 집중하는 업무로 효율적인 작업을 의미 |



#### <span style="color:darkblue">1.3.2. Definition in terms of engineering</span>

![ToE](/assets/img/MATLAB_Quality/6_6.png)

 공학적인 측면에서 `Target` 과 `USL or LSL` 의 거리를 얼마로 정할 건지가 관건이었습니다. `Mikel Harry` 는 1.5 `sigma` 를 얘기했습니다만, 아래를 보며 얘기하겠습니다.


$$
k\sigma \ =\ \text{USL}-\text{target}\ =\ \text{target} - \text{LSL}
$$

$$
\mu = \text{target} \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \mu=\text{target}\pm1.5\sigma
$$



| k    | PPM    | k    | PPM     |
| ---- | ------ | ---- | ------- |
| 6    | 0.02   | 6    | 3.4     |
| 5    | 0.5733 | 5    | 233     |
| 4    | 63.34  | 4    | 6,210   |
| 3    | 2700   | 3    | 66,807  |
| 2    | 45500  | 2    | 308,537 |

 `k` 는 `target` 으로부터 `제한선` 의 거리를 볼때, 1.5`sigma`로 잡으면 양측 3`sigma`라고 볼 수 있죠. `Mikel Harry` 가 생각한 기준인데요. 이에 대한 근거를 설명드리겠습니다. 주제만 말씀드리면 선험적인 이유인데요. 제조현장에서는 단기와 장기의 산포는 다릅니다. 개선방향을 파악할때는 현재 공정에서 바로 할 수 있는 것은 단기 산포를 보고 개선을 시도합니다. 그리고 시간에 따라 단기에 대한 Z score는 장기쪽으로 움직이게 되는데 이 차이가 대략 1.5`sigma` 인 것을 실험적으로 확인할 수 있었습니다.

 참고로 알아두시면 좋은 내용인데요. 1.5 `sigma` 를 정하는 `Mikel Harry` 의 주장은 본격적으로 잘못됐다고 얘기하는 분들이 상당히 많습니다. 여기서는 해당 내용을 다루지 않을 것이지만, 따로 알아보시면 좋습니다. 저도 왜 잘못됐는지 알아보다 많은 것을 깨달았죠.

### <span style="color:darkblue">2.1. How does it work?</span>

#### <span style="color:darkblue">2.1.1. Short/Long Term sigma level</span>

![분산비교](/assets/img/MATLAB_Quality/6_7.png)

 `Long Term Performace` 는 장기로 들어가며 당연하게도 전체 Data를 산출합니다. `Short Term Capability` 는 장기중에서도 좋은 샘플로만 골라서 공정이 얼마나 좋을 수 있는지를 따져봅니다. 기준은 총 세가지가 되죠.

---

- 최소의 산포를 갖는 기간으로
- 최대의 성능을 갖는 기간으로
- 최대의 성능을 갖는 범주로

---



## <span style="color:darkblue">2. Concept / Goal / Purpose</span>

![여러활동들](/assets/img/MATLAB_Quality/6_8.png)

 본론에 들어와서,  `6 Sigma` 에 대한 개념을 잡았으니 이를 통해 어떻게 활용할 수 있을 지 시야를 넓히겠습니다. 위에서는 원리에 대한 이해였다면, 시스템에 대한 이해를 목적에 두고 설명하겠습니다. 

### <span style="color:darkblue">2.1. Feature finder without noise</span>

| Response | Predictors     |
| -------- | -------------- |
| Y        | X1 ... Xn      |
| 종속     | 독립           |
| 결과     | 입력, 프로세스 |
| 효과     | 원인           |
| 증상     | 문제           |
| 기록     | 관리           |

 특징-프로세스 중심으로 `Rsponse` 인 Y에 대해서 연구하고 개선하는 것이 아닙니다. 주요 X들을 발견하고 관리하여 원인을 제거해서 결론적으로 결과가 바로 나아지도록 원인해결에 활동을 합니다. 그러나 원인인자인 X에 대한 `Noise` 를 고려안하는 것이 `6 sigma` 의 제일 아쉬운 점입니다.

### <span style="color:darkblue">2.2.COPQ(Cost  Of Pool Quality)</span>

![coqp](/assets/img/MATLAB_Quality/6_10.png)

 `COPQ` 는 저품질 비용으로 평가/검사 비용, 내부실패 비용, 외부실패 비용을 포괄하여 얘기합니다. 보여지는 외부실패 비용보다 내부 실패비용이 훨씬 많으며 이 내용은 다음 포스팅에 이어서 설명하겠습니다. 마무리하며 `COPQ` 측정이 비용 해결과 반드시 직결되는 것은 아니며 구체적인 행동 대안이 없는 경우도 있습니다. 그리고 부정적인 영향이 보고에 올라올 때 크게 충격을 먹기도 하구요. COPQ에 집중한 나머지 다른 중요한 비용을 놓칠 수 있으며 애초에 COPQ가 부정확할 수 있습니다.

 그럼에도 불구하고 `COPQ` 분석의 필요성은 계속 대두됩니다. 왜냐하면 분석활동에서 `Hidden Factory` 가 노출됩니다. 그리고 지속적인 측정활동으로 시스템을 계량적으로 볼 수 있는 변화가 생깁니다. 문제의 우선순위를 정렬할 수 있구요. 이러한 활동을 통해 조직원들의 동기부여 또한 이뤄집니다. 그리고 본질적으로 잘 측정된 `COPQ` 를 절감한다면 기업의 이윤 증대의 지름길이기 때문입니다.


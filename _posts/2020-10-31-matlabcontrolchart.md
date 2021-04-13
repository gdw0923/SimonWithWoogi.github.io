---
title: MATLAB 관리도? 그게뭔데. 그게 어떻게 하는건데.
author: Simon Anderson
date: 2020-10-28 16:35:00 +0800
categories: [MATLAB, Quality]
tags: [MATLAB,Visualization, QualityManagement, Improvement, Statistics, Quality]
image: /assets/img/MATLAB_Quality/3_Preview.png
math: true
---

## <span style="color:darkblue">1. Control Chart</span>

3번째 포스팅은 `Control chart(관리도)`에 대한 내용입니다. **미니탭이 이런 부분에서는 좋으나 매트랩의 자유도에 대해서 얘기하기**

---

**[이전 내용](https://simonwithwoogi.github.io/SimonWithWoogi.github.io/posts/matlabsixsigma/)**(6-Sigma에 대하여)

샘플 1000개를 테스트했는데, 2개 불량이 났으면, 이 두 개가 **0.27%**의 영역에 들어왔구나 나름 납득이 됩니다. 근데 1000개를 테스트 했는데 **60**개 불량이 났으면, 전체 제품의 **0.27%** 영역에 있는 불량품들 중에서 **60개 불량을 고작 1000개** 가지고 검출해냈으면 역사적인 순간이겠죠. 최소의 검사 샘플로 다량의 불량을 검출해냈으니까요. 그러나 승리자의 성취감보다는 **찝찝함이 남아있습니다. 실제로 그럴리가 없거든요.**

그래서 생각합니다. **0.27%**가 실현되기 어려운 확률이니, 이것은 **공정의 평균이 변했구나. 제품자체의 평균이 변했구나**로 생각하게 됩니다. 그렇다면 이 제품의 변동을 관리할려면 어떻게 해야할지 고민하게 되면서 `Control chart(관리도)`가 나오게 됩니다. `관리도`는 다음 포스팅에서 진행합니다.

---

### <span style="color:darkblue">1.1. Terminology</span>

![img](/assets/img/MATLAB_Quality/3_1.png)

CL UCL LCL

### <span style="color:darkblue">1.2. Design control charts fit your purpose</span>

![img](/assets/img/MATLAB_Quality/2_2.png)

#### <span style="color:darkblue">1.2.1. Target</span>

표

공정해석용

공정관리용

생산된 제품에 대한 합격/불합격 판정용

#### <span style="color:darkblue">1.2.2. Data type</span>

![img](/assets/img/MATLAB_Quality/2_2.png)

관리도 트리에 대한 간략한 설명



### <span style="color:darkblue">1.3. Shewhart 3 σ chart</span>

관리한계선 계산식 (수식)



## <span style="color:darkblue">2. X bar R control chart</span>

`σ(sigma)`에 대해서는 알았는데, `6-Sigma`란 무엇일까요?  수리적으로는 양측 `3*표준편차`의 범위를 의미합니다. 그런데 이게 품질과 무슨 관련이 있을까싶죠. 품질에 대해서 조금 얘기를 하고 이어서 설명하겠습니다.

### <span style="color:darkblue">2.1. Quality</span>

품질에 대해서 얘기하자면 좋은 품질은 **좋은 성능을 내는 것**이냐 물어보면 맞다고는 하지만 `찝찝한 느낌`이 있습니다. 진정한 좋은 품질은 `신뢰성`과 연결지어야 합니다. 그래서 늘 `비슷한` 성늘을 내는 것이 맞겠죠. 그렇다면 고장도 잘 안나고 어느 환경적인 영향도 덜 받는 것이 좋습니다. 반대로 불량품이란 요구한 성능에 미달하는 것도 불량품이고 요구한 성능에 과적합하는 것도 불량품일 수 있습니다.

예를들어 자동문을 만들었구요. 문이 열렸을 때 가운데에 물체를 놔두겠습니다. 30의 부하를 받으면 닫히다가 다시 열어야되는 조건으로 40,000개의 자동문을 검사하겠습니다. 생산라인에서 나온 제품은 대체적으로 균일한 성능과 성질을 가집니다. 다시 언급하지만 불량품이란 그 균일한 성능과 성질에서 벗어난 경우를 의미합니다. 각설하고 자동문 데이터는 아래와 같은 그래프로 보여줄 수 있습니다. **물론 실제 데이터는 아닙니다.**

![img](/assets/img/MATLAB_Quality/2_8.png)

### <span style="color:darkblue">2.2. Background</span>

여기서 더 나아가 `양측 3 * 표준편차`를 그려보겠습니다. <span style="color:darkred">적색이 1 * 표준편차</span>, <span style="color:darkgreen">녹색이 2 * 표준편차</span>, <span style="color:darkblue">청색이 3 * 표준편차</span> 입니다.

![img](/assets/img/MATLAB_Quality/2_9.png)

위의 <span style="color:darkred">**굵은 적색 네모박스**</span>보이시나요? 얘네는 30의 부하를 받으면 문을 다시 열라고 했는데, 15의 부하도 안돼서 문을 열었거나(좌측) 45의 부하를 받았음에도 문을 닫은 경우(우측)입니다.  좌측의 경우는 적은 부하로 인하여 오작동할 확률이 크고, 우측의 경우는 인체위협 가능성이 있습니다. 둘 다 불량품입니다.

### <span style="color:darkblue">2.3. Principle</span>

근데 왜 굳이 `양측 3 * 표준편차`로 했을까요? 왜 `3`일까.. `2`로 하면 더 좋은 `품질`의 제품으로 걸러낼텐데 말이죠. 아래의 수리적인 설명으로 말씀드리겠습니다.


$$
\begin{array}{l}
\bar{X}\ \sim \ N(\mu,\ \frac{\sigma^2}{n})
\end{array}\\
$$


아주 쉽게 얘기하면 전체 제품들의 `평균(u)`가 계산한 `분산`만큼 `정규분포`속에 퍼져있다는 조건을 둡니다. 가정을 하는 것이기에 실제 데이터에선 정규성 검정을 해야합니다. 그렇다면 아래와 같이 `표준화`를 진행할 수 있습니다.


$$
\begin{array}{l}
Z\ =\ \frac{\bar{X}-\mu}{\sigma/\sqrt{n}}\sim N(0,1)
\end{array}\\
$$


예시로 들었던 자동문은 `평균(u)` 30에 `표준편차(σ)` 5라고 했다면, `표준화`를 통해서 `평균(u)` 0에 `표준편차(σ)` 1로 바뀌었습니다. 그러면 `3*σ = 3`이겠죠?

표준정규분포 **P{Z>3} = 0.00135**입니다. 정규분포는 대칭이니까 -3도 0.00135입니다. 즉, 아래와 같은 식이 성립되죠.



$$
\begin{array}{l}
P\{\ -3\leq\frac{\bar{X}-\mu}{\sigma/\sqrt{n}}\leq3\}=1-(0.00135*2)=0.9973
\end{array}\\
$$


지금까지 `X bar`에 대해서 얘기하지 않았습니다. 이제 말씀드리면 `X bar`는 `추출한 검사 샘플의 평균`을 의미합니다. 예로 들었던 자동문 검사 샘플 평균이죠. 위 수식이 얘기하는 내용은 `Sample의 평균(X bar)`이 `자동문 제품 자체의 표준편차(σ)` `양측 3`안에 있을 확률이 99.73%를 의미합니다. 그 외를 벗어난다면? 샘플이지만 `자동문 제품 자체의 평균(u)`이 아니라고 볼 수 있죠.

### <span style="color:darkblue">2.4. Control chart</span>

현실적으로 생각해보면 위 이론은 얘기가 달라집니다. 샘플 1000개를 테스트했는데, 2개 불량이 났으면, 이 두 개가 **0.27%**의 영역에 들어왔구나 나름 납득이 됩니다. 근데 1000개를 테스트 했는데 **60**개 불량이 났으면, 전체 제품의 **0.27%** 영역에 있는 불량품들 중에서 **60개 불량을 고작 1000개** 가지고 검출해냈으면 역사적인 순간이겠죠. 최소의 검사 샘플로 다량의 불량을 검출해냈으니까요. 그러나 승리자의 성취감보다는 **찝찝함이 남아있습니다. 실제로 그럴리가 없거든요.**

그래서 생각합니다. **0.27%**가 실현되기 어려운 확률이니, 이것은 **공정의 평균이 변했구나. 제품자체의 평균이 변했구나**로 생각하게 됩니다. 그렇다면 이 제품의 변동을 관리할려면 어떻게 해야할지 고민하게 되면서 `Control chart(관리도)`가 나오게 됩니다. `관리도`는 다음 포스팅에서 진행합니다.
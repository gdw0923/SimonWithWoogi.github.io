---
title: MATLAB Deep Learning, 딥러닝은 머신러닝과 무엇이 다른가요?
author: Simon Anderson
date: 2020-11-16 19:17:00 +0800
categories: [MATLAB, Applied]
tags: [MATLAB, Python, java, Algorithm, Search, AI, DeepLearning, Optimization, Heuristics]
image: /assets/img/MATLAB/7_Preview.png
math: true
---

## <span style="color:darkblue">1. Deep Learning</span>

 요즘은 `인공지능` 을 얘기하면 모두들 `딥러닝(Deep Learning)` 을 많이 얘기합니다. 본격적으로 설명하기 전에 우리는 기존에 어떻게 문제를 해결했는 지에 대해서 고민해봅시다.

### <span style="color:darkblue">1.1. Traditional process</span>

![img](/assets/img/MATLAB/7_1.png)

 인류역사상 누가 어떤 고민을 먼저 했는지는 궁금하지도 않습니다. 그러나 많은 사람들이 `음식` 앞에서는 제법 고민을 하죠. 무엇을 먹을지, 지금 얼마나 먹을지 등 고민을 합니다. 답이 있을까요? 저도 그렇지만, 제 주변사람들은 행복하게 먹는다면 어떤 고민이든 해결할 수 있다고 합니다. 저도 그렇게 믿고 있죠. 어떤 고민에 놓여져있을 때 해결할 수 있는 것을 `방법(Method) 혹은 알고리즘(Algorithm)` 이라 합니다. 소프트웨어 공학으로 얘기한다면, 입력과 출력 그리고 유한해야한다 등 얘기를 하겠지만, 오늘의 주제는 `Deep Learning` 입니다.

### <span style="color:darkblue">1.2. Programmable machine</span>



![img](/assets/img/MATLAB/7_2.png)



![img](/assets/img/MATLAB/7_3.png)



![img](/assets/img/MATLAB/7_4.png)



 시대가 바뀌었습니다! 이제는 `어떻게 행복하게 먹을까?` 라는 생각을 버릴 때가 왔습니다. `무언갈(Input) 먹고 행복(Target)하고 싶다` 라는 욕망만 있으면 충분합니다. 그러면 `컴퓨터가 혹은 다른 머신`이 답을 알려주죠. 그래서 이런 좋은 대접을 받기위해 컴퓨터를 하나 삽니다. 그리고 내가 무엇을 좋아하고 무엇을 싫어하는지 알려줍니다. 그렇게 몇 번 좀 건드려보니까 제가 좋아하고 싫어하는 것을 딱 구분해서 가져옵니다. **사실 뭘 좋아하고 싫어하는 지 스스로 너무 잘 안다면 컴퓨터를 왜 샀을까 후회가 생깁니다.**

### <span style="color:darkblue">1.3. Feature finder</span>

![img](/assets/img/MATLAB/7_5.png)

 `Mechanic` 이라고 자처하는 사람들 중에서 진정한 `전문가(Guru)` 들은 현장에서 실력이 빛납니다. 예를 들어 어떤 고장난 기계를 보고 `정황` 을 살펴보고 `의심` 가는 곳을 짚어봅니다. 만약 아니라면 `다음으로 생각`한 부분을 짚어봅니다. 경험과 지식에 의해 진정한 `주요 핵심(core parts)`들을 딱 짚은 것이죠. 대단한 분들입니다. 보통 `5-why` 로 문제해결을 찾습니다. 왜? 를 다섯번 물어보면 거기에 근본적인 해결책이 있다고 합니다. 여러분들도 한번 해보시죠.

 `Deep Learning` 은 이런 `전문가적 접근법` 을 모방합니다. `기존 신경망` 과는 다르게 `특징(feature)` 을 추출하지 **않습니다.** 자신이 `학습할 때 특징추출`을 같이 진행합니다. 그리고 실제로 `Test` 하며 성능을 나타낼 때 `Top-5 error rate` 을 얘기하기도 합니다. 컴퓨터가 어떤 것`(Object)` 을 보고 5가지를 떠올렸을 때, 거기 안에 실제 답이 있다면, 이를 맞췄다고 하는 방법이죠. 사실 `5-why` 와는 다릅니다. 전문가에게 최대 `5번의 기회`를 주는 것이죠.

![img](/assets/img/MATLAB/7_6.png)

## <span style="color:darkblue">2. Issues</span>

 `Deep Learning` 이 활성화되기 시작하면서 사람들은 무언갈 깨닫기 시작합니다. `Deep Learning` 은 `Neural Network` 보다`Layer` 가 훨씬 많다보니 간과하지 못한 부분들이 있던 것이죠.

![img](/assets/img/MATLAB/7_7.png)

### <span style="color:darkblue">2.1. Underflow in back propagation</span>

 0.1과 0.1을 곱하면 `0.01`입니다. 그럼 `0.1` 을 두 번 곱하면 `0.001` 이 되겠죠? 백 번 곱하면? `0.` 과 `1` 사이에 백 개가 있겠네요. 우리야 사람이니까 상식적으로 생각하는게 가능합니다만, 컴퓨터는 이럴 때만 꼭 우리의 상식을 벗어납니다.

![img](/assets/img/MATLAB/7_8.png)

 실제로 존재하는 모든 물건에 정확한 치수란 없습니다. 15cm 자의 1cm 눈금은 미친듯이 자세히보다보면 1.0000 ... 하고도 몇 정도의 숫자가 나옵니다. 아주 정확한 1cm 는 현실에서 존재하지 않는 거죠. 컴퓨터도 어느정도 `0` 에 가까워지면, 그 범위부터는 `0` 이라고 확정짓습니다. 이를 `Underflow` 라고 합니다. `Deep Learning` 에서 `back propagation` 은 이 `Underflow` 를 조심해야합니다. 왜냐하면 `기울기(Gradient)` 가 조정되는 시점이거든요.

![img](/assets/img/MATLAB/7_9.png)

 위 그림을 봅시다. 공이 맨 처음에는 제법 멀리 날아가서 튕겨나갑니다. 그 다음은 아까보단 적게 튕겨져 나갑니다. 점점 작아지다가 공은 더이상 튕기지 않습니다. 위 그림은 `Back propagation` 에서 오류를 줄여나가는 과정으로 이해할 수 있습니다. 근데 튕겨지는 이 `탄성` 을 처음엔 얼마로 설정하고 점점 줄여나갈 것인지 조절할 수 있습니다. `레이어(Layer)`를 지날 때마다 `기울기` 를 지날 때마다 반씩 줄여나간다고 해봅시다. 좀 더 현실적으로 얘기하면 **1보다 작은 오차가 레이어마다 있고 곱하면 작아집니다.** 레이어가 `100`개 라면?!

 컴퓨터가 딱 기울기를 0으로 확정해버립니다! 사실 학습할 것도 남아있고 이것저것 해봐야하는데 더이상 움직일 수가 없네요. 이런 상황을 **`기울기 소멸(Vanishing gradient)`** 이라고 합니다.

#### <span style="color:darkblue">2.1.1 ReLU function in middle layer</span>

![img](/assets/img/MATLAB/7_10.png)

 당연하게도 `Deep Learning` 이 활발하게 사용되는 이유는 `기울기 소멸` 문제를 해결했기 때문입니다. 위 그림은 `ReLU function` 입니다. `Activation function` 중에 하나죠. `Back propagation` 할 때를 생각해봅시다. 미분을 연속적으로 해야하는 `Chain rule` 의 상황에서 `ReLU` 의 모습을 보면 감이 오는 사람이 있을텐데요. 백지 상태에서도 감이 오신 분들은 부디 연구개발하는 자리에 오래 계셨으면 좋겠습니다.

 ReLU 함수는 양수에 대해 값만 있다면, 어디서 어떻게 미분해도 1이 나옵니다. 그럼 다음 계층에 대한 곱도 미분도 영향을 주지도 받지도 않는 것이죠. 값의 범위는 고유하게 간직한 채로요. 그래서 `ReLU function` 은 주로 `중간계층` 의 `Activation function` 으로 자주 쓰입니다.

### <span style="color:darkblue">2.2. Initalizing weights</span>

![img](/assets/img/MATLAB/7_11.png)

 `Activation function` 을 `Sigmoid function` 으로 쓴다고 해봅시다. `Sigmoid` 의 형태는 정규분포의 평균과 표준편차에 의해서 모양이 만들어집니다. 사실 `hyperbolic function` 도 마찬가진데 맥락만 짚어서 얘기해보면 정규분포의 0, 1(평균, 표준편차)로 셋팅해서 가중치를 랜덤하게 초기화 한다고하면 `가중치 초기화의 문제` 가 생길 수 있습니다. 어떤 원리에 의해 문제가 생길까요? 표준편차는 평균에서 얼마나 멀리 떨어져있는 지를 얘기합니다. 근데 이 데이터들이 잘못 계산 됐을 수도 있을테니까 평균에서 값이 어느정도 벗어나더라도 급격히 가중치는 `0이나 1에게` 달려갑니다. 결국 머지않아 `(기울기 소멸)Vanishing gradient` 문제가 생기겠네요.

 표준편차가 `1` 이니까 아까처럼 `0이나 1로` 몰린다고 칩시다. 그러면 표준편차를 적게 줄이면 되지 않겠나? 생각이 듭니다. 아래 그림을 보시죠.

![img](/assets/img/MATLAB/7_12.png)

보이시죠? 편차를 줄이면 0.5로 머무릅니다. 줄이면 줄일수록 나는 무조건 0.5라고 외치는 격입니다.

#### <span style="color:darkblue">2.2.1 LeCun Initialization</span>

 LeCum은 `CNN` 을 제대로 적용해서 유행시킨 사람이 만든 방법입니다. 위 내용은 정규분포를 따르는 걸 가정했습니다. 그래서 LeCun 은 정규분포를 따르는 방법을 소개합니다. 추가로 `Uniform` 하게 하는 방법도 알려줍니다.


$$
\begin{array}{l}
\text{LeCun Normal Initialization}\\
W\ \sim \ N(0, Var(W))\\
Var(W)=\sqrt{\frac{1}{n_{in}}}\\
\\
\text{LeCun Uniform Initialization}\\
W\ \sim\ U(-\sqrt{\frac{1}{n_{in}}},\sqrt{\frac{1}{n_{in}}})\\
\\
n_{in} : \text{previous number of node}\\
\end{array}
$$


#### <span style="color:darkblue">2.2.2 Restricted Boltzmann machine</span>

 개선된 가중치 초기화 방법의 두번째 입니다. 이 내용은 `Sigmoid` 와 크게 상관없습니다. 왜냐하면 비지도 학습을 통해서 학습시킨 결과를 가중치로 사용하는 방법입니다. 얘도 하나의 `Machine` 으로서 이름붙은 만큼 `사용용도` 만 설명하겠습니다. `Input` 을 더 잘 표현하고 이해하기 위해서 단순 포인트에서 핵심을 찾는 것이 아닌, 면적도 보고 라인도 보고 여러가지 측면으로서의 확률을 열어놓고 `Input` 을 잘 표현하고 잘 설명해주는 확률 모델이 `RBM(Machine)` 입니다. 여기서 나온 결과를 `Weight` 에 적용하는 것이죠.

#### <span style="color:darkblue">2.2.2 Singular value decomposition</span>

 `Decomposition`, `Eigen vector` 를 배울 때 `대각화` 라는 얘기를 했습니다. `고유값` 도 마찬가지로 `독립(Orthogonal)` 으로서 상태를 만들어줍니다. 이를 잘 설명하는 것이 `대각화` 입니다. 그럼 매번 `Weight` 를 초기화할 때마다 `독립(Orthogonal)한 Matrix` 로 해준다면 늘 효과적인 `가중치 초기화` 를 진행할 수 있습니다.

###  <span style="color:darkblue">2.3. Overfitting</span>

![img](/assets/img/MATLAB/7_13.png)

 제 친구는 바나나를 주면 바나나를 반만 먹고 돌려줍니다. 그렇게 15년이 흘렀습니다. 얘는 맨날 시험기간에도 심지어 술을 많이마셔도 반만 먹고 돌려줍니다. 5년 더 흘러도 똑같을 것 같습니다. 세살 버릇 여든까지 간다고 하니깐요.

 그 친구가 나중에 자녀를 낳아도 똑같이 행동할까요? 유사하게 행동할 수는 있겠죠. 전혀 아닐 수도 있구요. 그렇지만 너무 기대가 됩니다. 반만 줄 것 같아서요. 진짜로 반만 줄 것 같아서

 이 일화가 완벽한 `Overfitting` 의 예시입니다. 적은 케이스 혹은 단순한 방법으로 학습됐습니다. 예를 들어서 `영상처리(Image processing)` 측면으로 보겠습니다. `얼굴 정면` 만 학습시킨 경우와 `얼굴 정면을 500개로 나눠서` 학습시킨 경우를 얘기해봅시다. 어떤게 더 오래걸릴까요? `500개` 로 나눈 이미지가 더 학습 오래걸리겠죠. 다만, `Mask` 를 쓰거나 `Cap` 을 쓰고 있는 사람들을 잘 찾아낼 것입니다. 이렇게 하나의 `Training data` 를 여러가지로 나누는 것을 **`Mini-batch`** 라고 합니다. 이는 `Overfitting` 의 `해결법(Solution)` 중 제일 당연시 쓰이는 방법입니다.


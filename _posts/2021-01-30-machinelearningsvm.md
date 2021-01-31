---
title: Support Vector Machine, MATLAB으로 SVM 쪼아먹기
author: Simon Anderson
date: 2021-01-30 01:20:00 +0800
categories: [MATLAB, Applied]
tags: [MATLAB, Algorithm, MachineLearning, AI, DeepLearning, Optimization, Mathmetics]
image: /assets/img/MATLAB/10_Preview.png
math: true
---

## <span style="color:darkblue">0. Introduction</span>

 `SVM(Support Vector Machine)` 은 맨 처음 `generalized portrait algorithm` 이라 불렸습니다. 그리고 1990년대 끝에서 `Kernel trick` 을 이용하여 `SVM` 에 적용한 논문, 더 나아가 `Soft margin` 을 이용한 `SVM` 이 나오면서 현재 `Machine learning` 에 사용하는 `SVM` 으로 굳어지게 됩니다. 그러니 이번 포스팅은 `Kernel method` 에 대한 설명으로 시작하여 `SVM` 을 이용한 `MATLAB` 실습으로 마무리합니다.

## <span style="color:darkblue">1. Kernel Trick</span>

 `Kernel method` 는 `Memory` 기반 처리입니다. 학습이 끝나면 학습 데이터를 어느정도 저장하고 있다가 예측 단계에서 사용하죠. 사실 이 `Kernel method` 가 매우 강력하여 1990년대에 `Perceptron vs MachineLearning` 의 싸움에서 인공신경망인 `Perceptron` 을 깔끔하게 눌러버립니다. 결국 `Deep learning` 의 성능때문에 밀렸지만, 그 때 당시엔 인기였습니다. **지금은 `Deep learning` 과 함께 어우러져 쓰고 있습니다.**

### <span style="color:darkblue">1.1. Trick meaning</span>

![함정카드](/assets/img/MATLAB/10_1.png)

 **아니, 이런 학술적인 용어에 트릭이요?**

 먼저, `운영체제(OS:Operating System)` 에서의 하드웨어와 중개자역할인 `Kernel` 과 개념적으로 유사하나 그에 대한 설명이 아닙니다. `Kernel Trick` 은 **실제 차원에 대해서 공간을 변환하지 않고 우회하여 변환하는 효과를 주는 것입니다.**  말그대로 `Trick` 이라서 `선형 분리` 가 불가능한 공간을 `선형 분리` 가 가능한 차원 혹은 공간 변환의 효과를 내는 것이죠. 우회를 자세히 얘기하면, 수리적인 방법으로 접근하여 변환된 공간을 매핑하지않고 내적을 얻는다고 말할 수 있습니다.

### <span style="color:darkblue">1.2. Kernel function</span>

 `ILSVRC(ImageNet Large Scale Visual Recognition Competition )` 에서 우승한 신경망 입력 사이즈를 확인해보면 보통 `224x224` 를 사용합니다. 사이즈를 따로 수정하지 않고 한 픽셀들이 곧 특징이고 차원으로 받아들일 수 있는데, 그렇다면 `50176` 차원이 나오게 됩니다. 

![XOR2to3](/assets/img/MATLAB/10_2.png)

 XOR의 문제는 3차원으로 변환하면서 구분이 가능하듯, 고차원을 통하면 분류에 있어서 이점은 확실히 있습니다. 그런데 `50176` 차원은 충분히 고차원이고 여기서 더 고차원으로 바꾸는 일은 쉽지 않습니다. 여기서는 `Kernel function` 이 차원변환에 도움을 줍니다. 일단 `Kernel function` 의 형태는 아래와 같습니다. x, z 가 특징 벡터라면 두 독립변수의 내적한 값을 가져온다는 얘기이고 이 `Kernel function` 의 핵심 또한 **내적** 을 구한다에 있습니다.
$$
K(x, z) = \phi(x) \cdot \phi(z)
$$


---

**유명한 세 가지 `Kernel function`**
$$
\begin{array}{l}
\text{Polynomial Kernel : } K(x,z)\ =\ (x\cdot z +1)^p \\
\text{RBF Kernel : } K(x,z)\ =\ \exp(\frac{-||x-z||_2^2}{2\sigma^2}) \\
\text{Hyperbolic tangent Kernel : } = K(x,z)\ =\ \text{tanh}(\alpha x\cdot z + \beta)

\end{array}
$$


---

### <span style="color:darkblue">1.3. Core points </span>

 `Kernel function` 을 사용하면 내적을 구하는 연산량이 줄어들게 됩니다. 변환할 때의 매핑을 하지 않기 때문인데요. 기저함수를 이용하는 것보다 훨씬 효율적인 면이 있습니다. 결론적으로 `Kernel trick` 이란 매핑없이 변환 공간의 내적을 얻는 방법이고 이는 기존 공간 그대로 있으면서 선형적으로 분리 가능한 고차원 공간의 특성을 사용함을 의미합니다. 그래도 `Kernel trick` 이 만능은 아닙니다. 사용하려면 중요한 전제가 있는데요. 변환된 공간의 연산이 내적으로 표현되어야 합니다.

 솔직히 `Kernel function` 에 대해서 많은 내용이 생략됐습니다. 왜 `Kernel` 이라 부르고 `Kernel` 이 무엇인가, 기존 고차원으로 변환할때는 연산이 얼마나 많이 걸릴까, 기저함수는 어떻게 정의할 수 있을까 등등, 그러나 이번 포스팅의 주제에 많이 벗어나는 것 같아 잘랐습니다. 왜냐하면 `Kernel trick` 을 `아주 성공적으로 이용한 사례인 SVM` 에 대한 느낌으로 얘기하는 것이 아니라 `SVM의 메커니즘을 이해하고 실습하기` 에 초점을 맞추고 싶었습니다.

## <span style="color:darkblue">2. Support Vector Machine(SVM) </span>

![근육맛쿠키](/assets/img/MATLAB/10_3.png)

`Kernel trick` 이 붙은 `SVM` 은 더이상 무서울 것이 없습니다. 이건 뭐 그냥 깡패에요. `Kernel trick` 한번 적용됐다고 얘를 데리고 다니면서 처음엔 그저 `분류(classification)` 로만 쓰다가 `회귀(Regression)` 까지 지도 학습 모든 분야에 자리르 잡습니다.

### <span style="color:darkblue">2.1. Generalized classfier </span>

 `SVM` 은 처음 `generalized portrait algorithm` 이라 불렸던 만큼, 일반화 능력에 대해서 먼저 얘기를 하겠습니다.

![분류일반화](/assets/img/MATLAB/10_4.png)

 위 산점도를 기준으로 1번은 실패한 분류기, 2번과 3번은 잘 분류된 분류기라 볼 수 있습니다. **하지만 여기서 어떤 것이 새로운 데이터가 들어왔을 때 3번이 더 잘 분류할 것으로 보입니다.** 왜냐하면 2번은 한쪽 집단에 너무 붙어있어서 불안하죠? 물론 데이터를 다 까보면 실제로 2번에 피팅됐을 수도 있습니다. 그러나 SVM의 핵심은 현재 가지고 있는 데이터에서 각 집단간 여백을 최대하 함에 있습니다.

![그게아니죠](/assets/img/MATLAB/10_5.png)

### <span style="color:darkblue">2.2. Linear Support Vector Machine </span>

 특정 선을 기준으로 집단을 나눌때, 그 선을 `결정경계(Decision boundary)` 라고 부르겠습니다. 먼저 집단이 2개라고 가정할때 `결정경계` 의 식은 아래와 같습니다.
$$
d(x) = w^Tx+b=0 \\
w = \text{weight} \\
d(x) = \text{points in dimension}
$$
 `경사하강법(Gradient Decent)` 에서, `Neural Network`, `Fully connected network` 에서 주로 보는 식입니다. `d(x) = 0` 으로 인하여, 양수면 A 집단, 음수면 B 집단으로 구분할 수 있습니다. 그리고 w는 기울기의 각도라면 b는 기울기의 위치를 결정합니다. 이제 b가 각 집단 여백의 딱 가운데에 있도록 조정합니다. **그리고 그 여백의 딱 가운데에 있도록 도와주는 벡터를 Support Vector라고 합니다.**

![SV](/assets/img/MATLAB/10_6.png)

### <span style="color:darkblue">2.3. Margin </span>

 이제는 `Margin(여백)` 이 가장 큰 기울기를 어떻게 계산하는 지 말씀드리겠습니다. w로 기울기 방향이 잘 잡혀있어야 기본적으로 좋은 모델일테니까요. 먼저 거리 계산식은 `L2 Norm` 을 이용합니다.
$$
\begin{array}{l}
L_2 & = \sqrt {\sum_i^n x_i^2} \\ 
& =  \sqrt {x_1^2 + x_2^2 + x_3^2 + …. + x_n^2}
\end{array}
$$
 x 를 `Support Vector` 라고 했을때, 여백은 아래의 수식으로 표현할 수 있습니다. 그리고 `d(x)가 음수면 A집단 / 양수면 B집단` 이라 했을 때 `d(x)` 를 1로 두었을 때 계산하기 쉬워 최종적으로 나오는 식에 참고해주세요.
$$
\begin{array}{l}
\text{Margin} &= 2\cdot\frac{|d(x)|}{||w||_2}\\
&= \frac{2}{||w||_2}
\end{array}
$$
 이제 이 `Margin` 을 최대화할때, 여기저기 `Support Vector` 들을 바꿔가면서 어디가 제일 큰 여백일까 찾아보게 됩니다. 이를 `조건부 최적화(Conditional optimization)` 이라고 부르며 `라그랑주 승수(Lagurange multiplier)` 를 이용하여 해결합니다. 마지막으로 `Wolfe dual` 을 이용하여 내적이 나타나도록 수식을 바꿉니다. 수식 설명은 그리 어렵지 않지만 내용만 차지하기에 생략하겠습니다. 의미하는 바는 `w, b` 를 제거하고 `라그랑주 승수 a` 만 남아 간단한 연산이 됩니다.

### <span style="color:darkblue">2.4. Soft Margin </span>

 ![선형분리불가능](/assets/img/MATLAB/10_7.png)

 살다보면 선형분리가 불가능한 상황이 더 많습니다. `XOR` 문제만봐도 그렇지요. `선형 SVM` 은 선형분리가 가능한 2가지 분류로 가정했습니다. 그러다보니까 `Margin` 안에는 어떤 점도 찍히지 않았습니다.  **`Soft margin` 은 선형분리가 안 되는 걸 받아들이고 `Margin` 안에 데이터를 허용하는 아이디어 입니다.** 

---

존재 가능하며 고려할 필요있는 모든 데이터

- 잘 분류됐으며 `결정경계 + 여백` 에 들어와있는 경우

- 오분류됐으며 `결정경계 + 여백` 에 들어와있는 경우
- 잘 분류됐으며 `여백` 밖에 있는 경우
- 오분류됐으며 `여백` 밖에 있는 경우

---

위 네가지 경우를 하나의 수식으로 정리할 수 있습니다. `슬랙변수(Slack variable)` 를 추가하여 정리 가능합니다.
$$
\begin{array}{l}
\text{Slack variable} = \xi \\
1-\xi \leq y(w^tx+b)\\
1.\  \xi=0, \text{잘 분류된 여백밖 데이터}\\
2.\ 0<\xi\leq=1,\text{잘 분류된 여백 안 데이터}\\
3.\ 1<\xi,\text{오분류된 모든 데이터}
\end{array}
$$
 이제 여백을 크게하면서 `슬랙변수` 가 0에 피팅하는 w를 찾으면 되겠습니다.
$$
J(w,\xi)=\frac{1}{2}||w||^2_2+C\sum_{i=1}^{n}\xi_i \\
\text{첫째항은 여백을 크게, 둘째항은 슬랙변수가 0이 되게}\\
C=\text{hyper parameter}
$$
`Hyper parameter` 에 따라 데이터 정확도 혹은 오분류율에 얼마나 민감하게 반응할 지 조정할 수 있습니다.

이후로는 `라그랑주 승수` 로 변환하고, `Wolfe 쌍대 문제` 로 다시 작성합니다. 결론은 `2.3. Margin` 의 내용에서 C의 역할이 생겼다는 것으로 이해하시면 됩니다.

### <span style="color:darkblue">2.5. Non linear SVM </span>

`비선형 SVM` 은 위에서 `Margin` 과 `선형 SVM` 을 설명했으니 그리 어렵지 않습니다. 여기서 `Kernel Trick` 을 이용하는데요. 다시한번 `Kernel function` 형태를 보겠습니다.
$$
K(x, z) = \phi(x) \cdot \phi(z)
$$
 그리고 이번에는 `2.3. Margin` 에서 내적이 나타나도록 수식을 바꾼 `Wolfe dual` 의 식을 한번 꺼내보겠습니다.
$$
\mathcal{L} = \sum_{i=1}^{n}\alpha_i-\frac{1}{2}\sum_{i=1}^{n}\sum_{j=1}^{n}\alpha_i \alpha_j y_i y_j x_i \cdot x_j\\
$$
 이 수식은 L공간에서의 수식이고 이제 `Kernel trick` 형태에 맞게 H공간으로서 바꿔 작성하겠습니다.
$$
\mathcal{L} = \sum_{i=1}^{n}\alpha_i-\frac{1}{2}\sum_{i=1}^{n}\sum_{j=1}^{n}\alpha_i \alpha_j y_i y_j \phi(x_i) \cdot \phi(x_j)\\
$$
 빌드업이 너무 잘되어 있어서 `비선형 SVM` 은 쉽게 넘어갈 수 있겠습니다.

### <span style="color:darkblue">2.6. c-classification SVM </span>

![나루토분신술](/assets/img/MATLAB/10_8.png)

 지금까지 설명한 `SVM` 은 `Binomial classfication` 에 대한 이야기입니다. 두 집단에서 선형이냐, 비선형이냐로 싸운 것이죠. 근데 현실에서는 좀 더 여러 분류를 하다보니까 자주 쓰이는 `SVM` 은 `c-classification SVM` 입니다. 여러 종류의 기법이 있는데, 이에 대한 핵심은 `쌍` 을 통한 여백을 최대화 하는 것이므로 위에서 설명한 기존 `SVM` 을 복합적으로 활용한 사례입니다.

### <span style="color:darkblue">2.7. SVM regression </span>

![기존회귀와소프트마진](/assets/img/MATLAB/10_9.png)

 보통은 `regression` 을 설명하고 `classification` 을 설명합니다. 왜냐하면 대체적으로 `regression` 이 좀 더 단순하기도 하고 `classification` 이 어렵고 다음 스텝의 느낌이 들기 때문입니다. 그러나 `SVM` 은 반대입니다. `분류먼저, 회귀는 분류의 확장개념`이죠.

 여기서는 `둔감오류함수(insensitive error function)` 를 얘기합니다. 왜냐하면 일반 회귀식에서는 차원을 올릴 기반이 없고, 내적 형태가 나와야하기 때문입니다. `둔감오류함수` 는 에러를 `Margin` 값에 따라서 값을 정해줍니다.
$$
\begin{array}{l}
E_\epsilon(y_i-f(x_i)) = \begin{cases}
0\qquad & \text{if}\quad|y_i-f(x_i)|<\epsilon \\
|y_i-f(x_i)|<\epsilon &\text{otherwise}
\end{cases}
\end{array}
$$
![둔감오류함수](/assets/img/MATLAB/10_10.png)

 저희는 이제 `슬랙변수` 도 `Kernel trick` 도 아니까 `라그랑주 승수` 를 넘어서 바로 예측 수식에 들어가겠습니다.
$$
f(x)=\sum_{a_i\neq0,\hat{a_i}\neq0}(a_i-\hat{a_i})K(x,x_i)+b
$$
  여기서 주요점은 `summation` 은 아래조건입니다. `결정경계` 에서 잘 분류된 샘플은 들어올 필요없는 것다는 점이며, 즉 이 수식에는 `Support vector` 만 들어간다는 점이죠. 이제 `MATLAB` 실습을 진행하겠습니다.

## <span style="color:darkblue">3. MATLAB </span>

 `MATLAB` 에서 모든 `Machine learning` 함수명은 `fit` 이 붙습니다. 그리고 `분류(classification)` 은 `c` 가, `회귀(regression)` 은 `r` 이 붙습니다. 마지막으로 `method` 명이 끝에 붙어서 `머신러닝 / 분류 / 디시젼트리` 라고 한다면, 함수명은 `fitctree` 가 됩니다. 또 `머신러닝 / 분류 / knn` 는 `fitcknn` 이구요. `머신러닝 / 회귀 / 디시젼트리` 는 `fitrtree` 입니다.

 **그런데 SVM은 예외가 있습니다. OneClass SVM과 MultiClass SVM을 따로 분류합니다.** 그래서 OCSVM은 `fitcsvm` 으로, MCSVM은 `fitcecoc` 로 사용합니다. 더 나아가 고차원 데이터 세트에서 `이진분류`는 `fitclinear` 를 얘기하고 있습니다. 회귀는 `fitrsvm` 으로 묶입니다. 그러나 마찬가지로 고차원은 `fitrlinear` 를 사용합니다. 그리고 아래는 `이진 다중 저차원 분류에서 고차원 분류로` 설명을 드리겠습니다.

### <span style="color:darkblue">3.1. One class SVM </span>

 첫번째로, `단일 클래스(One Class)` 혹은 `이진 분류(Binomial classification)` 에 적합한 함수인 `fitcsvm` 에 대한 예제입니다. 또한 높은 차원에 대해서는 이 함수가 적합하지 않습니다. `이진 분류` 라고 해도 차원이 많다면, 다른 함수를 써야합니다.

[분류]

```matlab
load fisheriris
inds = ~strcmp(species,'setosa');
X = meas(inds,3:4);
y = species(inds);

SVMModel = fitcsvm(X,y)

classOrder = SVMModel.ClassNames

sv = SVMModel.SupportVectors;
figure
gscatter(X(:,1),X(:,2),y)
hold on
plot(sv(:,1),sv(:,2),'ko','MarkerSize',10)
legend('versicolor','virginica','Support Vector')
hold off
```

아무래도 `단일 클래스 분류` 라서, 분류할 두가지(`Versicolor`, `Verginica`)만 가져옵니다.

![plot](/assets/img/MATLAB/10_11.png)

[이상치, SupportVector 확인하기]

 **2차 제작에 대한 출처 :** [mathworks help](https://kr.mathworks.com/help/stats/fitcsvm.html) , [fisheriris](https://kr.mathworks.com/help/stats/examples/classification.html#d122e1480)

```matlab
load fisheriris
X = meas(:,1:2);
y = ones(size(X,1),1);
```

`fisher의 iris` 데이터를 가져옵니다.` 피셔의 붓꽃 데이터의 meas`는 150개 붓꽃 표본의 꽃받침 길이, 꽃받침 너비, 꽃잎 길이, 꽃잎 너비에 대한 측정값으로 구성되어 있습니다. 그러므로 `X` 에는 150개의 붓꽃 표본의 꽃받침 길이, 꽃받침 너비만 들어가 있습니다. 그리고 `Y` 는 150x1 짜리로 사이즈에 1로 구성된 열벡터가 들어가있습니다.

```matlab
rng(1);
SVMModel = fitcsvm(X,y,'KernelScale','auto','Standardize',true,...
    'OutlierFraction',0.05);0
```

수정된 데이터 세트를 사용하여 SVM 분류기를 훈련시킵니다. 관측값의 5%가 이상값이라고 가정합니다. 예측 변수를 표준화합니다.

```matlab
svInd = SVMModel.IsSupportVector;
h = 0.02; % Mesh grid step size
[X1,X2] = meshgrid(min(X(:,1)):h:max(X(:,1)),...
    min(X(:,2)):h:max(X(:,2)));
[~,score] = predict(SVMModel,[X1(:),X2(:)]);
scoreGrid = reshape(score,size(X1,1),size(X2,2));
```

훈련된 `SVMModel` 에서 시각화 준비를 합니다. 또한 `predict` 에서 분류된 레이블만이 아니라 유사도를 볼 수 있는 `score` 를 가져옵니다.

```matlab
figure
plot(X(:,1),X(:,2),'k.')
hold on
plot(X(svInd,1),X(svInd,2),'ro','MarkerSize',10)
contour(X1,X2,scoreGrid)
colorbar;
title('{\bf Iris Outlier Detection via One-Class SVM}')
xlabel('Sepal Length (cm)')
ylabel('Sepal Width (cm)')
legend('Observation','Support Vector')
hold off
```

![plot](/assets/img/MATLAB/10_12.png)

이상값을 나머지 데이터와 분리하는 경계는 등고선 값이 `0`인 위치에서 나타납니다.

교차 검증된 데이터에서 음의 점수를 갖는 관측값의 비율이 5%에 가까운지 확인합니다.

```matlab
CVSVMModel = crossval(SVMModel);
[~,scorePred] = kfoldPredict(CVSVMModel);
outlierRate = mean(scorePred<0)
```

실제로 설정한 5%와 가까운지 `outlierRate` 가 알려줍니다.

### <span style="color:darkblue">3.2. Multi class SVM </span>

 두번째는 `Multi class SVM`, `다중 분류, c-분류 SVM` 에 대한 예제입니다. `fitcecoc` 를 사용하고, 저~중 차원의 데이터에 적합합니다.

```matlab
load fisheriris
X = meas;
Y = species;
rng(1); % For reproducibility
```

이번에는 피셔데이터를 몽땅씁니다. `다중분류` 라서 두 개만 고를 이유가 없거든요.

```matlab
t = templateSVM('Standardize',true)
Mdl = fitcecoc(X,Y,'Learners',t,...
    'ClassNames',{'setosa','versicolor','virginica'});
```

`templateSVM` 를 이용하여 `모델 옵션` 을 만들어줍니디. 그리고 `fitcecoc` 를 통해 `model` 을 만듭니다.

```matlab
CVMdl = crossval(Mdl);
genError = kfoldLoss(CVMdl)
```

`crossval` 은 교차검증이고 `kfoldLoss` 는 `k-fold` 검증입니다.둘 다 일반화된 분류 오차를 볼 수 있습니다. 

### <span style="color:darkblue">3.3. SVM for High dimension </span>

 마지막으로 `CNN` 과 결합하여 사용할때 주로 고차원이 만들어지는데, 이 외에도 많은 변수들을 사용하여 예측할 때 쓰는 `fitclinear / fitrlinear` 입니다. 이 챕터는 번역된 자료가 없어서 제가 번역을 하여 2차 창작을 했습니다.

[Mathworks help](https://kr.mathworks.com/help/stats/fitclinear.html)

#### <span style="color:darkblue">3.3.1. description </span>

 `fitclinear` 는 선형 분류 모델로 `고차원 이진분류`, `많은 예측 데이터` , 정규화된 `SVM` 에서의 선형분리가 가능한 모델, `로지스틱 회귀` 모델에 사용합니다. `fitclinear` 는 `스토캐스틱 경사하강법` 같은 기술로서 적은 연산시간으로 목적함수 최소화를 진행합니다. 뭐 어쨌든 많은 변수가 있으면 고차원이고, 그 고차원에서는 아무래도 연산량이 늘어나다보니 `fitclinear` 는 고차원에서 생기는 느려지는 연산에 초점을 맞춘 함수입니다. 

#### <span style="color:darkblue">3.3.2. Train Linear Classification Model </span>

```matlab
load nlpdata
Ystats = Y == 'stats';
Lambda = logspace(-6,-0.5,11);
```

`NLP dataset` 을 이용하구요 . X는 예측변수들에 대한 희소행렬입니다. Y는 종속변수이면서 레이블입니다. 그리고 `Lambda` 의 `logspace` 는 11개의 10^-6 에서 10^-0.5 사이의 로그간격 값을 만듭니다.

```matlab
X = X'; 
rng(10); % For reproducibility
CVMdl = fitclinear(X,Ystats,'ObservationsIn','columns','KFold',5,...
    'Learner','svm','Solver','dual','Regularization','ridge',...
    'Lambda',Lambda)
```

`CVMdl` 이라는 모델을 만들었구요. `Learner` 는 `svm` , `Solver` 는 `dual`, `Regulation` 은 `ridge` 로 설정합니다.

```
numCLModels = numel(CVMdl.Trained)
```

5겹 교차검증(`KFold`, 5) 로 설정해서 훈련된 `CVMdl` 부분 모델이 5개가 나왔나 확인해봅니다.

```matlab
Mdl1 = CVMdl.Trained{1}
```

그 중 하나만 잡아와 특징을 확인하구요.

```matlab
ce = kfoldLoss(CVMdl);
```

`cross validation error` 를 확인합니다.

```matlab
Mdl = fitclinear(X,Ystats,'ObservationsIn','columns',...
    'Learner','svm','Solver','dual','Regularization','ridge',...
    'Lambda',Lambda);
numNZCoeff = sum(Mdl.Beta~=0);
```

아까 봤던 것은 `K-fold` 옵션을 넣은 것이구요. 이번에는 빼보겠습니다.

```matlab
figure;
[h,hL1,hL2] = plotyy(log10(Lambda),log10(ce),...
    log10(Lambda),log10(numNZCoeff)); 
hL1.Marker = 'o';
hL2.Marker = 'o';
ylabel(h(1),'log_{10} classification error')
ylabel(h(2),'log_{10} nonzero-coefficient frequency')
xlabel('log_{10} Lambda')
title('Test-Sample Statistics')
hold off
```

![plot](/assets/img/MATLAB/10_13.png)
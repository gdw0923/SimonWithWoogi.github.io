---
title: MATLAB Neural Network를 이해하고 SLP MLP의 학습원리를 이해해보자(2)!
author: Simon Anderson
date: 2020-11-05 19:49:00 +0800
categories: [MATLAB, Applied]
tags: [MATLAB, Python, java, Algorithm, Search, AI, DeepLearning, Optimization, Heuristics]
image: /assets/img/MATLAB/6_Preview.png
math: true
---

<span style="color:red">이번 포스팅에는 귀여운 그림이 전혀 없습니다.</span>

## <span style="color:darkblue">1. Forward propagation</span>

[Forward propagation]: https://simonwithwoogi.github.io/SimonWithWoogi.github.io/posts/matlabneuralnet1/	"Neuralnet1"

![img](/assets/img/MATLAB/5_11.png)

$$
\begin{array}{l}
h_1\ =\ w^1_{11}x_1+w^1_{21}x_2+c_1\\
h_2\ =\ w^1_{12}x_1+w^1_{22}x_2+c_2\\
\\
\hat{h} = \hat{w}^{1'}\hat{x}+\hat{c}\\
\hat{h} = \begin{bmatrix}
h_{1}\\
h_{2}
\end{bmatrix}\qquad
\hat{w}^1 = \begin{bmatrix}
w^1_{11}\ w^1_{12}\\
w^1_{21}\ w^1_{22}\\
\end{bmatrix} \qquad
\hat{x} = \begin{bmatrix}
x_{1}\\
x_{2}
\end{bmatrix}\\
\\
\therefore \ y=\hat{w}^{2'}\hat{h}+b\\
\hat{w}^2=  \begin{bmatrix}
w^2_{11} \\
w^2_{21}
\end{bmatrix}

\end{array}\\
$$
구조는 이렇습니다. 사실 `MLP` 는 간단하지 않기때문에 처음 `순전파(forward propagation)` 부터 설명하겠습니다. 순서대로 계산한다는 개념이죠. 이번에는 `input node` 가 2개니까 `weight` 를 모두 0.5씩 걸어두고 진행해보겠습니다. `c와 b` 는 `bias` 개념이니까 1부터 시작하겠습니다. 계산은 `MATLAB`으로 합니다.

![img](/assets/img/MATLAB/5_12.png)

| X1   | X2   | h1   | h2   | Y(Predict) | Y(Real) |
| ---- | ---- | ---- | ---- | ---------- | ------- |
| 0    | 0    | 1    | 1    | 2          | 0       |
| 0    | 1    | 1.5  | 1.5  | 2.5        | 1       |
| 1    | 0    | 1.5  | 1.5  | 2.5        | 1       |
| 1    | 1    | 2.0  | 2.0  | 3          | 0       |

제법 많이 다르죠? `Sign function` 을 적용하기에도, 즉  `0과 1로` 부호화하기가 어렵습니다. `Layer` 를 추가했으니 `h` 를 기준으로 다시 표를 그려보겠습니다.

| h1   | h2   | Y(Predict) | Y(Real) |
| ---- | ---- | ---------- | ------- |
| 1    | 1    | 2          | 0       |
| 1.5  | 1.5  | 2.5        | 1       |
| 2.0  | 2.0  | 3          | 0       |

이렇게보니 `h1, h2` 가 너무 똑같이 나오네요. `c` 를 조정할 필요가 있어보입니다. 그래서 보통 `MLP` 에 들어가는 초기 `c와 weight` 는 이런 이유로 균일하게 구성하지 않습니다. 사실 똑같이 구성해도 큰 문제가 없으나 결과가 조금 느리게 나올 뿐입니다.

`c를 1과 0으로 두개 구성했다면 h1 = [1 1.5 2.0]이고 h2=[0. 0.5 1.0]이니 h1과 h2를 조합하여 잘 사용할 수 있습니다. 지금은 두 h가 똑같아 하나를 없애도 괜찮겠다라는 생각이 들게 합니다.`   

## <span style="color:darkblue">2. Backward propagation</span>

$$
E(w) = \frac{1}{2}(f(x;w)-y)^2
$$

`Back propagation` 은 `Weight` 를 조정하는 과정입니다. 반복하면서 실제와 예측의 차이를 줄여나가는 과정입니다. `Weight` 를 좋은 방향으로 조정한 다음 다시 계산하면, 아무래도 좋은 결과가 나오겠죠? 

### <span style="color:darkblue">2.1. Define cost function</span>

$$
\begin{array}{l}
E(w) = \frac{1}{2}(f(x;w)-y)^2 \\
f(x;w) = \text{Forward propagation 결과}\\
\text{기울기 w는 편미분을 통해 얻어진다.}\\
\triangledown w = \begin{bmatrix}
\frac{\partial E}{\partial w_1}\ \frac{\partial E}{\partial w_2} \cdots \frac{\partial E}{\partial w_n} \\
\end{bmatrix}\\
\vartriangle w_i = -1\cdot\eta\frac{\partial E}{\partial w_i}\\
0<\eta<1
\end{array}
$$

`비용함수(Cost function)` 는 위와 같이 이해할 수 있습니다. `Forward propagation` 에서 얻어진 결과와 실제 `y` 와 차이라고 볼 수 있습니다. 그러면 기울기에 대해서 이해해볼까요 1, 1 -> 2, 2 -> 3, 3으로 진행되면 오른쪽 대각선 기울기가 만들어지겠네요. 

![img](/assets/img/MATLAB/6_1.png)

그럼 3,3 -> 2,2 -> 1,1로 진행되면 또 오른쪽 대각선 기울기가 만들어지겠네요. 한쪽은 감소하고, 한쪽은 증가하는데, 기울기가 같은 모양이죠?

그리고 또 `Cost function` 을 봅시다. 결과적으로는 `Back propagtaion` 은 `Weight` 를 조정하는 과정이라고 했습니다. 기울기를 구한다고 해서 `Weight` 를 어떻게 조정할 수 있을까요? 기울기란 그저 막대기가 얼마나 눕혀있는 지만 얘기하는데 말이죠. 많이 기울어져 있다면 `Weight` 는 높은 값을 줘야할까요? 호기심이 생깁니다. 

### <span style="color:darkblue">2.2. Gradient descent(delta rule)</span>

![img](/assets/img/MATLAB/6_2.png)

`1번째 시도`에 값이 `1`, `2번째 시도`에 값이 `2`, `3번째 시도`에 값이 `3` 이라고 합시다. `번째` 는 시도를 의미하니 `x` 축으로 보고 `y` 는 `Cost function` 의 결과라고 봅니다. 그럼 이걸로 `기울기(Gradient)` 를 찾아봅시다. 단, 기울기를 통해서 제일 작은 값으로 내려가야 합니다. 왜냐하면 `Cost function` 이 실제 결과와의 차이를 의미하기 때문입니다.

사실 상승 기울기가 나오면 내려가야 하는 상황입니다. 왜냐하면 최소값을 찾아야해서요. 하강 기울기가 나오면 올라가야 하는 상황입니다. 그래서 아래와 같이 결과값에 대해서 `-1` 을 곱하게 됩니다.
$$
\begin{array}{l}
\vartriangle w_i = -1\cdot\eta\frac{\partial E}{\partial w_i}\\
0<\eta<1
\end{array}
$$
`Delta rule` 을 같이 이해하셔도 됩니다. 단어만 다르게 쓸 뿐이지. 개념적인 부분은 똑같습니다. 근데 왜 `Delta` 일까요. `Gradient descent` 처럼 변화량을 보기 때문이죠. `Delta rule` 은 아래와 같은 수식으로 정의합니다. 다만 이건 수식일 뿐이지 `기울기` 에 집중하는 것도 똑같고 `Cost function` 을  `Learning Error` 로 얘기합니다. 좀 더 `인공지능스러운` 단어로 전환한 것이죠. 추가로 `Delta function` 에서는 실제 값을 알 수 없을 때, 즉 중간층에서 적용합니다.
$$
\begin{array}{l}
\text{Delta rule}\\
D_N=\{(x^{(d)},\ y^{(d)})\}^N_{d=1}\qquad\text{N개의 학습 데이터}\\
f^{(d)}=f(x^{(d)};w)=\text{activation funciton}(\Sigma^n_{i=0}w_ix_i)\qquad\text{학습모델 form}\\
E_d\ =\ \frac{1}{2}(f^{(d)}-y^{(d)})^2\qquad\text{Learning Error}\\
E_N\ =\ \Sigma^N_{d=1}E_d
\end{array}
$$


### <span style="color:darkblue">2.3. Chain rule</span>

$$
(h(x))'=(g(f(x)))'=g'(f(x))\cdot f'(x)
$$



이번 설명에서는 `Activation function` 을 빠뜨렸죠? 이제 슬슬 나옵니다. `SLP` 와 `MLP` 모두 `Sum` 을 하고 난 뒤에는 `Activation function` 을 거쳐지나 갑니다. `Sum function` 을 `f(x)` 라고 한다면, `Activation function` 을 `g(x)` 라고 한다면, `한 노드에만 두 개의 함수`가 있습니다. `Delta rule` 만 봐도, 저희는 `미분` 을 해야하는데 함수가 두개가 있어 순서대로 미분해야하는 상황이 생깁니다. 그 순서대로 미분하는 것이 `Chain rule` 입니다.

$$
\frac{\partial z}{\partial w}\ =\ \frac{\partial z}{\partial y}\frac{\partial y}{\partial x}\frac{\partial x}{\partial w}
$$

![img](/assets/img/MATLAB/6_3.png)

### <span style="color:darkblue">2.4. Activation functions</span>

마지막으로 거쳐가는 Activation function에 `sign function` 을 제외한 여러 함수들이 있고 `도함수` 가 어떻게 적용되는 지 아래를 확인해주세요.

![img](/assets/img/MATLAB/6_4.png)

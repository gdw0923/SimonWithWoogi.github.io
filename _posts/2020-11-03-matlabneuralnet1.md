---

title: MATLAB Neural Network를 이해하고 SLP MLP의 학습원리를 이해해보자(1)!
author: Simon Anderson
date: 2020-11-03 23:07:00 +0800
categories: [MATLAB, Applied]
tags: [MATLAB, Python, java, Algorithm, Search, AI, DeepLearning, Optimization, Heuristics]
image: /assets/img/MATLAB/5_Preview.png
math: true
---

<span style="color:red">이번 포스팅에는 귀여운 그림이 전혀 없습니다.</span>

## <span style="color:darkblue">1. Neural Network</span>

사람은 감각기관에서 받아들이는 내용에 대해 왜곡이 일어날 때가 있습니다. 이미 가지고 있는 지식때문인데요. 예능 프로그램에 검은 상자 속에 어떤 물컹한 물체를 놔두고 출연자들이 촉감으로 이 물체가 무엇인지 맞추는 게임을 종종 보셨을 겁니다. 재밌죠. 대부분 소스라치게 놀라며 소리지르고 지레 겁을 먹습니다. 만져보면 이게 뭔지 느낌이 올 때가 있습니다. 알고보니 생각했던 것과 전혀 다르죠. 시각으로 생각하면 착시도 있습니다. 잘 못들어서 오해하는 청각에 대한 착각도 있구요. 이렇게 나열하면 사람이니까 실수한다라는 말이 이해가 갑니다.

기계는? 실수하면 잘라버리나요? 기계도 실수할 수 있지라는 말이 나오는 시대가 왔습니다. 바로 `Neural Network`에서 시작되는 얘기입니다.

![img](/assets/img/MATLAB/5_1.png)

### <span style="color:darkblue">1.1. Perceptron</span>

먼저 `인공지능`을 얘기할 때는 `Perceptron` 을 먼저 얘기합니다. `인공지능` 이라고해서 진짜로 `Perceptron`, `Neuron` 신경계를 인공으로 생성하는지 본다면 아니라고 말할 수 있습니다. 다만, `인공지능` 이 돌아가는 학습원리, 즉 `Mechanism` 을 가만히 보고있으면 정말로 `학습`을 거쳐서 어떤 `기준`을 만들어서 `인지`를 하게 됩니다.

`Perceptron`, 우리 몸 신경계 기본단위인 `Neuron` 으로 구성된 신경망을 인공으로 구현했다라는 의미입니다. 그러니 `Neuron` 의 그림을 한번 봅시다. 물론 우리 신경계를 빠삭하게 알 필요까지는 없습니다. 아래 그림에서 가지처럼 뻗어진 `Dendrites` 가 `cell body` 로 정보를 옮겨 담아 지방층인 `Myelin` 으로부터 버퍼역할을 하며 다른 `Neuron` 으로 정보를 옮겨줍니다.

![img](/assets/img/MATLAB/5_2.png)

우리에게 `세포체, 수상돌기, 축색돌기` 이런 단어는 필요없습니다. `Mechanism` 만 이해해서 진짜 비슷하네?라고 느끼면 됩니다. 다시 위 그림에 대해 얘기하면 `Neuron` 의 정보전달은 **여러 가지에서 하나의 점으로 모여 다른 뭉치로 이동하는 것입니다.**

![img](/assets/img/MATLAB/5_3.png)

지금 위 이미지는 `Single Layer Perceptron` 입니다. 얘도 마찬가지로 **여러 가지에서 하나의 점으로 모이죠?**

![img](/assets/img/MATLAB/5_4.png)

이 이미지는 `Multi Layer Perceptron` 입니다. **모여진 하나의 점에서 다른 뭉치로 이동하네요!**

### <span style="color:darkblue">1.2. Neural network learning mechanism</span>

`Perceptron` 의 첫 단락에서 제가 `학습` 하는 것을 보다보면~ 이라는 얘기를 했습니다. 이번 내용은 `Neural network` 의 학습원리를 얘기합니다.

### <span style="color:darkblue">1.3. Single Layer Perceptron</span>

![img](/assets/img/MATLAB/5_5.png)

진짜로 `단층 인공신경망(Single Layer Perceptron)` 의 한 모습입니다. `bias` 는 출력으로 나온 결과의 중심을 잡아주는 역할입니다. `input nodes` 는 입력 데이터를 의미합니다. 바나나로 얘기해보면, 당도, 색감, 크기 등이 있겠네요. 이런 `한 성질들이 하나의 노드(node)`가 됩니다. `Weights` 는 `학습` 에 따라 변하는 가중치입니다. 가중치를 다 합하고 난 다음엔 `활성함수(Activation function)` 을 지나 출력이 나오게 됩니다.  **학습에 따라 변하다니요!? 활성함수는 뭘 활성시키죠?!?!** 순차적으로 설명해야하니 지금은 잠깐 잊어주세요.

`SLP(Single Layer Perceptron)` 은 한번쯤 들어본 `Hidden layer` 가 없습니다. 그래서 보면 `Input layer, Output layer` 이게 전부입니다. 그렇다면 이제 차근차근 학습원리를 볼까요?

| X1   | X2   | X3   | Y    |
| ---- | ---- | ---- | ---- |
| 1    | 0    | 0    | -1   |
| 1    | 0    | 1    | 1    |
| 1    | 1    | 0    | 1    |
| 1    | 1    | 1    | 1    |
| 0    | 0    | 1    | -1   |
| 0    | 1    | 0    | -1   |
| 0    | 1    | 1    | 1    |
| 0    | 0    | 0    | -1   |

입력 노드가 세개가 있으니까 처음 가중치를 0.333으로 해서 계산을 해보겠습니다. 참고로 활성함수는 `sign function` 입니다.(0, 1이 아닌 1과 -1로 구분짓기에)

![img](/assets/img/MATLAB/5_6.png)

아래는 가중치의 합에다가 sign을 한 결과입니다. 어떻게, 과연 맞을까요?
$$
\begin{array}{l}
Y\ =\ sign(0.333X_1+0.333X_2+0.333X_3)
\end{array}\\
$$

| X1   | X2   | X3   | Y(Predict) | Y(Real) | Diff   |
| ---- | ---- | ---- | ---------- | ------- | ------ |
| 1    | 0    | 0    | 0.2955     | -1      | 1.2955 |
| 1    | 0    | 1    | 0.5646     | 1       | 0.4354 |
| 1    | 1    | 0    | 0.5646     | 1       | 0.4354 |
| 1    | 1    | 1    | 0.7833     | 1       | 0.2167 |
| 0    | 0    | 1    | 0.2955     | -1      | 1.2955 |
| 0    | 1    | 0    | 0.2955     | -1      | 1.2955 |
| 0    | 1    | 1    | 0.5646     | 1       | 0.4354 |
| 0    | 0    | 0    | 0          | -1      | 1.0000 |

![img](/assets/img/MATLAB/5_7.png)

많이 틀리죠? 그런데 뭔가 패턴이 보입니다. -1이 나와야하는 애들과 1이 나와야하는 애들과 비슷한 숫자를 가지고 있네요.

바로 0.3~0.56구간을 기준으로 높으면 1, 낮으면 -1이라고 볼 수 있네요. 이제 `활성함수(sign function)`에 대해서 말씀드리겠습니다. 

![img](/assets/img/MATLAB/5_8.png)

`sign` 은 위와 같은 그래프를 그립니다. `sign(0)` 은 0이구요. `sign(90)` 은 1이고 `sign(270)` 은 -1입니다.  근데 사실 `sign function` 은 이게 아닙니다. 왜냐면 `sign function` 은 부호화에 사용될 때 사용하거든요. 

![img](/assets/img/MATLAB/5_9.png)

그러니까, 양수면 1을 만들어주고, 0이면 0, 음수면 -1을 만들어주는 부호화 함수입니다. 그런데 이런 부호화 함수를 써도 우리는 `Y (Predict)` 가 양수니까 다 1이 나오겠죠?

`bias` 를 0.3과 0.5사이 구간인 0.4를 붙이겠습니다.


$$
\begin{array}{l}
Y\ =\ sign(\sum_{i=1}^3 0.333\cdot X_i - 0.4)
\end{array}\\
$$

| X1   | X2   | X3   | Y(Val - bias) | Y(Sign) | Y(Real) |
| ---- | ---- | ---- | ------------- | ------- | ------- |
| 1    | 0    | 0    | 0.333 - 0.4   | -1      | -1      |
| 1    | 0    | 1    | 0.666 - 0.4   | 1       | 1       |
| 1    | 1    | 0    | 0.666 - 0.4   | 1       | 1       |
| 1    | 1    | 1    | 0.999 - 0.4   | 1       | 1       |
| 0    | 0    | 1    | 0.333 - 0.4   | -1      | -1      |
| 0    | 1    | 0    | 0.333 - 0.4   | -1      | -1      |
| 0    | 1    | 1    | 0.666 - 0.4   | 1       | 1       |
| 0    | 0    | 0    | 0 - 0.4       | -1      | -1      |

### <span style="color:darkblue">1.4. Multi Layer Perceptron</span>

![img](/assets/img/MATLAB/5_10.png)

방금 `SLP` 에서는 `Weight`  변경을 위한 학습이나 뒤로 와서 다시 연산하는 `Backward propagation` 에 대한 설명이 없었습니다. 그래서 이번에는 `Hidden layer` 가 추가된 `다층 신경망(MLP, Multi Layer Perceptron)` 으로 설명드리겠습니다.

| X1   | X2   | Y    |
| ---- | ---- | ---- |
| 0    | 0    | 0    |
| 0    | 1    | 1    |
| 1    | 0    | 1    |
| 1    | 1    | 0    |

위 조건을 봅시다. XOR회로입니다. `SLP` 에서는 학습이 안됩니다. 이유는 `2. Implement` 에서 확인할 수 있습니다. 그러나 `MLP` 에서는 가능합니다. 이제 `Perceptron` 을 확인해봅시다. `MLP` 니까 명분을 살려야겠죠? `Hidden layer` 를 하나 추가하여 만들어보겠습니다.

![img](/assets/img/MATLAB/5_11.png)

아래는 수식입니다.


$$
\begin{array}{l}
h_1\ =\ w^2_{11}x_1+w^2_{21}x_2+c_1\\
h_2\ =\ w^2_{12}x_1+w^2_{22}x_2+c_2\\
\\
\hat{h} = \hat{w}^{2'}\hat{x}+\hat{c}\\
\hat{h} = \begin{bmatrix}
h_{1}\\
h_{2}
\end{bmatrix}\qquad
\hat{w}^2 = \begin{bmatrix}
w^2_{11}\ w^2_{12}\\
w^2_{21}\ w^2_{22}\\
\end{bmatrix} \qquad
\hat{x} = \begin{bmatrix}
x_{1}\\
x_{2}
\end{bmatrix}\\
\\
\therefore \ y=\hat{w}^{3'}\hat{h}+b\\
\hat{w}^3=  \begin{bmatrix}
w^3_{11} \\
w^3_{21}
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

### <span style="color:darkblue">2. Backpropagation</span>

다음부터는 `backpropagation` 설명입니다. 

[backpropagation](https://simonwithwoogi.github.io/SimonWithWoogi.github.io/posts/matlabneuralnet2/)


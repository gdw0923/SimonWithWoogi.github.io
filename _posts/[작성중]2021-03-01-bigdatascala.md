---
title: BigData, Scala를 알아보자
author: Simon Anderson
date: 2021-03-01 04:22:00 +0800
categories: [Language, Scala]
tags: [BigData, Language, AI, JVM, Java, Scala, Spark]
image: /assets/img/Scala/1_Preview.png
math: true
---



 저는 RAM이 350 bytes 정도되는 `MCU` 에서 처음으로 소프트웨어를 짰었는데, 그때 당시 할당되는 프로그램 메모리가 아마 8 kb 정도였던 걸로 기억합니다. 그때는 C와 기계어를 돌아가며 보는 수준에서 프로그램을 만들어갔는데요. 그 뒤로 CPU 기반의 객체지향 프로그램을 하고 C++을 접하면서 넘쳐나는 메모리에 행복을 느꼈습니다. 그래도 메모리 관리는 늘 중요한 문제였죠. 그러다 C#이랑 Java를 하며 Garbage collection을 만났는데 이건 뭐 생산성이 이렇게 올라갈 줄이야 너무 놀랐습니다. 더 나아가 라이브러리 활용이 편리한 Python, 벡터 혹은 행렬에 특화된 MATLAB, 분산컴퓨팅에 적절한 Scala까지, 이제는 개발하고 릴리즈하고 관리하기까지 참 편하고 좋은 세상이라 행복합니다.



## <span style="color:darkblue">1. Scala</span>

**Scalar 아니야? 아 그런가?**

 `Scalable language` , 줄여서 `Scala` 의 얘기입니다. `Scala` 의 창시자인 `마틴 오더스키` 교수님께서 직접 집필하신 `Programming in Scala 3/e` 를 참고했습니다. 과연 이름만큼 정말로 유연한 언어일까요? 같이 알아보시죠.

![다현두부짤](/assets/img/Scala/1_1.png)

### <span style="color:darkblue">1.1. JVM(Java Virtual Machine)</span>

![JVM](/assets/img/Scala/1_2.png)

 `가상머신(Virtual Machine)` , 지금 크고 작은 기업에서, 그리고 일상에서 `가상머신` 을 쓰는 것이 보편화되어 있습니다. 현업에 계신 `Software engineer` 만이 아니라 공과대학 대학생분들이 과제할때도 `AWS` 서 프리티어 노드 5개를 가져와다가 묶어서 쓰고 있습니다. 근데 프리티어 노드는 꼭 `Linux` 밖에 없단 말이죠. `Windows` 를 써오는 사람에게는 적응하기란 그리 쉬운 일이 아닙니다.

 `OS` 에 제약없이 사용하고싶은 사람들이 늘어나면서 `JAVA 프로그램` 을 `OS` 위의 `가상머신` 에서 돌릴 수 있도록 구현하게 됩니다. `가상머신` 이라는게 단어가 어려운 것이지 중개자로 생각하셔도 문제 없습니다. `OS` 가 무엇이든 저희가 네이버에 접속하고 구글에 들어가서 웹서핑을 하는데, 이걸 `인터넷 익스플로러, 사파리, 크롬` 이런 웹 브라우저가 있기 때문에 가능한 일이죠. `JVM` 도 마찬가지입니다. 또한  **Scala** 를 이해하려면 `JVM` 메모리 구조를 아는게 좋습니다.

![JVM 메모리구조](/assets/img/Scala/1_3.png)

 `JVM` 메모리 구조는 위와 같습니다. `JVM` 이 `Class loader` 를 통해  `Java byte code` 를 불러오는 것부터 시작됩니다. 불러오면 `Execution Engine` 에 의해서 돌아가기 시작하는데 여기서 실제로 돌아가진 않습니다. `Runtime Data Area` 에 담아지면 그제서야 진짜 작업이 수행됩니다. 메모리 구조에 대해 설명드리는 이유는`JVM` 이`OS` 에 제한없는 것 외에도  `Garbage Collection` 덕에 메모리를 효율적으로 사용할 수 있게 해줍니다.

 `Scala` 에 대한 내용이 본 주제기에 `JVM` 에 대한 내용은 다음에 본격적으로 작성하겠습니다. 

### <span style="color:darkblue">1.2. Scala information</span>

[Scala3 git](https://github.com/lampepfl/dotty)

 위 링크는 `Scala3` 에 대한 깃주소입니다. 또한 밑에는 블로그 주소이니 여러 최신 정보를 얻을 수 있습니다.

[Scala3 Blog](https://dotty.epfl.ch/blog/index.html)

 또한 `Scala` 를 꼭 설치하지 않으셔도 됩니다. 웹에서도 `Scala` 를 체험하실 수 있거든요. 학습용으로는 아주 충분합니다. 아래 링크입니다.

[Scastie](https://scastie.scala-lang.org/?target=dotty)

![Scastie](/assets/img/Scala/1_3.png)

이런 창이 보이시나요?

## <span style="color:darkblue">2. Binomial time series LSTM</span>

![플로우](/assets/img/MATLAB/11_4.png)

 해당 내용은 `RNN` 과`LSTM` 에 대한 기본적인 이론과 `시계열 분석` 에 대한 `LSTM`  그리고 `이진 시계열 LSTM` 을 순서대로 설명한 다음, `MATLAB` 구현 코드로 넘어가겠습니다.

### <span style="color:darkblue">2.1. Recurrent Nerual Network</span>

![RNN](/assets/img/MATLAB/11_5.png)

 `RNN` 이란 `되풀이(Recurrent)` 되는 성질을 이용하여, 앞 전에 있는 데이터객체를 일련의 과정에 있다고 받아들이는 모델인데요. 일련의 과정을 설명할 수 있는 `문장, 동영상` 이나 `수요예측` 에 쓸 수 있습니다. `RNN` 은 `CNN` 과 다르게 입력, 출력을 자유롭게 구조를 쓸 수 있습니다. 이는 `LSTM` 에도 이어집니다.

![RNN여러구조](/assets/img/MATLAB/11_6.png)

 `one-many`는 하나가 들어와 여러 출력을 가지게 합니다. 예를 들면 한 이미지 안에서 여러 객체를 찾을 수 있죠. `many-one` 은 여러 출력들 속에서 하나를 반환합니다. 영화 리뷰를 다 읽어와 얼마나 긍정적인 반응인지 알 수 있습니다. 끝으로 `many-many` 는 번역이 대표적인 예입니다.

### <span style="color:darkblue">2.2. Long Short-Term Memory</span>

![LSTM활성함수](/assets/img/MATLAB/11_7_1.png)

![LSTM활성함수](/assets/img/MATLAB/11_7_2.png)

  `LSTM` 은 `RNN(Recurrent Neural Network)` 에서 파생된 모델입니다. `MATLAB` 에 적혀있는 `활성함수` 단을 보겠습니다. 선택할 수 있는게 몇 개 없네요. 순환 신경망 레이어 특성상 `선형 활성함수`는 비효율적입니다. 체인룰을 적용했을 때 히든레이어에서 조정할 가중치는 따로 없어지고 계수만 남게되는데요.  아래의 내용은 [MATLAB 도움말](https://kr.mathworks.com/help/deeplearning/ref/nnet.cnn.layer.lstmlayer.html#mw_8cad7fee-7610-4134-9354-b7ed3a45204d) 을 그대로 가져왔습니다. 학술적 내용이니 넘어가셔도 됩니다. 

---

LSTM 계층은 시계열 및 시퀀스 데이터에서 시간 스텝 간의 장기 종속성을 학습합니다.

계층의 상태는 **은닉 상태**(**출력 상태**)와 **셀 상태**로 구성됩니다. 시간 스텝 t에서의 은닉 상태는 이 시간 스텝에 대한 LSTM 계층의 출력값을 포함합니다. 셀 상태는 이전 시간 스텝에서 학습한 정보를 포함합니다. 이 계층은 각 시간 스텝에서 셀 상태에 정보를 추가하거나 셀 상태로부터 정보를 제거합니다. 계층은 **게이트**를 사용하여 이러한 업데이트를 제어합니다.

다음 구성요소는 계층의 셀 상태와 은닉 상태를 제어합니다.

| 구성요소       | 목적                                     |
| -------------- | ---------------------------------------- |
| 입력 게이트(i) | 셀 상태 업데이트의 수준 제어             |
| 망각 게이트(f) | 셀 상태 재설정(망각)의 수준 제어         |
| 셀 후보(g)     | 셀 상태에 정보 추가                      |
| 출력 게이트(o) | 은닉 상태에 추가되는 셀 상태의 수준 제어 |

![LSTM구조](/assets/img/MATLAB/11_8.png)

 LSTM 계층의 학습 가능한 가중치는 입력 가중치W(`InputWeights`), 순환 가중치R(`RecurrentWeights`), 편향b(`Bias`)입니다. 행렬 W, R, b는 각각 각 구성요소의 입력 가중치 결합, 순환 가중치 결합, 편향 결합입니다. 이러한 행렬은 다음과 같이 결합됩니다.


$$
\begin{array}{l}
W = \begin{bmatrix}W_i\\W_f\\W_g\\W_o\end{bmatrix},
R = \begin{bmatrix}R_i\\R_f\\R_g\\R_o\end{bmatrix},
b = \begin{bmatrix}b_i\\b_f\\b_g\\b_o\end{bmatrix}
\end{array}
$$


여기서 i, f, g, o는 입력게이트, 망각게이트, 셀 후보, 출력 게이트를 나타냅니다. 시간 스텝 t에서의 셀 상태는 다음과 같이 표현됩니다.


$$
\begin{array}{l}
c_t = f_t\odot c_{t-1}+i_t\odot g_t
\end{array}

\\ \odot \text{해당 기호는 요소별 곱셉(component-wise)을 뜻합니다.}
$$


시간 스텝 t에서의 은닉 상태는 다음과 같이 표현됩니다.


$$
h_t = o_t\odot\sigma_c(c_t)
$$


여기서 *σ**c*는 상태 활성화 함수를 나타냅니다. `lstmLayer` 함수는 기본적으로 쌍곡탄젠트 함수(tanh)를 사용하여 상태 활성화 함수를 계산합니다.

다음 수식은 시간 스텝 t에서의 구성요소를 설명합니다.


$$
\text{입력 게이트 식 :}\ i_t=\sigma_g(W_ix_t+R_ih_{t-1}+b_i) \\
\text{망각 게이트 식 :}\ f_t=\sigma_g(W_fx_t+R_fh_{t-1}+b_f) \\
\text{셀 후보 식 :}\ g_t=\sigma_c(W_gx_t+R_gh_{t-1}+b_g) \\
\text{출력 게이트 식 :}\ o_t=\sigma_g(W_ox_t+R_oh_{t-1}+b_o) \\
\text{위 식에서 } \sigma_g \text{는 게이트 활성함수를 나타냅니다. lstm layer 함수는 기본적으로 }\\\sigma(x)=(1+e^{-x})^{-1}\\
\text{로 표현되는 시그모이드 함수를 사용하여 게이트 활성화 함수를 계산합니다.}
$$

---



 끝으로 `MATLAB` 에서 확인할 수 있는 `LSTM` 의 출력 모드는 두 가지가 있습니다. `sequence` 와 `last` 인데요. `sequence` 는 전체 시퀀스를 출력하고, `last` 는 `sequence` 의 마지막 시간 스텝을 출력한다고 적혀있습니다. 

### <span style="color:darkblue">2.3. Time series LSTM</span>

 제가 처음으로 사용한 `LSTM` 은 영일번역과 다중객체인식으로 사용했습니다. 그러나 이번 포스팅에서 사용할 내용은 `시계열 LSTM` 인데요. 작은 차이밖에 없습니다. 분류는 `sequence to label` 로 설정하구요. 시계열은 `sequence to sequence` 신경망을 이용하여 시계열을 통해 시계열을 얻는 구조로 진행할 예정입니다.

### <span style="color:darkblue">2.4. Binomial time series LSTM</span>

 일반적인 `시계열 예측` 은 회귀를 사용합니다. 예를 들면 3년 뒤면 우리 제품의 수요가 어느정도인가? 에 대한 질문에 답을 할 수 있죠. `이진 시계열 예측(Binomial time series)` 는 회귀를 `기준(threshold)` 치로 두고 `T/F, 맞냐/아니냐` 를 얘기합니다. 저희가 곧 구현할 로또당첨번호 예측을 얘기한다면, 1000회차에 17번이 나올 것인가 안 나올 것인가로 얘기하죠. 

## <span style="color:darkblue">3. Implement</span>

 본격적으로 구현하는 시간입니다. 프로그램 순서는 역대 당첨번호를 긁어와 이진값으로 바꾸고 `LSTM` 을 돌려서 미래의 50회차를 예상하여 후보값들을 가져옵니다. 그 뒤 다시 `로또 당첨 통계` 웹 사이트에 접속해서 통계자료를 가져온 다음에 빈도수에 가중치를 두어 추출할 것 입니다.

```matlab
clc, clear
% 사용할 금액 입력
Money = 10000;
```

초기 셋팅 먼저하고 시작하겠습니다.

### <span style="color:darkblue">3.1. Getting History</span>

역대 당첨번호를 긁어와서 테이블을 만듭니다. `동행복권` 사이트에 들어가 소스를 확인해보니 `drwNo` 가 회차(1회, 2회, ... ,950회 같은)를 담당하는 변수였습니다. `drwNo` 를 변경하면 각 회차의 당첨번호를 확인할 수 있습니다. 또한, 언제 끝날지 알기위해서 `waitbar` 를 이용하겠습니다.

![waitbar](/assets/img/MATLAB/11_9.png)

```matlab
% 역대 당첨번호 긁어오기
url = 'https://dhlottery.co.kr/gameResult.do?method=byWin';
data = webread(url)
% 얼마나 반복할지 구해온다
startpoint = strfind(data, '동행복권 ');
endpoint = strfind(data, '회');
lim = str2num(data(startpoint+5:endpoint-1));

header = {'1st', '2nd', '3rd', '4th', '5th', '6th', 'Bonus'};
HistorySet(1:lim, 1:7) = {''};
f = waitbar(0,'Please wait...');
% 데이터 가공해서 담기
for i = 1:lim
    data = webread(url,'drwNo',string(i));
    startpoint = strfind(data, '당첨번호 ');
    endpoint = strfind(data, '1등');
    data = data(startpoint+5:endpoint-3);
    numbers = strsplit(data,',');
    bonus = strsplit(numbers{6},'+');
    HistorySet(i, :) = [numbers(1:5) bonus];
    waitbar(i/lim, f, strcat(string(i), '회차 완료'));
end
delete(f)

HistorySet = cell2table(HistorySet, "VariableNames", header);
writetable(HistorySet, 'temp.csv')
HistorySet = readtable('temp.csv',"VariableNamingRule","preserve");
delete('temp.csv')
```

### <span style="color:darkblue">3.2. Convert type to binomial</span>

`HistorySet` 에 들어가있는 테이블 형태는 아래와 같습니다. 이를 `Binomial` 형태로 바꾸면 `45짜리 행벡터` 에 해당하는 숫자가 1로 들어갑니다.

![historyset](/assets/img/MATLAB/11_10.png)

```matlab
%dummy val 형태로 변환
f = waitbar(0,'Please wait...');
Dummy = zeros(lim, 45);
for i = 1:lim
    Dummy(i, HistorySet{i, :}) = 1;
    waitbar(i/lim, f, 'processing');
end
delete(f)
```

![dummy](/assets/img/MATLAB/11_11.png)

이렇게 말이죠.

### <span style="color:darkblue">3.3. Learning lotto's pattern</span>

 `LSTM` 을 이용해서 역대 당첨번호들을 학습시킵시다.

```matlab
%LSTM 학습
%numTimeStepsTrain = floor(0.9*length(Dummy));

%dataTrain = Dummy(1:numTimeStepsTrain+1, :);
%dataTest = Dummy(numTimeStepsTrain+1:end, :);

dataTrain = Dummy;

XTrain = dataTrain(1:end-1, :);
YTrain = dataTrain(2:end, :);

numFeatures = 45;
numResponses = 45;
numHiddenUnits = 200;

layers = [ ...
    sequenceInputLayer(numFeatures)
    lstmLayer(numHiddenUnits)
    fullyConnectedLayer(numResponses)
    regressionLayer];

options = trainingOptions('adam', ...
    'MaxEpochs',250, ...
    'GradientThreshold',1, ...
    'InitialLearnRate',0.005, ...
    'LearnRateSchedule','piecewise', ...
    'LearnRateDropPeriod',125, ...
    'LearnRateDropFactor',0.2, ...
    'Verbose',0, ...
    'Plots','training-progress');

net = trainNetwork(XTrain',YTrain',layers,options);
```

`Lotto` 는 `Uniform` 분포에서 랜덤추출되는 메커니즘이기에 아무래도 좋은 `RMSE` 라고할 순 없네요.

![result](/assets/img/MATLAB/11_12.png)

### <span style="color:darkblue">3.4. Prediction</span>

미래 50회차를 예상해봅니다

```matlab
%LSTM 미래스텝
net = predictAndUpdateState(net,XTrain');
[net,YPred] = predictAndUpdateState(net,YTrain(end, :)');

numTimeStepsTest = 50;
for i = 2:numTimeStepsTest
    [net,YPred(:,i)] = predictAndUpdateState(net,YPred(:,i-1),'ExecutionEnvironment','cpu');
end
```

해당 값에서 0.29보다 높은 애들만 추려서 `Binomial` 형태로 변환합니다.

```matlab
% dummy val 형태로 변환
temp = YPred > 0.29;
% 번호로 돌려놓기
for i = 1:numTimeStepsTest
    Candidate(i) = {find(temp(:, i) == 1)};
end
Dummy(end+1:end+numTimeStepsTest, :) = temp';
```

이렇게 말이죠.

![data](/assets/img/MATLAB/11_13.png)

### <span style="color:darkblue">3.5. Getting statistical data</span>

```matlab
% 통계자료 획득
url = 'https://dhlottery.co.kr/gameResult.do?method=statByNumber';
data = webread(url);
```

웹에 들어가서 역대 통계자료를 가져옵니다.

```matlab
% 데이터 파싱
be = strfind(data, 'ballNoPop[0] =');
ed = strfind(data, 'drwtNoPop[44] =');
data = data(be:ed+21);
```

1~45의 발생빈도를 가져와야되니까 해당 구간만 가져오구요.

```matlab
% 숫자데이터 추출
tempData = split(data, ';');
tempData(end) = [];
numData = split(tempData, '=');
```

숫자를 빼내옵니다.

```matlab
% 계산가능한 형태로 변환
Lotto.Pop = numData(2:2:end, 2);
for i=1:length(Lotto.Pop)
    Lotto.Pop(i) = extractBetween(Lotto.Pop{i},"'","'","Boundaries","exclusive");
end
Lotto.Pop = str2num(cell2mat(Lotto.Pop));

rng('shuffle');
% 발생빈도 내림차순 정렬
[Lotto.Pop, Lotto.Num] = sort(Lotto.Pop, 'descend');
```

계산을 해야되니까 숫자형태로 바꾸고 내림차순으로 정렬했습니다.

### <span style="color:darkblue">3.6. Predict lucky number</span>

번호추출은 `LSTM` 에서 가져온 번호와 가장 높은 빈도 15개의 교집합으로 얻은 숫자 3개, 중간 빈도 15개의 교집합으로 얻은 숫자 1개, 낮은 빈도 15개의 교집합으로 얻은 숫자 2개를 랜덤 생성하여 총 6개의 숫자를 얻습니다.

```matlab
% 번호추출
for itr=1:numTimeStepsTest
    Term = lim + itr;
    for i=1:Money/1000
        clearvars Predicted A B C
        A=3;B=1;C=2;
        N = intersect(Candidate{itr},Lotto.Num(1:15));
        if length(N) < A
            A = length(N);
        end
        if A ~= 0
            Predicted(1:A) = datasample(N,A,'Replace',false);
        end
        
        N = intersect(Candidate{itr},Lotto.Num(16:30));
        if length(N) < B
            B = length(N);
        end
        if B ~= 0
            Predicted(A+1:A+B) = datasample(N,B,'Replace',false);
        end
        
        N = intersect(Candidate{itr},Lotto.Num(31:45));
        if length(N) < C
            C = length(N);
        end
        if C ~= 0
            Predicted(A+B+1:A+B+C) = datasample(N,C,'Replace',false);
        end
        
        if A+B+C < 6
            N = Lotto.Num(1:15);
            Predicted(A+B+C+1:6) = datasample(N,6-(A+B+C),'Replace',false);
        end
        Result(i, :) = [sort(Predicted) Term];
    end
    PredictSet((itr-1)*(Money/1000)+1:(itr)*(Money/1000), :) = Result;
end
```

### <span style="color:darkblue">3.7. Saving numbers</span>

끝으로 만들어진 데이터를 2차 가공할 수도 있으니, `.csv` 로 저장합니다.

```matlab
header{end} = 'Round';
T = array2table(PredictSet,"VariableNames",header);
writetable(T, 'BlessYou.csv')
```

행운을 빌겠습니다
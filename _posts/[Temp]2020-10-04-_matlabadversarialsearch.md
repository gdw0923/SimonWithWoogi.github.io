---
title: MATLAB 적대적 탐색을 이해하여 Tic-Tac-Toe를 구현해보자
author: Simon Anderson
date: 2020-10-04 19:51:00 +0800
categories: [MATLAB, Applied]
tags: [MATLAB,Java, DeepLearning, Algorithm, DataStructure, Game]
image: /assets/img/MATLAB/3_Preview.png
math: true
---

## <span style="color:darkblue">1. Adversarial Search</span>

### <span style="color:darkblue">1.1. Games</span>

저희가 살면서 상대방에게 `Adversarial`,`적대적인`감정을 느낄 때가 언제 있을까요? 심지어 반복적으로 자주 있다면 계속 이기고 싶을겁니다. 피할 수 없다면요. 인류 기술의 발전은 아이러니하게도 전쟁이 큰 역할을 했다는 얘기 들어보신 적 있으신가요? 이제부터 얘기하는 `게임`은 `전쟁도 게임`이고 전쟁 속 `전투들 또한 게임`이라 합니다. 본문의 주제인 `Adversarial Search`는 주로 `게임`에 이용됩니다.

여기서 말하는 `게임`에는 어떤 요소를 가지고 있는 지 얘기해보겠습니다.

---

1. `Multiagent environments`
2. `Initial states`
3. `Player(s)`
4. `Action(s)`
5. `Result(s, a)`
6. `Terminal-test(s)`
7. `Utility(s, p)`

---

#### <span style="color:darkblue">1.1.1. States</span>

`State`는 `Feasible solution(가능해)`의 집합입니다. 게임을 포함한 탐색에서 불가능한 상황을 제외한 전부라고 볼 수 있습니다. 예를 들어서 한 번에 5명까지 움직일 수 있는 배가 있다면, 랜덤으로 뽑은 0명에서 5명까지의 모든 상황을 정리해두면 이를 `State space`라고 합니다. 그리고 가능한 하나의 상황을 `state`라고 합니다. 그렇다면 6명으로 구성된 상황은 `state space`에 있을까요? `Infeasible`하기에 **들어갈 수 없습니다.**

[이미지 feasible과 infeasible한 경우]

#### <span style="color:darkblue">1.1.2. Agent(s)</span>

`Multiagent environments`는 `상호작용(Interaction)`하는 둘 이상의 `Agent`가 있어야합니다.  `Agent`는 `Player`이면서 `게임에 임하는 사람`이라고 할 수 있습니다. `Agent(s)`란 `State - s`에서 움직일 `Agent`에 대해서 정의를 얘기합니다.

#### <span style="color:darkblue">1.1.3. Action(s)</span>

`Action`은 규칙이라 할 수 있습니다. 더 얘기하면 `Action`은 움직임을 표현한 집합입니다. 규칙과 움직임, 게임에서는 두 단어가 관련이 있습니다. 게임 속에서는 모든 `Agents`가 규칙에 의한 움직임만을 가집니다. 오목과 비유한다면 한 턴에 돌을 두, 세개 놓을 수 없으니 `Action`에는 한 개의 돌과 관련된 움직임이 들어가 있죠. 흰 돌을 두거나, 흑 돌을 두거나 입니다.

`Action(s)`란 `State - s`에서 움직임을 표현한 집합입니다.

#### <span style="color:darkblue">1.1.4. Result(s, a)</span>



#### <span style="color:darkblue">1.1.5. Terminal-test(s)</span>

#### <span style="color:darkblue">1.1.6. Utility(s, p)</span>



### <span style="color:darkblue">1.2. Mini-max algorithm</span>

기하학적으로 

## <span style="color:darkblue">2. Implement</span>

### <span style="color:darkblue">2.1. m,n,k-game</span>

실

### <span style="color:darkblue">2.2. Tic-Tac-Toe</span>

### <span style="color:darkblue">2.2. MATLAB code description</span>

**MATLAB 복사하기 쉽게된 전문은 제일 아래에 있습니다.** 지금부터는 설명입니다.

```matlab
clc, clear
Medical_DataSet = readtable('Data\heart.csv');
NormCandidate = [1 0 1 1 1 0 0 1 0 1 1 1 1 0];
```

[Kaggle Hear Disease UCI](https://www.kaggle.com/ronitf/heart-disease-uci)에서 데이터를 가져왔습니다. 변수를 초기화한 다음, 데이터를 불러옵니다. 그리고 아래 설명에 따라 표준화를 진행할 설명변수 자리에 1을 표기했습니다.



`표준화`


$$
\frac{X-\mu}{\sigma}
$$


표준화를 할 변수를 14개 중에서 골라봅시다. 표준화 대상인 변수는 <span style="color:blue">**파랑 굵음**</span>으로 표현하겠습니다. 굳이 할 필요 없는데 확실하게 하고자 표준화하는 변수는 <span style="color:blue">파랑 일반</span>으로 표현하겠습니다. 변수에 대한 설명은 [Kaggle Hear Disease UCI](https://www.kaggle.com/ronitf/heart-disease-uci)에 나와있는 그대로 가져왔습니다.

---

1. <span style="color:blue">**age**</span>
2. sex(1-male, 0=female)
3. <span style="color:blue">chest pain type (4 values)</span>
4. <span style="color:blue">**resting blood pressure**</span>
5. <span style="color:blue">**serum cholestoral in mg/dl**</span>
6. fasting blood sugar > 120 mg/dl
7. resting electrocardiographic results (values 0,1,2)
8. <span style="color:blue">**maximum heart rate achieved**</span>
9. exercise induced angina
10. <span style="color:blue">**oldpeak = ST depression induced by exercise relative to rest**</span>
11. <span style="color:blue">the slope of the peak exercise ST segment</span>
12. <span style="color:blue">number of major vessels (0-3) colored by flourosopy</span>
13. <span style="color:blue">thal: 3 = normal; 6 = fixed defect; 7 = reversable defect</span>
14. target

---

```matlab
arr_DataSet = table2array(Medical_DataSet);
%Before normalize
figure
hold on
for i=1:width(Medical_DataSet)
    if NormCandidate(i) == 1
        plot(arr_DataSet(:,i))
    end 
end
hold off
%normalize
for i=1:width(Medical_DataSet)
    if NormCandidate(i) == 1
        arr_DataSet(:, i) = ((arr_DataSet(:, i) - min(arr_DataSet(:,i))) / (max(arr_DataSet(:,i)) - min(arr_DataSet(:,i))));
    end  
end
%After normalize
figure
hold on
for i=1:width(Medical_DataSet)
    if NormCandidate(i) == 1
        plot(arr_DataSet(:,i))
    end 
end
hold off
```

가져온 `table`을 수치적으로 처리하기 쉽게 `array`의 자료형으로 변환합니다. `표준화`를 진행하면 아래 그래프처럼 0과 1사이의 값으로 변경됩니다.

![img](/assets/img/MATLAB/3_10.png)

![img](/assets/img/MATLAB/3_11.png)

`상관관계 분석`

**여기서부터 제가 가져온 데이터가 `PCA`를 실습하기에는 올바르지 않다는 걸 느꼈습니다.** 왜냐하면 이미 설명변수간의 상관성이 낮은 편이더라구요.(보통 0.6 이하) `PCA`의 목적은 `차원축소`를 통해 뒤에 진행하는 연산을 간소화하는 것도 있지만 각 설명변수간의 상관성을 낮춰 `Multicollinearity`를 없애는 이유기도 했습니다.

그러니 이번 데이터를 통해 얻을 수 있는 것은 `변수를 줄일 수 있다`입니다.

```matlab
%correlation matrix
data_corr = corr(arr_DataSet);
figure, imagesc(data_corr), colorbar
```

![img](/assets/img/MATLAB/3_12.png)

`PCA`

```matlab
%PCA
[coeff, score, latent, tsquared, explained] = pca(arr_DataSet);
checker = 0;
for PCs=1:height(Medical_DataSet)
    checker = checker + explained(PCs);
    if(checker > 88)
        break;
    end
end
```

PCA를 진행했고, 설명력이 88%가 넘어가는 주성분까지를 선정했습니다. (7개) 이미 데이터가 깔끔해서 주성분이 많이 나오는데 보편적으로는 3~4개쯤에 설명력 85%를 넘깁니다. 그리고 이미 잘 독립된 형태의 데이터라 그런지 고유값 또한 1을 넘는 것이 안 나오네요.

![img](/assets/img/MATLAB/3_14.png)

`coeff`는 주성분 계수, `score`는 주성분에 대한 점수, `latent`는 `Eigen vlaue`입니다.  `tsquared`는 본 글에서 사용하지 않았으니 넘어가고 `explained`는 주성분의 데이터 설명력입니다.

![img](/assets/img/MATLAB/3_13.png)

```matlab
%Visualization
cumplot = cumsum(explained);
limline = cumplot.*0 + 88;
figure
hold on
plot(limline, 'red');
plot(cumplot, '--blue');
hold off
latent(find(latent > 1.0))

coeff(:, PCs+1:width(Medical_DataSet)) = [];
arr_DataSet = arr_DataSet * coeff;
PCAMatrix = arr_DataSet(:, 1:PCs);

pca_corr = corr(PCAMatrix);
figure, imagesc(pca_corr), colorbar
```

이번 PCA 시각화 자료입니다. 88%를 기준으로 누적 데이터설명률을 표현하고,

1.0 이상의 `Eigen value`를 가지는 주성분을 출력하며 `선형변환` 후 `설명변수`간의 상관행렬을 확인합니다.

![img](/assets/img/MATLAB/3_14.png)

### <span style="color:darkblue">2.3. MATLAB code 전문</span>

```matlab
clc, clear
Medical_DataSet = readtable('Data\heart.csv');
NormCandidate = [1 0 1 1 1 0 0 1 0 1 1 1 1 0];

arr_DataSet = table2array(Medical_DataSet);
%Before normalize
figure
hold on
for i=1:width(Medical_DataSet)
    if NormCandidate(i) == 1
        plot(arr_DataSet(:,i))
    end 
end
hold off
%normalize
for i=1:width(Medical_DataSet)
    if NormCandidate(i) == 1
        arr_DataSet(:, i) = ((arr_DataSet(:, i) - min(arr_DataSet(:,i))) / (max(arr_DataSet(:,i)) - min(arr_DataSet(:,i))));
    end  
end
%After normalize
figure
hold on
for i=1:width(Medical_DataSet)
    if NormCandidate(i) == 1
        plot(arr_DataSet(:,i))
    end 
end
hold off

%correlation matrix
data_corr = corr(arr_DataSet);
figure, imagesc(data_corr), colorbar

%PCA
[coeff, score, latent, tsquared, explained] = pca(arr_DataSet);
checker = 0;
for PCs=1:height(Medical_DataSet)
    checker = checker + explained(PCs);
    if(checker > 88)
        break;
    end
end

%Visualization
cumplot = cumsum(explained);
limline = cumplot.*0 + 88;
figure
hold on
plot(limline, 'red');
plot(cumplot, '--blue');
hold off
latent(find(latent > 1.0))

coeff(:, PCs+1:width(Medical_DataSet)) = [];
arr_DataSet = arr_DataSet * coeff;
PCAMatrix = arr_DataSet(:, 1:PCs);

pca_corr = corr(PCAMatrix);
figure, imagesc(pca_corr), colorbar
```


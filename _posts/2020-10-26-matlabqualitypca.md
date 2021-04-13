---

title: MATLAB 공정능력분석을 이해하고 시각화해보자
author: Simon Anderson
date: 2020-10-26 22:37:00 +0800
categories: [MATLAB, Quality]
tags: [MATLAB,Visualization, QualityManagement, Improvement, Statistics, Quality]
image: /assets/img/MATLAB_Quality/1_Preview.png
math: true
---

## <span style="color:darkblue">1. Process Capability Analysis</span>

### <span style="color:darkblue">1.0. Intro</span>

 `품질`이란 모든 분야의 중요 요소입니다. `서비스품질`, `소프트웨어품질`, `제품품질`,`공정품질` 등 `품질경영`이 신뢰를 중요히 여기는 기업에겐 제일가치를 말하기도 합니다. 대한민국의 삼성이란 기업이 1993년 독일 프랑크푸르트에서 `초격차 품질경영`에 대해서 얘기했습니다.   그리고 2020년 10월 25일 삼성 이건희 회장의 사망 소식을 들었습니다. 저는 7년간 삼성의 글로벌 연구센터 개발자로서 해외에 있는 여러 현장을 둘러보며 `품질경영`을 피부로 느끼다보니 기분이 묘합니다.  결론적으로 이번 포스팅은 이건희 회장의 별세로 다시금 `품질`에 대해 생각하게 됐으며  `품질경영`에 대한 10부작으로 진행됩니다.

별도로, 이런 수치분석은 `Minitab`이라는 편한 툴이 있습니다 보편적인 경우에는 `Minitab`이 훨씬 강력합니만,  `MATLAB`을 써야 내가 의도된 대로 나온 것인지 확인할 수도 있으며 중간과정을 이해할 수 있습니다. 툴을 잘 사용하는 것도 좋은 재능입니다만 원리를 깨우쳐야 다른 분야에 적용할 수 있으니 `MATLAB`을 권장합니다.

### <span style="color:darkblue">1.1. About</span>

![img](/assets/img/MATLAB_Quality/1_1.png)

공정능력분석은 공정능력평가를 얘기합니다. 궁극적으로 공정이 목표를 충족시킬 수 있는가?를 보죠. 분석이 들어간 뒤에는 조정가능한지 여부를 살펴보고 단기, 장기를 기준으로 공정능력 보고서가 산출물로 나옵니다. 여기서 `Process`와 `Target`은 꼭 제조에 해당되는 얘기가 아니기도 합니다. 실무에 해당하는 예를 들자면, 직원들의 근무시간을 수집합니다. `Target`은 `40 hour / a week`이고 `32~48 hour / a week`까지는 이해해주지만, 그 이하와 그 이상은 업무적인 측면과 직원의 컨디션 때문에 제제를 해야됩니다. 평균 직원들의 근무시간은 얼마이며 다들 대체로 비슷할까요? 누군가 극심한 업무부하가 있진 않을까요? 이러한 호기심이 시작되면 회사의  `Human resource`에 관심을 가지게 됩니다. 

### <span style="color:darkblue">1.2. Process Capability Index</span>

`Process Capability Index(공정능력지수)`는 공정이 얼마나 균일한 품질의 제품을 만들 수 있는 지에 대해 얘기합니다. 공정에 대한 내용을 평가하기 위해 지수로 만든 것이죠. 이런 행위를 정량화라고 합니다. 공정능력지수는 품질의 특성치가 정규분포 속에 있다는 전제하에 `제품의 공차`와 `6-sigma(후술)`사이에서 상대적인 크기를 비교할 수 있습니다.

#### <span style="color:darkblue">1.1.1. Norm</span>

![img](/assets/img/MATLAB_Quality/1_2.png)

`Normal Distribution(정규분포)`에 대해서 얘기할 차례입니다. 모든 직원들이 근무하는 시간이 비슷한지, 한 직원의 한 달간 근무시간이 균일한지 얘기할 때 `정규분포`를 얘기합니다. 근데 왜 제품의 특성치가 혹은 예시로 들었던 직원들의 근무시간이 `정규분포` 속에 있다고 가정할까요? 여기에는 `Central limit theorem(중심극한정리)`가 적용됩니다. `정심극한정리`에 대해 간단히 얘기하자면 어떤 분포를 가지던, **샘플 수가 많아**지면 모두 다 `정규분포`를 따라간다고 이해하시면 됩니다. 보통은 **샘플 수를 30개 이상**부터 정규 분포에 수렴된다는 얘기를 합니다. 실제로도 비슷하구요.

#### <span style="color:darkblue">1.1.2. Probability</span>

![img](/assets/img/MATLAB_Quality/1_3.png)

`정규성검정(Normality Test)`에 대한 얘기입니다. 앞 서 모든 샘플은 `정규분포` 속에 있다는 **가정**을 할 것입니다. 그런데 사실 `정규분포`가 아니라면? 앞으로의 결과에 **심각한 오류**가 생깁니다. 그렇다면 본격적으로 진행하기 전에 정말 정규분포 속에 있는 지 봐야합니다.   <span style="color:darkred">조금 진지하게 여러 학술지나 논문에서에서 정규성검정이 빠진 채로 통계분석을 진행하는 경우를 많이 봤습니다.</span> 경각심을 가지고 `정규성검정`을 먼저 진행해야 합니다.

![img](/assets/img/MATLAB_Quality/1_4.png)

#### <span style="color:darkblue">1.1.3. Histogram</span>

연속적인 데이터를 구간별로 n등분하여 이 구간에 몇 개가 있는 지 보여주는 `Histrogram`은 `정규성검정`에 도움이 됩니다. 또한 `정규분포`가 어떻게 그려지는 지 확인할 수 있죠. 예를 들어서 직원들의 근무시간을 다 구하여 최소, 최대값을 구한 다음 10등분을 하면 `histogram with 10 bins`라고 합니다. 10개의 구간에 직원들의 근무시간이 다 들어가 있는 것이죠.

#### <span style="color:darkblue">1.1.4. Process Capability</span>

이제 `정규분포` 속에 있다는 품질특성을 본격적으로 따져보고 평가해봅시다. 먼저`목표(Target)`, `샘플수(m)` 그리고 `상한,하한선(Upper and Lower Specification Limit, USL&LSL)`을 정합니다. 그리고 `평균(mu)`과 `표준편차(std)`를 구합니다. 마지막으로 `Biased(편항된) case`를 고려하여 치우침에 대한 `상수(k)`를 구합니다. 위 요소들을 잘 조합하여 나온 공정능력지수를 `Cp(Normal case)`, `Cpk(Biased case)`이라 합니다. 공정능력지수에 대한 설명은 아래와 같습니다. 아래 숫자의 기준은 이후에 진행하는 `6-sigma`를 통해 이해하실 수 있습니다.

| Process Capabililty Index(Cp) | Mean                                                         |
| :---------------------------: | ------------------------------------------------------------ |
|          Cp >= 1.67           | 공정능력이 매우 충분함. 현 공정의 비용 및 간소화를 고려해야함 |
|       1.67 > Cp >= 1.33       | 공정능력이 충분함, 현 상태 유지                              |
|       1.33 > Cp >= 1.00       | 공정능력이 미흡함, 공정능력 관리 필요                        |
|      1.00 > Cp >=  0.67       | 공정능력이 부족함, 불량 발생에 따른 공정 개선 필요           |
|           0.67 > Cp           | 공정을 즉시 중단하고 불량에 대한 원인규명 및 품질 개선에 대한 대책 마련 필요 |


$$
\begin{array}{l}
\text{공정능력지수(양쪽 규격이 주어진 경우)}\\ 
\mu = 평균, \ \sigma=표준편차,\ USL,LSL=상한선,하한선 \\
Cp={USL-LSL \over 6\sigma} \\
Cpk=min({USL-\mu \over 3\sigma},\ {\mu-LSL \over 3\sigma}) \\
Cpm = {USL-LSL \over 6\sqrt{\sigma^2+(\mu-m)^2}} \\
cf. biased\ case \qquad
k={|m-\mu| \over (USL-LSL)/2} \qquad Cpk = (1-k)Cp
\end{array}
$$


### <span style="color:darkblue">1.2. Long/Short Term Process Capability</span>

![img](/assets/img/MATLAB_Quality/1_5.png)

`공정능력평가`에 대해서 얘기를하면 지금 이 평가가 평생갈 것인가에 대한 의문이 생깁니다. 아마 대부분 일정기간까지만 효력이 있다고 생각할 것입니다. 그래서 `공정능력평가`를 두 가지로 나눕니다. `Long term process capability(장기공정능력)`와 `Short term process capability(단기공정능력)`입니다.

#### <span style="color:darkblue">1.2.1. Long term process capability</span>

`장기공정능력`은 공정 외에도 여러가지 변수요소가 들어와 `공정능력`에 영향을 준다를 전제로 하고 있습니다. 그러므로 충분히 긴 기간과 충분히 많은 샘플로서 얘기를 합니다. 표준화 심볼은 Z_lt입니다. `장기공정능력`은 `기술`과, `공정 관리`로 정의되며 **일상 조건**에서의 `공정 관리 능력`을 얘기합니다. 

#### <span style="color:darkblue">1.2.2. Short term process capability</span>

`단기공정능력`은 공정에 **외부적인 영향이 없다**는 전제입니다. 그러므로 로트간의 상관관계도 필요없으니 짧은 기간에 Sample로서 얘기합니다. 이를 **최적 조건**에서의 `공정 관리 능력`이라고 합니다.

## <span style="color:darkblue">2. Implement</span>

아래의 데이터를 가지고 구현을 할 것입니다. `공정능력`에 대한 내용이기에 코드의 메커니즘도 따로없고 데이터 분석도 크게 필요없기에 소스 산출물로서만 얘기를 하겠습니다. 또한 한 부품군에 대한 내용이기에 관리도를 통한 공정능력분석이 아닙니다. 다음 포스팅에서 관리도 설명과 함께 공정능력분석을 얘기하겠습니다.

![img](/assets/img/MATLAB_Quality/1_data.png)

 **MATLAB 복사하기 쉽게된 전문은 제일 아래에 있습니다.** 지금부터는 설명입니다.

`Target = 100 양측 30의 범위`

```matlab
clc, clear
Target = 100;
USL = 130;
LSL = 70;
```

### <span style="color:darkblue">2.1. probplot</span>

가상선의 기울기가 대각선에 가깝고 중앙으로 밀집되어 있는 지 확인합니다. 데이터 컬럼명은 "Data"로 `MATLAB` 테이블 객체에서 `{}`는 `Table`이 아닌 요소자체를 가져옵니다.

```matlab
ProcTable = readtable("D:\data.xlsx"); % 데이터 경로로 잡아주세요
data = ProcTable{:, "Data"};

figure
probplot(data);
```

![img](/assets/img/MATLAB_Quality/1_6.jpg)

### <span style="color:darkblue">2.2. histfit</span>

히스토그램과 정규분포곡선을 보고 편향된 것은 없는지 왜곡된 것은 없는 지 확인합니다.

```matlab
figure
nbins = 17;
histfit(data)
%histfit(data, nbins) // bins 조정가능

title('Histogram with Normal Curve')
xlabel('Value')
ylabel('Frequency')
```

![img](/assets/img/MATLAB_Quality/1_7.jpg)

### <span style="color:darkblue">2.3. capability</span>

한도를 벗어나는 범위에 대해서 확인합니다.

```matlab
S = capability(data,[LSL USL])
figure
capaplot(data,[LSL USL]);
xlabel('Value')
ylabel('probability')
grid on
```

![img](/assets/img/MATLAB_Quality/1_8.jpg)

### <span style="color:darkblue">2.4. normspec</span>

이는 해당 함수를 이용해서도 확인가능합니다.

```matlab
figure
normspec([LSL USL], mu, sigma)
figure
p = normspec([LSL USL],mu,sigma,'outside')
```

![img](/assets/img/MATLAB_Quality/1_9.jpg)

![img](/assets/img/MATLAB_Quality/1_10.jpg)

### <span style="color:darkblue">2.5. result</span>

결과를 구해보니 아래와 같이 나왔습니다. Cp가 0.8인 것으로 보아 공정능력이 부족함으로 판단되네요. 개선이 필요해보입니다.

```matlab
m = height(ProcTable)
mu = mean(data)
sigma = std(data)
Var = var(data)
Minval = min(data)
Maxval = max(data)
Medval = median(data)

S = capability(data,[LSL USL])
figure
capaplot(data,[LSL USL]);
xlabel('Value')
ylabel('probability')
grid on
```

![img](/assets/img/MATLAB_Quality/1_11.jpg)

![img](/assets/img/MATLAB_Quality/1_12.jpg)

### <span style="color:darkblue">2.6. MATLAB code 전문</span>

```matlab
clc, clear
Target = 100;
USL = 130;
LSL = 70;

ProcTable = readtable("D:\data.xlsx");
data = ProcTable{:, "Data"};

figure
probplot(data);

figure
nbins = 17;
histfit(data)
title('Histogram with Normal Curve')
xlabel('Value')
ylabel('Frequency')

m = height(ProcTable)
mu = mean(data)
sigma = std(data)
Var = var(data)
Minval = min(data)
Maxval = max(data)
Medval = median(data)

S = capability(data,[LSL USL])
figure
capaplot(data,[LSL USL]);
xlabel('Value')
ylabel('probability')
grid on

figure
normspec([LSL USL], mu, sigma)
figure
p = normspec([LSL USL],mu,sigma,'outside')

%Validation
Cp = (USL - LSL) / (6*sigma)
Cpk = min((USL-mu) / (3*sigma), (mu-LSL) / (3*sigma))
Cpm = (USL - LSL) / (6*(sqrt(sigma^2 + (mu-m)^2)))
k = abs(m - mu) / ((USL-LSL) / 2)
```


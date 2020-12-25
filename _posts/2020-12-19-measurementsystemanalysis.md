---
title: Measurement System Analysis, 측정시스템분석
author: Simon Anderson
date: 2020-12-19 23:28:00 +0800
categories: [MATLAB, Quality]
tags: [MATLAB,Visualization, QualityManagement, Improvement, Statistics, Quality]
image: /assets/img/MATLAB_Quality/5_Preview.png
math: true
---

## <span style="color:darkblue">1. Measurement System Analysis</span>

 5번째 포스팅은 `측정시스템분석(MSA, Measurement System Analysis)` 입니다. `MSA` 의 철학은 **현장의 내용을 수치적으로 표현할 수 없다면**, 실제로 제대로 알고 있는 것이 아니며, 제대로 알고 있지 않으니 똑바로 관리할 수 없다. 관리를 못하면 **우리 제품은 운에 의해 결정된다.** 를 얘기합니다. 측정은 정확한 의사결정의 기초자료가 됩니다.

### <span style="color:darkblue">1.1. Total = Product + Measurement System</span>

![측정값은참과측정오차](/assets/img/MATLAB_Quality/5_1.png)

**우리가 알고있는 제품 값을 측정장비는 모를 수 있다. **

 측정값은 참값 + 측정오차로 얘기할 수 있습니다. `측정값(Total value)` 는 우리가 사전 알고있는 품질특성값인 `참값(Product value)` 과 측정장비가 가지고 있는 장비오차인 `측정오차(Measurement error or system) ` 의 합이 우리가 아는 측정값`(Total value)` 가 됩니다. 예를 들어서 우리 집에있는 `220VAC`를 측정해봅시다. 그럼 매우 정확하게 `220.000000VAC` 가 나오지 않습니다. 절대로요. 그럼 그 오차는 `전력공급 차원`에서 생긴 오차일까요? 맞습니다. 그러나 순전히 그 이유 하나일까요? `MSA` 에서는 이유를 여러 개 정의합니다. `환경`, `측정장비`, `방법`, `측정인력`, `시료` 로서요. 요약하면 **측정값의 오류는 측정시스템 전체에 원인**이 있다고 합니다.

![fish-born](/assets/img/MATLAB_Quality/5_2.png)

### <span style="color:darkblue">1.2. Evaluation Measurement System</span>

 먼저 `계량형`은 수치로서 측정가능한 데이터를 의미하구요. `계수형` 은 얼룩, 스크래치 등 수치로 나타내기 어려운 데이터를 의미합니다.두 가지를 `중심, 산포, 시간` 별로 **잠재적 변동요인**을 평가합니다. 

 또한 `Accuracy(정확도)` 와 `Precision(정밀도)` 평가는 아래의 수식과 그림에 기반합니다.결론적으로 분포를 통해 두 점을 직관적으로 이해할 수 있습니다. 

![분산](/assets/img/MATLAB_Quality/5_4.png)


$$
\begin{array}{l}
\mu = 평균, \sigma^2 = 분산 \\
\mu_\text{total} \ =\ \mu_\text{product}\ +\ \mu_\text{measurement system} \implies Accuracy \\
\sigma^2_\text{total}\ =\ \sigma^2_\text{product}\ +\ \sigma^2_\text{measurement system} \implies Precision \\
\therefore \ \text{Error} = Accuracy\  +\  Precision
\end{array}
$$


![BiasGageRnR](/assets/img/MATLAB_Quality/5_5.png)

### <span style="color:darkblue">1.3. MSA Overview</span>

![MSAOverView](/assets/img/MATLAB_Quality/5_6.png)

 `MSA` 의 `A는 Analysis` 입니다. 그래서 여기서는 주로 `Gage R&R` 을 얘기합니다. 얘기하기 전에 어떤 요소들을 `MSA` 에서 다루는 지 나열하겠습니다.

#### <span style="color:darkblue">1.3.1. 차별력(Resolution)</span>

![차별력](/assets/img/MATLAB_Quality/5_7.png)

측정의 최소단위는 프로세스 산포의 범위 혹은 규격 폭을 기준으로 세밀한 측정이 가능해야 합니다. 제품이 10.0mm에 양측 5mm 오차면, 0.1~0.001mm의 측정단위를 가지고 있어야 합니다.

#### <span style="color:darkblue">1.3.2. 정확도(Accuracy)</span>

![정확도](/assets/img/MATLAB_Quality/5_8.png)

정확도는 측정의 관찰 평균과 실제 평균간의 거리입니다. 이러한 정확도 설정은 표준 검교정 장비를 사용하거나 교정용 악세서리로 장비를 설정합니다.

#### <span style="color:darkblue">1.3.3. 직선성(Linearity)</span>

![직선성](/assets/img/MATLAB_Quality/5_9.png)

측정가능범위 전체에 걸친 치우침을 얘기합니다. 체중계에다 실제 1, 10, 30, 40kg을 가져다 놓고 재봤을 때 측정값이 1, 11, 33, 48kg으로 나온다면 치우침이 존재한다고 볼 수 있죠.

#### <span style="color:darkblue">1.3.4. 안정성(Stability)</span>

![안정성](/assets/img/MATLAB_Quality/5_10.png)

안정성은 동일한 제품을 두고 다른 시점, 시간에 동일한 계측장비로 측정했을 때 나오는 평균값 차이를 얘기합니다.  

#### <span style="color:darkblue">1.3.5. 반복성(Repeatability)</span>

![반복성](/assets/img/MATLAB_Quality/5_11.png)

**동일한 작업자가** 동일한 부품, 동일한 계측기로 반복 측정하여 얻는 측정값의 산포입니다. 이때는 **첨도(Kurtosis)가 중요하죠**

#### <span style="color:darkblue">1.3.6. 재현성(Reproducibility)</span>

![재현성](/assets/img/MATLAB_Quality/5_12.png)

**서로 다른 작업자가** 동일한 부품, 동일한 계측기로 반복 측정하여 얻는 측정값의 산포입니다. **산포의 밀집이 중요하죠.**

### <span style="color:darkblue">1.4. Evaluation Table</span>

측정시스템 평가기준은 아래 테이블을 위주로 사용합니다. 시험삼아 할만한 제품이 따로 없으신 비제조, 대학생분들은 집에 있는 체중계를 이용하셔도 됩니다.

| 구분   |      | 판단지표            | 판단(우수) | 판단(고려) | 판단(부족) |
| ------ | ---- | ------------------- | ---------- | ---------- | ---------- |
| 계량형 | 중심 | Bias<br />Linearity | 5% 미만    | 5~10%      | 10% 초과   |
|        | 산포 | R&R                 | 10% 미만   | 10~30%     | 30% 초과   |
| 계수형 | 중심 | Effective           | 90% 초과   | 70~90%     | 70% 미만   |
|        | 산포 | Efficiency          | 90% 초과   | 70~90%     | 70% 미만   |

### <span style="color:darkblue">1.5. Evaluation Guideline</span>

 측정시스템 평가시 어떤 부분을 중점적으로 체크할 지 가이드라인이 제공됩니다.

#### <span style="color:darkblue">1.5.1. CheckList</span>

---

**사전 확인사항**

- 시스템 선정시 올바른 측정시스템으로 할 것
- 중요 입력변수 및 출력변수에 관계하여 선정된 측정시스템으로 할 것
- 측정시스템으로부터 어떤 통계적 특성이 만족하는 지 점검할 것
- 데이터 사용처와 용도를 정의할 것
- 측정항목에 대한 검교정 내용을 준비할 것

**사후 확인사항**

- 샘플 취득의 근거는 객관타당할 것
- 규격과의 비교결과를 비교할 것
- 측정시 실수 및 오류가 없었는 지 파악할 것

---

그리고 **평가절차 결정시에 필요한 체크리스트**입니다.

---

- 표준과의 추적성 확보
- 블라인드 측정 (규칙성을 가지면 안됨)
- 평가 비용과 시간
- 정의된 용어의 통일
- 다른 측정시스템과 비교

---

마지막으로 **측정 시스템 평가 체크리스트**입니다.

---

- 측정시스템 관리계획 수립여부
- 검사 및 측정절차가 문서화 여부
- 상세 프로세스 맵 여부
- 구체적인 측정시스템과 셋업 명시 여부
- 훈련, 인증받은 작업자의 측정 여부
- 측정기 검교정 주기준수 여부
- 필요시 공급자 혹은 고객과의 연계 여부
- 오차, 분포, 경향에 대한 시각화 여부
- 결과 파일 공유 시스템 여부
- 책임자, 측정자, 관리자 명시 여부
- 동일한 시스템간 비교 측정 데이터 여부

---



#### <span style="color:darkblue">1.5.2. Documentation</span>

![곰돌이문서화](/assets/img/MATLAB_Quality/5_13.png)

측정시스템은 결국 문서화가 `꽃`입니다

## <span style="color:darkblue">2. Continuous Gage R&R</span>

문서화말고도 다른 꽃이 있죠. `Gage R&R` 입니다. 이를 배경부터 설명하자면, `ANOVA` 분석을 주로 얘기합니다만, 굳이 그럴 필요 없습니다. 또한 다음 포스팅 내용이 `ANOVA` 이기도 하니까요. 먼저 `Gage R&R` 은 반복성과 재현성을 중심적으로 따져보는 분석 기술 입니다. 간략한 주제로는 측정 시스템이 공정 변동값에 얼마나 영향을 주는 지 따져보는 것이 목적입니다.

### <span style="color:darkblue">2.1. General</span>

![일반사항](/assets/img/MATLAB_Quality/5_15.png)

보통 `Gage R&R` 은 `2~3명의 작업자` 와 `10개 정도의 샘플` 을 측정하고 `2~3` 회 반복 측정을 합니다.

![주의사항](/assets/img/MATLAB_Quality/5_16.png)

그러나 주의할 게 있죠. 먼저 샘플을 적당히 잘 선정해야되구요. 평소 하던 작업자로 하면서 작업자가 자신이 측정하는 샘플이 뭔지 전혀 몰라야 합니다.

### <span style="color:darkblue">2.2.Process</span>

![절차](/assets/img/MATLAB_Quality/5_17.png)

절차는 사전 파악, 계획, 샘플 선정, 평가 테이블, 순서결정, 실시, 기록, 결과 판정 순으로 진행합니다.

### <span style="color:darkblue">2.3. Eval table</span>

|      | Thomson 1st | Thomson 2nd | Thomson 3rd | Rutherford 1st | Rutherford 2nd | Rutherford 3rd | Bohr 1st | Bohr 2nd | Bohr 3rd |
| ---- | ----------- | ----------- | ----------- | -------------- | -------------- | -------------- | -------- | -------- | -------- |
| 1    | 6           | 8           | 9           | 8              | 6              | 7              | 7        | 8        | 10       |
| 2    | 13          | 7           | 9           | 13             | 13             | 16             | 16       | 17       | 21       |
| 3    | 19          | 8           | 8           | 21             | 25             | 24             | 28       | 35       | 39       |
| 4    | 12          | 10          | 8           | 17             | 15             | 18             | 14       | 12       | 23       |
| 5    | 24          | 29          | 33          | 26             | 23             | 31             | 29       | 31       | 35       |
| 6    | 27          | 31          | 25          | 26             | 32             | 25             | 33       | 34       | 25       |
| 7    | 30          | 20          | 25          | 35             | 40             | 32             | 29       | 28       | 40       |
| 8    | 10          | 17          | 20          | 15             | 17             | 18             | 22       | 17       | 15       |
| 9    | 9           | 15          | 12          | 17             | 14             | 16             | 21       | 18       | 19       |
| 10   | 20          | 14          | 26          | 25             | 22             | 23             | 18       | 21       | 23       |

아무래도 `평가테이블` 중요하죠. 사실 여기서 중요한 것은 작업자가 무슨 샘플을 측정하는 지 모르기 위해서 순서를 랜덤으로 구성됐는지 이 테이블을 통해 확인할 수 있습니다. 

### <span style="color:darkblue">2.4. Analysis</span>


$$
\begin{array}{l}
X_{ijk} = u+p_i+o_j+(po)_{ij}+\epsilon_{ijk}\\
p_i=\text{부품의 효과}\\
o_j=\text{측정자 효과}\\
(po)_{ij}=\text{부품과 측정자 교호작용}\\
\epsilon_{ijk}=\text{error}\\
\text{재현성}=\text{측정가효과}\\
\text{반복성}=\text{error의 효과}\\
\end{array}
$$


분석은 위와같이 정의되며 임의로 만든 데이터를 이용하여 `MATLAB`으로 실습하겠습니다.

## <span style="color:darkblue">3. MATLAB</span>

`MATLAB` 도움말에 따르면 `number of distinct categories (NDC) and the percentage of Gage R&R of total variations (PRR).` 로서 `GageRnR` 분석을 하고 있습니다. `NDC와 PRR` 의 기준은 아래 표와 같으며, 시각화까지 제공된다고 하니 연습해볼까요?

**NDC를 이용한 측정시스템 분석의 경우**:

---

- NDC가 5 이상이면, 측정시스템은 문제 없다.
- NDC가 2 이하면, 측정시스템에 문제가 있다.
- NDC가 2~5 범위에 들었다면 결정권자의 선택이 필요하다.

---

**PRR을 이용한 측정시스템 분석의 경우**:

---

- PRR이 10%보다 작다면 측정시스템은 문제 없다.
- PRR이 30%보다 크다면 측정시스템은 문제가 있다.
- PRR이 10~30% 범위에 들었다면 결정권자의 선택이 필요하다.

---

### <span style="color:darkblue">3.1. MATLAB Code</span>

![결과](/assets/img/MATLAB_Quality/5_20.png)

초기화를 먼저 해줍니다. 위 테이블처럼 10번씩 3명이 3번에 나눠서 측정할 것으로 스케줄을 짜겠습니다만, `Uniform` 분포를 따르는 랜덤이지만 한 측정에 10회를 넘길수도, 아닐수도 있습니다. 어쨌든 결론은 총 `측정데이터는 90개`를 얻네요.

```matlab
clc, clear
rng('shuffle')
NOO = 3; %Number of Operators
NOP = 3; %Number of Parts
NOD = 10; % Number of Data
DtLim = NOO * NOP * NOD;
```

3명의 Operator의 순서를 랜덤으로 설정하겠습니다.

```matlab
operator = ceil(NOO*rand(DtLim,1));   % operators
```

작업자마다 총 3번의 part로 나눠서, 측정을 했다고 가정하겠습니다.

```matlab
part = ceil(NOP*rand(DtLim,1));       % parts
```

마지막으로 랜덤 값(정규분포)이긴 하지만 측정한 데이터까지 만들겠습니다.

그리고 `gagerr`을 호출합니다.

```matlab
mu = 0;
sigma = 1;
y = mu + randn(DtLim,1) * sigma;     % measurements
gagerr(y,{part, operator},'randomoperator',true)
```

결과를 보면 `NDC` 는 0개에, PRR이 `30%` 넘었으니 시스템에 문제가 있다고 나오네요. 실제 데이터는 아니지만, 위 소스를 통해 실제 데이터에서도 바로 반영이 가능하니 여기서 글을 마치겠습니다.

![분석결과](/assets/img/MATLAB_Quality/5_19.png)

![시각화](/assets/img/MATLAB_Quality/5_20.png)
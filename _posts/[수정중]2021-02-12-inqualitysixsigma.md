---
title: 6 Sigma, 식스 시그마 2편
author: Simon Anderson
date: 2021-02-12 09:07:00 +0800
categories: [MATLAB, Quality]
tags: [MATLAB,Visualization, QualityManagement, Improvement, Statistics, Quality]
image: /assets/img/MATLAB_Quality/7_Preview.png
math: true
---

## <span style="color:darkblue">0. Six sigma 2</span>

 7번째 포스팅은 `식스시그마(6 Sigma, Six sigma) 두번째 이야기` 입니다. [식스시그마1](https://simonwithwoogi.github.io/SimonWithWoogi.github.io/posts/prequalitysixsigma/) 에서는 `Hidden factory` 에 관련된 `COPQ(Cost of Pool Quality)` 를 얘기로 끝냈습니다. 두번째 이야기는 이 `COPQ` 에 대해서 좀 더 디테일하게 설명한 다음, 식스시그마 흐름에 대해서 얘기하겠습니다.

## <span style="color:darkblue">1. COPQ</span>

### <span style="color:darkblue">1.1. Problems that are related to COPQ</span>

---

> **Manufacturing**

- 수율 저하
- 비효율적인 프로세스
- 유지보수 비용 증가
- 설비가동율 저하
- 사이클 타임 증가
- 빈번한 라인 교체

> **Business**

- 클레임 증가
- 품질 코스트 증가
- 재작업 비용 증가
- 경영 프로세스 문제

> **Logistic**

- 운송 비용 증가
- 폐기 비용 증가
- 재고 증가
- 악성 재고 증가
- 재공품 증가
- 납기 지연

---

 위 문제들은 `COQP` 로 해결할 수 있는 대표적인 문제들입니다. 각 담당부서 유관자들이 본다면, 항상 골치 아픈 문제들이라 반가울 수도 있고 개인의 악몽이 다시 생각날 수 있습니다. 그렇다면 `COPQ` 는 제조업 기반의 회사에게 **마법의 영약**처럼 들릴텐데요. 흐름을 이해하여 **마법의 영약**처럼 쓰셨으면 좋겠습니다. 

### <span style="color:darkblue">1.2. COPQ and Q-Cost</span>

![비용형제](/assets/img/MATLAB_Quality/7_1.png)

 `비용형제` , `저품질비용(COPQ) 와 품질비용(Q-Cost)` 입니다. 위 이미지에서 보시는 것처럼 `Q-Cost` 는 `예방비용(Prevention Costs)` 이 추가로 붙어 있습니다. 그 전에 `COPQ` 는 `평가/검사(Appraisal/Inspection), 내부/외부 실패(Internal/External Failure) 비용` 을 포함하고 있습니다. `Sigma` 에 따라서 이 `COPQ` 의 규모는 달라집니다.

### <span style="color:darkblue">1.3. COPQ volume</span>

| 시그마 수준 | DPMO  | Visible | Invisible | 계       |
| ----------- | ----- | ------- | --------- | -------- |
| 6 Sigma     | 3.4   | 3% 미만 | 7% 미만   | 10% 미만 |
| 5 Sigma     | 233   | 3~4%    | 7~11%     | 10~15%   |
| 4 Sigma     | 6210  | 4~5%    | 11~15%    | 15~20%   |
| 3 Sigma     | 66807 | 5~8%    | 15~22%    | 20~30%   |

![4시그마](/assets/img/MATLAB_Quality/7_2.png)

 계산을 한번 해볼까요? 회사 수준이 4 시그마고 매출액이 대략 100억이라고 한다면 `COPQ`는 위 그림처럼 볼 수 있습니다.

### <span style="color:darkblue">1.4. Importance of COPQ</span>

 ![왕좌의 COPQ](/assets/img/MATLAB_Quality/7_3.png) 

 근데, 이 `COPQ` 가 어디 툭 하고 떨어지는 돈 치고는 제법 많습니다. 한 문제, 한 곳에서 나오지 않습니다 왜냐하면, `평가/검사(Appraisal/Inspection), 내부/외부 실패(Internal/External Failure) 비용` 이 다 들어가있는 만큼, 여러 분야의 낭비들을 긁어다가 총 집합합니다. 반대로 생각하면 `COPQ` 를 줄였을 때, 전사적으로 비용절감이 가능하다고 볼 수 있습니다.

 그래서 `COPQ` 는 `품질비용(Q-Cost)` 에 대한 식별 및 계량화를 가능하게 해주고 그러면서 `Hidden factory` 의 발굴 및 노출이 됩니다. 그리고 전사적으로 비용절감이 가능하기에 이윤 증대가 큽니다. 동일 매출에 큰 이익이 생길 수 있죠. 또한 `COPQ` 를 분석하면서 개선 우선순위를 정할 수 있고 흐름과 진도를 알 수 있습니다. 또한 전반적인 품질개선 방법들 공통점이 하나하나 해쳐나가며 동기부여와 성취감이 생깁니다.

### <span style="color:darkblue">1.5. Limitation of COPQ</span>

 ![실패4요소](/assets/img/MATLAB_Quality/7_3.png) 

 그렇다면 모든 다 줄여서 기업 잘 나가게 해줄 수 있을까요? 물론 한계가 존재합니다. 첫 번째로 `COPQ` 를 측정했다고 해서 바로 비용 해결과 직결되지 않습니다. 그의 연장선으로  `COPQ reports` 어떤 부서의 어떤 부분을 해결하라고 알려주지 않습니다. 왜냐하면 `COPQ` 자체가 전사적인 개념을 가지고 있기 때문이죠. `COPQ` 는 또한 중/장기에 적합하기에 단기적으로는 경영상태 개선이 이뤄지지 않습니다. 이건 좀 아쉬운 얘긴데요. 전체적으로 `COPQ` 측정은 품질전문가들이 계획을 세우고 실행할 때는 결국 사람이 발품팔아가며 하다보니 인수인계 덜 된 아래직원을 떠나 잘 아는 사람이 하더라도 측정이 부정확하고 중요 비용이 누락되는 경우가 있습니다.  

## <span style="color:darkblue">2. Six Sigma</span>

 다시 `Six sigma` 로 돌아오겠습니다. `COPQ` 만 보아도 `6 Sigma` 는 `측정, 정량화, 계수화` 를 떠오르게 합니다. 그래서 객관적이고 과학적이며 논리적으로 해결 할 수 있습니다.

### <span style="color:darkblue">2.1. Scientific feature</span>

![문제통계실제](/assets/img/MATLAB_Quality/7_4.png) 

 과학적인 특징으로는 `실제문제` 를 보고 이를 `통계적 함수` 로서 변환합니다. `최적화` 나 여러 `최소비용 알고리즘` 을 적용하고 `해법`을 찾아냅니다. 그 다음 이 결과를 가지고 `실제해법` 으로 변환하여 현장에 적용하는 절차를 밟습니다.

### <span style="color:darkblue">2.2. Systematic feature</span>

![구조적절차](/assets/img/MATLAB_Quality/7_5.png)

 전사적으로 적용가능하다보니 위 구조적 흐름처럼 그리고 기존에 포스팅한 방법들을 아우르고 있습니다.

### <span style="color:darkblue">2.3. Organization</span>

![조직도](/assets/img/MATLAB_Quality/7_6.png)

 상시적으로 활동하는 회사를 제외하고서 이벤트성으로  `6 Sigma` 활동할 때는 `TF(Task Forece)` 혹은 그에 준하는 조직이 형성됩니다. 이 때 위 조직체계를 따릅니다. `Champion` 은 방향을 잡아줍니다. 상세하게는 프로젝트를 선정하고 프로젝트 일정관리를 맡고 있습니다. `MBB(or Master)` 는 하위 `Black belt` 실무내용에 대해 기술고문 역할을 합니다. 코칭, 교육 등을 진행합니다. `BB(Black belt)` 는 프로젝트 리더로 결정과 개선을 담당하는 실무자입니다. 그리고 그 밑의 지원해주는 `GB(Green belt)` 가 있습니다. `GB` 또한 실무자입니다.

### <span style="color:darkblue">2.4. Innovation Cycle</span>

 ![사이클](/assets/img/MATLAB_Quality/7_7.png)

둥둥

### <span style="color:darkblue">2.5. Success factors</span>



## <span style="color:darkblue">3. DMAIC</span>

![5S짤](/assets/img/MATLAB_Quality/7_8.png)

 `DMAIC(Define Measure Analyze Improve Control)` 은 프로젝트를 선정는 `Define` 에서 현 수준 파악 및 잠재적 요소를 돌출하는 `Measure` 단계, 데이터 수집 및 분석하는 `Analyze` 그리고 분석결과로 부터의 DOE, 개선계획 및 활동 `Improve` 보고서 작성 후 사후처리를 하는 `Control` 까지의 일련의 과정을 한번에 묶어서 얘기합니다.

### <span style="color:darkblue">3.1. Define</span>

 정의 얘기

### <span style="color:darkblue">3.2. Measure</span>

### <span style="color:darkblue">3.3. Analze</span>

### <span style="color:darkblue">3.4. Improve</span>

### <span style="color:darkblue">3.5. Control</span>

### 
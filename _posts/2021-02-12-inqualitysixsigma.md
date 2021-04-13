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

`과제 선정` 의 주요 핵심은 지금 우리에게 가장 필요한 과제는 무엇인지를 얘기해야 합니다. 그게 바로 이어져서 가장 필요한 그 과제를 어느정도 수준까지 끌어올려야 하는 지가 `과제 실행` 이 됩니다. 목표한 수준까지 끌어올렸다면, 이를 계속 유지하거나 개선해 나가기 위하여 `평가` 를 합니다. 완료된 평가 속에서 이 후에 진행해야되는 사후 과업을 정리합니다.

 그리고 서로 물려있는 관계 속에서는 흐름 보다는 주고 받으며 빈번한 조정이 이뤄집니다. 또한 모든 과정 속에서는 미래가치는 어떠한지, 올바른 전략은 무엇인지가 계속 도마위에 올라 평가됩니다.

### <span style="color:darkblue">2.5. Success factors</span>

 이러한 `6-Sigma` 의 성공 요소에는 경영진에서의 확신과 의지, 계획에 대한 준비, 인센티브가 있고 실무진에서는 적극적인 참여, 홍보, 경영진과의 공감 그리고 컨설팅 사전관리와 병행하는 연구활동이 있습니다.

## <span style="color:darkblue">3. DMAIC</span>

![5S짤](/assets/img/MATLAB_Quality/7_8.png)

 `DMAIC(Define Measure Analyze Improve Control)` 은 프로젝트를 선정는 `Define` 에서 현 수준 파악 및 잠재적 요소를 돌출하는 `Measure` 단계, 데이터 수집 및 분석하는 `Analyze` 그리고 분석결과로 부터의 DOE, 개선계획 및 활동 `Improve` 보고서 작성 후 사후처리를 하는 `Control` 까지의 일련의 과정을 한번에 묶어서 얘기합니다.

### <span style="color:darkblue">3.1. Define</span>

```
문제의 파악 및 정의
while 팀평가 수치 < 합격수준
	팀 구성
	Logic tree 작성
	Project 범위, 목표 설정
	팀평가 수치 갱신
end
Kick-off 실시
```

 `Quality, Productivity, Problem-Solving` 차원에서 비용 효과를 고려하여 테마를 선정하고 그에 따른 기술 수준으로 조직을 꾸립니다. 정의된 문제에 대해서 `Logic tree` 를 작성하고 기술적 자료에 대해 충분한 검토를 나눕니다. 이후, `Project` 의 목표, 금액, 예상효과, 일정 등을 설정하고 문제에 대해 마지막 검토 후 액티비티를 결정합니다. 끝으로 `Kick-off` 를 시점으로 자원을 확보합니다.

### <span style="color:darkblue">3.2. Measure</span>

```
제품, 공정 데이터 분석
중요, 잠재 CTQ 정의
if 측정시스템 구축 > 합격수준
	중요, 잠재 CTQ spreadsheet 작성
else
	측정 능력 분석 및 개선
```

 데이터 수집, 분석을 통해 정보화를 실시하는 단계입니다. 여기서 `파레토 분석, 특성요인도 분석, 브레인 스토밍` 등을 진행하고 `CTQ` 를 선정합니다. 선정된 `CTQ` 가 타당한지 평가하고 측정 시스템에 대한 분석을 진행하며 `Gage RnR, ANOVA, Graph` 방법론을 사용합니다. 마지막으로 `spreadsheet, Cp/Cpk, Z-Value, Z-Shift, PPM` 등을 통하여 개선 우선순위를 파악할 수 있습니다.

### <span style="color:darkblue">3.3. Analze</span>

```
while 신뢰도 < 합격수준
	이상 원인 제거
	데이터 수집 및 분석
	신뢰도 갱신
end
실험 인자 후보 선정
if Cp < 2.0 || Cpk < 1.5
	특성표 작성
else
	5단계 관리
```

 개인적으로 제일 바쁜 단계라고 볼 수 있습니다. `이상 원인` 은 모집단에서 얻어진 샘플 데이터의 산포가 평소보다 다른 양상이 보이는 것을 말하는데요. 이를 알기까지 많은 데이터를 들여다 봐야합니다. 또한 발견부터 우연 원인만 존재하는 상태로 만들어 공정이 안정되게 해야합니다. 대체적으로 고질적인 문제들이 밝혀지기에 쉬운 일은 아닙니다.

 안정적으로 만들기 위해 선정된 인자들을 알기위해 `Graph, 상관관계 분석, 회귀 분석, 분산 분석, 가설검정` 등을 진행합니다. 그 이후 공정능력을 산출하여 목표 대비 공정 수준을 검토하고 직접적인 출력 특성을 예측합니다.

 이 단계에서는 `Cp, Cpk / Pp, Ppk / Z Value / Z shift / Normal probability` 를 알 수 있습니다.

### <span style="color:darkblue">3.4. Improve</span>

```
실험 목표 및 환경 설정
5수준 시험 콜
while 평가수치 < 합격수준
  2수준 실험
  실험 실시 및 데이터 수집 (다른 스레드에서 5수준 시험 정보 취득)
  데이터 분석 및 최적 조건 추정
  재현 및 검증시험
  평가수치 갱신
end
5수준실험 콜링
Pilot 시행
```

 `Analze` 가 제일 바쁜단계라면 몸이 피곤한 단계가 `Improve` 입니다. 많은 실험을 하게 됩니다. 그러므로 실험의 목적을 명확히 하고 환경을 구성하는 것을 첫번째로 인자의 수가 많은 경우 인자를 최소화하거나 조합을 하여 실험배열표를 결정합니다.

 얻어진 실험의 결과로 분석을 진행하고 최적 조건을 추정합니다. `주효과, 상호작용, 큐브 플롯` 을 이용하고 `Normal score plot, Effects analysis, Regression analysis, correlation analysis, ANOVA` 를 사용하기에 미리 알아두시는 게 좋습니다.

 추정한 최적 조건에서 재현 및 검증 실험을 실시합니다. 그러나 2수준 실험에서 만족스럽지 못할 수 있습니다. 그러므로 5수준 실험을 병렬로 적용하고 같이 결과를 검토하는 것이 좋습니다. 끝으로 얻은 최적 조건으로부터 장기 공정 능력을 확인하여 개선 여부를 최종 확인합니다.

### <span style="color:darkblue">3.5. Control</span>

```
출력 특성 및 Key 인자 선정
while 능력정도 < 합격수준
	관리 기법 및 Pilot 시행
	능력정도 갱신
end
전사 교육 및 Audit 계획 수립
특성 최적화 연구 문서화
Project 완료
```

 마지막 단계입니다. 최종 보고와 전파 교육으로 이 프로젝트의 끝을 알려주는데요. 그 전에 마무리 할 것이 있습니다.

 출력 특성 및 최적 조건으로 선정된 핵심 소수 인자를 확인하고 그에 맞는 `Control chart` 를 선정하고 `Pilot` 을 진행합니다. `5W-2H` 원칙에 준하여 관리 계획을 수립합니다. 개선전과 비교하여 관리 상태 여부를 확인하기에 여러 시각화 쪽으로 알고 있다면, 보다 더 효과적으로 진행 할 수 있습니다.

 이제 관리자를 지정하고, 관리상태에 벗어나는 경우 조치방법을 정합니다. `Audit` 계획을 수립하여 실시하고 진행한 로그와 데이터에 대해서 문서화를 진행합니다. 끝으로 최종보고, 전파교육을 진행하고 프로젝트 종료합니다.
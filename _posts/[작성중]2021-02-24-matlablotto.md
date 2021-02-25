---
title: MATLAB, LSTM과 통계를 이용하여 Lotto 당첨번호 예측해보자!
author: Simon Anderson
date: 2021-02-24 18:55:00 +0800
categories: [MATLAB, Applied]
tags: [MATLAB, Algorithm, AI, DeepLearning, Statistics]
image: /assets/img/MATLAB/11_Preview.png
math: true
---

## <span style="color:darkblue">1. Introduce</span>

**이번 포스팅은 재미로 구축했으니, 너무 많은 돈을 쓰지마세요. 로또는 도박입니다.**

 저는 돈에 큰 관심이 없습니다. 어렸을 때 가정형편이 매우 어려웠으나, 모든 가족이 다같이 노력했고 상황이 많이 나아졌습니다. 이 과정속에 돈보다는 인류애적 가치를 더 중요하게 생각하는 사람이 됐습니다. 그래도 로또 5000원은 일주일을 두근거리게 하죠.

![집게사장과로또](/assets/img/MATLAB/11_1.png)

### <span style="color:darkblue">1.1. Lotto in Korea</span>

![로또 마크](/assets/img/MATLAB/11_2.png)

 로또는 `1-45` 사이에서 `중복없이 6개` 의 숫자를 선택합니다. 끝으로 보너스 숫자인 하나를 더 추출합니다. 그렇게 보너스 숫자 포함한 총 `7` 개의 숫자맞추기 놀이 입니다. `1000원` 당 하나의 티켓을 살 수 있구요. `5000원` 으로 한 세트를 살 수 있습니다. 여담으로 저는 로또에 대해서 잘 모릅니다. 이번에 이 코드를 구현하면서 로또룰을 알게 됐고 **앞으로 진행하는 내용은 데이터를 기반으로한 로또 당첨번호 에측입니다.**

### <span style="color:darkblue">1.2. Winning lottery numbers</span>

![당첨번호들](/assets/img/MATLAB/11_3.png)

 저는 두 가지를 적용할 예정입니다. 첫 번째는 `번호별 통계` 를 가져와, 가장 많이 나온 번호 15개중에서 3개, 가장 적게 나온 번호 15개중에서 2개, 중간 번호 15개중에서 1개씩 추출하여 총 6개의 번호를 만들 것이고 두 번째는 `LSTM` 을 이용하여 총 45개의 번호들이 추출되는 주기를 뽑아 회차마다 번호를 구할 수 있습니다. 끝으로 이 두가지 구조를 조합해서, `LSTM` 으로 구한 번호들중에서 발생빈도에 따라 가중치를 적용하겠습니다.

## <span style="color:darkblue">2. Binomial time series LSTM</span>

![플로우](/assets/img/MATLAB/11_4.png)

 해당 내용은 `RNN` 과`LSTM` 에 대한 기본적인 이론과 `시계열 분석` 에 대한 `LSTM`  그리고 `이진 시계열 LSTM` 을 순서대로 설명한 다음, `MATLAB` 구현 코드로 넘어가겠습니다.

### <span style="color:darkblue">2.1. Recurrent Nerual Network</span>

![RNN](/assets/img/MATLAB/11_5.png)

 `RNN` 이란 `되풀이(Recurrent)` 되는 성질을 이용하여, 앞 전에 있는 데이터객체를 일련의 과정에 있다고 받아들이는 모델인데요. 일련의 과정을 설명할 수 있는 `문장, 동영상` 이나 `수요예측` 에 쓸 수 있습니다. `RNN` 은 `CNN` 과 다르게 입력, 출력을 자유롭게 구조를 쓸 수 있습니다. 이는 `LSTM` 에도 이어집니다.

![RNN여러구조](/assets/img/MATLAB/11_6.png)

### <span style="color:darkblue">2.2. Long Short-Term Memory</span>

  `LSTM` 은 `RNN(Recurrent Neural Network)` 에서 파생된 모델입니다.

### <span style="color:darkblue">2.3. Time series LSTM</span>

라마바

### <span style="color:darkblue">2.4. Binomial time series LSTM</span>

사아자

## <span style="color:darkblue">3. Implement</span>



### <span style="color:darkblue">2.1. LSTM</span>

### <span style="color:darkblue">2.1. LSTM</span>


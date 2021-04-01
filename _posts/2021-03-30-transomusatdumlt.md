---
title: 논문해석, 머신러닝 기술을 활용한 US Airline twitter data 오피니언 마이닝
author: Simon Anderson
date: 2021-03-30 19:00:00 +0800
categories: [Language, Engineering]
tags: [BigData, Data Mining, AI, MachineLearning, Statistics, writing]
image: /assets/img/CI/IEEE.png
math: true
---



 **해당 포스팅은 Saad, Abdelrahman I 저자의 "Opinion Mining on US Airline Twitter Data Using Machine Learning Techniques"라는 논문을 해석한 글이며, 해당 논문은 IEEE(ICENCO) Vol. 20, pp. 59-63, Dec 2020에 올라와 있습니다.**

해당 논문의 Subject Terms는 아래와 같습니다.

`Bioengineering` , `Communication, Networking and Broadcast Technologies`, `Computing and Processing`, `Geoscience`, `Power, Energy and industry Applications`, `Robotics and Control Systems`, `Signal Processing and Analysis`, `Transportation`, `Support vector machines`, `Sentiment analysis`, `Social networking(online)`, `Atmospheric modeling`, `Blogs`, `Feature extraction`, `Testing`, `Text Sentiment Analysis`, `Opinion Mining`, `Tweets`, `Bag of Words`, `Classification`



후기 : 학술적으로 잘 알려주지도 않았다. 학사 2학년 3주차 교양수업 수준, 시각화는 부족하고 오히려 국내 논문중에 '트위터'를 이용한 감성분석 사례에서 더 좋은 결과를 가져다주는 것들이 제법 있다. 그래도 상식을 늘려주는 논문이기에 별 2.5개 !



## <span style="color:darkblue">Abstract</span>

 *항공분야는 시장에서 중요한 부분에 속합니다. 이 핵심분야를 계속 영위하기 위해서는 오피니언 마이닝을 고려해야 합니다. 문자를 통한 감성분석은 자연어처리 기술입니다. 이번 연구에서는, 문자를 통한 분석중 하나인 오피니언 마이닝을 이용하여 항공 서비스에 대한 고객들의 반응을 조사할 예정입니다. Twitter는 오피니언 마이닝 소스중에서 가장 큰 축에 속합니다. 거대한 트윗(이용자들의 글) 데이터를 이용하여 어떤 결정을 할지 분석하고 서비스 품질을 높입니다. 이번 연구에서는, 트윗데이터를 긍정, 부정, 중립으로 명목화하는 머신러닝 모델을 제안합니다. 우리는 6개의 다른 US 항공사의 트윗데이터 셋을 이용하여 구현했습니다. 전처리로는 트윗 데이터를 정리하고 특징 벡터를 표현하기위해 특징 추출을 진행했습니다. 끝으로 `Bag of Words(BOW)` 모델을 제작했으며 분류 수준에서는 6개의 머신러닝 모델(SVM, LR, RF, XGB, NB, DT)이 들어갔습니다. 7대 3비율로 섞어서 사용했고 `K-fold` 교차 검증 방식으로 검증했습니다. 이 중에서 `SVM` 이 제일 높은 성능을 보였고 정확도는 83.31%입니다.*

## <span style="color:darkblue">1. INTRODUCTION</span>

 감성분석은 정보를 수집한 다음 자동적으로 주관적인 내용들을 구분하는 것을 얘기합니다. 우리의 목표는 유저들의 진짜 의견을 긍정, 부정, 중립으로서 결정하는 것입니다. 이러한 감성분류에는 두가지 레벨이 존재하는데요. 문서 레벨과 문장 레벨이 있습니다. SNS(페이스북, 링크드인, 트위터)에서의 데이터분석은 유저 선호도와 다양한 응용이 가능한 강한 리소스가 됩니다. 1)

 다른 단어로는 감성분석을 오피니언 마이닝이라 부릅니다.  제품 혹은 서비스에 대한 유저 인식을 확실하게 알 수 있기 때문인데요. 요즘엔 유저들의 감정을 분류하는 것이 중요한 활동입니다. 추출된 정보는 무언갈 결정함에 있어서 중요한 기준으로 작용하는데요. 예를 들면 제품이나 서비스에 대한 피드백을 확인하는 것은 새로운 제품을 출시하거나 개선함에 있어서 어떤 결정을 내릴지 도와줄 수 있습니다. 더 나아가 그 정보는 회사에서 전략을 구성할 때 윤곽을 잡아주기도 합니다. 특히 새 고객을 끌어들이는 마케팅을 추진할 때에도 말이죠. 2) 감성분석은 크게 세가지 구조로 나눕니다. 사전 감성분석 접근, 머신 러닝기반의 감성분석 접근, 두 가지를 섞은 하이브리드 혹은 블렌딩 기술입니다. 먼저 사전은 일반적인 언어의 집합으로 이루어져있으며 이미 분류된 극성(긍정, 부정, 중립)에 대한 순위가 있습니다. 대부분의 유저들은 딱히 격식을 차리지 않고 트윗에 글을 쓰기 때문에 사전에 없는 단어가 있습니다. 3) 그래서 과학자들은 텍스트 안의 감정을 찾아내는 것에 대한 변형된 방법에 관심을 가지고 있습니다. 머신러닝 기반의 접근법은 텍스트 데이터셋을 학습시켜 다른 데이터 속에서 예측을 합니다. 텍스트 피쳐를 추출하고, 극성을 분류하는 과정을 모델 수립할 때 고려해야 합니다. 끝으로 하이브리드 모델은 위 두가지 방식을 합쳤습니다.

 이 문서에서는 Section2에서 감성분석 기술에 대해서 설명하고 Section 3에서는 설문조사에서의 감성분석을 얘기합니다. 그리고 Section 4에서 데이터 셋과 본 연구에서 사용한 방법론들을 얘기하며 Section 5는 연구결과에 대한 토의가 있습니다.  끝으로 Section 6는 결론입니다.



1) “The Problem of Sentiment Analysis,” Sentiment Analysis, pp. 18–54, Oct. 2020.

2) JE. Fersini, “Sentiment Analysis in Social Networks,” Sentiment Analysis in Social Networks, pp. 91–111, 2017.

3) W. Xiao, “Sentiment analysis in twitter.”

## <span style="color:darkblue">2. BACKGROUND</span>

 **감성분석(Sentiment Analysis)**

감성분석은 텍스트 속에서 극성을 구분하는 머신러닝 기법입니다. 텍스트는 문서에도, 문단에도, 문장에도 그리고 절마다 존재하죠. 감성분석은 여러 타입으로 존재합니다. 감정 감지, 미세 감성분석, 소비자 패턴분석, 의향 분석 등이죠. 먼저 감정 감지(Emotion detection)는 텍스트 속의 매 감정상태를 검사하여 유저가 슬픈지, 행복한지, 화가났는 지 알 수 있도록 합니다. 이는 보편적은 어떤 결정에도 도움이 되죠. 미세 감성분석(Fine grained sentiment analysis)는 여론에 휩쓸려 특정 후보자의 의견이 더 영향을 줄 수 있는 것을 감안합니다. ABOM(Aspect-Based Opinion Mining)은 제품의 특정 부분에 대한 유저들의 반응을 추출하는 좀 더 세밀한 분석기법입니다. 예를 들면 자동차 엔진을 개선하기위해서 사용하는 분석입니다. 마지막으로 의향분석(Intent analysis)는 텍스트에 숨겨진 이 사람의 의도를 찾는 것에 목적을 둔 분석입니다.

**사전 기반 감성분석(Lexicon-Based Sentiment Analysis)**

 사전(Lexicon)은 감성분석에서 가장 기본적인 형태입니다. 여기서 또 두개로 나뉠 수 있는데요. 사전(dictionary)기반과 말뭉치(corpus) 기반의 분석방법입니다.4) 사전(dictionary) 기반은 `WordNet` 이라는 감성사전이라고 불리는 것들이 제법 있습니다. 반대로 말뭉치는 사전 단어에 의존적이지 않고 머신러닝 기법을 이용하여 문서를 분석하고 정보를 취득합니다.

**머신러닝 기반 감성분석(Machine Learning-Based Sentiment Analysis)**

 머신러닝 알고리즘에는 SVM이나 결정트리 같은게 텍스트를 분류해줍니다. 그러한 알고리즘은 텍스트에 추출된 특징에 의존적인데요. 게다가 RNN, DNN, CNN 같은 딥러닝도 해당 분석에 포함됩니다.5, 6)

**혼합모델 감성분석(Hybrid-Based Sentiment Analysis)**

 사전기반과 머신러닝을 합친 이 기법은 데이터를 모델에 적용하기 전에 전처리 단계(cleansing)가 있습니다. 대부분의 모델들은 단어 임베딩 테크닉에 의존적입니다. 예를들면 `Word2Vec` 가 있죠.



4) R. Bhatia, P. Garg, and R. Johari, “Corpus Based Twitter Sentiment Analysis,” SSRN Electronic Journal, 2018..

5) S. K., “As An Analysis of Different Classification Technique Using Sentiment Analysis of Product Review,” Journal of Advanced Research in Dynamical and Control Systems, vol. 12, no. SP3, pp. 622–628, Feb. 2020.

6) N. C. Dang, M. N. Moreno-García, and F. De la Prieta, “Sentiment Analysis Based on Deep Learning: A Comparative Study,” Electronics, vol. 9, no. 3, p. 483, Mar. 2020.

## <span style="color:darkblue">3. LITERATURE SURVEY</span>

 2019년에는 `Furqan Rustam, et al.(외 여러명)`7) 은 트윗 데이터를 긍정, 부정, 중립으로 구분했습니다. 해당 연구에서는 그분들께서 US 항공사들 트윗들을 클래스별 예측하는 것을 시도했습니다.그들은 캐글(Kaggle)에서 "Twitter-Airline-Sentiment" 자료를 다운받아 사용했는데요. 그 데이터에는 6개의 항공사에 대한 14,640 개의 데이터가 있었습니다. 그들은 로지스틱 회귀를 이용한 다수결 분류(Voting Classifier)를 하였고 스톡캐스틱 경사하강법을 사용했습니다.(Stochastic Gradient Descent Classifier) 그들이 제안한 모델에는 전처리를 하고 말뭉치를 만든다음 세개의 피쳐들을 사용했습니다. `TF`, `TF-IDF` 그리고 `Word2Vec` 이죠. 이 피쳐들은 10개의 머신러닝 분류기에 이용됐으며 세 개의 피쳐들로부터 정확도를 각각 79.1%(TF), 79.2%(TF-IDF), 77.7%(Word2Vec)로 얻었습니다.

 2020년에는 `Chirag Kariya et al.` 8)은 명목화를 위해서 트윗데이터에서 감정을 추출했습니다. 그들은 KNN과 Naive Bayes를 이용했는데요. 그들은 트위터 API를 이용해서 트윗데이터셋을 만들었구요. 모델 아이디어는 단어 감도를 결정하는 것을 기반으로 했습니다. 예를 들면 긍정적인 단어가 많이 있으면 이것은 긍정적인 내용임을 판단하는 것이죠. KNN은 정확도 99.6456%를 달성했습니다.

 같은 2020년 `Antony Samuels et al.` 9)은 뉴스를 이용한 감성분석을 했습니다. BBS 뉴스를 데이터 셋으로하여 5개의 주제(경영, 스포츠, 정치 등)에 대한 총 2225 개의 문서들로 했습니다. 그들은 극성에 의존적인 감성분석이었는데요. `WordNet` 을 이용하여 감성 점수를 만들어서 판단했습니다. 그들은 5개의 주제(경영, 연예, 정치, 스포츠, 기술)에 대해서 결과를 비교했습니다. 결과적으로 대부분 긍정과 부정이었으며 중립은 드물었습니다.

 또 2020년 `Sudhanshu Kumar et al.` 10)은 관람객의 의견을 토대로 영화추천 시스템을 설계했습니다. 그들은 유저 의견을 이해하는 것과 영화관련 트윗에서의 유행을 이해하는 것이었습니다. 그들의 데이터셋은 "User-rated"라는 영화 데이터베이스였고 6209개의 영화에 대한 292863개의 레이팅(등급표)와 51081의 의견이었습니다. 그들은 영화의 메타데이터를 비교한 가중치를 사용했습니다. 이런 방법들로부터 유사성을 찾았습니다. 그들은 그들 모델에 대한 결과를 비교했고 하이브리드 모델은 감정 유사성과 메타데이터를 기반으로된 컨텐츠와 필터링이 섞여서 구성되어 있습니다. 평균적인 모델 정밀도는 상위 5개의 감정에 대해서는 2.54이며 상위 10개의 감정에 대해서는 4.97이 나왔습니다.



7) F. Rustam, I. Ashraf, A. Mehmood, S. Ullah, and G. Choi, “Tweets Classification on the Base of Sentiments for US Airline Companies,” Entropy, vol. 21, no. 11, p. 1078, Nov. 2019

8) C. Kariya and P. Khodke, “Twitter Sentiment Analysis,” 2020 International Conference for Emerging Technology (INCET), Jun. 2020.

9) Antony Samuels and John Mcgonical, “News Sentiment Analysis,” arXiv, 2020.

10) S.Kumar,K.De,andP.P.Roy,“MovieRecommendationSystemUsing Sentiment Analysis From Microblogging Data,” IEEE Transactions on Computational Social Systems, vol. 7, no. 4, pp. 915–923, Aug. 2020.

## <span style="color:darkblue">4. MATERIALS & METHODS</span>

**Datasets**

 우리는 "twitter-airline-sentiment" 데이터셋을 캐글에서 받았습니다 11). 이 데이터셋은 승객들의 의견을 트위터로 표현한 내용이며 US 6개의 항공사에 대해 14640 개의 데이터를 가지고 있습니다. **표 1**을 참고하면 되구요 긍정, 부정, 중립으로 데이터를 나눴습니다.



| %    | Overall Accuracy |
| ---- | ---------------- |
| SVM  | 83.31            |
| LR   | 81.81            |
| RF   | 78.55            |
| XGB  | 75.93            |
| NB   | 73               |
| DT   | 70.51            |

표1. 트윗데이터 요약

**Methods**

[1] Support Vector Machine (SVM) : SVM은 초평면에서 객체들을 분류하는 비선형, 선형 분류기입니다. 12)

[2] Logistic Regression (LR) : 로지스틱 함수를 따르며 0과 1사이의 시그모이드 커브를 가지고 있습니다. 

[3] Random Forest (RF) : 배깅트리를 여러가지 모아놓은 앙상블 메소드라 불립니다. RF 데이터셋안에서는 독립적인 결정트리들이 나뉘어 있습니다. 트리의 부분집합은 루트에서 말단노드 사이에서 선택되며 각 트리에서 특징들이 추출되어 최종 트리로서 표현됩니다. 13)

[4] XGboost (XGB) : 부스팅 경사 알고리즘을 기반으로 성능과 스피드에 맞춰서 구현됐습니다.14) 알고리즘은 세개의 메인 파라미터를 가지고 있습니다. 부스터, 러너, 제네럴인데요. 부스터는 회귀에서의 부스팅 동작에 작용되고 러너는 최적화에, 제네럴은 전반적인 알고리즘 함수에 작용하고 있습니다.

[5] Gaussian Naive Bayes (NB) : 나이브베이즈는 단일, 멀티 클래스 문제에 대해 가우시안 정규분포를 따르며 베이즈 정리를 기반으로 만들어졌습니다. 해당알고리즘의 메인 아이디어는 가설에 대한 확률들을 계산합니다. 나이브베이즈는 분류 파라미터를 찾기위한 데이터가 많이 필요하지 않기 때문에 학습와 예측에 효율적입니다.

[6] Decision tree (DT) : 결정트리는 내부 노드와 말단 노드의 구조로 구성되어 있습니다. 내부 노드는 조건의 역할을 하며 말단 노드는 클래스 구분의 역할을 합니다. 결정트리의 가장 큰 이점은 데이터의 폼에 상관없이 적용이 됩니다. 결정트리는 엔트로피와 인포메이션 게인이라는 두가지 통계적 특징은 있습니다. 엔트로피는 데이터의 분산을 보고 인포메이션 게인은 품질을 얘기합니다. 16)

**Proposed Model**

 이번 연구에서는 트윗의 데이터를 피쳐로 나타내기 위해 `Bag of Words(BoW)` 를 사용했습니다. 또한 데이터셋에 대해 6개의 분류기를 사용했으며 이는 SVM, LR, RF, XGB, DT, NB, KNN입니다. 우리는 어퍼스트로피같은 점 찍는 것이나, 전혀 도움이 안되는 불용어들을 전처리했습니다. 그리고 전처리된 데이터에서 말뭉치를 만들었으며 피쳐추출을 위해서 `BoW` 모델을 만들었습니다. 그리고 데이터를 7대3 비율로 나누었습니다. 아래 **Fig. 1** 처럼요. 마지막으로 데이터 피팅 절차를 끝으로 10 중첩 검증(k-fold)으로서 데이터를 평가했습니다.

![Fig1](/assets/img/trans/1_1.png)

[1] 전처리 영역 : 우리는 다섯가지 전처리를 했습니다. 첫번째로는 불용어(stop words)처리 입니다. 불필요한 단어는 리던던시를 만들고 분석할때 괜히 복잡해집니다. 불용어의 예로는 "To, For, how, and"가 있습니다. 두번째 절차로는 점에 대한 처리(punctuation)입니다. 예를들면 "@, :, !, ?"같은 것이죠. 트위터에서 @airline company로 시작하기에 "@" 사인과 air company를 제거했습니다. 세번째 단계로는 모든 문자들을 소문자로 바꿨습니다. 다음 단계로는 시제변환입니다. 예를들어 'flew'를 'fly'로 바꾸는 것처럼요. 마지막 단계로는 말뭉치로 바꾸기 위한 준비를 합니다. 깔끔한 트윗 데이터를 말뭉치로 바꾸기위해 `BoW` 를 사용했습니다. 이는 트위터 데이터를 피쳐 벡터로 바꿔주면서 머신러닝 모델을 사용할 수 있게 만들어주죠 .

[2] 분류 영역 : 말뭉치를 만들고 나면 분류하기위해 추출된 피쳐데이터를 머신러닝 모델에 맞춥니다. 긍정, 부정, 중립으로 분류할 수 있도록요.

[3] 검증 및 시험 영역 : 데이터를 7대 3으로 나누고 10겹 검증을 사용합니다. 여러 분류기의 정확도, 리콜, 프리시전, f1-score로 다 비교합니다. 결과적으로 가장 좋은 분류기를 선택합니다 **표 5에 나와있습니다.** (이는 표1과 같은 내용이라 포스팅에서는 넘어갑니다)



11) Kaggle, Twitter US Airline Sentiment, Accessed on: August 24, 2020. [Online]. Available: https://www.kaggle.com/crowdflower/twitter- airline-sentiment?select=Tweets.csv.

12) A. I. Saad, Y. M. K. Omar, and F. A. Maghraby, “Predicting Drug Interaction With Adenosine Receptors Using Machine Learning and SMOTE Techniques,” IEEE Access, vol. 7, pp. 146953–146963, 2019.

13) A. Saad, F. A. Maghraby, and Y. M. Omar, “Predicting Drug Target Interaction by Integrating Drug Fingerprint and Drug Side Effect Using Machine Learning,” The International Conference on Advanced Machine Learning Technologies and Applications (AMLTA2019), pp. 281–290, Mar. 2019.

14) Z. Qi, “The Text Classification of Theft Crime Based on TF-IDF and XGBoost Model,” 2020 IEEE International Conference on Artificial Intelligence and Computer Applications (ICAICA), Jun. 2020.

15) C. D. Manning, P. Raghavan, and H. Schutze, “Text classification and Naive Bayes,” Introduction to Information Retrieval, pp. 234–265.

16) J. Ababneh, “Application of Naïve Bayes, Decision Tree, and K-Nearest Neighbors for Automated Text Classification,” Modern Applied Science, vol. 13, no. 11, p. 31, Oct. 2019.



## <span style="color:darkblue">5. EXPERIMENT RESULTS & DISCUSSION</span>

 우리는 다른 머신러닝 기법을 이용하여 6가지의 결과를 얻었습니다. 주 목적은 세개(긍정, 부정, 중립)의 감성으로 분류하는 것이었는데, 이는 SVM과 LR이 85.59%와 81.81%로 가장 높은 정확도를 가졌습니다. RF,XGB,NB,DT는 각각 78.55%, 73%, 70.51%입니다. SVM은 87.2%, 94.4%, 89.53%의 정확도를 가지고 프리시전은 84%, 94%, 88% 였습니다. 리콜은 98%, 69%, 63%였씁니다. F1score는 90%, 79%, 73% 였습니다. LR은 85.04%, 92.76%, 85.82%였으며 <중략> **Fig.2, 표2-4로 대체합니다.**

![Fig1](/assets/img/trans/1_2.png)

## <span style="color:darkblue">6. CONCLUSION</span>

 이번 논문에서는 머신러닝 기술을 활용하여 트위터 데이터를 분류했습니다. 트위터 데이터는 매일 방대하게 생성되고 있습니다. 우리는 트위터 반응을 분류하는 모델에 대한 설계 필요성을 느꼈습니다. 가장 최근 접근법인 감성분석인 세가지 방법(사전, 머신러닝, 하이브리드) 모델과 딥러닝에 대해 말씀드렸습니다. 우리가 찾은 것은 SVM이 83.31%로 가장 높았고 이는 감성분석 분야에 기여할 것이라고 믿습니다.




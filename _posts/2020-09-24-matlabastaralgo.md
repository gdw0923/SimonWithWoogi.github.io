---

title: MATLAB A* Algorithm을 실습하고 지도 데이터에 그리기
author: Simon Anderson
date: 2019-08-08 14:10:00 +0800
categories: [MATLAB, Applied]
tags: [writing]
image: /assets/img/MATLAB/1_Preview.png
---

## <span style="color:darkblue">1. What is A\* Algorithm</span>

<span style="color:darkblue">`1.1.    Informed Search`</span>

Search, 탐색에 관하여 알아봅시다. 지금 가고 싶은 곳을 떠올려 봅시다. 그리고 현재위치에서 목적지까지 시간을 얼마나 걸릴까요? 비용은 얼마나 들까요? 또 어디를 거쳐가야 할까요? 인터넷에 검색해보면 빠르게 답을 찾을 수 있습니다. 그런데 사실 다른 방법으로도 갈 수 있고 그 방법이 더 빠르거나 저렴하기도 할 수 있습니다.

Informed search는 우리가 여행계획 짜는 것과 비슷합니다. 목적지도 알고 중간에 어디를 거쳐야할 지 그리고 각 구간마다 비용도 혹은 거리도 다 알고 있습니다. 그래서 Informed search는 나중에 얘기할 Uninformed search 혹은 Blind search에 비하면 방향도 정해져 있으며 불 필요한 지점을 들리지 않습니다.

Informed search의 대표적인 알고리즘은 Best-First Search(BFS)입니다. 그리고 Informed search의 알고리즘은 대부분 BFS를 뿌리로 두고 있습니다. BFS의 가장 큰 특징은 평가 함수(Evaluation function) F(n)을 이용합니다.

<span style="color:darkblue">`1.2.    Evaluation function`</span>

Evaluation function은 BFS에서 중요한 요소입니다. 함수니까 앞으로 F(n)이라고 얘기하겠습니다. 탐색을 시작할 때 당장 갈 수 있는 거리에 대해서 F(n)을 따져봅니다. A, B 그리고 C에 갈 수 있을 때, F(n)이 제일 낮은 곳부터 가는 것만 따집니다. 즉 BFS에서는 F(n)없이 한발짝도 움직이지 못합니다.

![img](/assets/img/MATLAB/1_1.png)

<span style="color:darkblue">`1.3.    Complete? Optimal? Technology terms`</span>

지금까지 얘기했던 내용에는 State와 탐색에 대한 Complete or Optimal solution, Big-O notation 등 여러가지 기술용어들이 있습니다. 몰라도 뭐든지 할 수 있으니 쉽게 이해할 수 있게 쓰겠습니다.

![img](/assets/img/MATLAB/1_2.png)

<span style="color:darkblue">`1.4.    A* algorithm`</span>

A* Algorithm은 Evaluation function 설계는 아래와 같이 이루어집니다. 먼저 출발지로부터 목적지까지의 비용과 우리가 들리는 지점에서 목적지까지 드는 비용입니다. 거리로 비유하자면 출발지에서 목적지까지의 직선거리와 각 지점에서 목적지까지 거리 혹은 출발지에서 각 지점까지 거리(내가 걸어온 거리)도 됩니다. 이 점을 기억하셔서 실습해봅시다.



 

## <span style="color:darkblue">2. Implement</span>

<span style="color:darkblue">`2.1.    A simplified road map of part of Romania`</span>

![img](/assets/img/MATLAB/1_3.png)
![img](/assets/img/MATLAB/1_4.png)

A* Algorithm에 이용할 루마니아 지도입니다. 좌측 중단의 Arad에서 시작해서 목적지는 Bucharest입니다. Figure 3.22은 목적지까지의 직선거리를 적은 것이고 각 지점별로 걸리는 이동거리는 Figure 3.2에서 확인할 수 있습니다. 실습을 하기위해서 가져온 지도를 조금 바꿔보겠습니다.

<span style="color:darkblue">`2.2.    Romania Tree`</span>

![img](/assets/img/MATLAB/1_5.png)

핵심을 알아야 하니 필요 없는 구간은 지웠으며 빨간색이 직선거리, 파란색이 지점별 거리입니다. Arad에서 출발하겠습니다.

![img](/assets/img/MATLAB/1_6.png)

녹색은 지점별 거리와 직선거리를 더한 값입니다. 즉 A* algorithm의 핵심인 평가함수를 직접 계산하고 있습니다. 좌측 이미지를 보아하니 Sibiu가 393으로 제일 낮은 값을 얻었네요. Sibiu로 넘어갑시다.

![img](/assets/img/MATLAB/1_7.png)이제부터는 제가 걸어온 거리까지 더합니다! 사실 아까는 걸어온 거리가 0이여서 계산할 이유가 없었어요. 오른쪽 이미지를 보니 Rimmicu가 낮은 값을 얻었네요! Rimmicu로 가겠습니다.

![img](/assets/img/MATLAB/1_8.png)

Rimmicu로 넘어와보니 Pitesti가 낮은 값을 받았고 Pitesti를 도착하면서 목적지인 Bucharest가 보이기 시작합니다. 이 것을 끝으로 A* Algorithm을 손수 해볼 수 있었습니다.

<span style="color:darkblue">`2.3. MATLAB code 설명` </span>

A* Algorithm을 작게나마 해봤으니 MATLAB으로 구현할 것입니다. 그러나 그냥하면 MATLAB의 역량을 제대로 올릴 수 없어서 실제 지도 데이터를 이용해서 그 위에다가 경로를 그릴 것입니다.

**MATLAB 복사하기 쉽게 된 전문은 제일 아래에 있습니다**. 지금부터는 설명입니다.

```matlab
clc, clear
import java.util.LinkedList
```

clc, clear를 통해 남겨진 변수들을 초기화합니다. 탐색을 하기위해서는 선입선출 시스템을 가진 Queue가 필요한데, MATLAB은 다른 언어의 유틸리티를 사용할 수 있는 장점을 이용하여 java의 연결리스트를 사용할 것입니다.

```matlab
%Straight line distances to Buchrest
StraightDist = py.dict(pyargs(...
'Arad',366,'Bucharest',0,'Craiova',160,'Drobeta',242,'Eforie',161, ...
'Fagaras',176,'Giurgiu',77,'Hirsova',151,'Iasi',226,'Lugoj',244, ...
'Mehadia',241,'Neamt',234,'Oradea',380,'Pitesti',100,'Rimmicu',193, ...
'Sibiu',253,'Timisoara',329,'Uziceni',80,'Vaslui',199,'Zerind',374)); 

%Node Weight
NodeDist = py.dict(pyargs(...
'Arad_Zerind',75,'Arad_Sibiu',140,'Arad_Timisoara',118, ...
'Zerind_Arad',75,'Zerind_Oradea',71, ...
'Sibiu_Fagaras',99,'Sibiu_Rimmicu',80, 'Sibiu_Arad',140, ...
'Timisoara_Arad',118,'Timisoara_Lugoj',111, ...
'Oradea_Zerind',71,'Oradea_Sibiu',151, ...
'Fagaras_Sibiu',99,'Fagaras_Bucharest',211, ...
'Rimmicu_Sibiu',80,'Rimmicu_Pitesti',97, 'Rimmicu_Craiova',146, ...
'Lugoj_Timisoara',111,'Lugoj_Mehadia',70, ...
'Pitesti_Rimmicu',97,'Pitesti_Bucharest',101,'Pitesti_Craiova',138, ...
'Mehadia_Lugoj',70,'Mehadia_Drobeta',75, ...
'Drobeta_Mehadia',75,'Drobeta_Craiova',120, ...
'Craiova_Drobeta',120,'Craiova_Rimmicu',146, 'Craiova_Pitesti',138, ...
'Bucharest_Fagaras',211,'Bucharest_Pitesti',101, 'Bucharest_Giurgiu',90, 'Bucharest_Uziceni',85, ...
'Uziceni_Bucharest',85,'Uziceni_Hirsova',98, 'Uziceni_Vaslui',142, ...
'Hirsova_Uziceni',98,'Hirsova_Eforie',86, ...
'Vaslui_Uziceni',142,'Vaslui_Iasi',92, ...
'Iasi_Vaslui',92,'Iasi_Neamt',87, ...
'Giurgiu_Bucharest',90,'Eforie_Hirsova',86, 'Neamt_Iasi',87));

%Site List
SiteNames = {'Arad' 'Bucharest' 'Craiova' 'Drobeta' 'Eforie' ... 
'Fagaras' 'Giurgiu' 'Hirsova' 'Iasi' 'Lugoj' ...
'Mehadia' 'Neamt' 'Oradea' 'Pitesti' 'Rimmicu' ...
'Sibiu' 'Timisoara' 'Uziceni' 'Vaslui' 'Zerind'};

InitialState = 'Arad';
GoalState = 'Bucharest';

%Queue
StateSpace = LinkedList();
StateSpace.addLast(InitialState)
```

여기는 크게 신경안쓰셔도 됩니다. Informed search이라서 미리 알고있는 정보들을 Python Dictionary를 이용하여 구성했습니다.

 첫번째는 목적지까지의 직선거리, 

두번째는 각 도시간의 이동거리, 

세번째는 도시의 리스트들이며

 InitialState는 출발지, GoalState는 목적지를 의미합니다. 

마지막으로 StateSpace에는 진행할때마다 들릴 도시들이 보관됩니다. 

```matlab
%Visualization

GPSData = py.dict(pyargs(...
'Arad',[46.185401, 21.322492],'Bucharest',[44.434308, 26.092571],'Craiova',[44.327497 23.786745],'Drobeta',[44.638060 22.661103],'Eforie',[44.049730 28.652512], ...
'Fagaras',[45.842674 24.970539],'Giurgiu',[43.894407 25.965605],'Hirsova',[44.688055 27.946515],'Iasi',[47.166790 27.583530],'Lugoj',[45.688312 21.904419], ...
'Mehadia',[44.906961 22.367557],'Neamt',[46.935242 26.362483],'Oradea',[47.058607 21.942244],'Pitesti',[44.858139 24.870755],'Rimmicu',[45.106551 24.359350], ...
'Sibiu',[45.796382 24.154599],'Timisoara',[45.753437 21.224136],'Uziceni',[44.718908 26.644935],'Vaslui',[46.645329 27.728033],'Zerind',[46.622826 21.516294]));
```

지도 데이터를 이용하려면 첫번째로 위도 경도가 필요합니다. 구글 맵을 이용하여 각 도시의 위도와 경도를 작성해 놨습니다.

```matlab
Run = true;
Cumulative = 0;

while Run

  %Dequeue
  Visit = StateSpace.removeFirst()

  %Plot geography
  temp = GPSData{Visit}.double;
  lat = temp(1);
  lon = temp(2);
  geoplot(lat,lon, 'r-O')

  hold on
  text(lat+0.1,lon+0.1,Visit);
---
```

본격적으로 시작합니다. while은 최종목적지(Goal State인) `Bucharest`에 도달할때까지 우릴 놔주지 않습니다.

StateSpace에 들어가있는 도시를 빼옵니다.

그리고 그 도시의 위도와 경도를 가져와 지도데이터에 그립니다.

`geoplot`은 MATLAB에서 제공하는 지도 데이터위에 선을 그려주는 역할이며 X, Y만 입력하면 `Scatter`처럼 한 포인트만 찍습니다.

`hold on`을 이용해 앞으로 그려지는 시각적 자료들은 `hold off`의 명령 전까지 한 곳에만 그립니다.

```matlab
  % Done?
  if strcmp(Visit,GoalState)
​    geolimits([42 48],[19 30])
​    hold off
​    return;
  end  

  % Generate child nodes
  MinFnSpace = 0;
  MinIndex = 0;
  TempQ = GenChildNodes(Visit, SiteNames, NodeDist, StateSpace);
```

방문한 도시(Visit)과 목적지(Goalstate)가 동일하다면 목적지에 도달했다는 얘기겠죠? `geolimits`를 이용하여 지도 데이터가 루마니아만 보이게끔 설정한 채로 종료합니다.

만약 그게 아니라면 목적지 도달을 위해서 다른 도시로 방문해야됩니다!

`GenChildNodes`가 현재 도시와, 도시리스트, 도시간이동거리를 이용하여 다음 목적지를 안내해줍니다. 어떻게 구성된 함수인지 볼까요?

```matlab
function y = GenChildNodes(InState, InSpace, Dict, Queue)
  for i=1:length(InSpace)
​    try
​      ParamName = InState + "_" + InSpace(i);
​      Dict{ParamName};
​      Queue.addLast(InSpace(i));
​    catch   
​    end
  end
  y = Queue;
end
```

첫번째로 `InSpace`, 즉 모든 도시를 전부 탐색할 예정입니다.

루프를 도는 동안<span style="color:brown">"방문한도시_예정도시"</span>로 string이 만들어지게 됩니다. 예를들면 <span style="color:brown">"Arad_Fagaras"</span>가 있겠죠. 그러나 우리가 만든 도시간 거리 딕셔너리에 넣어보면 찾을 수가 없습니다.

그러면 만들어진 `try-catch`를 통해 다음 구문, 큐에 넣을 수 없죠. 그러니 **자연스럽게 가능해만 큐에 들어갈 수 있습니다.**

참고로 가능해는 이름그대로 가능한 해를 말하며 Feasible하다고 얘기합니다. 

```matlab
  for i=1:TempQ.size
​    % Calculate Evaluation Function - f(n) = g(n) + h(n)
​    Containers = TempQ.removeFirst();
​    MinFnSpace(i) = NodeDist{Visit + "_" + char(Containers)} + Cumulative; %g(n)
​    MinFnSpace(i) = MinFnSpace(i) + StraightDist{char(Containers)}; %h(n)
​    if (MinIndex >= MinFnSpace(i)) || (MinIndex == 0)
​      MinIndex = MinFnSpace(i);
​      NextSite = char(Containers);
​    end
  end 
```

갈수있는 도시들이 `TempQ`에 담겨집니다. 여기서부터는 A* Algorithm에서 제일 중요한 Evaluation Function이 들어가는데요.

계산은 아래와 같이 이루어 집니다. 계산이 이뤄져 제일 작은 값이 나온 도시가 다음으로 갈 도시입니다.
$$
{
f(n) = g(n) + h(n)
}
$$

$$
g(n) = 다음 방문할 도시의 거리 + 지금까지 지나온 거리
$$

$$
h(n) = 목적지와의 직선거리
$$

```matlab
  %Choice next site
  StateSpace.addLast(NextSite);
  temp = GPSData{NextSite}.double;
  lat2 = temp(1);
  lon2 = temp(2);  
  geoplot([lat lat2],[lon lon2], 'r-o')  
  clearvars MinFnSpace MinSite;
end
```

다음 도시를 `.addLast`를 통해서 넣어주고 `Visit`과 `Next Site`간 Plot을 이용하여 이어줍니다.

그럼 최종 결과는 ?

![Result](/assets/img/MATLAB/1_Preview.png)

이렇게 나옵니다!

아래는 소스 전문입니다.

<span style="color:darkblue">`2.4. MATLAB code 전문` </span>

```matlab
---
clc, clear
import java.util.LinkedList 

%Straight line distances to Buchrest
StraightDist = py.dict(pyargs(...
'Arad',366,'Bucharest',0,'Craiova',160,'Drobeta',242,'Eforie',161, ...
'Fagaras',176,'Giurgiu',77,'Hirsova',151,'Iasi',226,'Lugoj',244, ...
'Mehadia',241,'Neamt',234,'Oradea',380,'Pitesti',100,'Rimmicu',193, ...
'Sibiu',253,'Timisoara',329,'Uziceni',80,'Vaslui',199,'Zerind',374)); 

%Node Weight
NodeDist = py.dict(pyargs(...
'Arad_Zerind',75,'Arad_Sibiu',140,'Arad_Timisoara',118, ...
'Zerind_Arad',75,'Zerind_Oradea',71, ...
'Sibiu_Fagaras',99,'Sibiu_Rimmicu',80, 'Sibiu_Arad',140, ...
'Timisoara_Arad',118,'Timisoara_Lugoj',111, ...
'Oradea_Zerind',71,'Oradea_Sibiu',151, ...
'Fagaras_Sibiu',99,'Fagaras_Bucharest',211, ...
'Rimmicu_Sibiu',80,'Rimmicu_Pitesti',97, 'Rimmicu_Craiova',146, ...
'Lugoj_Timisoara',111,'Lugoj_Mehadia',70, ...
'Pitesti_Rimmicu',97,'Pitesti_Bucharest',101,'Pitesti_Craiova',138, ...
'Mehadia_Lugoj',70,'Mehadia_Drobeta',75, ...
'Drobeta_Mehadia',75,'Drobeta_Craiova',120, ...
'Craiova_Drobeta',120,'Craiova_Rimmicu',146, 'Craiova_Pitesti',138, ...
'Bucharest_Fagaras',211,'Bucharest_Pitesti',101, 'Bucharest_Giurgiu',90, 'Bucharest_Uziceni',85, ...
'Uziceni_Bucharest',85,'Uziceni_Hirsova',98, 'Uziceni_Vaslui',142, ...
'Hirsova_Uziceni',98,'Hirsova_Eforie',86, ...
'Vaslui_Uziceni',142,'Vaslui_Iasi',92, ...
'Iasi_Vaslui',92,'Iasi_Neamt',87, ...
'Giurgiu_Bucharest',90,'Eforie_Hirsova',86, 'Neamt_Iasi',87)); 

%Site List
SiteNames = {'Arad' 'Bucharest' 'Craiova' 'Drobeta' 'Eforie' ... 
'Fagaras' 'Giurgiu' 'Hirsova' 'Iasi' 'Lugoj' ...
'Mehadia' 'Neamt' 'Oradea' 'Pitesti' 'Rimmicu' ...
'Sibiu' 'Timisoara' 'Uziceni' 'Vaslui' 'Zerind'}; 

InitialState = 'Arad';
GoalState = 'Bucharest'; 

%Queue
StateSpace = LinkedList();
StateSpace.addLast(InitialState) 

%Visualization
GPSData = py.dict(pyargs(...
'Arad',[46.185401, 21.322492],'Bucharest',[44.434308, 26.092571],'Craiova',[44.327497 23.786745],'Drobeta',[44.638060 22.661103],'Eforie',[44.049730 28.652512], ...
'Fagaras',[45.842674 24.970539],'Giurgiu',[43.894407 25.965605],'Hirsova',[44.688055 27.946515],'Iasi',[47.166790 27.583530],'Lugoj',[45.688312 21.904419], ...
'Mehadia',[44.906961 22.367557],'Neamt',[46.935242 26.362483],'Oradea',[47.058607 21.942244],'Pitesti',[44.858139 24.870755],'Rimmicu',[45.106551 24.359350], ...
'Sibiu',[45.796382 24.154599],'Timisoara',[45.753437 21.224136],'Uziceni',[44.718908 26.644935],'Vaslui',[46.645329 27.728033],'Zerind',[46.622826 21.516294])); 

Run = true;
Cumulative = 0;
while Run
  %Dequeue
  Visit = StateSpace.removeFirst()  

  %Plot geography
  temp = GPSData{Visit}.double;
  lat = temp(1);
  lon = temp(2);
  geoplot(lat,lon, 'r-O')
  hold on
  text(lat+0.1,lon+0.1,Visit);

  % Done?
  if strcmp(Visit,GoalState)  
​    geolimits([42 48],[19 30])
​    hold off
​    return;
  end  

  % Generate child nodes
  MinFnSpace = 0;
  MinIndex = 0;
  TempQ = GenChildNodes(Visit, SiteNames, NodeDist, StateSpace);
  for i=1:TempQ.size
​    % Calculate Evaluation Function - f(n) = g(n) + h(n)
​    Containers = TempQ.removeFirst();
​    MinFnSpace(i) = NodeDist{Visit + "_" + char(Containers)} + Cumulative; %g(n)
​    MinFnSpace(i) = MinFnSpace(i) + StraightDist{char(Containers)}; %h(n)
​    if (MinIndex >= MinFnSpace(i)) || (MinIndex == 0)
​      MinIndex = MinFnSpace(i);
​      NextSite = char(Containers);
​    end
  end   

  %Choice next site
  StateSpace.addLast(NextSite);  

  temp = GPSData{NextSite}.double;
  lat2 = temp(1);
  lon2 = temp(2);
  geoplot([lat lat2],[lon lon2], 'r-o')

  clearvars MinFnSpace MinSite;
end 

function y = GenChildNodes(InState, InSpace, Dict, Queue)
  for i=1:length(InSpace)
​    try
​      ParamName = InState + "_" + InSpace(i);
​      Dict{ParamName};
​      Queue.addLast(InSpace(i));
​    catch
​    end
  end
  y = Queue;
end
---
```


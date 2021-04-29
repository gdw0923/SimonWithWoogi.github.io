---
title: Twitter Naver YouTube Crawler, 현대자동차 여론을 조사해보자(3)
author: Simon Anderson
date: 2021-04-28 18:31:00 +0800
categories: [Project, Data Science]
tags: [BigData, Cloud, AI, IoT, AIoT, TextMining, Python, CSharp, Naver, Hyundai, Kakao]
image: /assets/img/CI/Hyundai.png
math: true
---



 **해당 프로젝트는 현대자동차의 브랜드 밸류를 텍스트 마이닝을 통해 알아봅니다. 현대자동차 브랜드 밸류 조사할 때는 자체제작한 AI 스피커를 이용하여 자연어로 인터페이스(NUI)합니다. 끝으로 해당 프로젝트는 현대자동차의 지원을 받지 않았으며, 그저 현대자동차 소액 주주로서 만든 프로젝트입니다.**



## <span style="color:darkblue">1. Crawler</span>

​	

  이번 포스팅에서는 `Twitter`, `Naver`, `YouTube` `Crawler 크롤러`를 얘기합니다. 본격적으로 만들기 전에 `Crawler` 에 대한 기본적인 사항은 알려드릴려고 합니다. 프로젝트 포스팅이 아니었다면, 좀 더 자세하게 `DFS` 를 기반으로 `하이퍼링크 탐색` 을 얘기할텐데, 여기서는 넘어가겠습니다.

 제가 가장 처음으로 `크롤러` 라는 이름을 들었던 것은 구글이 검색엔진을 발표했던 논문인데요. `The Anatomy of a Large-Scale Hypertextual Web Search Engine` 이 1998년 논문이니까 최근에 나온 단어라고는 할 수 없습니다. 이때의 크롤링은 아래의 주제를 얘기하고 있습니다.

---

- `Crawling` 은 속도보다 인덱싱 생성 속도가 더 중요하다.
- 방문한 웹페이지는 무조건 임시저장한다.
- 웹 접속 지연(일시, 영구)에 대한 대응이 필요하다.
- 엑세스가 집중되어 거부되는 경우 대비책이 필요하다,
- 웹 페이지 내용이 무의미하게 많은 내용을 차지하는 경우 대비책이 필요하다.
- 페이지 내 하이퍼링크가 순환되는 경우 대비책이 필요하다.

---

 이를 보고 `세르게이 브린과 래리 페이지` 는 `Web Crawler` 에 대해 어떻게 생각했는 지 유추해볼 수 있습니다. 먼저, 크롤러가 방문한 웹페이지에 대해서 **테이블 형태의 데이터**가 있다는 점입니다. 이때 당시엔 `Database` 를 사용했을 수도 있고 `Pandas` 에 있는 `Data frame` 을 사용했을 수도 있겠죠. 그래도 `No-SQL` 에 대한 논문이다보니 `링크드 리스트` 같은 포인터계열 자료구조일 확률이 높습니다. 뭐, 우리가 현재 집중해야될 내용은 어떤 속성을 가진 데이터를 보관하고 있었다는 점이죠. 예를 들면 아래 표 처럼요.

| ID   | 주소            | 크기 |
| ---- | --------------- | ---- |
| 101  | www-someone-com | 100  |
| 102  | www-like-co-kr  | 200  |
| 103  | www-me-go-kr    | 300  |

 그리고 두번째는 탐색 알고리즘을 가지고 무작위 웹사이트를 방문한다는 점입니다. 대표적인 탐색 알고리즘을 예로 들면 `DFS(Depth-First-Search) 그리고 BFS(Breadth-Frist-Search)`가 있죠. 보통 게임관련 인공지능을 배울 때는 `DFS` 가 순환에 취약하여 최적해를 못 찾는다고 알려주시는 교수님들이 계십니다. 그래서 대부분 `DFS` 가 최적해를 보장하지 못하고 완전하지 못하다고 외우는 사람들이 많은데, 이는 경우의 수를 얘기하는 공간에서 순환이 일어났을 경우를 얘기합니다.

 구글의 `크롤러` 는 **유한한 공간에서의 `DFS 계열`  탐색 알고리즘**을 사용했습니다. 왜냐하면, 방문한 웹페이지을 임시저장하고 하이퍼링크로의 순환을 대비했다는 것은 `DFS` 에서 지나온 경로에 대한 중복검사를 했다고 볼 수 있죠.

 끝으로 접속 지연, 액세스 거부, 무의미한 많은 내용들에 대한 대비책은 크롤링 작업성능에 영향이 되는 **불필요한 지연을 판단하여 결정하는 알고리즘**이 탑재되어 있음을 알 수 있습니다.

### <span style="color:darkblue">1.1 Kinds of Crawler</span>

 요즘은 `Bot, Spider` 라고도 합니다. 개발자가 만든 규칙에 의하여 수집만 기계적으로 한 다음 돌려주기 때문이죠. `구글` 은 `크롤러` 안에 `인덱싱` 을 언급했으나, 이제는 `Crawler` 와 `Indexer` 를 구분하고 있습니다. 정보를 수집하는 것과 가공하는 것은 모듈별로 나누는 것에 대해 많은 사람들이 공감을 했다고 볼 수 있죠. 그리고 개발자가 만든 규칙들이 특정 웹사이트에 특정 사이트로 한정한다면 이에 대한 **행위는** `Crawling` 이라기 보다는 `Scraping` 이라고 하는 것이 옳다면서 학술적 단어의 명확한 기준을 제시하고 있습니다. 

 `Scraping` 이라는 행위가 언급되다보니 수집하는 웹사이트에 대한 분류도 시작했습니다. 주소에 접근하여 정해진 태그로 원하는 데이터를 뽑아오는 `정적 크롤링` 과 브라우저를 거쳐서 특정 순서를 거쳐 원하는 데이터를 뽑아오는 `동적 크롤링` 으로 나뉩니다.

 다음부터는 바로 실습입니다.

### <span style="color:darkblue">1.2 Twitter Crawler</span>

![TextvsOpinion](/assets/img/Project/Tw_1.png)

 새로운 Python 파일을 만들어주세요.

 `Twitter` 크롤러는 [전 포스팅](https://simonwithwoogi.github.io/posts/projecthyundaitwo/)에서 설명했기 때문에 위와 같은 프로젝트가 만들어져 있을 겁니다. `Twitter API` 는 매월 500,000 개의 트윗을 저장할 수 있습니다. 여기에 있는 `Consumer Keys` 와 `Bearer Token`, `Access Token and Secret` 의 값들은 저장했다는 가정하고 소스를 설명하겠습니다. 참고로 언어는 `Python` 이며, `PyCharm` 에서 구동했습니다.

```python
import os
import twitter

consumer_key = '키입력'
consumer_secret = '키입력'

access_token = '키입력'
access_token_secret = '키입력'

bearer_token = '키입력'
```

`twitter` 모듈을 불러온 다음, `Twitter API` 에서 얻은 키들을 쭉 넣어주세요.

```python
def get_object():
    try:
        api = twitter.Api(consumer_key=consumer_key,
                                  consumer_secret=consumer_secret,
                                  access_token_key=access_token,
                                  access_token_secret=access_token_secret)
        return api
    except Exception as e:
        print(e)
        return None
```

`Twitter` 객체를 얻어오는 함수입니다. `twitter` 모듈에서 얻어오는 `api` 를 반환합니다.

```python
def get_TwitterSearch(srcText, display, api):
    search = api.GetSearch(term=srcText, count=display)

    print(len(search))
    return search
```

 받아온 `api` 객체를 이용하여, 원하는 `검색어(srcText)` 를 검색합니다.`display` 는 리턴에 필요한 결과들을 얘기하는데 기본은 15로 되어있고 최대 100까지 지원합니다. (현재 소스에서는 100을 리터럴로 설정했습니다.)

또한 검색 결과를 반환합니다.

```python
def UnfoldData(search):
    data = {}  
    i = 0  
    for tweet in search:
        data['text'] = tweet.text  
        print(i, " : ", data)
        i += 1

    return search
```

반환한 검새결과를 받아와서 처리하기 쉽게 바꿔줍니다.

```python
def SaveData(search, Header):
    # 전체 문서를 파일 저장
    wfile = open(os.getcwd() + "/" + Header + "twitter.txt", mode='w')  # 쓰기 모드
    data = {}
    i = 0

    for tweet in search:
        data['text'] = tweet.text
        wfile.write(data['text'] + '\n')
        i += 1

    wfile.close()
```

끝으로 텍스트 문서에 검색한 단어 + twitter라는 이름을 달아서 텍스트 파일로 저장합니다.

```python
def main():
    tweety = get_object()

    srcText = input('Enter your target word: ')
    search = get_TwitterSearch(srcText, 100, tweety)
    SaveData(search, srcText)
```

메인 함수입니다. 제가 원하는 키워드를 입력하면 검색을 진행하여 저장합니다.

저는 여기에는 없지만, G90, G80, G70, GV80 Palisade Sonata Elantra IONIQ Santafe를 순차적으로 돌아가며 검색을 진행했습니다.

### <span style="color:darkblue">1.3 Naver Crawler</span>

 새로운 Python 파일을 만들어주세요.

 다음은 네이버입니다. [전 포스팅](https://simonwithwoogi.github.io/posts/projecthyundaitwo/)의 `Naver API` 에 대한 가입을 확인해주세요. 네이버는 `일일허용량` 이 `25,000` 건입니다.

![TextvsOpinion](/assets/img/Project/Nv_1.png)

```python
import os
import sys
import urllib.request
import datetime
import time
import json

client_id = "키입력"
client_secret = "키입력"
```

 초기화를 해줍시다. 그리고 `Naver 개발자센터` 에서 키 값을 입력하시면 됩니다. 

```python
def get_RequestURL(url):
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", client_id)
    request.add_header("X-Naver-Client-Secret", client_secret)

    try:
        response = urllib.request.urlopen(request)
        rescode = response.getcode()
        if rescode == 200:
            response_body = response.read()
            return response_body.decode('utf-8')
        else:
            return "Error Code:" + rescode
    except Exception as e:
        print(e)
        return None
```

`urllib` 를 통해서 `url` 에 대해 `반정형 데이터` 를 가져옵니다. 그리고 키값을 헤더로 붙인 다음, 담고있는 정보에 대해서 반환해줍니다.

```python
def get_NaverSearch(node, srcText, page_start, display):
    baseurl = "https://openapi.naver.com/v1/search/"
    node = "%s.json" % node
    qry = "?query=%s&start=%s&display=%s" % (urllib.parse.quote(srcText), page_start, display)

    url = baseurl + node + qry
    responseDecode = get_RequestURL(url)

    if responseDecode == None:
        return None
    else:
        return json.loads(responseDecode)
```

`json` 형태로 반환하는 코드입니다. `node` 는 분류할 장르를 뜻하구요. `stcText` 는 검색 키워드입니다. `page_start` 는 네이버에서 지원하는 몇 번째 페이지부터 검색할지 볼 수 있습니다. `display` 는 가져올 수 있는 수 입니다. 위 `트위터` 처럼 100을 리터럴로 입력했습니다.

```python
def get_PostData(post, jsonObj, docNumber):
    title = post['title']
    description = post['description']
    org_link = post['originallink']
    link = post['link']

    pDate = datetime.datetime.strptime(post['pubDate'], '%a, %d %b %Y %H:%M:%S +0900')
    pDate = pDate.strftime('%Y-%m-%d %H:%M:%S')

    jsonObj.append({'cnt':docNumber, 'title':title, 'description': description,
                    'org_link':org_link, 'link':org_link, 'pDate':pDate})
    return
```

 수집한 데이터에 대해 꼬리를 붙이는 작업입니다. 언제 가져왔는지부터 추가적인 정보를 입력합니다.

```python
def main():
    # news blog cafearticle movie shop
    node = 'news'
    srcText = input('Enter your target word: ')
    cnt = 0;
    jsonObj = []

    jsonResponse = get_NaverSearch(node, srcText, 1, 100)
    total = jsonResponse['total']

    while((jsonResponse != None) and (jsonResponse['display'] != 0 )):
        for post in jsonResponse['items']:
            cnt += 1
            get_PostData(post, jsonObj, cnt)

        start = jsonResponse['start'] + jsonResponse['display']
        jsonResponse = get_NaverSearch(node, srcText, start, 2700)

    print('Entire searched : %d docs' %total)

    with open('%s_naver_%s.json' %(srcText, node), 'w', encoding='utf8') as outfile:
        jsonFile = json.dumps(jsonObj, indent = 4, sort_keys = True, ensure_ascii = False)

        outfile.write(jsonFile)

    print("Imported data : %d docs" %(cnt))
    print('%s_naver_%s.json SAVED' %(srcText,node))
```

 끝으로 `main` 입니다. `node` 의 장르는 위 주석 리스트에서 고를 수 있구요. 원하는 키워드를 입력합니다. 저는 Hyundai, G90, G80, G70, GV80 Palisade Sonata Elantra IONIQ Santafe를 순서대로 입력했습니다. 순서대로 `json` 객체를 받아와 꼬리표를 붙인 뒤 그대로 로컬에 저장합니다.

### <span style="color:darkblue">1.4 Youtube Crawler</span>

 새로운 Python 파일을 만들어주세요.

 끝으로 동적 크롤링인 `YouTube` 입니다. `Selenium` 으로 `크롬` 브라우저를 제어하여 해당 유투버의 전체 영상을 저장하고, 각 영상마다 댓글들을 수집합니다. `YouTube API` 는 `구글 클라우드` 에서 제공하지만, 생각보다 조건이 적고, 비싸서 다른 방식을 썼습니다. 결론적으로 여기서는 `Open API` 를 쓰지 않습니다.

```python
# 영상취득용
from selenium.webdriver import Chrome
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup

import os
import pandas as pd
import time
```

 마찬가지로 초기화를 해주세요.

```python
def set_Browser(driverpath):
    delay = 3
    # chromedriver를 다운받고 window 사용자는 exe를 붙여야함
    browser = Chrome(driverpath + "/chromedriver")
    browser.implicitly_wait(delay)
    return browser
```

`크롬` 브라우저를 세팅하는 함수입니다. `chrome` 실행파일경로를 지정해주면 브라우저를 실행합니다. 테스트해보지는 않았으나, `Windows` 사용자는  `chromedriver.exe` 로 되어있을 겁니다. `브라우저` 객체를 반환합니다.

```python
def handling_Browser(obj, start_url):
    obj.get(start_url)
    obj.maximize_window()

    obj.find_element_by_xpath('//*[@class="scrollable style-scope tp-yt-paper-tabs"]/tp-yt-paper-tab[2]').click()

    body = obj.find_element_by_tag_name('body')  # 스크롤하기 위해 소스 추출

    num_of_pagedowns = 20
    # num_of_pagedowns번 밑으로 내리는 것
    while num_of_pagedowns:
        body.send_keys(Keys.PAGE_DOWN)
        time.sleep(3)
        num_of_pagedowns -= 1

    html0 = obj.page_source
    html = BeautifulSoup(html0, 'html.parser')
    rtnhtml = html.select(
        'h3 > a'
    )

    return rtnhtml
```

브라우저를 제어하는 함수입니다. `obj` 는 브라우저 객체를 받구요. `Youtube` 에 원하는 **유투버 메인 홈페이지**를 `start_url` 로 입력합니다. 저는 `현대자동차` 를 타겟으로 했으니 `https://www.youtube.com/user/HyundaiWorldwide` 로 했습니다.그리고 브라우저 스크롤을 내리면 동영상이 불러와지는 유투브 특징때문에 브라우저 스크롤을 3초마다 20번씩 내리도록 설정했습니다.

```python
def get_YoutuberClips(srcText):
    path = os.getcwd()

    browser = set_Browser(path)
    start_url = "https://www.youtube.com/user/" + srcText + "/featured"
    html = handling_Browser(browser, start_url)

    title = []
    url = []

    for idx in html:
        if idx.get('href')[:7] != '/watch?':
            pass
        else:
            title.append(idx.text)
            url.append(idx.get('href'))

    title_list = pd.DataFrame(url, columns=['url'])
    title_list['title'] = title
    title_list.to_csv(srcText + "_YouTubeClips.csv")
    return title_list
```

 `Yutube` 동영상들을 받아옵니다. 동영상리스트를 쭉 `title` 이랑 `url` 을 담아넣고 반환합니다.

```python
def get_Replies(info, srcText):
    if len(info.index) == 0:
        info = pd.read_csv(srcText + '_YouTubeClips.csv')

    info['url'] = info['url'].str[9:]

    cnt = 1
    for video_id in info['url']:
        cmd = "python downloader.py --youtubeid " + video_id + " --output result" + str(cnt) + ".csv"
        cnt += 1
        path = os.getcwd()
        os.system("cd " + path)
        os.system(cmd)

    return True
```

한 동영상에 대해서 댓글을 받아옵니다. `info` 에 동영상리스트를 넣어둘 수도 있고, 저장된 `csv` 동영상 리스트를 불러오기도 합니다. 그리고 파이썬 명령어를 이용해서 한 동영상이 하나의 파일이고, 그 안에 댓글들이 적혀있습니다.  그 파일들은 현재 실행경로에 저장됩니다.

```python
def get_YutubeSearch(srcText):
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
    clip_info = get_YoutuberClips(srcText)
    result = get_Replies(clip_info, srcText)
    return result
```

`srcText` 에는 원하는 유투버 명칭을 넣어주시면 됩니다. `OAuthLib` 보안설정을 내리고 위 언급한 함수들을 순서대로 실행합니다. 저는 `HyundaiWorldwide` 를 인자로 넣었습니다. 

```python
def Merge_Data(extension, header):
    path = os.getcwd()
    file_list = os.listdir(path)

    file_list_csv = [file for file in file_list if file.endswith(extension)]
    csvset = open('YouTubeResult.txt', 'w')
    for file in file_list_csv:
        f = open(file, 'r')
        subset = f.read()
        csvset.write(subset)
    csvset.close()
```

 저장해서 각 댓글들을 한 텍스트파일에 넣는 작업입니다. 물론 위에 언급했던 한 동영상마다 존재하는 `csv` 파일은 번거로우니까, 한번에 보는게 좋겠죠.

```python
def main():
    keyword = 'HyundaiWorldwide'
    result = get_YutubeSearch(keyword)
    Merge_Data('.csv', keyword)
```

메인은 위와같이 동작합니다.

### <span style="color:darkblue">1.5 In closing</span>

끝으로 모든 파이썬 파일의 끝에는 아래 내용을 작성해주셔야, 파이참에서 개별로 돌릴 때 동작합니다.

```python
if __name__ == '__main__':
    main()
```
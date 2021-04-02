---
title: C++_string To LPCWSTR
author: Woogi
date: 2021-03-22 16:40:00 +0800
categories: [Language, C++]
tags: [C++]
image: /assets/img/C++/C++_logo.png

---

## <span style="color:darkblue">string 을 LPCWSTR 로 변환</span>

<span style="color:darkblue">`1.1. 기초설명`</span>

C++ 에서는 문자열에 관한 처리가 엄격한 편이라 같은 문자열이라도 char[] ,char*,const char[],const char*,string,wstring,CString,LPCWSTR,LPCSTR

등등 .. 여러가지가 있는데 유니코드와 멀티바이트 문자열의 차이나 .. 16비트 32비트 차이 등등 .. 대표적이 차이가 있겠네요 .. 

하지만 차이가 있다는거만 알면 되는거 아니겠습니까 저는 일단 LPCWSTR을 써야 하니 변환법을 알아보겠습니다.

<span style="color:darkblue">`1.1. Code`</span>

```c++
std::wstring s2ws(const std::string& s)
{
	int len;
	int slength = (int)s.length() + 1;
	len = MultiByteToWideChar(CP_ACP, 0, s.c_str(), slength, 0, 0);
	wchar_t* buf = new wchar_t[len];
	MultiByteToWideChar(CP_ACP, 0, s.c_str(), slength, buf, len);
	std::wstring r(buf);
	delete[] buf;
	return r;
}
int main()
{
    std::wstring stemp = s2ws("TEST_str");
	LPCWSTR result = stemp.c_str();
}
```

요렇게 하면 C++ 의 기본 제공 레퍼런스인 string 형을 LPCWSTR로 변환이 됩니다 ! 



---
title: JAVA_배열
author: Woogi
date: 2021-02-15 22:40:00 +0800
categories: [Programming, JAVA]
tags: [java]
image: /assets/img/java/java_logo.png

---

## <span style="color:darkblue">1. What is 배열</span>

<span style="color:darkblue">`1.1. 배열이란 무엇인가`</span>

배열이란 선형자료구조중 하나로, 동일한 타입의 연관된 데이터를 메모리에 연속적으로 저장하여 하나의 변수에 묶어서 관리하기 위한 자료 구조입니다. 가장 기본적인 자료구조인 만큼 C,Java,Python등 거의 모든 언어에 구현되어 있습니다.

즉 배열은 같은 자료형 변수의 묶음으로 자신이 원하는 개수를 동적할당을 할수 있는데 동적할당을 하면 정적변수가 된다.

## <span style="color:darkblue">2. 사용법</span>

<span style="color:darkblue">`2.1. 형식`</span>

자료형 자료형변수[ ] = new 자료형[100];

 int array[ ] = new int[100]; 100개변수 묶음



array[0] ~ [99] 번호로 접근한다. 이 번호를 index numder 한다. 



<span style="color:darkblue">`2.2. Code`</span>

```java
public class mainClass {


public static void main(String[] args) {


/*

Array(배열): 같은 자료형 변수의 묶음.


int num1, ...num10


자료형 배열변수[] = new 자료형[배열개수];

자료형 []배열변수 = new 자료형[배열개수];

자료형[] 배열변수 = new 자료형[배열개수];


배열변수 [0] = 자료형 데이터

배열변수 [1] = 자료형 데이터

:

배열변수 [배열개수-1] = 자료형 데이터


배열변수[index번호]


*/


int Array[] = new int[10]; // [0] ~ [9]


Array[0] = 10;

Array[1] = 11;

Array[2] = 12;

Array[3] = 13;

Array[4] = 14;

Array[5] = 15;

Array[6] = 16;

Array[7] = 17;

Array[8] = 18;

Array[9] = 19;


System.out.println("Array[1] = "+ Array[1]);

System.out.println("Array[8] = "+ Array[8]);


char cArray[]; // 배열변수 선언을 먼저함

cArray = new char[5]; // 할당을 함


cArray[0] = '안';

cArray[1] = '녕';

cArray[2] = '하';

cArray[3] = '세';

cArray[4] = '요';

//cArray[5] = '.'; 예외가 발생함 인셉션 Exception(예외)


int var = 1; // initialize(초기화) - init - 선언시에만 가능하다.

String sArray[] = { "hello","hi","good"}; // 초기화 후에도 사용이 가능하다.


System.out.println("sArray[2] = "+ sArray[2]);


//String sArr[];

//sArr = { "hello","hi","good"}; 불가능하다.

//Array Lenght(길이)


System.out.println("배열길이: "+ sArray.length);

System.out.println("배열길이: "+ Array.length);

System.out.println("배열길이: "+ cArray.length);


// 배열복제


String aliasArray[] = sArray; // 배열복제는 포인터 같은 개념 복제한 데이터를 수정하면 원본데이터도 같이 수정된다.


System.out.println("aliasArray : "+ aliasArray[0]);



aliasArray[1] = "안녕";


System.out.println("sArray : "+ sArray[1]);


int number1[] = {11,12,13 };

int number2[] = {21,22,23 };


int num1[] = number1;

int num2[] = number2;


System.out.println("num1 : " + num1[0] + " " + num1[1] + " " + num1[2] + " " );

System.out.println("num2 : " + num2[0] + " " + num2[1] + " " + num2[2] + " " );


int temp[];


temp = num1;

num1 = num2;

num2 = temp; // 이런식으로 배열 전체데이터를 바꿀수 있다. 반복문 돌려서 비효율적 처리를 하지 않아도 된다.


System.out.println("num1 : " + num1[0] + " " + num1[1] + " " + num1[2] + " " );

System.out.println("num2 : " + num2[0] + " " + num2[1] + " " + num2[2] + " " );


/*

int temp;

temp = number1[0];

number1[0] = number2[0];

number2[0] = temp;

*/


}


}

```

결과값

![img](/assets/img/java/java_03_01.png)



다음시간에 오겠습니다.!
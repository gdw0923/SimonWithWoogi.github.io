---
title: JAVA_조건문
author: Woogi
date: 2021-02-17 16:40:00 +0800
categories: [Programming, JAVA]
tags: [java]
image: /assets/img/java/java_logo.png

---

## <span style="color:darkblue">1. What is 조건문</span>

<span style="color:darkblue">`1.1. 조건문이란 무엇인가`</span>

조건문이란 프로그램 내에 주어진 표현식의 결과에 따라 별도의 명령을 수행하돌고 제어하는 실행문입니다.



즉 어떤 조건을 달아 그 조건에 참이냐 거짓이냐를 판별해 조건문 안에 실행문을 실행 할 수도 있고 안할수도 있게 만들수 있다는 뜻입니다.

자바 뿐만 아니라 거의 모든 프로그래밍 언어에 구현되어 있을정도로 대중적이고 많은 자료가 있습니다.



기본적으로 if - else , switch  등이 있는데 이 2가지의 조건문을 알아보겠습니다.

## <span style="color:darkblue">2. IF 사용법 </span>

<span style="color:darkblue">`2.1. 형식`</span>

if ( 조건문(true or false)){ 

​	실행문...

}

else if(조건문){

​	실행문....

}

else{

​	실행문....

}

자 여기서 처음 if 가 나왔을때 조건을 검사하여 맞으면 if 문 안의 실행문을 실행한 후 else if, else 는 무시하고 지나갑니다.

그리고 처음 if 가 조건이 맞지 않다 하면 else if 의 조건을 검사하여 위의 if 과 같은 방법을 거칩니다.

이러다가 if, else if 의 모든 조건이 맞지 않으면 무조건 else 안에 실행문을 실행시킨다는 의미 입니다.



<span style="color:darkblue">`2.2. Code`</span>

```java
package ifClass;


public class mainClass {


public static void main(String[] args) {


/*

제어문


종류:

조건문

if


if else


if

else if

else

*/


//조건문

/*

if( 조건 ){ 조건 = 논리연산(true/false) a>0 && a <= 10

//처리

}

if( 조건 )

System.out.println("~~~~");


if( 조건1 ){

//조건1이 true 처리

}

else{

//조건2가 false 처리

}


*/


int number;

number = 1;


if(number > 0) {

System.out.println("number는 0보다 큽니다");

}


if(number == 1) {

System.out.println("변수 number는 1입니다.");

}

if(number >= 10) {

System.out.println("number는 10보다 크거나 같습니다.");

}


if(true) {

System.out.println("true입나다");

}


boolean b = false;


if(b == false) {

System.out.println("b가 false입나다");

}


if(b != true) {

System.out.println("b != false입나다");

}


if(b) { // b == true

System.out.println("b가 true 입나다");

}

if(!b) { // b == flase

System.out.println("b가 false입나다");

}


if(number > 0 && number <= 10) {

System.out.println("number 0보다 크고 10보다 작거나 같습니다.");

}


if(number < 30 || number > 49) {

System.out.println("number 30보다 작거나 49보다 큽니다.");

}

//if else

if(number > 10) {

System.out.println("number 10보다 큽니다.");

}

else {

System.out.println("number 10보다 작거나 같습니다.");

}


//조건 분기

/*

if( 조건1 ){

조건1이 트루일때 처리

}

else if( 조건2){

조건2가 트루일때 처리

}

else if( 조건3 ){

조건3이 트루일때 처리

}

else {

조건이 다 성립되지 않앗을 때 처리

}

*/


int age = 50;


if(age < 20) {

System.out.println("당신은 미성년자입니다.");

}

else if(age < 30) {

System.out.println("당신은 20대입니다.");

}

else if(age < 40) {

System.out.println("당신은 30대입니다.");

}

else if(age < 50 ) {

System.out.println("당신은 40대입니다.");

}

else {

System.out.println("당신은 50살 이상 입니다.");

}


if(age > 0 && age < 20) {

System.out.println("당신은 미성년자입니다.");

}

else if(age >= 20 && age < 30) {

System.out.println("당신은 미성년자입니다.");

}

// if문 안의 if문

int count = 95;


if(count >= 90) {

    if(count >= 95) {

    System.out.println("a+입니다");

}

else {

System.out.println("a입니다");

}

}


}


}

```

결과값

![img](/assets/img/java/java_Conditional_01.png)



## <span style="color:darkblue">3. Switch 사용법 </span>

<span style="color:darkblue">`3.1. 형식`</span>

switch( 대상이되는 변수 )

{

case 값1(value):

​	처리..

break;

case 값2(value):

​	처리..

break;

default:

​	처리..

break;

}

자 위의 if 문과 비슷하면서 다른점이 하나 있는데 switch 문은 꼭 명확한 값으로만 조건 분류가 된다는 점입니다.

예를 들어 위의 if 문은 if ( 변수 > 5) 이런 조건이 있다고 가정 했을때 변수에 들어갈 값이 어떤 값이든 5보다 크기만 하면 되기 때문에 값의 범위를 비교 할 수 있는데 case 변수 > 5: 이런식으로 쓸 수 없다는 얘기이겠죠 ?

switch 문을 쓸때는 꼭 case 1: 이런식으로 변수의 값이 1일 경우에만 그 후 처리를 한다는 점입니다.

그리고 default 요거는 if문의 else 와 대칭되는건데 모든 case 값에 매칭되는게 없을때 무조건 default 의 실행문을 처리한다는 뜻입니다.



<span style="color:darkblue">`3.2. Code`</span>

```java
public class mainClass {


public static void main(String[] args) {

/*

switch : 조건 명시

값이 명확 (범위X)


형식:

switch( 대상이되는 변수 )

{

case 값1(value):

처리

break;

case 값2(value):

처리

break;

default: == else

}

*/


int number = 1;


switch(number) {

case 1: // number == 1

System.out.println("number는 1입니다"); //처리

break; // 탈출

case 2:

System.out.println("number는 2입니다"); //처리

break;

default: // else

break;

}


if(number == 1) {

}

else if(number == 2) {

}

else {

}


char c = '가';

switch( c ) {

case '가':

System.out.println("c = '가'입니다");

break;

}

/*

double d = 123.4567;

switch( d ) {

case 123.4567:

break;

}

*/

double d = 123.4567;

if(d == 123.4567) {

}


String str = "abc";


switch( str ) { // 대입

case "Abc":

break;

case "abc":

System.out.println("str == \"abc\"");

break;

}


if(number > 0 && number < 10) {

}

else if(number > 10 && number < 20) {

}

else if(number > 20 && number < 30) {

}


switch(number) {

case 1:

break;

case 2:

break;

case 3:

break;

}



}


}

```

결과값

![img](/assets/img/java/java_Conditional_02.png)



직접 코드를 돌려보시고 왜 이렇게 결과값이 나오는지 생각해보세요 !

다음시간에 오겠습니다.!
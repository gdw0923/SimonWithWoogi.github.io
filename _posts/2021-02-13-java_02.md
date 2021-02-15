---
title: JAVA_연산자
author: Woogi
date: 2021-02-13 22:10:00 +0800
categories: [Programming, JAVA]
tags: [java]
image: /assets/img/java/java_logo.png

---

## <span style="color:darkblue">1. What is 연산자</span>

<span style="color:darkblue">`1.1. 연산자란 무엇인가`</span>

연산자란 수학에서 쓰는 +. -. x, ÷ 등의 표현을 자바에서도 계산을 위해 변수나 상수등에 붙여 계산을 표현하는 기호를 말합니다.



자바에서는 기본적으로 =, +, -, /, * 등의 산술연산자와 ++, -- 의 증가, 감소연산자 등 여러가지가 있습니다.

## <span style="color:darkblue">2. 종류</span>

<span style="color:darkblue">`2.1. 연산자의 종류`</span>

산술연산자 

![img](/assets/img/java/java_02_01.png)

수학에서 쓰는 사칙연산과 개념이 동일합니다.

증가, 감소연산자

![img](/assets/img/java/java_02_02.png)

거의 모든 프로그래밍 언어에서 쓰는 개념과 동일한데 1을 빼고 증가시킨다고 생각하시면 됩니다.

산술적 대입연산자

![img](/assets/img/java/java_02_03.png)

의미에서 보듯이 변수를 하나 없애서 쓸 수 있습니다.

비트연산자

![img](/assets/img/java/java_02_04.png)

& 계산은 0110(6) & 1100(12) = 0100(4) 가 되는데 같은 자리수에서 1 과 1 일때만 1이 되는 계산법입니다.

(|) 계산은 0110(6) (|) 1100(12) = 1110(14) 가 되는데 같은 자리수에서 1이 하나만 있어도 1이 되는 계산법입니다.

^ 계산은 0110(6) ^ 1100(12) = 1010(10) 가 되는데 같은 자리수에서 1이 하나만 있을때 1이 되는 계산법입니다.

~ 계산은 ~0110(6) = 1001(9) 가 되는데 자리수에서 1은0 이 되고 1은 0이 되는 반전 계산법입니다.

시프트 연산자

![img](/assets/img/java/java_02_05.png)

(>>)계산은 0110(6) = 0011(3) 을 한칸 오른쪽으로 움직이는 계산법입니다.

(<<)계산은 0110(6) = 1100(12) 을 한칸 왼쪽으로 움직이는 계산법입니다.



<span style="color:darkblue">`2.2. 쓰는법...`</span>

자 저번주에 했던 이클립스를 실행해서 요 코드를 해보시면 콘솔창에 결과가 나오면서 잘 분석해보시면 됩니다.!

```java

package operator;


public class mainClass {


public static void main(String[] args) {

// TODO Auto-generated method stub

/* operator (기본연산자) = + - * / %

*

* operator (고급연산자) bit 연산 : & | ^ << >> ~

*

* operator (논리연산자) &&(AND) ||(OR) !(NOT)

*/


int num1,num2;

int result;


num1 = 7;

num2 = 2;


result = num1 + num2;

System.out.println(num1 + " + "+ num2 +" = "+ result);


result = num1 - num2;

System.out.println(num1 + " - "+ num2 +" = "+ result);


result = num1 * num2;

System.out.println(num1 + " * "+ num2 +" = "+ result);


result = num1 / num2;

System.out.println(num1 + " / "+ num2 +" = "+ result);


result = num1 % num2;

System.out.println(num1 + " % "+ num2 +" = "+ result);


//Random == 무작위


int r;

r = (int)(Math.random() * 10);

System.out.println("r = "+ r);


int inputNumber = 27 % 5 + 1;


// 1 ~ 10

r = (int)(Math.random() * 10) + 1;

System.out.println("r = "+ r);


// 10 20 30 40 50

r = ((int)(Math.random() * 5)+1)*10;

System.out.println("r = "+ r);


//주의할점 분모가 0이라면 에러

r = 0 / 3;

System.out.println("r = "+ r);


//r = 3 / 0;

//System.out.println("r = "+ r);


//r = 3 % 0;

//System.out.println("r = "+ r);


//자기자신을 갱신

int n;

n = 0;


n = n+1;

System.out.println("n = " + n);


n = n-1;

System.out.println("n = " + n);


n += 1;

System.out.println("n = " + n);


// increment(증가연산자)++ , decrment(감소연산자)--


int num3 = 0;

num3++;

System.out.println("num3 = " + num3);


++num3;

System.out.println("num3 = " + num3);


num3--;

System.out.println("num3 = " + num3);


int num4;


num4 = num3++;

//num4 = ++num3;

System.out.println("num3 = " + num3);

System.out.println("num4 = " + num4);

    // 논리 연산자 == true / false

/*

* && : AND 그리고

* || : OR 또는

* ! : NOT 반대

* if제어문과 같이 사용하는편임

* a = b 대입

* a > b

* a < b

* a >= b

* a <= b

* a == b

*/


int number = 5;


System.out.println(number == 5);

System.out.println(number > 5);

System.out.println(number >= 5);

System.out.println(number <= 5);


System.out.println(number > 0 && number < 10);

System.out.println(number < 0 && number < 10);


System.out.println(number > 0 || number < 10);


System.out.println(number != 6);


System.out.println(!(number < 0 && number > 10));

//System.out.println(number >= 0 || number <= 10);
    
// bit 연산 == 고급연산자

/*

bit : 0 / 1


& AND

| OR

^ XOR

<< left shift

>> right shift

~ 반전


*/


//AND


int number;


number = 0x71 & 0xb5;


/*

8421 8421

0111 0001

1011 0101


0011 0001 -> 0x31 앤드 연산은 둘다 1일때만 1이기 때문에 계산을 해보면 해당 값이 나온다.

*/

System.out.println("and number = "+ number);

System.out.printf("0x%x\n", number);


//OR


number = 0x71 | 0xb5;

/*

8421 8421

0111 0001

1011 0101


1111 0101 -> 0xf5 오아연산은 둘중 하나만 1이여도 1이기 때문에 계산을 해보면 해당 값이 나온다.

*/

System.out.println("or number = "+ number);

System.out.printf("0x%x\n", number);



//XOR 비트가 다를때 true인 연산


/*

8421 8421

0111 0001

1011 0101


1100 0100 -> 0xc4 엑스오알연산은 비트가 서로 다를때 1이므로 계산을 해보면 해당 값이 나온다.

*/

number = 0x71 ^ 0xb5;

System.out.println("xor number = "+ number);

System.out.printf("0x%x\n", number);


// left shift

/* *2한 결과

0001 -> 1

0010 -> 2

0100 -> 4

1000 -> 8

*/

number = 0x1 << 2; // 왼쪽으로 비트를 2번 움직여서 0x1 * 2 *2 한 값이 나온다 .

System.out.println("left shift number = "+ number);


// right shift

/*/2한 결과

0001 -> 1

0010 -> 2

0100 -> 4

1000 -> 8

*/

number = 0x8 >> 2; // 오른쪽으로 비트를 2번 움직여서 0x8 / 2 /2 한 값이 나온다.


System.out.println("right shift number = "+ number);


/*

(a | b) ^ (a & b)

*/

// ~ 0 -> 1 1 -> 0

/*

0101 0101 -> 1010 1010

*/

byte by;

by = ~0x55; // 반전 연산은 0-> 1로 1->0 으로 다 바꿔주는 계산이다

System.out.printf("0x%x\n", by);



// 삼항연산자

/*

value = ( 조건 ) ? 값1 : 값2

조건 참 = 값1

조건 거짓 = 값2


*/

char c;

int num = 5;

c = (num > 0)?'Y' : 'N'; // num 값이 0보다 크다면 c에 Y를 넣고 거짓이면 N를 넣는다.

System.out.println("c = "+ c);


int n;

n = (num != -1)? 100:200;

System.out.println("n = "+ n);


String str = (num <= 0)? "0보다 작거나 같다" : "0보다크다";

System.out.println("str = "+ str);



}

}

```



요렇게 실행해서 잘 분석을 해보시면 됩니다...



다음시간에 오겠습니다.!
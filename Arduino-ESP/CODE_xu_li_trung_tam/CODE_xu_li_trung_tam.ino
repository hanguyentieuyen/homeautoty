#include <SoftwareSerial.h>
#include <EEPROM.h>
#include "DHT.h"


const int DHTPIN = A5;
const int DHTTYPE = DHT11;
DHT dht(DHTPIN, DHTTYPE);

int RainValue, GasValue, CBAS1, CBAS2, CBCD1, CBCD2, MODE;
int denpk, quatpk, cuapk, den1, quat1, den2, quat2, denpb, cuapb, koipb, denvs;
unsigned long time1, time2;

float t, h;
char humi[1] = "";
char temp[4] = "";
char gas[6] = "";
char dpk[8] = "";
char cpk[10] = "";
char qpk[12] = "";
char dpn1[14] = "";
char qpn1[16] = "";
char dpn2[18] = "";
char qpn2[20] = "";
char dpb[22] = "";
char cpb[24] = "";
char dvs[26] = "";

#define AS1 A4
#define AS2 A8
#define CD1 A0
#define CD2 A2
#define RainSS A12
#define MQ2 A3
#define DPK 21
#define CPK 23
#define QPK 25
#define DPN1 27
#define QPN1 32
#define DPN2 34
#define QPN2 36
#define DPB 38
#define CPB 40
#define KPB 42
#define DVS 44
#define MS 5

#define device_ON(id) digitalWrite(dv_pin[id],HIGH)
#define device_OFF(id) digitalWrite(dv_pin[id],LOW)
#define device_output(id,stt) digitalWrite(dv_pin[id], stt)

SoftwareSerial mySerial(11, 3); // RX, TX
enum dv_id { DPK_ID, CPK_ID , QPK_ID, DPN1_ID, QPN1_ID, DPN2_ID , QPN2_ID, DPB_ID, CPB_ID, DVS_ID, dv_total };
uint8_t dv_pin[11] = {DPK, CPK, QPK, DPN1, QPN1, DPN2, QPN2, DPB, CPB, DVS};
void setup ()
{
  Serial.begin(115200);
  mySerial.begin(9600);
  pinMode(MS, INPUT);
  pinMode(AS1, INPUT); //pinMode nhận tín hiệu đầu vào cho cảm biên
  pinMode(AS2, INPUT);
  pinMode(CD1, INPUT);
  pinMode(CD2, INPUT);
  // 11 device
  pinMode(DPK, OUTPUT);
  pinMode(CPK, OUTPUT);
  pinMode(QPK, OUTPUT);
  pinMode(DPN1, OUTPUT);
  pinMode(QPN1, OUTPUT);
  pinMode(DPN2, OUTPUT);
  pinMode(QPN2, OUTPUT);
  pinMode(DPB, OUTPUT);
  pinMode(CPB, OUTPUT);
  pinMode(KPB, OUTPUT);
  pinMode(DVS, OUTPUT);
  dht.begin();
  Serial.println("Da khoi dong xong");
}
//////////////////////////////////////////////////////
void CamBienAnhSang()
{
  CBAS1 = analogRead(AS1);
  CBAS2 = analogRead(AS2);//lưu giá trị cảm biến vào biến value
}
///////////////////////////////////////////////////
void CamBienChuyenDong()
{
  CBCD1 = digitalRead(CD1);
  CBCD2 = digitalRead(CD2);
}
////////////////////////////////////////////////
void CamBienMua()
{
  RainValue = digitalRead(RainSS);  //Đọc tín hiệu cảm biến mưa
}
////////////////////////////////////////
void CamBienKhiGas()
{
  GasValue = analogRead(MQ2);   //đọc giá trị điện áp ở chân A3 - chân cảm biến

}
////////////////////////////////////////
void SendUART()
{
  if ((unsigned long) millis() - time1 > 1000)
  {
    time1 = millis();
    h = dht.readHumidity();
    t = dht.readTemperature();
    int tem = t;
    int hum = h;
    mySerial.print("t");
    itoa(tem, temp, 10);
    mySerial.print(temp);
    mySerial.print("h");
    itoa(hum, humi, 10);
    mySerial.print(humi);
    mySerial.print("g");
    itoa(GasValue, gas, 10);
    mySerial.print(gas);
    if (digitalRead(DPK) == HIGH) {
      denpk = 1;
      mySerial.print("a");
      itoa(dpk, denpk, 10);
      mySerial.print(denpk);
    }
    else {
      denpk = 0;
      mySerial.print("a");
      itoa(dpk, denpk, 10);
      mySerial.print(denpk);
    }
    if (digitalRead(CPK) == HIGH) {
      cuapk = 1;
      mySerial.print("b");
      itoa(cpk, cuapk, 10);
      mySerial.print(cuapk);
    }
    else {
      cuapk = 0;
      mySerial.print("b");
      itoa(cpk, cuapk, 10);
      mySerial.print(cuapk);
    }
    if (digitalRead(QPK) == HIGH) {
      quatpk = 1;
      mySerial.print("c");
      itoa(qpk, quatpk, 10);
      mySerial.print(quatpk);
    }
    else {
      quatpk = 0;
      mySerial.print("c");
      itoa(qpk, quatpk, 10);
      mySerial.print(quatpk);
    }
    if (digitalRead(DPN1) == HIGH) {
      den1 = 1;
      mySerial.print("d");
      itoa(dpn1, den1, 10);
      mySerial.print(den1);
    }
    else {
      den1 = 0;
      mySerial.print("d");
      itoa(dpn1, den1, 10);
      mySerial.print(den1);
    }
    if (digitalRead(QPN1) == HIGH) {
      quat1 = 1;
      mySerial.print("e");
      itoa(qpn1, quat1, 10);
      mySerial.print(quat1);
    }
    else {
      quat1 = 0;
      mySerial.print("e");
      itoa(qpn1, quat1, 10);
      mySerial.print(quat1);
    }
    if (digitalRead(DPN2) == HIGH) {
      den2 = 1;
      mySerial.print("f");
      itoa(dpn2, den2, 10);
      mySerial.print(den2);
    }
    else {
      den2 = 0;
      mySerial.print("f");
      itoa(dpn2, den2, 10);
      mySerial.print(den2);
    }
    if (digitalRead(QPN2) == HIGH) {
      quat2 = 1;
      mySerial.print("i");
      itoa(qpn2, quat2, 10);
      mySerial.print(quat2);
    }
    else {
      quat2 = 0;
      mySerial.print("i");
      itoa(qpn2, quat2, 10);
      mySerial.print(quat2);
    }
    if (digitalRead(DPB) == HIGH) {
      denpb = 1;
      mySerial.print("k");
      itoa(dpb, denpb, 10);
      mySerial.print(denpb);
    }
    else {
      denpb = 0;
      mySerial.print("k");
      itoa(dpb, denpb, 10);
      mySerial.print(denpb);
    }
    if (digitalRead(CPB) == HIGH) {
      cuapb = 1;
      mySerial.print("l");
      itoa(cpb, cuapb, 10);
      mySerial.print(cuapb);
    }
    else {
      cuapb = 0;
      mySerial.print("l");
      itoa(cpb, cuapb, 10);
      mySerial.print(cuapb);
    }
    if (digitalRead(DVS) == HIGH) {
      denvs = 1;
      mySerial.print("m");
      itoa(dvs, denvs, 10);
      mySerial.print(denvs);
    }
    else {
      denvs = 0;
      mySerial.print("m");
      itoa(dvs, denvs, 10);
      mySerial.print(denvs);
    }
  }
}
////////////////////////////////////////
void GetUART()
{
  String Chuoi = ""; String mod = "";
  if (mySerial.available()) // co la phai lay lien
  {

    Chuoi = mySerial.readStringUntil("\n");
    time2 = millis();
  }
  if (Chuoi.length() >= 2) {

    // xu ly gop
    Serial.print("data rev:");
    Serial.println(Chuoi);
    for (int z = 0; z < Chuoi.length(); z++)
    {
      if (Chuoi[z] == 'm')
      {
        MODE = 0;
        mod.concat( Chuoi[z + 1]);
        MODE = mod.toInt();
      }
      if (Chuoi[z] == 'd')
      {
        int id = 0;
        int stt = 0;
        // bat dau tach chuoi
        id = Chuoi.substring(z + 1 , z + 3).toInt();
        stt = Chuoi.substring( z + 3, z + 4).toInt();
        Serial.println("id= " + String(id) + "stt= " + String(stt));

        // tach chuoi lay dc id, stt o dang int
        device_output(id, stt);
        // xong bat tat
      }
    }
  }

}

////////////////////////////////////////
void loop()
{
  CamBienAnhSang();
  CamBienChuyenDong();
  CamBienMua();
  CamBienKhiGas();
  SendUART();
  GetUART();
  delay(100);
  switch (MODE) {
    case 1:
      if ((CBAS2 >= 750) & (CBCD2 == 1 )) {
        digitalWrite(DVS, HIGH);
        delay(300);
      }
      else {
        digitalWrite(DVS, LOW);
      }
      if (RainValue == LOW ) {
        digitalWrite(CPB, LOW);
      }
      if (GasValue >= 500) {
        digitalWrite(DPB, HIGH);
        delay(30);
        digitalWrite(DPB, LOW);
        digitalWrite(KPB, HIGH);
        digitalWrite(CPB, HIGH);
        digitalWrite(CPK, HIGH);
      }
      else {
        digitalWrite(KPB, LOW);
        digitalWrite(DPB, LOW);
        digitalWrite(CPK, LOW);
      }
      SendUART();
      //GetUART();
      break;
    case 2:
      if ((CBAS1 >= 750) & (CBCD1 == 1)) {
        digitalWrite(DPK, HIGH);
        delay(300);
      }
      else {
        digitalWrite(DPK, LOW);
      }
      if ((CBCD1 == 1) & (t > 28)) {
        digitalWrite(QPK, HIGH);
      }
      else {
        digitalWrite(QPK, LOW);
      }
      if ((CBAS2  >= 750) & (CBCD2 == 1)) {
        digitalWrite(DVS, HIGH);
        delay(300);
      }
      else {
        digitalWrite(DVS, LOW);
      }
      if (RainValue == LOW ) {
        digitalWrite(CPB, LOW);
      }
      if (GasValue >= 500) {
        digitalWrite(DPB, HIGH);
        digitalWrite(KPB, HIGH);
        digitalWrite(CPB, HIGH);
        digitalWrite(CPK, HIGH);
      }
      else {
        digitalWrite(DPB, LOW);
        digitalWrite(KPB, LOW);
        digitalWrite(CPK, LOW);
      }
      SendUART();
      //GetUART();
      break;
    case 3:
      if ((CBAS2 >= 750) & (CBCD2 == 1)) {
        digitalWrite(DVS, HIGH);
        delay(300);
      }
      else {
        digitalWrite(DVS, LOW);
      }
      if  (t > 28) {
        digitalWrite(QPN1, HIGH);
        digitalWrite(QPN2, HIGH);
      }
      else {
        digitalWrite(QPN1, LOW);
        digitalWrite(QPN2, LOW);
      }
      if (GasValue >= 500) {
        digitalWrite(DPB, HIGH);
        delay(30);
        digitalWrite(KPB, HIGH);
        digitalWrite(CPB, HIGH);
        digitalWrite(CPK, HIGH);
      }
      else {
        digitalWrite(CPK, LOW);
      }
      if (CBCD1 == 1) {
        digitalWrite(DPB, HIGH);
        digitalWrite(DPK, HIGH);
        digitalWrite(KPB, HIGH);
      }
      else {
        digitalWrite(DPK, LOW);
      }
      if ((GasValue <= 500) & (CBCD1 == 0)) {
        digitalWrite(KPB, LOW);
        digitalWrite(DPB, LOW);
      }
      SendUART();
      //GetUART();
      break;
    case 4:
      digitalWrite(CPK, LOW);  digitalWrite(DPK, LOW);  digitalWrite(QPK, LOW);  digitalWrite(DPN1, LOW); digitalWrite(QPN1, LOW); digitalWrite(KPB, LOW);
      digitalWrite(DVS, LOW);  digitalWrite(CPB, LOW);  digitalWrite(DPN2, LOW); digitalWrite(QPN2, LOW); digitalWrite(DPB, LOW);
      if (GasValue >= 500) {
        digitalWrite(DPB, HIGH);
        delay(30);
        digitalWrite(KPB, HIGH);
      }
      else {
        digitalWrite(DPB, LOW);
        digitalWrite(KPB, LOW);
      }
      if (CBCD1 == 1) {
        digitalWrite(DPB, HIGH);
        digitalWrite(DPK, HIGH);
        digitalWrite(KPB, HIGH);
      }
      else {
        digitalWrite(KPB, LOW);
        digitalWrite(DPB, LOW);
        digitalWrite(DPK, LOW);
      }
      SendUART();
     // GetUART();
      break;
  }
}

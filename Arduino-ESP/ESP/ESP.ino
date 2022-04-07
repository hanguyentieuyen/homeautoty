#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include "FirebaseESP8266.h"

// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

#define FIREBASE_HOST "https://homeautoty-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "BNugsSTAtt6jBZWUacNUpc0PdoYVyFXK72x8LK81"
#define WIFI_SSID "Ox"
#define WIFI_PASSWORD "wow1357894"

SoftwareSerial mySerial(D5, D6); // RX, TX
unsigned long time1, time2;

FirebaseJson json;

FirebaseData   stream;
FirebaseData   firebaseData;
FirebaseAuth   auth;
FirebaseConfig config;

int temp, humi, GasValue, MODE;
int temp_old, humi_old, GasValue_old, DPK_old, CPK_old, QPK_old, DPN1_old, QPN1_old, DPN2_old, QPN2_old, DPB_old, CPB_old, DVS_old;
int CPB, CPK, QPK, QPN1, QPN2, DVS, DPB, DPK, DPN1, DPN2;
int cpb, cpk, qpk, qpn1, qpn2, dvs, dpb, dpk, dpn1, dpn2;
String timehengio, realtimef, chuoi1, chuoi2, chuoi3, chuoi4;
int realtime, timeZ;
byte moc1, moc2;
String path = "/monitor-cluster";

////////////////////////////////////////////////////////////////
void streamCallback(StreamData data) {
  if ((data.dataPath().indexOf("door-cluster")) != -1) {
    if (data.dataPath().indexOf("kitchen-window") != -1) {
      cpb = data.stringData().toInt();
      mySerial.println("d08" + String(cpb));
    }
    else if (data.dataPath().indexOf("living-room-door") != -1) {
      cpk = data.stringData().toInt();
      mySerial.println("d01" + String(cpk));
    }
    yield();
  }
  if ((data.dataPath().indexOf("fan-cluster")) != -1) {
    if (data.dataPath().indexOf("living-room-fan") != -1) {
      qpk = data.stringData().toInt();
      mySerial.println("d02" + String(qpk));
    }
    else if (data.dataPath().indexOf("sleep-fan1") != -1) {
      qpn1 = data.stringData().toInt();
      mySerial.println("d04" + String(qpn1));
    }
    else if (data.dataPath().indexOf("sleep-fan2") != -1) {
      qpn2 = data.stringData().toInt();
      mySerial.println("d06" + String(qpn2));
    }
    yield();
  }
  if ((data.dataPath().indexOf("light-cluster")) != -1) {
    if (data.dataPath().indexOf("bath-light") != -1) {
      dvs = data.stringData().toInt();
      mySerial.println("d09" + String(dvs));
    }
    else if (data.dataPath().indexOf("kitchen-light") != -1) {
      dpb = data.stringData().toInt();
      mySerial.println("d07" + String(dpb));
    }
    else if (data.dataPath().indexOf("living-room-light") != -1) {
      dpk = data.stringData().toInt();
      mySerial.println("d00" + String(dpk));
    }
    else if (data.dataPath().indexOf("sleep-light1") != -1) {
      dpn1 = data.stringData().toInt();
      mySerial.println("d03" + String(dpn1));
    }
    else if (data.dataPath().indexOf("sleep-light2") != -1) {
      dpn2 = data.stringData().toInt();
      mySerial.println("d05" + String(dpn2));
    }
    yield();
  }

  // process
  if (data.dataPath().indexOf("context-cluster") != -1) { // neu tu duong context-cluster
    if (data.dataPath().indexOf("basic") != -1) {
      MODE = 1;
    }
    else if (data.dataPath().indexOf("sleep") != -1) {
      MODE = 3;
    }
    else if (data.dataPath().indexOf("goout") != -1) {
      MODE = 4;
    }
    else if (data.dataPath().indexOf("greeting") != -1) {
      MODE = 2;
    }
    mySerial.println("m" + String(MODE));
    yield();
  }
  ////////////
  int val1, val2;
  if ((data.dataPath().indexOf("time")) != -1) {
    if (data.dataPath().indexOf("alarm_time") != -1) {
      timehengio = data.stringData();
      for (int i = 0; i < 4; i++)
      {
        if (timehengio.charAt(i) == ':') {
          moc1 = i;
        }
        yield();
      }
      chuoi1 = timehengio;
      chuoi2 = timehengio;
      chuoi1.remove(moc1);
      chuoi2.remove(0, moc1 + 1);
      chuoi1 += chuoi2;
      val1 =  chuoi1.toInt();
      yield();
    }
    else if (data.dataPath().indexOf("real_time") != -1) {
      realtimef = data.stringData();
      for (int n = 0; n < 4; n++)
      {
        if (realtimef.charAt(n) == ':') {
          moc2 = n;
        }
        yield();
      }
      chuoi3 = realtimef;
      chuoi4 = realtimef;
      chuoi3.remove(moc2);
      chuoi4.remove(0, moc2 + 1);
      chuoi3 += chuoi4;
      val2 =  chuoi3.toInt();
      yield();
    }
    yield();
  }
    if ((val1) == (val2)) {
      dpn1 = 1;
      dpn2 = 1;
      qpn1 = 0;
      qpn2 = 0;
      mySerial.println("d04" + String(dpn1) + "d05" + String(qpn1) + "d06" + String(dpn2) + "d07" + String(qpn2));
    }
}
////////////////////////////////////////////
void streamTimeoutCallback(bool timeout)
{
  if (timeout) Serial.println("stream timeout, resuming...\n");
}
///////////////////////////////////////////////////////
void setup()
{
  Serial.begin(115200);
  mySerial.begin(9600);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  uint32_t last_check_connect = millis();
  while (WiFi.status() != WL_CONNECTED) {
    if ((uint32_t) (millis() - last_check_connect) >= 1000)Serial.print(".");
    yield(); // dung lenh nay de lam moi wath dog timer, esp se tu reset neu delay qua lau, hoac bi treo

  }
  yield();
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  config.api_key      = FIREBASE_AUTH;
  config.database_url = FIREBASE_HOST;
  config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  if (!Firebase.beginStream(stream, "/"))
    Serial.printf("stream begin error, %s\n\n", stream.errorReason().c_str());

  Firebase.setStreamCallback(stream, streamCallback, streamTimeoutCallback);
  yield();
}
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
void loop()
{
  String Chuoi = ""; String tem = ""; String hum = ""; String gas = ""; String denpk = "";
  String cuapk = ""; String quatpk = ""; String den1 = ""; String quat1 = ""; String den2 = ""; String quat2 = "";
  String cuapb = ""; String denpb = ""; String denvs = "";

  if (mySerial.available())
  {
    if ((unsigned long) millis() - time1 > 1000)
    {
      Chuoi = mySerial.readString();
      time1 = millis();
    }
  }
  for (int z = 0; z < 38; z++)
  {
    if (Chuoi[z] == 't')
    {
      tem.concat( Chuoi[z + 1]);
      tem.concat( Chuoi[z + 2]);
      temp = tem.toInt();
      if (temp != temp_old) {
        temp_old = temp;
        Firebase.setInt(firebaseData, path + "/temp", temp);
        yield();
      }

    }
    if (Chuoi[z] == 'h')
    {
      hum.concat( Chuoi[z + 1]);
      hum.concat( Chuoi[z + 2]);
      humi = hum.toInt();
      if (humi != humi_old) {
        humi_old = humi;
        Firebase.setInt(firebaseData, path + "/hum", humi);
        yield();
      }

    }
    if (Chuoi[z] == 'g')
    {
      gas.concat( Chuoi[z + 1]);
      gas.concat( Chuoi[z + 2]);
      gas.concat( Chuoi[z + 3]);
      GasValue = gas.toInt();
      if (GasValue != GasValue_old) {
        GasValue_old = GasValue;
        Firebase.setInt(firebaseData, path + "/gas", GasValue);
        yield();
      }
    }
    if (Chuoi[z] == 'a')
    {
      denpk.concat( Chuoi[z + 1]);
      DPK = denpk.toInt();
      if (DPK != DPK_old) {
        DPK_old = DPK;
        Firebase.setInt(firebaseData, "/light-cluster/living-room-light", DPK);
        yield();
      }
    }
    if (Chuoi[z] == 'b')
    {
      cuapk.concat( Chuoi[z + 1]);
      CPK = cuapk.toInt();
      if (CPK != CPK_old) {
        CPK_old = CPK;
        Firebase.setInt(firebaseData, "/door-cluster/living-room-door", CPK);
        yield();
      }
    }
    if (Chuoi[z] == 'c')
    {
      quatpk.concat( Chuoi[z + 1]);
      QPK = quatpk.toInt();
      if (QPK != QPK_old) {
        QPK_old = QPK;
        Firebase.setInt(firebaseData, "/fan-cluster/living-room-fan", QPK);
        yield();
      }
    }
    if (Chuoi[z] == 'd')
    {
      den1.concat( Chuoi[z + 1]);
      DPN1 = den1.toInt();
      if (DPN1 != DPN1_old) {
        DPN1_old = DPN1;
        Firebase.setInt(firebaseData, "/light-cluster/sleep-light1", DPN1);
        yield();
      }
    }
    if (Chuoi[z] == 'e')
    {
      quat1.concat( Chuoi[z + 1]);
      QPN1 = quat1.toInt();
      if (QPN1 != QPN1_old) {
        QPN1_old = QPN1;
        Firebase.setInt(firebaseData, "/fan-cluster/sleep-fan1", QPN1);
        yield();
      }
    }
    if (Chuoi[z] == 'f')
    {
      den2.concat( Chuoi[z + 1]);
      DPN2 = den2.toInt();
      if (DPN2 != DPN2_old) {
        DPN2_old = DPN2;
        Firebase.setInt(firebaseData, "/light-cluster/sleep-light2", DPN2);
        yield();
      }
    }
    if (Chuoi[z] == 'i')
    {
      quat2.concat( Chuoi[z + 1]);
      QPN2 = quat2.toInt();
      if (QPN2 != QPN2_old) {
        QPN2_old = QPN2;
        Firebase.setInt(firebaseData, "/fan-cluster/sleep-fan2", QPN2);
        yield();
      }
    }
    if (Chuoi[z] == 'k')
    {
      denpb.concat( Chuoi[z + 1]);
      DPB = denpb.toInt();
      if (DPB != DPB_old) {
        DPB_old = DPB;
        Firebase.setInt(firebaseData, "/light-cluster/kitchen-light", DPB);
        yield();
      }
    }
    if (Chuoi[z] == 'l')
    {
      cuapb.concat( Chuoi[z + 1]);
      CPB = cuapb.toInt();
      if (CPB != CPB_old) {
        CPB_old = CPB;
        Firebase.setInt(firebaseData, "/door-cluster/kitchen-window", CPB);
        yield();
      }
    }
    if (Chuoi[z] == 'm')
    {
      denvs.concat( Chuoi[z + 1]);
      DVS = denvs.toInt();
      if (DVS != DVS_old) {
        DVS_old = DVS;
        Firebase.setInt(firebaseData, "/light-cluster/bath-light", DVS);
        yield();
      }
    }
    yield();
  }
}

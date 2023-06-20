#include <ArduinoJson.h>
#include <ArduinoJson.hpp>

const int buttonPin = 2;

int buttonState = 0;

void setup() {
  Serial.begin(9600);
  while (!Serial) continue;
}

void loop() {
  buttonState = digitalRead(buttonPin);

  DynamicJsonDocument doc(1024);

  doc["data"][0] = buttonState;

  serializeJson(doc, Serial);
  Serial.println();

  if (Serial.available() > 0) {
    String s = Serial.readStringUntil('\n');
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, s);
    if (error) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      return;
    }
  }
}
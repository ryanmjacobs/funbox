#include <Servo.h>

Servo servo;

void setup() {
    servo.attach(9);
    Serial.begin(115200);
    Serial.println("Launching servo loop...");
}

void loop() {
    if (Serial.available() > 0) {
        byte rx = Serial.read();
        servo.write(rx);

        Serial.print("rx -> ");
        Serial.println(rx, DEC);
    }
}

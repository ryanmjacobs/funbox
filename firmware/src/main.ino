#include <Servo.h>

Servo sx, sy;

void setup() {
    sx.attach(5);
    sy.attach(6);
    Serial.begin(115200);
    Serial.println("Launching servo loop...");
}

void loop() {
    int xy = 0;

    if (Serial.available() > 0) {
        byte rx = Serial.read();
        Serial.print("rx -> ");
        Serial.println(rx, DEC);

        if (xy = !xy)
            sx.write(rx);
        else
            sy.write(rx);
    }
}

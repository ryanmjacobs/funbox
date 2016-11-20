#include <Servo.h>

Servo sx, sy;

void setup() {
    sx.attach(5);
    sy.attach(6);
    Serial.begin(115200);
    Serial.println("Launching servo loop...");
}

void loop() {
    static int xy = 0;

    if (Serial.available() > 0) {
        byte rx = Serial.read();
        Serial.print("rx -> ");
        Serial.println(rx, DEC);

        // restart to x
        if (rx == 255)
            xy = 0;
        // move x every other
        else if (xy = !xy)
            sx.write(rx);
        // move y every other
        else
            sy.write(180-rx);
    }
}

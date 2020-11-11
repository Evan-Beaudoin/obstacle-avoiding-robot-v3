function scan_right () {
    robotbit.Servo(robotbit.Servos.S1, 0)
    basic.pause(500)
    for (let index = 0; index < 1; index++) {
        right_distance = distance
    }
    basic.pause(500)
}
function straighten_out () {
    robotbit.Servo(robotbit.Servos.S1, 90)
}
function turn_left () {
    turn_left_value = 1
    while (turn_left_value == 1) {
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        -110,
        robotbit.Motors.M2A,
        255
        )
        basic.pause(400)
        turn_left_value = 0
    }
    robotbit.MotorStopAll()
}
function scan_left () {
    robotbit.Servo(robotbit.Servos.S1, 180)
    basic.pause(500)
    for (let index = 0; index < 1; index++) {
        left_distance = distance
    }
    basic.pause(500)
}
function turn_right () {
    turn_right_value = 1
    while (turn_right_value == 1) {
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        110,
        robotbit.Motors.M2A,
        -255
        )
        basic.pause(400)
        turn_right_value = 0
    }
    robotbit.MotorStopAll()
}
// Created by: Evan Beaudoin
// Created on: Nov , 2020
// 
// This program uses an ultrasonic sensor to avoid obstacles in it's path
let turn_right_value = 0
let left_distance = 0
let turn_left_value = 0
let distance = 0
let right_distance = 0
let M1_SPEED = 110
let M2_SPEED = 255
let strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
strip.clear()
strip.show()
basic.forever(function () {
    distance = sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
    )
})
basic.forever(function () {
    straighten_out()
    basic.pause(500)
    if (distance < 30 && distance > 0) {
        robotbit.MotorStopAll()
        basic.clearScreen()
        strip.clear()
        strip.show()
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        music.playTone(131, music.beat(BeatFraction.Whole))
        basic.pause(200)
        scan_left()
        basic.pause(1000)
        scan_right()
        basic.pause(1000)
        if (left_distance > right_distance) {
            strip.clear()
            strip.show()
            strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
            strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
            strip.show()
            basic.showArrow(ArrowNames.West)
            turn_left()
        } else {
            strip.clear()
            strip.show()
            strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Red))
            strip.setPixelColor(3, neopixel.colors(NeoPixelColors.Red))
            strip.show()
            basic.showArrow(ArrowNames.East)
            turn_right()
        }
    } else {
        strip.clear()
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
        basic.showArrow(ArrowNames.North)
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        M1_SPEED,
        robotbit.Motors.M2A,
        M2_SPEED
        )
    }
})

// ---------------------------------------------------------------------------
// SAMPLE PRODUCT CATALOGUE — placeholder data so the site has something real
// to show. Replace with your own products, prices and stock quantities.
// IDs follow the IM1000, IM1001, IM1002... sequence requested.
//
// Each product carries:
//   id, name, category, price, stock
//   blurb   — one-line description shown on cards and the product page
//   images  — 1 to 3 photo URLs (first one is the card thumbnail)
//   specs   — exactly 3 short specification bullet points
//
// Photos are pulled live from Wikimedia Commons (freely licensed). `wm(file)`
// builds a stable Special:FilePath URL that redirects to a 600px thumbnail.
// To use your own photo, drop a file in /public and use "/my-photo.jpg", or
// point at any image URL. Broken images fall back to the category icon.
// ---------------------------------------------------------------------------
const wm = (file) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    file
  )}?width=600`;

// Shared / representative photos for parts without their own Commons image.
const CONVERTER_IMG = wm(
  "LM2596_buck_converter_module,_MP1584_buck_converter_module,_and_SDB628_boost_converter_module.jpg"
);
const JUMPER_IMGS = [
  wm("A_few_Jumper_Wires.jpg"),
  wm("Jumper_Wires_with_Crocodile_Clips.jpg"),
];
const LED_IMGS = [wm("LED_-_5mm_Green.jpg"), wm("LED_5mm_RGB.jpg")];
const SERVO_IMG = wm("Tower_Pro_SG90_micro_servo_motor.jpg");
const WHEEL_IMGS = [
  wm("GTF-Omni_directional_wheel.jpg"),
  wm("GTF-Omni_directional_robot_wheel.jpg"),
];

export const PRODUCTS = [
  // Arduino Boards
  {
    id: "IM1000",
    name: "Arduino Uno R3",
    category: "arduino-boards",
    price: 2650,
    stock: 24,
    blurb: "The classic ATmega328P board for every first project.",
    images: [
      "/images/Arduino_uno/ArduinoUno_R3_Front.jpg",
      "/images/Arduino_uno/arduino-uno-r3-board-782.jpg",
      "/images/Arduino_uno/arduinouno.jpg",
    ],
    specs: [
      "ATmega328P microcontroller running at 16 MHz, 32 KB flash",
      "14 digital I/O pins (6 PWM) plus 6 analog inputs",
      "USB-B programming, 7–12 V DC jack, 5 V logic",
    ],
  },
  {
    id: "IM1001",
    name: "Arduino Nano",
    category: "arduino-boards",
    price: 1450,
    stock: 18,
    blurb: "Breadboard-friendly and compact, same core as the Uno.",
    images: [
      "/images/Arduino_nano/nano.jpg",
      "/images/Arduino_nano/nano2.jpg",
      "/images/Arduino_nano/nano3.jpg",
    ],
    specs: [
      "ATmega328P at 16 MHz in a 45 × 18 mm DIP layout",
      "22 I/O pins (8 analog, 6 PWM) with a Mini-USB port",
      "Solders straight into a breadboard, 5 V logic",
    ],
  },
  {
    id: "IM1002",
    name: "Arduino Mega 2560",
    category: "arduino-boards",
    price: 4200,
    stock: 7,
    blurb: "54 digital pins for large builds and multi-sensor rigs.",
    images: [
      wm("Arduino_Mega_2560.jpg"),
      wm("Arduino_Mega_2560_(HW-888)_front.jpg"),
      wm("Arduino_MEGA_2560_R3,_back_side.jpg"),
    ],
    specs: [
      "ATmega2560 at 16 MHz with 256 KB of flash memory",
      "54 digital I/O pins (15 PWM) and 16 analog inputs",
      "4 hardware serial ports, USB-B, 7–12 V input",
    ],
  },

  // ESP32 Boards
  {
    id: "IM1003",
    name: "ESP32 DevKit V1",
    category: "esp32-boards",
    price: 1650,
    stock: 31,
    blurb: "Wi-Fi + Bluetooth dev board, the IoT workhorse.",
    images: [
      wm("ESP32_Dev_Board.jpg"),
      wm("Espressif_ESP-WROOM-32_Wi-Fi_&_Bluetooth_Module.jpg"),
      wm("ESP32_Espressif_ESP-WROOM-32_Shielded.jpg"),
    ],
    specs: [
      "Dual-core Xtensa LX6 at 240 MHz, 520 KB SRAM",
      "Wi-Fi 802.11 b/g/n plus Bluetooth 4.2 and BLE",
      "38 pins, micro-USB, 3.3 V logic",
    ],
  },
  {
    id: "IM1004",
    name: "ESP32-CAM (OV2640)",
    category: "esp32-boards",
    price: 2100,
    stock: 9,
    blurb: "Onboard camera module, ready for vision projects.",
    images: [
      wm("ESP32-CAM.jpg"),
      wm("ESP32_cam_conectada_con_cables_puente.png"),
    ],
    specs: [
      "ESP32-S chip with a 2 MP OV2640 camera",
      "microSD card slot and an onboard LED flash",
      "No USB — flash it with a 5 V FTDI adapter",
    ],
  },
  {
    id: "IM1005",
    name: "ESP32-S3 DevKit",
    category: "esp32-boards",
    price: 2450,
    stock: 4,
    blurb: "Newer S3 core with more GPIO and AI acceleration.",
    images: [
      wm("ESP32-S3_on_paper.jpg"),
      wm("Espressif_esp32-s3-f_mcmaster_mz_mit20x.jpg"),
    ],
    specs: [
      "Dual-core Xtensa LX7 at 240 MHz",
      "Vector instructions for AI / ML workloads",
      "44 GPIO, native USB-OTG, Wi-Fi and BLE 5",
    ],
  },

  // Boost Converters
  {
    id: "IM1006",
    name: "MT3608 Boost Converter Module",
    category: "boost-converters",
    price: 180,
    stock: 40,
    blurb: "2A step-up module, 2–24V input range.",
    images: [CONVERTER_IMG],
    specs: [
      "Steps 2–24 V up to a 5–28 V output",
      "Up to 2 A output, ~1.2 MHz switching",
      "Trimmer-set voltage on a 36 × 17 mm board",
    ],
  },
  {
    id: "IM1007",
    name: "XL6009 DC-DC Boost Converter",
    category: "boost-converters",
    price: 320,
    stock: 22,
    blurb: "High-power step-up converter for motor and LED rigs.",
    images: [CONVERTER_IMG],
    specs: [
      "Wide 3–32 V input, output up to 35 V",
      "4 A peak switch current, 400 kHz",
      "Heat-sinked IC for motor and LED loads",
    ],
  },
  {
    id: "IM1008",
    name: "USB 5V to 12V Boost Module",
    category: "boost-converters",
    price: 450,
    stock: 3,
    blurb: "Power 12V gear straight from a USB bank.",
    images: [CONVERTER_IMG],
    specs: [
      "USB / 5 V input, fixed 12 V regulated output",
      "Delivers up to about 1 A (12 W)",
      "Barrel-jack output lead, plug-and-play",
    ],
  },

  // Buck (Down) Converters
  {
    id: "IM1009",
    name: "LM2596 Buck Converter Module",
    category: "buck-converters",
    price: 220,
    stock: 35,
    blurb: "Adjustable step-down module, the go-to for 12V→5V.",
    images: [CONVERTER_IMG],
    specs: [
      "Steps 4–40 V down to 1.25–37 V output",
      "3 A continuous (add a heatsink above 2 A)",
      "Multi-turn trimmer, 43 × 21 mm board",
    ],
  },
  {
    id: "IM1010",
    name: "MP1584EN Mini Buck Converter",
    category: "buck-converters",
    price: 260,
    stock: 14,
    blurb: "Tiny footprint, 3A output for space-tight builds.",
    images: [CONVERTER_IMG],
    specs: [
      "4.5–28 V input, adjustable down to 0.8 V",
      "3 A output in a 22 × 17 mm footprint",
      "1.5 MHz switching, around 92% efficiency",
    ],
  },
  {
    id: "IM1011",
    name: "XL4015 5A Buck Converter",
    category: "buck-converters",
    price: 480,
    stock: 6,
    blurb: "High-current step-down with digital display option.",
    images: [CONVERTER_IMG],
    specs: [
      "8–36 V input, 1.25–32 V adjustable output",
      "5 A continuous with the onboard heatsink",
      "Constant-current / voltmeter versions available",
    ],
  },

  // Electronics
  {
    id: "IM1012",
    name: "Breadboard 830 Point",
    category: "electronics",
    price: 350,
    stock: 50,
    blurb: "Full-size solderless breadboard for prototyping.",
    images: [
      wm("400_points_breadboard.jpg"),
      wm("Metal_contacts_within_a_breadboard.jpg"),
    ],
    specs: [
      "830 tie points: 630 in the field plus two power rails",
      "0.1 in (2.54 mm) pitch, fits standard DIP ICs",
      "Self-adhesive back with interlocking side rails",
    ],
  },
  {
    id: "IM1013",
    name: "Soldering Iron Kit 60W",
    category: "electronics",
    price: 1800,
    stock: 11,
    blurb: "Adjustable-temp iron with stand, solder and tips.",
    images: [
      wm("Soldering_iron_(UK_Plug).jpg"),
      wm("Soldering_Iron_Stand_made_with_China_clay_-2_(cropped).jpg"),
    ],
    specs: [
      "60 W ceramic heater, adjustable 200–450 °C",
      "Includes stand, 5 tips, solder wire and a pump",
      "Runs on 220–240 V AC mains",
    ],
  },
  {
    id: "IM1014",
    name: "Digital Multimeter DT830B",
    category: "electronics",
    price: 950,
    stock: 2,
    blurb: "Voltage, current and continuity testing essentials.",
    images: [
      wm("Digital_Multimeter_Aka.jpg"),
      wm("Digital_universal_multimeter_(ubt).jpeg"),
    ],
    specs: [
      "DC volts/amps, AC volts, resistance, diode and hFE",
      "3½-digit LCD, 1999 count, manual range selection",
      "Powered by a 9 V (6F22) battery, fused input",
    ],
  },

  // Batteries
  {
    id: "IM1015",
    name: "18650 Li-ion Battery 3.7V",
    category: "batteries",
    price: 390,
    stock: 60,
    blurb: "Rechargeable cell for portable and battery-pack builds.",
    images: [
      wm("18650_and_21700_lithium_ion_battery_cell.jpg"),
      wm("18650_Li-ion_&_Panasonic_CR123A_20121116.jpg"),
    ],
    specs: [
      "3.7 V nominal Li-ion, roughly 2000–2600 mAh",
      "18 × 65 mm cell, flat or button top",
      "About 500 charge cycles — use a protection circuit",
    ],
  },
  {
    id: "IM1016",
    name: "9V Alkaline Battery",
    category: "batteries",
    price: 220,
    stock: 45,
    blurb: "Standard 9V for Arduino and sensor projects.",
    images: [wm("Nine_Volt_Battery.JPG"), wm("Duracell_9_Volt_0849.jpg")],
    specs: [
      "9 V, 6LR61 / 6F22 form factor",
      "About 550 mAh capacity, non-rechargeable",
      "Snap connector suits Arduino and smoke alarms",
    ],
  },
  {
    id: "IM1017",
    name: "LiPo Battery 7.4V 1500mAh",
    category: "batteries",
    price: 1250,
    stock: 5,
    blurb: "2S pack for robots, drones and RC builds.",
    images: [wm("AGAC5200_60C_3S2P.jpg"), wm("AGAC5200_50C_2S2P.jpg")],
    specs: [
      "2S (7.4 V) 1500 mAh, around 25C discharge",
      "Main lead plus a balance plug for charging",
      "Needs a balance charger; store at 3.8 V per cell",
    ],
  },

  // Wires
  {
    id: "IM1018",
    name: "Jumper Wires M-M (40pcs)",
    category: "wires",
    price: 190,
    stock: 70,
    blurb: "Male-to-male breadboard jumpers, 20cm.",
    images: JUMPER_IMGS,
    specs: [
      "40 male-to-male DuPont leads per pack",
      "About 20 cm long, 24 AWG stranded, ribbon-split",
      "2.54 mm ends for breadboards and headers",
    ],
  },
  {
    id: "IM1019",
    name: "Jumper Wires M-F (40pcs)",
    category: "wires",
    price: 190,
    stock: 55,
    blurb: "Male-to-female breadboard jumpers, 20cm.",
    images: JUMPER_IMGS,
    specs: [
      "40 male-to-female DuPont leads per pack",
      "About 20 cm long, 24 AWG stranded",
      "Extends header pins out to a breadboard",
    ],
  },
  {
    id: "IM1020",
    name: "Silicone Wire 22AWG (5m)",
    category: "wires",
    price: 350,
    stock: 8,
    blurb: "Flexible, heat-resistant hookup wire.",
    images: [wm("A_few_Jumper_Wires.jpg")],
    specs: [
      "5 m of 22 AWG tinned-copper stranded wire",
      "Silicone jacket rated −60 to 200 °C",
      "Very flexible, 600 V insulation rating",
    ],
  },

  // Sensors
  {
    id: "IM1021",
    name: "HC-SR04 Ultrasonic Sensor",
    category: "sensors",
    price: 280,
    stock: 33,
    blurb: "Distance sensing for robotics and automation.",
    images: [
      "/images/Ultrasonic_sensor/61NL0qA3P0S.jpg",
      "/images/Ultrasonic_sensor/RM000788.jpg",
    ],
    specs: [
      "2–400 cm range with about 3 mm resolution",
      "Trigger / Echo pins, 5 V supply, ~15 mA",
      "40 kHz ultrasonic burst, roughly 15° beam",
    ],
  },
  {
    id: "IM1022",
    name: "DHT11 Temperature & Humidity Sensor",
    category: "sensors",
    price: 320,
    stock: 27,
    blurb: "Reliable climate sensing for weather stations.",
    images: [
      wm("Dht11.jpg"),
      wm("Dht11_term_and_humidity_sensor.jpg"),
      wm("Arduino_uno_dht11.jpg"),
    ],
    specs: [
      "Temperature 0–50 °C (±2 °C), humidity 20–90% (±5%)",
      "Single-wire digital bus, one reading per second",
      "Works on a 3.3–5.5 V supply",
    ],
  },
  {
    id: "IM1023",
    name: "PIR Motion Sensor HC-SR501",
    category: "sensors",
    price: 260,
    stock: 1,
    blurb: "Detects movement for security and automation.",
    images: [
      wm("PIR_Sensor_Design_SN-PR15.jpg"),
      wm("PIR_Motion_Sensor-Sensinova_(SN-PR11).png"),
    ],
    specs: [
      "3–7 m adjustable range over a 110° cone",
      "Delay tunable 3 s–5 min, retrigger jumper",
      "4.5–20 V input, 3.3 V TTL output",
    ],
  },
  {
    id: "IM1033",
    name: "IR Infrared Obstacle Avoidance Sensor",
    category: "sensors",
    price: 180,
    stock: 26,
    blurb: "Line-following and obstacle detection for robots.",
    images: ["/images/IR_sensor/ir.jpg"],
    specs: [
      "Adjustable 2–30 cm detection range via trimmer pot",
      "Digital LOW output when an obstacle is detected",
      "3.3–5 V supply, onboard power and signal LEDs",
    ],
  },

  // LEDs
  {
    id: "IM1024",
    name: "5mm LED Assorted Colors (50pcs)",
    category: "leds",
    price: 250,
    stock: 48,
    blurb: "Mixed-colour indicator LEDs for any panel.",
    images: LED_IMGS,
    specs: [
      "50 pieces: red, green, blue, yellow and white",
      "5 mm diffused lens, ~20 mA, 2.0–3.2 V forward",
      "Through-hole with a longer anode leg",
    ],
  },
  {
    id: "IM1025",
    name: "WS2812B RGB LED Strip (1m)",
    category: "leds",
    price: 890,
    stock: 16,
    blurb: "Individually addressable strip for lighting effects.",
    images: [
      wm("16346-SMD_LED_-_RGB_WS2812B_Strip_of_50_-01.jpg"),
      wm("Pack1_-_BTF-WS2812B_-_John_McMaster.jpg"),
    ],
    specs: [
      "30 addressable RGB LEDs per metre",
      "5 V supply, single-wire data, ~0.3 W per LED",
      "Cuttable at every LED on a flexible PCB",
    ],
  },
  {
    id: "IM1026",
    name: "High Power LED 3W White",
    category: "leds",
    price: 150,
    stock: 6,
    blurb: "Bright single-die LED for flashlights and panels.",
    images: LED_IMGS,
    specs: [
      "3 W white, about 200–240 lm at 6000–6500 K",
      "Forward voltage ~3.2–3.4 V at 700 mA",
      "Mounted on a 10 mm star PCB — needs a heatsink",
    ],
  },

  // Motors
  {
    id: "IM1027",
    name: "DC Geared Motor 6V",
    category: "motors",
    price: 350,
    stock: 29,
    blurb: "Torque-geared motor for small robot chassis.",
    images: [SERVO_IMG],
    specs: [
      "3–6 V DC, about 200 rpm at 6 V (48:1 gearbox)",
      "~0.8 kg·cm torque, ~150 mA free-running",
      "Dual shaft, fits TT wheels and chassis kits",
    ],
  },
  {
    id: "IM1028",
    name: "SG90 Micro Servo Motor",
    category: "motors",
    price: 420,
    stock: 12,
    blurb: "180° servo for arms, grippers and steering.",
    images: [SERVO_IMG],
    specs: [
      "About 180° travel, ~1.8 kg·cm torque at 4.8 V",
      "50 Hz PWM control, 1–2 ms pulse width",
      "4.8–6 V, 3-wire JR connector, weighs 9 g",
    ],
  },
  {
    id: "IM1029",
    name: "NEMA17 Stepper Motor",
    category: "motors",
    price: 2200,
    stock: 3,
    blurb: "Precision stepper for CNC and 3D-printer builds.",
    images: [wm("Nema17.JPG")],
    specs: [
      "1.8° per step (200 steps/rev), bipolar",
      "~4 kg·cm holding torque at 1.5 A per phase",
      "42 mm body with a 5 mm D-shaft",
    ],
  },

  // Wheels
  {
    id: "IM1030",
    name: "Robot Smart Car Wheel 65mm",
    category: "wheels",
    price: 320,
    stock: 20,
    blurb: "Rubber-tyred wheel sized for geared motors.",
    images: WHEEL_IMGS,
    specs: [
      "65 mm diameter with a 27 mm-wide rubber tyre",
      "Press-fits a TT gear-motor D-shaft",
      "Moulded hub with good grip on smooth floors",
    ],
  },
  {
    id: "IM1031",
    name: "Rubber Wheel with DC Motor Mount",
    category: "wheels",
    price: 480,
    stock: 9,
    blurb: "Wheel and motor bracket sold as a matched set.",
    images: WHEEL_IMGS,
    specs: [
      "Wheel plus a matched motor bracket and screws",
      "For 3–6 V TT / N20-style gear motors",
      "About 65 mm wheel for quick chassis mounting",
    ],
  },
  {
    id: "IM1032",
    name: "Omni Wheel 58mm",
    category: "wheels",
    price: 650,
    stock: 4,
    blurb: "Multi-directional wheel for holonomic drive robots.",
    images: WHEEL_IMGS,
    specs: [
      "58 mm diameter with two staggered rows of rollers",
      "Rolls sideways for holonomic (omni) drive",
      "6 mm bore hub, around 3 kg load rating",
    ],
  },
];

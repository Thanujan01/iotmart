// Category catalogue. `icon` refers to a lucide-react icon name handled in
// src/components/CategoryIcon.jsx — keep the two files in sync if you add a
// category here.
export const CATEGORIES = [
  { slug: "arduino-boards", label: "Arduino Boards", icon: "Cpu" },
  { slug: "esp32-boards", label: "ESP32 Boards", icon: "Wifi" },
  { slug: "boost-converters", label: "Boost Converters", icon: "ArrowUpCircle" },
  { slug: "buck-converters", label: "Buck Converters", icon: "ArrowDownCircle" },
  { slug: "electronics", label: "Electronics", icon: "CircuitBoard" },
  { slug: "batteries", label: "Batteries", icon: "BatteryFull" },
  { slug: "wires", label: "Wires", icon: "Cable" },
  { slug: "sensors", label: "Sensors", icon: "Radar" },
  { slug: "leds", label: "LEDs", icon: "Lightbulb" },
  { slug: "motors", label: "Motors", icon: "RotateCw" },
  { slug: "wheels", label: "Wheels", icon: "Disc" },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
);

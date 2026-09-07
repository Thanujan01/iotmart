import {
  ArrowDownCircle,
  ArrowUpCircle,
  BatteryFull,
  Cable,
  CircuitBoard,
  Cpu,
  Disc,
  Lightbulb,
  Radar,
  RotateCw,
  Wifi,
} from "lucide-react";

const ICONS = {
  Cpu,
  Wifi,
  ArrowUpCircle,
  ArrowDownCircle,
  CircuitBoard,
  BatteryFull,
  Cable,
  Radar,
  Lightbulb,
  RotateCw,
  Disc,
};

export default function CategoryIcon({ name, className }) {
  const Icon = ICONS[name] || CircuitBoard;
  return <Icon className={className} strokeWidth={1.75} />;
}

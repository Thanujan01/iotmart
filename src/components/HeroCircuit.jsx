export default function HeroCircuit() {
  return (
    <svg
      viewBox="0 0 520 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <g stroke="#1c42c9" strokeOpacity="0.35" strokeWidth="2">
        <path
          d="M40 60 H200 V140 H340"
          className="animate-trace"
          style={{ strokeDasharray: 240, strokeDashoffset: 240 }}
        />
        <path
          d="M480 40 H360 V180 H180 V260"
          className="animate-trace"
          style={{ strokeDasharray: 300, strokeDashoffset: 300, animationDelay: "150ms" }}
        />
        <path
          d="M30 300 H160 V380 H320 V320 H460"
          className="animate-trace"
          style={{ strokeDasharray: 340, strokeDashoffset: 340, animationDelay: "300ms" }}
        />
        <path
          d="M340 140 V260 H460 V320"
          className="animate-trace"
          style={{ strokeDasharray: 260, strokeDashoffset: 260, animationDelay: "450ms" }}
        />
      </g>

      {[
        [40, 60, "10"],
        [200, 60, "6"],
        [340, 140, "8"],
        [480, 40, "6"],
        [360, 180, "8"],
        [180, 260, "10"],
        [30, 300, "6"],
        [160, 380, "8"],
        [320, 380, "6"],
        [460, 320, "10"],
      ].map(([cx, cy, r], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill={i % 3 === 0 ? "#22d3c4" : "#2456e6"}
          className="animate-pulseglow"
          style={{ animationDelay: `${i * 180}ms` }}
        />
      ))}
    </svg>
  );
}

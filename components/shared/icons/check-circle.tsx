export default function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      viewBox="0 0 1024 1024"
      fill="currentColor"
    >
      <defs>
        <linearGradient id="gc" x1="0%" y1="0%" x2="100%" y2="45%">
          <stop offset="0%" style={{ stopColor: "#166534", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#22c55e", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <path
        fill="url(#gc)"
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
      />
    </svg>
  );
}

export default function ExternalLink({ className, color }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

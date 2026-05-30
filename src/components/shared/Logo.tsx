export const Logo = ({ size = 36 }: { size?: number }) => (
  <div className="auth-card__logo" aria-hidden="true">
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="10" fill="#6366F1" />
      <path
        d="M10 18L15.5 23.5L26 12"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="26" cy="12" r="3" fill="#818CF8" />
    </svg>
  </div>
);

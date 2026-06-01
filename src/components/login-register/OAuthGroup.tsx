interface OAuthGroupProps {
  label?: string;
  onGoogleClick?: () => void;
}

export const OAuthGroup = ({
  label = "Sign in",
  onGoogleClick,
}: OAuthGroupProps) => (
  <div className="oauth-group">
    <button
      className="btn btn--oauth"
      type="button"
      aria-label={`${label} with Google`}
      onClick={onGoogleClick}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* SVG COMPLETO DE GOOGLE */}
      </svg>

      <span>Google</span>
    </button>

    <button
      className="btn btn--oauth"
      type="button"
      aria-label={`${label} with GitHub`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* SVG COMPLETO DE GITHUB */}
      </svg>

      <span>GitHub</span>
    </button>
  </div>
);

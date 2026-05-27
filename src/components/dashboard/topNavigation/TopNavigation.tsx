import { Avatar } from "../../avatar";

export const TopNavigation = () => (
  <header className="top-nav" role="banner">
    <div className="top-nav__brand">
      <div className="top-nav__logo" aria-hidden="true">
        <svg
          width="28"
          height="28"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
      <span className="top-nav__app-name">SynTask</span>
    </div>

    <nav className="top-nav__links" aria-label="Main navigation">
      <ul className="top-nav__link-list">
        <li>
          <a
            className="top-nav__link top-nav__link--active"
            href="#"
            aria-current="page"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="1"
                y="1"
                width="6"
                height="6"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <rect
                x="9"
                y="1"
                width="6"
                height="6"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <rect
                x="1"
                y="9"
                width="6"
                height="6"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <rect
                x="9"
                y="9"
                width="6"
                height="6"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
            Dashboard
          </a>
        </li>
        <li>
          <a className="top-nav__link" href="#preview-projects">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 3h12v10H2z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <path
                d="M5 3V1M11 3V1"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <path d="M2 6h12" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            Projects
          </a>
        </li>
        <li>
          <a className="top-nav__link" href="#">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="8"
                cy="5"
                r="3"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            Team
          </a>
        </li>
        <li>
          <a className="top-nav__link" href="#">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 1v2M8 13v2M3.22 3.22l1.42 1.42M11.36 11.36l1.42 1.42M1 8h2M13 8h2M3.22 12.78l1.42-1.42M11.36 4.64l1.42-1.42"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <circle
                cx="8"
                cy="8"
                r="3"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
            Analytics
          </a>
        </li>
      </ul>
    </nav>

    <div className="top-nav__actions">
      <button
        className="top-nav__icon-btn"
        type="button"
        aria-label="Notifications (3 unread)"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 1.5A5.5 5.5 0 003.5 7v3.5L2 12.5h14l-1.5-2V7A5.5 5.5 0 009 1.5z"
            stroke="#0F172A"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M7 12.5a2 2 0 004 0" stroke="#0F172A" strokeWidth="1.3" />
        </svg>
        <span className="top-nav__badge" aria-hidden="true">
          3
        </span>
      </button>

      <button className="top-nav__icon-btn" type="button" aria-label="Search">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="5.5" stroke="#0F172A" strokeWidth="1.3" />
          <path
            d="M12.5 12.5L16 16"
            stroke="#0F172A"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <button
        className="top-nav__avatar-btn"
        type="button"
        aria-label="User account menu"
        aria-haspopup="true"
      >
        <Avatar initials="JS" size="md" />
        <div className="top-nav__user-info">
          <span className="top-nav__user-name">Jane Smith</span>
          <span className="top-nav__user-role">Product Designer</span>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 5l4 4 4-4"
            stroke="#64748B"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  </header>
);

import { useEffect, useRef, useState } from "react";
import { Avatar } from "../../avatar";
import "./Topnavigation.css";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../features/auth/AuthService";
import { useAuth } from "../../../features/auth/Authenticator";
import {
  getUserDisplayName,
  getUserInitials,
} from "../../../utils/UserHelpers";

type NotificationItem = {
  id: string;
  title: string;
  deadline: string;
  daysLeft: number;
  overdue: boolean;
};

interface TopNavigationProps {
  notifications?: NotificationItem[];
  onNotificationClick?: (id: string) => void;
}

export const TopNavigation = ({
  notifications = [],
  onNotificationClick,
}: TopNavigationProps) => {
  const { user } = useAuth();

  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(user);

  const [showMenu, setShowMenu] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotif(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setShowMenu(false);

      await logoutUser();

      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
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
              Dashboard
            </a>
          </li>

          <li>
            <a className="top-nav__link" href="#preview-projects">
              Projects
            </a>
          </li>

          <li>
            <a className="top-nav__link" href="#">
              Team
            </a>
          </li>

          <li>
            <a className="top-nav__link" href="#">
              Analytics
            </a>
          </li>
        </ul>
      </nav>

      <div className="top-nav__actions">
        <div ref={notifRef} className="top-nav__notif">
          <button
            className="top-nav__icon-btn"
            type="button"
            aria-label={`Notifications (${notifications.length} unread)`}
            onClick={() => setShowNotif((s) => !s)}
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
              <path
                d="M7 12.5a2 2 0 004 0"
                stroke="#0F172A"
                strokeWidth="1.3"
              />
            </svg>

            {notifications.length > 0 && (
              <span className="top-nav__badge" aria-hidden="true">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotif && (
            <div className="top-nav__notif-dropdown">
              {notifications.length === 0 ? (
                <div className="top-nav__notif-empty">No notifications</div>
              ) : (
                notifications.map((n) => (
                  <button
                    key={n.id}
                    className="top-nav__notif-item"
                    type="button"
                    onClick={() => {
                      setShowNotif(false);
                      onNotificationClick && onNotificationClick(n.id);
                    }}
                  >
                    <div className="top-nav__notif-title">{n.title}</div>
                    <div className="top-nav__notif-meta">
                      {n.overdue
                        ? `Overdue ${Math.abs(n.daysLeft)}d`
                        : n.daysLeft === 0
                          ? "Expira Hoy"
                          : `Expira en ${n.daysLeft}d`}
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

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
          aria-expanded={showMenu}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Avatar initials={initials} size="md" />

          <div className="top-nav__user-info">
            <span className="top-nav__user-name">{displayName}</span>
            <span className="top-nav__user-role">
              {user?.email ?? "No email"}
            </span>
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

        {showMenu && (
          <div className="top-nav__dropdown">
            <button className="top-nav__dropdown-item" type="button">
              Edit Profile
            </button>

            <button
              className="top-nav__dropdown-item top-nav__dropdown-item--danger"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

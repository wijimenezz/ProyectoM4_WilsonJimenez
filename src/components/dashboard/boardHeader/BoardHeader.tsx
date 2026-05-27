import { PlusIcon } from "../../shared/icons";

export const BoardHeader = () => (
  <div className="board-header">
    <div className="board-header__title-area">
      <div className="board-header__breadcrumb" aria-label="Breadcrumb">
        <span>Projects</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 3l3 3-3 3"
            stroke="#64748B"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Website Redesign</span>
      </div>
      <h2 className="board-header__title">Website Redesign</h2>
      <p className="board-header__subtitle">Q1 2026 · 12 tasks · 4 members</p>
    </div>

    <div className="board-header__actions">
      <div className="view-toggle" role="group" aria-label="Board view">
        <button
          className="view-toggle__btn view-toggle__btn--active"
          type="button"
          aria-label="Kanban view"
          aria-pressed="true"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="1"
              y="1"
              width="3.5"
              height="12"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <rect
              x="5.5"
              y="1"
              width="3.5"
              height="8"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <rect
              x="10"
              y="1"
              width="3.5"
              height="10"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </button>
        <button
          className="view-toggle__btn"
          type="button"
          aria-label="List view"
          aria-pressed="false"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 3h8M3 7h8M3 11h8"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <button className="btn btn--secondary btn--sm" type="button">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="7" cy="7" r="1.2" fill="currentColor" />
          <circle cx="7" cy="3" r="1.2" fill="currentColor" />
          <circle cx="7" cy="11" r="1.2" fill="currentColor" />
        </svg>
        Add Column
      </button>

      <button className="btn btn--primary btn--sm" type="button">
        <PlusIcon color="white" strokeWidth={1.8} />
        New Task
      </button>
    </div>
  </div>
);

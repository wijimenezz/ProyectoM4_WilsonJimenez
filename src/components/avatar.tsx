import { UnassignedIcon } from "./shared/icons";

type AvatarSize = "sm" | "md" | "xl";

interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  offset?: boolean;
  unassigned?: boolean;
  label?: string;
}

export const Avatar = ({
  initials,
  size = "sm",
  offset = false,
  unassigned = false,
  label,
}: AvatarProps) => {
  const classes = [
    "avatar",
    `avatar--${size}`,
    offset ? "avatar--offset" : "",
    unassigned ? "avatar--unassigned" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes} aria-label={label}>
      {unassigned ? (
        <UnassignedIcon />
      ) : (
        <span className="avatar__initials">{initials}</span>
      )}
    </div>
  );
};

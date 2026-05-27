import {
  Mail,
  Lock,
  Eye,
  Clock,
  MoreVertical,
  MessageSquare,
  Plus,
  Calendar,
  Upload,
  X,
  Check,
  Search,
  ChevronDown,
  Star,
  UserCircle,
} from "lucide-react";

// ============================================================
// Fixed icons — no props needed, always the same size/color
// ============================================================

export const EmailIcon = () => (
  <Mail size={16} color="#64748B" strokeWidth={1.2} />
);

export const LockIcon = () => (
  <Lock size={16} color="#64748B" strokeWidth={1.2} />
);

export const EyeIcon = () => (
  <Eye size={16} color="#64748B" strokeWidth={1.2} />
);

export const CommentIcon = () => (
  <MessageSquare size={13} color="#64748B" strokeWidth={1.2} />
);

export const CalendarIcon = () => (
  <Calendar size={15} color="#64748B" strokeWidth={1.2} />
);

export const UploadIcon = () => (
  <Upload size={28} color="#6366F1" strokeWidth={1.4} />
);

export const CheckIcon = () => (
  <Check size={10} color="white" strokeWidth={1.4} />
);

export const UnassignedIcon = () => (
  <UserCircle size={12} color="#94A3B8" strokeWidth={1.1} />
);

// ============================================================
// Variable icons — accept props that change per usage
// ============================================================

export const ClockIcon = ({ color = "#64748B" }: { color?: string }) => (
  <Clock size={13} color={color} strokeWidth={1.2} />
);

export const DotsVerticalIcon = ({ size = 16 }: { size?: number }) => (
  <MoreVertical size={size} color="#64748B" strokeWidth={1.2} />
);

export const PlusIcon = ({
  size = 13,
  color = "currentColor",
  strokeWidth = 1.6,
}: {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) => <Plus size={size} color={color} strokeWidth={strokeWidth} />;

export const CloseIcon = ({ size = 10 }: { size?: number }) => (
  <X size={size} color="#64748B" strokeWidth={1.2} />
);

export const SearchIcon = ({ size = 15 }: { size?: number }) => (
  <Search size={size} color="#64748B" strokeWidth={1.2} />
);

export const ChevronDownIcon = ({ size = 12 }: { size?: number }) => (
  <ChevronDown size={size} color="#64748B" strokeWidth={1.3} />
);

export const StarIcon = ({ filled }: { filled: boolean }) => (
  <Star
    size={16}
    color={filled ? "#F59E0B" : "#94A3B8"}
    fill={filled ? "#F59E0B" : "none"}
    strokeWidth={1}
  />
);

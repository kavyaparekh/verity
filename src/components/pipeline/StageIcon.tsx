interface StageIconProps {
  name: "planning" | "drafting" | "governance" | "done";
}

export function StageIcon({ name }: StageIconProps) {
  switch (name) {
    case "planning":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M14.8 9.2 11 11l-1.8 3.8L13 13l1.8-3.8Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "drafting":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 18.5 15.5 9l2-2 1.5 1.5-2 2L7.5 20l-3 .5.5-2Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M14.5 10 16.5 12" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "governance":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 4.5 18.5 7v5.2c0 4-2.8 6.6-6.5 8.3-3.7-1.7-6.5-4.3-6.5-8.3V7L12 4.5Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M9.3 12.2 11.3 14.3 14.9 10.3"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "done":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 12.5 10 16.5 18 7.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

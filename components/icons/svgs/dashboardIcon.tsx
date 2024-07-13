export default function DashboardIcon({
  size,
  colour,
}: {
  size?: number;
  colour?: string;
}) {
  return (
    <svg
      width={size ?? "18"}
      height={size ?? "18"}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 1H1V5H7V1ZM1 0C0.447715 0 0 0.447715 0 1V5C0 5.55228 0.447715 6 1 6H7C7.55228 6 8 5.55228 8 5V1C8 0.447715 7.55228 0 7 0H1Z"
        className={colour ?? "fill-black dark:fill-white"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 13H11V17H17V13ZM11 12C10.4477 12 10 12.4477 10 13V17C10 17.5523 10.4477 18 11 18H17C17.5523 18 18 17.5523 18 17V13C18 12.4477 17.5523 12 17 12H11Z"
        className={colour ?? "fill-black dark:fill-white"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 9H1V17H7V9ZM1 8C0.447715 8 0 8.44772 0 9V17C0 17.5523 0.447715 18 1 18H7C7.55228 18 8 17.5523 8 17V9C8 8.44772 7.55228 8 7 8H1Z"
        className={colour ?? "fill-black dark:fill-white"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 1H11V9H17V1ZM11 0C10.4477 0 10 0.447716 10 1V9C10 9.55229 10.4477 10 11 10H17C17.5523 10 18 9.55228 18 9V1C18 0.447715 17.5523 0 17 0H11Z"
        className={colour ?? "fill-black dark:fill-white"}
      />
    </svg>
  );
}

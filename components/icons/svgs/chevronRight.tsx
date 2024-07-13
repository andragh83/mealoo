export default function ChevronRight({
  size,
  colour,
}: {
  size?: number;
  colour?: string;
}) {
  return (
    <svg
      width={size ?? "16"}
      height={size ?? "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0574 6.95103L5.53607 0.4297C4.96314 -0.143233 4.01948 -0.143233 3.44655 0.4297C2.87362 1.00263 2.87362 1.94629 3.44655 2.51922L8.90627 7.99579L3.4297 13.4724C2.85677 14.0453 2.85677 14.9889 3.4297 15.5619C3.71617 15.8483 4.10374 16 4.47446 16C4.86203 16 5.23275 15.8483 5.51922 15.5619L12.0405 9.04055C12.6303 8.46762 12.6303 7.52396 12.0574 6.95103Z"
        className={colour ?? "fill-black dark:fill-white"}
      />
    </svg>
  );
}

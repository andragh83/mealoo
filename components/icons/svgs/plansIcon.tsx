export default function PlansIcon({
  size,
  colour,
}: {
  size?: number;
  colour?: string;
}) {
  return (
    <svg
      width={size ?? "21"}
      height={size ? size * 1.142 : "24"}
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.2211 0H2.6787C1.20193 0 0 1.20155 0 2.6787V18.8388C0 20.3156 1.20154 21.5175 2.6787 21.5175H2.73948V23.6128C2.73948 23.7491 2.81109 23.8753 2.9276 23.945C2.98915 23.9814 3.05767 23.9999 3.12657 23.9999C3.18928 23.9999 3.25238 23.9848 3.30967 23.9539L4.67263 23.223L6.03714 23.9543C6.15714 24.0185 6.3023 24.0146 6.41882 23.9454C6.53572 23.8753 6.60695 23.7491 6.60695 23.6132V21.5179H20.2215C20.4352 21.5179 20.6086 21.3448 20.6086 21.1308V0.387096C20.6082 0.173419 20.4348 0 20.2211 0ZM19.834 16.1585H3.0658V0.774191H19.834V16.1585ZM0.774191 2.6787C0.774191 1.76129 1.42645 0.993288 2.29161 0.814062V16.1899C1.70245 16.2758 1.17406 16.5518 0.774191 16.9567V2.6787ZM5.83237 22.9664L4.85495 22.4423C4.79805 22.4117 4.73495 22.3966 4.67225 22.3966C4.60954 22.3966 4.54644 22.4121 4.48915 22.4426L3.51328 22.966V19.2259H5.83198L5.83237 22.9664ZM3.12657 18.4517C2.91289 18.4517 2.73948 18.6247 2.73948 18.8388V20.7433H2.6787C1.62851 20.7433 0.774191 19.889 0.774191 18.8388C0.774191 17.7878 1.62851 16.9327 2.6787 16.9327H19.834V18.4517H3.12657ZM6.60656 20.7433V19.2259H19.834V20.7433H6.60656Z"
        className={colour ?? "fill-black dark:fill-white"}
      />
      <path
        d="M5.99424 8.66175V13.7687C5.99424 14.2158 6.35811 14.5797 6.80559 14.5797H16.0951C16.5426 14.5797 16.9065 14.2162 16.9065 13.7687V8.66175C17.6683 8.10395 18.1169 7.22602 18.1169 6.2726C18.1169 4.63867 16.788 3.30899 15.1549 3.30899C14.7279 3.30899 14.3087 3.40074 13.9251 3.57609C13.303 2.86732 12.4007 2.45312 11.4515 2.45312C10.5008 2.45312 9.59849 2.86732 8.97643 3.57609C8.59204 3.40074 8.17282 3.30899 7.74624 3.30899C6.11269 3.30899 4.78418 4.63867 4.78418 6.2726C4.78341 7.22602 5.23205 8.10395 5.99424 8.66175ZM16.0951 13.8055H6.80559C6.78624 13.8055 6.76843 13.7881 6.76843 13.7687V12.6523H16.1319V13.7687C16.1323 13.7881 16.1145 13.8055 16.0951 13.8055ZM7.74585 4.08318C8.14688 4.08318 8.53862 4.19235 8.87888 4.39906C9.0523 4.50434 9.27797 4.45751 9.39565 4.29183C9.8683 3.62525 10.6367 3.22732 11.4511 3.22732C12.2644 3.22732 13.032 3.62525 13.5054 4.29222C13.6227 4.45789 13.848 4.50512 14.0222 4.39906C14.3621 4.19235 14.7538 4.08318 15.1549 4.08318C16.3614 4.08318 17.3427 5.06525 17.3427 6.2726C17.3427 7.03092 16.958 7.72498 16.3138 8.12911C16.2008 8.19995 16.1323 8.32382 16.1323 8.45698V11.8785H14.4875V10.4242C14.4875 10.2105 14.3141 10.0371 14.1004 10.0371C13.8867 10.0371 13.7133 10.2105 13.7133 10.4242V11.8785H11.8382V10.4242C11.8382 10.2105 11.6648 10.0371 11.4511 10.0371C11.2375 10.0371 11.064 10.2105 11.064 10.4242V11.8785H9.18739V10.4242C9.18739 10.2105 9.01398 10.0371 8.8003 10.0371C8.58662 10.0371 8.4132 10.2105 8.4132 10.4242V11.8785H6.76843V8.45698C6.76843 8.32382 6.69992 8.19956 6.58689 8.12911C5.94237 7.72537 5.5576 7.03131 5.5576 6.2726C5.5576 5.06525 6.53927 4.08318 7.74585 4.08318Z"
        className={colour ?? "fill-black dark:fill-white"}
      />
    </svg>
  );
}

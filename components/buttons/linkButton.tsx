import Link from "next/link";

export default function LinkButton({
  url,
  text,
  extraBtnStyle,
  extraBtnTextStyle,
  icon,
}: {
  url: string;
  text: string;
  extraBtnStyle?: string;
  extraBtnTextStyle?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={url}
      className={`rounded-md px-[18px] py-[12px] flex justify-center items-center gap-4 ${
        extraBtnStyle ?? ""
      } `}
    >
      {icon ?? null}
      <p
        className={`font-raleway text-base text-center whitespace-nowrap ${
          extraBtnTextStyle ?? ""
        } `}
      >
        {text}
      </p>
    </Link>
  );
}

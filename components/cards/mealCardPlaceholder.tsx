import Image from "next/image";
import { IDayMeal, IMeal } from "./types";
import { dayIcons } from "./cardElements/cardIcons";
export default function MealCardPlaceholder({
  variant,
}: {
  variant: IDayMeal;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-[16px]">
      <div
        className={`w-full md:w-[200px] md:min-w-[200px] md:min-h-[200px] py-4 h-full flex flex-col items-center justify-center gap-[10px] rounded-lg ${
          variant === "lunch"
            ? `bg-lunch`
            : variant === "breakfast"
            ? `bg-breakfast`
            : `bg-dinner`
        }`}
      >
        <p className="font-raleway text-[20px] uppercase dark:text-black">
          {variant}
        </p>
        <div className="hidden md:block">
          <Image
            src={dayIcons[variant]}
            width={100}
            height={100}
            alt={variant}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[16px] w-full">
        <div className="w-full h-10 md:h-12 rounded-sm bg-neutral-50 dark:bg-zinc-600"></div>
        <div className="w-full h-full rounded-sm bg-neutral-50 dark:bg-zinc-600"></div>
        <div className="w-full h-20 rounded-sm bg-neutral-50 dark:bg-zinc-600"></div>
      </div>
    </div>
  );
}

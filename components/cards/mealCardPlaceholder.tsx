import Image from "next/image";
import { IDayMeal, IMeal } from "./types";
import { dayIcons } from "./cardElements/cardIcons";
export default function MealCardPlaceholder({
  variant,
}: {
  variant: IDayMeal;
}) {
  return (
    <div className="flex gap-[16px] h-[230px] w-full">
      <div
        className={`w-[200px] min-w-[200px] h-full flex flex-col items-center justify-center gap-[10px] rounded-lg ${`bg-${variant}`} `}
      >
        <p className="font-raleway text-[20px] uppercase dark:text-black">
          {variant}
        </p>
        <Image src={dayIcons[variant]} width={100} height={100} alt={variant} />
      </div>
      <div className="flex flex-col gap-[16px] w-full">
        <div className="w-full h-12 rounded-sm bg-neutral-50 dark:bg-zinc-600"></div>
        <div className="w-full h-full rounded-sm bg-neutral-50 dark:bg-zinc-600"></div>
        <div className="w-full h-20 rounded-sm bg-neutral-50 dark:bg-zinc-600"></div>
      </div>
    </div>
  );
}

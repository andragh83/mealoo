import { IRecipeDetail } from "../types";
import Image from "next/image";
import { mealIcons } from "./cardIcons";

export default function DayLineWithIcon({
  meal_name,
  variant,
}: {
  meal_name: string;
  variant: IRecipeDetail;
}) {
  return (
    <div className="flex w-full">
      <div className="flex gap-4">
        <Image src={mealIcons[variant]} width={24} height={24} alt={variant} />{" "}
        <p className="font-raleway_light text-base capitalize">{meal_name}</p>
      </div>
    </div>
  );
}

import prep_time from "../../icons/pngs/clock.png";
import cooking_time from "../../icons/pngs/cookTime.png";
import cost from "../../icons/pngs/cost.png";
import calories from "../../icons/pngs/kcal.png";
import { IRecipeDetail } from "../types";
import Image from "next/image";

const images = {
  prep_time,
  cooking_time,
  cost,
  calories,
};
export default function MealLineWithIcon({
  detail,
  variant,
}: {
  detail: string;
  variant: IRecipeDetail;
}) {
  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-4">
        <Image src={images[variant]} width={24} height={24} alt={variant} />{" "}
        <p className="font-raleway_light text-base capitalize">
          {variant.replace("_", "")}
        </p>
      </div>
      <p className="font-raleway-bold text-sm">{detail}</p>
    </div>
  );
}

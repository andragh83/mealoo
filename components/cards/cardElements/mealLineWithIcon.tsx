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
  sm,
}: {
  detail: string;
  variant: IRecipeDetail;
  sm?: boolean;
}) {
  return (
    <div className="flex w-full justify-between">
      <div className={`flex gap-4`}>
        <div className="min-w-6 flex justify-center">
          <Image
            src={images[variant]}
            width={sm ? 18 : 24}
            height={sm ? 18 : 24}
            alt={variant}
            objectFit="contain"
            className="dark:invert"
          />
        </div>
        <p
          className={`font-raleway_light ${
            sm ? "text-sm" : "text-base"
          } capitalize`}
        >
          {variant.replace("_", "")}
        </p>
      </div>
      <p className={`font-raleway-bold  ${sm ? "text-sm" : "text-base"}`}>
        {detail}
      </p>
    </div>
  );
}

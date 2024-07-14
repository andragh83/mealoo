import Image from "next/image";
import { IDayMeal, IDaysOfTheWeek } from "./types";
import { dayIcons } from "./cardElements/cardIcons";

export default function DayCard({
  dayOfTheWeek,
  meals,
}: {
  dayOfTheWeek: IDaysOfTheWeek;
  meals: { [key in IDayMeal]: string };
}) {
  return (
    <div className="flex flex-col rounded-lg w-[300px] ">
      <div className={`px-4 py-2 rounded-t-lg ${`bg-pastel_teal`}`}>
        <p className="font-raleway text-[20px] capitalize">{dayOfTheWeek}</p>
      </div>
      <div className="flex flex-col gap-[12px] p-4 rounded-b-lg bg-white dark:bg-gray-800 shadow-md">
        {Object.entries(meals).map(([key, meal]) => {
          return (
            <div className="flex items-center gap-[12px]">
              <div
                className={`flex items-center justify-center p-1 rounded-sm ${`bg-${key}`}`}
              >
                <Image
                  src={dayIcons[key as IDayMeal]}
                  width={24}
                  height={24}
                  alt={key}
                />
              </div>
              <p className="font-raleway_light text-base">{meal}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

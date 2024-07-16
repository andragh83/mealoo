import Image from "next/image";
import { IDayMeal, IDaysOfTheWeek, IMeal } from "./types";
import { dayIcons } from "./cardElements/cardIcons";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DayCard({
  dayOfTheWeek,
  meals,
  planid,
}: {
  dayOfTheWeek: IDaysOfTheWeek;
  meals: { [key: string]: IMeal | undefined };
  planid: string;
}) {
  const mealsToShow =
    meals && meals["breakfast"] && meals["breakfast"].recipe_name
      ? meals
      : undefined;

  const router = useRouter();

  return (
    <div className="flex flex-col rounded-lg w-full ">
      <div className={`px-4 py-2 rounded-t-lg bg-pastel_teal dark:bg-primary`}>
        <p className="font-raleway text-[20px] capitalize dark:text-black">
          {dayOfTheWeek}
        </p>
      </div>
      <div className="flex flex-col gap-[12px] p-4 rounded-lg bg-white dark:bg-zinc-700 shadow-md">
        {mealsToShow ? (
          Object.entries(meals).map(([key, meal], i) => {
            return (
              <Link
                className="flex items-center gap-[12px]"
                key={`meal_${i}`}
                href={`/create?plan_id=${planid}&weekday=${dayOfTheWeek}`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 min-w-10 p-1 rounded-md ${`bg-${key}`}`}
                >
                  <Image
                    src={dayIcons[key as IDayMeal]}
                    width={24}
                    height={24}
                    alt={key}
                  />
                </div>
                <p className="font-raleway_light text-base">
                  {meal?.recipe_name}
                </p>
              </Link>
            );
          })
        ) : (
          <button
            className="h-[200px] rounded-b-lg bg-light_pastel_teal dark:bg-zinc-600"
            onClick={() =>
              router.push(`/create?plan_id=${planid}&weekday=${dayOfTheWeek}`)
            }
          >
            <span className="text-5xl font-raleway_light text-primary_strong">
              +
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

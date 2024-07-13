import Link from "next/link";
import CreatePlanIcon from "../icons/svgs/createPlanIcon";
import PlansIcon from "../icons/svgs/plansIcon";
import DashboardIcon from "../icons/svgs/dashboardIcon";

export default function SideNavDesktop({
  activeRoute,
}: {
  activeRoute?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <Link
        href="/dashboard"
        className={
          activeRoute === "dashboard" ? "p-2 gap-1 bg-[#E6F6C3]" : "p-2 gap-1"
        }
      >
        <DashboardIcon
          colour={activeRoute === "dashboard" ? "fill-black" : undefined}
        />
        <span
          className={
            activeRoute === "dashboard"
              ? "font-raleway text-[10px] text-black"
              : "font-raleway text-[10px] dark:text-white"
          }
        >
          Dashboard
        </span>
      </Link>
      <Link
        href="/create"
        className={
          activeRoute === "create"
            ? "w-full p-2 gap-1 bg-[#E6F6C3]"
            : "w-full p-2 gap-1"
        }
      >
        <CreatePlanIcon
          colour={activeRoute === "create" ? "fill-black" : undefined}
        />
        <span
          className={
            activeRoute === "create"
              ? "font-raleway text-[10px] text-black"
              : "font-raleway text-[10px] dark:text-white"
          }
        >
          Create
        </span>
      </Link>
      <Link
        href="/plans"
        className={
          activeRoute === "plans"
            ? "w-full p-2 gap-1 bg-[#E6F6C3]"
            : "w-full p-2 gap-1"
        }
      >
        <PlansIcon
          colour={activeRoute === "plans" ? "fill-black" : undefined}
        />
        <span
          className={
            activeRoute === "plans"
              ? "font-raleway text-[10px] text-black"
              : "font-raleway text-[10px] dark:text-white"
          }
        >
          Plans
        </span>
      </Link>
    </div>
  );
}

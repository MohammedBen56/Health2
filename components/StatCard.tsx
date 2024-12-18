import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type StatCardProps = {
  type: string;
  count: string;
  label: string;
  icon: string;
  path?: string;
  userId?: string;
};

export const StatCard = ({ count, label, icon, type, path }: StatCardProps) => {
  const isClickable = type === "button";

  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "button",
        "bg-pending": type === "under",
      })}
    >
      {isClickable ? (
        <Link href={path!}>
          <div className="flex items-center gap-4">
            <Content count={count} label={label} icon={icon} type={type} />
          </div>
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          <Content count={count} label={label} icon={icon} type={type} />
        </div>
      )}
    </div>
  );
};

type ContentProps = {
  count: string;
  label: string;
  icon: string;
  type: string;
};

const Content = ({ count, label, icon, type }: ContentProps) => (
  <>
    <Image
      src={icon}
      height={32}
      width={32}
      alt="appointments"
      className="size-8 w-fit"
        />
        <h3>{label}</h3>
    <h3
      className={clsx("text-white items-center", {
        "text-48-bold": type === "button", // Larger size for "button"
        "text-24-bold": type === "under", // Smaller size for "under"
      })}
    >
      {count}
    </h3>
    
  </>
);

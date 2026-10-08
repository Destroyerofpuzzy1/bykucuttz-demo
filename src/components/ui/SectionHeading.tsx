import { cn } from "@/lib/utils";

type Props = {
  id: string;
  children: React.ReactNode;
  lead?: React.ReactNode;
  /** display = standard section heading, statement = one of the few oversized moments */
  size?: "display" | "statement";
  className?: string;
};

/** Section heading: mask-reveal title + optional short lead underneath (stacked, never split-header). */
export function SectionHeading({ id, children, lead, size = "display", className }: Props) {
  return (
    <div className={className}>
      <h2 id={id} data-reveal="lines" className={size === "statement" ? "t-statement" : "t-display"}>
        {children}
      </h2>
      {lead && (
        <p data-reveal="fade" className={cn("t-body-l mt-5 max-w-[38ch] text-steel md:mt-6")}>
          {lead}
        </p>
      )}
    </div>
  );
}

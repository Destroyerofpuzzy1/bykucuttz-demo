import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { bookingLinkProps, type CtaSource } from "@/lib/booking";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";
const sizeCls: Record<Size, string> = { sm: "!min-h-11 !px-5", md: "", lg: "btn-lg" };

type BookingProps = {
  source: CtaSource;
  url?: string;
  children?: React.ReactNode;
  className?: string;
  size?: Size;
  variant?: "primary" | "ghost";
};

/** Every Booksy booking action on the site. One label per intent: "Umów wizytę". */
export function BookingButton({ source, url, children = "Umów wizytę", className, size = "md", variant = "primary" }: BookingProps) {
  return (
    <a {...bookingLinkProps(source, url)} className={cn("btn", sizeCls[size], variant === "ghost" && "btn-ghost", className)}>
      {children}
      <span className="sr-only"> (Booksy, otwiera się w nowej karcie)</span>
    </a>
  );
}

/** Underlined text link (secondary actions); external ones get the arrow and a new-tab note. */
export function TextLink({
  href,
  children,
  external = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a href={href} className={cn("link-line", className)} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
      {children}
      {external && (
        <>
          <ArrowUpRight size={16} weight="light" aria-hidden="true" className="link-arrow" />
          <span className="sr-only"> (otwiera się w nowej karcie)</span>
        </>
      )}
    </a>
  );
}

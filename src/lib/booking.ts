import { site } from "@/data/site";

export type CtaSource =
  | "nav"
  | "menu"
  | "hero"
  | "salon-01"
  | "salon-02"
  | "cennik"
  | "ekipa"
  | "opinie"
  | "finale"
  | "sticky"
  | "kontakt";

/** Props for every outbound booking link. `data-cta` feeds analytics later. */
export function bookingLinkProps(source: CtaSource, url: string = site.bookingUrl) {
  return {
    href: url,
    target: "_blank",
    rel: "noopener",
    "data-cta": source,
  } as const;
}

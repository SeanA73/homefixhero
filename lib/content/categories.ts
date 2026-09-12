import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "plumbing",
    name: "Plumbing",
    description:
      "Leaky faucets, clogged drains, running toilets, and water heater fixes.",
  },
  {
    slug: "electrical",
    name: "Electrical",
    description:
      "Outlets, switches, breakers, and lighting — safe fixes for common electrical issues.",
  },
  {
    slug: "hvac",
    name: "Heating & Cooling",
    description:
      "Furnace, air conditioner, and thermostat troubleshooting and maintenance.",
  },
  {
    slug: "tools",
    name: "Tools & Equipment",
    description:
      "Reviews and buying guides for the tools every homeowner should own.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

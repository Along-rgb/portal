import type { System } from "@/types/system";

function buildHaystack(system: System): string {
  return [system.name, system.description, system.category, ...(system.keywords ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function filterSystems(systems: System[], query: string): System[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return systems;

  return systems.filter((system) => buildHaystack(system).includes(normalized));
}

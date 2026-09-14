// Set only during a GitHub Pages build; local development stays at localhost:3000/.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function sitePath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath}${path}`;
}

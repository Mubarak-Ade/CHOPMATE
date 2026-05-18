export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const buildUniqueSlug = (name: string, suffix: string) => {
  const base = slugify(name) || "restaurant";
  return `${base}-${suffix.slice(-6)}`;
};

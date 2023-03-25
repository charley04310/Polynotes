export function truncateTitle(title: string) {
  if (title.length > 8) {
    return title.slice(0, 8) + "...";
  }
  return title;
}

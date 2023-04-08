export default function uniqueIdentifier() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "");
}

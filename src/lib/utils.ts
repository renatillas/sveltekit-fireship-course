export function debounce(fn: () => void, milliseconds: number): () => Promise<void> {
  const debounce_duration = milliseconds;
  let reference: NodeJS.Timeout;

  async function debouncedFunction() {
    clearTimeout(reference);
    reference = setTimeout(fn, debounce_duration);
  }

  return debouncedFunction
}

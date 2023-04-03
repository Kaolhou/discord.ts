export default function format(text: string, ...args: any[]) {
  return text.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] == "undefined" ? match : args[index];
  });
}

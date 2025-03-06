export function getItemsFS() {
  const dataString = localStorage.getItem("items");
  if (dataString) {
    const data = JSON.parse(dataString);
    return data;
  }
}

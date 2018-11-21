export function dateFromString(text: string) {
  const reg = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
  const values = reg.exec(text);
  if (!values) { return null; }
  return new Date(`${values[1]}-${values[2]}-${values[3]} ${values[4]}:${values[5]}:${values[6]}:${values[7]}`);
}

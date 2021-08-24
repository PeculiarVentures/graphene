/**
 * Converts UInt64 number to the buffer
 * @param value UInt64 number
 * @param littleEndian Little or Big endian. Default is Big endian.
 * @returns Buffer with encoded UInt64 number
 */
export function uint64ToBuffer(value: number, littleEndian = false): Buffer {
  const view = new Uint8Array(8);
  const data = new DataView(view.buffer);

  data.setBigUint64(0, BigInt(value), littleEndian);

  return Buffer.from(view.buffer);
}
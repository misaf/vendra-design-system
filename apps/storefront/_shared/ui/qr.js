// QR codes for the counter presentation: the customer scans a product's address with their phone.
import qrcode from 'qrcode-generator';

// The dark modules of `text`'s QR code as one SVG path, on a square of `size` modules that includes
// the four-module quiet zone scanners need around the code.
export function vfQrPath(text, quiet = 4) {
  const code = qrcode(0, 'M');
  code.addData(text);
  code.make();
  const count = code.getModuleCount();
  let path = '';
  for (let row = 0; row < count; row++)
    for (let column = 0; column < count; column++)
      if (code.isDark(row, column))
        path += 'M' + (column + quiet) + ' ' + (row + quiet) + 'h1v1h-1z';
  return {path, size: count + quiet * 2};
}

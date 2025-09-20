const indoMonths = {
  Januari: 0,
  Februari: 1,
  Maret: 2,
  April: 3,
  Mei: 4,
  Juni: 5,
  Juli: 6,
  Agustus: 7,
  September: 8,
  Oktober: 9,
  November: 10,
  Desember: 11,
};

export default function parseIndoDate(s) {
  // Examples: "Kamis, 19 Juni 2025" or "19 Juni 2025"
  try {
    const cleaned = s.replace(/^[A-Za-zÁ-Úá-úçÇêÊéÉíÍóÓúÚûÛÀ-ÿ]+,\s*/, "").trim();
    const parts = cleaned.split(/\s+/); // ["19","Juni","2025"]
    const day = parseInt(parts[0], 10);
    const month = indoMonths[parts[1]];
    const year = parseInt(parts[2], 10);
    if (isNaN(day) || month === undefined || isNaN(year)) return null;
    return new Date(year, month, day);
  } catch (_) {
    return null;
  }
}
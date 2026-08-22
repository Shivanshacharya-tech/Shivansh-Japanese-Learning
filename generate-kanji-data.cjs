const fs = require("node:fs");
const path = require("node:path");
const kanjiData = require("kanji-data");

const levels = [5, 4, 3, 2, 1];
const records = [];

function getMeaning(words) {
  return words?.[0]?.meanings?.[0]?.glosses?.[0] || "common vocabulary";
}

function getWords(character) {
  const words = kanjiData
    .getWords(character)
    .filter((entry) => entry.variants?.[0]?.written?.includes(character))
    .sort((left, right) => {
      const leftPriority = left.variants[0].priorities?.length || 0;
      const rightPriority = right.variants[0].priorities?.length || 0;
      return rightPriority - leftPriority;
    });
  const uniqueWords = new Set();

  return words
    .map((entry) => {
      const variant = entry.variants[0];
      const word = variant.written;
      const reading = variant.pronounced;
      const meaning = getMeaning([entry]);
      return `${word} (${reading}) - ${meaning}`;
    })
    .filter((word) => {
      const written = word.split(" (")[0];
      if (uniqueWords.has(written)) return false;
      uniqueWords.add(written);
      return true;
    })
    .slice(0, 8);
}

for (const level of levels) {
  for (const character of kanjiData.getJlpt(level)) {
    const metadata = kanjiData.get(character);
    const readings = [...(metadata.kun_readings || []), ...(metadata.on_readings || [])];
    records.push({
      character,
      romaji: readings[0] || "",
      meaning: metadata.meanings?.slice(0, 3).join(" / ") || "",
      level: `N${level}`,
      group: `JLPT N${level}`,
      words: getWords(character),
    });
  }
}

const destination = path.join(__dirname, "..", "src", "data", "kanji.js");
const output = `const kanji = ${JSON.stringify(records, null, 2)};\n\nexport default kanji;\n`;
fs.writeFileSync(destination, output, "utf8");
console.log(`Generated ${records.length} Kanji records at ${destination}`);
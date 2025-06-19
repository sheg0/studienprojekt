// sync-translations.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const baseLang = "de";
const targetLangs = ["en"]; // extend if needed
const localesDir = path.join(__dirname);
const deeplApiKey = "87f90466-42f6-4e28-9965-b8625dcea5f1:fx";

async function translate(text, targetLang) {
  console.log(`Translating "${text}" to ${targetLang}`);
  try {
    const res = await axios.post(
      "https://api-free.deepl.com/v2/translate",
      null,
      {
        params: {
          auth_key: deeplApiKey,
          text,
          target_lang: targetLang.toUpperCase(),
          source_lang: baseLang.toUpperCase(),
        },
      }
    );
    return res.data.translations[0].text;
  } catch (err) {
    console.error(
      `❌ Error translating "${text}":`,
      err.response?.data || err.message
    );
    return text; // fallback to original
  }
}

async function sync() {
  const basePath = path.join(localesDir, `${baseLang}.json`);
  const baseTranslations = JSON.parse(fs.readFileSync(basePath, "utf8"));

  for (const lang of targetLangs) {
    const langPath = path.join(localesDir, `${lang}.json`);
    const targetTranslations = fs.existsSync(langPath)
      ? JSON.parse(fs.readFileSync(langPath, "utf8"))
      : {};

    let updated = false;

    for (const key in baseTranslations) {
      if (!targetTranslations[key]) {
        const translated = await translate(baseTranslations[key], lang);
        targetTranslations[key] = translated;
        console.log(`🌍 [${lang}] ${key}: ${translated}`);
        updated = true;
      }
    }

    if (updated) {
      fs.writeFileSync(
        langPath,
        JSON.stringify(targetTranslations, null, 2),
        "utf8"
      );
      console.log(`✅ Updated: ${lang}.json`);
    } else {
      console.log(`👍 ${lang}.json is already up-to-date`);
    }
  }
}

sync();

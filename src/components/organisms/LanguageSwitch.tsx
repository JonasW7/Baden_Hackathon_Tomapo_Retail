import i18n from "@/i18n/i18n";
import { useTranslation } from "react-i18next";

export default function LanguageSwitch() {
  const { t } = useTranslation();

  const handleChangeLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("de");
    } else {
      i18n.changeLanguage("en");
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <p data-testid="languageSwitchStatus">{t("languageSwitchStatus")}: {i18n.language}</p>
      <button
        data-testid="languageSwitch"
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        onClick={() => handleChangeLanguage()}
      >
        <p> {t("languageSwitch")}</p>
      </button>
    </div>
  );
}

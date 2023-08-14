/**
 * AppLanguageSelector component handles the selection of the application language using react-i18next.
 *
 * @component
 * @example
 * // Usage:
 * <AppLanguageSelector />
 *
 * @returns {JSX.Element} The AppLanguageSelector component.
 */
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../../utils/LanguageSelector";

const AppLanguageSelector = () => {
  /**
   * useTranslation hook from react-i18next that provides the i18n instance.
   */
  const { i18n } = useTranslation();

  /**
   * Changes the application language using the i18n instance.
   * @function
   * @param {string} lng - The language code to switch to.
   */
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  /**
   * Available language options for the language selector.
   * @type {Array<{ label: string, value: string }>}
   */
  const options = [
    { label: "日本語", value: "Japanese" },
    { label: "English", value: "English(US)" },
    { label: "Français", value: "French" },
  ];

  return (
    <>
      {/* Renders the LanguageSelector component with the appropriate props */}
      <LanguageSelector
        selected={
          options.find((option) => option.value === i18n.language) || options[0]
        }
        options={options}
        setLang={(option) => changeLanguage(option.value)}
      />
    </>
  );
};

export default AppLanguageSelector;

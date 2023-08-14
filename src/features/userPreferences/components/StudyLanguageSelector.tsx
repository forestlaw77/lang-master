/**
 * StudyLanguageSelector component provides a language selection interface for a study scenario,
 * allowing the user to choose target and user languages using react-i18next and Chakra UI components.
 *
 * @component
 * @example
 * // Usage:
 * <StudyLanguageSelector
 *   targetLanguage="English"
 *   userLanguage="Japanese"
 *   onSelectLanguage={(targetLang, userLang) => {
 *     // Handle selected languages
 *   }}
 *   onEnd={() => {
 *     // Handle component closure
 *   }}
 * />
 *
 * @typedef {Object} Option - Represents an option in the language selector.
 * @property {string} label - The label to display for the language option.
 * @property {string} value - The value associated with the language option.
 *
 * @param {ComponentProps} props - The component props.
 * @returns {JSX.Element} The StudyLanguageSelector component.
 */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HStack, VStack, Box, Text } from "@chakra-ui/react";
import { languageToLanguageCode } from "../../../assets/initial-phrase";
import LanguageSelector from "../../../utils/LanguageSelector";
import { ComponentProps } from "../../../App";

interface Option {
  label: string;
  value: string;
}

const StudyLanguageSelector: React.FC<ComponentProps> = ({
  targetLanguage,
  userLanguage,
  onSelectLanguage,
  onEnd,
}) => {
  /**
   * State to manage the selected target language.
   */
  const [targetLanguageState, setTargetLanguageState] =
    useState<string>(targetLanguage);

  /**
   * State to manage the selected user language.
   */
  const [userLanguageState, setUserLanguageState] =
    useState<string>(userLanguage);

  /**
   * useTranslation hook from react-i18next for translation.
   */
  const { t } = useTranslation();

  /**
   * Effect to trigger the onSelectLanguage callback when the selected languages change.
   */
  useEffect(() => {
    onSelectLanguage(targetLanguageState, userLanguageState);
  }, [targetLanguageState, userLanguageState, onSelectLanguage]);

  /**
   * Creates an array of language options for the LanguageSelector component.
   */
  const languageOptions = Object.keys(languageToLanguageCode).map(
    (language) => ({
      value: language,
      label: t(language),
    })
  );

  /**
   * Handles the selection of the target language.
   * @param {Option} option - The selected language option (value and label).
   */
  const handleTargetLanguageSelect = (option: Option) => {
    setTargetLanguageState(option.value);
  };

  /**
   * Handles the selection of the user language.
   * @param {Option} option - The selected language option (value and label).
   */
  const handleUserLanguageSelect = (option: Option) => {
    setUserLanguageState(option.value);
  };

  return (
    <Box display="flex" justifyContent="flex-start">
      <VStack spacing={5}>
        <HStack alignSelf="baseline">
          <Text>{t("1stLang")}: </Text>
          {/* Renders the LanguageSelector for target language selection */}
          <LanguageSelector
            selected={
              languageOptions.find(
                (option) => option.value === targetLanguageState
              ) || languageOptions[0]
            }
            options={languageOptions}
            setLang={handleTargetLanguageSelect}
          />
        </HStack>
        <HStack alignSelf="baseline">
          <Text>{t("2ndLang")}: </Text>
          {/* Renders the LanguageSelector for user language selection */}
          <LanguageSelector
            selected={
              languageOptions.find(
                (option) => option.value === userLanguageState
              ) || languageOptions[0]
            }
            options={languageOptions}
            setLang={handleUserLanguageSelect}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default StudyLanguageSelector;

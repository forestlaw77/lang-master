/**
 * UserPreferences component provides a user preferences settings interface,
 * allowing the user to configure app language, color scheme, and study language preferences.
 *
 * @component
 * @example
 * // Usage:
 * <UserPreferences
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
 * @param {ComponentProps} props - The component props.
 * @returns {JSX.Element} The UserPreferences component.
 */
import React from "react";
import {
  Box,
  CloseButton,
  Grid,
  GridItem,
  Text,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import StudyLanguageSelector from "./StudyLanguageSelector";
import AppLanguageSelector from "./AppLanguageSelector";
import ColorScheme from "./ColorScheme";
import { useTranslation } from "react-i18next";
import { ComponentProps } from "../../../App";

const UserPreferences: React.FC<ComponentProps> = ({
  targetLanguage,
  userLanguage,
  onSelectLanguage,
  onEnd,
}) => {
  /**
   * useTranslation hook from react-i18next for translation.
   */
  const { t } = useTranslation();

  return (
    <Box display="flex" justifyContent="flex-start">
      <Grid
        templateAreas={`"header"
                        "main"`}
        gridTemplateRows={"20px 1fr"}
        gridTemplateColumns={"1fr"}
        gap="2"
        fontWeight="bold"
        width="99%"
      >
        <GridItem pl="0" area={"header"}>
          <HStack>
            <CloseButton
              onClick={() => onEnd()}
              size="sm"
              variant="solid"
              bgColor="whiteAlpha.500"
            />
            <Text>{t("settings")}</Text>
          </HStack>
        </GridItem>
        <GridItem area={"main"}>
          <Box display="flex" justifyContent="flex-start">
            <VStack align="flex=start">
              <Text>{t("app")}</Text>
              <Box padding="5">
                <HStack>
                  <Text>{t("language")}:</Text>
                  <AppLanguageSelector />
                </HStack>
                <HStack>
                  <Text>{t("colorScheme")}:</Text>
                  <ColorScheme />
                </HStack>
              </Box>
            </VStack>
          </Box>
          <Divider />
          <br />
          <Box display="flex" justifyContent="flex-start">
            <VStack align="flex=start">
              <Text>{t("study")}</Text>
              <Box padding="5">
                <StudyLanguageSelector
                  targetLanguage={targetLanguage}
                  userLanguage={userLanguage}
                  onSelectLanguage={onSelectLanguage}
                  onEnd={onEnd}
                />
              </Box>
            </VStack>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default UserPreferences;

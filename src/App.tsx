/**
 * App component serves as the main entry point for the Language Master application.
 *
 * @component
 * @example
 * // Usage:
 * <App />
 */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  VStack,
  Grid,
  GridItem,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { SettingsIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import Title from "./components/Title";
import PhraseList from "./features/phraseList/components/PhraseList";
import TravelPhrases from "./features/travelPhrases/components/TravelPhrases";
import Quiz from "./features/quiz/components/Quiz";
import PhraseRegistration from "./features/phraseRegistration/components/PhraseRegistration";
import UserPreferences from "./features/userPreferences/components/UserPreferences";
import { waitSpeech } from "./utils/utils";
import { languageToLanguageCode } from "./assets/initial-phrase";

/**
 * ComponentProps interface represents the common props shared by multiple components.
 *
 * @interface ComponentProps
 * @property {string} targetLanguage - The target language selected by the user.
 * @property {string} userLanguage - The user's native language.
 * @property {(targetLanguage: string, userLanguage: string) => void} onSelectLanguage - Callback function to handle language selection.
 * @property {() => void} onEnd - Callback function to handle component closure.
 * @property {any} [otherCommonProps] - Additional common props can be added here.
 */

export interface ComponentProps {
  targetLanguage: string;
  userLanguage: string;
  onSelectLanguage: (targetLanguage: string, userLanguage: string) => void;
  onEnd: () => void;
}

/**
 * App component serves as the main entry point for the Language Master application.
 *
 * @component
 * @returns {JSX.Element} The App component.
 */
const App: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState<
    | "phraseList"
    | "travel"
    | "quiz"
    | "settings"
    | "phraseRegistration"
    | "Start"
    | "menu"
  >("Start");
  const [previousComponent, setPreviousComponent] = useState<
    | "phraseList"
    | "travel"
    | "quiz"
    | "settings"
    | "phraseRegistration"
    | "Start"
    | "menu"
  >("menu");
  const [userLanguage, setUserLanguage] = useState<string>("English(US)");
  const [targetLanguage, setTargetLanguage] = useState<string>("French");
  const { colorMode, toggleColorMode } = useColorMode();
  const { t, i18n } = useTranslation();

  /**
   * ComponentMap defines the mapping of component names to actual component elements.
   */
  const ComponentMap = {
    phraseList: PhraseList,
    travel: TravelPhrases,
    quiz: Quiz,
    phraseRegistration: PhraseRegistration,
    settings: UserPreferences,
    menu: () => (
      <VStack align="center">
        <Button
          mt="5"
          size="sm"
          variant="solid"
          width="95%"
          onClick={() => setCurrentComponent("travel")}
        >
          {t("travelPhrases")}
        </Button>
        <Button
          size="sm"
          variant="solid"
          width="95%"
          onClick={() => setCurrentComponent("phraseList")}
        >
          {t("phraseList")}
        </Button>
        <Button
          size="sm"
          variant="solid"
          width="95%"
          onClick={() => setCurrentComponent("quiz")}
        >
          {t("quiz")}
        </Button>
      </VStack>
    ),
    Start: () => (
      <Button
        onClick={() => {
          waitSpeech(t("letsStart"), languageToLanguageCode[i18n.language]);
          setCurrentComponent("menu");
        }}
      >
        {t("welcomeMessage")}
      </Button>
    ),
  };

  /**
   * Callback function to handle language selection.
   *
   * @param {string} targetLanguage - The selected target language.
   * @param {string} userLanguage - The selected user's native language.
   */
  const onSelectLanguage = (targetLanguage: string, userLanguage: string) => {
    setTargetLanguage(targetLanguage);
    setUserLanguage(userLanguage);
  };

  /**
   * Renders the current selected component based on ComponentMap.
   *
   * @returns {JSX.Element} The rendered component.
   */
  const renderComponent = () => {
    const Component = ComponentMap[currentComponent];

    const componentProps: ComponentProps = {
      targetLanguage,
      userLanguage,
      onSelectLanguage,
      onEnd: handleOnEnd,
    };

    return <Component {...componentProps} />;
  };

  /**
   * Callback function to handle component closure.
   */
  const handleOnEnd = () => {
    setCurrentComponent(previousComponent);
    setPreviousComponent("menu");
  };

  return (
    <div className="App">
      <Grid
        templateAreas={`"header"
                  "main"
                  "footer"`}
        gridTemplateRows={"50px 1fr 50px"}
        gridTemplateColumns={"1fr"}
        gap="1"
        fontWeight="bold"
      >
        <GridItem pl="2" area={"header"}>
          <HStack>
            <Title />
            <Button
              size="sm"
              variant="solid"
              onClick={() => {
                setPreviousComponent(currentComponent);
                setCurrentComponent("settings");
              }}
            >
              <SettingsIcon />
            </Button>
            <Button onClick={toggleColorMode} size="sm">
              {colorMode === "light" ? (
                <SunIcon color="yellow.700" />
              ) : (
                <MoonIcon />
              )}
            </Button>
          </HStack>
        </GridItem>
        <GridItem pl="2" area={"main"}>
          {renderComponent()}
        </GridItem>
        <GridItem pl="2" area={"footer"}>
          <Text fontSize="sm">
            Copyright Tsutomu FUNADA 2023. All rights reserved.
          </Text>
        </GridItem>
      </Grid>
    </div>
  );
};

export default App;

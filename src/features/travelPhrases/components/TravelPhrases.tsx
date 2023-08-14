/**
 * TravelPhrases component displays a travel phrase in the selected target and user languages.
 * The user can listen to the phrase and move to the next phrase.
 *
 * @component
 * @example
 * // Usage:
 * <TravelPhrases
 *   targetLanguage="English"
 *   userLanguage="Japanese"
 *   onEnd={() => {
 *     // Handle component closure
 *   }}
 * />
 *
 * @param {ComponentProps} props - The component props.
 * @returns {JSX.Element} The TravelPhrases component.
 */
import React, { useEffect } from "react";
import { AiFillCaretRight, AiOutlineArrowRight } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import {
  Button,
  CloseButton,
  Divider,
  Grid,
  GridItem,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { languageCodeToLanguage } from "../../../assets/initial-phrase";
import { waitSpeech } from "../../../utils/utils";
import { useTravelPhrases } from "../hooks/useTravelPhrases";
import { ComponentProps } from "../../../App";

const TravelPhrases: React.FC<ComponentProps> = ({
  targetLanguage,
  userLanguage,
  onEnd,
}) => {
  /**
   * Custom hook `useTravelPhrases` for travel phrase functionality.
   */
  const { phrase, meaning, nextPhrase } = useTravelPhrases({
    targetLanguage,
    userLanguage,
  });

  /**
   * useTranslation hook from react-i18next for translation.
   */
  const { t } = useTranslation();

  /**
   * Use effect to trigger speech synthesis when the phrase or meaning changes.
   */
  useEffect(() => {
    if (phrase && meaning) {
      waitSpeech(phrase.phrase, phrase.languageCode);
      waitSpeech(meaning.phrase, meaning.languageCode);
    }
  }, [phrase, meaning]);

  return (
    <>
      <Grid
        templateAreas={`"travel-header"
                        "travel-main"`}
        gridTemplateRows={"20px 1fr"}
        gridTemplateColumns={"1fr"}
        gap="0"
        fontWeight="bold"
        width="99%"
      >
        {/* TravelPhrases Header */}
        <GridItem pl="0" area={"travel-header"}>
          <HStack>
            <CloseButton
              onClick={() => onEnd()}
              size="sm"
              variant="solid"
              bgColor="whiteAlpha.500"
            />
            <Text>{t("travelPhrases")}</Text>
            <Text>
              {phrase && languageCodeToLanguage[phrase.languageCode]} -
              {meaning && languageCodeToLanguage[meaning.languageCode]}
            </Text>
          </HStack>
        </GridItem>

        {/* TravelPhrases Main */}
        <GridItem pl="2" area={"travel-main"}>
          {phrase && meaning && (
            <VStack align="baseline" padding="1">
              <Divider />

              {/* Play button for the phrase */}
              <HStack>
                <Button
                  onClick={() => waitSpeech(phrase.phrase, phrase.languageCode)}
                  size="xs"
                >
                  <AiFillCaretRight />
                  {t("play")}
                </Button>
                <Text>{phrase.phrase}</Text>
              </HStack>
              <Divider />

              {/* Play button for the meaning */}
              <HStack>
                <Button
                  onClick={() =>
                    waitSpeech(meaning.phrase, meaning.languageCode)
                  }
                  size="xs"
                >
                  <AiFillCaretRight />
                  {t("play")}
                </Button>
                <Text>{meaning.phrase}</Text>
              </HStack>
              <Divider />

              {/* Play both phrase and meaning, and move to the next phrase */}
              <HStack>
                <Button
                  onClick={() => {
                    waitSpeech(phrase.phrase, phrase.languageCode);
                    waitSpeech(meaning.phrase, meaning.languageCode);
                  }}
                >
                  <AiFillCaretRight />
                  {t("playAll")}
                </Button>
                <Button onClick={() => nextPhrase()} alignSelf="baseline">
                  <AiOutlineArrowRight />
                  {t("next")}
                </Button>
              </HStack>
            </VStack>
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default TravelPhrases;

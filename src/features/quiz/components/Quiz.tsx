/**
 * Quiz component provides a language quiz interface, displaying a phrase and multiple answer options.
 * The user can listen to the phrase and select an answer option in the selected target language.
 *
 * @component
 * @example
 * // Usage:
 * <Quiz
 *   targetLanguage="English"
 *   userLanguage="Japanese"
 *   onEnd={() => {
 *     // Handle component closure
 *   }}
 * />
 *
 * @param {ComponentProps} props - The component props.
 * @returns {JSX.Element} The Quiz component.
 */
import React, { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { AiFillCaretRight } from "react-icons/ai";
import {
  Button,
  CloseButton,
  Grid,
  GridItem,
  Text,
  HStack,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import useQuiz from "../hooks/useQuiz";
import { languageCodeToLanguage } from "../../../assets/initial-phrase";
import { waitSpeech } from "../../../utils/utils";
import { ComponentProps } from "../../../App";

const Quiz: React.FC<ComponentProps> = ({
  targetLanguage,
  userLanguage,
  onEnd,
}) => {
  /**
   * Custom hook `useQuiz` for quiz functionality.
   */
  const { quizPhrase, answerOptions, meanings, handleAnswer } = useQuiz({
    targetLanguage,
    userLanguage,
    onEnd,
  });

  /**
   * useTranslation hook from react-i18next for translation.
   */
  const { t } = useTranslation();

  /**
   * Handles speech synthesis for the quiz phrase.
   * @param {string} text - The text to be spoken.
   * @param {string} lang - The language code for speech synthesis.
   */
  const handleSpeech = useCallback((text: string, lang: string) => {
    waitSpeech(text, lang);
  }, []);

  /**
   * Use effect to trigger speech synthesis when the quiz phrase changes.
   */
  useEffect(() => {
    /*
       In the "Strict Mode" development environment, every component is automatically
       mounted and remounted whenever it is first mounted. This means that the speech
       might play twice when the component is first mounted. In the deployed environment
       (non-Strict Mode), it works as expected and plays the speech only once, so during
       development, it's okay if the speech plays twice on initial mount.
    */
    if (quizPhrase) {
      handleSpeech(quizPhrase.phrase, quizPhrase.languageCode);
    }
  }, [quizPhrase, handleSpeech]);

  return (
    <>
      <Grid
        templateAreas={`"quiz-header"
                  "quiz-main"`}
        gridTemplateRows={"20px 1fr"}
        gridTemplateColumns={"1fr"}
        gap="0"
        fontWeight="bold"
        width="99%"
      >
        {/* Quiz Header */}
        <GridItem pl="0" area={"quiz-header"}>
          <HStack>
            <CloseButton
              onClick={() => onEnd()}
              size="sm"
              variant="solid"
              bgColor="whiteAlpha.500"
            />
            <Text>{t("quiz")}</Text>
            <Text>
              {quizPhrase && languageCodeToLanguage[quizPhrase.languageCode]}
            </Text>
          </HStack>
        </GridItem>

        {/* Quiz Main */}
        <GridItem pl="2" area={"quiz-main"}>
          {quizPhrase && (
            <>
              {/* Quiz question */}
              {t("Q.meaning")}
              <HStack>
                <Button
                  size="xs"
                  onClick={() =>
                    handleSpeech(quizPhrase.phrase, quizPhrase.languageCode)
                  }
                >
                  <AiFillCaretRight />
                  {t("play")}
                </Button>
                <Text>{quizPhrase.phrase}</Text>
              </HStack>

              {/* Answer options */}
              <OrderedList>
                {answerOptions.map((option, index) => (
                  <p key={index}>
                    <ListItem p="1">
                      <Button
                        onClick={() => handleAnswer(option)}
                        fontSize="14px"
                      >
                        {meanings[option].phrase}
                      </Button>
                    </ListItem>
                  </p>
                ))}
              </OrderedList>
            </>
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default Quiz;

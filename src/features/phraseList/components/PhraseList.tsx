/**
 * PhraseList component displays a paginated list of phrases with their meanings,
 * allowing the user to play audio for each phrase in the selected target and user languages.
 *
 * @component
 * @example
 * // Usage:
 * <PhraseList
 *   targetLanguage="English"
 *   userLanguage="Japanese"
 *   onEnd={() => {
 *     // Handle component closure
 *   }}
 * />
 *
 * @param {ComponentProps} props - The component props.
 * @returns {JSX.Element} The PhraseList component.
 */
import React, { useState } from "react";
import {
  AiFillCaretUp,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiFillCaretDown,
  AiFillCaretRight,
} from "react-icons/ai";
import { useTranslation } from "react-i18next";
import theme from "../../../utils/theme";
import {
  Button,
  Box,
  CloseButton,
  Text,
  HStack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Phrase } from "../../../assets/initial-phrase";
import { getPhrases, waitSpeech } from "../../../utils/utils";
import { ComponentProps } from "../../../App";

/**
 * The number of items to display per page.
 * @type {number}
 */
const ITEMS_PER_PAGE: number = 5;

/**
 * Paginates a list of items based on the specified page.
 * @param {Array<{ phrase: Phrase; meaning: Phrase }>} items - The list of items to paginate.
 * @param {number} page - The current page number.
 * @returns {Array<{ phrase: Phrase; meaning: Phrase }>} The paginated list of items.
 */
export const paginatedList = (
  items: { phrase: Phrase; meaning: Phrase }[],
  page: number
) => {
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedItems = items.slice(startIndex, endIndex);

  return displayedItems;
};

const PhraseList: React.FC<ComponentProps> = React.memo(
  ({ targetLanguage, userLanguage, onEnd }) => {
    /**
     * Determines the background color based on the color mode.
     */
    const recordBackground = useColorModeValue(
      theme.colors.light.recordBackground,
      theme.colors.dark.recordBackground
    );

    /**
     * State to manage the current page of the paginated list.
     */
    const [currentPage, setCurrentPage] = useState(1);

    /**
     * useTranslation hook from react-i18next for translation.
     */
    const { t } = useTranslation();

    /**
     * Retrieves the list of phrases in the target language.
     */
    const phrases = getPhrases(targetLanguage);

    /**
     * Retrieves the list of meanings in the user language.
     */
    const meanings = getPhrases(userLanguage);

    /**
     * Creates a list of phrases with their corresponding meanings.
     */
    const phraseList = [];
    for (const phrase of phrases) {
      const meaning = meanings.find(
        (meaning) => meaning.meaningId === phrase.meaningId
      );
      if (meaning) {
        phraseList.push({
          phrase: phrase,
          meaning: meaning,
        });
      }
    }

    /**
     * Calculates the total number of pages based on the number of items per page.
     */
    const totalPages = Math.ceil(phraseList.length / ITEMS_PER_PAGE);

    /**
     * Retrieves the items to display on the current page.
     */
    const displayItems = paginatedList(phraseList, currentPage);

    /**
     * Handles navigating to the first page.
     */
    const handleTopPage = () => {
      setCurrentPage(1);
    };

    /**
     * Handles navigating to the next page.
     */
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    /**
     * Handles navigating to the previous page.
     */
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    /**
     * Handles navigating to the last page.
     */
    const handleLastPage = () => {
      setCurrentPage(totalPages);
    };

    return (
      <>
        {/* Header */}
        <HStack>
          <CloseButton
            onClick={() => onEnd()}
            size="sm"
            variant="solid"
            bgColor="whiteAlpha.500"
          />
          <Text>{t("phraseList")}</Text>
          <Text>
            {targetLanguage} - {userLanguage}
          </Text>
        </HStack>
        {/* Phrase list */}
        {displayItems &&
          displayItems.map((item, index) => (
            <Box
              key={item.phrase.meaningId}
              bg={index % 2 === 0 ? recordBackground : "gray.500"} // Alternate row background color
              p={2}
              mb={2}
            >
              <HStack>
                <Text>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}: </Text>
                <Button
                  onClick={() => {
                    waitSpeech(item.phrase.phrase, item.phrase.languageCode);
                    waitSpeech(item.meaning.phrase, item.meaning.languageCode);
                  }}
                >
                  <AiFillCaretRight />
                  {t("play")}
                </Button>
                <VStack>
                  <Text>{item.phrase.phrase} </Text>
                  <Text>({item.meaning.phrase})</Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        {/* Pagination buttons */}
        <Button onClick={() => handleTopPage()} disabled={currentPage === 1}>
          <AiFillCaretUp />
          {t("pager.button.top")}
        </Button>
        <Button onClick={() => handlePrevPage()} disabled={currentPage === 1}>
          <AiOutlineArrowLeft />
          {t("pager.button.prev")}
        </Button>
        <Button
          onClick={() => handleNextPage()}
          disabled={currentPage === totalPages}
        >
          <AiOutlineArrowRight />
          {t("pager.button.next")}
        </Button>
        <Button
          onClick={() => handleLastPage()}
          disabled={currentPage === totalPages}
        >
          <AiFillCaretDown />
          {t("pager.button.last")}
        </Button>
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.targetLanguage === nextProps.targetLanguage &&
    prevProps.userLanguage === nextProps.userLanguage
);

export default PhraseList;

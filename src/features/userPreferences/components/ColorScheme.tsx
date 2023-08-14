/**
 * ColorScheme component allows users to toggle between light and dark color modes using Chakra UI.
 *
 * @component
 * @example
 * // Usage:
 * <ColorScheme />
 *
 * @returns {JSX.Element} The ColorScheme component.
 */
import { Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ColorScheme = () => {
  /**
   * useColorMode hook from Chakra UI that provides access to the current color mode
   * and a function to toggle between light and dark modes.
   */
  const { colorMode, toggleColorMode } = useColorMode();

  /**
   * Handles the click event on the Button component to toggle the color mode.
   * @function
   */
  const handleColorModeToggle = () => {
    toggleColorMode();
  };

  return (
    <Button onClick={handleColorModeToggle} size="sm">
      {/* Renders the SunIcon if the color mode is "light", otherwise renders the MoonIcon. */}
      {colorMode === "light" ? <SunIcon color="yellow.700" /> : <MoonIcon />}
    </Button>
  );
};

export default ColorScheme;

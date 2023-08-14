import React, { memo } from "react";
import Select, { ActionMeta } from "react-select";
import { HStack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

type LanguageToIconMapping = {
  [key: string]: string;
};

export type LangOption = {
  label: string;
  value: string;
};

type LanguageSelectorProps = {
  selected: LangOption;
  options: LangOption[];
  setLang: (lang: LangOption) => void;
};

const LanguageOptionLabel = memo(({ data }: any) => {
  const { label, value } = data;

  // 言語コードからアイコン名へのマッピング
  const languageToIconMapping: LanguageToIconMapping = {
    Japanese: "jp",
    "English(US)": "us",
    French: "fr",
    Chinese: "cn",
    German: "de",
  };

  const icon = `flag:${languageToIconMapping[value]}-4x3`;

  return (
    <div>
      <HStack>
        <Icon icon={icon} />
        <Text color="black" as={"span"}>
          {label}
        </Text>
      </HStack>
    </div>
  );
});

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "1px solid gray",
    borderRadius: "50px",
    background: "gray.700", // 背景色を調整
    color: "white", // 文字色を設定
  }),
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selected,
  options,
  setLang,
}) => {
  function onChange(
    selectedOption: LangOption | null,
    actionMeta: ActionMeta<LangOption>
  ) {
    if (selectedOption) {
      setLang(selectedOption);
    }
  }

  return (
    <Select
      //instanceId="langSelect"
      value={selected}
      options={options}
      onChange={onChange}
      formatOptionLabel={(data: any) => <LanguageOptionLabel data={data} />}
      styles={customStyles}
      aria-label="Select Language"
    />
  );
};

export default LanguageSelector;

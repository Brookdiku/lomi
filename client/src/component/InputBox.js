import React from "react";
import { Icon,Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

const InputBox = ({
  icon,
  isFilledCorrect,
  type,
  placeholder,
  variant,
  isFocused,
  setIsFocused,
  value,
  setValue,
  inputref,
  isFirstFill
}) => {
  return (
    <InputGroup
    >
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={icon}  color={isFocused ? "#aefb2a" : "#D4D4D6"} />}
      />
      <Input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        boxShadow={"none"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={inputref}
        variant={variant}
        _focus={{
          borderBottom: "1px  solid #aefb2a !important",
          outline: "none",
          boxShadow: "none",
        }}
        type={type}
        placeholder={placeholder}
        borderBottom={
            !isFilledCorrect && !isFirstFill
            ? "1px  solid red !important"
            : "1px solid lightgray !important"
        }
      />
    </InputGroup>
  );
};

export default InputBox;

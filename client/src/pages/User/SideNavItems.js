import {
  Flex,
  Link,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import NavHoverBox from "./NavHoverBox";
const SideNavItems = ({ active, sideNav, icon, title }) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={sideNav === "large" ? "flex-start" : "center"}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active && "#AEC8CA"}
          p={3}
          borderRadius={0}
          _hover={{
            textDecor: "none",
            border: "1px solid",
                  borderImage: "linear-gradient(45deg, #57ebde, #aefb2a) 1",
          }}
          w={sideNav === "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#82AAAD" : "gray.500"}
              />
              <Text ml={5} display={sideNav === "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
        <MenuList
          p={0}
          border="none"
          width={200}
          height={200}
          ml={5}
          background="transparent"
          boxShadow={"none"}
        >
          <NavHoverBox
            title={title}
            icon={icon}
            description="This is Home Tab "
          />
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default SideNavItems;

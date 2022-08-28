import {
  Flex,
  Link,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavHoverBox from "./NavHoverBox";
const SideNavItems = ({ active, sideNav, icon, title }) => {
  const [showMenu, setShowMenu] = useState(false);
  const {colorMode} = useColorMode();
  return (
    <Flex
      flexDir="column"
      w="100%"
      alignItems={sideNav === "large" ? "flex-start" : "center"}
    >
      <Menu placement="right">
        <Link
          onMouseOver={(e) => setShowMenu(e.target.value)}
          onMouseLeave={(e) => setShowMenu(e.target.value)}
        
          p={2}
          borderRadius={0}
          _hover={{
            borderRadius:"5px",
            textDecor: "none",
            color: "#ffa585",
            backgroundColor:colorMode==="light"? "#E7E7ED" : "#202740"
          }}
          w={sideNav === "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="2xl"
               color={active ? "#ffa585" : "gray.500"}
              />
              <Text ml={5} display={sideNav === "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
        {showMenu ? (
          <>
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
          </>
        ) : (
          <></>
        )}
      </Menu>
    </Flex>
  );
};

export default SideNavItems;

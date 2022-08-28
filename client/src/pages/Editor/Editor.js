import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  IconButton,
  Popover,
  PopoverTrigger,
  Center,
  Button,
  PopoverContent,
  useColorMode,
  Divider,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaCalendarCheck,
  FaSearch,
  FaPersonBooth,
  FaCar,
  FaLightbulb,
  FaEdit,
  FaMegaport,
  FaChair,
  FaKhanda,
  FaVrCardboard,
  FaFeather,
  FaUser,
  FaBell,
  FaUserPlus,
  FaAward,
} from "react-icons/fa";
import InputBox from "../../component/InputBox";
import SideNavItems from "../User/SideNavItems";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
const Editor = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const { colorMode, toggleColorMode } = useColorMode();
  const [navSize, setNavSize] = useState("large");
  const options = {
    responsive: true,
    barThickness:30,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May',];
  const data = {
    labels,
    datasets: [
      {
        label: 'profit',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgb(255,165,133,1)',
        borderWidth:1,
        width:2,
        borderColor:"rgb(255,165,133,1)"
      },
      {
        label: 'expense',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgb(255,237,160,1)',
        borderWidth:1,
        borderColor: 'rgb(255,237,160,1)',
      },
    ],
  };
  return (
    //container
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: colorMode === "light" ? "#F5F4F9" : "",
      }}
    >
      <Flex flexDir={"row"} p={2}>
        {/* sidenav */}
        <Flex>
          <Flex
            position={"sticky"}
            h={"100vh"}
            alignItems={navSize === "large" ? "flex-start" : "center"}
            w={navSize === "large" ? "200px" : "75px"}
            flexDir={"column"}
          >
            <Flex flexDir={"row"} alignItems="center" height={"70px"} mb={5}>
              <IconButton
                background={"none"}
                justifyContent="center"
                alignItems={"center"}
                _hover={{ background: "none" }}
                icon={<FaBars />}
                mr={2}
                onClick={() => {
                  navSize === "large"
                    ? setNavSize("small")
                    : setNavSize("large");
                }}
              />

              <Text
                display={navSize === "large" ? "flex" : "none"}
                fontSize="xl"
                fontWeight="extrabold"
                bgGradient={"linear( to-r,  #ffa585, #ffeda0)"}
                bgClip="text"
                as={"h2"}
              >
                LOMI
              </Text>
            </Flex>

            <SideNavItems
              sideNav={navSize}
              active={true}
              icon={FaHome}
              title="Home"
            />
            <SideNavItems
              sideNav={navSize}
              icon={FaPersonBooth}
              title="Booth"
            />
            <SideNavItems sideNav={navSize} icon={FaCar} title="Car" />
            <SideNavItems sideNav={navSize} icon={FaLightbulb} title="Bulb" />
            <Divider />
            <SideNavItems sideNav={navSize} icon={FaEdit} title="Edit" />
            <SideNavItems
              sideNav={navSize}
              icon={FaMegaport}
              title="Megaport"
            />
            <SideNavItems sideNav={navSize} icon={FaChair} title="Chair" />
            <Divider />
            <SideNavItems sideNav={navSize} icon={FaKhanda} title="Khanda" />
            <SideNavItems
              sideNav={navSize}
              icon={FaVrCardboard}
              title="Carboard"
            />
            <SideNavItems sideNav={navSize} icon={FaFeather} title="Feather" />
          </Flex>
        </Flex>
        {/* content */}
        <Flex pl={4} pr={4} width={"100%"} flexDir="column">
          <Flex
            height={"70px"}
            width="100%"
            justifyContent={"space-between"}
            alignItems="center"
            mb={5}
          >
            <Flex>
              <Input
                bgColor={colorMode === "light" ? "#E7E7ED" : "#202740"}
                width={"300px"}
              />
            </Flex>
            <Flex>
              <IconButton
                size="lg"
                colorScheme="gray"
                icon={<FaUser />}
                style={{ borderRadius: "50%" }}
                mr={2}
              />
              <IconButton
                size="lg"
                colorScheme="gray"
                icon={<FaBell />}
                style={{ borderRadius: "50%" }}
                mr={2}
              />
              <IconButton
                size="lg"
                onClick={() => {
                  colorMode === "light"
                    ? toggleColorMode("dark")
                    : toggleColorMode("light");
                }}
                colorScheme="gray"
                aria-label="Search database"
                style={{ borderRadius: "50%" }}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              />
            </Flex>
          </Flex>
          <Flex>
            {/* major left side content */}
            <Flex flex={3} width="100%" flexDir={"column"}>
              <Flex mb={4} justifyContent="space-between" alignItems={"center"}>
                <Text fontSize="xl" fontWeight="bold">
                  DASHBOARD
                </Text>
                <Flex alignItems={"center"}>
                  <Text mr={2}>Filter</Text>
                  <Input type="date" />
                </Flex>
              </Flex>

              <Flex
                borderRadius={"10px"}
                p={4}
                bgColor={colorMode === "light" ? "white" : "#202740"}
                justifyContent={"center"}
                alignItems="center"
                height={"450px"}
              >
             
                {/* the chart goes here */}
                <Bar style={{ width:"100%",height:"200px" }} options={options} data={data} />
              </Flex>
            </Flex>
            {/* minor right side content */}
            <Flex
              pl={3}
              w="100%"
              flexDir={"column"}
              flex={1}
              alignItems="center"
            >
              {/* <Flex mb={4} width="100%" justifyContent="flex-start" alignItems={"center"}>
                <Text fontSize="xl" fontWeight="bold">
                  Specification
                </Text>
              </Flex> */}
              <Flex
                borderRadius={"10px"}
                mb={2}
                height={"150px"}
                width="250px"
                bgColor={colorMode === "light" ? "white" : "#202740"}
                justifyContent="center"
                alignItems={"center"}
                flexDir="column"
              >
                <FaUserPlus color="#ffeda0" fontSize={"40px"} />
                <Text fontSize="xl" fontWeight="light">
                  Active Members
                </Text>
              </Flex>
              <Flex
                borderRadius={"10px"}
                mb={2}
                height={"150px"}
                width="250px"
                bgColor={colorMode === "light" ? "white" : "#202740"}
                justifyContent="center"
                alignItems={"center"}
                flexDir="column"
              >
                <FaAward color="#ffa585" fontSize={"40px"} />
                <Text fontSize="xl" fontWeight="light">
                  Awarded Members
                </Text>
              </Flex>
              <Flex
                borderRadius={"10px"}
                bgGradient={"linear( to-r,  #ffa585, #ffeda0)"}
                bgClip="Flex"
                mb={2}
                height={"150px"}
                width="250px"
                bgColor={"white"}
                justifyContent="center"
                alignItems={"center"}
                flexDir="column"
              >
                {" "}
                <FaAward color="#202740" fontSize={"40px"} />
                <Text fontSize="xl" fontWeight="light">
                  Awarded Members
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default Editor;

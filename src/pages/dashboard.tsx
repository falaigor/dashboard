import {
  Flex,
  SimpleGrid,
  Box,
  Text,
  theme,
  StatGroup,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  Link,
  Divider,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Dashboard() {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: theme.colors.gray[500],
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      enabled: false,
      x: {
        format: "MMM yyyy",
      },
    },
    xaxis: {
      type: "datetime",
      min: new Date("Jan 2022").getTime(),
      tickAmount: 12,
      axisBorder: {
        color: theme.colors.gray[600],
      },
      axisTicks: {
        color: theme.colors.gray[600],
      },
      categories: [
        "Jan 2022",
        "Feb 2022",
        "Mar 2022",
        "Apr 2022",
        "May 2022",
        "Jun 2022",
        "Jul 2022",
        "Aug 2022",
        "Sep 2022",
        "Oct 2022",
        "Nov 2022",
        "Dec 2022",
      ],
    },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
  };

  const series = [
    {
      name: "series1",
      data: [21, 120, 34, 90, 12, 45, 120, 21, 120, 34, 90, 12],
    },
    {
      name: "series2",
      data: [0, 0, 0, 31, 20, 14, 30, 32, 1, 3, 5, 12],
    },
  ];

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex width="100%" maxWidth={1480} mx="auto" my="6" px="6">
        <Sidebar />

        <SimpleGrid
          flex="1"
          gap="4"
          gridRow={2}
          gridColumn={1}
          align="flex-start"
        >
          <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
            <Box p={["6", "8"]} pb="4" bg="gray.800" borderRadius={8}>
              <Text fontSize="large" mb="4">
                Melhoria em relacao ao mes passado
              </Text>
              <StatGroup>
                <Stat>
                  <StatNumber>345,670</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </Box>

            <Box p={["6", "8"]} pb="4" bg="gray.800" borderRadius={8}>
              <Text fontSize="large" mb="4">
                reviews deste mes
              </Text>
              <StatGroup>
                <Stat>
                  <StatNumber>345,670</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </Box>
          </SimpleGrid>

          <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
            <Box p={["6", "8"]} pb="4" bg="gray.800" borderRadius={8}>
              <Text fontSize="large" mb="4">
                Gráfico Geral
              </Text>
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            </Box>
          </SimpleGrid>

          <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
            <Box p={["6", "8"]} pb="4" bg="gray.800" borderRadius={8}>
              <Text fontSize="large" mb="4">
                Últimos Trabalhos
              </Text>
              <Box>
                <Link color="gray.300" href="#">
                  links can live inline with text
                </Link>
                <Divider mb={1} />

                <Link color="gray.300" href="#">
                  links can live inline with text
                </Link>
                <Divider mb={1} />

                <Link color="gray.300" href="#">
                  links can live inline with text
                </Link>
                <Divider mb={1} />
              </Box>
            </Box>
          </SimpleGrid>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

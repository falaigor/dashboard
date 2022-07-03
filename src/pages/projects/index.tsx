import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Th,
  Thead,
  Tr,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { prisma } from "../../lib/prisma";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { Project } from "@prisma/client";

type ProjectsProps = {
  projects: Project[];
};

export default function ProjectList({ projects }: ProjectsProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />

      <Flex width="100%" maxWidth={1480} mx="auto" my="6" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Projetos
            </Heading>

            <Link href="/projects/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Projeto</Th>
                {isWideVersion && <Th>Data de Cadastro</Th>}
              </Tr>
            </Thead>

            <Tbody>
              {projects.map((p) => (
                <Tr>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">{p.name}</Text>
                    </Box>
                  </Td>
                  {isWideVersion && <Td>28 de Abril, 2021</Td>}
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const projects = await prisma.project.findMany();

  const data = projects.map((project) => {
    return {
      id: project.id,
      name: project.name,
      date: project.createdAt.toISOString(),
    };
  });

  return {
    props: {
      projects: data,
    },
  };
};

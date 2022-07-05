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

export const getServerSideProps: GetServerSideProps = async () => {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      issues: {
        select: {
          quantity: true,
        },
      },
    },
  });

  const data = projects.map((project) => {
    return {
      id: project.id,
      name: project.name,
      createdAt: project.createdAt.toLocaleDateString("pt-BR"),
      issues: project.issues,
    };
  });
  console.log(data);

  return {
    props: {
      projects: data,
    },
  };
};

type ProjectsProps = {
  projects: {
    id: string;
    name: string;
    createdAt: Date;
    issues: { quantity: number }[];
  }[];
};

export default function ProjectList({ projects }: ProjectsProps) {
  function issuesQuantity(issues: any) {
    if (issues.length === 0) return "0";

    return issues.map((issue) => issue.quantity).reduce((acc, i) => acc + i);
  }

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
                <Th>Issues</Th>
                {isWideVersion && <Th>Data de Cadastro</Th>}
              </Tr>
            </Thead>

            <Tbody>
              {projects.map((p) => (
                <Tr key={p.id}>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">{p.name}</Text>
                    </Box>
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">{issuesQuantity(p.issues)}</Text>
                    </Box>
                  </Td>
                  {isWideVersion && <Td>{p.createdAt}</Td>}
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

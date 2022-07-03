import { Stack } from "@chakra-ui/react";
import { RiDashboardLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/">
          Dashboard
        </NavLink>

        <NavLink icon={RiDashboardLine} href="/projects">
          Projetos
        </NavLink>
      </NavSection>
    </Stack>
  );
}

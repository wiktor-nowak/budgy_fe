// import { useState, useEffect } from "react";
import {
  FiShoppingCart,
  FiBarChart2,
  FiCreditCard,
  FiSettings,
  FiSun,
  FiMoon,
  FiUsers,
  FiTool,
  FiLogOut,
  FiChevronRight,
  FiHexagon,
} from "react-icons/fi";
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link, useNavigate } from "react-router-dom";
// import { getMyAccounts, type Account } from "@/lib/api/accounts";
import { THEME_STORAGE_KEY } from "@/lib/constants";
import { useTheme } from "@/lib/hooks/theme";
import { ThemeValues } from "../theme/ThemeContext";
import { toast } from "sonner";
import { useLogout } from "@/lib/hooks/auth";
import { useAccounts } from "@/lib/hooks/accounts";
// import { useEffect } from "react";

const SideBar = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const { data: accounts } = useAccounts();
  const { mutate } = useLogout();

  const toggleDarkMode = () => {
    const currentTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (
      currentTheme === ThemeValues.SYSTEM ||
      currentTheme === ThemeValues.LIGHT
    ) {
      setTheme(ThemeValues.DARK);
    } else {
      setTheme(ThemeValues.LIGHT);
    }
  };

  const isDarkTheme = () =>
    localStorage.getItem(THEME_STORAGE_KEY) === ThemeValues.DARK;

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully!");
        navigate("/login");
      },
    });
  };

  type ShowAccountType = {
    id: string;
    name: string;
    type: "CASH" | "BANK" | "SHARED";
  };

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="mr-2">
            <SidebarMenuButton className="cursor-pointer py-6" asChild>
              <Link to="/">
                <h1 className="text-3xl font-bold text-lemongreen">Budgy</h1>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/spendings">
                  <FiShoppingCart />
                  Monthly Spendings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/transactions">
                  <FiCreditCard />
                  Transactions
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/charts">
                  <FiBarChart2 />
                  Charts
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/test">
                  <FiHexagon />
                  Test
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Accounts</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip="MyGroup"
                    className="cursor-pointer"
                  >
                    <FiUsers />
                    My Accounts
                    <FiChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {accounts &&
                      accounts.map((account: ShowAccountType) => (
                        <SidebarMenuSubItem key={account.id}>
                          <SidebarMenuSubButton asChild>
                            <Link to={`/account/${account.id}`}>
                              {account.name}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/manage-accounts">
                          <FiTool />
                          Manage Accounts
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Controls</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/settings">
                  <FiSettings />
                  Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={toggleDarkMode}
                className="cursor-pointer"
              >
                {isDarkTheme() ? <FiSun /> : <FiMoon />}
                {isDarkTheme() ? "Light Mode" : "Dark Mode"}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <FiLogOut />
                Log Out
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;

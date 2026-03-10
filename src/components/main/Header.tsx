import { FiSearch, FiPlus } from "react-icons/fi";
// import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import TransactionForm from "../forms/TransactionForm";

// import { useAuth } from "@/lib/context/auth-context";
// import { getAccountsCount } from "@/lib/api/accounts";

const Header = () => {
  // const { accessToken } = useAuth();

  // const fireRequest = () => {
  //   if (accessToken) getAccountsCount(accessToken);
  // };

  return (
    <header className="bg-bg-light shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center flex-1 ml-4">
        <div className="relative w-full">
          <InputGroup className="max-w-xlg">
            <InputGroupInput placeholder="Search..." type="search" />
            <InputGroupAddon>
              <FiSearch />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      <div className="flex items-center space-x-4 px-4 pl-8">
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button variant="ghost" size="lg">
              <FiPlus />
              ADD NEW
            </Button>
          </DrawerTrigger>
          <TransactionForm />
        </Drawer>
        {/* <Link to="#"></Link> */}
      </div>
    </header>
  );
};

export default Header;

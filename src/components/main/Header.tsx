import { FiSearch, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="bg-bg-light shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center flex-1 ml-4">
        <div className="relative w-full">
          <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-text-secondary dark:text-dark-text-secondary" />
          <input
            type="text"
            placeholder="Search for something..."
            className="bg-bg-light border-1 border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full text-dark hover:border-juicygreen focus:border-juicygreen focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4 px-4 pl-8">
        <Link to="/add-spending">
          <Button variant="ghost" size="lg">
            <FiPlus />
            ADD NEW
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;

import {
  //   NavigationMenu,
  //   NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  //   NavigationMenuList,
  //   NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

interface SideBarButtonProps {
  Icon: React.ComponentType<{ className?: string }>;
  url: string;
  text: string;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({ Icon, url, text }) => {
  return (
    <NavigationMenuItem className="w-full">
      <Link to={url} className="w-full">
        <NavigationMenuLink className="flex flex-row items-center py-2 text-sm font-medium rounded-md hover:bg-forestgreen w-full">
          <Icon className="mr-3" />
          {text}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default SideBarButton;

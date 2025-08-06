import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SidebarItem = ({
  icon,
  label,
  path,
  activeItem,
  setActiveItem,
  onClick,
}) => {
  const handleClick = (e) => {
    setActiveItem(label);
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  // If path is provided and no onClick, render as Link
  if (path && !onClick) {
    return (
      <Link to={path} className="block">
        <Button
          variant="ghost"
          onClick={() => setActiveItem(label)}
          className={`w-full justify-start gap-3 px-4 py-3 rounded-lg text-gray-700 transition-all ${
            activeItem === label
              ? "bg-blue-100 text-blue-600 font-semibold  hover:bg-blue-100 hover:text-blue-600"
              : "hover:bg-gray-200"
          }`}
        >
          <span className="text-lg">{icon}</span>
          <span>{label}</span>
        </Button>
      </Link>
    );
  }

  // If onClick is provided (e.g., for logout), render as button only
  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={`w-full justify-start gap-3 px-4 py-3 rounded-lg text-gray-700 transition-all ${
        activeItem === label
          ? "bg-blue-100 text-blue-600 font-semibold  hover:bg-blue-100 hover:text-blue-600"
          : "hover:bg-gray-200"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Button>
  );
};

export default SidebarItem;

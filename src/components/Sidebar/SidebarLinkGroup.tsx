import React, { useState } from "react";

interface SidebarLinkGroupProps {
  children(handleClick: () => void, open: boolean): React.ReactNode;
  activeCondition: boolean;
}
const SidebarLinkGroup = ({
  children,
  activeCondition,
}: SidebarLinkGroupProps) => {
  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        activeCondition && "bg-slate-900"
      }`}
    >
      {children(handleClick, open)}
    </li>
  );
};

export default SidebarLinkGroup;

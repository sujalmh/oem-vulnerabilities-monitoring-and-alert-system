import { TabNav, Box, Text } from "@radix-ui/themes";
import classes from "./Tabs.module.css";
import All from "../Content/All/All";
import Vulnerabilities from "../Content/IT/IT";
import { Link, useLocation } from "react-router-dom";

const Main = () => {
  const location = useLocation();
  return (
    <div className="mb-4">
      <TabNav.Root>
        <TabNav.Link asChild active={location.pathname === "/vulns/all"}>
          <Link to="/vulns/all">All</Link>
        </TabNav.Link>
        <TabNav.Link asChild active={location.pathname === "/vulns/it"}>
          <Link to="/vulns/it">Information Technology</Link>
        </TabNav.Link>
        <TabNav.Link asChild active={location.pathname === "/vulns/ot"}>
          <Link to="/vulns/ot">Operational Technology</Link>
        </TabNav.Link>
      </TabNav.Root>
    </div>
  );
};
export default Main;

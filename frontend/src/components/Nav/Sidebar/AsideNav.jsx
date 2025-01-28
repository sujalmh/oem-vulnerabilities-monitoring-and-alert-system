import {
  Home,
  MessageCircleQuestion,
  Waves,
  NotebookTabs,
  Telescope,
  GraduationCap,
  TriangleAlert,
  FilePen,
  Building2,
  FlagTriangleRight,
  LifeBuoy,
  BadgePlus,
  Settings,
  ArrowRightFromLine
} from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";

const AsideNav = () => {
  return (
    <>
      <div className="flex fixed z-20 left-0 top-0 text-white">
        <Sidebar>
          <SidebarItem icon={<Home size={20} />} text="Home" location="/" />
          <SidebarItem
            icon={<ArrowRightFromLine size={20} />}
            text="Export"
            location="/export"
          />
          <SidebarItem
            icon={<TriangleAlert size={20} />}
            text="Vulnerabilities"
            location="/vulns"
          />
          <SidebarItem
            icon={<MessageCircleQuestion size={20} />}
            text="FAQ"
            location="/knowledge-base"
          />
          {/* <SidebarItem
            icon={<GraduationCap size={20} />}
            text="Tutorials"
            location="/tutorial"
            batch
          /> */}
          <SidebarItem
            icon={<FilePen size={20} />}
            text="FeedBack"
            location="/feedback"
          />
        {/* <SidebarItem
            icon={<FlagTriangleRight size={20} />}
            text="Report Vulnerability"
            location="/report"
          />  */}


          {/* <SidebarItem
            icon={<NotebookTabs size={20} />}
            text="Scraping Details"
            location="/scraper"
          /> */}
          <SidebarItem
            icon={<Waves size={20} />}
            text="Threads"
            location="/discussion"
            active={true}
          />
         {/* <SidebarItem
            icon={<BadgePlus size={20} />}
            text="Reported Vulnerabilities"
            location="/reported"
          />*/}
          
          <hr className="my-3" />
          <SidebarItem
            icon={<Settings size={20} />}
            text="Settings"
            location="/settings"
          />
          <SidebarItem
            icon={<LifeBuoy size={20} />}
            text="Help"
            location="/help"
          />
        </Sidebar>
      </div>
    </>
  );
};

export default AsideNav;

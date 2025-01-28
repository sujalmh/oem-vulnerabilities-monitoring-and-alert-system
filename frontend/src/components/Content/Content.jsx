import Tabs from "../Tabs/Tabs";
import { Route, Routes, useParams, Navigate } from "react-router-dom";
import All from "../Content/All/All";
import IT from "./IT/IT";
import OT from "./OT/OT";
import MoreDetails from "../Pages/MoreDetails";

const DynamicContent = (props) => {
  const { vulns } = useParams();
  if (vulns === "all") return <All data={props.allData} sortValue={props.sortValue} />;
  if (vulns === "it") return <IT data={props.allData} sortValue={props.sortValue} />;
  if (vulns === "ot") return <OT data={props.allData} sortValue={props.sortValue} />;

  return <div>Not Found</div>;
};

const Content = ({ allData, sortValue }) => {
  return (
    <>
      <Tabs />
      <Routes>
        <Route path=":vulns" element={<DynamicContent allData={allData} sortValue={sortValue} />} />
        
        <Route path="" element={<Navigate to="all" replace />} />
        
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
      
    </>
  );
};

export default Content;

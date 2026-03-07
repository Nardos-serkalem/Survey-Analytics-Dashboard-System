import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {  FaDatabase ,FaHome ,FaChartBar,FaChartPie, FaChartArea  } from "react-icons/fa";
import { HiCalendarDateRange } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useState } from "react";
import Card from "../../common/Card";
import Allchart from "../../charts/Allchart";
function Navbar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
      <div className="flex w-full h-screen bg-background border-r-2 border-border">
         
        <Sidebar  className="w-64 h-screen bg-backgroundsecondary" collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)}>
          <Menu>
            <MenuItem
        onClick={() => setCollapsed(!collapsed)}
        icon={<FaHome  />}
      >
        {!collapsed && "Dashboard"}
      </MenuItem>
            <SubMenu   icon={<FaChartArea  />} label="Charts" 
            className="    ">
            <MenuItem icon={<FaChartBar />}>Chart 1</MenuItem>
            <MenuItem icon={<FaChartPie />}>Chart 2</MenuItem>
            <MenuItem icon={<FaChartArea />}>Chart 3</MenuItem>
          </SubMenu>
            <MenuItem icon={<FaDatabase  />} >Report</MenuItem>
            <MenuItem icon={<HiCalendarDateRange />} >Calender</MenuItem>
          </Menu>
        </Sidebar>
        <main className="p-4 flex-1">
          <Card />
          <Allchart />

        </main>
        
    </div>
  )
}

export default Navbar
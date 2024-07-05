import React from 'react';
import { MenuIcon } from '@heroicons/react/outline';
import { MdPendingActions, MdAccountTree, MdBugReport } from "react-icons/md";

function TopBar(props) {
  return (
    <div className="h-16 pl-40 fixed bg-[#363636] w-full flex items-center justify-between pr-5">
      <div className="flex px-5 items-center">
        <MenuIcon className="w-7 h-7 text-white" />
        <h1 className="ml-3 text-white text-2xl font-bold">Task</h1>
      </div>
      <div className="flex space-x-6">
        <MdPendingActions className="w-7 h-7 text-white" />
        <MdAccountTree className="w-7 h-7 text-white" />
        <MdBugReport className="w-7 h-7 text-white" />
      </div>
    </div>
  );
}

export default TopBar;
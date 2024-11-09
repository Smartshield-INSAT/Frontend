import React from "react";

const UserRow = ({ user }) =>{
    return (
      <div className="flex items-center justify-between py-2 border-b border-gray-700">
        <div>
          <div className="flex items-center">
            {user.isHighRisk && <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />}
            <span className="font-medium">{user.serverId}</span>
          </div>
          <p className="text-sm text-gray-400">{user.role}</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">{user.count}</span>
          <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${(user.overallRisk / 600) * 100}%` }}
            />
          </div>
          <span className="text-sm">{user.overallRisk}</span>
        </div>
      </div>
    );
  }

export default UserRow;
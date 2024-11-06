import React from "react";




interface Offense {
    id: string;
    user: string;
    description: string;
    eventCount: number;
    flowCount: number;
    magnitude: number;
    updated: string;
  }
  
export default function OffenseCard({ offense }: { offense: Offense }) {
    return (
      <div className="border-t border-gray-700 pt-4">
        <div className="flex  justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Offense {offense.id}</span>
          <span className="text-sm text-gray-400">{offense.updated}</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
          <span className="font-medium">{offense.user}</span>
        </div>
        <p className="text-sm mb-2">{offense.description}</p>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Event count: {offense.eventCount}</span>
          <span>Flow count: {offense.flowCount}</span>
          <div className="flex items-center">
            <span className="mr-2">Magnitude: {offense.magnitude}/10</span>
            <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${(offense.magnitude / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
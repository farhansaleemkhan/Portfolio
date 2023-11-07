import React, { useState } from "react";
import { Modal } from "./Modal";
import ActionButton from "../Screens/Admin/components/ActionButton";

export const Table = ({ tTitle, config = [], mList }) => {

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {tTitle.map((title, index) => (
                    <th key={index} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {title.t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mList.map((list, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {list.senderName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {list.senderEmail}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {list.senderPhoneNo}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block font-semibold text-green-900 leading-tight">
                        <span className="absolute inset-0 bg-green-200 opacity-50 rounded-full" />
                        {config &&
                          config.map((item, index) => {
                            const data = {
                              ...item,
                              params: list.senderMessage
                            }
                            return (
                              <ActionButton item={data} key={index}/>
                            );
                          })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto w-full mt-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="text-xs text-center font-bold text-gray-700 px-4 py-3 whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border border-gray-200 hover:bg-gray-50"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-3 py-3 text-xs border border-gray-200 text-center text-gray-800 whitespace-nowrap font-bold"
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-5 text-gray-500 font-bold"
              >
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

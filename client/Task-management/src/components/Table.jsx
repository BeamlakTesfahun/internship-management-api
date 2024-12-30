import React from 'react';
import './Table.css';

const Table = ({ headers, data, actions }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
                {actions && (
                  <td>
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + (actions ? 1 : 0)}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

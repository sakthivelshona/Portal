

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

function FetchCSVData() {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        // URL to fetch your Google Sheet as CSV
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSmvIRcstgtVTOPkJW9K0940bYc_IOSRTVn9ySiSGBqZKh3VwRMuoOQhAZDP5-Dkq1KJkJemW2WDsHu/pub?output=csv'
        // const sheetUrl = process.env.REACT_APP_SHEET_URL
        const response = await fetch(sheetUrl);
        const csvText = await response.text();
        
        // Parse the CSV text into an array of objects
        Papa.parse(csvText, {
          header: true, // Use the first row as keys (column headers)
          skipEmptyLines: true, // Skip empty lines
          complete: (result) => {


            // Limit to first 3 rows and first 4 columns
            const limitedData = result.data.slice(0, 3).map((row) => {
              const limitedRow = {};
              Object.keys(row).slice(0, 4).forEach((key) => {
                limitedRow[key] = row[key];
              });
              return limitedRow;
            });
            setCsvData(limitedData); // Store the filtered data in state

            
          },
        });
      } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
      }
    };
    fetchCSV();
  }, []);

  return (
    <div>
      <h1>CSV Data Table</h1>
      <table border="1">
        <thead>
          <tr>
            {/* Dynamically render table headers based on the CSV data */}
            {csvData.length > 0 && Object.keys(csvData[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render rows of data */}
          {csvData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FetchCSVData;

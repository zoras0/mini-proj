import React, { useState } from 'react';
import { BarChart2, Download, Calendar } from 'lucide-react';

const GenerateReports: React.FC = () => {
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  const handleGenerateReport = () => {
    // Mock report generation
    const mockReport = {
      type: reportType,
      startDate,
      endDate,
      data: [
        { label: 'Students Registered', value: 150 },
        { label: 'Companies Registered', value: 25 },
        { label: 'Internships Posted', value: 75 },
        { label: 'Applications Submitted', value: 300 },
      ],
    };
    setGeneratedReport(mockReport);
  };

  const handleDownload = (format: string) => {
    console.log(`Downloading report in ${format} format`);
    // Implement download logic here
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Generate Reports</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="reportType" className="block mb-2">Report Type</label>
            <select
              id="reportType"
              className="w-full px-3 py-2 border rounded-md"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="">Select Report Type</option>
              <option value="userActivity">User Activity</option>
              <option value="internshipStatistics">Internship Statistics</option>
              <option value="companyEngagement">Company Engagement</option>
            </select>
          </div>
          <div>
            <label htmlFor="startDate" className="block mb-2">Start Date</label>
            <input
              type="date"
              id="startDate"
              className="w-full px-3 py-2 border rounded-md"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block mb-2">End Date</label>
            <input
              type="date"
              id="endDate"
              className="w-full px-3 py-2 border rounded-md"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          onClick={handleGenerateReport}
        >
          <BarChart2 size={20} className="mr-2" />
          Generate Report
        </button>
      </div>

      {generatedReport && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Generated Report: {generatedReport.type}</h3>
          <p className="mb-2">
            <Calendar size={16} className="inline-block mr-2" />
            Period: {generatedReport.startDate} to {generatedReport.endDate}
          </p>
          <div className="mb-4">
            {generatedReport.data.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span>{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 flex items-center"
              onClick={() => handleDownload('pdf')}
            >
              <Download size={20} className="mr-2" />
              Download PDF
            </button>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
              onClick={() => handleDownload('csv')}
            >
              <Download size={20} className="mr-2" />
              Download CSV
            </button>
            <button
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 flex items-center"
              onClick={() => handleDownload('excel')}
            >
              <Download size={20} className="mr-2" />
              Download Excel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Scheduled Reports</h3>
        <div className="mb-4">
          <label htmlFor="scheduleType" className="block mb-2">Schedule Type</label>
          <select id="scheduleType" className="w-full px-3 py-2 border rounded-md">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="scheduleReport" className="block mb-2">Report to Schedule</label>
          <select id="scheduleReport" className="w-full px-3 py-2 border rounded-md">
            <option value="userActivity">User Activity</option>
            <option value="internshipStatistics">Internship Statistics</option>
            <option value="companyEngagement">Company Engagement</option>
          </select>
        </div>
        <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300">
          Schedule Report
        </button>
      </div>
    </div>
  );
};

export default GenerateReports;
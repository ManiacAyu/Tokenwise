import React from 'react';

const ExportCSVButton = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/export/csv');

      if (!response.ok) throw new Error('Failed to download CSV');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'transactions.csv';
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('❌ Error downloading CSV:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      ⬇️ Download CSV
    </button>
  );
};

export default ExportCSVButton;

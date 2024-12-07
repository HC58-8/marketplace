import React from 'react';

const PowerBIReport = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Power BI Report</h2>
      <iframe
        title="PowerBIReport"
        width="100%"  // Vous pouvez ajuster la largeur
        height="600"  // Ajustez la hauteur si nécessaire
        src="https://app.powerbi.com/view?r=eyJrIjoiY2QyZDBlNDktM2JmOC00Mzc1LTk1YjUtMjg0YmQwOTRkYjYxIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"         frameBorder="0"
        allowFullScreen="true"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
};

export default PowerBIReport;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const PythonReport = () => {
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/python-report');
        
        // Assurez-vous que la réponse contient bien un tableau de produits
        if (Array.isArray(response.data)) {
          setReportData(response.data);
        } else {
          throw new Error('Les données ne sont pas valides.');
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError('Erreur lors de la récupération des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  if (loading) {
    return <div>Chargement du rapport...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (reportData.length === 0) {
    return <div>Aucune donnée disponible pour le rapport.</div>;
  }

  // Récupérer les catégories dynamiquement en fonction des produits
  const categories = [...new Set(reportData.map(item => item.category))]; 
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = reportData.filter(item => item.category === category).length;
    return acc;
  }, {});

  // Calculer le total général
  const totalGeneral = reportData.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  // Graphique en ligne (Line chart)
  const chartDataLine = {
    labels: reportData.map(item => item.name),
    datasets: [
      {
        label: 'Prix des Produits',
        data: reportData.map(item => parseFloat(item.price) || 0),  // Convertir en nombre
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Graphique en secteur (Doughnut chart)
  const chartDataDoughnut = {
    labels: categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)), // Capitaliser les catégories
    datasets: [
      {
        label: 'Nombre de Produits',
        data: categories.map(cat => categoryCounts[cat]),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
      },
    ],
  };

  // Graphique en barre (Bar chart)
  const chartDataBar = {
    labels: reportData.map(item => item.name),
    datasets: [
      {
        label: 'Prix des Produits',
        data: reportData.map(item => parseFloat(item.price) || 0),  // Convertir en nombre
        backgroundColor: 'rgba(75,192,192,0.5)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  // Options pour les graphiques
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      x: { title: { display: true, text: 'Produits' } },
      y: { title: { display: true, text: 'Valeur (TND)' } },
    },
  };

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold text-center">Rapport Python</h2>
      <div className="mt-4">
        {/* Graphique en ligne */}
        <div style={{ height: '300px' }}>
          <h3 className="text-xl font-semibold">Graphique en Ligne</h3>
          <Line data={chartDataLine} options={chartOptions} />
        </div>
        
        {/* Graphique en secteur */}
        <div style={{ height: '300px' }}>
          <h3 className="text-xl font-semibold mt-8">Graphique en Secteur</h3>
          <Doughnut data={chartDataDoughnut} options={chartOptions} />
        </div>

        {/* Graphique en barre */}
        <div style={{ height: '300px' }}>
          <h3 className="text-xl font-semibold mt-8">Graphique en Barre</h3>
          <Bar data={chartDataBar} options={chartOptions} />
        </div>

        {/* Tableau des produits */}
        <h3 className="text-xl font-semibold mt-8">Tableau des Produits</h3>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Prix (TND)</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{parseFloat(item.price).toFixed(2)} TND</td>
                <td>
                  {item.imgSrc ? (
                    <img src={item.imgSrc} alt={item.name} className="w-16 h-16" />
                  ) : (
                    <span>Aucune image</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total général */}
        <h3 className="text-xl font-semibold mt-4">Total Général</h3>
        <p>{totalGeneral.toFixed(2)} TND</p>
      </div>
    </div>
  );
};

export default PythonReport;

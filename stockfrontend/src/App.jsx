import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/QCOM');
                setStockData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatDate = (datetime) => {
        const date = new Date(datetime); 
        return date.toLocaleString(); 
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="stock-container">
            <h1>Tesla (TSLA) Stock Data</h1>
            <div className="metrics-grid">
                <div className="metric-card">
                    <h3>Trailing P/E</h3>
                    <p>{stockData.trailingPE?.toFixed(2) || 'N/A'}</p>
                </div>
                <div className="metric-card">
                    <h3>Forward P/E</h3>
                    <p>{stockData.forwardPE?.toFixed(2) || 'N/A'}</p>
                </div>
                <div className="metric-card">
                    <h3>EPS (TTM)</h3>
                    <p>{stockData.eps?.toFixed(2) || 'N/A'}</p>
                </div>
                <div className="metric-card">
                    <h3>Market Cap</h3>
                    <p>${(stockData.marketCap / 1e9).toFixed(2)}B</p>
                </div>
                <div className="metric-card">
                    <h3>52-Week High</h3>
                    <p>${stockData.high52?.toFixed(2) || 'N/A'}</p>
                </div>
                <div className="metric-card">
                    <h3>52-Week Low</h3>
                    <p>${stockData.low52?.toFixed(2) || 'N/A'}</p>
                </div>               
            </div>
            <div>
                <div>
                    <h3>Last refreshed</h3>
                    <p>{stockData.last_refreshed || 'N/A'}</p>
                </div>
                <div>
                    <h3>Current Time</h3>
                    <p>{stockData.current_time || 'N/A'}</p>
                </div>
                <div>
                    <h3>Earnings date</h3>
                    <p>{stockData.EarningsDate || 'N/A'}</p>
                </div>
                {/*<div>
                    <h3>Quarterly Financials</h3>
                    <p>{stockData.QuarterlyFinancials || 'N/A'}
                        
                        {stockData.QuarterlyFinancials.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </p>
                </div>*/}
            </div>
        </div>
    );
}

export default App;
from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
import yfinance as yf
import pandas as pd

app = Flask(__name__)
CORS(app)  

@app.route('/api/QCOM', methods=['GET'])
def get_tsla_data():
    try:
        tsla = yf.Ticker("QCOM")
        info = tsla.info
        calendar = tsla.calendar
        #quarterly_dates = tsla.quarterly_financials.columns
        history = tsla.history(period="1d")  
        
        data = {
            #'QuarterlyFinancials': quarterly_dates,
            'EarningsDate': calendar.get('Earnings Date'),
            'trailingPE': info.get('trailingPE'),
            'forwardPE': info.get('forwardPE'),
            'eps': info.get('trailingEps'),
            'marketCap': info.get('marketCap'),
            'high52': info.get('fiftyTwoWeekHigh'),
            'low52': info.get('fiftyTwoWeekLow'),
            'last_refreshed': history.index[0].strftime('%Y-%m-%d %H:%M:%S'),
            'current_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        return jsonify(data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

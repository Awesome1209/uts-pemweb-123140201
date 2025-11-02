import React from 'react';

const styles = `
  .detail-card {
    background: #FFFFFF; /* Latar belakang card putih */
    padding: 1.8rem;
    border-radius: 20px;
    border: 1px solid #DDE8F3; /* Border soft blue */
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
  }

  .card-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  .card-header h2 {
    font-size: 1.75rem;
    color: #002D62; /* Teks biru gelap */
    font-weight: 600;
  }
  .card-header p {
    font-size: 1rem;
    color: #1E5A93; /* Teks biru sedang */
    margin: 0.25rem 0 0;
    font-weight: 400;
  }

  .weather-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .weather-icon {
    width: 140px;
    height: 140px;
    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.1));
  }

  .weather-temp {
    font-size: 4.5rem;
    font-weight: 700;
    line-height: 1;
    color: #002D62; /* Teks biru gelap */
  }

  .temp-unit {
    font-size: 2rem;
    vertical-align: top;
    margin-left: 0.25rem;
    color: #1E5A93; /* Teks biru sedang */
  }

  .weather-desc {
    font-size: 1.25rem;
    text-transform: capitalize;
    color: #1E5A93; /* Teks biru sedang */
    font-weight: 500;
    margin: 0;
  }

  .weather-details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 1.2rem;
    margin-top: 2rem;
    text-align: center;
  }

  .detail-item {
    background: #F0F7FF; /* Latar soft blue */
    padding: 1.2rem;
    border-radius: 15px;
    border: 1px solid #DDE8F3; /* Border soft blue */
  }

  .detail-item strong {
    display: block;
    font-size: 0.9rem;
    color: #1E5A93; /* Teks biru sedang */
    margin-bottom: 0.35rem;
    font-weight: 500;
  }

  .detail-item p {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #002D62; /* Teks biru gelap */
  }
`;

const DetailCard = ({ data, unit }) => {
  const { name, main, weather, wind } = data;

  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  return (
    <>
      <style>{styles}</style>

      <section className="detail-card">
        <div className="card-header">
          <h2>{name}</h2>
          <p>{new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
        </div>

        <div className="weather-main">
          <img src={iconUrl} alt={weather[0].description} className="weather-icon" />
          <div className="weather-temp">
            {Math.round(main.temp)}
            <span className="temp-unit">{tempUnit}</span>
          </div>
          <p className="weather-desc">{weather[0].description}</p>
        </div>
        
        <div className="weather-details-grid">
          <div className="detail-item">
            <strong>Terasa Seperti</strong>
            <p>{Math.round(main.feels_like)}{tempUnit}</p>
          </div>
          <div className="detail-item">
            <strong>Kelembapan</strong>
            <p>{main.humidity}%</p>
          </div>
          <div className="detail-item">
            <strong>Kecepatan Angin</strong>
            <p>{wind.speed} {windUnit}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailCard;
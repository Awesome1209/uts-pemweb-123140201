import React from 'react';

const styles = `
  .data-table-section {
    background: linear-gradient(to bottom, #a7c7e7, #ffffff);
    padding: 1.5rem;
    border-radius: 20px;
    border: 1px solid #DDE8F3; /* Border soft blue */
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
  }

  .data-table-section h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #002D62; /* Teks biru gelap */
    font-weight: 600;
    font-size: 1.2rem;
  }

  .table-container {
    overflow-x: auto;
  }

  .data-table-section table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    min-width: 600px;
  }

  .data-table-section table th,
  .data-table-section table td {
    padding: 1rem 1.2rem;
    border-bottom: 1px solid #EBF4FF; /* Border soft blue */
    vertical-align: middle;
  }

  .data-table-section table th {
    background: linear-gradient(to bottom, #a7c7e7, #ffffff);
    font-size: 0.9rem;
    font-weight: 500;
    color: #6699CC; /* Teks header biru muda */
    text-transform: uppercase;
    position: sticky;
    top: 0;
    z-index: 1;
    /* Tambahkan border bawah agar header terpisah */
    border-bottom: 2px solid #DDE8F3; 
  }

  .data-table-section table tbody tr:hover {
    background: linear-gradient(to bottom, #a7c7e7, #ffffff);
    cursor: default;
  }

  .data-table-section table tbody tr:last-child td {
    border-bottom: none;
  }

  .weather-cell {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-transform: capitalize;
    color: #1E5A93; /* Teks biru sedang */
    font-weight: 500;
  }

  .weather-cell img {
    width: 40px;
    height: 40px;
  }
`;

const DataTable = ({ data, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  const formatDate = (dt_txt) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString('id-ID', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <>
      <style>{styles}</style>

      <section className="data-table-section">
        <h3>Prakiraan 5 Hari</h3>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Cuaca</th>
                <th>Suhu</th>
                <th>Angin</th>
                <th>Kelembapan</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.dt}>
                  <td>{formatDate(item.dt_txt)}</td>
                  <td className="weather-cell">
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      title={item.weather[0].description}
                    />
                    <span>{item.weather[0].description}</span>
                  </td>
                  <td>{Math.round(item.main.temp)}{tempUnit}</td>
                  <td>{item.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</td>
                  <td>{item.main.humidity}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};


export default DataTable;

import React, { useState } from 'react';

const styles = `
  .search-section {
    background: #FFFFFF;
    padding: 1.5rem;
    border-radius: 20px;
    border: 1px solid #DDE8F3;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
  }

  .search-section h3 {
    display: none;
  }

  .search-form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    position: relative; 
  }

  .search-icon {
    position: absolute;
    left: 1rem; 
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: #6699CC; 
    z-index: 10;
    pointer-events: none; 
  }

  .search-form input[type="text"] {
    flex-grow: 1;
    padding: 0.85rem 1rem 0.85rem 3rem; 
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    border: none;
    background-color: #F0F7FF;
    border-radius: 12px;
  }

  .search-form input[type="text"]::placeholder {
      color: #6699CC;
  }

  .search-form input[type="text"]:focus {
    outline: 2px solid #6699CC;
  }

  .search-button {
    display: none; 
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  /* === CSS BARU UNTUK HEADER HISTORY === */
  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 1px solid #EBF4FF;
    padding-bottom: 0.75rem;
  }
  
  .history-title {
    /* Hapus styling yang sudah dipindah ke .history-header */
    margin-top: 0;
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
    color: #002D62;
    font-weight: 600;
    font-size: 1.1rem;
  }

  /* === CSS BARU UNTUK TOMBOL HAPUS === */
  .clear-history-button {
    background: none;
    border: none;
    color: #6699CC; /* Warna biru muda */
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    transition: background-color 0.2s, color 0.2s;
  }

  .clear-history-button:hover {
    background-color: #F0F7FF;
    color: #D32F2F; /* Warna merah saat hover */
  }
  /* === BATAS CSS BARU === */

  .history-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 200px;
    overflow-y: auto;
  }

  .history-list li {
    padding: 0.7rem 0.6rem;
    margin-bottom: 0.4rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
    color: #1E5A93;
    font-weight: 500;
    background-color: #F0F7FF;
    border: 1px solid #DDE8F3;
  }

  .history-list li:not(.no-history):hover,
  .history-list li:not(.no-history):focus {
    background-color: #DDE8F3;
    transform: translateX(3px);
    outline: none;
    color: #002D62;
  }

  .no-history {
    font-style: italic;
    color: #6699CC;
    cursor: default;
    background: none;
    border: none;
  }
`;

const SearchForm = ({ onSearch, history, onClearHistory }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <>
      <style>{styles}</style>
      
      <section className="search-section">
        <h3>Cari Kota</h3>
        <form onSubmit={handleSubmit} className="search-form">
          <svg 
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <label htmlFor="city-search" className="sr-only">Cari Kota</label>
          <input
            type="text"
            id="city-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for places..."
            required
            list="search-history"
            className="search-input"
          />
          <datalist id="search-history">
            {history.map(item => <option key={item} value={item} />)}
          </datalist>
          <button type="submit" className="search-button">Cari</button>
        </form>


        <div className="history-header">
          <h4 className="history-title">Riwayat Pencarian</h4>
          {history.length > 0 && (
            <button 
              onClick={onClearHistory} 
              className="clear-history-button"
            >
              Hapus
            </button>
          )}
        </div>

        <ul className="history-list">
          {history.length > 0 ? (
            history.map(item => (
              <li 
                key={item} 
                onClick={() => onSearch(item)}
                tabIndex="0"
                onKeyPress={(e) => e.key === 'Enter' && onSearch(item)}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="no-history">Belum ada riwayat.</li>
          )}
        </ul>
      </section>
    </>
  );
};

export default SearchForm;
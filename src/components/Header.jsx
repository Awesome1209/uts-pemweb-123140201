import React from 'react';

const styles = `
  .app-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 
    align-items: center;
    padding: 0 1rem;
    border-bottom: none;
    margin-bottom: 1.5rem;
    gap: 1rem;
  }

  .app-header h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #002D62;
  }

  /* === GAYA TOMBOL LAMA DIHAPUS === */
  /* .toggle-button { ... } */

  /* === GAYA SWITCH BARU DIMULAI DI SINI === */
  .toggle-switch {
    display: flex;
    /* Latar belakang soft blue untuk container switch */
    background-color: #F0F7FF; 
    border-radius: 20px;
    border: 1px solid #DDE8F3;
    padding: 4px; /* Padding agar tombol 'active' muat */
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .toggle-switch button {
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0.2rem 0.8rem;
    border: none;
    /* Sudut bulat agar pas di dalam container */
    border-radius: 18px; 
    cursor: pointer;
    /* Tombol inaktif transparan */
    background-color: transparent; 
    /* Teks tombol inaktif biru muda */
    color: #6699CC; 
    transition: all 0.3s ease;
  }

  .toggle-switch button.active {
    /* Tombol aktif berwarna putih */
    background-color: #FFFFFF; 
    /* Teks tombol aktif biru tua */
    color: #002D62; 
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  /* Saat tombol di-disable (karena sedang aktif), 
     cursor-nya normal */
  .toggle-switch button:disabled {
    cursor: default;
  }
`;

const Header = ({ onUnitToggle, currentUnit }) => {
  return (
    <>
      <style>{styles}</style>
      
      <header className="app-header">
        <h1>Weather Dashboard Awi</h1>
      
        <div className="toggle-switch">
          <button
           
            className={currentUnit === 'metric' ? 'active' : ''}
            onClick={currentUnit === 'imperial' ? onUnitToggle : null}
            disabled={currentUnit === 'metric'}
          >
            °C
          </button>
          <button
           
            className={currentUnit === 'imperial' ? 'active' : ''}
            onClick={currentUnit === 'metric' ? onUnitToggle : null}
            disabled={currentUnit === 'imperial'}
          >
            °F
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;

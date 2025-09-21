function App() {
  return (
    <div>
      {/* Navbar Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#"><i className="fas fa-hotel me-2"></i>Hotel Paraíso</a>
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="#">Inicio</a>
            <a className="nav-link" href="#">Habitaciones</a>
            <a className="nav-link" href="#">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Bienvenido a Hotel Paraíso</h1>
          <p className="lead">La mejor experiencia hotelera en Colombia</p>
          <button className="btn btn-light btn-lg">Reservar Ahora</button>
        </div>
      </div>

      {/* Habitaciones */}
      <div className="container py-5">
        <h2 className="text-center mb-5">Nuestras Habitaciones</h2>
        <div className="row">
          {/* Habitación 1 */}
          <div className="col-md-4 mb-4">
            <div className="card shadow">
              <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{height: '200px'}}>
                <i className="fas fa-bed fa-3x text-secondary"></i>
              </div>
              <div className="card-body">
                <h5 className="card-title">Habitación Estándar</h5>
                <p className="card-text">Cómoda habitación con todas las amenidades básicas.</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h4 text-primary mb-0">$120.000</span>
                  <small className="text-muted">/noche</small>
                </div>
              </div>
            </div>
          </div>

          {/* Habitación 2 */}
          <div className="col-md-4 mb-4">
            <div className="card shadow">
              <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{height: '200px'}}>
                <i className="fas fa-crown fa-3x text-warning"></i>
              </div>
              <div className="card-body">
                <h5 className="card-title">Suite Deluxe</h5>
                <p className="card-text">Amplia suite con jacuzzi y vista panorámica.</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h4 text-primary mb-0">$250.000</span>
                  <small className="text-muted">/noche</small>
                </div>
              </div>
            </div>
          </div>

          {/* Habitación 3 */}
          <div className="col-md-4 mb-4">
            <div className="card shadow">
              <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{height: '200px'}}>
                <i className="fas fa-gem fa-3x text-success"></i>
              </div>
              <div className="card-body">
                <h5 className="card-title">Penthouse Premium</h5>
                <p className="card-text">Lujo absoluto con terraza privada.</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h4 text-primary mb-0">$500.000</span>
                  <small className="text-muted">/noche</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0">&copy; 2024 Hotel Paraíso. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

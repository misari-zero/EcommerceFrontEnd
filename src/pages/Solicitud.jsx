import { useState } from 'react';

const Solicitud = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    fecha: '',
    dias: '',
    archivo: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, archivo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se manejaría la lógica para enviar los datos a un servidor o almacenarlos localmente
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombres" placeholder="Nombres" value={formData.nombres} onChange={handleInputChange} />
      <input type="text" name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleInputChange} />
      <input type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} />
      <input type="number" name="dias" placeholder="Días" value={formData.dias} onChange={handleInputChange} />
      <input type="file" name="archivo" onChange={handleFileChange} />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Solicitud;
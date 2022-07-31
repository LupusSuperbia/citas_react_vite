import {useState, useEffect} from 'react';
import Error from './Error';

const Formulario = ( {pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  /**
   * Crear el usestate para el error
   */
  const [error, setError] = useState(false);


    
    useEffect( () => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);

    }
  }, [paciente])

  

  /**
   * generarId para que el objeto sea unico
   */
  
  const generarId = () => {
    const random = Math.random().toString(36).slice(2); 
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //Validacion del formulario 
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setError(true);
      return;
    }

    setError(false)
    
    //Objeto de paciente
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,
    }

    if(paciente.id){
      // Editando el registro
      objetoPaciente.id = paciente.id

    const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados);
      setPaciente({});

    } else {
      // Nuevo Registro 
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }
    // Reiniciar El Form

    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }

  


  return (
    <div className="md:w-1/2 lg:w-2/5 mxñ">
      <h1 className="font-black text-3xl text-center">
        Seguimientos Pacientes
      </h1>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y{" "}
        <span className="text-indigo-600 font-bold  ">Administralos</span>
      </p>

      <form 
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
      {error && <Error><p>Todos los campos son obligatorios</p></Error>}
     
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase ">Nombre Mascota</label>
          <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md" 
            type="text"
            id="mascota"
            placeholder="Nombre de la Mascota"
            value={nombre}
            onChange = { (e) => setNombre(e.target.value)}
          />
        </div> 
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase ">Nombre Propietario</label>
          <input 
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md" 
            type="text"
            id="propietario"
            placeholder="Nombre del propietario"
            value={propietario}
            onChange = { (e) => setPropietario(e.target.value)}
          />
        </div> 
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase ">
            Email
          </label>
          <input 
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md" 
            type="email"
            id="email"
            placeholder="Email Contacto Propietario"
            value={email}
            onChange = { (e) => setEmail(e.target.value)}
          />
        </div> 
        <div className="mb-5">
          <label htmlFor="alta" 
          className="block text-gray-700 uppercase ">
            Alta
          </label>
          <input
           className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md" 
            type="date"
            id="alta"
            value={fecha}
            onChange = { (e) => setFecha(e.target.value)}
          />
        </div> 
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase ">
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md" 
            placeholder="Describe Los Sintomas"
            value={sintomas}
            onChange = { (e) => setSintomas(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          className = "bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
          
        /> 
      </form>
    </div>
  );
};

export default Formulario;

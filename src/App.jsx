import { useState, useEffect } from 'react';
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"



function App() {
  // Acá vemos el local storage si esta vacio o lleno 
  const Initial = JSON.parse(localStorage.getItem('pacientes')) ?? [];
  // Iniciamos el useState con la variable initial si esta vacio pone un arreglo [], y el otro si hay datos guardados se van a poner en el componente
  const [pacientes, setPacientes] = useState(Initial);
  const [paciente, setPaciente] = useState({});

  

  /**
   * localStorage
   */
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify( pacientes ));
  }, [pacientes])




  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id );

    setPacientes(pacientesActualizados);
  }

  return (
    <div className="container mx-auto">
      <Header />
      <div className="mt-12 md:flex">
      <Formulario 
        pacientes={pacientes}
        setPacientes = {setPacientes}
        paciente={paciente}
        setPaciente = {setPaciente}
      />
      <ListadoPacientes
        pacientes={pacientes}
        setPaciente = {setPaciente}
        eliminarPaciente = {eliminarPaciente}
      />
      </div>
    </div>
  )
}

export default App

import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage';



const App = () => {
  
  const [mostrarform, guardarMostrarForm] = useState(false);

  //Definir el state de citas
  const [citas, setCitas]  = useState([
    {id: "1", paciente: "Lola", propietario: 'Fernanda', sintomas: "No Duerme"},
    {id: "2", paciente: "Simon", propietario: 'Juan Camilo', sintomas: "Dolor estómago"},
    {id: "3", paciente: "Orion", propietario: 'Samuel', sintomas: "No come"}
  ])

  //Elimina los pacientes del state
  const eliminarPaciente = id => {
    setCitas( (citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id);
    })
  }
  

  //Muestra/Oculta Formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarform); // Si esta en true -> cambiar a false y viceversa
  }

  // Ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  //Almacenar las citas en storage
  const  guardarCitasStorage = async (citasJSON) => {
    try {
      await AsyncStorage.setItem('citas', citasJSON);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <TouchableWithoutFeedback onPress={ () => cerrarTeclado()}>
    <View style= {styles.contenedor}>
      <Text style = {styles.titulo}>Administrador de Citas</Text>   

      <View>
        <TouchableHighlight onPress={ () => mostrarFormulario() } style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}>{mostrarform ? 'Cancelar Crear Cita' : 'Crear Nueva Cita'}</Text>
        </TouchableHighlight>
      </View>

      <View style = {styles.contenido}>
      {mostrarform ? (
        <>
          <Text style = {styles.titulo}>Crear Nueva Cita</Text>
          <Formulario 
          citas={citas}
          setCitas = {setCitas}
          guardarMostrarForm = {guardarMostrarForm}
          guardarCitasStorage = {guardarCitasStorage}
          />
          </>
        ) : (
          <>
          <Text style = {styles.titulo}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas'}</Text>   
          <FlatList
            style={styles.listado}
            data = {citas}
            renderItem={({item}) => <Cita item = {item} eliminarPaciente = {eliminarPaciente}/>}
            keyExtractor={ cita => cita.id}
          />
        </>
      )} 
      
      </View>

    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#3E8E7E',
    flex: 1 // expande 
  },
  titulo:{
    color: '#FABB51',
    marginTop: Platform.OS === 'ios' ? 40 : 20 ,
    marginBottom: 2,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado : {
    flex : 1
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#FABB51',
    marginVertical: 10
},
textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
}
})

export default App;

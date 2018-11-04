import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
let axios = require("axios");

class ModificarCaso extends Component {

  constructor(props) {
    super(props);
    console.log('props', props)
    this.state = {
      type: this.props.caseToEdit.type,
      asunto: this.props.caseToEdit.asunto,
      descripcion: this.props.caseToEdit.descripcion,
      idCaso: this.props.caseToEdit.idCaso,
      operador: '',
      operators: <option></option>
    }
    console.log(this.state)
    this.handleChange = this.handleChange.bind(this);
    this.getOperators()
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // Debe estar, para que se actualice el valor de la variable.
    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  getOperators = () => {
    axios({
      method: 'get',
      url: '../../../getUsers',
      headers: { 'content-type': 'application/json' },
      params: {
        token: sessionStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response.data.data);
      if (response.data.status === 200) {
        const usersInfo = response.data.data
        let operators = []
        usersInfo.forEach(user => {
          if(user.type == 2){
            operators.push(<option key={user.id} value={user.id}>{`${user.userName}`}</option>)
          }
        });
        this.setState({operators: operators})
      } else if (response.data.status === 400) {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      }
    }).catch(function (error) {
      console.log("There was an error => ", error);
    })
  }

  modificateCase = () => {
    axios({
      method: 'post',
      url: '../../../registerCase',
      headers: { 'content-type': 'application/json' },
      data: {
        asunto: this.state.asunto,
        descripcion: this.state.descripcion,
        type: this.state.type,
        token: sessionStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response);
      if (response.data.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          onClose: this.setState({ registered: true })
        });
        this.setState({
          type: '',
          asunto: '',
          descripcion: ''
        })
      } else if (response.data.status === 400) {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      }
    }).catch(function (error) {
      console.log("There was an error => ", error);
    })
  }
  render() {
    return (
      <div className='formCasos'>
        <div className="formDiv">
          <div className="w100">
            <h2>APERTURAR CASO</h2>
            <select className='inputs' name="type" value={this.state.type} onChange={this.handleChange}>
              {/* Selecciona opcion */}
              <option value="">Elija una opción
                    </option>
              <option value="Incidente">
                Incidente
                    </option>
              <option value="Requerimiento">
                Requerimiento
                    </option>
            </select>
            {/* Asunto */}
            <input type="text" name="asunto" placeholder="&nbsp; &nbsp;Asunto" value={this.state.asunto} className='inputs' onChange={this.handleChange} />
            {/* Descripción */}
            <textarea type="text" name="descripcion" placeholder="&nbsp;Descripción del caso" value={this.state.descripcion} className='textArea' onChange={this.handleChange} >
            </textarea>
            {
              JSON.parse(sessionStorage.getItem('userInfo')).type == 1 ? <select className='inputs'>
                <option value={null}>No Asignado</option>
                {this.state.operators}
              </select>
                : null
            }
            {/* Adjuntar */}
            <input type="file" name="adjuntar" className='inputs' />
            {/* Botón registro */}
            <div className='basic-div'>
              <input type="submit" className="botoniniciar button" value="Modificar" onClick={this.modificateCase} />
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl
            pauseOnVisibilityChange
            draggable
            pauseOnHover={false}
            closeButton={false}
            pauseOnFocusLoss={false}
          />
        </div>
      </div>
    )
  }
}

export default ModificarCaso;
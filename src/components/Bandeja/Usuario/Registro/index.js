import React, { Component } from 'react';
import logo from '../../../assets/imagenes/loginImg.png';
import userIcon from '../../../assets/imagenes/user.png';
import passIcon from '../../../assets/imagenes/cont.png';
import emailIcon from '../../../assets/imagenes/email.png';
import nameIcon from '../../../assets/imagenes/name.png';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

let axios = require("axios");

class RegistrarUsuario extends Component {

	constructor() {
		super();
		this.state = {
			id: null,
			userName: '',
			pass: '',
			firstName: '',
			lastName: '',
			email: '',
			type: '',
			registered: false,
			invalidToken: false
		};

		this.handleChange = this.handleChange.bind(this);
	}

	renderRedirect = () => {
		if (this.state.invalidToken) {
			return <Redirect to="/" />
		}
	}

	handleChange(propertyName, event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		console.log(value);
		console.log(name);
		// Debe estar, para que se actualice el valor de la variable.
		let data = this.state
		// const regex = /^[a-zA-Z ]+$/;
		switch (propertyName) {
			case 'firstName':
				if (value === '' || /^[a-zA-Z ]+$/.test(value)) {
					data[propertyName] = value;
					this.setState({ name: data });
				}
				break;
			case 'lastName':
				if (value === '' || /^[a-zA-Z ]+$/.test(value)) {
					data[propertyName] = value;
					this.setState({ name: data });
				}
				break;

			case 'email':
				this.setState({ [name]: value });
				break;

			case 'userName':
				this.setState({ [name]: value });
				break;

			case 'pass':
				this.setState({ [name]: value });
				break;

			case 'type':
				this.setState({ [name]: value });
				break;
			default:
				break
		}

	}


	// if(value == '' || /^[a-zA-Z ]+$/.test(value)){
	// 	if(data[propertyName] == data['firstName'] || data[propertyName] == data['lastName']){
	// 	data[propertyName] = value;
	// 	this.setState({name: data});
	// 	// this.setState({
	// 	// 	[name]: value
	// 	// });
	// 	}
	// 	}
	// }



	registerUser() {
		if (!toast.isActive(this.toastId)) {
			if (!this.state.firstName) {
				toast.error('Ingrese un nombre', {
					toastId: "errorMsg",
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true
				});
			} else if (!this.state.lastName) {
				toast.error('Ingrese un apellido', {
					toastId: "errorMsg2",
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true
				});

			} else if (!this.state.email || !/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(this.state.email)) {
				toast.error('Ingresa un correo válido', {
					toastId: "errorMsg3",
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true
				});
			} else if (!this.state.userName) {
				toast.error('Ingresa un usuario', {
					toastId: "errorMsg4",
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true
				});
			} else if (!this.state.pass || (this.state.pass).length < 6) {
				toast.error('Contraseña inválida, minimo 6 digitos', {
					toastId: "errorMsg5",
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true
				});
			} else if (!this.state.type) {
				toast.error('Ingresa un tipo de usuario', {
					toastId: "errorMsg5",
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true
				});
			}
			else if (this.state.firstName && this.state.lastName && this.state.email && this.state.userName && this.state.pass && this.state.type) {
				axios({
					method: 'post',
					url: '../../registerUser',
					headers: { 'content-type': 'application/json' },
					data: {
						id: null,
						userName: this.state.userName,
						pass: this.state.pass,
						firstName: this.state.firstName,
						lastName: this.state.lastName,
						email: this.state.email,
						type: this.state.type,
						token: sessionStorage.getItem('token')
					}
				}).then((response) => {
					console.log(response);
					if (!toast.isActive(this.toastId)) {
						if (response.data.status === 200) {
							toast.success(response.data.message, {
								toastId: "sucssMsg",
								position: "top-right",
								autoClose: 3000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: false,
								draggable: true,
								onClose: this.setState({ registered: true })
							});
							this.setState({
								id: null,
								userName: '',
								pass: '',
								firstName: '',
								lastName: '',
								email: '',
								type: '',
								registered: false
							});
							// this.handleChange(event);
						} else if (response.data.status === 400) {
							toast.error(response.data.message, {
								toastId: "errorMsg",
								position: "top-right",
								autoClose: 3000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: false,
								draggable: true
							});
						} else if (response.data.status === 405) {
							toast.error('Su Sesión ha Expirado', {
								position: "top-right",
								autoClose: 3000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: false,
								draggable: true,
							});
							setTimeout(
								function () {
									this.setState({ invalidToken: true });
									sessionStorage.removeItem('token')
									sessionStorage.removeItem('userInfo')
								}
									.bind(this),
								3000
							);
						}
					}
				}).catch(function (error) {
					console.log("There was an error => ", error);
				})
			}
		}
	}

	render() {
		return (
			<div className='form'>
				{this.renderRedirect()}
				{/* Imagen */}
				<div className="logo-registro">
					<img src={logo} alt="Solinca" />
				</div>
				<br />
				<div className="FormRegister">
					{/* Nombre */}
					<div className="w100 basic-div">
						<img className="border ic icons" alt="userIcon" src={nameIcon} />
						<input type="text" name="firstName" placeholder="&nbsp;&nbsp;Nombre" className='inputs' onChange={this.handleChange.bind(this, 'firstName')} value={this.state.firstName} required />
					</div>

					{/* Apellido */}
					<div className="w100 basic-div">
						<img className="border ic icons" alt="userIcon" src={nameIcon} />
						<input type="text" name="lastName" placeholder="&nbsp;&nbsp;Apellido" className='inputs' onChange={this.handleChange.bind(this, 'lastName')} value={this.state.lastName} required />
					</div>

					{/* Correo */}
					<div className="w100 basic-div">
						<img className="border ic icons" alt="userIcon" src={emailIcon} />
						<input type="email" name="email" placeholder="&nbsp;&nbsp;Correo" className='inputs' onChange={this.handleChange.bind(this, 'email')} value={this.state.email} />
					</div>

					{/* Telefono */}
					{/* <div className="w100 basic-div">
							<img className="border ic icons" alt="userIcon" src={userIcon} />
							<input type="number" name="telefono" placeholder="&nbsp;&nbsp;Teléfono" className='inputs' required />
						</div> */}

					{/* Usuario */}
					<div className="w100 basic-div">
						<img className="border ic icons" alt="userIcon" src={userIcon} />
						<input type="text" name="userName" placeholder="&nbsp;&nbsp;Usuario" className='inputs' onChange={this.handleChange.bind(this, 'userName')} maxLength="30" value={this.state.userName} required />
					</div>

					{/* Contraseña */}
					<div className="w100 basic-div">
						<img className="border ic icons" alt="passIcon" src={passIcon} />
						<input type="password" name="pass" placeholder="&nbsp;&nbsp;Contraseña" className='inputs' onChange={this.handleChange.bind(this, 'pass')} value={this.state.pass} maxLength="12" minLength="6" required />
					</div>

					{/* Tipo de Usuario */}
					<div className="w100 basic-div">
						<img className="border ic icons" alt="userIcon" src={passIcon} />
						<select onChange={this.handleChange.bind(this, 'type')} className='inputs' value={this.state.type} name='type' id="select">
							{/* Selecciona opcion */}
							<option value="">Tipo de usuario</option>
							<option value={1}>Administrador</option>
							<option value={2}>Operador</option>
							<option value={3}>Cliente</option>
						</select>
						{/* <input type="password" name="pass" placeholder="&nbsp;&nbsp;Contraseña" className='inputs' onChange={this.handleChange} value={this.state.pass} maxLength="12" minLength="5" required /> */}
					</div>

					{/* repetir contraseña
						<div className="w100 basic-div">
							<img className="border ic icons" alt="passIcon" src={passIcon} />
							<input type="password" name="repeatpass" placeholder="&nbsp;&nbsp;Repetir Contraseña" className='inputs' required />
						</div> */}

					{/* Botón registro */}
					<div className='w100 basic-div divFather'>
						<input type="submit" className="botoniniciar button" value="Registro" onClick={() => this.registerUser()} />
					</div>
					<br />
					{/* Atrás */}
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
		)
	}
}

export default RegistrarUsuario;
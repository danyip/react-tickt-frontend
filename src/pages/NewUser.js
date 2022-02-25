import React from "react";
import axios, { Axios } from "axios";
import { BASE_URL } from "../config/constants";
import { Redirect } from 'react-router-dom';
import '../stylesheets/newUser.css';





class NewUser extends React.Component{

  state = {
    email: '',
    password: '',
    name: '',
    userLevel: 1,
    redirect: false,
    imageUrl: null,
    imageAlt: null,
    publicId: 'elmo'
  }

  handleInput = (ev) => {
    switch(ev.target.name){
      case 'email':
        this.setState({email: ev.target.value})
        break;
      case 'name':
        this.setState({name: ev.target.value})
        break;
      case 'password':
        this.setState({password: ev.target.value})
    }
  } //handleInput

  handleSubmit = (ev) => {
    const newUser = {
      'name': this.state.name,
      'email': this.state.email,
      'password': this.state.password,
      'user_level': this.state.userLevel,
      'image': this.state.publicId
      
    }

    axios.post(`${BASE_URL}/users`, {user: newUser})
    .then(res => {
      const request = {'email': newUser.email, 'password': newUser.password}
      this.props.loginUser(request)
      this.setState({ redirect: "/" })
    })
    .catch(err => {
      console.log(err)
    })

    ev.preventDefault();
} // handleSubmit()

 handleImageUpload =  () => {
  const { files } = document.querySelector('input[type="file"]')
  const formData = new FormData();
  formData.append('file', files[0]);
// replace this with your upload preset name
  formData.append('upload_preset', 'Tickt_profileImg');
  const options = {
    method: 'POST',
    body: formData,
  };

  // replace cloudname with your Cloudinary cloud_name
  return  fetch('https://api.Cloudinary.com/v1_1/tickt-project22/image/upload', options)
  .then(res => res.json())
  .then(res => console.log("Clodinary image response" , res))
  .catch(err => console.log(err));

 }

 openWidget = (ev) => {
   ev.preventDefault();
  window.cloudinary.createUploadWidget(
    {
      cloudName: 'tickt-project22',
      uploadPreset: 'Tickt_profileImg',
    },
    (error, { event, info }) => {
      if (event === 'success') {
        console.log("inside the widget function" , info);
        this.setState({
          publicId: info.public_id,
          imageUrl: info.secure_url,
          imageAlt: `An image of ${info.original_filename}`
        })
      }
    },
  ).open();
};
  render(){
    const { imageUrl, imageAlt } = this.state;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return(
      <form className="user" onSubmit={this.handleSubmit}>
        <label><h3 id="create-user-h3">Create User</h3></label>
        <ul>
          <li> <label>Name:  </label>
            <input
              className="user-input"
              onChange={this.handleInput}
              name="name"
              type="name"
              placeholder='Enter Name'
            />
          </li>
       
          <li>
            <label>Email:  </label>
            <input
              className="user-input"
              onChange={this.handleInput}
              name="email"
              type="email"
              placeholder='Enter Email'
            />
          </li>
        
          <li>
            <label>Password:  </label>
            <input
              className="user-input"
              onChange={this.handleInput}
              name="password"
              type="password"
              placeholder='Enter Password'
            />
          </li>

          <li>
            <label>Upload profile image: </label>
            <button className="user-button" onClick={this.openWidget}>Upload Photo</button>
          </li>
          <li>
          { imageUrl && (
              <img src={imageUrl} alt={imageAlt} className="displayed-image"/>
            )}
          </li>
           
          
        <button className="user-button">Sign Up</button>
        </ul>
       
      </form>
    )
  }
}

export default NewUser
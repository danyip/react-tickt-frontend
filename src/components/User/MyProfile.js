import React from 'react'
import axios from 'axios'
import {BASE_URL} from '../../apiBaseUrl'
import {AdvancedImage} from '@cloudinary/react';
import { cld } from "../../cld";
import {thumbnail, scale} from "@cloudinary/url-gen/actions/resize";



class MyProfile extends React.Component{


  render(){

    const myImage = cld.image(this.props.currentUser.image); 
    myImage.resize(thumbnail().width(150).height(150))
    
    return(
      <div>
        <p>Hello {this.props.currentUser.name}</p>
        <p>Your email is {this.props.currentUser.email}</p>
        
        <AdvancedImage cldImg={myImage} />

      </div>
    );
  }//render

}//class MyProfile


export default MyProfile
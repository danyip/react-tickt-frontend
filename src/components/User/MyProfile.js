import React from 'react'
import axios from 'axios'
import {BASE_URL} from '../../apiBaseUrl'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

// Import any actions required for transformations.
import {fill} from "@cloudinary/url-gen/actions/resize";

const cld = new Cloudinary({
  cloud: {
    cloudName: 'tickt-project22'
  }
});

class MyProfile extends React.Component{

  
  render(){

    
  
    const myImage = cld.image(this.props.currentUser.image); 
    
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
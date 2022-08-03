import React, { Component } from 'react';
import '../Styles/HeaderHome.css'
import 'bootstrap/dist/css/bootstrap.css'

export default class MealTypeItem extends Component {
  render() {
         
          const {name,content,image} = this.props.item

    return ( 
        <div className="col-lg-4 py-3">
        <div className="qs_div">
            <div className="d-flex align-self-stretch">
                <div className="qk_image1">
                    <a href="/">
                        <img className="media-object" src={require('../' + image)} alt="..."
                            style={{ width: '160px', height: '160px', objectFit: 'cover' }} />
                    </a>
                </div>
                <div className=" align-self-center px-4 qks_body">
                    <h4 className="qk1_heading"> {name} </h4>
                    <p className="qk1_info">{content}</p>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

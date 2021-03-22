import React, { Component } from 'react'
import PropTypes from "prop-types";
import posed from "react-pose";
import axios from "axios";
import {Link} from "react-router-dom";

const Animation = posed.div({
    visible: {
        opacity:1,
        applyAtStart:{
            display:"block"
        }
    },
    hidden: {
        opacity:0,
        applyAtEnd:{
            display:"none"
        }
    }
})

class User extends Component {
    static defaultProps = {
        name : "Bilgi Yok",
        department : "Bilgi Yok",
        salary : 0
    }

    constructor(props){
        super(props);
        this.state = {
            isVisible:false
        }
    }

    onClickEvent(number,e){
        this.setState({isVisible : !this.state.isVisible});
    }

    async onDelete(dispatch,e){
        const {id} = this.props;
        await axios.delete(`http://localhost:3004/users/${id}`);
        dispatch({type:"DELETE_USER",payload:id})
    }

    render() {
        const {name,department,salary,dispatch,id} = this.props;
        const {isVisible} = this.state;
        return (
            <div className="col-md-8 mb-4" >
                <div className="card" style={ isVisible ? {backgroundColor:"#62848d"} : null}>
                    <div className="card-header d-flex jusitfy-content-between">
                       <h4 className="d-inline" onClick={this.onClickEvent.bind(this,34)}>{name}</h4>
                       <button onClick={this.onDelete.bind(this,dispatch)}>Delete</button>
                    </div>
                    <Animation pose={isVisible ? "visible" :"hidden"}>
                        <div className="card-body">
                            <p className="card-text">{department}</p>
                            <p className="card-text">{salary}</p>
                        </div>
                        <Link to={`updateUser/${id}`} className="btn btn-dark btn-block" >Update User</Link>
                    </Animation>
                </div>
            </div>
        )
    }
}

User.propTypes = {
    id : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    salary : PropTypes.string.isRequired,
    department : PropTypes.string.isRequired,
}


export default User;

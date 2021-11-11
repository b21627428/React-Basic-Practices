import React, { Component } from 'react'
import posed from "react-pose";
import UserConsumer from "../context";
import axios from "axios";

var uniqid = require('uniqid');

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

class AddUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            isVisible : true,
            name:"",
            department:"",
            salary:"",
            error:false
        }
    }

    onChange = (e) => {
        const {name,value} = e.target;
        this.setState({
            [name]:value
        })
    }

    addUser = async (dispatch,e) => {
        e.preventDefault();
        if(this.validateForm()){
            const {name,department,salary} = this.state;
            const newUser = {id:uniqid(),name,department,salary};
            try{
                const response = await axios.post(`http://localhost:3004/users`,newUser)
                dispatch({type:"ADD_USER",payload:response.data});
                this.props.history.push("/");
            }catch(error){console.log(error)}
        }else{
            this.setState({
                error:true
            })
        }
    }

    validateForm = () => {
        const {name,department,salary} = this.state;
        return [name,department,salary].every(input => input.trim() !== "");
    }

    render() {
        const {isVisible,error} = this.state;
        return (
            <UserConsumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                        <div className="col-md-8 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4 onClick={(e)=> this.setState({isVisible: !this.state.isVisible})}>Add User Form</h4>
                                </div>
                                <Animation pose={isVisible ? "visible" :"hidden"}>
                                    <div className="card-body">
                                        { error && 
                                            <div className="alert alert-danger">
                                                Lütfen Bilgilerinizi kontrol ediniz.
                                            </div>
                                        }
                                        <form onSubmit={this.addUser.bind(this,dispatch)}>
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input type="text" name="name" id="name" placeholder="Enter Name" className="form-control" onChange={this.onChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="department">Department</label>
                                                <input type="text" name="department" id="department" placeholder="Enter Department" className="form-control" onChange={this.onChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Salary">Salary</label>
                                                <input type="text" name="salary" id="salary" placeholder="Enter Salary" className="form-control" onChange={this.onChange}/>
                                            </div>
                                            <button className="btn btn-danger btn-block mt-2" type="submit">Save</button>
                                        </form>
                                    </div>
                                </Animation>
                            </div>
                        </div>);
                    }
                }
            </UserConsumer>
        )
    }
}

export default AddUser;

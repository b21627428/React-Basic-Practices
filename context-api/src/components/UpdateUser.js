import React, { Component } from 'react'
import UserConsumer from "../context";
import axios from "axios";

class UpdateUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            name :"",
            department:"",
            salary:"",
            error:false
        }
    }

    componentDidMount = async () => {
        const {id} = this.props.match.params;
        try{
            const response = await axios.get(`http://localhost:3004/users/${id}`);
            const {name,department,salary} = response.data;
            this.setState({name,department,salary});
        }catch(error){console.log(error)}
    }

    onChange = (e) => {
        const {name,value} = e.target;
        this.setState({
            [name]:value
        })
    }

    updateUser = async (dispatch,e) => {
        e.preventDefault();
        if(this.validateForm()){
            const {name,department,salary} = this.state;
            const {id} = this.props.match.params;
            const updatedUser = {name,department,salary};
            try{
                const response = await axios.put(`http://localhost:3004/users/${id}`,updatedUser)
                dispatch({type:"UPDATE_USER",payload:response.data})
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
        const {error} = this.state;
        return (
            <UserConsumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                        <div className="col-md-8 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4 >Update User Form</h4>
                                </div>
                                <div className="card-body">
                                    { error && 
                                        <div className="alert alert-danger">
                                            Lütfen Bilgilerinizi kontrol ediniz.
                                        </div>
                                    }
                                    <form onSubmit={this.updateUser.bind(this,dispatch)}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" name="name" id="name" placeholder="Enter Name" className="form-control" onChange={this.onChange} value={this.state?.name}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="department">Department</label>
                                            <input  type="text" name="department" id="department" placeholder="Enter Department" className="form-control" onChange={this.onChange} value={this.state?.department}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Salary">Salary</label>
                                            <input  type="text" name="salary" id="salary" placeholder="Enter Salary" className="form-control" onChange={this.onChange} value={this.state?.salary}/>
                                        </div>
                                        <button className="btn btn-danger btn-block mt-2" type="submit">Update</button>
                                    </form>
                                </div>
                            </div>
                        </div>);
                    }
                }
            </UserConsumer>
        )
    }
}

export default UpdateUser;

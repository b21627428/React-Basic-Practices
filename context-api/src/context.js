import React, { Component } from 'react'
import axios from "axios";

const UserContext = React.createContext();
//Provider, Consumer

const reducer = (prevState,action) => {
    switch(action.type){
        case "DELETE_USER":
            return {
                ...prevState,
                users: prevState.users.filter(user => user.id !== action.payload)
            };
        case "ADD_USER":
            return {
                ...prevState,
                users: [...prevState.users,action.payload]
            }
        case "UPDATE_USER":
            return{
                ...prevState,
                users: [...prevState.users.filter(user=>user.id !== action.payload.id) , action.payload]
            }
        default:
            return prevState;
    }
}

export class UserProvider extends Component {

    constructor(props){
        super(props);
        this.state = {
            users : [],
            dispatch : action => {
                this.setState(prevState => reducer(prevState,action));
            }
        }
    };

    componentDidMount = async () => {
        try{
            const response = await axios.get("http://localhost:3004/users");
            this.setState({
                users: response.data
            })
        }catch(error){console.log("error")}
    }
    

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

const UserConsumer = UserContext.Consumer;

export default UserConsumer;
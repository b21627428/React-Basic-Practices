import React, { Component } from 'react'
import User from "./User";
import UserConsumer from "../context";

export default class Users extends Component {
    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const {users,dispatch} = value;
                        return ( 
                            <>
                                {users && users.map(({id,name,department,salary}) => {
                                    return <User dispatch={dispatch} key={id} id={id} name={name} department={department} salary={salary}/>
                                })}
                            </>
                        );
                    }
                }
            </UserConsumer>
        )
    }
}

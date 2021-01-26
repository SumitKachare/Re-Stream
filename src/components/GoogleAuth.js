import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signIn , signOut} from '../actions'

 class GoogleAuth extends Component {


    componentDidMount(){                    
        window.gapi.load('client:auth2' , ()=>{
            window.gapi.client.init({
                clientId: '551737873623-i9jqpn6cpmouj9p3s1qll872ca4nlh44.apps.googleusercontent.com',
                scope : 'email'
            }).then(()=>{
                this.auth =  window.gapi.auth2.getAuthInstance()
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = (isSignedIn)=>{
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    onSignInClick = ()=>{
        this.auth.signIn()
    }

    onSignOutClick = ()=>{
        this.auth.signOut()
    }

       renderAuthButton=()=>{
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn){
            return <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon"/>
                Sign Out
            </button>
        }else{
            return <button onClick={this.onSignInClick} className="ui blue google button">
            <i className="google icon"/>
            Sign In
        </button>
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {isSignedIn : state.auth.isSignedIn}
}

export default connect(mapStateToProps , {signIn , signOut})(GoogleAuth)

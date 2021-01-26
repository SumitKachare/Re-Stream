import React from 'react'
import Modal from '../../Modal'
import history from '../../history'
import {connect } from 'react-redux'
import {fetchStream  , deleteStream} from '../../actions'
import {Link} from 'react-router-dom'

class StreamDelete extends React.Component {

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    renderActions(){
        const id = this.props.match.params.id
    return  (
        <React.Fragment>
        <button onClick={()=>this.props.deleteStream(id)} className="ui button negative">
            Delete
        </button>
        <Link to="/" className="ui button">
               Cancel
        </Link>   
        </React.Fragment>
        )
    }

    renderContent(){
        if (!this.props.stream) {
            return 'Confirm Delete Steam '
        }

        return `Confirm Delete Steam with Title : ${this.props.stream.title}`
    }   
    render(){
    return (
        
            <Modal header="Delete Stream" content={this.renderContent()} onDismiss={()=> history.push('/')} action={this.renderActions()}/>
    )
    }
}

const mapStateToProps = (state , ownProps)=>{
    return {stream : state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps , {fetchStream , deleteStream})(StreamDelete)

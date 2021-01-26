import React , {Component} from 'react'
import {Field, reduxForm} from 'redux-form'


class StreamForm extends Component{

    renderError({error , touched}){
        if (error && touched) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
      renderInput=({input , label ,meta})=>{
    
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                <div>{this.renderError(meta)}</div>
            </div>
        )
    }


    onSubmit = (formValues)=>{
        this.props.onSubmit(formValues)
    }
    render(){
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" label="Enter Title" component={this.renderInput}/>
                <Field name="description" label="Enter Description" component={this.renderInput}/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = (formValues)=>{
    const error = {}

    if (!formValues.title) {
        error.title= 'You must enter a title'
    } 

    if (!formValues.description) {
        error.description= 'You must enter a description'
    }

    return error
}
export default reduxForm({
    form : 'streamForm',
    validate
})(StreamForm)


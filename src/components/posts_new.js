import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

// no () in renderTitleField because the field will call it
class PostsNew extends Component {
  renderField(field) {
    // just returns jsx, but need to wire it up to the field component. field.input is an object containing props and event handlers. 'touched' is a redux state that we are using to show the error message when we dont input anything
    // saying field.meta.touch % field.meta.error
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          { touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values){
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }


  render(){
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}
// values is an object, everything a user has entered into the form, making sure entire form is filled out
function validate(values) {
  const errors = {};
  // validating inputs from values object, will return the errors object empty if nothing is wrong, if it has properties, it is wrong

  if (!values.title){
    errors.title = "Enter a title";
  }

  if (!values.categories){
    errors.categories = "Enter some categories";
  }

  if (!values.content){
    errors.content = "Enter some content";
  }

  return errors;
}

// redux form is a function with options, perhaps showing multiple forms on a page, sign in/signup forms. should be unique string, redux form to help component communicate with reducer
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);

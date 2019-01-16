import React from "react";
import {connect} from "react-redux";
import {Field, reduxForm, getFormValues} from 'redux-form'

/**
 * FormInput used for redux-form
 * Supports display validation message
 * @param input
 * @param touched
 * @param error
 * @param warning
 * @param rest
 * @returns {*}
 * @constructor
 */
const FormInput = ({
                       input,
                       meta: {touched, error, warning},
                       ...rest
                   }) => {
    return <React.Fragment>
        <input {...input} {...rest}/>
        {touched && (error || warning) && <div className="text-danger">
            {error || warning}
        </div>}
    </React.Fragment>
};

class BookForm extends React.Component {
    render() {
        const {handleSubmit, busy, pristine, submitting, values} = this.props;
        return <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <Field
                    name="title"
                    component={FormInput}
                    type="text"
                    placeholder="The book title"
                    className={"form-control"}
                    disabled={busy}
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <Field
                    name="description"
                    component="textarea"
                    type="text"
                    className={"form-control"}
                    placeholder="Say about this book"
                    disabled={busy}
                />
            </div>

            <div className="form-group">
                <label>Cover</label>
                <Field
                    name="cover"
                    component={FormInput}
                    type="text"
                    placeholder="Currently supports image url"
                    className={"form-control"}
                    disabled={busy}
                />

                <br />
                {values && values.cover && <img src={values.cover} className={"img-thumbnail"} width={200} height={100}
                alt={values.title}/>}
            </div>

            <button type="submit" className="btn btn-primary" disabled={busy || pristine || submitting}>Submit</button>
        </form>
    }
}

/**
 * Validation
 * @param values
 */
const validate = (values) => {
  const errors = {};

  if (!values.title) {
      errors.title = "Required";
  }
  return errors;
};

const FORM_NAME = 'BookForm';


function mapStateToProps(state, props) {
    return {
        values: getFormValues(FORM_NAME)(state),

    }
}

export default reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    validate
})(connect(mapStateToProps)(BookForm));

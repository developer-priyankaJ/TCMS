import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';

class FormInput extends Component {
    render() {
        const { name, label, handleChange, modifier, value, isValid, validate } = this.props;
        return (
            <input type="text"
                name={name}
                className={classNames("onbfi", modifier, { "bm_type_error": isValid == false })}
                ref={name} placeholder={label}
                onChange={handleChange}
                value={value}
                onBlur={validate} />
        );
    }
};


FormInput.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    handleChange: PropTypes.func,
    modifier: PropTypes.string,
    value: PropTypes.string,
    isValid: PropTypes.bool,
    validate: PropTypes.func
};

export default FormInput;

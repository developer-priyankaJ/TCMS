import React from 'react';
import PropTypes from 'prop-types';
import { NavLink  } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Select from 'react-select';


const NewTransporterForm = ({
  onSubmit,
  onChange,
  errors,
  data,
  statesList,
  citiesList,
  message
}) => (
  <div className="">
    <form onSubmit={(event) => onSubmit(event,"newTransporter","transporterModal")}>
      <h3 className="heading">Transporter Details</h3>
      <hr/>
      {message && <p className="success-message">Data added successfully</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}
      <div className="entry-form">
          <div className="display-inline form-div">
            <label>Name:</label>
            <input type="text" className="field-divided" autoFocus name="name" value={data.name} placeholder="transporter name" onChange={(event) => onChange(event.target.name, event.target.value,"newTransporter")}/>
          </div>
          <div className="display-inline form-div">
            <label>Phone No:</label>
            <input type="text" name="phone" value={data.phone} placeholder="phone no" onChange={(event) => onChange(event.target.name, event.target.value,"newTransporter")}/>
          </div>
      </div>
      <div className="entry-form">
        <div className="display-inline form-div">
          <label>City:</label>
          <Select
            className="state field-select display-inline"
            name="city"
            value={data.city.value}
            onChange={(event) => onChange("city", event&&event.value,"newTransporter", event&&event.state)}
            options={citiesList}
          />
        </div>
        <div className="display-inline form-div city">
          <label>State:</label>
          <Select
            className="state field-select display-inline"
            name="state"
            value={data.state}
            disabled
            options={statesList}
          />
        </div>
      </div>
      <div className="entry-form">
          <div className="display-inline form-div">
            <label>Gstn No:</label>
            <input type="text" className="field-divided" name="gstn_no" value={data.gstn_no} placeholder="Gstn No" onChange={(event) => onChange(event.target.name, event.target.value,"newTransporter")}/>
          </div>
      </div>
      <div className="button-line text-center">
        <RaisedButton type="submit" label="Submit" primary />
      </div>
    </form>
  </div>
);

NewTransporterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default NewTransporterForm;

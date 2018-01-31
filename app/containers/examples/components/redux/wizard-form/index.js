import React, { Component } from 'react';
// import { Values } from "redux-form-website-template";
import showResults from './showResults';
import WizardForm from './WizardForm';

class WizardFormPage extends Component {
  render() {
    return (
      <div style={{ padding: 15 }}>
        <h2>Wizard Example</h2>
        <WizardForm onSubmit={showResults} />
        {/* <Values form='wizard' /> */}
      </div>
    );
  }
}

export { WizardFormPage };

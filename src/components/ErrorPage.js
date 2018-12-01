import React, { Component } from 'react';


class ErrorPage extends Component {
  render() {
    return (
      <div className="Error-header">
        <h1> Sorry... Cannot display location data</h1>
        <h2>{this.props.errorMessage}</h2>
      </div>
    );
  }
}

export default ErrorPage;

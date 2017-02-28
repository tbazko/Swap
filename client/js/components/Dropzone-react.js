var React = require('react');
var ReactDOM = require('react-dom');
var Dropzone = require('react-dropzone');

var DropzoneDemo = React.createClass({
  getInitialState: function () {
    return {
      files: []
    };
  },

  onDrop: function (acceptedFiles) {
    this.setState(function(prevState, props) {
      console.log(prevState);
      console.log(prevState.files.concat(acceptedFiles));
      return {
        files: prevState.files.concat(acceptedFiles)
      }
    })
  },

  onOpenClick: function () {
    this.dropzone.open();
  },

  render: function () {
    return (
      <div>
        <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <button type="button" onClick={this.onOpenClick}>
          Open Dropzone
                </button>
        {this.state.files.length > 0 ? <div>
          <h2>Selected {this.state.files.length} files...</h2>
          <div>{this.state.files.map((file) => <img key={file.name} src={file.preview} />)}</div>
        </div> : null}
      </div>
    );
  }
});

ReactDOM.render(<DropzoneDemo />, document.getElementById('dropzone'));
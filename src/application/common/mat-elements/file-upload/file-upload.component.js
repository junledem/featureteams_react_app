import React from 'react';
import { withTranslation } from 'react-i18next';
import './file-upload.component.css';
import { DropzoneArea } from 'material-ui-dropzone'
import { Grid, Button } from '@material-ui/core';

class FileUploadComponent extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      files: []
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleOpen() {
    this.setState({
        open: true,
    });
  }

  handleChange(files) {
    this.setState({
      files: files
    });
  }

  render() {

    return (
      <Grid container direction="row" spacing={ 3 } justify="center">
        <Grid item sm={ 3 } xs={ 3 }>
          <Button onClick={ this.handleOpen.bind(this) }>
            Add Image
          </Button>
        </Grid>
        <Grid item sm={ 9 } xs={ 9 }>
        <DropzoneArea
            onChange={ this.handleChange }
        />
        </Grid>
      </Grid>
      
    );
  }
}

export default withTranslation() (FileUploadComponent);
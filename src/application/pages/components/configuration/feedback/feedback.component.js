import { Grid, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { withTranslation } from 'react-i18next';
import './feedback.component.css';
import '../configuration.component.css';
import '../../../../common/css/common.css';
import ApplicationContext from '../../../../containers/application.context';
import { renderPageHeader } from '../../../../common/constants/element-group.const';
import { FeedbackFormModel } from '../../../../models/presentation/feedback-form.model';

class FeedbackComponent extends React.Component {
  static contextType = ApplicationContext;
  
  constructor(props) {
    super(props);

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.renderRadioGroupCard = this.renderRadioGroupCard.bind(this);
  }

  async componentDidMount() {
  }

  handleTextFieldChange(event) {
    const target = event.target;
    const feedback: FeedbackFormModel = this.props.feedback;
    feedback[target.name].value = target.value;

    this.props.updateProjectDetail(feedback);
  }

  renderRadioGroupCard() {
    // const feedback: FeedbackFormModel = this.props.feedback;
  }

  render() {
    const { t } = this.props;
    // const feedback: FeedbackFormModel = this.props.feedback;

    return (
      <Grid container direction="row" spacing={ 3 } justify="center">
        <Grid item sm={ 11 } xs={ 11 }>
          { renderPageHeader(t('configuration.feedbackHeader'), t('configuration.feedbackSubHeader')) }
        </Grid>
        <Grid item sm={ 11 } xs={ 11 }>
          <Grid container direction="row" spacing={ 5 } justify="center">
            <Grid item sm={ 6 } xs={ 6 }>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      { t('configuration.radioGroupBox.supportRequested.options.0.label') }
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" component="p">
                      { t('configuration.radioGroupBox.supportRequested.options.0.subLabel') }
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {/* <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions> */}
              </Card>
            </Grid>
            <Grid item sm={ 6 } xs={ 6 }>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      { t('configuration.radioGroupBox.supportRequested.options.1.label') }
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" component="p">
                      { t('configuration.radioGroupBox.supportRequested.options.1.subLabel') }
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {/* <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions> */}
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation() (FeedbackComponent);
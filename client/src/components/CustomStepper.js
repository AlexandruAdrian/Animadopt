// System
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
// Icons
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonIcon from '@material-ui/icons/Person';
// Components
import CustomButton from './CustomButton';
// Styles
import styles from '../styles/CustomStepperStyles';

function StepIcon(props) {
  const classes = makeStyles(styles)();
  const { active, completed } = props;

  const icons = {
    1: <ListAltIcon />,
    2: <PersonIcon />,
  };

  return (
    <div
      className={clsx(classes.stepperRoot, {
        [classes.stepperActive]: active,
        [classes.stepperCompleted]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 20,
  },
  active: {
    '& $line': {
      backgroundImage: 'linear-gradient(135deg, #b3dde5, #41A9BD)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient(135deg, #b3dde5, #41A9BD)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

function getSteps() {
  return ['Datele contului', 'Poza de profil'];
}

const CustomStepper = (props) => {
  const classes = makeStyles(styles)();
  const steps = getSteps();
  const { activeStep, handleNext, handleBack } = props;

  return (
    <div className={classes.container}>
      <Stepper
        className={classes.stepper}
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              classes={{
                root: classes.stepperLabelRoot,
                active: classes.stepperLabelActive,
                completed: classes.stepperLabelCompleted,
              }}
              StepIconComponent={StepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {props.children}

      <div className={classes.footer}>
        <div>
          <div>
            {activeStep !== 0 && (
              <CustomButton handler={handleBack} text={'Inapoi'} primary />
            )}
            <CustomButton
              handler={handleNext}
              text={activeStep === steps.length - 1 ? 'Gata' : 'Urmatorul'}
              primary
            />
          </div>
        </div>
      </div>
    </div>
  );
};

CustomStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
};

export default CustomStepper;

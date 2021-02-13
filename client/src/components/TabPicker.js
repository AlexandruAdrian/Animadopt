// System
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
// Styles
import styles from '../styles/TabPickerStyles';

function TabPicker({ selectedTab, changeHandler, tabs }) {
  const classes = makeStyles(styles)();

  return (
    <Card>
      <AppBar position="static" className={classes.appBar}>
        <Tabs
          value={selectedTab}
          onChange={changeHandler}
          aria-label="Tab picker"
          variant={'fullWidth'}
          centered={true}
          classes={{
            flexContainer: classes.flexContainer,
            indicator: classes.indicator,
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={`${tab}-${selectedTab}`}
              label={tab}
              classes={{
                selected: classes.selectedTab,
                root: classes.tab,
              }}
            />
          ))}
        </Tabs>
      </AppBar>
    </Card>
  );
}

TabPicker.propTypes = {
  selectedTab: PropTypes.number.isRequired,
  changeHandler: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired,
};

export default TabPicker;

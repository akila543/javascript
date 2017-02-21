import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Mocha from '../component/Mocha.jsx';
import Eslint from '../component/Eslint.jsx';
import Build from '../component/Build.jsx';
import CodeCoverage from '../component/CodeCoverage.jsx';
import HtmlHint from '../component/HtmlHint.jsx';
const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    gridList: {
        width: '1200px',
        height: 'auto',
        overflowY: 'auto',
        marginTop: 20
        }
};

  class Results extends React.Component {
      constructor(props) {
      super(props);
      this.state = {
        result:false,
      };

    }
      render() {
            return (
                <div style={styles.root}>
                    <GridList cellHeight='auto' style={styles.gridList} cols={1}>
                      <Mocha />
                      <Build />
                      <CodeCoverage />
                      <HtmlHint />
                      <Eslint />
                      </GridList>
                </div>
            );
      }}
export default Results;

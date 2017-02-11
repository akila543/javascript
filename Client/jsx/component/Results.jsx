import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Eslint from './Eslint.jsx';
import Htmlhint from './HtmlHint.jsx';
import Mocha from './Mocha.jsx';
import CodeCoverage from './CodeCoverage.jsx';
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
// const tilesData = [
// {build:
// {
//   output:'sdasdasds'
// }
// },
// {eslint:
// {
//   output:'sdasdasds'
// }
// }
// ];
 /* A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 /**
 */
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
                      {this.props.output.map((tile) => (

                        <Card >
                          <CardHeader
                            title={Object.keys(tile)[0]}
                            actAsExpander={true}
                            showExpandableButton={true}
                          />
                        <CardTitle title="Report" expandable={true} />
                          <CardText expandable={true}>
                          {tile[Object.keys(tile)[0]]}
                            </CardText>
                        </Card>
))}
                      </GridList>
                </div>
            );
      }}
export default Results;

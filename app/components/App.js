import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormGroup, Button, FormControl } from 'react-bootstrap';
import fs from 'fs';

import Item from './Item';

import items from './constants';


export default class App extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      selectedItems: [],
      tag: 'generatedTag'
    };

    this.handleClick = this.handleClick.bind(this);
    this.exportTag = this.exportTag.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleClick(item) {
    console.log(item);
    const arr = [];
    this.state.selectedItems.forEach( d=> arr.push(d));
    arr.push(item);
    items.splice(items.indexOf(item),1);
    this.setState({selectedItems: arr});
  }

  exportTag( tagName="generatedTag" ) {

    let allIds = this.state.selectedItems.map( si => '{\\\"id\\\":' + si.id + '}');
    allIds.slice(0, allIds.length-1);

    fs.writeFile("C:/Users/developer/Desktop/tag.txt", '{\"enabled\":{\"type\":\"hidden\",\"value\":\"true\"},\"tags\":{\"type\":\"hidden\",\"value\":\"[{\\\"tag\\\":\\\"' + this.state.tag + '\\\",\\\"ids\\\":[' + allIds + ']}]\"}}', function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
    });

  }

  handleTextChange(evt) {
    console.log(evt);
    console.log(evt.target.value);
    this.setState({ tag: evt.target.value });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={6}>
            <div className={'items-box'}>
              <Row>
                {items.map(d =>
                  (<Col
                    key={d.id}
                    md={3}
                    onClick={evt => this.handleClick(d)}>
                    <Item item={d} />
                  </Col>)
                )}
              </Row>
            </div>
          </Col>
          <Col md={2} />
          <Col md={6}>
            <div className={'items-box'}>
              <Row>
                {this.state.selectedItems.map( d =>
                  (<Col
                    key={d.id}
                    md={3}>
                  <Item item={d} />
                </Col>))}
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={7} />
          <Col md={5}>
            <Form inline>
              <FormGroup controlId="formInlineName">
                <FormControl type="text" placeholder="Tag name" onChange={(evt) => this.handleTextChange(evt)} />
              </FormGroup>
              {' '}
              <Button onClick={e=>this.exportTag()}>
                Export tag
              </Button>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
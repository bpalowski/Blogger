import React, { Component } from 'react'
import { Button, Row } from 'antd';
import { Editor, EditorState, RichUtils } from 'draft-js';


class EditorComponent extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
    };


  }
  componentDidMount() {

  }

  onChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  button1 = () => {
    this.onChange = (RichUtils.toggleInlineStyle(this.state.editorState))
  }
  button2 = () => {
    this.onChange = (RichUtils.toggleCode(this.state.editorState))
  }

  render() {
    return (
      <>
        <Row>
          <Button onClick={this.button1}>Incline</Button>
          <Button onClick={this.button2}>2</Button>
        </Row>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}


        />
      </>
    );
  }
}
const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};
export default EditorComponent
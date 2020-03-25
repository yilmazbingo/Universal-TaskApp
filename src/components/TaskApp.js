import React from "react";

import AddOption from "./AddOption";
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import OptionModal from "./OptionModal";

export default class TaskApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  handleCloseModal = () => this.setState(() => ({ selectedOption: undefined }));

  handleDeleteOption = optionToRemove => {
    console.log(optionToRemove);
    this.setState(prevState => ({
      options: prevState.options.filter(option => option !== optionToRemove)
    }));
    // const a = this.state.options.filter(option => option !== optionToRemove);
    // this.setState(() => ({ options: a }));
  };
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({ selectedOption: option }));
  };
  handleAddOption = option => {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    }

    this.setState(prevState => ({ options: prevState.options.concat(option) }));
  };
  render() {
    const title = "TaskApp";
    const subtitle = "Put your life in the hands of SCSS";

    return (
      <div>
        <div className="container">
          <Header title={title} subtitle={subtitle} />
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              //this props is passed to the Option component
              handleDeleteOption={this.handleDeleteOption}
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          closeModal={this.handleCloseModal}
        />
      </div>
    );
  }
}

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";

class Form extends React.Component {
  //this is used to take input from use but it is referencing dom
  //userNameInput = React.createRef();

  state = { userName: "" };

  handleSubmit = async(event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`)
    this.props.onSubmit(resp.data);
    this.setState({userName : ""});
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/*this code is used whit createRef method 
          <input
          type="text"
          placeholder="Github username"
          ref={this.userNameInput}
          required
        /> */}
        <input
          type="text"
          placeholder="Github username"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          required
        />
        <button>Add card</button>
      </form>
    );
  }
}

const CardLists = props => {
  return (
    <div>
      {props.profiles.map(profile => (
        <Cards key = {profile.id} {...profile} />
      ))}
    </div>
  );
};

class Cards extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile" style={{ margin: "1rem" }}>
        <img src={profile.avatar_url} alt="" />
        <div
          className="info"
          style={{ display: "inline-block", marginLeft: 10 }}
        >
          <div className="name" style={{ fontSize: "125%" }}>
            {profile.name}
          </div>
          <div className="location">{profile.location}</div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       profiles: []
  //     };
  //   }
  // the two line are short hand to the above commented code
  state = {
    profiles: []
  };
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles : [...prevState.profiles, profileData]
    }));
  }
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardLists profiles={this.state.profiles} />
      </div>
    );
  }
}

ReactDOM.render(
  <App title="The GitHub Cards App" />,
  document.getElementById("mountNode")
);

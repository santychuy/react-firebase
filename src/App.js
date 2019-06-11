import React, {Component} from 'react';
import './App.css';
import firebase from 'firebase';

import FileUpload from './components/fileUpload';

class App extends Component {
  
  constructor() {
    super();

    this.state = {
      user: null
    }

    this.handleAuth = this.handleAuth.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user});
    });
  }
  
  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`ERROR: ${error}`));
  }

  handleLogOut() {
    firebase.auth().signOut()
    .then(result => console.log(`${result.user} ha salido`))
    .catch(error => console.log(`ERROR: ${error}`));
  }

  renderLoginBtn() {
    //User logueado
    if (this.state.user){
      return(
        <div>
          <img src={this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>Hola {this.state.user.displayName}!</p>
          <FileUpload/>
          <button onClick={this.handleLogOut}>Log Out</button>
        </div>
      );
    }else{
      return(
        <button onClick={this.handleAuth}>Login w/Google</button>
      );
    }
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          {this.renderLoginBtn()}
        </header>
      </div>
    )
  }


}

export default App;

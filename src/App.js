import './App.css';
import "antd/dist/antd.css";
import { Component } from 'react';

import TestView from './model/view/TestView';
import CompView1 from './model/view/comp1/CompView1';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { CompVM1 } from './model/view/comp1/CompVM1';
import MassDetailView from './model/main/entity/mass/detail/MassDetailView';
import ProjectCompView from './model/main/entity/project/comp/ProjectCompView';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={TestView} />
          <Route path="/massdetail/:id" component={MassDetailView} />
          <Route path="/project/:id" component={ProjectCompView} />
        </Switch>
      </Router>
    );
  }
}

export default App;

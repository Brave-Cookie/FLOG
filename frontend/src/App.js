import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import Mypage from './views/Mypage';
import Project from './views/Project'
import Issue from './views/Issue';
import Member from './views/Member';
import Log from './views/Log';
import WordCloud from './views/WordCloud';
import EmotionGraph from './views/EmotionGraph';
import Rank from './views/Rank';

// hanjo
import MeetingRoom from './views/MeetingRoom'



const App = () => {

  

  return (
    <BrowserRouter>
    <div className="App">

      <div className="content">
        
          <Route path="/" component={ Home } exact />
          <Route path="/login" component={ Login } exact />
          <Route path="/signup" component={ Signup } exact />
          <Route path="/mypage/:userId" component={ Mypage } exact />
          <Route path="/:userId/project/:projectId/:projectName" component={ Project } exact />
          <Route path="/:userId/project/:projectId/:projectName/issue" component={ Issue } exact />
          <Route path="/:userId/project/:projectId/:projectName/member" component={ Member } exact />
          <Route path="/:userId/project/:projectId/:projectName/log/:meetingId/:meetingName" component={ Log } exact />
          <Route path="/:userId/project/:projectId/:projectName/log/:meetingId/:meetingName/word-cloud" component={ WordCloud } exact />
          <Route path="/:userId/project/:projectId/:projectName/log/:meetingId/:meetingName/emotion-graph" component={ EmotionGraph } exact />
          <Route path="/:userId/project/:projectId/:projectName/log/:meetingId/:meetingName/rank" component={ Rank } exact />

          {/* hanjo */}
          <Route path="/:userId/project/:projectId/:projectName/meetingRoom/:roomState/:meetingName/:roomCode" component={MeetingRoom} exact/>
          <Route path="/mypage/:userId/meetingRoom/:roomState/:meetingName/:roomCode" component={MeetingRoom} exact/>

        
      </div>
    </div>
    </BrowserRouter>
  );
  
}
export default App;

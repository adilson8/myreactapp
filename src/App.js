import './App.css';
import {useState} from 'react';

import Header from './components/Header';
import Nav from './components/Nav';
import Article from './components/Article';
import Create from './components/Create';
import Update from './components/Update';

function App() {
  const[mode, setMode] = useState('WELCOME');
  const[id, setId] = useState(null);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]);
  const [nextId, setNextId] = useState(topics.length+1);

  let content = null;
  let contextControl = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  } else if (mode === 'READ'){
    let title = null;
    let body = null;

    topics.forEach(topic => {
      if (topic.id === id){
        title = topic.title;
        body = topic.body;
      }
    });

    content = <Article title={title} body={body}></Article>;
    contextControl = <>
      <li><a href={'/update/' + id} onClick={(event)=>{
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      <li>
        <input type="button" value="Delete" onClick={()=>{
          const newTopics = [];

          for (let i = 0; i < topics.length; i++){
            if (topics[i].id != id){
              newTopics.push(topics[i]);
            }
          }

          setTopics(newTopics);
          setMode('WELCOME');
        }}></input>
      </li>
    </>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      console.log(_title, _body);
      let newTopic = {
        id : nextId,
        title : _title,
        body : _body
      };

      let newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);

      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);      
    }}></Create>;
  } else if (mode === 'UPDATE') {
    let title = null;
    let body = null;

    topics.forEach((topic)=>{
      if (topic.id === id){
        title = topic.title;
        body = topic.body;
      }
    });
    
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      let newTopics = [...topics];
      
      newTopics.forEach((newTopic)=>{
        if (newTopic.id === id){
          newTopic.title = title;
          newTopic.body = body;
        } else if (mode === 'UPDATE') {
          let title = null;
          let body = null;
      
          topics.forEach((topic)=>{
            if (topic.id === id){
              title = topic.title;
              body = topic.body;
            }
          });
          
          content = <Update title={title} body={body} onUpdate={(title, body)=>{
            let newTopics = [...topics];
            
            newTopics.forEach((newTopic)=>{
              if (newTopic.id === id){
                newTopic.title = title;
                newTopic.body = body;
              }
            })
            
            setTopics(newTopics);
            setMode('READ');
          }}></Update>
        }
      })
      
      setTopics(newTopics);
      setMode('READ');
    }}></Update>

  }

  return (
    <div>
      <Header title="WEB" customFunc={()=>{
        setMode('WELCOME');
      }}></Header>

      <Nav topics={topics} customFunc={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      
      {content}

      <ul>
        <li>
          <a href="/create" onClick={(e)=>{
            e.preventDefault();
            setMode('CREATE');
          }}>Create</a>
        </li>

        {contextControl}
      </ul>
    </div>
  );
}

export default App;
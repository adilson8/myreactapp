import './App.css';
import {useState} from 'react';

function Header(props){
  return  <header>
    <h1>
      <a href="/" onClick={(event)=>{
        event.preventDefault();
        props.customFunc();
      }}>{props.title}</a>
    </h1>
  </header>
}

function Nav(props){
  const lis = [];

  for (let i = 0; i < props.topics.length; i++){
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a id={t.id} href={"/read/" + t.id} onClick={(event)=>{
          event.preventDefault();
          props.customFunc(Number(event.target.id));
        }}> {t.title} </a>
      </li>
    );
  }

  return <nav>
    <ol>
      {lis}
    </ol>        
  </nav>
}

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}


function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={(event)=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='제목을 입력하세요.'></input></p>
      <p><textarea name="body" placeholder='본문을 입력하세요.'></textarea></p>
      <p><input type="submit" value="등록"></input></p>
    </form>
  </article>
}

function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return <article>
    <h2>Update</h2>
    <form onSubmit={(event)=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='제목을 입력하세요.' value={title} onChange={(e)=>{
        setTitle(e.target.value);
      }}></input></p>
      <p><textarea name="body" placeholder='본문을 입력하세요.' value={body} onChange={(e)=>{
        setBody(e.target.value);
      }}></textarea></p>
      <div>
        <input type="submit" value="수정"></input>

        <input type="button" value="삭제" style={{ marginLeft: "10px" }} onClick={(e)=>{
          props.onDelete(title);
        }}></input>
      </div>
    </form>
  </article>
}

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
  let update = null;
  let Delete = null;
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
    update = <li><a href={'/update/' + id} onClick={(event)=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
    Delete = <li><a href={'/delete/' + id} onClick={(event)=>{
      event.preventDefault();
      setMode('DELETE');
    }}>Delete</a></li>
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
    }}
    
    onDelete={(title)=>{
      let newTopics = [];

      topics.forEach((topic)=>{
        if (topic.title !== title){
          newTopics.push(topic);
        }
      });

      for (let i = 0; i < newTopics.length; i++){
        newTopics[i].id = i;
      }

      alert(title + '을 삭제합니다.');

      setTopics(newTopics);
      setMode('WELCOME');
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

        {update}
      </ul>
    </div>
  );
}

export default App;
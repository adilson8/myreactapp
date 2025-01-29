import { useState } from "react";

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
        <input type="submit" value="수정"></input>
      </form>
    </article>
}

export default Update;
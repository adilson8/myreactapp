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

export default Create;
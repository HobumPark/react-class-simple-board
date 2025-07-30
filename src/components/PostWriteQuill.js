
import React, { Component } from 'react';
import '../css/PostWriteQuill.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

let textAreaStyle = {
    paddingTop:'20px',
    paddingLeft:'20px',
    boxSizing:'border-box',
    resize:'none',
    width:'90%',
    height:'500px',
    borderRadius: '10px',
    color:'#666',
    fontSize:'20px'
};

class PostWrite extends Component {

    constructor(props){
        super(props);
        this.state={
            title:'',
            contents:'sdgsdg'
        }
      
    }

    handleChange=(e)=>{
        console.log('handleChange!')
        console.log(e.target.value)
        
    }

    enrollPost=()=>{
        alert("글 등록!(PostWrite)")
        const {title,contents}=this.state
        alert(title)
        alert(contents)
        this.props.enrollPost(title,contents)
        window.location.href="/"
    }

    componentDidMount(){

    }

    render(){
        return(
            
        <div id="post-write">
            <h1>게시판 글쓰기</h1>
            <span id="title-area">
                <label id="title">제목</label>
                <input type="text" id="title" 
                maxlength="40" name="title" placeholder="제목을 입력해주세요"
                onChange={this.handleChange}/> 
                <button onClick={this.enrollPost}>등록</button>
            </span>
            <span id="cont-area">
                <ReactQuill theme="snow" 
                onChange={this.handleChange}
                />
            </span>
            
        </div>
        )
    }
}

export default PostWrite;

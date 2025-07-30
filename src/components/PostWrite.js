import React, { Component } from 'react';
import '../css/PostWrite.css';
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
        this.state = {
            title: '',
            contents: '',
            author: '',
            files: []  // 첨부 파일 목록
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        this.setState(prevState => ({
            files: [...prevState.files, ...selectedFiles]
        }));
    }

    enrollPost = () => {
        console.log("글 등록!(PostWrite)");
        const { title, contents, author, files } = this.state;
        this.props.enrollPost(title, contents, author, files);
        window.location.href = "/";
    }

    handleRemoveFile = (index) => {
        this.setState(prevState => ({
            files: prevState.files.filter((_, i) => i !== index)
        }));
    }

    render(){
        const { files } = this.state;

        return (
            <div id="post-write">
                <h1>게시판 글쓰기</h1>
                <span id="title-area">
                    <div id="title-div">
                        <label id="title">제목</label>
                        <input type="text" id="title-input" 
                            maxLength="40" name="title" placeholder="제목을 입력해주세요"
                            onChange={this.handleChange}/> 
                    </div>
                    <div id="author-div">
                        <label id="author">글쓴이</label>
                        <input type="text" id="author-input" 
                            name="author"
                            onChange={this.handleChange} placeholder="글쓴이를 입력해주세요"/>
                    </div>
                    <button onClick={this.enrollPost}>등록</button>
                </span>
                <span id="cont-area">
                    <label id="cont">내용</label><br/>
                    <textarea name="contents" style={textAreaStyle}
                        placeholder="내용을 입력해주세요"
                        onChange={this.handleChange}></textarea> 
                </span>
                {
                    /*
                    {files.length > 0 && (
                            <div id="file-list">
                                <h4>첨부된 파일 목록:</h4>
                                <ul>
                                    {files.map((file, idx) => (
                                        <li key={idx}>
                                            {file.name}
                                            <button onClick={() => this.handleRemoveFile(idx)} style={{ marginLeft: '10px' }}>
                                                삭제
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                     */
                }
                <span id="file-attach-area">
                    <input type="file" multiple onChange={this.handleFileChange} />
                </span>

                
            </div>
        );
    }
}

export default PostWrite;

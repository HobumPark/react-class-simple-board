
import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import PostView from './components/PostView';
import PostWrite from './components/PostWrite';
import PostWriteQuill from './components/PostWriteQuill';
import PostMain from './components/PostMain';
import Footer from './components/common/Footer';

class App extends Component {

  //번호,제목,내용,작성자,등록일,첨부,조회
  constructor(props){
    super(props);

    this.state={
            posts:[
              {no:1,title:'시스템 장애신고 전화번호는 070-8823-6974 입니다.',contents:'내용1',author:'관리자',regDate:'2017-12-16',attach:'Y',hits:285},
            ]
            ,startIdx:0
            ,endIdx:0
    }
  
  }

  enrollPost=async(title,contents,author, files)=>{
        console.log("글 등록!(App)")
        console.log("title:"+title)
        console.log("contents:"+contents)
        console.log("author:"+author)
        //글번호는 지정안해도됨
        let myDate=new Date()
        let year=myDate.getFullYear()
        let month=myDate.getMonth()+1
        let day=myDate.getDate()
        
        if(month<10){
          month="0"+month
        }
        if(day<10){
          day="0"+day
        }

        let regDate=year+"-"+month+"-"+day
      const post ={title:title,contents:contents,author:author,regDate:regDate,attach:'N',hits:0}
      
      const formData = new FormData();
      formData.append("title", title);
      formData.append("contents", contents);
      formData.append("author", author);
      formData.append("regDate", regDate);
      formData.append("hits", 0);
      formData.append("uploadFile", files); // 파일 객체

      
      axios.post('/board/insert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  }


  _getBoarList = async() => {
    //alert("요청!")
    console.log('요청!')
    axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.get['widthCredentials'] = true
    const res = await axios.get(`/board`);
    console.log(res);
    console.log(res.data.board_res);
    var boardList=res.data.board_res
    var date;
    var fullDate='';
    for(var i=0; i<boardList.length; i++){
      console.log(boardList[i].regDate)
      date=new Date(boardList[i].regDate)
      fullDate
      =this.transDate(date)
      boardList[i].regDate=fullDate
    }

    this.setState({
      posts:boardList
    })
  }

  render(){
    const {posts}=this.state;

    return (
    <div className="App">
    <BrowserRouter>
       <Routes>
          <Route path='/postWrite' element={<PostWrite enrollPost={this.enrollPost}></PostWrite>} />
          <Route path='/postWrite_quill' element={<PostWriteQuill></PostWriteQuill>} />
          <Route path='/postView' element={<PostView></PostView>} />
          <Route path='/' element={<PostMain posts={posts}></PostMain>} /> 
      </Routes>    
    </BrowserRouter>
    <Footer></Footer>
    </div>
  );
  }
  
}

export default App;

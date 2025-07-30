
import React, { Component } from 'react';
import '../css/InputComp.css';
import axios from 'axios';

class InputComp extends Component {

    constructor(props){
        super(props);
        this.state={
            posts:this.props.posts,
            searchText:''
        }
    }

    searchBoardList=async()=>{
        const {searchText}=this.state
        console.log("게시판 검색 버튼!")
        console.log("입력된 검색어:"+searchText)

        let res=null
        if(searchText===''){
            return;
        }else{
            alert('DB조회')
            res = await axios.get(`/board/search/${searchText}`);
        }
        console.log(res.data.board_res)
        this.props.setBoardListBySearch(res.data.board_res)
    }

    searchAllBoardList=async()=>{
        window.location.href='/'
    }

    inputChange=(e)=>{
        var searchText = e.target.value
        console.log(searchText)
        searchText=searchText.trim()
        this.setState({
            searchText:searchText
        })
    }

    render(){
        
        const {posts,currentPage,postsPerPage}=this.props
        const totalPosts=posts.length;
        const totalPage=Math.ceil(totalPosts / postsPerPage)

        return(
            
            <div id="input-comp">
                <div id="notice-head">
                <div>
                <span></span>
                <span></span>
                </div>
                
                <h1>알립니다</h1>
                </div>
                <div id="board-info">
                    <ul>
                        <li>총게시물:</li>
                        <li>{posts.length}</li>
                        <li>/</li>
                        <li>페이지:</li>
                        <li>{currentPage}</li>
                        <li>/</li>
                        <li>{totalPage}</li>
                    </ul>
                </div>
                <div id="board-search">
                    <select>
                        <option>제목</option>
                        <option>작성자</option>
                        <option>내용</option>
                    </select>
                    <input type="text" placeholder='검색어를 입력하세요' onChange={this.inputChange}></input>
                    <button id="search-btn" onClick={this.searchBoardList}>검색</button>
                    <button id="search-all-btn" onClick={this.searchAllBoardList}>전체보기</button>
                </div>
            </div>
        );
    }
}

export default InputComp;

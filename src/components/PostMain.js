import React, { Component } from 'react';
import '../css/Post.css';
import PostMainHeader from './common/PostMainHeader';
import PostList from './PostList';
import PageNation from './PageNation';
import InputComp from './InputComp';
import axios from 'axios';

class PostMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      currentPage: 1,
      postsPerPage: 10,
      firstPage: 0,
      lastPage: 0,
    };
  }

  componentDidMount() {
    this._getBoardList();
  }

  _getBoardList = async () => {
    try {
      const res = await axios.get('/board');
      const boardList = res.data.board_res || [];

      const formattedList = boardList.map((post) => {
        const date = new Date(post.regDate);
        return {
          ...post,
          regDate: this.formatDate(date),
        };
      });

      this.setState({ posts: formattedList });
    } catch (error) {
      console.error('게시글 목록 가져오기 실패:', error);
    }
  };

  formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  setCurrentPage = (page) => {
    this.setState({ currentPage: page });
  };

  currentPosts = (totalPosts) => {
    const { currentPage, postsPerPage } = this.state;
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    return totalPosts.slice(indexOfFirst, indexOfLast);
  };

  setBoardListBySearch = (boardList) => {
    this.setState({ posts: boardList });
  };

  render() {
    const { posts, postsPerPage, currentPage, firstPage, lastPage } = this.state;

    return (
      <div id="post-main">
        <PostMainHeader />
        <InputComp
          posts={posts}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          setBoardListBySearch={this.setBoardListBySearch}
        />
        <PostList posts={this.currentPosts(posts)} />
        <PageNation
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          setCurrentPage={this.setCurrentPage}
          currentPage={currentPage}
          firstPage={firstPage}
          lastPage={lastPage}
        />
      </div>
    );
  }
}

export default PostMain;

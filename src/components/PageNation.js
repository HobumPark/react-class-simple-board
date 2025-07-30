import React, { Component } from 'react';
import '../css/PageNation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';

class PageNation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: props.currentPage || 1,
    };
  }

  componentDidUpdate(prevProps) {
    // 외부에서 currentPage 변경 시 내부 상태도 반영
    if (prevProps.currentPage !== this.props.currentPage) {
      this.setState({ currentPage: this.props.currentPage });
    }
  }

  handleClickPage = (page) => {
    this.setState({ currentPage: page });
    this.props.setCurrentPage(page);
  };

  handlePrev = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.handleClickPage(currentPage - 1);
    }
  };

  handleNext = () => {
    const { currentPage } = this.state;
    const { totalPosts, postsPerPage } = this.props;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    if (currentPage < totalPages) {
      this.handleClickPage(currentPage + 1);
    }
  };

  handlePrevBlock = () => {
    const { currentPage } = this.state;
    const pageBlockSize = 10;
    const prevBlockStart = Math.max(1, Math.floor((currentPage - 1) / pageBlockSize) * pageBlockSize - pageBlockSize + 1);
    this.handleClickPage(prevBlockStart);
  };

  handleNextBlock = () => {
    const { currentPage } = this.state;
    const { totalPosts, postsPerPage } = this.props;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const pageBlockSize = 10;
    const nextBlockStart = Math.min(totalPages, Math.floor((currentPage - 1) / pageBlockSize) * pageBlockSize + pageBlockSize + 1);
    this.handleClickPage(nextBlockStart);
  };

  render() {
    const { totalPosts, postsPerPage } = this.props;
    const { currentPage } = this.state;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const pageBlockSize = 10;

    const currentBlock = Math.floor((currentPage - 1) / pageBlockSize);
    const blockStart = currentBlock * pageBlockSize + 1;
    const blockEnd = Math.min(blockStart + pageBlockSize - 1, totalPages);

    const pages = [];
    for (let i = blockStart; i <= blockEnd; i++) {
      pages.push(
        <span
          key={i}
          className="page"
          onClick={() => this.handleClickPage(i)}
          style={{
            fontWeight: i === currentPage ? 'bold' : 'normal',
            color: i === currentPage ? 'white' : 'black',
            backgroundColor: i === currentPage ? '#777' : 'white',
          }}
        >
          {i}
        </span>
      );
    }

    return (
      <div className="PageNation">
        <div className="pageList">
          {/* ≪ 이전 블록 */}
          {blockStart > 1 && (
            <span className="page" onClick={this.handlePrevBlock}>
              <FontAwesomeIcon icon={faAnglesLeft} />
            </span>
          )}

          {/* ◀ 이전 페이지 */}
          {currentPage > 1 && (
            <span className="page" onClick={this.handlePrev}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          )}

          {/* 페이지 번호들 */}
          {pages}

          {/* ▶ 다음 페이지 */}
          {currentPage < totalPages && (
            <span className="page" onClick={this.handleNext}>
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          )}

          {/* ≫ 다음 블록 */}
          {blockEnd < totalPages && (
            <span className="page" onClick={this.handleNextBlock}>
              <FontAwesomeIcon icon={faAnglesRight} />
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default PageNation;

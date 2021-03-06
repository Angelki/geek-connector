import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Carousel, Layout, BackTop } from "antd";
import GlobalSider from "./GlobalSider";
import PostFeed from "../posts/PostFeed";
import {
  getPosts,
  deletePost,
  addLike,
  removeLike
} from "../../actions/postActions";

const { Content } = Layout;

class IndexContent extends Component {
  state = {
    searchVisible: true
  };
  componentWillMount() {
    this.props.getPosts();
    this.props.changeSearchVisible(true);
  }

  componentWillUnmount() {
    this.props.changeSearchVisible(false);
  }
  render() {
    const { posts } = this.props.post;
    const { addLike, deletePost, removeLike, auth, search } = this.props;
    // console.log(this.props.post);
    return (
      <Content style={{ padding: "0 50px" }}>
        <BackTop />
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          {/* <GlobalSider /> */}
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Carousel autoplay>
              <div>
                <h3> 数百种编程语言，而我为什么要学 Python？ </h3>
              </div>
              <div>
                <h3>网页样式——各种炫酷效果及实现代码 </h3>
              </div>
              <div>
                <h3>
                  令人难以理解的软件工程师：几千行代码能搞定的为什么要写几万行？
                </h3>
              </div>
              <div>
                <h3>不止 Java，Oracle 向 JavaScript 开炮！</h3>
              </div>
            </Carousel>

            <PostFeed
              posts={
                search.length <= 0
                  ? posts
                  : posts.filter(item => item.title.indexOf(search) !== -1)
              }
              addLike={addLike}
              removeLike={removeLike}
              deletePost={deletePost}
              auth={auth}
            />
          </Content>
        </Layout>
      </Content>
    );
  }
}

IndexContent.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getPosts,
  addLike,
  removeLike,
  deletePost
})(IndexContent);

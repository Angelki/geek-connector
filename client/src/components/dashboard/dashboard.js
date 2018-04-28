import React, { Component } from "react";
import { Spin, Layout, Button, Alert, Icon, Col, Row } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileActions";

import ProfileOperation from "./ProfileOperation";
import Experience from "./Experience";
import Education from "./Education";

const { Content } = Layout;

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = (
        <Row>
          <Col span={11} />
          <Col span={2}>
            <Spin tip="正在加载..." />
          </Col>
          <Col span={11} />
        </Row>
      );
    } else {
      // dashboardContent = <h1>Hello</h1>;
      // 用户是否有简介
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <Row
              type="flex"
              justify="end"
              align="bottom"
              style={{ margin: "0 20px" }}
            />
            <Row
              type="flex"
              justify="space-between"
              align="bottom"
              style={{ margin: "0 20px" }}
            >
              <Col>
                欢迎,<Link to={`/profile/${profile.handle}`}>{user.name}</Link>用户!
              </Col>
              <ProfileOperation />
            </Row>
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
            <button onClick={this.onDeleteClick}>Delete My Account</button>
          </div>
        );
      } else {
        // 用户一登陆 但是没简介
        dashboardContent = (
          <div>
            <Alert
              message="您还没有创建简介"
              description="您可以点击下面的按钮创建一个自己的简介，方便让更多人认识你。"
              type="info"
              showIcon
              style={{ margin: "42px 24px 50px" }}
            />
            <Row>
              <Col span={11} />
              <Col span={2}>
                <Link to="create-profile">
                  <Button type="primary" size="large">
                    创建个人简介
                  </Button>
                </Link>
              </Col>
              <Col span={11} />
            </Row>
          </div>
        );
      }
    }
    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>个人中心</h1>
          </div>
          <div>{dashboardContent}</div>
        </Layout>
      </Content>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

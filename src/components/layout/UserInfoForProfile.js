import React, { useState, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import { getProfile } from "../../store/auth/actions";
import { connect } from "react-redux";
import StorageService from "../../services/StorageService";
import { withRouter } from "react-router-dom";
import styles from "./index.module.scss";

const UserPersonalInfo = ({ getProfile, authState }) => {
  let userData = StorageService.user.value;
  const { loading } = authState;
  const [ready, updateReady] = useState(false);
  const [requested, updateRequested] = useState(false);

  useEffect(() => {
    if (!loading && !ready) {
      getProfile(userData.id);
      updateRequested(true);
      userData = StorageService.user.value;
    }
    if (!loading && requested) {
      updateReady(true);
    }
  }, [loading, ready]);

  return (
    <div>
      {ready && (
        <ListGroup className={styles.userInfo}>
          <h3>User Info:</h3>
          <div>
            <ListGroupItemHeading>First Name:</ListGroupItemHeading>
            <ListGroupItemText>
              {userData ? userData.firstName : null}
            </ListGroupItemText>
          </div>
          <div>
            <ListGroupItemHeading>Last Name:</ListGroupItemHeading>
            <ListGroupItemText>
              {userData ? userData.lastName : null}
            </ListGroupItemText>
          </div>
          <div>
            <ListGroupItemHeading>Description:</ListGroupItemHeading>
            <ListGroupItemText>
              {userData ? userData.description : null}
            </ListGroupItemText>
          </div>
          <div>
            <ListGroupItemHeading>Phone:</ListGroupItemHeading>
            <ListGroupItemText>
              {userData ? userData.phone : null}
            </ListGroupItemText>
          </div>
        </ListGroup>
      )}
    </div>
  );
};

const mapStateToProps = ({ Auth }) => ({ authState: Auth });

export default withRouter(
  connect(mapStateToProps, { getProfile })(UserPersonalInfo)
);

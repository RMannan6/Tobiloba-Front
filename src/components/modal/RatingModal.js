import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  let history = useHistory();
  let { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else if (!user || user == undefined) {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };
  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-warning" /> <br />
        {user ? "leave a rating" : "only for logged-in users!"}
      </div>
      <Modal
        title="leave a rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review!");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;

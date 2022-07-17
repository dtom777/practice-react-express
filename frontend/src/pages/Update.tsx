import React from "react";
import { TypeEnum } from "../types/Post.type";
import Form from "../components/Form";
import Layout from "../components/Layout";

const Update = () => {
  return (
    <>
      <Layout>
        <Form type={TypeEnum.update} />
      </Layout>
    </>
  );
};

export default Update;

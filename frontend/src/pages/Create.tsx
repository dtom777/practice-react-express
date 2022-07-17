import React from "react";
import { TypeEnum } from "../types/Post.type";
import Form from "../components/Form";
import Layout from "../components/Layout";

const Create = () => {
  return (
    <>
      <Layout>
        <Form type={TypeEnum.create} />
      </Layout>
    </>
  );
};

export default Create;

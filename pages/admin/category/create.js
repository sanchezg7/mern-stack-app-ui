import React, { useState, useEffect } from "react";
import { API } from "../../../config";
import Layout from "../../../components/Layout";
import WithAdminHOC from "../../../user/withAdminHOC";
import { showSuccessMessage, showErrorMessage } from "../../register.notification";

const Create = () => {
    const [state, setState] = useState({
        name: "",
        content: "",
        error: "",
        success: "",
        formData: typeof window !== "undefined" ? new FormData() : "",
        buttonText: "Create",
        imageUploadText: "Upload Image"
    });

    const { name, content, success, error, formData, buttonText, imageUploadText } = state;

    const handleChange = name => e => {
        const value = name === "image" ? e.target.files[0] : e.target.value;
        const imageName = name === "image" ? e.target.files[0] : "Upload image";
        formData.set(name, value);
        setState({ ...state, [name]: value, error: "", success: "", imageUploadText: imageName });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state, buttonText: "Creating..." });
        console.log(formData);
    };

    return (
      <Layout>
          <div className="row">
              <div className="col-md-6 offset-md-3">
                  <h1>Create Category</h1>
                  <form onSubmit={handleSubmit}>
                      <div className="form-group">
                          <label className="text-muted">Name</label>
                          <input
                              className="form-control"
                              type="text"
                              onChange={handleChange("name")}
                              value={name}
                              required
                          />
                      </div>
                      <div className="form-group">
                          <label className="text-muted">Content</label>
                          <textarea
                              className="form-control"
                              onChange={handleChange("content")}
                              value={content}
                              required
                          />
                      </div>
                      <div className="form-group">
                          <label className="text-muted">Image</label>
                          <input
                              className="form-control"
                              type="file"
                              onChange={handleChange("image")}
                          />
                      </div>
                      <div>
                          <button className="btn btn-outline-warning">
                              {buttonText}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </Layout>
    );
};

export default WithAdminHOC(Create);
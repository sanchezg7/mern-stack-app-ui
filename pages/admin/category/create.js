import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { API } from "../../../config";
import Layout from "../../../components/Layout";
import WithAdminHOC from "../../../user/withAdminHOC";
import { showSuccessMessage, showErrorMessage } from "../../register.notification";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import 'react-quill/dist/quill.snow.css';

const getDefaultState = () => ({
    name: "",
    // content: "",
    error: "",
    success: "",
    image: "", //base64 form data
    buttonText: "Create",
    imageUploadText: "Upload Image",
});

const Create = ({ token }) => {
    const [state, setState] = useState(getDefaultState());
    const [content, setContent] = useState("");
    const handleContentChange = e => {
      setContent(e.target.value);
    };
    const { name, /*content,*/ success, error, image, buttonText, imageUploadText } = state;

    const handleChange = name => e => {
        const newState = {};
        let value = e.target.value;
        setState({ ...state,
            [name]: value,
            error: "",
            ...newState
        });
    };

    const handleImageSelection = e => {
      const imageObj = e.target.files[0];
      if(imageObj) {
          const imageObj = e.target.files[0];
          const imageName = imageObj.name;
          Resizer.imageFileResizer(
              imageObj,
              300,
              300,
              "JPEG",
              100,
              0,
              data =>{
                  setState({
                      ...state,
                      image: data,
                      imageUploadText: imageName
                  });
              },
              "base64"
          )
      }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state, buttonText: "Creating..." });
        try {
          const response = await axios.post(`${API}/category`, {
              name,
              content,
              image
          }, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          setState({...getDefaultState(),
              buttonText: "Created",
              imageUploadText: "Upload image",
              success: `${response.data.name} is created`
          });
        } catch (e) {
            console.error(e);
        }
    };

    return (
      <Layout>
          <div className="row">
              <div className="col-md-6 offset-md-3">
                  <h1>Create Category</h1>
                  {success && showSuccessMessage(success)}
                  {error && showErrorMessage(error)}
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
                          <ReactQuill
                              theme="snow"
                              value={content}
                              onChange={handleContentChange}
                              placeholder="Write something..."
                              className="pd-5 mb-3"
                              style={{ border: "1px solid #666 "}}
                          />
                      </div>
                      <div className="form-group">
                          <label className="btn btn-outline-secondary">
                          {imageUploadText}
                            <input
                              className="form-control"
                              type="file"
                              accept="image/*"
                              onChange={handleImageSelection}
                              hidden
                            />
                          </label>
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
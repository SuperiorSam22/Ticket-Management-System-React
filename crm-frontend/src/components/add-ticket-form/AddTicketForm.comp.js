import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  // Jumbotron,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { openNewTicket } from "./addTicketAction";
import { shortText } from "../../utils/validation";
import { restSuccessMSg } from "./addTicketSlicer";

import "./add-ticket-form.style.css";

const initialFrmDt = {
  subject: "",
  issueDate: "",
  message: "",
  severity: "Low",// Default value for severity
  image: null, 
};
const initialFrmError = {
  subject: false,
  issueDate: false,
  message: false,
};

export const AddTicketForm = () => {
  const dispatch = useDispatch();

  const {
    user: { name },
  } = useSelector((state) => state.user);

  const { isLoading, error, successMsg } = useSelector(
    (state) => state.openTicket
  );
  const [image, setImage] = useState(null);
  const [frmData, setFrmData] = useState(initialFrmDt);
  const [frmDataErro, setFrmDataErro] = useState(initialFrmError);

  useEffect(() => {
    return () => {
      successMsg && dispatch(restSuccessMSg());
    };
  }, [dispatch, frmData, frmDataErro]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    
    setFrmData({
      ...frmData,
      [name]: value,
      'image': image
    });
  };

  const handleOnFileChange = (e) => {
    setFrmData({
      ...frmData,
      image: e.target.files[0],
    });
  };


  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // setFrmDataErro(initialFrmError);

    // const isSubjectValid = await shortText(frmData.subject);

    // setFrmDataErro({
    //   ...initialFrmError,
    //   subject: !isSubjectValid,
    // });
    console.log(image)
    dispatch(openNewTicket({ ...frmData, sender: name }));
  };

  return (
    // <Jumbotron className="mt-3 add-new-ticket bg-light">
    <>
      <h1 className="text-info text-center">Add New Ticket</h1>
      <hr />
      <div>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMsg && <Alert variant="primary">{successMsg}</Alert>}
        {isLoading && <Spinner variant="primary" animation="border" />}
      </div>
      <Form autoComplete="off" onSubmit={handleOnSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Title
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name="subject"
              value={frmData.subject}
              maxLength="100"
              onChange={handleOnChange}
              placeholder="Title"
              required
            />
            <Form.Text className="text-danger">
              {frmDataErro.subject && "Subject is required!"}
            </Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Issue Date
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              name="issueDate"
              value={frmData.issueDate}
              onChange={handleOnChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group>
          <Form.Label>Issue</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows="5"
            value={frmData.message}
            onChange={handleOnChange}
            required
          />
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Severity
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as="select"
              name="severity"
              value={frmData.severity}
              onChange={handleOnChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </Form.Control>
          </Col>
        </Form.Group>
          <div className="form-group">
          <label htmlFor="image">Attach Image</label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={handleOnFileChange}
          />
        </div>
        <Button type="submit" variant="info" block style={{marginTop:"10px"}}>
          Open Ticket
        </Button>
      </Form>
      </>
    // </Jumbotron>
  );
};




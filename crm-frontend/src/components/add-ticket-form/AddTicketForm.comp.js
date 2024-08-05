import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  // Jumbotron,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { openNewTicket } from "./addTicketAction";
import { shortText } from "../../utils/validation";
import { restSuccessMSg } from "./addTicketSlicer";

import "./add-ticket-form.style.css";
import {
  alpha,
  Divider,
  FormControl,
  InputBase,
  InputLabel,
  styled,
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const initialFrmDt = {
  subject: "",
  issueDate: "",
  message: "",
  severity: "Low", // Default value for severity
  image: null,
};
const initialFrmError = {
  subject: false,
  issueDate: false,
  message: false,
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 14,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

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
      image: image,
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
    console.log(frmData);
    dispatch(openNewTicket({ ...frmData, sender: name }));
  };

  return (
    // <Jumbotron className="mt-3 add-new-ticket bg-light">
    <>
      <form onSubmit={handleOnSubmit}>
        <Box className="add-ticket">
          <h3>Add new ticket</h3>
          <Divider />
          <Box className="input-fields" mt={2}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="bootstrap-input">
                Title
              </InputLabel>
              <BootstrapInput
                id="bootstrap-input"
                name="subject"
                onChange={handleOnChange}
              />
            </FormControl>
            <Box mt={2} sx={{ display: "flex", gap: "20px" }}>
              <Box>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Date
                </InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(val) =>
                      setFrmData({
                        ...frmData,
                        issueDate: val,
                      })
                    }
                  />
                </LocalizationProvider>
              </Box>
              <Box>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Severity
                </InputLabel>
                <TextField
                  id="outlined-select-currency"
                  select
                  helperText="Please select your severity"
                >
                  <MenuItem key={"low"} value={"low"}>
                    Low
                  </MenuItem>
                  <MenuItem key={"medium"} value={"medium"}>
                    Medium
                  </MenuItem>
                  <MenuItem key={"high"} value={"high"}>
                    High
                  </MenuItem>
                </TextField>
              </Box>
            </Box>
            <Box>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Message
                </InputLabel>
                <BootstrapInput
                  id="bootstrap-input"
                  name="message"
                  onChange={handleOnChange}
                />
              </FormControl>
            </Box>
            <Box mt={2}>
              <InputLabel shrink htmlFor="bootstrap-input">
                Image
              </InputLabel>
              <input
                type="file"
                id="image"
                className="form-control"
                onChange={handleOnFileChange}
              />
            </Box>
          </Box>
          <Box mt={2}>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Box>
        </Box>
      </form>
      {/* <h1 className="text-info">Add New Ticket</h1>
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
      </Form> */}
    </>
    // </Jumbotron>
  );
};

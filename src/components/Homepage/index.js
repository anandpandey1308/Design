import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from "@material-ui/icons/Save";
import CheckIcon from "@material-ui/icons/Check";

import "./index.css";

import Modal from "../Modal";

class Homepage extends Component {
  state = {
    is_modal_up: false,
    project_name: "",
    github_url: "",
    project_type: "",
    host_name: "",
    credential_id: "",
    image_name: "",
    compose_file_path: "",
    working_dir: "",
    service_name: "",
    secret_name: "",
    jar_name: "",
    replica_no: "",
    container_port: "",
    host_port: "",
    log_file_path: "",
    network_name: "",
    docker_compose: "",
    version: "",
    isLoading: false,
    isSuccessful: false,
    showChildModal: false
  };

  showModal = e => {
    const { is_modal_up } = this.state;

    this.setState({
      is_modal_up: !is_modal_up
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "project_type") {
      this.showModal(e);
    }
    if (e.target.name === "github_url") {
      this.state.pname = e.target.value + "";
      console.log(this.state.pname.split("/"));
      this.state.pname = this.state.pname.split("/")[4].split(".")[0];
      this.state.secret_name = this.state.pname + "-secret";
      this.state.log_file_path =
        "/home/hdxts/dragonfly/logs/" + this.state.pname;
      this.state.compose_file_path =
        "/home/hdxts/dragonfly/" + this.state.pname;
      this.state.working_dir = "/home/hdxts/dragonfly/" + this.state.pname;
      this.state.jar_name =
        this.state.pname + "-" + this.state.version + ".jar";
      //this.setState({ [e.target.name]: pname });
    }
  };

  handleSubmit = (e, type) => {
    e.preventDefault();

    const {
      working_dir,
      container_port,
      jar_name,
      docker_compose,
      service_name,
      image_name,
      log_file_path,
      host_port,
      secret_name,
      replica_no,
      network_name,
      host_name,
      credential_id,
      project_name,
      compose_file_path,
      version
    } = this.state;

    const body =
      type === "docker"
        ? {
            working_dir,
            container_port,
            jar_name,
            docker_compose,
            service_name,
            image_name,
            log_file_path,
            host_port,
            secret_name,
            replica_no,
            network_name,
            version
          }
        : {
            host_name,
            credential_id,
            project_name,
            image_name,
            compose_file_path,
            working_dir,
            service_name,
            secret_name,
            version
          };
    this.showModal(e);
  };

  handleSubmitData = e => {
    e.preventDefault();

    const {
      working_dir,
      container_port,
      jar_name,
      docker_compose,
      service_name,
      image_name,
      log_file_path,
      host_port,
      secret_name,
      replica_no,
      network_name,
      host_name,
      credential_id,
      project_name,
      compose_file_path,
      version
    } = this.state;

    const dockerBody = {
      working_dir,
      container_port,
      jar_name,
      docker_compose,
      service_name,
      image_name,
      log_file_path,
      host_port,
      secret_name,
      replica_no,
      network_name,
      version
    };

    const pipelineBody = {
      host_name,
      credential_id,
      project_name,
      //image_name,
      compose_file_path
      //working_dir,
      //service_name,
      //secret_name
    };

    this.generateFile(dockerBody);
    //this.generateFile(pipelineBody);
  };

  generateFile = data => {
    this.setState({ isLoading: true });
    axios
      .post(`localhost:8098/both`, data)
      .then(res => {
        if (res.error) {
          this.setState({ isLoading: false });
        } else {
          console.log(res.data);
          this.setState({ isLoading: false });
          this.setState({ isSuccessful: true });
          this.setState({ showChildModal: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {
      project_type,
      isLoading,
      isSuccessful,
      showChildModal
    } = this.state;

    return (
      <div>
        <Modal
          onClose={this.showModal}
          show={this.state.is_modal_up}
          title={project_type ? project_type : ""}
        >
          {project_type === "Docker" && (
            <form style={formContainer}>
              <div>
                <TextField
                  placeholder=" Working Dir"
                  fullWidth
                  margin="normal"
                  name="working_dir"
                  value={this.state.working_dir}
                  onChange={this.onChange}
                  required
                />
                <TextField
                  placeholder=" Container Port"
                  fullWidth
                  margin="normal"
                  name="container_port"
                  value={this.state.container_port}
                  onChange={this.onChange}
                  required
                />
                <TextField
                  placeholder=" Jar Name"
                  fullWidth
                  margin="normal"
                  name="jar_name"
                  value={this.state.jar_name}
                  onChange={this.onChange}
                  required
                />

                <TextField
                  placeholder=" Image Name"
                  fullWidth
                  margin="normal"
                  name="image_name"
                  value={this.state.image_name}
                  onChange={this.onChange}
                  required
                />
                <TextField
                  placeholder=" Service Name"
                  fullWidth
                  margin="normal"
                  name="service_name"
                  value={this.state.service_name}
                  onChange={this.onChange}
                  required
                />
                <TextField
                  placeholder=" Log File Path"
                  fullWidth
                  margin="normal"
                  name="log_file_path"
                  value={this.state.log_file_path}
                  onChange={this.onChange}
                  required
                />
                <TextField
                  placeholder=" Host Port"
                  fullWidth
                  margin="normal"
                  name="host_port"
                  value={this.state.host_port}
                  onChange={this.onChange}
                  required
                />
                <TextField
                  placeholder=" Secret Name"
                  fullWidth
                  margin="normal"
                  name="secret_name"
                  value={this.state.secret_name}
                  onChange={this.onChange}
                  required
                />
                <TextField
                  placeholder=" Replica No"
                  fullWidth
                  margin="normal"
                  name="replica_no"
                  value={this.state.replica_no}
                  onChange={this.onChange}
                  required
                />
                {/* <TextField
                  placeholder=" Network Name"
                  fullWidth
                  margin="normal"
                  name="network_name"
                  value={this.state.network_name}
                  onChange={this.onChange}
                  required
                /> */}

                <Button
                  type="submit"
                  onClick={e => this.handleSubmit(e, "docker")}
                  variant="contained"
                  color="primary"
                >
                  Save
                  <SaveIcon />
                </Button>
              </div>
            </form>
          )}

          {project_type === "Pipeline" && (
            <form style={formContainer}>
              <div>
                <TextField
                  placeholder=" Host Name"
                  fullWidth
                  margin="normal"
                  name="host_name"
                  value="CERNAPIQUN052"
                  onChange={this.onChange}
                  required
                />
                <TextField
                  placeholder=" Credential Id"
                  fullWidth
                  margin="normal"
                  name="credential_id"
                  value="hdxts-root-credential"
                  onChange={this.onChange}
                  required
                />
                {/* <TextField
                  placeholder=" Project Name"
                  fullWidth
                  margin="normal"
                  name="project_name"
                  value={this.state.project_name}
                  onChange={this.onChange}
                  required
                /> */}
                {/* <TextField
                  placeholder="Image Name"
                  fullWidth
                  margin="normal"
                  name="image_name"
                  value={this.state.image_name}
                  onChange={this.onChange}
                  required
                /> */}
                <TextField
                  placeholder=" Compose File Path"
                  fullWidth
                  margin="normal"
                  name="compose_file_path"
                  value={this.state.compose_file_path}
                  onChange={this.onChange}
                  required
                />
                {/* <TextField
                  placeholder=" Working Dir"
                  fullWidth
                  margin="normal"
                  name="working_dir"
                  value={this.state.working_dir}
                  onChange={this.onChange}
                  required
                /> */}
                {/* <TextField
                  placeholder=" Service Name"
                  fullWidth
                  margin="normal"
                  name="service_name"
                  value={this.state.service_name}
                  onChange={this.onChange}
                  required
                /> */}
                {/* <TextField
                  placeholder=" Secre Name"
                  fullWidth
                  margin="normal"
                  name="secret_name"
                  value={this.state.secret_name}
                  onChange={this.onChange}
                  required
                /> */}
                <Button
                  type="submit"
                  onClick={e => this.handleSubmit(e, "pipeline")}
                  variant="contained"
                  color="primary"
                >
                  Save
                  <SaveIcon />
                </Button>
              </div>
            </form>
          )}
        </Modal>

        {isLoading && (
          <div className="fadedBgArea">
            <CircularProgress color="secondary" />
            <div className="title">
              <b> Generating Files</b>
            </div>
          </div>
        )}

        {isSuccessful && showChildModal && (
          <div className="fadedBgArea">
            <div className="content">
              <CheckIcon />
              <div className="title">Successful</div>
              <button className="closeBtn" onClick={this.onClose}>
                X
              </button>
            </div>
          </div>
        )}

        {/* <div>Docker Pipeline Automation</div> */}

        <form style={formContainer}>
          <div>
            <TextField
              placeholder=" Project name"
              fullWidth
              margin="normal"
              name="pname"
              pattern="[a-zA-Z]$"
              value={this.state.pname}
              onChange={this.onChange}
              required
            />
            <TextField
              placeholder=" Version"
              fullWidth
              margin="normal"
              name="version"
              value={this.state.version}
              onChange={this.onChange}
              required
            />
            <TextField
              placeholder=" Github Url"
              fullWidth
              margin="normal"
              name="github_url"
              value={this.state.github_url}
              onChange={this.onChange}
              required
            />
            <RadioGroup
              style={styleFlex}
              aria-label="project_type"
              name="project_type"
              value={this.state.project_type}
              onChange={this.onChange}
            >
              <FormControlLabel
                value="Docker"
                control={<Radio />}
                label="Docker"
              />
              <FormControlLabel
                value="Pipeline"
                control={<Radio />}
                label="Pipeline"
              />
            </RadioGroup>
            <Button
              type="submit"
              onClick={e => this.handleSubmitData(e)}
              variant="contained"
              color="primary"
            >
              Submit Data
              <SaveIcon />
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const formContainer = {
  display: "flex",
  flexFlow: "row wrap",
  width: "100%",
  maxWidth: "700px",
  margin: "0 auto"
};

const styleFlex = {
  display: "flex",
  justifyContent: "end"
};

export default Homepage;

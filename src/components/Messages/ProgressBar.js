import React from "react";
//import { Progress } from "semantic-ui-react";
import { MDBProgress } from 'mdbreact';

const ProgressBar = ({ uploadState, percentUploaded }) =>
  uploadState === "uploading" && (
    <MDBProgress 
      material
      animated
      percent={percentUploaded}
    />
    /*<Progress
      className="progress__bar"
      percent={percentUploaded}
      progress
      indicating
      size="medium"
      inverted
    />*/
  );

export default ProgressBar;

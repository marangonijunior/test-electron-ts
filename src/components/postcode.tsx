import React, { useState } from "react";
import { TextField, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import PostCodeAPI from "../services/postcode";

export interface PostCodeProps {
  updateLatLng: (value: Object) => void;
}

const PostCodeComponent = (props: PostCodeProps) => {
  const { updateLatLng } = props;

  const [errorPostCode, setErrorPostCode] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (code: string) => {
    if (code.length === 6) {
      setLoading(true);
      PostCodeAPI.searchPostCode(code).then((item: any) => {
        setLoading(false);
        if (item.result) {
          updateLatLng({
            lat: item.result.latitude,
            lng: item.result.longitude,
          });
        } else {
          setErrorPostCode(true);
          setError(item.error);
        }
      });
    } else {
      setError("");
      setErrorPostCode(false);
    }
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <TextField
          error={errorPostCode}
          id="filled-error"
          label="PostCode"
          defaultValue=""
          variant="filled"
          onChange={(event) => {
            handleSubmit(event.target.value);
          }}
        />
      )}
      {errorPostCode && (
        <Alert severity="warning" color="info">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default PostCodeComponent;

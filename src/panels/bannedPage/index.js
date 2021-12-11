import React, { useState, useEffect, useReducer } from "react";
import { SpinnerIcon } from "../../icons";
import "./BannedPage.scss";

const BannedPage = ({ fetchedUser }) => {
  return (
    <div className="banned">
      <SpinnerIcon />
    </div>
  );
};

export { BannedPage };

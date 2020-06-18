import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";

export default function Home() {
  console.log("ApI IS", API);
  return (
    <Base title="Home page"description="Welcome to Tshirt Store">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">test</button>
        </div>

        <div className="col-4">
          <button className="btn btn-success">test</button>
        </div>
      </div>
    </Base>
  );
}

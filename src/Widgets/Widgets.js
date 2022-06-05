import React from "react";
import "./Widgets.css";
import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Widgets() {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecordIcon />
      </div>
      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>

      {newsArticle("how to center a div?", "Top news - 999999 readers")}
      {newsArticle("Coronavirus: EG Updates", "Top news - 8009 readers")}
      {newsArticle("Bitcoin Breaks $40k", " Crypto - 7709 readers")}
      {newsArticle("Tesla is coming back", "Cars & auto - 6000 readers")}
      {newsArticle("is Redux too good?", "Top news - 2600 readers")}
      {newsArticle("how to center a div please?", "Top news - 1102 readers")}
    </div>
  );
}

export default Widgets;

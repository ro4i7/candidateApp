import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Fade from "@mui/material/Fade";

const JobCard = ({ job }) => {
  const {
    jdUid,
    jdLink,
    jobDetailsFromCompany,
    jobRole,
    location,
    minExp,
    maxExp,
    minJdSalary,
    maxJdSalary,
    salaryCurrencyCode,
  } = job;

  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const shortenText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ");
    }
    return text;
  };

  const fadeText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      const remainingWords = words.length - limit;
      const opacity = Math.max(0, 1 - remainingWords / 10); // Fade when approaching 45 words
      return (
        <span style={{ opacity }}>{words.slice(0, limit).join(" ")}...</span>
      );
    }
    return text;
  };
  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const capitalizedJobRole = capitalizeFirstLetter(jobRole);
  const capitalizedLocation = capitalizeFirstLetter(location);

  return (
    <>
      <Card  sx={{borderRadius:5}}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {capitalizedJobRole}
          </Typography>
          <Typography color="textSecondary">{capitalizedLocation}</Typography>
          <Typography color="textSecondary">
            Estimated Salary: {minJdSalary} - {maxJdSalary} {salaryCurrencyCode}{" "}
            ✅
          </Typography>
          <Typography> About Company:</Typography>
          <Typography variant="body2" component="p">
            {fadeText(shortenText(jobDetailsFromCompany, 45), 45)}
          </Typography>
          <Typography>
          <Button
              variant="text"
              color="primary"
              onClick={toggleModal}
              style={{ marginLeft: "auto", textTransform: "none" }}
            >
              View Job
            </Button>
          </Typography>
          <Typography color="textSecondary"> Minimum Experience </Typography>
          <Typography color="textSecondary">{minExp} years</Typography>
          <Typography>
            <Button
              style={{
                marginBottom: "10px",
                width: '100%',
                backgroundColor: 'rgb(85, 239, 196)',
                color: "black", textTransform: "none"
              }}
              variant="contained"
              color="success"
              href={jdLink}
              target="_blank"
            >
              ⚡Easy Apply
            </Button>
          </Typography>
          <Typography>
            <Button
              style={{ marginBottom: "10px",width:'100%', backgroundColor: "#1a73e8", textTransform: "none"}}
              variant="contained"
              color="primary"
              
              startIcon={
                <img
                  src="https://cdn0.iconfinder.com/data/icons/zondicons/20/user-solid-circle-64.png"
                  alt="Referral Ask Icon"
                  style={{ width: "20px", marginRight: "8px" }}
                />
              }
            >
              Ask for Referral 
            </Button>
          </Typography>
        </CardContent>
      </Card>
      <Dialog open={openModal} onClose={toggleModal}>
        <DialogContent>
          <Typography
            variant="h6"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            Job Description
          </Typography>
          <Typography style={{ fontWeight: "bold" }}>About Company:</Typography>
          <Typography>{jobDetailsFromCompany}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobCard;

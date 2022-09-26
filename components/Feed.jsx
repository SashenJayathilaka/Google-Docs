/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import DocumentRow from "../components/DocumentRow";
import db, { auth } from "../firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Feed = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [messages, setMessages] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    () =>
      db
        .collection("userDocs")
        .doc(user?.email)
        .collection("docs")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => setMessages(snapshot.docs)),
    [db]
  );

  const createDocument = async () => {
    if (!input) return;
    setCreateLoading(true);

    try {
      db.collection("userDocs").doc(user?.email).collection("docs").add({
        fileName: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }

    setCreateLoading(false);
    setInput("");
    handleClose();
  };

  const model = (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="rounded-lg">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of Document"
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
        {createLoading ? (
          <div className="flex justify-center">
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block w-44 mt-10 px-6 py-2.5 animate-bounce bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-200 active:shadow-lg transition duration-150 ease-in-out"
            >
              Loading...
            </button>
          </div>
        ) : (
          <div className="flex justify-between gap-4">
            <button
              onClick={handleClose}
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block w-44 mt-10 px-6 py-2.5 bg-transparent text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-transparent hover:shadow-lg focus:bg-red-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out"
            >
              Cancel
            </button>
            <button
              onClick={createDocument}
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block w-44 mt-10 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-200 active:shadow-lg transition duration-150 ease-in-out"
            >
              Create
            </button>
          </div>
        )}
      </Box>
    </Modal>
  );

  return (
    <>
      {model}
      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new Document</h2>
            <IconButton className="border-0">
              <MoreVertIcon className="text-gray-500 text-3xl" />
            </IconButton>
          </div>
          <div>
            <div
              onClick={handleOpen}
              className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
            >
              <Image
                src="https://i.postimg.cc/C5dX9G8r/docs-blank-googlecolors.png"
                layout="fill"
              />
            </div>

            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Document</h2>
            <p className="mr-12">Date Created</p>
            <FolderIcon className="text-3xl text-gray-500" />
          </div>

          {messages.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Feed;

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import db, { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { convertFromRaw, convertToRaw } from "draft-js";
import { useEffect } from "react";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

/* import { Editor } from "react-draft-wysiwyg"; */
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

function TextEditor() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { id } = router.query;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  /* const [snapshot, setSnapShot] = useState([]) */

  /*   useEffect(
    () =>
      db
        .collection("userDocs")
        .doc(user?.email)
        .collection("docs")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          snapshot.docs.map((doc) => {
            if (doc.id === id) {
              setSnapShot(doc.data());
            }
          })
        ),
    []
  ); */

  const [snapshot] = useDocumentOnce(
    db.collection("userDocs").doc(user?.email).collection("docs").doc(id)
  );

  useEffect(() => {
    if (snapshot?.editorState) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(snapshot?.editorState))
      );
    }
  }, [snapshot]);

  const onEditorStateChange = async (editorState) => {
    setEditorState(editorState);

    try {
      db.collection("userDocs")
        .doc(user?.email)
        .collection("docs")
        .doc(id)
        .set(
          {
            editorState: convertToRaw(editorState.getCurrentContent()),
          },
          {
            merge: true,
          }
        );
    } catch (error) {
      console.log(error);
    }
  };
  /* 
  console.log(editorState); */

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border"
      />
    </div>
  );
}

export default TextEditor;

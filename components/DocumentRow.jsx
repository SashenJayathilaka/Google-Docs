import React from "react";
import { useRouter } from "next/router";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const DocumentRow = ({ id, fileName, date }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex items-center p-4 rounded-lg hover:bg-gray-100 cursor-pointer
    text-gray-700 text-sm "
    >
      <TextSnippetIcon className="text-3xl text-blue-500" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm">{date?.toDate().toDateString()}</p>
      <IconButton className="border-0">
        <MoreVertIcon className="text-3xl text-gray-500" />
      </IconButton>
    </div>
  );
};

export default DocumentRow;

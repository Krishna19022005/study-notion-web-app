import React from 'react'

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#0EA5E9] bg-clip-text text-transparent font-bold">
      {text}
    </span>
  );
};

export default HighlightText;
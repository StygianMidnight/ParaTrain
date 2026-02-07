import { useState } from "react";

function TopicCard({ title , description}){
  return (
    <div className="bg-black border rounded-md p-6 border-blue-500 text-white">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )


}
function Arms(){
  const topics = ["React", "JSX", "Tailwind"];
  const description = {"React": "Used for Web based applications", "JSX": "Syntax extension for JavaScript", "Tailwind": "Utility-first CSS framework"};
  return (
    <div>
      {topics.map((t) => (
        <TopicCard key={t} title={t} description={description[t]}/>
      ))}
    </div>
  );
}
export default Arms;
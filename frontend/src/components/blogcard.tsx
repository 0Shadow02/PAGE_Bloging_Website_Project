import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorname: string;
  title: string;
  content: string;
  publishedDate: string;
}
export const BlogCard = ({
  id,
  authorname,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200 p-4 pb-4 w-screen max-w-screen-md ">
        <div className="flex">
          <Avatar name={authorname} size={"small"}></Avatar>
          <div className=" font-extralight pl-2 text-sm justify-center flex flex-col">
            {authorname}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle></Circle>
          </div>
          <div className=" pl-2 font-thin text-slate-500 text-sm justify-center flex  flex-col">
            {publishedDate}
          </div>
        </div>
        <div className=" text-xl font-bold pt-2">{title}</div>
        <div
          className=" text-md font-thin"
          dangerouslySetInnerHTML={{
            __html:
              content.length > 100 ? content.slice(0, 100) + "..." : content,
          }}
        ></div>
        <div className=" text-slate-500 text-sm font-thin pt-4">
          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};

function Circle() {
  return <div className=" h-1 w-1 rounded-full bg-slate-500"></div>;
}
export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big" | "large";
}) {
  return (
    <div>
      <div
        className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
          size === "small"
            ? "w-6 h-6"
            : size === "big"
            ? "w-10 h-10"
            : size === "large"
            ? "w-28 h-28"
            : "w-10 h-10"
        }`}
      >
        <span
          className={`${
            size === "small"
              ? "text-xs"
              : size === "big"
              ? "text-md"
              : size === "large"
              ? "text-5xl "
              : "text-md"
          } font-medium text-gray-300`}
        >
          {name.split("")[0]}
        </span>
      </div>
    </div>
  );
}

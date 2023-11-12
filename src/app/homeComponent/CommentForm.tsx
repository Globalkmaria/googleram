import { MdInsertEmoticon } from "react-icons/md";

export default function CommentForm() {
  return (
    <form className="flex border-t border-gray-200 p-2 justify-between ">
      <button type="button">
        <MdInsertEmoticon
          className=" text-3xl 
        rounded-full hover:bg-slate-200 p-1"
        />
      </button>
      <input
        type="text"
        className="w-full mx-3 p-2 rounded-sm outline-none"
        placeholder="Add a commnet..."
      />
      <button
        type="button"
        className=" font-semibold text-blue-500 rounded p-2 hover:bg-blue-100"
      >
        Post
      </button>
    </form>
  );
}

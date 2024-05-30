import { MdError } from "react-icons/md";

// eslint-disable-next-line react/prop-types
function Error({ message = "Error" }) {
  return (
    <div
      className="relative m-auto flex w-full items-center justify-center gap-2 rounded px-4 py-3 text-red-700 backdrop-blur-md dark:bg-slate-800"
      role="alert"
    >
      <strong className="font-bold">
        <MdError />
      </strong>
      <span className="block sm:inline"> {message}</span>
    </div>
  );
}

export default Error;

import { MdError } from "react-icons/md";

// eslint-disable-next-line react/prop-types
function Error({ message = "Error" }) {
  return (
    <div
      className="relative flex items-center justify-center gap-2 px-4 py-3 m-auto text-red-700 rounded max-w-44"
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

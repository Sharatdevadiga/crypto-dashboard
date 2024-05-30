// eslint-disable-next-line react/prop-types
function Loader({ type = "" }) {
  return (
    <div
      className={`flex items-center justify-center ${type === "fullScreen" && "h-screen w-screen flex-col gap-4"}`}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      {type === "fullScreen" && <p>Loading Please Wait...</p>}
    </div>
  );
}

export default Loader;

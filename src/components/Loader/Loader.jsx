import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
    >
      <ThreeDots color="#00BFFF" height={80} width={80} />
    </div>
  );
}

export default Loader;

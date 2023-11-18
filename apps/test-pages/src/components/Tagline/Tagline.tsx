import { BsPlus } from "react-icons/bs";

const designation = [{ position: "Product" }, { position: "Sales" }];

function Tagline() {
  return (
    <div>
      <div className="flex items-center justify-start gap-3 w-1/4">
        {designation.map((post, index) => {
          return (
            <span
              key={index}
              className="border px-4 py-1 rounded-full text-slate-800 text-sm"
            >
              {post.position}
            </span>
          );
        })}
        <span className="border px-1 py-1 rounded-full text-slate-900 inline-flex items-center justify-center">
          <BsPlus className="text-xl text-gray-700" />
        </span>
      </div>
    </div>
  );
}

export default Tagline;

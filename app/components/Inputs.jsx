"use client";
const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  options = [],
}) => {
  if (type === "dropdown") {
    return (
      <div className="my-2 w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor={id}
            className=" text-xl text-white sm:flex-shrink-0 sm:w-1/3 text-right sm:pr-4"
          >
            {label}
          </label>
          <select
            id={id}
            value={value}
            onChange={onChange}
            className="bg-gray-200 text-black w-full sm:w-2/3 px-4 py-2 rounded-lg focus:outline-none mt-2 sm:mt-0 mr-2"
          >
            {options.length > 0 ? (
              options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))
            ) : (
              <option value="">No options available</option>
            )}
          </select>
        </div>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="my-2 w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor={id}
            className=" text-xl text-white sm:flex-shrink-0 sm:w-1/3 text-right sm:pr-4"
          >
            {label}
          </label>
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            className="bg-gray-200 text-black w-full sm:w-2/3 px-4 py-2 rounded-lg focus:outline-none mt-2 sm:mt-0 mr-2"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="my-2 w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <label
          htmlFor={id}
          className=" text-xl text-white sm:flex-shrink-0 sm:w-1/3 text-right sm:pr-4"
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="bg-gray-200 text-black w-full sm:w-2/3 px-4 py-2 rounded-lg focus:outline-none mt-2 sm:mt-0 mr-2"
        />
      </div>
    </div>
  );
};

export default InputField;

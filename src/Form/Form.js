import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(data.example);
  };
  return (
    <div>
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="" {...register("example")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        {/* 
        <input {...register("picture")} type="file" />
        {errors.picture && <span>This field is required</span>} */}

        <input type="submit" />
      </form>
      <img src={image} alt="" />
    </div>
  );
};

export default Form;

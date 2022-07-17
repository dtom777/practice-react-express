import { FC, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Post, TypeEnum } from "../types/Post.type";
import axios from "axios";
import Label from "./Label";

type Inputs = Omit<Post, "_id">;

type Props = {
  type: TypeEnum;
};

const Form: FC<Props> = ({ type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [post, setPost] = useState<Post | null>(null);
  const id = searchParams.get("id");

  const navigate = useNavigate();

  useEffect(() => {
    if (type !== TypeEnum.update) return;
    (async () => {
      const { data } = await axios.get(`http://localhost:8000/api/posts/${id}`);
      console.log(data);
      setPost(data);
    })();
  }, []);

  const LIST = [
    { label: "電気代", title: "electricity" },
    { label: "ガス代", title: "gas" },
    { label: "水道代", title: "water" },
    { label: "インターネット代", title: "internet" },
  ];

  const { register, handleSubmit } = useForm<Inputs>();

  const sanitizeData = (data: Inputs): Inputs => {
    const { month, electricity, gas, water, internet } = data;
    return {
      month: Number(month),
      electricity: Number(electricity),
      gas: Number(gas),
      water: Number(water),
      internet: Number(internet),
    };
  };

  const createPost: SubmitHandler<Inputs> = async (data) => {
    console.log("create");
    const sanitizedData = sanitizeData(data);
    const res = await axios.post(
      "http://localhost:8000/api/posts",
      sanitizedData
    );
    navigate("/");
  };

  const updatePost: SubmitHandler<Inputs> = async (data) => {
    console.log("update");
    const sanitizedData = sanitizeData(data);
    const res = await axios.put(
      `http://localhost:8000/api/posts/${id}`,
      sanitizedData
    );
    navigate("/");
  };

  const deletePost = async (): Promise<void> => {
    const res = await axios.delete(`http://localhost:8000/api/posts/${id}`);
    navigate("/");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(type === "create" ? createPost : updatePost)}
        className="bg-white px-6"
      >
        <div className="grid grid-cols-2">
          <div className="mb-4">
            <Label htmlFor="month" className="mb-2">
              月
            </Label>
            <input
              {...register("month", { min: 1, max: 12, required: true })}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
              type="number"
              defaultValue={type === TypeEnum.update ? post?.month : 1}
            />
            <span>月</span>
          </div>
          {LIST.map((item) => (
            <div className="mb-4" key={item.title}>
              <Label htmlFor={item.label} className="mb-2">
                {item.label}
              </Label>
              <input
                {...register(item.title, { required: true })}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                type="number"
                defaultValue={type === TypeEnum.update ? post?.[item.title] : 0}
              />
              <span>円</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <input
            className={`justify-center items-center hover:opacity-50 text-white focus:outline-none focus:shadow-outline bg-green-500 font-bold py-2 px-4 rounded`}
            type="submit"
            value="保存する"
          />
          {type === TypeEnum.update && (
            <button
              className={`justify-center items-center hover:opacity-50 text-white focus:outline-none focus:shadow-outline bg-red-500 font-bold ml-2 py-2 px-4 rounded`}
              onClick={deletePost}
            >
              削除する
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Form;

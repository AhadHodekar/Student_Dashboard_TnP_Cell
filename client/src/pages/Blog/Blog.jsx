import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Blog() {
  const { role } = useAuth();
  const postOne = {
    id: 2,
    post_image: "http://dummyimage.com/137x100.png/ff4444/ffffff",
    post_url:
      "https://umich.edu/aliquam/lacus/morbi/quis.png?lorem=nonummy&ipsum=maecenas&dolor=tincidunt&sit=lacus&amet=at&consectetuer=velit&adipiscing=vivamus&elit=vel&proin=nulla&interdum=eget&mauris=eros&non=elementum&ligula=pellentesque&pellentesque=quisque&ultrices=porta&phasellus=volutpat&id=erat&sapien=quisque&in=erat&sapien=eros&iaculis=viverra&congue=eget&vivamus=congue&metus=eget&arcu=semper&adipiscing=rutrum&molestie=nulla&hendrerit=nunc&at=purus&vulputate=phasellus&vitae=in&nisl=felis&aenean=donec&lectus=semper&pellentesque=sapien&eget=a&nunc=libero&donec=nam",
    post_description:
      "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    post_title:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    post_creation: "27/10/2023",
  };

  const accessToken = localStorage.getItem("accessToken");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3939/api/blog/posts",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPosts(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  return (
    <div className="w-full h-full flex items-start justify-center overflow-y-scroll overflow-x-hidden">
      {/* <p>{posts ? "check console" : "nod data found"}</p> */}
      <div className="w-[900px] h-full bg-violet-400 text-center text-black">
        <h1>Blog</h1>
        <div className="flex flex-col items-center bg-gray-400">
          {/* <img src={postOne.post_image} width={200} height={200} /> */}
          <h1>{postOne.post_title}</h1>
          <p>{postOne.post_description}</p>
          {role === "admin" ? <p>⫶</p> : null}
        </div>
        {/* {posts.map((post) => (
            <div key={post.id}>
              <img src={post.post_image} alt="" />
              <p>{post.post_title}</p>
              <p>{post.post_url}</p>
              <p>{post.post_title}</p>
            </div>
          ))} */}
      </div>
      {role === "admin" ? (
        <div
          className="btn  bg-gray-800 absolute top-100 opacity-50 right-10 m-4 text-white z-10"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          ➕
        </div>
      ) : null}
      <dialog id="my_modal_3" className="modal ">
        <div className="modal-box w-[800px] h-[400px]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form className="w-full">
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <h3 className="font-bold text-lg">Create a post</h3>
              <input
                type="text"
                name=""
                id=""
                placeholder="Title"
                className="w-[400px]"
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="Url"
                className="w-[400px]"
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="Image"
                className="w-[400px] "
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="Description"
                className="w-[400px] h-[200px] text-start justify-start items-start flex"
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Blog;

import ButtonDeletePost from "./ButtonDeletePost";

const CardPostAdmin = ({ post }) => {
  return (
    <li className="bg-base-100 shadow-lg rounded-3xl p-6 flex justify-between items-center">
      <div>
        <h2 className="card-title">{post.title}</h2>
        <p className="opacity-80 leading-relaxed max-h-32 overflow-scroll">
          {post.description}
        </p>
      </div>
      <ButtonDeletePost postId={post._id.toString()} />
    </li>
  );
};

export default CardPostAdmin;

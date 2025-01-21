const CardPost = ({ post }) => {
  return (
    <li className="bg-base-100 shadow-lg rounded-3xl p-6 flex justify-between items-center">
      <div>
        <h2 className="card-title">{post.title}</h2>
        <p className="opacity-80 leading-relaxed max-h-32 overflow-scroll">
          {post.description}
        </p>
      </div>
      <button className="btn btn-sm btn-square">✅</button>
    </li>
  );
};

export default CardPost;

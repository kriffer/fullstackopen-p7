const NewBlogForm = ({
  handleSubmit,
  handleTitleChange,
  title,
  handleAuthorChange,
  author,
  handleUrlChange,
  url,
}) => {
  return (
    <div>
      <h4>Create new</h4>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
           
            <input
              type="text"
              value={title}
              name="title"
              onChange={handleTitleChange}
              placeholder="title"
            />
          </div>
          <div>
           
            <input
              type="text"
              value={author}
              name="author"
              onChange={handleAuthorChange}
              placeholder="author"
            />
          </div>
          <div>
            
            <input
              type="text"
              value={url}
              name="url"
              onChange={handleUrlChange}
              placeholder="url"
            />
          </div>
          <button type="submit" className=" btn-small waves-effect waves-light" id="create-blog-button">
            create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBlogForm;

const createPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#postTitle").value.trim();
  const comment = document.querySelector("#postComment").value.trim();

  if (title && comment) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ post_title: title, post_comment: comment }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create post");
    }
  }
};

document.getElementById("postBtn").addEventListener("click", createPostHandler);

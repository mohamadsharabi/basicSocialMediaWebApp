function showToast(message) {
  document.querySelector(".toast-body").textContent = message;
  const toastEl = document.getElementById('liveToast');
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}


// Example usage for post creation
// function createPost() {
//   // Your post creation logic
//   showToast("Post created successfully!");
// }

// Add the same for other actions like delete, login, logout, etc.







function handlePostClicking(id) {
  // click 
  // store post id in localStorage 
  // redirect postDetails.html
  // use the id in localStorage to get comments
  // remove the id from local storage
  //
  let postId = localStorage.setItem('postId', id);
  window.location.href = './postDetails.html'
}

function toProfile(){
  window.location.href = './profile.html'
}

function handleUI() {
  let user = JSON.parse(localStorage.getItem('user'))
  let token = localStorage.getItem('token')
  if (token == null) {
    window.location.href = './home.html'
  }else{
    let profilePicture = document.getElementById('profile-picture')
    profilePicture.src = Object.keys(user.profile_image).length !== 0 ? `${user.profile_image}`: './avatar.jpg'
  }
}

function usernameClicked(id) {
  window.location = `./profile.html?userid=${id}`
}





function deletePost(postId) {
  let confirmDelete = confirm("Are you sure you want to delete this post?");
  
  if (confirmDelete) {
    let token = localStorage.getItem('token');
    
    axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      window.location.reload();
      const alertPlaceholder = document.getElementById('alert-placeholder');
      appendAlert('Post deleted successfully!', 'success');
      console.log(response.data.data);

    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
      }
      
    });
  } else {
    console.log("Delete operation canceled.");
  }
}

function logout() {
  // clear the token from local storage
  localStorage.clear() 
  // redirect to home page
  window.location.href = './home.html'

}


function editPost(id, title, body) {
  // Decoding the URL-encoded title and body to handle special characters (like spaces, quotes, or special symbols)
  const encodedTitle = encodeURIComponent(title);
  const encodedBody = encodeURIComponent(body);
  window.location = `./editpost.html?postid=${id}&posttitle=${encodedTitle}&postbody=${encodedBody}`;
}






// Function to append alert
const appendAlert = (message, type) => {
  const alertPlaceholder = document.getElementById('alert-placeholder'); // Define it inside the function
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <div>${message}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  alertPlaceholder.append(wrapper);
};


// loader 
function toggleLoader(show = true) {
  let loader = document.getElementById('loader');
  if (show) {
    loader.style.display = 'block';
  } else {
    loader.style.display = 'none'
  }
}
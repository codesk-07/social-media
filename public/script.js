
const imageUrl = document.getElementById('imageUrl');
const description = document.getElementById('description');
const postBtn = document.getElementById('postBtn');


const postsContainer = document.getElementById('postsContainer');

// Create Post
postBtn.addEventListener('click', async () => {

    const postData = {
        imageUrl: imageUrl.value,
        description: description.value
    };

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        alert('Post created successfully!');

        imageUrl.value = '';
        description.value = '';

    } catch (error) {
        console.log(error);
        alert(error.message);
    }
});



// Fetch and display all posts
async function getPosts() {
    try {
        const response = await fetch('/api/posts');
        const data = await response.json();

        postsContainer.innerHTML = '';

        data.posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';

            const img = document.createElement('img');
            img.src = post.imageUrl;
            img.alt = 'Post image';

            const desc = document.createElement('p');
            desc.textContent = post.description;

            postDiv.appendChild(img);
            postDiv.appendChild(desc);
            


            // Like button
const likeBtn = document.createElement('button');
likeBtn.textContent = `❤️ Like (${post.likes})`;

likeBtn.addEventListener('click', async () => {
    try {
        const response = await fetch(`/api/posts/${post.id}/like`, {
            method: 'POST'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        likeBtn.textContent = `❤️ Like (${data.likes})`;

    } catch (error) {
        console.log(error);
        alert(error.message);
    }
});

postDiv.appendChild(likeBtn);

            postsContainer.appendChild(postDiv);
        });

    } catch (error) {
        console.log('Error fetching posts:', error);
    }
}

// Load posts when page opens
getPosts();

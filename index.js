// Get references to the video results div and the input box
let div = document.getElementById("videosResults");
let input = document.getElementById("inputBox");

// Add an event listener for the 'Enter' key on the input box
input.addEventListener("keyup", function (event) {
    // Check if the 'Enter' key was pressed
    if (event.keyCode === 13) {
        event.preventDefault(); // Prevent the default form submission or any default behavior

        // Trigger a click event on the search button and call the search function
        document.getElementById("searchbtn").click(); 
        search();
    }
});

// Function to embed and play the selected video
let playVideo = (id) => {
    let videoDiv = document.getElementById("videosResults");

    // Replace the contents of the video results div with the selected video iframe
    videoDiv.innerHTML = `<iframe
      width="1300"
      height="555"
      src="https://www.youtube.com/embed/${id}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>`;
};

// Function to search YouTube videos based on user input
async function search() {
    let inp = document.getElementById("inputBox").value; // Get the search query
    let div = document.getElementById("videosResults"); // Get the video results div

    let API = "AIzaSyA266SPutTfCO63sLArqnx8Xi-UR51PSus"; // API key

    div.innerHTML = ""; // Clear the previous search results
    let res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?q=${inp}&part=snippet&maxResults=25&key=${API}`
    ); // Fetch search results from YouTube API
    let data = await res.json(); // Parse the response as JSON
    console.log(data); // Log the data for debugging

    // Loop through each video item in the results
    for (let {
        id: { videoId }, // Destructure to get the videoId
        snippet: { title, channelTitle, thumbnails }, // Destructure snippet properties
    } of data.items) {
        let channelThumbnail = thumbnails.default.url; // Get the channel thumbnail
        let mainDiv = document.createElement("div"); // Create a new div for the video
        mainDiv.id = "hoverDiv"; // Set the div's ID
        mainDiv.onclick = () => playVideo(videoId); // Set the onclick event to play the video

        let channelThumbnailImg = document.createElement("img"); // Create an img element for the channel icon
        channelThumbnailImg.src = channelThumbnail; // Set the src attribute
        channelThumbnailImg.className = "channel-icon"; // Set the class name

        let video_frame = document.createElement("iframe"); // Create an iframe for the video preview

        let flex = document.createElement("div"); // Create a div for flex layout
        flex.id = "flex"; // Set the ID for styling
        let t = document.createElement("p"); // Create a p element for the video title
        t.style = "color:black"; // Set the text color
        t.className = "title"; // Set the class name for styling
        video_frame.src = `https://www.youtube.com/embed/${videoId}`; // Set the iframe src to the video URL
        video_frame.allow = `fullscreen`; // Allow fullscreen mode
        t.innerHTML = title; // Set the title text

        let channelTittle = document.createElement("p"); // Create a p element for the channel title

        channelTittle.id = "channel-name"; // Set the ID for styling
        channelTittle.innerHTML = `${channelTitle} <span id=span>✅</span> `; // Set the channel title with a verified checkmark

        // Append elements to create the video card layout
        flex.append(channelThumbnailImg, channelTittle);
        mainDiv.append(video_frame, flex, t);
        div.append(mainDiv); // Append the video card to the results div
    }
}

// Function to display trending videos
async function trending() {
    let inp = document.getElementById("inputBox").value; // Get the input value (not used here)
    let div = document.getElementById("videosResults"); // Get the video results div
    div.innerHTML = ""; // Clear the previous results

    let API = "AIzaSyA266SPutTfCO63sLArqnx8Xi-UR51PSus"; // API key

    let res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&maxResults=24&chart=mostPopular&regionCode=PH&key=${API}`
    ); // Fetch trending videos from YouTube API
    let data = await res.json(); // Parse the response as JSON
    console.log(data); // Log the data for debugging

    // Loop through each trending video item
    for (let {
        id, // Get the video ID
        snippet: { title, channelTitle, thumbnails }, // Destructure snippet properties
    } of data.items) {
        let channelThumbnail = thumbnails.medium.url; // Get the thumbnail URL

        let channelThumbnailImg = document.createElement("img"); // Create an img element for the channel icon
        channelThumbnailImg.src = channelThumbnail; // Set the src attribute
        channelThumbnailImg.className = "channel-icon"; // Set the class name

        let video_frame = document.createElement("img"); // Create an img element for the video thumbnail
        video_frame.style.width = "100%"; // Set the width to 100%

        let mainDivs = document.createElement("div"); // Create a new div for the video
        mainDivs.id = "hoverDiv"; // Set the div's ID
        mainDivs.onclick = () => playVideo(id); // Set the onclick event to play the video

        let flex = document.createElement("div"); // Create a div for flex layout
        flex.id = "flex"; // Set the ID for styling
        let t = document.createElement("p"); // Create a p element for the video title
        t.style = "color:black"; // Set the text color
        t.className = "title"; // Set the class name for styling
        video_frame.src = channelThumbnail; // Set the img src to the thumbnail URL

        t.innerHTML = title; // Set the title text

        let channelTittle = document.createElement("p"); // Create a p element for the channel title

        channelTittle.id = "channel-name"; // Set the ID for styling
        channelTittle.innerHTML = `${channelTitle} <span id=span>✅</span> `; // Set the channel title with a verified checkmark

        // Append elements to create the video card layout
        flex.append(channelThumbnailImg, channelTittle);
        mainDivs.append(video_frame, flex, t);
        div.append(mainDivs); // Append the video card to the results div
    }
}

// Call trending() function on page load to display trending videos
trending();

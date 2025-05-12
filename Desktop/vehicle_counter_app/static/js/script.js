// Function to update file name when a file is selected
function updateFileName(input) {
    const fileNameSpan = document.getElementById('file-name');
    if (input.files && input.files.length > 0) {
        fileNameSpan.textContent = input.files[0].name;
        fileNameSpan.style.color = '#2c3e50';
    } else {
        fileNameSpan.textContent = 'No file selected';
        fileNameSpan.style.color = '#7f8c8d'; 
    }
}

function updateCounts() {
    fetch('/counts')
        .then(res => res.json())
        .then(data => {
            let html = '';
            for (const [type, val] of Object.entries(data)) {
                html += `
                    <div class="vehicle-count-item">
                        <h3>${type.toUpperCase()}</h3>
                        <div class="count-details">
                            <div class="count-in">
                                <span class="count-label">Inbound:</span>
                                <span class="count-value">${val.in}</span>
                            </div>
                            <div class="count-out">
                                <span class="count-label">Outbound:</span>
                                <span class="count-value">${val.out}</span>
                            </div>
                        </div>
                    </div>
                `;
            }
            document.getElementById('vehicleCounts').innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching counts:', error);
            document.getElementById('vehicleCounts').innerHTML = 
                '<p class="error-text">Unable to load vehicle counts</p>';
        });
}

function checkVideoReady() {
    fetch('/video', { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                document.getElementById('video-container').innerHTML = `
                    <video controls autoplay loop>
                        <source src="/video" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>`;
            } else {
                setTimeout(checkVideoReady, 2000);
            }
        })
        .catch(error => {
            console.error('Error checking video:', error);
            document.getElementById('video-container').innerHTML = 
                '<p class="error-text">Error loading video</p>';
        });
}

// Initial calls
document.addEventListener('DOMContentLoaded', () => {
    updateCounts();
    checkVideoReady();

    // Periodic updates
    setInterval(updateCounts, 2000);
});
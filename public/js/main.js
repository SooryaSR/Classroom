let btn = document.querySelector('button');

let mediaRecorder;
let chunks = [];

btn.addEventListener('click', async function() {
    try {
        let stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

        const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") ?
            "video/webm; codecs=vp9" :
            "video/webm";
        
        mediaRecorder = new MediaRecorder(stream, { mimeType: mime });

        mediaRecorder.addEventListener('dataavailable', function(e) {
            chunks.push(e.data);
        });

        mediaRecorder.addEventListener('stop', function() {
            let blob = new Blob(chunks, { type: chunks[0].type });

            let video = document.querySelector("video");
            video.src = URL.createObjectURL(blob);

            let a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'video.webm';
            a.click();
        });

        mediaRecorder.start();
    } catch (error) {
        console.error('Error accessing screen recording:', error);
    }
});

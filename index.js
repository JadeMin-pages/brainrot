import { VideoController } from "./VideoController.js";

const video = document.querySelector("video");
/** @type {HTMLInputElement | null} */
const upload = document.querySelector("input[type=file]");
if (video === null) throw new Error("'video' element not found.");
if (upload === null) throw new Error("'input[type=file]' element is not found.");
/** @type {HTMLSourceElement | null} */
const videoSrc = video.querySelector("source");
if (
	videoSrc !== null &&
	!(videoSrc instanceof HTMLSourceElement)
) throw new Error("'source' element is not found.");



const controller = new VideoController(video);

video.addEventListener('mouseenter', () => {
	controller.reverse = false; 
	controller.play();
});
video.addEventListener('mouseleave', () => {
	controller.reverse = true; 
	controller.play();
});

upload.addEventListener('change', async () => {
	const file = upload.files[0];
	if (file === undefined) return;

	videoSrc.src = URL.createObjectURL(file);
	video.load();
});
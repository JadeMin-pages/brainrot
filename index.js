import { VideoController } from "./VideoController.js";

/** @type {HTMLVideoElement | null} */
const video = document.querySelector("video");
if (video === null) throw new Error("'video' element not found.");

/** @type {HTMLInputElement | null} */
const upload = document.querySelector("input[type=file]");
if (upload === null) throw new Error("'input[type=file]' element is not found.");

/** @type {HTMLSourceElement | null} */
const videoSrc = video.querySelector("source");
if (
	videoSrc === null ||
	!(videoSrc instanceof HTMLSourceElement)
) throw new Error("'source' element is not found.");



const controller = new VideoController(video);

["mouseenter", "touchstart"].forEach(eventName => {
	video.addEventListener(eventName, e => {
		e.preventDefault();
		
		controller.reverse = false; 
		controller.play();
	});
});
["mouseleave", "touchend"].forEach(eventName => {
	video.addEventListener(eventName, e => {
		e.preventDefault();

		controller.reverse = true; 
		controller.play();
	});
});

upload.addEventListener('change', async () => {
	const file = upload.files[0];
	if (file === undefined) return;

	videoSrc.src = URL.createObjectURL(file);
	video.load();
});
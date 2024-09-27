export class VideoController {
	/**
	 * @param {HTMLVideoElement} video
	 */
	constructor(video) {
		/** @type {HTMLVideoElement} */
		this.video = video;

		/** @type {boolean} */
		this.reverse = false;

		/** @type {number | null} */
		this.reverseInterval = null;
	}


	isReady() {
		return this.video.readyState === 3;
	}

	reverseReset() {
		this.video.pause();

		if (this.reverseInterval !== null) {
			clearInterval(this.reverseInterval);
			this.reverseInterval = null;
		}
	}

	play() {
		this.reverseReset();

		if (this.reverse) {
			const reverseFrame = () => {
				if (this.video.currentTime <= 0) this.reverseReset();
				else this.video.currentTime -= 0.03;
			};
			this.reverseInterval = setInterval(() => reverseFrame(), 30);
			reverseFrame();
		} else {
			this.video.play();
		}
	}
	/*pause() {
		if (!this.hasSource()) return;

		this.reverseReset();

		this.video.pause();
	}*/
}
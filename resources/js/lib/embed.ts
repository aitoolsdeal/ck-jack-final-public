export const soundCloudUrl = (url: string) => {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}`;
};

export const youTubeUrl = (url: string) => {
    const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/,
    );
    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
    }
    throw new Error('Invalid YouTube URL');
};

export const spotifyUrl = (url: string) => {
    const match = url.match(
        /(?:https?:\/\/)?(?:open\.)?spotify\.com\/(?:track|album|playlist|artist)\/([\w-]+)/,
    );
    if (match && match[1]) {
        return `https://open.spotify.com/embed/${match[0].split('spotify.com/')[1]}`;
    }
    throw new Error('Invalid Spotify URL');
};

export const vimeoUrl = (url: string) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/);
    if (match && match[1]) {
        return `https://player.vimeo.com/video/${match[1]}`;
    }
    throw new Error('Invalid Vimeo URL');
};

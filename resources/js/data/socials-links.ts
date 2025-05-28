export interface socialType {
    name: string;
    link: string | null;
    icon: string;
    placeholder: string; // added this
}

export const socialsLinks: socialType[] = [
    {
        name: 'email',
        link: null,
        icon: 'Email',
        placeholder: 'example@gmail.com',
    },
    {
        name: 'telephone',
        link: null,
        icon: 'Telephone',
        placeholder: '+00000000000',
    },
    {
        name: 'telegram',
        link: null,
        icon: 'Telegram',
        placeholder: 'https://t.me/username',
    },
    {
        name: 'whatsapp',
        link: null,
        icon: 'Whatsapp',
        placeholder: '+00000000000',
    },
    {
        name: 'facebook',
        link: null,
        icon: 'Facebook',
        placeholder: 'https://facebook.com/username',
    },
    {
        name: 'messenger',
        link: null,
        icon: 'Messenger',
        placeholder: 'https://m.me/',
    },
    {
        name: 'instagram',
        link: null,
        icon: 'Instagram',
        placeholder: 'https://instagram.com/username',
    },
    {
        name: 'twitter',
        link: null,
        icon: 'Twitter',
        placeholder: 'https://twitter.com/username',
    },
    {
        name: 'tiktok',
        link: null,
        icon: 'TikTok',
        placeholder: 'https://tiktok.com/@username',
    },
    {
        name: 'youtube',
        link: null,
        icon: 'YouTube',
        placeholder: 'https://youtube.com/channel/channelid',
    },
    {
        name: 'soundcloud',
        link: null,
        icon: 'SoundCloud',
        placeholder: 'https://soundcloud.com/username',
    },
    {
        name: 'linkedin',
        link: null,
        icon: 'Linkedin',
        placeholder: 'https://linkedin.com/in/username',
    },
    {
        name: 'spotify',
        link: null,
        icon: 'Spotify',
        placeholder: 'https://open.spotify.com/artist/username',
    },
    {
        name: 'pinterest',
        link: null,
        icon: 'Pinterest',
        placeholder: 'https://pinterest.com/username',
    },
    {
        name: 'snapchat',
        link: null,
        icon: 'SnapChat',
        placeholder: 'https://snapchat.com/add/username',
    },
    {
        name: 'discord',
        link: null,
        icon: 'Discord',
        placeholder: 'https://discord.gg/invitecode',
    },
];

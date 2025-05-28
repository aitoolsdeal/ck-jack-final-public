import { SVGProps } from 'react';
import Discord from './Discord';
import Dribbble from './Dribbble';
import Email from './Email2';
import Facebook from './Facebook';
import Github from './Github';
import Google from './Google';
import Heading from './Heading';
import Image from './Image';
import Instagram from './Instagram';
import Link from './Link';
import Linkedin from './Linkedin';
import Messenger from './Messenger';
import Paragraph from './Paragraph';
import Pinterest from './Pinterest';
import SnapChat from './Snapchat';
import SoundCloud from './SoundCloud';
import Spotify from './Spotify';
import Telegram from './Telegram';
import Telephone from './Telephone';
import TikTok from './TikTok';
import Twitter from './Twitter';
import Vimeo from './Vimeo';
import Whatsapp from './Whatsapp2';
import YouTube from './YouTube';

interface IconMap {
    [key: string]: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

const icons: IconMap = {
    Link,
    Discord,
    Dribbble,
    Email,
    Facebook,
    Github,
    Google,
    Instagram,
    Linkedin,
    Image,
    Messenger,
    Pinterest,
    SnapChat,
    SoundCloud,
    Spotify,
    Telephone,
    Telegram,
    TikTok,
    Twitter,
    Vimeo,
    Whatsapp,
    YouTube,
    Heading,
    Paragraph,
};

export default icons;

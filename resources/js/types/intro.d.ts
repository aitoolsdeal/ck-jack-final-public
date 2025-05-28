interface TableCommon {
    id: number | string;
    created_at: string;
    updated_at: string;
}

interface IntroSection extends TableCommon {
    name: string;
    slug: string;
    title: string;
    description: string | null;
    thumbnail: string | null;
    section_list: string;
}

interface IntroSectionList extends TableCommon {
    url: string | null;
    icon: string | null;
    content: string;
}

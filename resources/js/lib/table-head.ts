export const bioLinksHead = [
    {
        Header: 'Link Name',
        accessor: 'link_name',
        id: 'name',
    },
    {
        Header: 'Customize Link',
        id: 'customize',
    },
    {
        Header: 'Views Link',
        id: 'visit',
    },
    {
        Header: 'Total Views',
        accessor: 'visited',
        id: 'view',
    },
    {
        Header: 'QR Code',
        id: 'qrcode',
    },
    {
        Header: 'Copy Link',
        id: 'copy',
    },
    {
        Header: 'Action',
        id: 'action',
    },
];

export const shortLinksHead = [
    {
        Header: 'Link URL',
        accessor: 'link_url',
        id: 'url',
    },
    {
        Header: 'Link Name',
        accessor: 'link_name',
        id: 'name',
    },
    {
        Header: 'Total Views',
        accessor: 'visited',
        id: 'view',
    },
    {
        Header: 'QR Code',
        id: 'qrcode',
    },
    {
        Header: 'Copy Link',
        id: 'copy',
    },
    {
        Header: 'Action',
        id: 'action',
    },
];

export const qrCodesHead = [
    {
        Header: 'QR Code',
        id: 'qrcode',
    },
    {
        Header: 'Project Name',
        id: 'project',
    },
    {
        Header: 'Link Name',
        id: 'link',
    },
    {
        Header: 'Created Date',
        accessor: 'created_at',
        id: 'created',
    },
    {
        Header: 'Action',
        id: 'action',
    },
];

export const projectsHead = [
    {
        Header: 'Project Name',
        accessor: 'project_name',
        id: 'name',
    },
    {
        Header: 'Total QR Codes',
        accessor: 'qrcodes.length',
        id: 'qrcodes',
    },
    {
        Header: 'View QR Codes',
        id: 'view',
    },
    {
        Header: 'Created Date',
        accessor: 'created_at',
        id: 'created',
    },
    {
        Header: 'Action',
        id: 'action',
    },
];

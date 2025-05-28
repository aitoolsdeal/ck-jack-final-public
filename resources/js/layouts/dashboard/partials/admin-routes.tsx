import {
    CircleDollarSign,
    FilePlus,
    Layers,
    LayoutDashboard,
    Link,
    Link2,
    MessageSquareCode,
    NotebookText,
    NotepadText,
    Palette,
    QrCode,
    Settings,
    UserPlus,
    Users,
} from 'lucide-react';
import { nanoid } from 'nanoid';

const adminRoutes = [
    {
        id: nanoid(),
        slug: 'user_panel',
        title: 'User Panel',
        pages: [
            {
                id: nanoid(),
                slug: 'dashboard',
                Icon: LayoutDashboard,
                name: 'Dashboard',
                path: '/dashboard',
            },
            {
                id: nanoid(),
                slug: 'bio_links',
                Icon: Link2,
                name: 'Bio Links',
                path: '/dashboard/bio-links',
            },
            {
                id: nanoid(),
                slug: 'short_links',
                Icon: Link,
                name: 'Short Links',
                path: '/dashboard/short-links',
            },
            {
                id: nanoid(),
                slug: 'projects',
                Icon: Layers,
                name: 'Projects',
                path: '/dashboard/projects',
            },
            {
                id: nanoid(),
                slug: 'qr_codes',
                Icon: QrCode,
                name: 'QR Codes',
                path: '/dashboard/qrcodes',
            },
            {
                id: nanoid(),
                slug: 'settings',
                Icon: Settings,
                name: 'Settings',
                path: '/dashboard/settings',
            },
        ],
    },
    {
        id: nanoid(),
        slug: 'admin_panel',
        title: 'Admin Panel',
        pages: [
            {
                id: nanoid(),
                slug: 'users',
                Icon: Users,
                name: 'Users',
                path: '/dashboard/users',
            },
            // Stripe routes start
            {
                id: nanoid(),
                slug: 'pricing',
                Icon: CircleDollarSign,
                name: 'Pricing',
                path: '/dashboard/stripe/pricing-plans',
            },
            {
                id: nanoid(),
                slug: 'invoices',
                Icon: NotepadText,
                name: 'Invoices',
                path: '/dashboard/stripe/invoices',
            },
            {
                id: nanoid(),
                slug: 'charges',
                Icon: NotebookText,
                name: 'Charges',
                path: '/dashboard/stripe/single-charge/show',
            },
            {
                id: nanoid(),
                slug: 'subscriptions',
                Icon: UserPlus,
                name: 'Subscriptions',
                path: '/dashboard/stripe/subscription/show',
            },
            // Stripe routes end
            {
                id: nanoid(),
                slug: 'testimonials',
                Icon: MessageSquareCode,
                name: 'Testimonials',
                path: '/dashboard/testimonials',
            },
            {
                id: nanoid(),
                slug: 'manage_themes',
                Icon: Palette,
                name: 'Manage Themes',
                path: '/dashboard/manage-themes',
            },
            {
                id: nanoid(),
                slug: 'custom_page',
                Icon: FilePlus,
                name: 'Custom Page',
                path: '/dashboard/custom-page',
            },
            // {
            //     id: nanoid(),
            //     slug: 'translation',
            //     Icon: Languages,
            //     name: 'Translation',
            //     path: '/dashboard/translation',
            // },
            {
                id: nanoid(),
                slug: 'app_settings',
                Icon: Settings,
                name: 'App Settings',
                path: '/dashboard/app-settings',
            },
        ],
    },
];

export default adminRoutes;

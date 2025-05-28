<?php

namespace Database\Seeders;

use App\Models\IntroSection;
use Illuminate\Database\Seeder;

class IntroSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $appSections = array(
            [
                'name' => 'Header',
                'slug' => 'header',
                'title' => 'The One Link for All Your Links',
                'description' => null,
                'thumbnail' => 'assets/intro/feature-group.png',
                'section_list' => '[
                    {"content": "Bio Link", "icon": "Link", "url": null},
                    {"content": "Url Shortener", "icon": "ExternalLink", "url": null},
                    {"content": "QR Code Generate", "icon": "QrCode", "url": null},
                    {"content": "19+ Themes", "icon": "Palette", "url": null}
                ]',
            ],
            [
                'name' => 'Features',
                'slug' => 'features',
                'title' => 'Features',
                'description' => null,
                'thumbnail' => null,
                'section_list' => '[
                    {"content": "Url Shortener", "icon": "ExternalLink", "url": null},
                    {"content": "19+ Themes", "icon": "Palette", "url": null},
                    {"content": "Advance Visitor Tracking", "icon": "ChartLine", "url": null},
                    {"content": "Full Customizing Option", "icon": "PaintBucket", "url": null}
                ]',
            ],
            [
                'name' => 'Create Link',
                'slug' => 'create_link',
                'title' => 'Create Link with a great form',
                'description' => 'Create your own unique link and take your like wherever your audience is to help them to discover all your important content.',
                'thumbnail' => 'assets/intro/create-link.svg',
                'section_list' => '[
                    {"content": "Custom colors", "icon": "CheckCheck", "url": null},
                    {"content": "Customize settings or drag-and-drop", "icon": "CheckCheck", "url": null},
                    {"content": "19+ Themes", "icon": "CheckCheck", "url": null},
                    {"content": "Customize settings or drag-end-drop", "icon": "CheckCheck", "url": null}
                ]',
            ],
            [
                'name' => 'Add Blocks',
                'slug' => 'add_blocks',
                'title' => 'Add Blocks',
                'description' => 'Yes! you can use Block, drag-and-drop to set up your link customizable.',
                'thumbnail' => 'assets/intro/blocks.svg',
                'section_list' => '[
                    {"content":"Custom colors", "icon": "CheckCheck", "url": null},
                    {"content":"Customize settings or drag-and-drop", "icon": "CheckCheck", "url": null},
                    {"content":"19+ Themes", "icon": "CheckCheck", "url": null},
                    {"content":"Customize settings or drag-end-drop", "icon": "CheckCheck", "url": null}
                ]',
            ],
            [
                'name' => 'QR Codes',
                'slug' => 'qr_codes',
                'title' => 'Create QR Codes',
                'description' => 'Create your own unique link and take your like wherever your audience is to help them to discover all your important content.',
                'thumbnail' => 'assets/intro/qr-code.svg',
                'section_list' => '[
                    {"content":"Custom colors", "icon": "CheckCheck", "url": null},
                    {"content":"Customize settings or drag-and-drop", "icon": "CheckCheck", "url": null},
                    {"content":"19+ Themes", "icon": "CheckCheck", "url": null},
                    {"content":"Customize settings or drag-end-drop", "icon": "CheckCheck", "url": null}
                ]',
            ],
            [
                'name' => 'Follow On',
                'slug' => 'follow_on',
                'title' => 'Follow on:',
                'description' => null,
                'thumbnail' => null,
                'section_list' => '[
                    {"content": null, "icon": "Twitter", "url": "https://twitter.com"},
                    {"content": null, "icon": "Linkedin", "url": "https://linkedin.com"},
                    {"content": null, "icon": "Facebook", "url": "https://facebook.com"},
                    {"content": null, "icon": "Youtube", "url": "https://youtube.com"}
                ]',
            ],
            [
                'name' => 'Support',
                'slug' => 'support',
                'title' => 'Support',
                'description' => null,
                'thumbnail' => null,
                'section_list' => '[
                    {"content": "Help", "icon": null, "url": "#"},
                    {"content": "Getting Started", "icon": null, "url": "#"},
                    {"content": "FAQs", "icon": null, "url": "#"},
                    {"content": "Privacy Policy", "icon": null, "url": "#"},
                    {"content": "Terms & Conditions", "icon": null, "url": "#"}
                ]',
            ],
            [
                'name' => 'Address',
                'slug' => 'address',
                'title' => 'Address',
                'description' => null,
                'thumbnail' => null,
                'section_list' => '[
                    {"content": "18, Time squar, California United State of America.", "icon": null, "url": null},
                    {"content": "+(123) 456 789 10", "icon": null, "url": null},
                    {"content": "info@biolink.com", "icon": null, "url": null},
                    {"content": "www.biolink.com", "icon": null, "url": null}
                ]',
            ],
        );

        foreach ($appSections as $value) {
            IntroSection::create([
                'name' => $value['name'],
                'slug' => $value['slug'],
                'title' => $value['title'],
                'description' => $value['description'],
                'thumbnail' => $value['thumbnail'],
                'section_list' => $value['section_list'],
            ]);
        }
    }
}
